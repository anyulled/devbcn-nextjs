"use client";

import { JobOffer } from "@/config/data/job-offers/types";
import { Markdown } from "@/lib/utils/markdown";
import { useState } from "react";

interface JobOffersAccordionProps {
  offers: JobOffer[];
}

export default function JobOffersAccordion({ offers }: JobOffersAccordionProps) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(1);

  const handleAccordion = (key: number) => {
    setActiveAccordion((prevState) => (prevState === key ? null : key));
  };

  return (
    <div className="job-offers-accordion">
      <div className="row">
        <div className="col-lg-12">
          <div className="accordian-area">
            <div className="accordion" id="jobOffersAccordion">
              {offers.map((offer, index) => {
                const accordionId = index + 1;
                const collapseId = `collapse${accordionId}`;

                return (
                  <div key={offer.id}>
                    <div className="accordion-item">
                      <h2 className="accordion-header" onClick={() => handleAccordion(accordionId)}>
                        <button
                          className={activeAccordion === accordionId ? "accordion-button" : "accordion-button collapsed"}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${collapseId}`}
                          aria-expanded={activeAccordion === accordionId}
                          aria-controls={collapseId}
                        >
                          <span className="job-title">{offer.title}</span>
                          <span className="job-location">{offer.location}</span>
                        </button>
                      </h2>
                      <div
                        id={collapseId}
                        data-testid={collapseId}
                        className={activeAccordion === accordionId ? "accordion-collapse collapse show" : "accordion-collapse collapse"}
                        data-bs-parent="#jobOffersAccordion"
                      >
                        <div className="accordion-body">
                          <div className="job-details">
                            <Markdown content={offer.text} className="job-description" />

                            {offer.url && (
                              <div className="apply-section">
                                <a href={offer.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary apply-btn">
                                  Apply Now <i className="fa-solid fa-arrow-right" />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < offers.length - 1 && <div className="space20" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
