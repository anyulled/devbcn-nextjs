import { getEditionConfig } from "@/config/editions";
import { format, parseISO } from "date-fns";
import { cache } from "react";
import { getSessionizeFetchOptions } from "@/lib/revalidate";

export interface GridSession {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  isServiceSession: boolean;
  isPlenumSession: boolean;
  speakers: { id: string; name: string }[];
  roomId: number;
  room: string;
  status: string | null;
}

export interface GridRoom {
  id: number;
  name: string;
  sessions: GridSession[];
  hasOnlyPlenumSessions: boolean;
}

export interface GridSchedule {
  date: string;
  isDefault: boolean;
  rooms: GridRoom[];
}

export interface TimeSlot {
  time: string;
  sessions: GridSession[];
}

export interface DailySchedule {
  date: string;
  rooms: GridRoom[];
  timeSlots: TimeSlot[];
}

export const getSchedule = cache(async (year: string | number): Promise<DailySchedule[]> => {
  const config = getEditionConfig(year);

  const url = `${config.sessionizeUrl}/view/GridSmart`;

  try {
    const response = await fetch(url, getSessionizeFetchOptions(year));
    if (!response.ok) {
      throw new Error(`Failed to fetch schedule: ${response.statusText}`);
    }
    const data: GridSchedule[] = await response.json();

    return data.map((day) => {
      const sessionsByTime = new Map<string, GridSession[]>();

      day.rooms.forEach((room) => {
        room.sessions.forEach((session) => {
          const timeKey = format(parseISO(session.startsAt), "HH:mm");
          const existing = sessionsByTime.get(timeKey) || [];
          sessionsByTime.set(timeKey, [...existing, session]);
        });
      });

      const timeSlots: TimeSlot[] = Array.from(sessionsByTime.entries())
        .map(([time, sessions]) => ({
          time,
          sessions: sessions.sort((a, b) => a.room.localeCompare(b.room)),
        }))
        .sort((a, b) => a.time.localeCompare(b.time));

      return {
        date: day.date,
        rooms: day.rooms,
        timeSlots,
      };
    });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return [];
  }
});
