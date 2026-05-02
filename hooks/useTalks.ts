import { cache } from "react";
import { getEditionConfig } from "@/config/editions";
import { SessionGroup, Speaker, Talk } from "./types";
import { getSpeakers } from "./useSpeakers";

import { getSessionizeFetchOptions } from "@/lib/revalidate";

/**
 * Get the Sessionize sessions URL for a given edition year
 */
const getSessionsUrl = (year: string | number): string => {
  const config = getEditionConfig(year);
  return `${config.sessionizeUrl}/view/Sessions`;
};

export const getTalks = cache(async (year: string | number = "default", throwOnError: boolean = false): Promise<SessionGroup[]> => {
  try {
    const url = getSessionsUrl(year);

    const response = await fetch(url, getSessionizeFetchOptions(year));
    if (!response.ok) {
      console.error(`Failed to fetch talks for year ${year}: ${response.statusText}`);
      if (throwOnError) throw new Error(`Failed to fetch talks for year ${year}: ${response.statusText}`);
      return [];
    }
    const data: SessionGroup[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching talks for year ${year}:`, error);
    if (throwOnError) throw error;
    return [];
  }
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
 * Extract the track name from a talk's categories
 */
export const getTrackFromTalk = (talk: Talk): string => {
  const trackCategory = talk.categories.find((cat) => cat.name === "Track");
  return trackCategory?.categoryItems[0]?.name || "Other";
};

/**
 * Extract the difficulty level from a talk's categories
 */
export const getLevelFromTalk = (talk: Talk): string => {
  const levelCategory = talk.categories.find((cat) => cat.name === "Level");
  return levelCategory?.categoryItems[0]?.name || "Not specified";
};

/**
 * Convert difficulty level to emoji stars
 */
export const getLevelStars = (level: string): string => {
  const lowerLevel = level.toLowerCase();
  if (lowerLevel === "introductory" || lowerLevel === "beginner") {
    return "⭐";
  }
  if (lowerLevel === "intermediate") {
    return "⭐⭐";
  }
  if (lowerLevel === "advanced") {
    return "⭐⭐⭐";
  }
  return "";
};

/**
 * Extract tags from a talk's questionAnswers
 */
export const getTagsFromTalk = (talk: Talk): string[] => {
  const tagsAnswer = talk.questionAnswers.find((qa) => qa.question === "Tags/Topics");
  if (!tagsAnswer?.answer) {
    return [];
  }
  return tagsAnswer.answer
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

/**
 * Extract the slides URL from a talk's questionAnswers
 */
export const getSlidesUrl = (talk: Talk): string | null => {
  const slidesAnswer = talk.questionAnswers.find((qa) => qa.question === "Slides");
  return slidesAnswer?.answer || null;
};

/**
 * Get all unique track names from session groups
 */
export const getUniqueTracks = (sessionGroups: SessionGroup[]): string[] => {
  const allTalks = sessionGroups.flatMap((group) => group.sessions);
  const tracks = allTalks.map((talk) => getTrackFromTalk(talk));
  return [...new Set(tracks)].sort();
};

/**
 * Group talks by their track
 */
export const groupTalksByTrack = (talks: Talk[]): Map<string, Talk[]> => {
  const groupedObj = talks.reduce<Record<string, Talk[]>>((acc, talk) => {
    const track = getTrackFromTalk(talk);
    return {
      ...acc,
      [track]: [...(acc[track] || []), talk],
    };
  }, {});

  return new Map(Object.entries(groupedObj));
};

/**
 * Get full speaker details (with profile pictures) for a talk's speakers
 */
export const getTalkSpeakersWithDetails = async (year: string | number, speakerIds: string[]): Promise<Speaker[]> => {
  const speakers = await getSpeakers(year);
  return speakers.filter((s) => speakerIds.includes(s.id));
};

export const getRelatedTalksByTrack = async (year: string | number, track: string, excludeTalkId: string, limit: number = 5): Promise<Talk[]> => {
  const allTalks = await getAllTalks(year);
  const sameTracks = allTalks.filter((t) => getTrackFromTalk(t) === track && t.id !== excludeTalkId);
  return sameTracks.slice(0, limit);
};
