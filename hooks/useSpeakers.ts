import { getEditionConfig } from "@/config/editions";
import { Speaker } from "./types";
import { cache } from "react";
import { getRevalidateInterval } from "@/lib/revalidate";

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
    const revalidateInterval = getRevalidateInterval(year);

    const response = await fetch(url, {
      next: { revalidate: revalidateInterval },
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

  /*
   * ⚡ Bolt: Use O(N) Fisher-Yates algorithm for shuffling instead of O(N log N) map-sort-map
   * This reduces memory allocations (no intermediate object arrays) and improves performance.
   */
  const shuffled = [...speakers];
  const state = { i: shuffled.length - 1 };

  while (state.i > 0) {
    const j = Math.floor(Math.random() * (state.i + 1));
    const temp = shuffled[state.i];

    /* eslint-disable security/detect-object-injection */
    shuffled[state.i] = shuffled[j];
    shuffled[j] = temp;
    /* eslint-enable security/detect-object-injection */

    state.i--;
  }

  return shuffled.slice(0, count);
}
