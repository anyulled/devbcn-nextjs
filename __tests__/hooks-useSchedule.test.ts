import { describe, it, expect, beforeEach, afterEach, jest } from "@jest/globals";
import { getSchedule } from "@/hooks/useSchedule";

const mockFetch = jest.fn() as jest.MockedFunction<typeof globalThis.fetch>;
globalThis.fetch = mockFetch;

describe("useSchedule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
      const consoleErrorMock = console.error as jest.MockedFunction<typeof console.error>;
      expect(consoleErrorMock).toHaveBeenCalledWith("Error fetching schedule:", expect.any(Error));
    });

    it("returns empty array on exception", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await getSchedule("2026");

      expect(result).toEqual([]);
      const consoleErrorMock = console.error as jest.MockedFunction<typeof console.error>;
      expect(consoleErrorMock).toHaveBeenCalledWith("Error fetching schedule:", expect.any(Error));
    });

    it("sorts time slots and sessions by room name", async () => {
      const schedule = [
        {
          date: "2026-06-15",
          isDefault: true,
          rooms: [
            {
              id: 2,
              name: "Room B",
              hasOnlyPlenumSessions: false,
              sessions: [
                {
                  id: "s2",
                  title: "Session 2",
                  description: "Test session",
                  startsAt: "2026-06-15T11:00:00",
                  endsAt: "2026-06-15T12:00:00",
                  isServiceSession: false,
                  isPlenumSession: false,
                  speakers: [{ id: "sp2", name: "Speaker 2" }],
                  roomId: 2,
                  room: "Room B",
                  status: "confirmed",
                },
                {
                  id: "s3",
                  title: "Session 3",
                  description: "Test session",
                  startsAt: "2026-06-15T09:00:00",
                  endsAt: "2026-06-15T10:00:00",
                  isServiceSession: false,
                  isPlenumSession: false,
                  speakers: [{ id: "sp3", name: "Speaker 3" }],
                  roomId: 2,
                  room: "Room B",
                  status: "confirmed",
                },
              ],
            },
            {
              id: 1,
              name: "Room A",
              hasOnlyPlenumSessions: false,
              sessions: [
                {
                  id: "s1",
                  title: "Session 1",
                  description: "Test session",
                  startsAt: "2026-06-15T11:00:00",
                  endsAt: "2026-06-15T12:00:00",
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

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => schedule,
      } as Response);

      const result = await getSchedule("2024");

      expect(result[0].timeSlots[0].time).toBe("09:00");
      expect(result[0].timeSlots[1].time).toBe("11:00");
      expect(result[0].timeSlots[1].sessions[0].room).toBe("Room A");
      expect(result[0].timeSlots[1].sessions[1].room).toBe("Room B");
    });
  });
});
