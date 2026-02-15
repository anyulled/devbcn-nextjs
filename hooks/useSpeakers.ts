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

/**
 * Get random speakers from the list
 * Always returns an array, even if empty or fewer than requested
 */
export function getRandomSpeakers(speakers: Speaker[], count: number): Speaker[] {
  if (!speakers || speakers.length === 0) return [];
  if (speakers.length <= count) return speakers;

  const shuffled = [...speakers]
    .map((speaker) => ({ speaker, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map((item) => item.speaker);

  return shuffled.slice(0, count);
}
