import { getEditionConfig } from "@/config/editions";
import { Speaker } from "./types";
import { cache } from "react";

/**
 * Get the Sessionize speakers URL for a given edition year
 */
const getSpeakersUrl = (year: string | number): string => {
  const config = getEditionConfig(year);
  return `${config.sessionizeUrl}/view/Speakers`;
};

export const getSpeakers = cache(async (year: string | number = "default"): Promise<Speaker[]> => {
  const url = getSpeakersUrl(year);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch speakers");
  }
  const speakers: Speaker[] = await response.json();
  return speakers;
});

export const getSpeakerByYearAndId = async (year: string | number, speakerId: string): Promise<Speaker | undefined> => {
  const speakers = await getSpeakers(year);
  return speakers.find((speaker) => speaker.id === speakerId);
};
