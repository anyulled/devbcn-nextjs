"use client";

import { GridSession } from "@/hooks/useSchedule";
import { useScheduleContext } from "@/context/ScheduleContext";
import Link from "next/link";
import { differenceInMinutes, format, parseISO } from "date-fns";
import styles from "./schedule.module.scss";

interface SessionCardProps {
  session: GridSession;
  year: string;
  showTime?: boolean;
  showExtendedMeta?: boolean;
}

interface SessionCardMeta {
  startTime: string;
  endTime: string;
  duration: string;
}

const getCategoryValue = (session: GridSession, categoryName: string): string | null => {
  const category = session.categories?.find((item) => item.name.toLowerCase() === categoryName.toLowerCase());
  return category?.categoryItems[0]?.name ?? null;
};

const formatDuration = (startIso: string, endIso: string): string => {
  const minutes = differenceInMinutes(parseISO(endIso), parseISO(startIso));
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${remainingMinutes} min`;
};

const buildMeta = (session: GridSession): SessionCardMeta => ({
  startTime: format(parseISO(session.startsAt), "HH:mm"),
  endTime: format(parseISO(session.endsAt), "HH:mm"),
  duration: formatDuration(session.startsAt, session.endsAt),
});

function ServiceSessionCard({ session, showTime, showExtendedMeta }: Readonly<Pick<SessionCardProps, "session" | "showTime" | "showExtendedMeta">>) {
  const { startTime, endTime, duration } = buildMeta(session);

  return (
    <div className={`${styles.scheduleCard} ${styles.serviceCard}`}>
      <div className="card-content">
        {showTime && (
          <span className={styles.timeBadge}>
            {startTime} - {endTime}
          </span>
        )}
        {showExtendedMeta && (
          <p className={styles.sessionMetaLine}>
            <span>{duration}</span>
            <span>•</span>
            <span>{session.room}</span>
          </p>
        )}
        <h4 className={styles.serviceTitle}>{session.title}</h4>
      </div>
    </div>
  );
}

function TalkSessionCard({ session, year, showTime, showExtendedMeta }: Readonly<SessionCardProps>) {
  const { isSaved, toggleSession } = useScheduleContext();
  const saved = isSaved(session.id);
  const { startTime, endTime, duration } = buildMeta(session);
  const sessionFormat = getCategoryValue(session, "Session format");
  const sessionTrack = getCategoryValue(session, "Track");
  const sessionLevel = getCategoryValue(session, "Level");
  const talkMeta = [sessionTrack, sessionFormat, sessionLevel].filter((item): item is string => Boolean(item));

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
        {session.speakers[0] && (
          <Link href={`/${year}/speakers/${session.speakers[0].id}`} className={styles.speakerLink}>
            {session.speakers[0].name}
          </Link>
        )}
        {session.speakers.length > 1 && (
          <span className={styles.speakerExtras}>
            {session.speakers.slice(1).map((speaker) => (
              <Link key={speaker.id} href={`/${year}/speakers/${speaker.id}`} className={styles.speakerExtraLink}>
                {speaker.name}
              </Link>
            ))}
          </span>
        )}
      </div>

      {showExtendedMeta && talkMeta.length > 0 && (
        <p className={styles.talkMetaLine}>
          {talkMeta.map((meta) => (
            <span key={meta}>{meta}</span>
          ))}
        </p>
      )}

      <div className={styles.cardFooter}>
        <div className={styles.roomInfo} aria-label={showExtendedMeta ? "Session timing and room" : "Session room"}>
          {showExtendedMeta ? (
            <>
              <span>{startTime}</span>
              <span>•</span>
              <span>{duration}</span>
              <span>•</span>
            </>
          ) : null}
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

export default function SessionCard({ session, year, showTime = false, showExtendedMeta = false }: Readonly<SessionCardProps>) {
  if (session.isServiceSession) {
    return <ServiceSessionCard session={session} showTime={showTime} showExtendedMeta={showExtendedMeta} />;
  }

  return <TalkSessionCard session={session} year={year} showTime={showTime} showExtendedMeta={showExtendedMeta} />;
}
