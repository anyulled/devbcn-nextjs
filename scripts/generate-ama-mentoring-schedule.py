#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import re
import unicodedata
import urllib.request
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

WORKBOOK_DEFAULT = Path.home() / "Documents" / "AMA & Public Speaking.xlsx"
OUTPUT_DEFAULT = Path(__file__).resolve().parents[1] / "config" / "ama-mentoring" / "2026.ts"
API_URL = "https://sessionize.com/api/v2/prcjw6ue/view/Speakers"
NAMESPACE = {"a": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}

ALIASES = {
    "Mauricio Salatino": 'Mauricio "Salaboy" Salatino',
    "Nitsch, Kai": "Kai Nitsch",
    "Sofia Lescano": "Sofia Lescano Carroll",
    "Arnau Gómez": "Arnau Gómez Farell",
}


def normalize(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value or "")
    stripped = "".join(character for character in normalized if not unicodedata.combining(character))
    return re.sub(r"[^a-z0-9]+", "", stripped.lower())


def fetch_speakers() -> list[dict[str, str]]:
    with urllib.request.urlopen(API_URL, timeout=30) as response:
        payload = json.load(response)

    if isinstance(payload, dict):
        for key in ("speakers", "items", "data"):
            if key in payload and isinstance(payload[key], list):
                return payload[key]
        raise RuntimeError("Unexpected Sessionize payload shape")

    if not isinstance(payload, list):
        raise RuntimeError("Unexpected Sessionize payload shape")

    return payload


def build_lookup(speakers: list[dict[str, str]]) -> dict[str, list[dict[str, str]]]:
    lookup: dict[str, list[dict[str, str]]] = {}
    for speaker in speakers:
        display_name = (speaker.get("fullName") or speaker.get("name") or "").strip()
        lookup.setdefault(normalize(display_name), []).append(speaker)
    return lookup


def resolve_speaker(name: str, lookup: dict[str, list[dict[str, str]]]) -> dict[str, str]:
    canonical_name = ALIASES.get(name.strip(), name.strip())
    matches = lookup.get(normalize(canonical_name), [])
    if len(matches) != 1:
        raise RuntimeError(f"Could not resolve speaker {name!r} -> {canonical_name!r}")
    match = matches[0]
    resolved_name = (match.get("fullName") or match.get("name") or canonical_name).strip()
    return {
        "id": str(match["id"]),
        "name": resolved_name,
        "avatarUrl": str(match.get("profilePicture") or ""),
    }


def split_speaker_names(value: str) -> list[str]:
    parts = [part.strip() for part in re.split(r"\s*[;/]\s*", value) if part.strip()]
    return parts if parts else ([value.strip()] if value.strip() else [])


def parse_schedule_sheet(archive: zipfile.ZipFile, sheet_filename: str) -> list[dict[str, list[str] | str]]:
    shared_strings: list[str] = []
    if "xl/sharedStrings.xml" in archive.namelist():
        shared_root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
        for shared_item in shared_root.findall("a:si", NAMESPACE):
            shared_strings.append("".join(text.text or "" for text in shared_item.findall(".//a:t", NAMESPACE)))

    def cell_value(cell: ET.Element) -> str:
        cell_type = cell.attrib.get("t")
        value_node = cell.find("a:v", NAMESPACE)
        if cell_type == "s" and value_node is not None:
            return shared_strings[int(value_node.text or "0")]
        if cell_type == "inlineStr":
            return "".join(text.text or "" for text in cell.findall(".//a:t", NAMESPACE))
        return value_node.text if value_node is not None and value_node.text is not None else ""

    sheet = ET.fromstring(archive.read(f"xl/worksheets/{sheet_filename}"))
    current_day: str | None = None
    rows: list[dict[str, list[str] | str]] = []

    for row in sheet.findall(".//a:sheetData/a:row", NAMESPACE):
        values = [cell_value(cell).strip() for cell in row.findall("a:c", NAMESPACE)]
        if not values:
            continue

        first_cell = values[0]
        if first_cell in {"TUESDAY", "WEDNESDAY"}:
            current_day = first_cell.title()
            continue

        if current_day is None or not first_cell or not first_cell[0].isdigit():
            continue

        minutes = round(float(first_cell) * 24 * 60)
        time = f"{minutes // 60:02d}:{minutes % 60:02d}"
        rows.append(
            {
                "day": current_day,
                "time": time,
                "ama1": values[1] if len(values) > 1 else "",
                "ama2": values[2] if len(values) > 2 else "",
                "ama3": values[3] if len(values) > 3 else "",
                "ama4": values[4] if len(values) > 4 else "",
                "publicSpeaking": values[5] if len(values) > 5 else "",
            }
        )

    return rows


def read_workbook_schedule(workbook_path: Path, lookup: dict[str, list[dict[str, str]]]) -> list[dict[str, object]]:
    with zipfile.ZipFile(workbook_path) as archive:
        iteration1_rows = parse_schedule_sheet(archive, "sheet1.xml")
        iteration0_rows = parse_schedule_sheet(archive, "sheet2.xml")

    iteration0_by_slot = {
        (row["day"], row["time"]): row for row in iteration0_rows
    }
    slots: list[dict[str, object]] = []

    for row in iteration1_rows:
        day = str(row["day"])
        time = str(row["time"])
        mentoring_row = iteration0_by_slot.get((day, time))
        labels = ["AMA 1", "AMA 2", "AMA 3", "AMA 4", "Public Speaking"]
        session_types = ["ama", "ama", "ama", "ama", "mentoring"]

        for label, session_type, key in zip(labels, session_types, ["ama1", "ama2", "ama3", "ama4", "publicSpeaking"]):
            raw_value = str(mentoring_row.get(key) if session_type == "mentoring" and mentoring_row else row.get(key) or "")
            if not raw_value:
                continue

            speaker_names = split_speaker_names(raw_value)
            speakers = [resolve_speaker(speaker_name, lookup) for speaker_name in speaker_names]
            slots.append(
                {
                    "day": day,
                    "time": time,
                    "slotLabel": label,
                    "sessionType": session_type,
                    "speakers": speakers,
                }
            )

    return slots


def render_ts(slots: list[dict[str, object]]) -> str:
    lines = [
        '/*',
        ' * This file is generated from the Iteration 1 workbook and Sessionize speaker data.',
        ' * Regenerate with: python3 scripts/generate-ama-mentoring-schedule.py',
        ' */',
        "",
        'import type { SessionScheduleSlot } from "./types";',
        "",
        "export const sessionSchedule2026: SessionScheduleSlot[] = [",
    ]

    for slot in slots:
        lines.extend(
            [
                "  {",
                f'    day: "{slot["day"]}",',
                f'    time: "{slot["time"]}",',
                f'    slotLabel: {json.dumps(slot["slotLabel"])},',
                f'    sessionType: "{slot["sessionType"]}",',
                "    speakers: [",
            ]
        )
        for speaker in slot["speakers"]:  # type: ignore[index]
            lines.extend(
                [
                    "      {",
                    f'        id: "{speaker["id"]}",',
                    f'        name: {json.dumps(speaker["name"])},',
                    f'        avatarUrl: {json.dumps(speaker["avatarUrl"])},',
                    "      },",
                ]
            )
        lines.extend(
            [
                "    ],",
                "  },",
            ]
        )

    lines.extend(
        [
            "]",
            "",
            'export const getSessionScheduleByType = (sessionType: SessionScheduleSlot["sessionType"]): SessionScheduleSlot[] =>',
            '  sessionSchedule2026.filter((slot) => slot.sessionType === sessionType);',
            "",
            'export const getAmaSchedule2026 = (): SessionScheduleSlot[] => getSessionScheduleByType("ama");',
            'export const getMentoringSchedule2026 = (): SessionScheduleSlot[] => getSessionScheduleByType("mentoring");',
            "",
        ]
    )
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate the DevBcn 2026 AMA and mentoring schedule data.")
    parser.add_argument("--workbook", type=Path, default=WORKBOOK_DEFAULT, help="Path to AMA & Public Speaking.xlsx")
    parser.add_argument("--output", type=Path, default=OUTPUT_DEFAULT, help="Output TypeScript data file")
    args = parser.parse_args()

    speakers = fetch_speakers()
    lookup = build_lookup(speakers)
    slots = read_workbook_schedule(args.workbook, lookup)

    if not slots:
        raise RuntimeError("No schedule slots were generated")

    args.output.write_text(render_ts(slots), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
