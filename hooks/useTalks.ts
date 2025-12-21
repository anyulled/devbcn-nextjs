import { SessionGroup, Talk } from "./types";

const YEAR_ENDPOINTS: Record<string | number, string> = {
  default: "https://sessionize.com/api/v2/xhudniix/view/Sessions",
  2023: "https://sessionize.com/api/v2/ttsitynd/view/Sessions",
  2024: "https://sessionize.com/api/v2/teq4asez/view/Sessions",
};

export const getTalks = async (
  year: string | number = "default",
): Promise<SessionGroup[]> => {
  const url = YEAR_ENDPOINTS[year] || YEAR_ENDPOINTS["default"];
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch talks");
  }
  const data: SessionGroup[] = await response.json();
  return data;
};

export const getTalkByYearAndId = async (
  year: string | number,
  talkId: string,
): Promise<Talk | undefined> => {
  const sessionGroups = await getTalks(year);
  const allTalks = sessionGroups.flatMap((group) => group.sessions);
  return allTalks.find((talk) => talk.id === talkId);
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
  const tagsAnswer = talk.questionAnswers.find(
    (qa) => qa.question === "Tags/Topics",
  );
  if (!tagsAnswer?.answer) {
    return [];
  }
  return tagsAnswer.answer
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
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
  const grouped = new Map<string, Talk[]>();

  for (const talk of talks) {
    const track = getTrackFromTalk(talk);
    const existing = grouped.get(track) || [];
    grouped.set(track, [...existing, talk]);
  }

  return grouped;
};
