import { getSpeakerByYearAndId, getSpeakers } from "@/hooks/useSpeakers";
import { getRandomRelatedTalksByTrack, getTalkByYearAndId, getTalkSpeakersWithDetails, getTalks } from "@/hooks/useTalks";

// Mock global fetch
global.fetch = jest.fn();

describe("Hooks", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe("getSpeakers", () => {
    const mockSpeakers = [
      { id: "1", fullName: "Speaker One" },
      { id: "2", fullName: "Speaker Two" },
    ];

    it("fetches speakers for 2025 year", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      });

      const speakers = await getSpeakers(2025);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("xhudniix")); // 2025 sessionize ID
      expect(speakers).toEqual(mockSpeakers);
    });

    it("fetches speakers for specific year", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      });

      await getSpeakers(2023);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("ttsitynd")); // 2023 ID
    });

    it("throws error when fetch fails", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(getSpeakers(2025)).rejects.toThrow("Failed to fetch speakers");
    });
  });

  describe("getSpeakerByYearAndId", () => {
    const mockSpeakers = [
      { id: "1", fullName: "Speaker One" },
      { id: "2", fullName: "Speaker Two" },
    ];

    it("fetches a specific speaker by id", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      });

      const speaker = await getSpeakerByYearAndId("default", "1");
      expect(speaker).toBeDefined();
      expect(speaker?.id).toEqual("1");
    });

    it("returns undefined if speaker not found", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      });

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
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      });

      const groups = await getTalks(2025);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("xhudniix")); // 2025 sessionize ID
      expect(groups).toHaveLength(1);
      expect(groups[0].sessions).toHaveLength(2);
      expect(groups[0].sessions[0].id).toEqual("101");
    });

    it("throws error when fetch fails", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(getTalks(2025)).rejects.toThrow("Failed to fetch talks");
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
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      });

      const talk = await getTalkByYearAndId("default", "101");
      expect(talk).toBeDefined();
      expect(talk?.id).toEqual("101");
    });

    it("returns undefined if talk not found", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      });

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
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      });

      const speakers = await getTalkSpeakersWithDetails(2025, ["1", "3"]);
      expect(speakers).toHaveLength(2);
      expect(speakers[0].id).toBe("1");
      expect(speakers[1].id).toBe("3");
    });

    it("returns empty array when no speakers match", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      });

      const speakers = await getTalkSpeakersWithDetails(2025, ["999"]);
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
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      });

      const relatedTalks = await getRandomRelatedTalksByTrack(2025, "Frontend", "101", 3);
      expect(relatedTalks).toHaveLength(1); // Only talk 102 matches
      expect(relatedTalks[0].id).toBe("102");
    });

    it("returns empty array when no related talks found", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      });

      const relatedTalks = await getRandomRelatedTalksByTrack(2025, "DevOps", "101", 3);
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

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => manyTalks,
      });

      const relatedTalks = await getRandomRelatedTalksByTrack(2025, "Frontend", "0", 3);
      expect(relatedTalks.length).toBeLessThanOrEqual(3);
    });
  });
});
