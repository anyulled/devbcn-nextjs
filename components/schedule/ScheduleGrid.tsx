"use client";

import { useMemo, useState } from "react";
import { DailySchedule, GridRoom } from "@/hooks/useSchedule";
import SessionCard from "./SessionCard";
import { format, parseISO } from "date-fns";
import styles from "./schedule.module.scss";

interface ScheduleGridProps {
  schedule: DailySchedule[];
  year: string;
}

const EMPTY_ROOMS: GridRoom[] = [];
const HIDDEN_ROOM_NAMES = new Set(["Exhibit Hall", "Reception"]);

const getSessionMinutes = (date: string): number => {
  const parsedDate = parseISO(date);
  return parsedDate.getHours() * 60 + parsedDate.getMinutes();
};

const formatMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}`;
};

export default function ScheduleGrid({ schedule, year }: Readonly<ScheduleGridProps>) {
  const [activeTab, setActiveTab] = useState(0);

  const hasSchedule = schedule && schedule.length > 0;
  const currentDay = hasSchedule ? (schedule.at(activeTab) ?? null) : null;
  const rooms = currentDay ? currentDay.rooms : EMPTY_ROOMS;

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => !HIDDEN_ROOM_NAMES.has(room.name));
  }, [rooms]);

  const roomColumnIndexById = useMemo(() => {
    return new Map(filteredRooms.map((room, index) => [room.id, index]));
  }, [filteredRooms]);

  const { timeBoundaries, rowTemplate, boundaryIndexes } = useMemo(() => {
    if (!rooms || rooms.length === 0) {
      return { timeBoundaries: [], rowTemplate: "50px", boundaryIndexes: new Map<number, number>() };
    }

    const uniqueBoundaries = new Set<number>();
    rooms.forEach((room) => {
      room.sessions.forEach((session) => {
        uniqueBoundaries.add(getSessionMinutes(session.startsAt));
        uniqueBoundaries.add(getSessionMinutes(session.endsAt));
      });
    });

    const timeBoundaries = Array.from(uniqueBoundaries).sort((a, b) => a - b);
    const boundaryIndexes = new Map(timeBoundaries.map((time, index) => [time, index]));
    const rowHeights = timeBoundaries.slice(0, -1).map((boundary, index) => {
      const duration = timeBoundaries[index + 1] - boundary;
      return `minmax(${Math.max(48, duration * 2.4)}px, auto)`;
    });

    return { timeBoundaries, rowTemplate: `50px ${rowHeights.join(" ")}`, boundaryIndexes };
  }, [rooms]);

  if (!hasSchedule) {
    return <div className="text-center py-5">Schedule not yet published.</div>;
  }

  return (
    <div className={styles.scheduleGridContainer}>
      <div className={styles.scheduleTabs}>
        {schedule.map((day, index) => (
          <button key={day.date} className={`${styles.tabBtn} ${activeTab === index ? styles.active : ""} `} onClick={() => setActiveTab(index)}>
            {format(parseISO(day.date), "EEEE, MMMM d")}
          </button>
        ))}
      </div>

      <div className={styles.gridScrollWrapper}>
        <div
          className={styles.scheduleGrid}
          data-testid="schedule-grid"
          style={{
            gridTemplateColumns: `80px repeat(${filteredRooms.length}, 1fr)`,
            gridTemplateRows: rowTemplate,
          }}
        >
          <div
            className={styles.gridHeaderBackground}
            style={{
              gridRow: "1 / span 1",
              gridColumn: `1 / span ${filteredRooms.length + 1}`,
            }}
          />
          <div className={styles.gridHeaderCorner} style={{ gridRow: "1 / span 1", gridColumn: "1 / span 1" }} />
          {filteredRooms.map((room, colIndex) => (
            <div
              key={room.id}
              className={styles.gridHeaderRoom}
              style={{
                gridRow: "1 / span 1",
                gridColumn: `${colIndex + 2} / span 1`,
              }}
            >
              {room.name}
            </div>
          ))}

          {timeBoundaries.slice(0, -1).map((time, index) => (
            <div key={time} className={styles.gridTimeLabel} style={{ gridRow: `${index + 2} / span 1` }}>
              {formatMinutes(time)}
            </div>
          ))}

          {(() => {
            const renderedSharedSessions = new Set<string>();
            return rooms.map((room) => {
              const colIndex = roomColumnIndexById.get(room.id) ?? -1;
              const gridColumn = colIndex + 2;

              return room.sessions.map((session) => {
                const startMinutes = getSessionMinutes(session.startsAt);
                const endMinutes = getSessionMinutes(session.endsAt);
                const startIndex = boundaryIndexes.get(startMinutes) ?? -1;
                const endIndex = boundaryIndexes.get(endMinutes) ?? -1;

                if (startIndex === -1 || endIndex === -1) {
                  return null;
                }

                const rowSpan = Math.max(1, endIndex - startIndex);
                const gridRow = `${startIndex + 2} / span ${rowSpan}`;
                const isSharedSession = session.isPlenumSession || session.isServiceSession;

                if (isSharedSession) {
                  if (renderedSharedSessions.has(session.id)) {
                    return null;
                  }
                  renderedSharedSessions.add(session.id);

                  return (
                    <div
                      key={session.id}
                      className={`${styles.gridSessionCell} ${styles.plenumSession}`}
                      style={{
                        gridColumn: `2 / span ${filteredRooms.length}`,
                        gridRow,
                      }}
                    >
                      <SessionCard session={session} year={year} showRoom={false} />
                    </div>
                  );
                }

                if (colIndex === -1) {
                  return null;
                }

                return (
                  <div
                    key={session.id}
                    className={styles.gridSessionCell}
                    style={{
                      gridColumn,
                      gridRow,
                    }}
                  >
                    <SessionCard session={session} year={year} showRoom={false} />
                  </div>
                );
              });
            });
          })()}
        </div>
      </div>
    </div>
  );
}
