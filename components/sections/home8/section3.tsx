"use client";
import Link from "next/link";
import Image from "next/image";
import BuyTicketButton from "../../elements/BuyTicketButton";

export default function Section3() {
  return (
    <div className="event8-section-area sp1" style={{ position: "relative" }}>
      <Image src="/assets/img/bg/header-bg20.png" alt="" fill style={{ objectFit: "cover", zIndex: -1 }} quality={80} />
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
                              <Image
                                src="/assets/img/all-images/about/devbcn-1.webp"
                                alt="DevBcn"
                                width={500}
                                height={300}
                                style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "4px" }}
                                sizes="(max-width: 992px) 100vw, 40vw"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 mb-4">
                      <div className="event2-boxarea box1">
                        <div className="row align-items-center">
                          <div className="col-lg-7">
                            <div className="content-area">
                              <Link href="/event-single" className="head">
                                Why should i participate?
                              </Link>
                              <div className="space20" />
                              <p>
                                Discover how others use your favorite technologies. From Backend and Frontend to Cloud, AI, and DevOps, there's something for
                                every tech enthusiast to learn and share.
                              </p>
                              <div className="space24" />
                              <div className="btn-area1">
                                <BuyTicketButton />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-5">
                            <div className="img1">
                              <Image
                                src="/assets/img/all-images/about/devbcn2.webp"
                                alt="DevBcn"
                                width={500}
                                height={300}
                                style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "4px" }}
                                sizes="(max-width: 992px) 100vw, 40vw"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

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
                              <Image
                                src="/assets/img/all-images/about/FaqsImage1.webp"
                                alt="DevBcn"
                                width={500}
                                height={300}
                                style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "4px" }}
                                sizes="(max-width: 992px) 100vw, 40vw"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

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
                              <Image
                                src="/assets/img/all-images/about/FaqsImage0.webp"
                                alt="DevBcn"
                                width={500}
                                height={300}
                                style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "4px" }}
                                sizes="(max-width: 992px) 100vw, 40vw"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
