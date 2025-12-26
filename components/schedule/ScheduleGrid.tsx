"use client";

import { useState } from "react";
import { DailySchedule } from "@/hooks/useSchedule";
import SessionCard from "./SessionCard";
import { format, parseISO, addMinutes, startOfDay } from "date-fns";
import styles from "./schedule.module.scss";

interface ScheduleGridProps {
  schedule: DailySchedule[];
  year: string;
}

export default function ScheduleGrid({ schedule, year }: ScheduleGridProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!schedule || schedule.length === 0) {
    return <div className="text-center py-5">Schedule not yet published.</div>;
  }

  const currentDay = schedule[activeTab];
  const rooms = currentDay.rooms;

  // Calculate grid dimensions
  // Find earliest start and latest end across all sessions to define grid range
  let minTime = 24 * 60; // Minutes from midnight
  let maxTime = 0;

  rooms.forEach((room) => {
    room.sessions.forEach((session) => {
      const start = parseISO(session.startsAt);
      const end = parseISO(session.endsAt);
      const startMinutes = start.getHours() * 60 + start.getMinutes();
      const endMinutes = end.getHours() * 60 + end.getMinutes();
      if (startMinutes < minTime) minTime = startMinutes;
      if (endMinutes > maxTime) maxTime = endMinutes;
    });
  });

  // Round down minTime to nearest hour
  minTime = Math.floor(minTime / 60) * 60;
  // Round up maxTime to nearest hour
  maxTime = Math.ceil(maxTime / 60) * 60;

  const totalMinutes = maxTime - minTime;
  const slotDuration = 30; // 30 minute increments
  const totalRows = Math.ceil(totalMinutes / slotDuration);

  // Generate time labels
  const timeLabels = [];
  for (let i = 0; i <= totalRows; i++) {
    const minutes = minTime + i * slotDuration;
    const date = addMinutes(startOfDay(new Date()), minutes);
    timeLabels.push(format(date, "HH:mm"));
  }

  return (
    <div className={styles.scheduleGridContainer}>
      {/* Day Tabs */}
      <div className={styles.scheduleTabs}>
        {schedule.map((day, index) => (
          <button key={day.date} className={`${styles.tabBtn} ${activeTab === index ? styles.active : ""} `} onClick={() => setActiveTab(index)}>
            {format(parseISO(day.date), "EEEE, MMMM d")}
          </button>
        ))}
      </div>

      <div className={styles.gridScrollWrapper}>
        <div
          className={styles.scheduleGrid}
          style={{
            gridTemplateColumns: `80px repeat(${rooms.length}, 1fr)`,
            gridTemplateRows: `50px repeat(${totalRows * 2}, 30px)`,
          }}
        >
          {/* Header Row */}
          <div className="grid-header-corner"></div>
          {rooms.map((room) => (
            <div key={room.id} className={styles.gridHeaderRoom}>
              {room.name}
            </div>
          ))}

          {/* Time Column + Grid Lines */}
          {timeLabels.map((time, i) => {
            if (i === timeLabels.length - 1) return null; // Skip last label row start
            const rowStart = i * 2 + 2; // +2 offset for header
            return (
              <div key={time} className={styles.gridTimeLabel} style={{ gridRow: `${rowStart} / span 2` }}>
                {time}
              </div>
            );
          })}

          {/* Sessions */}
          {rooms.map((room, colIndex) => {
            const gridColumn = colIndex + 2; // +1 for time col, +1 for 1-based index

            return room.sessions.map((session) => {
              const start = parseISO(session.startsAt);
              const end = parseISO(session.endsAt);

              const startMinutes = start.getHours() * 60 + start.getMinutes();
              const endMinutes = end.getHours() * 60 + end.getMinutes();

              const offset = startMinutes - minTime;
              const duration = endMinutes - startMinutes;

              const rowStart = Math.floor(offset / 15) + 2; // +2 for header
              const rowSpan = Math.ceil(duration / 15);

              // Handle Plenum Sessions (span all rooms)
              if (session.isPlenumSession) {
                // Only render the plenum session once (when processing the first room)
                if (colIndex !== 0) return null;

                return (
                  <div
                    key={session.id}
                    className={`${styles.gridSessionCell} ${styles.plenumSession}`}
                    style={{
                      gridColumn: `2 / span ${rooms.length}`, // Span all room columns
                      gridRow: `${rowStart} / span ${rowSpan}`,
                    }}
                  >
                    <SessionCard session={session} year={year} />
                  </div>
                );
              }

              return (
                <div
                  key={session.id}
                  className={styles.gridSessionCell}
                  style={{
                    gridColumn: gridColumn,
                    gridRow: `${rowStart} / span ${rowSpan}`,
                  }}
                >
                  <SessionCard session={session} year={year} />
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}
