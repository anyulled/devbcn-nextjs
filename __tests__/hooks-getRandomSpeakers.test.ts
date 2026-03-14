import { describe, it, expect } from "@jest/globals";
import { getRandomSpeakers } from "@/hooks/useSpeakers";
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

describe("getRandomSpeakers", () => {
  it("returns empty array when input is empty", () => {
    const result = getRandomSpeakers([], 3);
    expect(result).toEqual([]);
  });

  it("returns empty array when input is null/undefined", () => {
    expect(getRandomSpeakers(null as unknown as Speaker[], 3)).toEqual([]);
    expect(getRandomSpeakers(undefined as unknown as Speaker[], 3)).toEqual([]);
  });

  it("returns all speakers when count >= length", () => {
    const result = getRandomSpeakers(mockSpeakers, 10);
    expect(result).toHaveLength(5);
  });

  it("returns requested number of speakers when count < length", () => {
    const result = getRandomSpeakers(mockSpeakers, 2);
    expect(result).toHaveLength(2);
  });

  it("returns unique speakers", () => {
    const result = getRandomSpeakers(mockSpeakers, 3);
    const ids = result.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(result.length);
  });

  it("does not modify original array", () => {
    const original = [...mockSpeakers];
    getRandomSpeakers(mockSpeakers, 2);
    expect(mockSpeakers).toEqual(original);
  });
});
