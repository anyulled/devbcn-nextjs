import Link from "next/link";

interface Section7TabPaneProps {
  isActive: boolean;
  id: string;
  labelledBy: string;
}

interface ScheduleItem {
  id: number;
  image: string;
  layout: "image-left" | "image-right";
}

const scheduleItems: ScheduleItem[] = [
  {
    id: 1,
    image: "/assets/img/all-images/event/event-img4.png",
    layout: "image-left",
  },
  {
    id: 2,
    image: "/assets/img/all-images/event/event-img5.png",
    layout: "image-right",
  },
  {
    id: 3,
    image: "/assets/img/all-images/event/event-img6.png",
    layout: "image-left",
  },
];

const spacingAfterItem = ["space48", "space30", ""];

const renderContent = (buttonClassName: string) => (
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
      <Link href="/pricing-plan" className={buttonClassName}>
        <span className="demo">purchase ticket</span>
      </Link>
    </div>
  </div>
);

export default function Section7TabPane({ isActive, id, labelledBy }: Section7TabPaneProps) {
  const buttonClassName = "vl-btn3";

  return (
    <div className={isActive ? "tab-pane fade show active" : "tab-pane fade"} id={id} role="tabpanel" aria-labelledby={labelledBy} tabIndex={0}>
      <div className="event-widget-area">
        {scheduleItems.map((item, index) => {
          const spacerClass = spacingAfterItem[index];

          return (
            <div key={item.id}>
              <div className="row">
                <div className="col-lg-1" />
                <div className="col-lg-10 m-auto">
                  <div className="event2-boxarea box1">
                    <h1 className="active">{String(item.id).padStart(2, "0")}</h1>
                    <div className="row align-items-center">
                      {item.layout === "image-left" ? (
                        <>
                          <div className="col-lg-5">
                            <div className="img1">
                              <img src={item.image} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-1" />
                          <div className="col-lg-6">{renderContent(buttonClassName)}</div>
                        </>
                      ) : (
                        <>
                          <div className="col-lg-6">
                            {renderContent(buttonClassName)}
                            <div className="space30 d-lg-none d-block" />
                          </div>
                          <div className="col-lg-5">
                            <div className="img1">
                              <img src={item.image} alt="" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {spacerClass ? <div className={spacerClass} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
