import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { getSpeakerByYearAndId, getSpeakers } from "@/hooks/useSpeakers";
import { getRandomRelatedTalksByTrack, getTalkByYearAndId, getTalkSpeakersWithDetails, getTalks } from "@/hooks/useTalks";

// Mock global fetch
const mockFetch = jest.fn() as jest.MockedFunction<typeof globalThis.fetch>;
globalThis.fetch = mockFetch;

describe("Hooks", () => {
  beforeEach(() => {
    jest.mocked(globalThis.fetch).mockClear();
  });

  describe("getSpeakers", () => {
    const mockSpeakers = [
      { id: "1", fullName: "Speaker One" },
      { id: "2", fullName: "Speaker Two" },
    ];

    it("fetches speakers for 2025 year", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      } as Response);

      const speakers = await getSpeakers("2025");
      expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining("xhudniix"), {
        next: { revalidate: 3600 },
      });
      expect(speakers).toEqual(mockSpeakers);
    });

    it("fetches speakers for specific year", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      } as Response);

      await getSpeakers("2023");
      // Ttsitynd - 2023 endpoint
      expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining("ttsitynd"), {
        next: { revalidate: 3600 },
      });
    });

    it("returns empty array when fetch fails", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      const speakers = await getSpeakers("2025");
      expect(speakers).toEqual([]);
    });
  });

  describe("getSpeakerByYearAndId", () => {
    const mockSpeakers = [
      { id: "1", fullName: "Speaker One" },
      { id: "2", fullName: "Speaker Two" },
    ];

    it("fetches a specific speaker by id", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      } as Response);

      const speaker = await getSpeakerByYearAndId("default", "1");
      expect(speaker).toBeDefined();
      expect(speaker?.id).toEqual("1");
    });

    it("returns undefined if speaker not found", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      } as Response);

      const speaker = await getSpeakerByYearAndId("default", "999");
      expect(speaker).toBeUndefined();
    });
  });

  describe("getTalks", () => {
    const mockTalksData = [
      {
        groupId: 1,
        groupName: "Group 1",
        sessions: [
          { id: "101", title: "Talk One" },
          { id: "102", title: "Talk Two" },
        ],
      },
    ];

    it("fetches session groups for 2025 year", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      } as Response);

      const groups = await getTalks("2025");
      expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining("xhudniix"), {
        next: { revalidate: 3600 },
      });
      expect(groups).toHaveLength(1);
      expect(groups[0].sessions).toHaveLength(2);
      expect(groups[0].sessions[0].id).toEqual("101");
    });

    it("returns empty array when fetch fails", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response);

      const groups = await getTalks("2025");
      expect(groups).toEqual([]);
    });
  });

  describe("getTalkByYearAndId", () => {
    const mockTalksData = [
      {
        groupId: 1,
        groupName: "Group 1",
        sessions: [
          { id: "101", title: "Talk One" },
          { id: "102", title: "Talk Two" },
        ],
      },
    ];

    it("fetches a specific talk by id", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      } as Response);

      const talk = await getTalkByYearAndId("default", "101");
      expect(talk).toBeDefined();
      expect(talk?.id).toEqual("101");
    });

    it("returns undefined if talk not found", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      } as Response);

      const talk = await getTalkByYearAndId("default", "999");
      expect(talk).toBeUndefined();
    });
  });

  describe("getTalkSpeakersWithDetails", () => {
    const mockSpeakers = [
      { id: "1", fullName: "Speaker One" },
      { id: "2", fullName: "Speaker Two" },
      { id: "3", fullName: "Speaker Three" },
    ];

    it("returns speakers matching the provided IDs", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      } as Response);

      const speakers = await getTalkSpeakersWithDetails("2025", ["1", "3"]);
      expect(speakers).toHaveLength(2);
      expect(speakers[0].id).toBe("1");
      expect(speakers[1].id).toBe("3");
    });

    it("returns empty array when no speakers match", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      } as Response);

      const speakers = await getTalkSpeakersWithDetails("2025", ["999"]);
      expect(speakers).toHaveLength(0);
    });
  });

  describe("getRandomRelatedTalksByTrack", () => {
    const mockTalksData = [
      {
        groupId: 1,
        groupName: "Group 1",
        sessions: [
          {
            id: "101",
            title: "Talk One",
            categories: [{ name: "Track", categoryItems: [{ name: "Frontend" }] }],
          },
          {
            id: "102",
            title: "Talk Two",
            categories: [{ name: "Track", categoryItems: [{ name: "Frontend" }] }],
          },
          {
            id: "103",
            title: "Talk Three",
            categories: [{ name: "Track", categoryItems: [{ name: "Backend" }] }],
          },
        ],
      },
    ];

    it("returns talks from the same track excluding current talk", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      } as Response);

      const relatedTalks = await getRandomRelatedTalksByTrack("2025", "Frontend", "101", 3);
      // Only talk 102 matches
      expect(relatedTalks).toHaveLength(1);
      expect(relatedTalks[0].id).toBe("102");
    });

    it("returns empty array when no related talks found", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      } as Response);

      const relatedTalks = await getRandomRelatedTalksByTrack("2025", "DevOps", "101", 3);
      expect(relatedTalks).toHaveLength(0);
    });

    it("respects the limit parameter", async () => {
      const manyTalks = [
        {
          groupId: 1,
          groupName: "Group 1",
          sessions: Array.from({ length: 10 }, (_, i) => ({
            id: `${i}`,
            title: `Talk ${i}`,
            categories: [{ name: "Track", categoryItems: [{ name: "Frontend" }] }],
          })),
        },
      ];

      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => manyTalks,
      } as Response);

      const relatedTalks = await getRandomRelatedTalksByTrack("2025", "Frontend", "0", 3);
      expect(relatedTalks.length).toBeLessThanOrEqual(3);
    });
  });
});
