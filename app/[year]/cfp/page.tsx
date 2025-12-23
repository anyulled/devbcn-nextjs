import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { formatEventDateRange, getEditionConfig } from "@/config/editions";
import Link from "next/link";
import { cfpData } from "./cfpData";

interface CFPProps {
  params: Promise<{ year: string }>;
}

export default async function CFP({ params }: CFPProps) {
  const { year } = await params;
  const cfpCommittee = cfpData[year];
  const eventData = getEditionConfig(year);
  return (
    <div>
      <PageHeader
        title={`Call for Papers ${year}`}
        breadcrumbText={`Call for Papers ${year}`}
        backgroundImageId={13}
      />

      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <div className="text-center" style={{ padding: "60px 0 40px" }}>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#666" }}>
                We&apos;re excited to announce the members of the Call for
                Papers committee for the next DevBcn conference! These
                experienced professionals will be reviewing and selecting the
                best talks and workshops for the upcoming event.
              </p>
            </div>
          </div>
        </div>
      </div>

      {cfpCommittee && cfpCommittee.length > 0 ? (
        <>
          {cfpCommittee.map((track, trackIndex) => (
            <div key={track.id} className="team10-section-area sp3">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 m-auto">
                    <div className="heading13 text-center space-margin60">
                      <h5>
                        <img src="/assets/img/icons/sub-logo1.svg" alt="" />
                        CFP Committee
                      </h5>
                      <div className="space20" />
                      <h2 style={{ color: "#1a1a1a" }}>{track.name}</h2>
                    </div>
                  </div>
                </div>
                {track.members.length > 0 ? (
                  <div className="row">
                    {track.members.map((member, memberIndex) => (
                      <div
                        key={`${track.id}-${memberIndex}`}
                        className="col-lg-3 col-md-4 col-sm-6"
                      >
                        <div className="team10-widget-boxarea2">
                          <div className="img1 image-anime">
                            <img
                              src={
                                member.photo ||
                                "/assets/img/all-images/team/team-img39.png"
                              }
                              alt={member.name}
                            />
                          </div>
                          <div className="text-area">
                            <div className="heading">
                              <h4>{member.name}</h4>
                            </div>
                            <div className="space16" />
                            {(member.linkedIn || member.twitter) && (
                              <div className="social-icons">
                                {member.linkedIn && (
                                  <Link
                                    href={member.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i className="fa-brands fa-linkedin" />
                                  </Link>
                                )}
                                {member.twitter && (
                                  <Link
                                    href={member.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i className="fa-brands fa-twitter" />
                                  </Link>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="space30" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-12 text-center">
                      <p>No committee members assigned to this track yet.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="team10-section-area sp3">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 m-auto">
                <div className="heading13 text-center">
                  <h2>CFP Committee information coming soon for {year}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CTASection
        eventDate={formatEventDateRange(
          eventData.event.startDay,
          eventData.event.endDay,
        )}
        eventLocation={eventData.venue}
        ticketUrl={eventData.tickets.url}
      />
    </div>
  );
}
