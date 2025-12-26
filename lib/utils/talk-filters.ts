import { Talk } from "@/hooks/types";
import { getTrackFromTalk } from "@/hooks/useTalks";

/**
 * Filters talks by track and search query (title and description)
 */
export const filterTalks = (talks: Talk[], selectedTrack: string, searchQuery: string): Talk[] => {
  const query = searchQuery.toLowerCase().trim();

  return talks.filter((talk) => {
    // Filter by track if selected
    if (selectedTrack && getTrackFromTalk(talk) !== selectedTrack) {
      return false;
    }

    // Filter by search query if provided
    if (query) {
      const title = talk.title.toLowerCase();
      const description = (talk.description || "").toLowerCase();
      return title.includes(query) || description.includes(query);
    }

    return true;
  });
};
