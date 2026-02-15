"use client";
import { useState } from "react";
import Section6TabPane from "./Section6TabPane";

const tabOptions = [
  { id: 1, tabId: "pills-home", buttonId: "pills-home-tab", label: "Day 01", day: "01" },
  { id: 2, tabId: "pills-profile", buttonId: "pills-profile-tab", label: "Day 02", day: "08" },
  { id: 3, tabId: "pills-contact", buttonId: "pills-contact-tab", label: "Day 03", day: "15" },
  { id: 4, tabId: "pills-contact1", buttonId: "pills-contact1-tab", label: "Day 04", day: "20" },
  { id: 5, tabId: "pills-contact2", buttonId: "pills-contact2-tab", label: "Day 05", day: "25" },
];

export default function Section6() {
  const [isTab, setIsTab] = useState(1);
  const handleTab = (i: number) => {
    setIsTab(i);
  };
  return (
    <>
      <div className="event7-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="event-header heading10 space-margin60 text-center">
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
                            JAN <br /> 2025
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tab-content" id="pills-tabContent">
                {tabOptions.map((option) => (
                  <Section6TabPane key={option.id} isActive={isTab == option.id} id={option.tabId} labelledBy={option.buttonId} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
