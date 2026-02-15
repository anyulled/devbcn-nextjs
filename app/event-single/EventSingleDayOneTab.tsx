import Link from "next/link";

interface EventSingleDayOneTabProps {
  isActive: boolean;
}

export default function EventSingleDayOneTab({ isActive }: EventSingleDayOneTabProps) {
  return (
    <div className={isActive ? "tab-pane fade show active" : "tab-pane fade"} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
      <div className="event-widget-area">
        <div className="row">
          <div className="col-lg-1" />
          <div className="col-lg-10 m-auto">
            <div className="event2-boxarea box1">
              <h1 className="active">01</h1>
              <div className="row align-items-center">
                <div className="col-lg-5">
                  <div className="img1">
                    <img src="/assets/img/all-images/event/event-img4.png" alt="" />
                  </div>
                </div>
                <div className="col-lg-1" />
                <div className="col-lg-6">
                  <div className="content-area">
                    <ul>
                      <li>
                        <Link href="/#">
                          <img src="/assets/img/icons/clock1.svg" alt="" />
                          10.00 AM -12.00 PM <span> | </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/#">
                          <img src="/assets/img/icons/location1.svg" alt="" />
                          26/C Asana, New York{" "}
                        </Link>
                      </li>
                    </ul>
                    <div className="space20" />
                    <Link href="/event-single" className="head">
                      Elevate User Experience Expertise
                    </Link>
                    <div className="space24" />
                    <div className="author-area">
                      <div className="autho-name-area">
                        <div className="img1">
                          <img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
                        </div>
                        <div className="text">
                          <Link href="/speakers-single">Alex Roberton</Link>
                          <div className="space8" />
                          <p>UI/UX Designer</p>
                        </div>
                      </div>
                      <div className="autho-name-area" style={{ padding: "0 0 0 12px", border: "none" }}>
                        <div className="img1">
                          <img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
                        </div>
                        <div className="text">
                          <Link href="/speakers-single">Alexys Archer</Link>
                          <div className="space8" />
                          <p>WP Developer</p>
                        </div>
                      </div>
                    </div>
                    <div className="space24" />
                    <div className="btn-area1">
                      <Link href="/pricing-plan" className="vl-btn1">
                        <span className="demo">purchase ticket Now</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space48" />
        <div className="row">
          <div className="col-lg-1" />
          <div className="col-lg-10 m-auto">
            <div className="event2-boxarea box1">
              <h1 className="active">02</h1>
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="content-area">
                    <ul>
                      <li>
                        <Link href="/#">
                          <img src="/assets/img/icons/clock1.svg" alt="" />
                          10.00 AM -12.00 PM <span> | </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/#">
                          <img src="/assets/img/icons/location1.svg" alt="" />
                          26/C Asana, New York{" "}
                        </Link>
                      </li>
                    </ul>
                    <div className="space20" />
                    <Link href="/event-single" className="head">
                      Elevate User Experience Expertise
                    </Link>
                    <div className="space24" />
                    <div className="author-area">
                      <div className="autho-name-area">
                        <div className="img1">
                          <img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
                        </div>
                        <div className="text">
                          <Link href="/speakers-single">Alex Roberton</Link>
                          <div className="space8" />
                          <p>UI/UX Designer</p>
                        </div>
                      </div>
                      <div className="autho-name-area" style={{ padding: "0 0 0 12px", border: "none" }}>
                        <div className="img1">
                          <img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
                        </div>
                        <div className="text">
                          <Link href="/speakers-single">Alexys Archer</Link>
                          <div className="space8" />
                          <p>WP Developer</p>
                        </div>
                      </div>
                    </div>
                    <div className="space24" />
                    <div className="btn-area1">
                      <Link href="/pricing-plan" className="vl-btn1">
                        <span className="demo">purchase ticket Now</span>
                      </Link>
                    </div>
                  </div>
                  <div className="space30 d-lg-none d-block" />
                </div>
                <div className="col-lg-5">
                  <div className="img1">
                    <img src="/assets/img/all-images/event/event-img5.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space30" />
        <div className="row">
          <div className="col-lg-1" />
          <div className="col-lg-10 m-auto">
            <div className="event2-boxarea box1">
              <h1 className="active">03</h1>
              <div className="row align-items-center">
                <div className="col-lg-5">
                  <div className="img1">
                    <img src="/assets/img/all-images/event/event-img6.png" alt="" />
                  </div>
                </div>
                <div className="col-lg-1" />
                <div className="col-lg-6">
                  <div className="content-area">
                    <ul>
                      <li>
                        <Link href="/#">
                          <img src="/assets/img/icons/clock1.svg" alt="" />
                          10.00 AM -12.00 PM <span> | </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/#">
                          <img src="/assets/img/icons/location1.svg" alt="" />
                          26/C Asana, New York{" "}
                        </Link>
                      </li>
                    </ul>
                    <div className="space20" />
                    <Link href="/event-single" className="head">
                      Elevate User Experience Expertise
                    </Link>
                    <div className="space24" />
                    <div className="author-area">
                      <div className="autho-name-area">
                        <div className="img1">
                          <img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
                        </div>
                        <div className="text">
                          <Link href="/speakers-single">Alex Roberton</Link>
                          <div className="space8" />
                          <p>UI/UX Designer</p>
                        </div>
                      </div>
                      <div className="autho-name-area" style={{ padding: "0 0 0 12px", border: "none" }}>
                        <div className="img1">
                          <img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
                        </div>
                        <div className="text">
                          <Link href="/speakers-single">Alexys Archer</Link>
                          <div className="space8" />
                          <p>WP Developer</p>
                        </div>
                      </div>
                    </div>
                    <div className="space24" />
                    <div className="btn-area1">
                      <Link href="/pricing-plan" className="vl-btn1">
                        <span className="demo">purchase ticket Now</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
