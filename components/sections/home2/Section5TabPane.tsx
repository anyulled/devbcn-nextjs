import Link from "next/link";

interface ScheduleItem {
  image: string;
  title: string;
}

interface Section5TabPaneProps {
  isActive: boolean;
  id: string;
  labelledBy: string;
  firstBoxClass?: string;
  activeIndex: number;
  items: ScheduleItem[];
}

export default function Section5TabPane({ isActive, id, labelledBy, firstBoxClass, activeIndex, items }: Section5TabPaneProps) {
  return (
    <div className={isActive ? "tab-pane fade show active" : "tab-pane fade"} id={id} role="tabpanel" aria-labelledby={labelledBy} tabIndex={0}>
      <div className="event-widget-area">
        {items.map((item, index) => {
          const boxClass =
            index === 0 ? (firstBoxClass ? `event2-boxarea ${firstBoxClass}` : "event2-boxarea") : index === 2 ? "event2-boxarea box3" : "event2-boxarea";
          const titleClass = index + 1 === activeIndex ? "active" : undefined;

          return (
            <div key={item.title}>
              <div className="row">
                <div className="col-lg-9 m-auto">
                  <div className={boxClass}>
                    <h1 className={titleClass}>{String(index + 1).padStart(2, "0")}</h1>
                    <div className="row align-items-center">
                      <div className="col-lg-5">
                        <div className="img1">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                      <div className="col-lg-7">
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
                            {item.title}
                          </Link>
                          <div className="space24" />
                          <div className="author-area">
                            <div className="autho-name-area">
                              <div className="img1">
                                <img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
                              </div>
                              <div className="text">
                                <Link href="/speakers">Alex Roberton</Link>
                                <div className="space8" />
                                <p>UI/UX Designer</p>
                              </div>
                            </div>
                            <div
                              className="autho-name-area"
                              style={{
                                padding: "0 0 0 12px",
                                border: "none",
                              }}
                            >
                              <div className="img1">
                                <img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
                              </div>
                              <div className="text">
                                <Link href="/speakers">Alexys Archer</Link>
                                <div className="space8" />
                                <p>WP Developer</p>
                              </div>
                            </div>
                          </div>
                          <div className="space24" />
                          <div className="btn-area1">
                            <Link href="/pricing-plan" className="vl-btn2">
                              <span className="demo">purchase ticket now</span>
                              <span className="arrow">
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
              {index < items.length - 1 ? <div className="space30" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
