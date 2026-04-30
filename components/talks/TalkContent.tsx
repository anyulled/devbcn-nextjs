import AddToCalendarWrapper from "@/components/elements/AddToCalendarWrapper";
import VideoPlayer from "@/components/elements/VideoPlayer";
import { Speaker, Talk } from "@/hooks/types";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BuyTicketButton from "@/components/elements/BuyTicketButton";
import PageHeader from "../layout/PageHeader";

interface TalkContentProps {
  talk: Talk;
  speakers: Speaker[];
  year: string;
  tags: string[];
  slidesUrl: string;
  voteUrl: string;
  eventData: {
    venue: { name: string; mapUrl: string };
    tickets: {
      url: string;
    };
  };
  track: string;
  level: string;
}

const getSocialIcon = (linkType: string): string => {
  const iconMap = new Map<string, string>([
    ["Twitter", "fa-brands fa-twitter"],
    ["LinkedIn", "fa-brands fa-linkedin-in"],
    ["Facebook", "fa-brands fa-facebook-f"],
    ["Instagram", "fa-brands fa-instagram"],
    ["GitHub", "fa-brands fa-github"],
    ["Blog", "fa-solid fa-blog"],
    ["Company_Website", "fa-solid fa-building"],
    ["Other", "fa-solid fa-link"],
  ]);
  return iconMap.get(linkType) ?? "fa-solid fa-link";
};

const formatTalkDates = (talk: Talk) => {
  const startDate = talk.startsAt ? format(parseISO(talk.startsAt), "yyyy-MM-dd") : "";
  const startTime = talk.startsAt ? format(parseISO(talk.startsAt), "HH:mm") : "";
  const endDate = talk.endsAt ? format(parseISO(talk.endsAt), "yyyy-MM-dd") : "";
  const endTime = talk.endsAt ? format(parseISO(talk.endsAt), "HH:mm") : "";
  const startFormatted = talk.startsAt ? format(parseISO(talk.startsAt), "MMMM d, yyyy") : "";
  const timeFormatted = talk.startsAt && talk.endsAt ? `${format(parseISO(talk.startsAt), "h:mm a")} - ${format(parseISO(talk.endsAt), "h:mm a")}` : "";

  return { startDate, startTime, endDate, endTime, startFormatted, timeFormatted };
};

const SpeakerCard: React.FC<Readonly<{ speaker: Speaker; year: string }>> = ({ speaker, year }) => (
  <div className="col-lg-4 col-md-6" key={speaker.id}>
    <div className="speaker-card">
      <div className="speaker-image-wrapper">
        <Link href={`/${year}/speakers/${speaker.id}`} className="speaker-image-link">
          <Image src={speaker.profilePicture} alt={speaker.fullName} fill className="speaker-image" sizes="(max-width: 768px) 100vw, 400px" />
        </Link>
      </div>
      <div className="speaker-content">
        <h4 className="speaker-name mb-0">
          <Link href={`/${year}/speakers/${speaker.id}`}>{speaker.fullName}</Link>
        </h4>
        <div className="space16" />
        <p className="speaker-position mb-0">{speaker.tagLine}</p>
        <div className="space24" />
        {speaker.links.length > 0 && (
          <div className="speaker-socials">
            {speaker.links.slice(0, 4).map((link) => (
              <a key={link.title} href={link.url} className="social-link" target="_blank" rel="noopener noreferrer" title={link.title}>
                <i className={getSocialIcon(link.linkType)} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

const SessionDetailItem: React.FC<{ icon: string; label: string; value: React.ReactNode }> = ({ icon, label, value }) => (
  <li>
    <strong>{label}:</strong>{" "}
    <span>
      <img src={`/assets/img/icons/${icon}`} alt="" style={{ width: "16px", marginRight: "8px" }} />
      {value}
    </span>
  </li>
);

const TagList: React.FC<{ tags: string[]; year: string }> = ({ tags, year }) => (
  <div style={{ marginBottom: "24px", marginTop: "16px" }}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/${year}/tags/${tag.replaceAll(" ", "-").toLowerCase()}`}
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            textDecoration: "none",
          }}
        >
          {tag}
        </Link>
      ))}
    </div>
  </div>
);

const TalkContent: React.FC<TalkContentProps> = ({ talk, speakers, year, tags, slidesUrl, voteUrl, eventData, track, level }) => {
  const { startDate, startTime, endDate, endTime, startFormatted, timeFormatted } = formatTalkDates(talk);
  const venueMapUrl = eventData.venue.mapUrl;

  return (
    <div>
      <PageHeader title={talk.title} backgroundImageId={7} breadcrumbText="Talks" />
      <div className="event-sidepage-section-area sp8">
        <div className="container">
          <div className="row">
            {/* Left Column - Session Content */}
            <div className="col-lg-7">
              <div className="event-side-images">
                <div className="space16" />

                {/* Session Description */}
                <p style={{ lineHeight: "1.8", whiteSpace: "pre-line" }}>{talk.description}</p>

                <div className="space24" />

                {/* Video Player */}
                {talk.recordingUrl && (
                  <div style={{ marginBottom: "32px" }}>
                    <VideoPlayer url={talk.recordingUrl} title={talk.title} />
                  </div>
                )}

                <div className="space40" />

                {/* Speakers Section */}
                <h4>Session Speakers</h4>
                <div className="row">
                  {speakers.map((speaker) => (
                    <SpeakerCard key={speaker.id} speaker={speaker} year={year} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Session Details Sidebar */}
            <div className="col-lg-5">
              <div className="shedule-listarea">
                <div className="content-area">
                  <h4 style={{ marginBottom: "20px" }}>Session Details</h4>
                  <ul>
                    {startFormatted && <SessionDetailItem icon="calender1.svg" label="Start" value={startFormatted} />}
                    {timeFormatted && <SessionDetailItem icon="clock1.svg" label="Time" value={timeFormatted} />}
                    {talk.room && <SessionDetailItem icon="location1.svg" label="Room" value={talk.room} />}
                    <SessionDetailItem icon="tag1.svg" label="Track" value={track} />
                    {level && (
                      <li>
                        <strong>Level:</strong> <span>{level}</span>
                      </li>
                    )}
                  </ul>
                  <h5>Tags:</h5>
                  {tags.length > 0 && <TagList tags={tags} year={year} />}

                  <div className="space24" />

                  {/* Action Buttons */}
                  <div
                    className="btn-area1"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {/* Add to Calendar Button */}
                    <AddToCalendarWrapper
                      name={talk.title}
                      description={talk.description || ""}
                      startDate={startDate}
                      startTime={startTime}
                      endDate={endDate}
                      endTime={endTime}
                      location={talk.room || eventData.venue.name}
                    />

                    {/* OpenFeedback Vote Button */}
                    <a href={voteUrl} target="_blank" rel="noopener noreferrer" className="vl-btn1">
                      <span className="demo">
                        <i className="fa-solid fa-thumbs-up me-2" /> Vote on OpenFeedback
                      </span>
                    </a>

                    {/* Buy Tickets Link */}
                    <BuyTicketButton href={eventData.tickets.url} className="vl-btn1" location="talk_detail" year={year} text="Get Tickets" />

                    {/* Slides Link */}
                    {slidesUrl && (
                      <a href={slidesUrl} target="_blank" rel="noopener noreferrer" className="vl-btn1" style={{ backgroundColor: "#2563eb" }}>
                        <span className="demo">
                          <i className="fa-solid fa-file-powerpoint" style={{ marginRight: "8px" }} /> View Slides
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="space30" />

                {/* Venue Map */}
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      src={venueMapUrl}
                      width={460}
                      height={350}
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="World Trade Center Barcelona"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkContent;
