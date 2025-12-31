import AddToCalendarWrapper from "@/components/elements/AddToCalendarWrapper";
import VideoPlayer from "@/components/elements/VideoPlayer";
import { Speaker, Talk } from "@/hooks/types";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
  const iconMap: Record<string, string> = {
    Twitter: "fa-brands fa-twitter",
    LinkedIn: "fa-brands fa-linkedin-in",
    Facebook: "fa-brands fa-facebook-f",
    Instagram: "fa-brands fa-instagram",
    GitHub: "fa-brands fa-github",
    Blog: "fa-solid fa-blog",
    Company_Website: "fa-solid fa-building",
    Other: "fa-solid fa-link",
  };
  return iconMap[linkType] || "fa-solid fa-link";
};

const getIconClass = (index: number): string => {
  const classes = ["icon1", "icon2", "icon3", "icon4"];
  return classes[index % classes.length];
};

const TalkContent: React.FC<TalkContentProps> = ({ talk, speakers, year, tags, slidesUrl, voteUrl, eventData, track, level }) => {
  // Format dates for display and calendar
  const startDate = talk.startsAt ? format(parseISO(talk.startsAt), "yyyy-MM-dd") : "";
  const startTime = talk.startsAt ? format(parseISO(talk.startsAt), "HH:mm") : "";
  const endDate = talk.endsAt ? format(parseISO(talk.endsAt), "yyyy-MM-dd") : "";
  const endTime = talk.endsAt ? format(parseISO(talk.endsAt), "HH:mm") : "";
  const startFormatted = talk.startsAt ? format(parseISO(talk.startsAt), "MMMM d, yyyy") : "";
  const timeFormatted = talk.startsAt && talk.endsAt ? `${format(parseISO(talk.startsAt), "h:mm a")} - ${format(parseISO(talk.endsAt), "h:mm a")}` : "";

  // WTC Barcelona coordinates for Google Maps
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
                    <div className="col-lg-4 col-md-6" key={speaker.id}>
                      <div className="our-team-boxarea">
                        <div className="team-widget-area">
                          <Image src="/assets/img/elements/elements25.png" alt="" className="elements21" width={100} height={100} />
                          <Image src="/assets/img/elements/elements26.png" alt="" className="elements22" width={100} height={100} />
                          <div className="img1">
                            <Link href={`/${year}/speakers/${speaker.id}`}>
                              <Image
                                src={speaker.profilePicture}
                                alt={speaker.fullName}
                                className="team-img4"
                                width={150}
                                height={150}
                                style={{ objectFit: "cover" }}
                              />
                            </Link>
                            {speaker.links.length > 0 && (
                              <>
                                <div className="share">
                                  <Link href="#">
                                    <img src="/assets/img/icons/share1.svg" alt="" />
                                  </Link>
                                </div>
                                <ul>
                                  {speaker.links.slice(0, 4).map((link, idx) => (
                                    <li key={link.title}>
                                      <a href={link.url} className={getIconClass(idx)} target="_blank" rel="noopener noreferrer" title={link.title}>
                                        <i className={getSocialIcon(link.linkType)} />
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="space28" />
                        <div className="content-area">
                          <Link href={`/${year}/speakers/${speaker.id}`}>{speaker.fullName}</Link>
                          <div className="space16" />
                          <p>{speaker.tagLine}</p>
                        </div>
                      </div>
                    </div>
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
                    {startFormatted && (
                      <li>
                        <strong>Start:</strong>{" "}
                        <span>
                          <img src="/assets/img/icons/calender1.svg" alt="" style={{ width: "16px", marginRight: "8px" }} />
                          {startFormatted}
                        </span>
                      </li>
                    )}
                    {timeFormatted && (
                      <li>
                        <strong>Time:</strong>{" "}
                        <span>
                          <img src="/assets/img/icons/clock1.svg" alt="" style={{ width: "16px", marginRight: "8px" }} />
                          {timeFormatted}
                        </span>
                      </li>
                    )}
                    {talk.room && (
                      <li>
                        <strong>Room:</strong>
                        <span>
                          <img src="/assets/img/icons/location1.svg" alt="" style={{ width: "16px", marginRight: "8px" }} />
                          {talk.room}
                        </span>
                      </li>
                    )}
                    <li>
                      <strong>Track:</strong>
                      <span>
                        <img src="/assets/img/icons/tag1.svg" alt="" style={{ width: "16px", marginRight: "8px" }} />
                        {track}
                      </span>
                    </li>
                    {level && (
                      <li>
                        <strong>Level:</strong> <span>{level}</span>
                      </li>
                    )}
                  </ul>
                  <h5>Tags:</h5>
                  {tags.length > 0 && (
                    <div style={{ marginBottom: "24px", marginTop: "16px" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {tags.map((tag, index) => (
                          <Link
                            key={index}
                            href={`/${year}/tags/${tag}`}
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
                  )}

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
                        <i className="fa-solid fa-thumbs-up" style={{ marginRight: "8px" }} />
                        Vote on OpenFeedback
                      </span>
                    </a>

                    {/* Buy Tickets Link */}
                    <Link href={eventData.tickets.url} className="vl-btn1">
                      <span className="demo">Get Tickets</span>
                    </Link>

                    {/* Slides Link */}
                    {slidesUrl && (
                      <a href={slidesUrl} target="_blank" rel="noopener noreferrer" className="vl-btn1" style={{ backgroundColor: "#2563eb" }}>
                        <span className="demo">
                          <i className="fa-solid fa-file-powerpoint" style={{ marginRight: "8px" }} />
                          View Slides
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
