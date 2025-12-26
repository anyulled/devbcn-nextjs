"use client";

import { useState } from "react";
import { DailySchedule } from "@/hooks/useSchedule";
import SessionCard from "./SessionCard";
import { format, parseISO } from "date-fns";
import styles from "./schedule.module.scss";

interface ScheduleMobileProps {
  schedule: DailySchedule[];
  year: string;
}

export default function ScheduleMobile({ schedule, year }: ScheduleMobileProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!schedule || schedule.length === 0) {
    return <div className="text-center py-5">Schedule not yet published.</div>;
  }

  const currentDay = schedule[activeTab];
  // Calculate end range from format "09:00" to "10:00" roughly?
  // We'll rely on timeSlots which are "Start Time".
  // User wanted "group by hour". timeSlots are by start time.
  // Concurrent sessions will be in the same TimeSlot.

  return (
    <div className={styles.scheduleMobileContainer}>
      {/* Day Tabs */}
      <div className={styles.scheduleTabsMobile}>
        {schedule.map((day, index) => (
          <button key={day.date} className={`${styles.mobileTabBtn} ${activeTab === index ? styles.active : ""}`} onClick={() => setActiveTab(index)}>
            {format(parseISO(day.date), "MMM d")}
          </button>
        ))}
      </div>

      <div className={styles.scheduleList}>
        {currentDay.timeSlots.length === 0 ? (
          <div className="text-center py-5 text-muted">No sessions scheduled for this day.</div>
        ) : (
          currentDay.timeSlots.map((slot) => (
            <div key={slot.time} className={styles.timeSlotBlock}>
              <div className={styles.timeStickyHeader}>
                <h3>{slot.time}</h3>
              </div>
              <div className={styles.sessionsList}>
                {slot.sessions.map((session) => (
                  <div key={session.id} className={styles.mobileSessionWrapper}>
                    <SessionCard session={session} year={year} />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
