"use client";

import { useEffect, useState, useMemo } from "react";
import { DailySchedule } from "@/hooks/useSchedule";
import ScheduleGrid from "./ScheduleGrid";
import ScheduleMobile from "./ScheduleMobile";
import { useScheduleContext } from "@/context/ScheduleContext";
import styles from "./schedule.module.scss";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ScheduleContainerProps {
  initialSchedule: DailySchedule[];
  year: string;
}

export default function ScheduleContainer({ initialSchedule, year }: ScheduleContainerProps) {
  const { savedSessionIds } = useScheduleContext();
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");

  const filteredSchedule = useMemo(() => {
    if (!showSavedOnly) {
      return initialSchedule;
    }

    // Filter logic
    return initialSchedule.map((day) => ({
      ...day,
      rooms: day.rooms
        .map((room) => ({
          ...room,
          sessions: room.sessions.filter((s) => savedSessionIds.includes(s.id) || s.isServiceSession),
        }))
        .filter((room) => room.sessions.length > 0),
      timeSlots: day.timeSlots
        .map((slot) => ({
          ...slot,
          sessions: slot.sessions.filter((s) => savedSessionIds.includes(s.id) || s.isServiceSession),
        }))
        .filter((slot) => slot.sessions.length > 0),
    }));
  }, [showSavedOnly, savedSessionIds, initialSchedule]);

  return (
    <div>
      <div className="filter-bar text-center mb-4">
        <button className={`${styles.filterBtn} ${showSavedOnly ? styles.active : ""}`} onClick={() => setShowSavedOnly(!showSavedOnly)}>
          <i className={`fa-${showSavedOnly ? "solid" : "regular"} fa-heart`} /> My Schedule
        </button>
      </div>

      {/*
        Optimization: Only render the visible component to reduce DOM nodes.
        Render both (hidden via CSS) only during SSR/initial hydration (isMobile === null).
      */}

      {/* Desktop View */}
      {(isMobile === null || isMobile === false) && (
        <div className="d-none d-lg-block">
          <ScheduleGrid schedule={filteredSchedule} year={year} />
        </div>
      )}

      {/* Mobile View */}
      {(isMobile === null || isMobile === true) && (
        <div className="d-lg-none">
          <ScheduleMobile schedule={filteredSchedule} year={year} />
        </div>
      )}
    </div>
  );
}
