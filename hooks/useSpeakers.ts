import { cache } from "react";
import { fetchSessionizeEndpoint, type SessionizeFetchOptions } from "@/lib/server/sessionize";
import { Speaker } from "./types";

export const getSpeakers = cache(async (year: string | number = "default", options?: SessionizeFetchOptions): Promise<Speaker[]> => {
  const speakers = await fetchSessionizeEndpoint<Speaker[]>(year, "/view/Speakers", "speakers", options);
  return speakers ?? [];
});

const getSpeakersMap = cache(async (year: string | number): Promise<Map<string, Speaker>> => {
  const speakers = await getSpeakers(year);
  return new Map(speakers.map((speaker) => [speaker.id, speaker]));
});

export const getSpeakerByYearAndId = async (year: string | number, speakerId: string): Promise<Speaker | undefined> => {
  const speakersMap = await getSpeakersMap(year);
  return speakersMap.get(speakerId);
};

export function getFeaturedSpeakers(speakers: Speaker[], count: number): Speaker[] {
  if (!speakers || speakers.length === 0) return [];
  return speakers.slice(0, count);
}
