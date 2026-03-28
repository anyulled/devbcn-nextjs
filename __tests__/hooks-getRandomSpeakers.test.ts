import { describe, it, expect } from "@jest/globals";
import { getFeaturedSpeakers } from "@/hooks/useSpeakers";
import { Speaker } from "@/hooks/types";

const mockSpeakers: Speaker[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    bio: "",
    tagLine: "",
    profilePicture: "",
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
    bio: "",
    tagLine: "",
    profilePicture: "",
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
    bio: "",
    tagLine: "",
    profilePicture: "",
    sessions: [],
    isTopSpeaker: false,
    links: [],
    questionAnswers: [],
    categories: [],
  },
  {
    id: "4",
    firstName: "Alice",
    lastName: "Brown",
    fullName: "Alice Brown",
    bio: "",
    tagLine: "",
    profilePicture: "",
    sessions: [],
    isTopSpeaker: false,
    links: [],
    questionAnswers: [],
    categories: [],
  },
  {
    id: "5",
    firstName: "Charlie",
    lastName: "Davis",
    fullName: "Charlie Davis",
    bio: "",
    tagLine: "",
    profilePicture: "",
    sessions: [],
    isTopSpeaker: false,
    links: [],
    questionAnswers: [],
    categories: [],
  },
];

describe("getFeaturedSpeakers", () => {
  it("returns empty array when input is empty", () => {
    const result = getFeaturedSpeakers([], 3);
    expect(result).toEqual([]);
  });

  it("returns empty array when input is null/undefined", () => {
    expect(getFeaturedSpeakers(null as unknown as Speaker[], 3)).toEqual([]);
    expect(getFeaturedSpeakers(undefined as unknown as Speaker[], 3)).toEqual([]);
  });

  it("returns all speakers when count >= length", () => {
    const result = getFeaturedSpeakers(mockSpeakers, 10);
    expect(result).toHaveLength(5);
  });

  it("returns first N speakers when count < length", () => {
    const result = getFeaturedSpeakers(mockSpeakers, 2);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("2");
  });

  it("returns unique speakers", () => {
    const result = getFeaturedSpeakers(mockSpeakers, 3);
    const ids = result.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(result.length);
  });

  it("does not modify original array", () => {
    const original = [...mockSpeakers];
    getFeaturedSpeakers(mockSpeakers, 2);
    expect(mockSpeakers).toEqual(original);
  });
});
