import { Speaker } from "@/hooks/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PageHeader from "../layout/PageHeader";
import CTASection from "../sections/CTASection";
import SpeakerCard from "../layout/SpeakerCard";

interface SpeakerContentProps {
  speaker: Speaker;
  year: string;
  eventData: {
    showCountdown: boolean;
    venue: { name: string; mapUrl: string };
    tickets: {
      url: string;
    };
    event: {
      startDay: Date;
      endDay: Date;
    };
  };
}

const SpeakerContent: React.FC<SpeakerContentProps> = ({ speaker, year, eventData }) => {
  return (
    <div>
      {/* Header Section */}
      <PageHeader title={speaker.fullName} backgroundImageId={7} breadcrumbText="Speakers" />

      {/* Speaker Details Section */}
      <div className="team-speakers-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="speakers-details-box">
                <div className="row align-items-center">
                  {/* Speaker Image and Info Card */}
                  <div className="col-lg-5 mb-4 mb-lg-0">
                    <SpeakerCard
                      name={speaker.fullName}
                      position={speaker.tagLine}
                      image={speaker.profilePicture}
                      links={speaker.links}
                      speakerId={speaker.id}
                      year={Number.parseInt(year, 10)}
                    />
                  </div>

                  {/* Speaker Bio */}
                  <div className="col-lg-7">
                    <div className="speakesr-details-content heading2">
                      <h2>About {speaker.firstName}</h2>
                      <div className="space16" />
                      <p style={{ whiteSpace: "pre-line" }}>{speaker.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sessions Section */}
      {speaker.sessions.length > 0 && (
        <div className="event-team-area sp10">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading2 text-center space-margin60">
                  <h2>Sessions by {speaker.fullName}</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 m-auto">
                <div className="event-widget-area">
                  {speaker.sessions.map((session, index) => (
                    <div className="row" key={session.id}>
                      <div className="col-lg-10 m-auto">
                        <div className="event2-boxarea box1" style={{ marginBottom: "24px" }}>
                          <h1 className="active">{String(index + 1).padStart(2, "0")}</h1>
                          <div className="row align-items-center">
                            <div className="col-lg-12">
                              <div className="content-area">
                                <Link href={`/${year}/talks/${session.id}`} className="head">
                                  {session.name}
                                </Link>
                                <div className="author-area">
                                  <div className="autho-name-area">
                                    <div className="img1">
                                      <Image
                                        src={speaker.profilePicture}
                                        alt={speaker.fullName}
                                        width={50}
                                        height={50}
                                        style={{ borderRadius: "50%", objectFit: "cover" }}
                                      />
                                    </div>
                                    <div className="text">
                                      <span>
                                        <strong>{speaker.fullName}</strong>
                                      </span>
                                      <p>{speaker.tagLine}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="space24" />
                                <div className="btn-area1">
                                  <Link href={`/${year}/talks/${session.id}`} className="vl-btn1">
                                    <span className="demo">View Session Details</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <CTASection
        showCountdown={eventData.showCountdown}
        ticketUrl={eventData.tickets.url}
        eventEndDate={eventData.event.endDay}
        eventStartDate={eventData.event.startDay}
        eventLocation={eventData.venue}
      />
    </div>
  );
};

export default SpeakerContent;
