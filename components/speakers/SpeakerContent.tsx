import React from "react";
import Link from "next/link";
import Image from "next/image";
import Countdown from "@/components/elements/Countdown";
import { Speaker } from "@/hooks/types";

interface SpeakerContentProps {
  speaker: Speaker;
  year: string;
  eventData: {
    venue: string;
    tickets: {
      url: string;
    };
    event: {
      startDay: Date;
    };
  };
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

const SpeakerContent: React.FC<SpeakerContentProps> = ({ speaker, year, eventData }) => {
  return (
    <div>
      {/* Header Section */}
      <div className="inner-page-header" style={{ backgroundImage: "url(/assets/img/bg/header-bg7.png)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="heading1 text-center">
                <h1>{speaker.fullName}</h1>
                <div className="space20" />
                <Link href={`/${year}`}>
                  Home <i className="fa-solid fa-angle-right" />{" "}
                </Link>
                <Link href={`/${year}/speakers`}>Speakers</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Speaker Details Section */}
      <div className="team-details-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="speakers-details-box">
                <div className="row align-items-center">
                  {/* Speaker Image and Info Card */}
                  <div className="col-lg-5">
                    <div className="our-team-boxarea">
                      <div className="team-widget-area">
                        <div className="img1">
                          <Image
                            src={speaker.profilePicture}
                            alt={speaker.fullName}
                            className="team-img4"
                            width={300}
                            height={300}
                            style={{ objectFit: "cover", borderRadius: "8px" }}
                          />
                        </div>
                      </div>
                      <div className="content-area">
                        <Link href="#">{speaker.fullName}</Link>
                        <div className="space16" />
                        <p>{speaker.tagLine}</p>
                        <div className="space24" />
                        {speaker.links.length > 0 && (
                          <ul>
                            {speaker.links.map((link, index) => (
                              <li key={link.title}>
                                <a href={link.url} className={getIconClass(index)} target="_blank" rel="noopener noreferrer" title={link.title}>
                                  <i className={getSocialIcon(link.linkType)} />
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
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
                                <div className="space20" />
                                <Link href={`/${year}/talks/${session.id}`} className="head">
                                  {session.name}
                                </Link>
                                <div className="space24" />
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
                                      <span>{speaker.fullName}</span>
                                      <div className="space8" />
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
      <div className="cta1-section-area d-lg-block d-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="cta1-main-boxarea">
                <div className="timer-btn-area">
                  <Countdown eventDate={eventData.event.startDay.toISOString()} />
                  <div className="btn-area1">
                    <Link href="/pricing-plan" className="vl-btn1">
                      Buy Ticket
                    </Link>
                  </div>
                </div>
                <ul>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/calender1.svg" alt="" />
                      16-17 June 2026
                    </Link>
                  </li>
                  <li className="m-0">
                    <Link href="/#">
                      <img src="/assets/img/icons/location1.svg" alt="" />
                      {eventData.venue}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerContent;
