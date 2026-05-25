"use client";

import { useState, useMemo } from "react";
import { DailySchedule, GridRoom } from "@/hooks/useSchedule";
import SessionCard from "./SessionCard";
import { format, parseISO, addMinutes, startOfDay } from "date-fns";
import styles from "./schedule.module.scss";

interface ScheduleGridProps {
  schedule: DailySchedule[];
  year: string;
}

const EMPTY_ROOMS: GridRoom[] = [];

export default function ScheduleGrid({ schedule, year }: Readonly<ScheduleGridProps>) {
  const [activeTab, setActiveTab] = useState(0);

  const hasSchedule = schedule && schedule.length > 0;
  const currentDay = hasSchedule ? schedule[activeTab] : null;
  const rooms = currentDay ? currentDay.rooms : EMPTY_ROOMS;
  const nonPlenumRooms = rooms.filter((room) => room.sessions.some((session) => !session.isPlenumSession));
  const displayRooms = nonPlenumRooms.length > 0 ? nonPlenumRooms : rooms;
  const roomColumnIndexById = new Map(displayRooms.map((room, index) => [room.id, index]));

  const { minTime, totalRows, timeLabels } = useMemo(() => {
    if (!rooms || rooms.length === 0) {
      return { minTime: 0, totalRows: 0, timeLabels: [] };
    }

    const { minTime: rawMinTime, maxTime: rawMaxTime } = rooms.reduce(
      (acc, room) => {
        return room.sessions.reduce(
          (sessionAcc, session) => {
            const start = parseISO(session.startsAt);
            const end = parseISO(session.endsAt);
            const startMinutes = start.getHours() * 60 + start.getMinutes();
            const endMinutes = end.getHours() * 60 + end.getMinutes();
            return {
              minTime: Math.min(sessionAcc.minTime, startMinutes),
              maxTime: Math.max(sessionAcc.maxTime, endMinutes),
            };
          },
          { minTime: acc.minTime, maxTime: acc.maxTime }
        );
      },
      { minTime: 24 * 60, maxTime: 0 }
    );

    const minTime = Math.floor(rawMinTime / 60) * 60;
    const maxTime = Math.ceil(rawMaxTime / 60) * 60;

    const totalMinutes = maxTime - minTime;
    const slotDuration = 30;
    const totalRows = Math.ceil(totalMinutes / slotDuration);

    const today = startOfDay(new Date());
    const timeLabels = Array.from({ length: totalRows + 1 }, (_, i) => {
      const minutes = minTime + i * slotDuration;
      const date = addMinutes(today, minutes);
      return format(date, "HH:mm");
    });

    return { minTime, totalRows, timeLabels };
  }, [rooms]);

  if (!hasSchedule) {
    return <div className="text-center py-5">Schedule not yet published.</div>;
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
            gridTemplateColumns: `80px repeat(${displayRooms.length}, 1fr)`,
            gridTemplateRows: `50px repeat(${totalRows * 2}, 30px)`,
          }}
        >
          {/* Header Row */}
          <div className="grid-header-corner"></div>
          {displayRooms.map((room) => (
            <div key={room.id} className={styles.gridHeaderRoom}>
              {room.name}
            </div>
          ))}

          {/* Time Column + Grid Lines */}
          {timeLabels.map((time, i) => {
            if (i === timeLabels.length - 1) return null;
            const rowStart = i * 2 + 2;
            return (
              <div key={time} className={styles.gridTimeLabel} style={{ gridRow: `${rowStart} / span 2` }}>
                {time}
              </div>
            );
          })}

          {/* Sessions */}
          {(() => {
            const renderedPlenumSessionIds = new Set<string>();

            return rooms.map((room) => {
              const roomColumnIndex = roomColumnIndexById.get(room.id);
              const gridColumn = typeof roomColumnIndex === "number" ? roomColumnIndex + 2 : -1;

              return room.sessions.map((session) => {
                const start = parseISO(session.startsAt);
                const end = parseISO(session.endsAt);

                const startMinutes = start.getHours() * 60 + start.getMinutes();
                const endMinutes = end.getHours() * 60 + end.getMinutes();

                const offset = startMinutes - minTime;
                const duration = endMinutes - startMinutes;

                const rowStart = Math.floor(offset / 15) + 2;
                const rowSpan = Math.ceil(duration / 15);

                if (session.isPlenumSession) {
                  if (renderedPlenumSessionIds.has(session.id)) return null;
                  renderedPlenumSessionIds.add(session.id);

                  return (
                    <div
                      key={session.id}
                      className={`${styles.gridSessionCell} ${styles.plenumSession}`}
                      style={{
                        gridColumn: `2 / span ${displayRooms.length}`,
                        gridRow: `${rowStart} / span ${rowSpan}`,
                      }}
                    >
                      <SessionCard session={session} year={year} />
                    </div>
                  );
                }

                if (gridColumn < 2) return null;

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
            });
          })()}
        </div>
      </div>
    </div>
  );
}
