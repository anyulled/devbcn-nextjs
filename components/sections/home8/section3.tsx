"use client";
import Link from "next/link";
import BuyTicketButton from "../../elements/BuyTicketButton";

export default function Section3({ year = "2026" }: Readonly<{ year?: string }>) {
  return (
    <div
      className="event8-section-area sp1"
      style={{
        backgroundImage: "url(assets/img/bg/header-bg20.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-10 m-auto">
            <div className="event8-header space-margin60">
              <div className="heading11">
                <h2 className="text-anime-style-3">FAQs</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-duration={1000}>
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                <div className="event-widget-area">
                  <div className="row">
                    {/* What is the Barcelona Developers Conference? */}
                    <div className="col-lg-6 mb-4">
                      <div className="event2-boxarea box1">
                        <div className="row align-items-center">
                          <div className="col-lg-7">
                            <div className="content-area">
                              <Link href="/event-single" className="head">
                                What is the Barcelona Developers Conference?
                              </Link>
                              <div className="space20" />
                              <p>
                                Two days to share knowledge and experiences, meet enthusiasts and geeks and learn about new technologies related to Backend and
                                frontend development, AI, Agile, DevOps, Cloud, and many others.
                              </p>
                              <div className="space24" />
                              <div className="btn-area1">
                                <BuyTicketButton />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-5">
                            <div className="img1">
                              <img src="/assets/img/all-images/about/devbcn-1.webp" alt="DevBcn" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Convince your Boss */}
                    <div className="col-lg-6 mb-4">
                      <div className="event2-boxarea box1">
                        <div className="row align-items-center">
                          <div className="col-lg-7">
                            <div className="content-area">
                              <Link href={`/${year}/convince-your-boss`} className="head">
                                Convince your Boss
                              </Link>
                              <div className="space20" />
                              <p>
                                Do you need help to convince your boss to attend the conference? We have prepared a template for you to use and some tips to
                                help you get approval.
                              </p>
                              <div className="space24" />
                              <div className="btn-area1">
                                <BuyTicketButton text="Convince your Boss" href={`/${year}/convince-your-boss`} target="_self" />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-5">
                            <div className="img1">
                              <img src="/assets/img/all-images/about/devbcn2.webp" alt="DevBcn" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {year !== "2026" && (
                      <>
                        {/* More than Java & Cloud */}
                        <div className="col-lg-6 mb-4">
                          <div className="event2-boxarea box1">
                            <div className="row align-items-center">
                              <div className="col-lg-7">
                                <div className="content-area">
                                  <Link href="/event-single" className="head">
                                    More than Java & Cloud
                                  </Link>
                                  <div className="space20" />
                                  <p>DevBcn is the rebranding of the biggest Java & JVM conference in Spain, now including more technologies and tracks.</p>
                                  <div className="space24" />
                                  <p>
                                    Check for videos/photos and summary of the DevBcn —{" "}
                                    <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/AHWSu1WE288">
                                      2025 edition
                                    </a>{" "}
                                    —{" "}
                                    <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/k7iMIXtNKyo">
                                      2024 edition
                                    </a>{" "}
                                    —{" "}
                                    <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/6ZxsMUYBrSo">
                                      2023 edition
                                    </a>
                                  </p>
                                  <div className="btn-area1">
                                    <BuyTicketButton />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="img1">
                                  <img src="/assets/img/all-images/about/FaqsImage1.webp" alt="DevBcn" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Community & Networking */}
                        <div className="col-lg-6 mb-4">
                          <div className="event2-boxarea box1">
                            <div className="row align-items-center">
                              <div className="col-lg-7">
                                <div className="content-area">
                                  <Link href="/event-single" className="head">
                                    Community & Networking
                                  </Link>
                                  <div className="space20" />
                                  <p>
                                    Join one of the most vibrant developer communities in Europe. Connect with peers, meet world-class speakers, and expand your
                                    network during our breaks, parties, and special events.
                                  </p>
                                  <div className="space24" />
                                  <div className="btn-area1">
                                    <BuyTicketButton />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="img1">
                                  <img src="/assets/img/all-images/about/FaqsImage0.webp" alt="DevBcn" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {year === "2026" && (
                      <>
                        {/* AMA Sessions */}
                        <div className="col-lg-6 mb-4">
                          <div className="event2-boxarea box1">
                            <div className="row align-items-center">
                              <div className="col-lg-7">
                                <div className="content-area">
                                  <Link href={`/${year}/ama`} className="head">
                                    AMA Sessions
                                  </Link>
                                  <div className="space20" />
                                  <p>
                                    Ask me anything! Join 1-hour sessions with up to 6 attendees and a speaker right after the talk. Guaranteed seat with
                                    check-in.
                                  </p>
                                  <div className="space24" />
                                  <div className="btn-area1">
                                    <BuyTicketButton text="Check AMA Sessions" href={`/${year}/ama`} target="_self" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="img1">
                                  <img src="/assets/img/features/ama-sessions.png" alt="AMA Sessions" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Speaking Mentoring */}
                        <div className="col-lg-6 mb-4">
                          <div className="event2-boxarea box1">
                            <div className="row align-items-center">
                              <div className="col-lg-7">
                                <div className="content-area">
                                  <Link href={`/${year}/mentoring`} className="head">
                                    Speaking Mentoring
                                  </Link>
                                  <div className="space20" />
                                  <p>
                                    Elevate your speaking! 1-hour sessions for up to 10 attendees. Get mentored on public speaking and abstract preparation.
                                  </p>
                                  <div className="space24" />
                                  <div className="btn-area1">
                                    <BuyTicketButton text="Learn about Mentoring" href={`/${year}/mentoring`} target="_self" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="img1">
                                  <img src="/assets/img/features/speaking-mentoring.png" alt="Speaking Mentoring" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="space50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
