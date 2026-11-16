import type { SessionGroup, Talk } from "@/hooks/types";

export const getTrackFromTalk = (talk: Talk): string => {
  const trackCategory = talk.categories.find((cat) => cat.name === "Track");
  return trackCategory?.categoryItems[0]?.name || "Other";
};

export const getLevelFromTalk = (talk: Talk): string => {
  const levelCategory = talk.categories.find((cat) => cat.name === "Level");
  return levelCategory?.categoryItems[0]?.name || "Not specified";
};

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

export const getSlidesUrl = (talk: Talk): string | null => {
  const slidesAnswer = talk.questionAnswers.find((qa) => qa.question === "Slides");
  return slidesAnswer?.answer || null;
};

export const getUniqueTracks = (sessionGroups: SessionGroup[]): string[] => {
  const tracks = new Set<string>();
  for (const group of sessionGroups) {
    for (const talk of group.sessions) {
      tracks.add(getTrackFromTalk(talk));
    }
  }
  return [...tracks].sort();
};

export const groupTalksByTrack = (talks: Talk[]): Map<string, Talk[]> => {
  const map = new Map<string, Talk[]>();

  talks.forEach((talk) => {
    const track = getTrackFromTalk(talk);
    const existing = map.get(track);
    if (!existing) {
      map.set(track, [talk]);
    } else {
      existing.push(talk);
    }
  });

  return map;
};
