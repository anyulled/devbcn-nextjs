"use client";
import { useState } from "react";

const FAQ_QUESTIONS = [
  {
    question: "What is Eventify, and who is it for?",
    answer:
      "Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.",
  },
  {
    question: "When and where is Eventify 2024 taking place?",
    answer:
      "Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.",
  },
  {
    question: "How much does it cost to attend Eventify 2024?",
    answer:
      "Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.",
  },
  {
    question: "Will there be networking opportunities Eventify?",
    answer:
      "Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.",
  },
  {
    question: "How can I access session materials after event?",
    answer:
      "Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.",
  },
  {
    question: "What payment are accepted for registration?",
    answer:
      "Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.",
  },
  {
    question: "Can I attend only one day of the conference?",
    answer:
      "Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.",
  },
  {
    question: "How can I updated on event announcements?",
    answer:
      "Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.",
  },
  {
    question: "How do I download the event app?",
    answer:
      "Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.",
  },
  {
    question: "Can I suggest or speakers for future events?",
    answer:
      "Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.",
  },
];

const FAQ_TABS = [
  { id: 1, label: "All", target: "pills-home" },
  { id: 2, label: "Event Information", target: "pills-profile" },
  { id: 3, label: "Registration & Tickets", target: "pills-contact" },
  { id: 4, label: "Event Experience", target: "pills-contact1" },
  { id: 5, label: "Speakers & Sessions", target: "pills-contact2" },
];

export default function FaqContent() {
  const [isTab, setIsTab] = useState(1);
  const [isAccordion, setIsAccordion] = useState<number | null>(1);

  const handleTab = (i: number) => {
    setIsTab(i);
  };

  const handleAccordion = (key: number) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };

  const splitQuestionsHalf = Math.ceil(FAQ_QUESTIONS.length / 2);
  const col1Questions = FAQ_QUESTIONS.slice(0, splitQuestionsHalf);
  const col2Questions = FAQ_QUESTIONS.slice(splitQuestionsHalf);

  const renderAccordionColumn = (questions: typeof FAQ_QUESTIONS, tabIndex: number, colOffset: number) => {
    return (
      <div className="accordian-area">
        <div className="accordion" id={`accordionExample${tabIndex}`}>
          {questions.map((item, index) => {
            const key = (tabIndex - 1) * 10 + colOffset + index + 1;
            const isOpen = isAccordion === key;
            const collapseId = `collapse-${key}`;
            const parentId = `accordionExample${tabIndex}`;

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
                    {item.question}
                  </button>
                </h2>
                <div id={collapseId} className={`accordion-collapse collapse ${isOpen ? "show" : ""}`} data-bs-parent={`#${parentId}`}>
                  <div className="accordion-body">
                    <p>{item.answer}</p>
                  </div>
                </div>
                {index < questions.length - 1 && <div className="space20" />}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="faq-inner-section-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 m-auto">
            <div className="heading2 text-center space-margin60">
              <h2>Frequently Asked Question</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-11">
            <div className="faq-widget-area">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                {FAQ_TABS.map((tab) => (
                  <li className="nav-item" key={tab.id}>
                    <button
                      className={`nav-link ${isTab === tab.id ? "active" : ""} ${tab.id === 5 ? "m-0" : ""}`}
                      id={`${tab.target}-tab`}
                      data-bs-toggle="pill"
                      data-bs-target={`#${tab.target}`}
                      type="button"
                      role="tab"
                      aria-controls={tab.target}
                      aria-selected={isTab === tab.id}
                      onClick={() => handleTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="space48" />
              <div className="tab-content" id="pills-tabContent">
                {FAQ_TABS.map((tab) => (
                  <div
                    key={tab.id}
                    className={`tab-pane fade ${isTab === tab.id ? "show active" : ""}`}
                    id={tab.target}
                    role="tabpanel"
                    aria-labelledby={`${tab.target}-tab`}
                    tabIndex={0}
                  >
                    <div className="faq-section-area">
                      <div className="row">
                        <div className="col-lg-6">{renderAccordionColumn(col1Questions, tab.id, 0)}</div>
                        <div className="col-lg-6">{renderAccordionColumn(col2Questions, tab.id, col1Questions.length)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
