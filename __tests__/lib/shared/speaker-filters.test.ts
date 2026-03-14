import { describe, it, expect } from "@jest/globals";
import { filterSpeakers } from "@/lib/shared/speaker-filters";
import { Speaker } from "@/hooks/types";

const mockSpeakers: Speaker[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    bio: "Developer",
    tagLine: "Senior Engineer",
    profilePicture: "/img/john.jpg",
    sessions: [],
    isTopSpeaker: true,
    links: [],
    questionAnswers: [],
    categories: [],
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    fullName: "Jane Smith",
    bio: "Designer",
    tagLine: "UX Expert",
    profilePicture: "/img/jane.jpg",
    sessions: [],
    isTopSpeaker: false,
    links: [],
    questionAnswers: [],
    categories: [],
  },
  {
    id: "3",
    firstName: "Bob",
    lastName: "Wilson",
    fullName: "Bob Wilson",
    bio: "Manager",
    tagLine: "Tech Lead",
    profilePicture: "/img/bob.jpg",
    sessions: [],
    isTopSpeaker: false,
    links: [],
    questionAnswers: [],
    categories: [],
  },
];

describe("speaker-filters", () => {
  describe("filterSpeakers", () => {
    it("returns all speakers when query is empty", () => {
      const result = filterSpeakers(mockSpeakers, "");
      expect(result).toHaveLength(3);
    });

    it("returns all speakers when query is whitespace", () => {
      const result = filterSpeakers(mockSpeakers, "   ");
      expect(result).toHaveLength(3);
    });

    it("filters by name (case insensitive)", () => {
      const result = filterSpeakers(mockSpeakers, "john");
      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe("John Doe");
    });

    it("filters by tagLine", () => {
      const result = filterSpeakers(mockSpeakers, "engineer");
      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe("John Doe");
    });

    it("returns empty array when no matches", () => {
      const result = filterSpeakers(mockSpeakers, "xyz123");
      expect(result).toHaveLength(0);
    });

    it("matches partial name", () => {
      const result = filterSpeakers(mockSpeakers, "doe");
      expect(result).toHaveLength(1);
    });

    it("trims query whitespace", () => {
      const result = filterSpeakers(mockSpeakers, "  jane  ");
      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe("Jane Smith");
    });

    it("handles speakers with empty tagLine", () => {
      const speakersWithEmptyTagline = [{ ...mockSpeakers[0], tagLine: "" }];
      const result = filterSpeakers(speakersWithEmptyTagline, "developer");
      expect(result).toHaveLength(0);
    });
  });
});
