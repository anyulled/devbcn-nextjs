import { describe, expect, it, jest, beforeEach, afterEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { getSpeakerByYearAndId, getSpeakers } from "@/hooks/useSpeakers";
import { getAllTalks, getRelatedTalksByTrack, getTalkByYearAndId, getTalkSpeakersWithDetails, getTalks } from "@/hooks/useTalks";

// Mock global fetch
const mockFetch = jest.fn() as jest.MockedFunction<typeof globalThis.fetch>;
globalThis.fetch = mockFetch;

describe("Hooks", () => {
  beforeEach(() => {
    jest.mocked(globalThis.fetch).mockClear();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
        next: { revalidate: false, tags: ["sessionize:2025"] },
      });
      expect(speakers).toEqual(mockSpeakers);
    });

    it("revalidates current edition speakers every 12 hours", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      } as Response);

      await getSpeakers("2026");
      expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining("prcjw6ue"), {
        next: { revalidate: 43200, tags: ["sessionize:2026"] },
      });
    });

    it("fetches speakers for specific year", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpeakers,
      } as Response);

      await getSpeakers("2023");
      // Ttsitynd - 2023 endpoint
      expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining("ttsitynd"), {
        next: { revalidate: false, tags: ["sessionize:2023"] },
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
      const consoleErrorMock = console.error as jest.MockedFunction<typeof console.error>;
      expect(consoleErrorMock).toHaveBeenCalledWith("Failed to fetch speakers for year 2025: Not Found");
    });

    it("returns empty array when fetch throws", async () => {
      jest.mocked(globalThis.fetch).mockRejectedValueOnce(new Error("Network error"));

      const speakers = await getSpeakers("2024");
      expect(speakers).toEqual([]);
      const consoleErrorMock = console.error as jest.MockedFunction<typeof console.error>;
      expect(consoleErrorMock).toHaveBeenCalledWith("Error fetching speakers for year 2024:", expect.any(Error));
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

    it("returns undefined when speakers fetch fails", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Server Error",
      } as Response);

      const speaker = await getSpeakerByYearAndId("2024", "1");
      expect(speaker).toBeUndefined();
      const consoleErrorMock = console.error as jest.MockedFunction<typeof console.error>;
      expect(consoleErrorMock).toHaveBeenCalledWith("Failed to fetch speakers for year 2024: Server Error");
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
        next: { revalidate: false, tags: ["sessionize:2025"] },
      });
      expect(groups).toHaveLength(1);
      expect(groups[0].sessions).toHaveLength(2);
      expect(groups[0].sessions[0].id).toEqual("101");
    });

    it("revalidates current edition talks every 12 hours", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      } as Response);

      await getTalks("2026");
      expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining("prcjw6ue"), {
        next: { revalidate: 43200, tags: ["sessionize:2026"] },
      });
    });

    it("returns empty array when fetch fails", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response);

      const groups = await getTalks("2025");
      expect(groups).toEqual([]);
      const consoleErrorMock = console.error as jest.MockedFunction<typeof console.error>;
      expect(consoleErrorMock).toHaveBeenCalledWith("Failed to fetch talks for year 2025: Internal Server Error");
    });

    it("returns empty array when fetch throws", async () => {
      jest.mocked(globalThis.fetch).mockRejectedValueOnce(new Error("Network error"));

      const groups = await getTalks("2024");
      expect(groups).toEqual([]);
      const consoleErrorMock = console.error as jest.MockedFunction<typeof console.error>;
      expect(consoleErrorMock).toHaveBeenCalledWith("Error fetching talks for year 2024:", expect.any(Error));
    });
  });

  describe("getAllTalks", () => {
    it("flattens session groups into talks", async () => {
      const mockTalksData = [
        {
          groupId: 1,
          groupName: "Group 1",
          sessions: [{ id: "101", title: "Talk One" }],
        },
        {
          groupId: 2,
          groupName: "Group 2",
          sessions: [{ id: "201", title: "Talk Two" }],
        },
      ];

      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      } as Response);

      const talks = await getAllTalks("2026");
      expect(talks).toHaveLength(2);
      expect(talks[0].id).toBe("101");
      expect(talks[1].id).toBe("201");
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

    it("returns undefined when talks fetch fails", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Server Error",
      } as Response);

      const talk = await getTalkByYearAndId("2024", "101");
      expect(talk).toBeUndefined();
      const consoleErrorMock = console.error as jest.MockedFunction<typeof console.error>;
      expect(consoleErrorMock).toHaveBeenCalledWith("Failed to fetch talks for year 2024: Server Error");
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

  describe("getRelatedTalksByTrack", () => {
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

      const relatedTalks = await getRelatedTalksByTrack("2025", "Frontend", "101", 3);
      expect(relatedTalks).toHaveLength(1);
      expect(relatedTalks[0].id).toBe("102");
    });

    it("returns empty array when no related talks found", async () => {
      jest.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTalksData,
      } as Response);

      const relatedTalks = await getRelatedTalksByTrack("2025", "DevOps", "101", 3);
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

      const relatedTalks = await getRelatedTalksByTrack("2025", "Frontend", "0", 3);
      expect(relatedTalks).toHaveLength(3);
    });
  });
});
