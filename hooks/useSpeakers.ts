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
  try {
    const url = getSpeakersUrl(year);
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      console.error(`Failed to fetch speakers for year ${year}: ${response.statusText}`);
      return [];
    }
    const speakers: Speaker[] = await response.json();
    return speakers;
  } catch (error) {
    console.error(`Error fetching speakers for year ${year}:`, error);
    return [];
  }
});

export const getSpeakerByYearAndId = async (year: string | number, speakerId: string): Promise<Speaker | undefined> => {
  const speakers = await getSpeakers(year);
  return speakers.find((speaker) => speaker.id === speakerId);
};
