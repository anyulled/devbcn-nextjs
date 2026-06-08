"use client";

import { GridSession } from "@/hooks/useSchedule";
import { useScheduleContext } from "@/context/ScheduleContext";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { MouseEvent } from "react";
import styles from "./schedule.module.scss";

interface SessionCardProps {
  session: GridSession;
  year: string;
  showTime?: boolean;
  showRoom?: boolean;
  showExtendedMeta?: boolean;
}

interface ServiceSessionCardProps {
  session: GridSession;
  shouldShowTime: boolean;
  startTime: string;
  endTime: string;
}

interface SaveButtonProps {
  saved: boolean;
  onToggle: (event: MouseEvent<HTMLButtonElement>) => void;
}

function ServiceSessionCard({ session, shouldShowTime, startTime, endTime }: Readonly<ServiceSessionCardProps>) {
  return (
    <div className={`${styles.scheduleCard} ${styles.serviceCard}`}>
      <div className="card-content">
        {shouldShowTime && (
          <span className={styles.timeBadge}>
            {startTime} - {endTime}
          </span>
        )}
        <h4 className={styles.serviceTitle}>{session.title}</h4>
      </div>
    </div>
  );
}

function SaveButton({ saved, onToggle }: Readonly<SaveButtonProps>) {
  return (
    <button onClick={onToggle} className={styles.saveBtn} title={saved ? "Remove from my schedule" : "Add to my schedule"}>
      <i className={`fa-${saved ? "solid" : "regular"} fa-heart`} />
    </button>
  );
}

export default function SessionCard({ session, year, showTime = false, showRoom = true, showExtendedMeta = false }: Readonly<SessionCardProps>) {
  const { isSaved, toggleSession } = useScheduleContext();
  const saved = isSaved(session.id);
  const shouldShowTime = showTime || showExtendedMeta;

  const startTime = format(parseISO(session.startsAt), "HH:mm");
  const endTime = format(parseISO(session.endsAt), "HH:mm");

  if (session.isServiceSession) {
    return <ServiceSessionCard session={session} shouldShowTime={shouldShowTime} startTime={startTime} endTime={endTime} />;
  }

  const onToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleSession(session.id);
  };

  return (
    <div className={`${styles.scheduleCard} ${saved ? styles.saved : ""}`}>
      {shouldShowTime && (
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
        {showRoom && (
          <div className={styles.roomInfo}>
            <i className="fa-solid fa-location-dot" /> {session.room}
          </div>
        )}
        <SaveButton saved={saved} onToggle={onToggle} />
      </div>
    </div>
  );
}
