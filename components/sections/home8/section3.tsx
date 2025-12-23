"use client";
import Link from "next/link";
import { useState } from "react";

export default function Section3() {
  const [isTab, setIsTab] = useState(1);
  const handleTab = (i: number) => {
    setIsTab(i);
  };
  return (
    <>
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
                      <div className="col-lg-10 m-auto">
                        <div className="event2-boxarea box1">
                          <div className="row align-items-center">
                            <div className="col-lg-7">
                              <div className="content-area">
                                <Link href="/event-single" className="head">
                                  What is the Barcelona Developers Conference?
                                </Link>
                                <div className="space20" />
                                <p>
                                  Two days to share knowledge and experiences, meet enthusiasts and geeks and learn about new technologies related to Backend
                                  and frontend development, AI, Agile, DevOps, Cloud, and many others.
                                </p>
                                <div className="space24" />
                                <div className="btn-area1">
                                  <a href="https://tickets.devbcn.com/event/devbcn-2026" className="vl-btn8" target="_blank" rel="noopener noreferrer">
                                    <span className="demo">Buy Ticket Now</span>
                                    <span className="arrow">
                                      <i className="fa-solid fa-arrow-right" />
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="img1">
                                <img src="/assets/img/all-images/about/devbcn-1.webp" alt="DevBcn" />
                              </div>
                            </div>
                            <div className="space24" />
                            <div className="col-gl-12">
                              <div className="list">
                                <ul>
                                  <li>
                                    <Link href="/#">
                                      <img src="/assets/img/icons/clock1.svg" alt="" />
                                      June 16th - 17th, 2026 <span> | </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/#">
                                      <img src="/assets/img/icons/location1.svg" alt="" />
                                      World Trade Center, Barcelona{" "}
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space80" />
                    <div className="row">
                      <div className="col-lg-10 m-auto">
                        <div className="event2-boxarea box1">
                          <div className="row align-items-center">
                            <div className="col-lg-7">
                              <div className="content-area">
                                <Link href="/event-single" className="head">
                                  Why should i participate?
                                </Link>
                                <div className="space20" />
                                <p>
                                  This conference is the perfect stage to discover how others are using your favourite technology. There is something
                                  interesting for any kind of tech passionate: on the backend Java & JVM, Python, to Frontend with JavaScript, TypeScript and
                                  Web assembly; Also, Cloud, Kubernetes, and DevOps, Agile, Big Data, Machine Learning and more.
                                </p>
                                <div className="space24" />
                                <div className="btn-area1">
                                  <a href="https://tickets.devbcn.com/event/devbcn-2026" className="vl-btn8" target="_blank" rel="noopener noreferrer">
                                    <span className="demo">Buy Ticket Now</span>
                                    <span className="arrow">
                                      <i className="fa-solid fa-arrow-right" />
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="img1">
                                <img src="/assets/img/all-images/about/devbcn2.webp" alt="DevBcn" />
                              </div>
                            </div>
                            <div className="space24" />
                            <div className="col-gl-12">
                              <div className="list">
                                <ul>
                                  <li>
                                    <Link href="/#">
                                      <img src="/assets/img/icons/clock1.svg" alt="Date" />
                                      June 16th - 17th, 2026 <span> | </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/#">
                                      <img src="/assets/img/icons/location1.svg" alt="Location" />
                                      World Trade Center, Barcelona{" "}
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space80" />
                    <div className="row">
                      <div className="col-lg-10 m-auto">
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
                                <p>Check for videos/photos and summary of the DevBcn — 2025 edition — 2024 edition — 2023 edition</p>
                                <div className="btn-area1">
                                  <a href="https://tickets.devbcn.com/event/devbcn-2026" className="vl-btn8" target="_blank" rel="noopener noreferrer">
                                    <span className="demo">Buy Ticket Now</span>
                                    <span className="arrow">
                                      <i className="fa-solid fa-arrow-right" />
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="img1">
                                <img src="/assets/img/all-images/about/FaqsImage1.webp" alt="DevBcn" />
                              </div>
                            </div>
                            <div className="space24" />
                            <div className="col-gl-12">
                              <div className="list">
                                <ul>
                                  <li>
                                    <Link href="/2025">
                                      <img src="/assets/img/icons/clock1.svg" alt="2025 edition" />
                                      2025 edition <span> | </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/2024">
                                      <img src="/assets/img/icons/clock1.svg" alt="2024 edition" />
                                      2024 edition<span> | </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/2023">
                                      <img src="/assets/img/icons/clock1.svg" alt="2023 edition" />
                                      2023 edition{" "}
                                    </Link>
                                  </li>
                                </ul>
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
    </>
  );
}
