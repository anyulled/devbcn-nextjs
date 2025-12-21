import { Speaker } from "./types";

const YEAR_ENDPOINTS: Record<string | number, string> = {
  default: "https://sessionize.com/api/v2/xhudniix/view/Speakers",
  2023: "https://sessionize.com/api/v2/ttsitynd/view/Speakers",
  2024: "https://sessionize.com/api/v2/teq4asez/view/Speakers",
};

export const getSpeakers = async (
  year: string | number = "default",
): Promise<Speaker[]> => {
  const url = YEAR_ENDPOINTS[year] || YEAR_ENDPOINTS["default"];
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch speakers");
  }
  const speakers: Speaker[] = await response.json();
  return speakers;
};

export const getSpeakerByYearAndId = async (
  year: string | number,
  speakerId: string,
): Promise<Speaker | undefined> => {
  const speakers = await getSpeakers(year);
  return speakers.find((speaker) => speaker.id === speakerId);
};
