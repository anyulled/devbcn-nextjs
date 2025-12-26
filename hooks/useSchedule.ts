import { getEditionConfig } from "@/config/editions";
import { format, parseISO } from "date-fns";

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

// Mobile view structure: Time Slot -> List of Sessions
export interface TimeSlot {
  time: string; // "09:00"
  sessions: GridSession[];
}

export interface DailySchedule {
  date: string;
  rooms: GridRoom[];
  timeSlots: TimeSlot[];
}

export const getSchedule = async (year: string | number): Promise<DailySchedule[]> => {
  const config = getEditionConfig(year);
  // GridSmart view gives us the room/grid layout structure
  const url = `${config.sessionizeUrl}/view/GridSmart`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch schedule: ${response.statusText}`);
    }
    const data: GridSchedule[] = await response.json();

    // Transform for easier consumption
    return data.map((day) => {
      // Create time slots for mobile view
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
          sessions: sessions.sort((a, b) => a.room.localeCompare(b.room)), // Sort by room name
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
};
