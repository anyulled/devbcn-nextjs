import { getEditionConfig } from "@/config/editions";
import { Speaker } from "./types";
import { cache } from "react";
import { getSessionizeFetchOptions } from "@/lib/revalidate";

const getSpeakersUrl = (year: string | number): string => {
  const config = getEditionConfig(year);
  return `${config.sessionizeUrl}/view/Speakers`;
};

export const getSpeakers = cache(async (year: string | number = "default", options?: { strict?: boolean }): Promise<Speaker[]> => {
  try {
    const url = getSpeakersUrl(year);

    const response = await fetch(url, getSessionizeFetchOptions(year));
    if (!response.ok) {
      const errorMessage = `Failed to fetch speakers for year ${year}: ${response.statusText}`;
      console.error(errorMessage);
      if (options?.strict) {
        throw new Error(errorMessage);
      }
      return [];
    }
    const speakers: Speaker[] = await response.json();
    return speakers;
  } catch (error) {
    console.error(`Error fetching speakers for year ${year}:`, error);
    if (options?.strict) {
      throw error;
    }
    return [];
  }
});

const getSpeakersMap = cache(async (year: string | number): Promise<Map<string, Speaker>> => {
  const speakers = await getSpeakers(year);
  return new Map(speakers.map((s) => [s.id, s]));
});

export const getSpeakerByYearAndId = async (year: string | number, speakerId: string): Promise<Speaker | undefined> => {
  const map = await getSpeakersMap(year);
  return map.get(speakerId);
};

export function getFeaturedSpeakers(speakers: Speaker[], count: number): Speaker[] {
  if (!speakers || speakers.length === 0) return [];
  return speakers.slice(0, count);
}
