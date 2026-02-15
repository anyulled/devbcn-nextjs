import Link from "next/link";

interface Section6TabPaneProps {
  isActive: boolean;
  id: string;
  labelledBy: string;
}

export default function Section6TabPane({ isActive, id, labelledBy }: Section6TabPaneProps) {
  return (
    <div className={isActive ? "tab-pane fade show active" : "tab-pane fade"} id={id} role="tabpanel" aria-labelledby={labelledBy} tabIndex={0}>
      <div className="tabs-widget-boxarea" data-aos="fade-up" data-aos-duration={800}>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="all-content-area">
              <div className="img1">
                <img src="/assets/img/all-images/event/event-img15.png" alt="" />
              </div>
              <div className="content-area">
                <ul>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/clock1.svg" alt="" /> 10:00 AM -12:00 PM <span> | </span>
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
                  Business World Event Introduction
                </Link>
                <div className="space16" />
                <p>There are many variations of passages available but the majority have suffered alteration in some form.</p>
                <div className="space32" />
                <div className="btn-area1">
                  <Link href="/pricing-plan" className="vl-btn7">
                    purchase ticket now
                    <span>
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="space48" />
            <div className="all-content-area">
              <div className="img1">
                <img src="/assets/img/all-images/event/event-img16.png" alt="" />
              </div>
              <div className="content-area">
                <ul>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/clock1.svg" alt="" /> 10:00 AM -12:00 PM <span> | </span>
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
                  Technology Summit Conference.
                </Link>
                <div className="space16" />
                <p>There are many variations of passages available but the majority have suffered alteration in some form.</p>
                <div className="space32" />
                <div className="btn-area1">
                  <Link href="/pricing-plan" className="vl-btn7">
                    purchase ticket now
                    <span>
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="space48" />
            <div className="all-content-area">
              <div className="img1">
                <img src="/assets/img/all-images/event/event-img17.png" alt="" />
              </div>
              <div className="content-area">
                <ul>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/clock1.svg" alt="" /> 10:00 AM -12:00 PM <span> | </span>
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
                  Digital Technology Conference.
                </Link>
                <div className="space16" />
                <p>There are many variations of passages available but the majority have suffered alteration in some form.</p>
                <div className="space32" />
                <div className="btn-area1">
                  <Link href="/pricing-plan" className="vl-btn7">
                    purchase ticket now
                    <span>
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="all-content-area">
              <div className="img1">
                <img src="/assets/img/all-images/event/event-img18.png" alt="" />
              </div>
              <div className="content-area">
                <ul>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/clock1.svg" alt="" /> 10:00 AM -12:00 PM <span> | </span>
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
                  Meeting With World Class Investors
                </Link>
                <div className="space16" />
                <p>Undertake specific mandates to address challenges the the authority delegated the highest method.</p>
                <div className="space32" />
                <div className="btn-area1">
                  <Link href="/pricing-plan" className="vl-btn7">
                    purchase ticket now
                    <span>
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="space48" />
            <div className="all-content-area">
              <div className="img1">
                <img src="/assets/img/all-images/event/event-img19.png" alt="" />
              </div>
              <div className="content-area">
                <ul>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/clock1.svg" alt="" /> 10:00 AM -12:00 PM <span> | </span>
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
                  Registration For Opening Workshop
                </Link>
                <div className="space16" />
                <p>Undertake specific mandates to address challenges the the authority delegated the highest method.</p>
                <div className="space32" />
                <div className="btn-area1">
                  <Link href="/pricing-plan" className="vl-btn7">
                    purchase ticket now
                    <span>
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="space48" />
            <div className="all-content-area">
              <div className="img1">
                <img src="/assets/img/all-images/event/event-img20.png" alt="" />
              </div>
              <div className="content-area">
                <ul>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/clock1.svg" alt="" /> 10:00 AM -12:00 PM <span> | </span>
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
                  Greeting And opening Event
                </Link>
                <div className="space16" />
                <p>Undertake specific mandates to address challenges the the authority delegated the highest method.</p>
                <div className="space32" />
                <div className="btn-area1">
                  <Link href="/pricing-plan" className="vl-btn7">
                    purchase ticket now
                    <span>
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
