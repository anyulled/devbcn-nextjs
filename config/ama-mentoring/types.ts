export type SessionType = "ama" | "mentoring";

export interface ScheduleSpeaker {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface SessionScheduleSlot {
  day: "Tuesday" | "Wednesday";
  time: string;
  slotLabel: string;
  sessionType: SessionType;
  speakers: ScheduleSpeaker[];
}
