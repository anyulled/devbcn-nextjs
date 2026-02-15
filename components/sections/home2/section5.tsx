"use client";
import { useState } from "react";
import Section5TabPane from "./Section5TabPane";

const tabOptions = [
  { id: 1, tabId: "pills-home", buttonId: "pills-home-tab", label: "Day One" },
  { id: 2, tabId: "pills-profile", buttonId: "pills-profile-tab", label: "Day Two" },
  { id: 3, tabId: "pills-contact", buttonId: "pills-contact-tab", label: "Day Three" },
];

const scheduleItems = [
  {
    image: "/assets/img/all-images/event/event-img1.png",
    title: "Business World Event Introduction",
  },
  {
    image: "/assets/img/all-images/event/event-img3.png",
    title: "Workshops Keynote so Elevate Craft",
  },
  {
    image: "/assets/img/all-images/event/event-img2.png",
    title: "Sustainability the Future Business",
  },
];

export default function Section5() {
  const [isTab, setIsTab] = useState(1);
  const handleTab = (i: number) => {
    setIsTab(i);
  };

  return (
    <>
      <div className="event2-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="event2-header heading4 text-center space-margin60">
                <h5>Event Schedule</h5>
                <div className="space18" />
                <h2 className="text-anime-style-3">Our Events Schedule Plan</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-duration={1000}>
              <div className="tabs-button space-margin60">
                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                  {tabOptions.map((option, index) => (
                    <li key={option.id} className="nav-item" onClick={() => handleTab(option.id)}>
                      <button
                        className={
                          isTab == option.id
                            ? index === tabOptions.length - 1
                              ? "nav-link m-0 active"
                              : "nav-link active"
                            : index === tabOptions.length - 1
                              ? "nav-link m-0"
                              : "nav-link"
                        }
                        id={option.buttonId}
                        data-bs-toggle="pill"
                        data-bs-target={`#${option.tabId}`}
                        type="button"
                        role="tab"
                        aria-controls={option.tabId}
                        aria-selected={isTab == option.id}
                      >
                        <span className="calender">
                          <img src="/assets/img/icons/calender1.svg" alt="" />
                        </span>
                        <span className="pl-8">
                          <span className="day">{option.label}</span>
                          <span className="date">May 25, 2024</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tab-content" id="pills-tabContent">
                <Section5TabPane isActive={isTab == 1} id="pills-home" labelledBy="pills-home-tab" firstBoxClass="box1" activeIndex={1} items={scheduleItems} />
                <Section5TabPane
                  isActive={isTab == 2}
                  id="pills-profile"
                  labelledBy="pills-profile-tab"
                  firstBoxClass="box2"
                  activeIndex={2}
                  items={scheduleItems}
                />
                <Section5TabPane
                  isActive={isTab == 3}
                  id="pills-contact"
                  labelledBy="pills-contact-tab"
                  firstBoxClass="box1"
                  activeIndex={3}
                  items={scheduleItems}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
