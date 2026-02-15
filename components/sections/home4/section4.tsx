"use client";
import Link from "next/link";
import { useState } from "react";

const SCHEDULE_ITEMS = [
  {
    time: "11:00 AM -12:00 PM",
    title: "Registration & Networking",
    description: "Kick off the day with coffee and conversations. Meet fellow innovators & industry leaders.",
    icon: "/assets/img/icons/clock1.svg",
  },
  {
    time: "03:00 PM -04:00 PM",
    title: "Workshops & Interactive Labs",
    description: "Kick off the day with coffee and conversations. Meet fellow innovators & industry leaders.",
    icon: "/assets/img/icons/clock1.svg",
  },
  {
    time: "03:00 PM -04:00 PM",
    title: "Leadership for the Future",
    description: "Kick off the day with coffee and conversations. Meet fellow innovators & industry leaders.",
    icon: "/assets/img/icons/clock1.svg",
  },
  {
    time: "05:00 PM -06:00 PM",
    title: "Networking Reception",
    description: "Kick off the day with coffee and conversations. Meet fellow innovators & industry leaders.",
    icon: "/assets/img/icons/clock1.svg",
  },
];

const SCHEDULE_DAYS = [
  { id: 1, day: "Day 01", date: "01", monthYear: "JAN \n 2025" },
  { id: 2, day: "Day 02", date: "08", monthYear: "JAN \n 2025" },
  { id: 3, day: "Day 03", date: "15", monthYear: "JAN \n 2025" },
  { id: 4, day: "Day 04", date: "20", monthYear: "JAN \n 2025" },
];

export default function Section4() {
  const [isTab, setIsTab] = useState(1);
  const [isAccordion, setIsAccordion] = useState<number | null>(1);

  const handleTab = (i: number) => {
    setIsTab(i);
  };

  const handleAccordion = (key: number) => {
    // Toggle accordion logic
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };

  return (
    <div className="section-schedule section-padding2">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="event-images-area" data-aos="zoom-in" data-aos-duration={1000}>
              <div className="img1">
                <img src="/assets/img/all-images/event/event-img7.png" alt="" />
              </div>
              <div className="content-area heading7">
                <h5>Event Schedule</h5>
                <div className="space18" />
                <h2>Our Events Schedule Plan</h2>
                <div className="space32" />
                <div className="btn-area1">
                  <Link href="/pricing-plan" className="vl-btn4">
                    purchase ticket now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <div data-aos="fade-up" data-aos-duration={900}>
              <ul className="nav nav-pills space-margin60" id="pills-tab" role="tablist">
                {SCHEDULE_DAYS.map((day) => (
                  <li className="nav-item" key={day.id}>
                    <button
                      className={`nav-link ${isTab === day.id ? "active" : ""} ${day.id === 4 ? "m-0" : ""}`}
                      id={`pills-${day.id}-tab`}
                      data-bs-toggle="pill"
                      data-bs-target={`#pills-${day.id}`}
                      type="button"
                      role="tab"
                      aria-controls={`pills-${day.id}`}
                      aria-selected={isTab === day.id}
                      onClick={() => handleTab(day.id)}
                    >
                      {day.id === 4 && <div className="space30 d-lg-none d-block" />}
                      <span className="day">{day.day}</span>
                      <span className="vl-flex">
                        <span className="cal">{day.date}</span>
                        <span className="date" dangerouslySetInnerHTML={{ __html: day.monthYear.replace("\n", "<br />") }} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-5" data-aos="fade-left" data-aos-duration={1200}>
            <div className="tab-content" id="pills-tabContent">
              {SCHEDULE_DAYS.map((day, dayIndex) => (
                <div
                  key={day.id}
                  className={`tab-pane fade ${isTab === day.id ? "show active" : ""}`}
                  id={`pills-${day.id}`}
                  role="tabpanel"
                  aria-labelledby={`pills-${day.id}-tab`}
                  tabIndex={0}
                >
                  <div className="accordion" id={`accordionExample${day.id}`}>
                    {SCHEDULE_ITEMS.map((item, itemIndex) => {
                      const key = dayIndex * 4 + itemIndex + 1;
                      const isOpen = isAccordion === key;
                      const collapseId = `collapse-${key}`;
                      return (
                        <div className="accordion-item" key={key}>
                          <h2 className="accordion-header">
                            <button
                              className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#${collapseId}`}
                              aria-expanded={isOpen}
                              aria-controls={collapseId}
                              onClick={() => handleAccordion(key)}
                            >
                              <span>
                                <img src={item.icon} alt="" />
                                {item.time}
                              </span>
                              <span className="accor-btn">{item.title}</span>
                            </button>
                          </h2>
                          <div id={collapseId} className={`accordion-collapse collapse ${isOpen ? "show" : ""}`} data-bs-parent={`#accordionExample${day.id}`}>
                            <div className="accordion-body">
                              <p>{item.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
