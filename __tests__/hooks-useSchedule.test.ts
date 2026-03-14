import { describe, it, expect } from "@jest/globals";
import { getSchedule } from "@/hooks/useSchedule";

const mockFetch = jest.fn() as jest.MockedFunction<typeof globalThis.fetch>;
globalThis.fetch = mockFetch;

describe("useSchedule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSchedule", () => {
    const mockGridSchedule = [
      {
        date: "2026-06-15",
        isDefault: true,
        rooms: [
          {
            id: 1,
            name: "Room A",
            hasOnlyPlenumSessions: false,
            sessions: [
              {
                id: "s1",
                title: "Session 1",
                description: "Test session",
                startsAt: "2026-06-15T10:00:00",
                endsAt: "2026-06-15T11:00:00",
                isServiceSession: false,
                isPlenumSession: false,
                speakers: [{ id: "sp1", name: "Speaker 1" }],
                roomId: 1,
                room: "Room A",
                status: "confirmed",
              },
            ],
          },
        ],
      },
    ];

    it("fetches and processes schedule data", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGridSchedule,
      } as Response);

      const result = await getSchedule("2026");

      expect(result).toBeDefined();
      expect(result[0].date).toBe("2026-06-15");
      expect(result[0].timeSlots).toBeDefined();
    });

    it("returns empty array on fetch error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: "Internal Server Error",
      } as Response);

      const result = await getSchedule("2026");

      expect(result).toEqual([]);
    });

    it("returns empty array on exception", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await getSchedule("2026");

      expect(result).toEqual([]);
    });
  });
});
