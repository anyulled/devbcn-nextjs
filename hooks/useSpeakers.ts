import { getEditionConfig } from "@/config/editions";
import { Speaker } from "./types";
import { cache } from "react";
import { getSessionizeFetchOptions } from "@/lib/revalidate";

/**
 * Get the Sessionize speakers URL for a given edition year
 */
const getSpeakersUrl = (year: string | number): string => {
  const config = getEditionConfig(year);
  return `${config.sessionizeUrl}/view/Speakers`;
};

export const getSpeakers = cache(async (year: string | number = "default", options: { throwOnError?: boolean } = {}): Promise<Speaker[]> => {
  try {
    const url = getSpeakersUrl(year);

    const response = await fetch(url, getSessionizeFetchOptions(year));
    if (!response.ok) {
      const errorMsg = `Failed to fetch speakers for year ${year}: ${response.statusText}`;
      console.error(errorMsg);
      if (options.throwOnError) {
        throw new Error(errorMsg);
      }
      return [];
    }
    const speakers: Speaker[] = await response.json();
    return speakers;
  } catch (error) {
    console.error(`Error fetching speakers for year ${year}:`, error);
    if (options.throwOnError) {
      throw error;
    }
    return [];
  }
});

export const getSpeakerByYearAndId = async (year: string | number, speakerId: string): Promise<Speaker | undefined> => {
  const speakers = await getSpeakers(year);
  return speakers.find((speaker) => speaker.id === speakerId);
};

/**
 * Get random speakers from the list
 * Always returns an array, even if empty or fewer than requested
 */
export function getFeaturedSpeakers(speakers: Speaker[], count: number): Speaker[] {
  if (!speakers || speakers.length === 0) return [];
  return speakers.slice(0, count);
}
