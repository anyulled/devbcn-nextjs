import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import { buildFavoriteSessionNotifications, scheduleFavoriteSessionNotifications } from "@/lib/session-notifications";
import type { DailySchedule } from "@/hooks/useSchedule";

const createSchedule = (startsAt: string): DailySchedule[] => [
  {
    date: "2026-06-17",
    rooms: [
      {
        id: 1,
        name: "Auditorium",
        hasOnlyPlenumSessions: false,
        sessions: [
          {
            id: "session-1",
            title: "Practical React",
            description: null,
            startsAt,
            endsAt: "2026-06-17T10:50:00.000Z",
            isServiceSession: false,
            isPlenumSession: false,
            speakers: [],
            roomId: 1,
            room: "Auditorium",
            status: "accepted",
          },
        ],
      },
    ],
    timeSlots: [],
  },
];

const createGroupedSchedule = (): DailySchedule[] => [
  {
    date: "2026-06-17",
    rooms: [
      {
        id: 1,
        name: "Auditorium",
        hasOnlyPlenumSessions: false,
        sessions: [
          {
            id: "session-1",
            title: "Practical React",
            description: null,
            startsAt: "2026-06-17T10:00:00.000Z",
            endsAt: "2026-06-17T10:50:00.000Z",
            isServiceSession: false,
            isPlenumSession: false,
            speakers: [],
            roomId: 1,
            room: "Auditorium",
            status: "accepted",
          },
          {
            id: "session-2",
            title: "Advanced GraphQL",
            description: null,
            startsAt: "2026-06-17T10:00:00.000Z",
            endsAt: "2026-06-17T10:50:00.000Z",
            isServiceSession: false,
            isPlenumSession: false,
            speakers: [],
            roomId: 1,
            room: "Auditorium",
            status: "accepted",
          },
        ],
      },
    ],
    timeSlots: [],
  },
];

describe("session notifications", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-06-17T09:58:30.000Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("builds reminders one minute before favorite sessions start", () => {
    const notifications = buildFavoriteSessionNotifications(createSchedule("2026-06-17T10:00:00.000Z"), ["session-1"], Date.now());

    expect(notifications).toEqual([
      {
        id: "session-1",
        title: "Practical React starts in 1 minute",
        body: "Auditorium · 12:00",
        notifyAt: new Date("2026-06-17T09:59:00.000Z").getTime(),
      },
    ]);
  });

  it("groups favorite sessions that start at the same time into one reminder", () => {
    const notifications = buildFavoriteSessionNotifications(createGroupedSchedule(), ["session-1", "session-2"], Date.now());

    expect(notifications).toEqual([
      {
        id: "session-1|session-2",
        title: "2 favorite sessions start in 1 minute",
        body: "Practical React, Advanced GraphQL · 12:00",
        notifyAt: new Date("2026-06-17T09:59:00.000Z").getTime(),
      },
    ]);
  });

  it("ignores non-favorites, service sessions, and reminders that are no longer in the future", () => {
    const schedule = createSchedule("2026-06-17T09:59:00.000Z");
    schedule[0].rooms[0].sessions.push({ ...schedule[0].rooms[0].sessions[0], id: "session-2", isServiceSession: true });

    expect(buildFavoriteSessionNotifications(schedule, ["session-1", "session-2"], Date.now())).toEqual([]);
  });

  it("schedules browser notifications and returns a cleanup function", () => {
    const notificationConstructor = jest.fn();
    class MockNotification {
      static permission: NotificationPermission = "granted";

      constructor(title: string, options?: NotificationOptions) {
        notificationConstructor(title, options);
      }
    }

    const cleanup = scheduleFavoriteSessionNotifications(createSchedule("2026-06-17T10:00:00.000Z"), ["session-1"], MockNotification, Date.now());

    jest.advanceTimersByTime(29_999);
    expect(notificationConstructor).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(notificationConstructor).toHaveBeenCalledWith("Practical React starts in 1 minute", { body: "Auditorium · 12:00", tag: "devbcn-session-session-1" });

    cleanup();
  });

  it("schedules a single browser notification for simultaneous favorite sessions", () => {
    const notificationConstructor = jest.fn();
    class MockNotification {
      static permission: NotificationPermission = "granted";

      constructor(title: string, options?: NotificationOptions) {
        notificationConstructor(title, options);
      }
    }

    scheduleFavoriteSessionNotifications(createGroupedSchedule(), ["session-1", "session-2"], MockNotification, Date.now());

    jest.advanceTimersByTime(30_000);

    expect(notificationConstructor).toHaveBeenCalledTimes(1);
    expect(notificationConstructor).toHaveBeenCalledWith("2 favorite sessions start in 1 minute", {
      body: "Practical React, Advanced GraphQL · 12:00",
      tag: "devbcn-session-session-1|session-2",
    });
  });

  it("does not schedule notifications without browser permission", () => {
    const notificationConstructor = jest.fn();
    class MockNotification {
      static permission: NotificationPermission = "default";

      constructor(title: string, options?: NotificationOptions) {
        notificationConstructor(title, options);
      }
    }

    scheduleFavoriteSessionNotifications(createSchedule("2026-06-17T10:00:00.000Z"), ["session-1"], MockNotification, Date.now());

    jest.advanceTimersByTime(30_000);
    expect(notificationConstructor).not.toHaveBeenCalled();
  });
});
