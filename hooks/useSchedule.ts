import { format, parseISO } from "date-fns";
import { cache } from "react";
import { fetchSessionizeEndpoint, type SessionizeFetchOptions } from "@/lib/server/sessionize";
import { Category } from "./types";

export interface GridSession {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  isServiceSession: boolean;
  isPlenumSession: boolean;
  speakers: { id: string; name: string }[];
  categories?: Category[];
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

export const getSchedule = cache(async (year: string | number, options?: SessionizeFetchOptions): Promise<DailySchedule[]> => {
  const data = await fetchSessionizeEndpoint<GridSchedule[]>(year, "/view/GridSmart", "schedule", options);
  if (!data) {
    return [];
  }

  try {
    return data.map((day) => {
      const sessionsByTime = new Map<string, GridSession[]>();

      day.rooms.forEach((room) => {
        room.sessions.forEach((session) => {
          const timeKey = format(parseISO(session.startsAt), "HH:mm");
          const existing = sessionsByTime.get(timeKey);
          if (!existing) {
            sessionsByTime.set(timeKey, [session]);
          } else {
            /*
             * ⚡ Bolt: Use .push instead of array spread [...existing, session]
             * to avoid O(N^2) memory allocations and improve iteration performance
             */
            existing.push(session);
          }
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
    console.error(`Error processing schedule for year ${year}:`, error);
    if (options?.strict) {
      throw error;
    }
    return [];
  }
});
