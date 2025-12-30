import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Speaker, Talk } from "@/hooks/types";

interface RelatedTalksProps {
  relatedTalks: Talk[];
  relatedTalksSpeakers: Map<string, Speaker[]>;
  year: string;
}

const RelatedTalks: React.FC<RelatedTalksProps> = ({ relatedTalks, relatedTalksSpeakers, year }) => {
  if (relatedTalks.length === 0) return null;

  return (
    <div className="event-single-section-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto">
            <div className="event2-header heading2 text-center">
              <h2>More Talks from This Track</h2>
            </div>
          </div>
          <div className="space32" />
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="tab-content">
              <div className="tab-pane fade show active">
                <div className="event-widget-area">
                  {relatedTalks.map((relatedTalk, index) => {
                    const relSpeakers = relatedTalksSpeakers.get(relatedTalk.id) || [];
                    const relTime =
                      relatedTalk.startsAt && relatedTalk.endsAt
                        ? `${format(parseISO(relatedTalk.startsAt), "h:mm a")} - ${format(parseISO(relatedTalk.endsAt), "h:mm a")}`
                        : "";
                    return (
                      <div className="row" key={relatedTalk.id}>
                        <div className="col-lg-10 m-auto">
                          <div className="event2-boxarea box1" style={{ marginBottom: "24px" }}>
                            <h1 className="active">{String(index + 1).padStart(2, "0")}</h1>
                            <div className="row align-items-center">
                              <div className="col-lg-12">
                                <div className="content-area">
                                  <ul>
                                    {relTime && (
                                      <li>
                                        <span>
                                          <img src="/assets/img/icons/clock1.svg" alt="" />
                                          {relTime}
                                          {relatedTalk.room && <span> | </span>}
                                        </span>
                                      </li>
                                    )}
                                    {relatedTalk.room && (
                                      <li>
                                        <span>
                                          <img src="/assets/img/icons/location1.svg" alt="" />
                                          {relatedTalk.room}
                                        </span>
                                      </li>
                                    )}
                                  </ul>
                                  <div className="space20" />
                                  <Link href={`/${year}/talks/${relatedTalk.id}`} className="head">
                                    {relatedTalk.title}
                                  </Link>
                                  <div className="space24" />
                                  <div className="author-area">
                                    {relSpeakers.slice(0, 2).map((speaker, speakerIdx) => (
                                      <div
                                        key={speaker.id}
                                        className="autho-name-area"
                                        style={{
                                          padding: speakerIdx > 0 ? "0 0 0 12px" : undefined,
                                          border: speakerIdx > 0 ? "none" : undefined,
                                        }}
                                      >
                                        <div className="img1">
                                          <Image
                                            src={speaker.profilePicture}
                                            alt={speaker.fullName}
                                            width={50}
                                            height={50}
                                            style={{
                                              borderRadius: "50%",
                                              objectFit: "cover",
                                            }}
                                          />
                                        </div>
                                        <div className="text">
                                          <Link href={`/${year}/speakers/${speaker.id}`}>{speaker.fullName}</Link>
                                          <div className="space8" />
                                          <p>{speaker.tagLine}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="space24" />
                                  <div className="btn-area1">
                                    <Link href={`/${year}/talks/${relatedTalk.id}`} className="vl-btn1">
                                      <span className="demo">View Session Details</span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedTalks;
