import { format, parseISO } from "date-fns";
import type { DailySchedule, GridSession } from "@/hooks/useSchedule";

const SESSION_REMINDER_LEAD_TIME_MS = 60_000;

export interface FavoriteSessionNotification {
  id: string;
  title: string;
  body: string;
  notifyAt: number;
}

type BrowserNotification = Pick<typeof Notification, "permission"> & {
  new (title: string, options?: NotificationOptions): unknown;
};

interface GroupedFavoriteSessionNotification {
  ids: string[];
  sessionCount: number;
  titles: string[];
  rooms: string[];
  timeLabel: string;
  notifyAt: number;
}

const getUniqueSessions = (schedule: DailySchedule[]): GridSession[] => {
  const sessionsById = new Map<string, GridSession>();
  const rooms = schedule.flatMap((day) => day.rooms);

  for (const room of rooms) {
    for (const session of room.sessions) {
      if (!sessionsById.has(session.id)) {
        sessionsById.set(session.id, session);
      }
    }
  }

  return Array.from(sessionsById.values());
};

const addSessionToNotificationGroup = (notificationsByNotifyAt: Map<number, GroupedFavoriteSessionNotification>, session: GridSession, now: number): void => {
  const startsAt = parseISO(session.startsAt);
  const notifyAt = startsAt.getTime() - SESSION_REMINDER_LEAD_TIME_MS;

  if (notifyAt <= now) {
    return;
  }

  const existingNotification = notificationsByNotifyAt.get(notifyAt);
  if (existingNotification === undefined) {
    notificationsByNotifyAt.set(notifyAt, {
      ids: [session.id],
      sessionCount: 1,
      titles: [session.title],
      rooms: [session.room],
      timeLabel: format(startsAt, "HH:mm"),
      notifyAt,
    });
    return;
  }

  existingNotification.ids.push(session.id);
  existingNotification.sessionCount += 1;
  existingNotification.titles.push(session.title);
  existingNotification.rooms.push(session.room);
};

export const buildFavoriteSessionNotifications = (schedule: DailySchedule[], savedSessionIds: string[], now: number): FavoriteSessionNotification[] => {
  const savedIds = new Set(savedSessionIds);
  const notificationsByNotifyAt = new Map<number, GroupedFavoriteSessionNotification>();

  for (const session of getUniqueSessions(schedule)) {
    if (!savedIds.has(session.id) || session.isServiceSession) {
      continue;
    }

    addSessionToNotificationGroup(notificationsByNotifyAt, session, now);
  }

  return Array.from(notificationsByNotifyAt.entries())
    .sort(([leftNotifyAt], [rightNotifyAt]) => leftNotifyAt - rightNotifyAt)
    .map(([notifyAt, notification]) => {
      if (notification.sessionCount === 1) {
        return {
          id: notification.ids[0],
          title: `${notification.titles[0]} starts in 1 minute`,
          body: `${notification.rooms[0]} · ${notification.timeLabel}`,
          notifyAt,
        };
      }

      const sessionSummary =
        notification.sessionCount <= 2
          ? notification.titles.join(", ")
          : `${notification.titles.slice(0, 2).join(", ")} +${notification.sessionCount - 2} more`;

      return {
        id: notification.ids.slice().sort().join("|"),
        title: `${notification.sessionCount} favorite sessions start in 1 minute`,
        body: `${sessionSummary} · ${notification.timeLabel}`,
        notifyAt,
      };
    });
};

export const scheduleFavoriteSessionNotifications = (
  schedule: DailySchedule[],
  savedSessionIds: string[],
  notificationApi: BrowserNotification | undefined,
  now: number = Date.now()
): (() => void) => {
  if (!notificationApi || notificationApi.permission !== "granted") {
    return () => undefined;
  }

  const timeoutIds = buildFavoriteSessionNotifications(schedule, savedSessionIds, now).map((notification) =>
    window.setTimeout(() => {
      new notificationApi(notification.title, {
        body: notification.body,
        tag: `devbcn-session-${notification.id}`,
      });
    }, notification.notifyAt - now)
  );

  return () => {
    timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
  };
};
