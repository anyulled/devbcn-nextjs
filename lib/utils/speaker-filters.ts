import { Speaker } from "@/hooks/types";

/**
 * Filters speakers by search query (name and tagline)
 */
export const filterSpeakers = (speakers: Speaker[], searchQuery: string): Speaker[] => {
  const query = searchQuery.toLowerCase().trim();

  if (!query) {
    return speakers;
  }

  return speakers.filter((speaker) => {
    const name = speaker.fullName.toLowerCase();
    const tagLine = (speaker.tagLine || "").toLowerCase();

    return name.includes(query) || tagLine.includes(query);
  });
};
