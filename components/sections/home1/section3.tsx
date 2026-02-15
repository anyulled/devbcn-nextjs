"use client";
import { useState } from "react";
import Section3TabPaneSingle from "./Section3TabPaneSingle";
import Section3TabPaneThree from "./Section3TabPaneThree";

const tabOptions = [
  { id: 1, tabId: "pills-home", buttonId: "pills-home-tab", label: "Day 01", day: "01" },
  { id: 2, tabId: "pills-profile", buttonId: "pills-profile-tab", label: "Day 02", day: "08" },
  { id: 3, tabId: "pills-contact", buttonId: "pills-contact-tab", label: "Day 03", day: "15" },
  { id: 4, tabId: "pills-contact1", buttonId: "pills-contact1-tab", label: "Day 04", day: "20" },
  { id: 5, tabId: "pills-contact2", buttonId: "pills-contact2-tab", label: "Day 05", day: "25" },
];

const baseDescription =
  "The Innovate 2025 conference is meticulously designed to provide you with a rich, immersive experience that drives actionable insights & fosters collaboration from keynote presentations.";

const scheduleItems = [
  {
    image: "/assets/img/all-images/event/event-img1.png",
    title: "Innovate 2025 Your Pathway to Business Transformation",
    description: baseDescription,
  },
  {
    image: "/assets/img/all-images/event/event-img2.png",
    title: "Innovate 2025 A Full-Day Journey the Future of Business",
    description: baseDescription,
  },
  {
    image: "/assets/img/all-images/event/event-img3.png",
    title: "Innovate 2025 Charting the Course for Business Success",
    description: baseDescription,
  },
];

export default function Section3() {
  const [isTab, setIsTab] = useState(1);
  const handleTab = (i: number) => {
    setIsTab(i);
  };
  return (
    <>
      <div className="event1-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="event-header heading2 space-margin60 text-center">
                <h5 data-aos="fade-left" data-aos-duration={800}>
                  Event Schedule
                </h5>
                <div className="space16" />
                <h2 className="text-anime-style-3">Our Events Schedule Plan</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div data-aos="fade-up" data-aos-duration={900}>
                <ul className="nav nav-pills space-margin60" id="pills-tab" role="tablist">
                  {tabOptions.map((option) => (
                    <li key={option.id} className="nav-item" onClick={() => handleTab(option.id)}>
                      <button
                        className={isTab == option.id ? "nav-link active" : "nav-link"}
                        id={option.buttonId}
                        data-bs-toggle="pill"
                        data-bs-target={`#${option.tabId}`}
                        type="button"
                        role="tab"
                        aria-controls={option.tabId}
                        aria-selected={isTab == option.id}
                      >
                        <span className="day">{option.label}</span>
                        <span className="vl-flex">
                          <span className="cal">{option.day}</span>
                          <span className="date">
                            JAN <br />
                            2025
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tab-content" id="pills-tabContent">
                <Section3TabPaneThree isActive={isTab == 1} id="pills-home" labelledBy="pills-home-tab" items={scheduleItems} durations={[800, 1000, 1200]} />
                <Section3TabPaneSingle
                  isActive={isTab == 2}
                  id="pills-profile"
                  labelledBy="pills-profile-tab"
                  image={scheduleItems[0].image}
                  title={scheduleItems[0].title}
                  description={scheduleItems[0].description}
                />
                <Section3TabPaneThree isActive={isTab == 3} id="pills-contact" labelledBy="pills-contact-tab" items={scheduleItems} />
                <Section3TabPaneThree isActive={isTab == 4} id="pills-contact1" labelledBy="pills-contact1-tab" items={scheduleItems} />
                <Section3TabPaneThree isActive={isTab == 5} id="pills-contact2" labelledBy="pills-contact2-tab" items={scheduleItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
