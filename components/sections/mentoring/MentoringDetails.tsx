import Image from "next/image";
import { Mic, Target, Calendar, Users } from "lucide-react";
import BuyTicketButton from "@/components/elements/BuyTicketButton";
import { getEditionConfig } from "@/config/editions";
import { getMentoringScheduleForYear } from "@/config/ama-mentoring";
import SessionScheduleSection from "@/components/sections/ama-mentoring/SessionScheduleSection";

interface MentoringDetailsProps {
  year: string;
}

export default function MentoringDetails({ year }: Readonly<MentoringDetailsProps>) {
  const eventData = getEditionConfig(year);
  const mentoringSchedule = getMentoringScheduleForYear(year);
  return (
    <>
      <section className="feature-details-section">
        <div className="container">
          <div className="section-header">
            <h2>Speaking Mentoring</h2>
            <p>Elevate your public speaking skills and master the art of conference abstracts with expert guidance.</p>
          </div>

          <div className="feature-content-wrapper">
            <div className="feature-image">
              <Image src="/assets/img/features/speaking-mentoring.png" alt="Speaking Mentoring at DevBcn" fill className="object-cover" priority />
            </div>
            <div className="feature-info">
              <h3>Master Your Message: Expert Mentoring</h3>
              <div className="feature-description">
                <p>
                  Our Speaking Mentoring sessions are dedicated to helping developers become better communicators. Whether you're a first-time speaker or
                  looking to refine your stage presence, these 1-hour sessions provide personalized feedback and strategies.
                </p>
                <p>
                  Learn how to craft compelling abstracts that get accepted, structure your technical talks for maximum impact, and overcome public speaking
                  anxiety in a supportive environment.
                </p>
              </div>

              <div className="feature-highlights">
                <div className="highlight-item">
                  <div className="icon-box">
                    <Users size={20} />
                  </div>
                  <div className="text-box">
                    <span>Small Groups</span>
                    <p>Up to 10 attendees per session</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <div className="icon-box">
                    <Mic size={20} />
                  </div>
                  <div className="text-box">
                    <span>Public Speaking</span>
                    <p>Master confidence and impact</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <div className="icon-box">
                    <Target size={20} />
                  </div>
                  <div className="text-box">
                    <span>Abstract Prep</span>
                    <p>Learn how to get your talks accepted</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <div className="icon-box">
                    <Calendar size={20} />
                  </div>
                  <div className="text-box">
                    <span>Daily Slots</span>
                    <p>Multiple opportunities during the day</p>
                  </div>
                </div>
              </div>

              <div className="cta-area">
                <BuyTicketButton text={`Register for DevBcn ${eventData.edition}`} href={eventData.tickets.url} location="mentoring_details" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SessionScheduleSection
        year={year}
        schedule={mentoringSchedule}
        title="Public Speaking Mentoring Schedule"
        description="The workbook-backed schedule below shows the live speaker assignments for each public speaking mentoring slot."
        sessionType="mentoring"
      />
    </>
  );
}
