import Link from "next/link";

interface Section3ScheduleItem {
  image: string;
  title: string;
  description: string;
}

interface Section3TabPaneThreeProps {
  isActive: boolean;
  id: string;
  labelledBy: string;
  items: Section3ScheduleItem[];
  durations?: number[];
}

export default function Section3TabPaneThree({ isActive, id, labelledBy, items, durations = [] }: Section3TabPaneThreeProps) {
  return (
    <div className={isActive ? "tab-pane fade show active" : "tab-pane fade"} id={id} role="tabpanel" aria-labelledby={labelledBy} tabIndex={0}>
      {items.map((item, index) => {
        const duration = durations[index];
        const dataAosProps = duration ? { "data-aos": "fade-up", "data-aos-duration": duration } : {};

        return (
          <div key={item.title}>
            <div className="tabs-widget-boxarea" {...dataAosProps}>
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <div className="img1">
                    <img src={item.image} alt="" />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="content-area">
                    <ul>
                      <li>
                        <Link href="/#">
                          <img src="/assets/img/icons/clock1.svg" alt="" /> 10:00 AM -12:00 PM <span> | </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/#">
                          <img src="/assets/img/icons/location1.svg" alt="" /> 26/C Asana, New York{" "}
                        </Link>
                      </li>
                    </ul>
                    <div className="space20" />
                    <Link href="/event-single" className="head">
                      {item.title}
                    </Link>
                    <div className="space16" />
                    <p>{item.description}</p>
                    <div className="space32" />
                    <div className="btn-area1">
                      <Link href="/pricing-plan" className="vl-btn1">
                        purchase ticket now
                      </Link>
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
  );
}
