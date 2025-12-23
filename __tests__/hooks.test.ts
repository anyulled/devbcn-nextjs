import { getSpeakerByYearAndId, getSpeakers } from "@/hooks/useSpeakers";
import { getTalkByYearAndId, getTalks } from "@/hooks/useTalks";

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
});
