import { cache } from "react";
import { fetchSessionizeEndpoint, type SessionizeFetchOptions } from "@/lib/server/sessionize";
import { getTrackFromTalk } from "@/lib/shared/talk-metadata";
import { SessionGroup, Speaker, Talk } from "./types";
import { getSpeakers } from "./useSpeakers";

export {
  getLevelFromTalk,
  getLevelStars,
  getSlidesUrl,
  getTagsFromTalk,
  getTrackFromTalk,
  getUniqueTracks,
  groupTalksByTrack,
} from "@/lib/shared/talk-metadata";

export const getTalks = cache(async (year: string | number = "default", options?: SessionizeFetchOptions): Promise<SessionGroup[]> => {
  const data = await fetchSessionizeEndpoint<SessionGroup[]>(year, "/view/Sessions", "talks", options);
  return data ?? [];
});

export const getAllTalks = cache(async (year: string | number): Promise<Talk[]> => {
  const sessionGroups = await getTalks(year);
  return sessionGroups.flatMap((group) => group.sessions);
});

const getTalksMap = cache(async (year: string | number): Promise<Map<string, Talk>> => {
  const allTalks = await getAllTalks(year);
  return new Map(allTalks.map((talk) => [talk.id, talk]));
});

export const getTalkByYearAndId = async (year: string | number, talkId: string): Promise<Talk | undefined> => {
  const talksMap = await getTalksMap(year);
  return talksMap.get(talkId);
};

/**
 * Get full speaker details (with profile pictures) for a talk's speakers
 */
export const getTalkSpeakersWithDetails = async (year: string | number, speakerIds: string[]): Promise<Speaker[]> => {
  const speakers = await getSpeakers(year);

  /* Use a Set to keep speaker membership checks fast as speaker lists grow. */
  const speakerIdsSet = new Set(speakerIds);
  return speakers.filter((s) => speakerIdsSet.has(s.id));
};

export const getRelatedTalksByTrack = async (year: string | number, track: string, excludeTalkId: string, limit: number = 5): Promise<Talk[]> => {
  const normalizedLimit = Math.trunc(limit) || 0;
  if (normalizedLimit <= 0) return [];
  const allTalks = await getAllTalks(year);
  const result: Talk[] = [];
  for (const t of allTalks) {
    if (t.id !== excludeTalkId && getTrackFromTalk(t) === track) {
      result.push(t);
      if (result.length === normalizedLimit) break;
    }
  }
  return result;
};
