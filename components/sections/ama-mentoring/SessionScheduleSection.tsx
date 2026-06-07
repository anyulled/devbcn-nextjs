import Image from "next/image";
import Link from "next/link";

import type { SessionScheduleSlot, SessionType } from "@/config/ama-mentoring/types";

interface DayScheduleGroup {
  day: SessionScheduleSlot["day"];
  timeSlots: Array<{
    time: string;
    slots: SessionScheduleSlot[];
  }>;
}

interface SessionScheduleSectionProps {
  year: string;
  schedule: SessionScheduleSlot[];
  title: string;
  description: string;
  sessionType: SessionType;
}

const groupSchedule = (schedule: SessionScheduleSlot[]): DayScheduleGroup[] => {
  const groupedByDay = new Map<SessionScheduleSlot["day"], Map<string, SessionScheduleSlot[]>>();

  schedule.forEach((slot) => {
    const dayGroup = groupedByDay.get(slot.day) ?? new Map<string, SessionScheduleSlot[]>();
    const timeGroup = dayGroup.get(slot.time) ?? [];
    timeGroup.push(slot);
    dayGroup.set(slot.time, timeGroup);
    groupedByDay.set(slot.day, dayGroup);
  });

  return Array.from(groupedByDay.entries()).map(([day, timeGroups]) => ({
    day,
    timeSlots: Array.from(timeGroups.entries()).map(([time, slots]) => ({
      time,
      slots,
    })),
  }));
};

export default function SessionScheduleSection({ year, schedule, title, description, sessionType }: Readonly<SessionScheduleSectionProps>) {
  const groupedSchedule = groupSchedule(schedule);

  if (groupedSchedule.length === 0) {
    return null;
  }

  return (
    <section className="session-schedule-section">
      <div className="container">
        <div className="session-schedule-panel">
          <div className="session-schedule-header">
            <p>{description}</p>
            <h3>{title}</h3>
          </div>

          <div className="session-schedule-days">
            {groupedSchedule.map((dayGroup) => (
              <article className="session-schedule-day" key={dayGroup.day}>
                <div className="session-schedule-day-head">
                  <h4>{dayGroup.day}</h4>
                  <span>{dayGroup.timeSlots.length} time slots</span>
                </div>

                <div className="session-schedule-day-body">
                  {dayGroup.timeSlots.map((timeSlot) => (
                    <div className="session-schedule-time-block" key={`${dayGroup.day}-${timeSlot.time}`}>
                      <div className="session-schedule-time">{timeSlot.time}</div>
                      <div className="session-schedule-slot-list">
                        {timeSlot.slots.map((slot) => (
                          <div className={`session-schedule-slot session-schedule-slot--${sessionType}`} key={`${slot.day}-${slot.time}-${slot.slotLabel}`}>
                            <span className="session-schedule-slot-label">{slot.slotLabel}</span>
                            <div className="session-schedule-speakers">
                              {slot.speakers.map((speaker) => (
                                <Link key={speaker.id} href={`/${year}/speakers/${speaker.id}`} className="session-schedule-speaker">
                                  <span className="session-schedule-speaker-avatar">
                                    <Image
                                      src={speaker.avatarUrl}
                                      alt=""
                                      aria-hidden="true"
                                      width={28}
                                      height={28}
                                      className="session-schedule-speaker-avatar-image"
                                    />
                                  </span>
                                  <span className="session-schedule-speaker-name">{speaker.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
