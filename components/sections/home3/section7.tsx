"use client";
import { useState } from "react";
import Section7TabPane from "./Section7TabPane";

const tabOptions = [
  { id: 1, tabId: "pills-home", buttonId: "pills-home-tab", label: "Day One", date: "May 25, 2024" },
  { id: 2, tabId: "pills-profile", buttonId: "pills-profile-tab", label: "Day Two", date: "May 26, 2024" },
  { id: 3, tabId: "pills-contact", buttonId: "pills-contact-tab", label: "Day Three", date: "May 27, 2024" },
];

export default function Section7() {
  const [isTab, setIsTab] = useState(1);
  const handleTab = (i: number) => {
    setIsTab(i);
  };
  return (
    <>
      <div className="event3-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="event2-header heading5 text-center space-margin60">
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
                          <img src="/assets/img/icons/calender2.svg" alt="" />
                        </span>
                        <span className="pl-8">
                          <span className="day">{option.label}</span>
                          <span className="date">{option.date}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tab-content" id="pills-tabContent">
                <Section7TabPane isActive={isTab == 1} id="pills-home" labelledBy="pills-home-tab" />
                <Section7TabPane isActive={isTab == 2} id="pills-profile" labelledBy="pills-profile-tab" />
                <Section7TabPane isActive={isTab == 3} id="pills-contact" labelledBy="pills-contact-tab" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
