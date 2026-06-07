import { sessionSchedule2026 } from "./2026";
import type { SessionScheduleSlot, SessionType } from "./types";

export type { SessionScheduleSlot, SessionType } from "./types";

export const getSessionScheduleForYear = (year: string, sessionType: SessionType): SessionScheduleSlot[] => {
  if (year === "2026") {
    return sessionSchedule2026.filter((slot) => slot.sessionType === sessionType);
  }

  return [];
};

export const getAmaScheduleForYear = (year: string): SessionScheduleSlot[] => {
  return getSessionScheduleForYear(year, "ama");
};

export const getMentoringScheduleForYear = (year: string): SessionScheduleSlot[] => {
  return getSessionScheduleForYear(year, "mentoring");
};
