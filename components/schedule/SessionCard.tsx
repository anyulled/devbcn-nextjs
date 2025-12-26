"use client";

import { GridSession } from "@/hooks/useSchedule";
import { useScheduleContext } from "@/context/ScheduleContext";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import styles from "./schedule.module.scss";

interface SessionCardProps {
  session: GridSession;
  year: string;
  showTime?: boolean;
}

export default function SessionCard({ session, year, showTime = false }: SessionCardProps) {
  const { isSaved, toggleSession } = useScheduleContext();
  const saved = isSaved(session.id);
  const isService = session.isServiceSession;

  // Format times
  const startTime = format(parseISO(session.startsAt), "HH:mm");
  const endTime = format(parseISO(session.endsAt), "HH:mm");

  if (isService) {
    return (
      <div className={`${styles.scheduleCard} ${styles.serviceCard}`}>
        <div className="card-content">
          {showTime && (
            <span className={styles.timeBadge}>
              {startTime} - {endTime}
            </span>
          )}
          <h4 className={styles.serviceTitle}>{session.title}</h4>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.scheduleCard} ${saved ? styles.saved : ""}`}>
      {showTime && (
        <div className={styles.cardHeader}>
          <span className={styles.timeBadge}>
            {startTime} - {endTime}
          </span>
        </div>
      )}

      <Link href={`/${year}/talks/${session.id}`} className={styles.cardLink}>
        <h3 className={styles.sessionTitle} title={session.title}>
          {session.title.length > 50 ? `${session.title.substring(0, 50)}...` : session.title}
        </h3>
      </Link>

      <div className={styles.speakers}>
        {session.speakers.map((speaker) => (
          <Link key={speaker.id} href={`/${year}/speakers/${speaker.id}`} className={styles.speakerLink}>
            {speaker.name}
          </Link>
        ))}
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.roomInfo}>
          <i className="fa-solid fa-location-dot" /> {session.room}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSession(session.id);
          }}
          className={styles.saveBtn}
          title={saved ? "Remove from my schedule" : "Add to my schedule"}
        >
          <i className={`fa-${saved ? "solid" : "regular"} fa-heart`} />
        </button>
      </div>
    </div>
  );
}
