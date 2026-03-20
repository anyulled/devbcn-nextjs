"use client";

import { EditionConfig } from "@/config/editions/types";
import { formatEventDateRange } from "@/config/editions";
import { useState, useRef } from "react";
import Image from "next/image";
import { Printer, Copy, AlertCircle, Check } from "lucide-react";
import { findCurrentCategory, formatDateWithOrdinal } from "@/lib/shared/convince-your-boss";

interface ConvinceYourBossFormProps {
  config: EditionConfig;
  year: string;
}

export default function ConvinceYourBossForm({ config, year }: Readonly<ConvinceYourBossFormProps>) {
  const currentCategory = findCurrentCategory(config);

  const [formData, setFormData] = useState({
    managerName: "",
    userName: "",
    initiative: "",
    ticketPrice: currentCategory?.price || "TBD",
    ticketEndDate: currentCategory ? formatDateWithOrdinal(new Date(currentCategory.endDate)) : "",
  });

  const [copied, setCopied] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const eventDates = formatEventDateRange(config.event.startDay, config.event.endDay);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = () => {
    if (letterRef.current) {
      const text = letterRef.current.innerText;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text:", err);
        });
    }
  };

  const handlePrint = () => {
    globalThis.print();
  };

  const renderForm = () => (
    <div className="form-container">
      <div className="disclaimer">
        <AlertCircle size={18} style={{ marginRight: "8px", verticalAlign: "middle" }} />
        <span>We do not store this data in our databases. It&apos;s only used to populate the preview.</span>
      </div>

      <div className="form-group">
        <label htmlFor="managerName">Manager&apos;s Name</label>
        <input type="text" id="managerName" name="managerName" value={formData.managerName} onChange={handleChange} placeholder="e.g. Jane Smith" />
      </div>

      <div className="form-group">
        <label htmlFor="userName">Your Name</label>
        <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} placeholder="e.g. John Doe" />
      </div>

      <div className="form-group">
        <label htmlFor="initiative">Project/Initiative</label>
        <input
          type="text"
          id="initiative"
          name="initiative"
          value={formData.initiative}
          onChange={handleChange}
          placeholder="e.g. migration to microservices"
        />
      </div>

      <div className="form-group">
        <span className="form-label">Active Ticket Category</span>
        <div className="active-ticket-info">
          <strong>{currentCategory?.name}</strong> ({currentCategory?.price})
        </div>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="letter-preview-container">
      <div className="letter-paper" ref={letterRef}>
        <div className="letter-logo">
          <Image src="/assets/img/logo/logo.png" alt="DevBcn" width={180} height={54} />
        </div>

        <div className="letter-content text-left">
          <div className="letter-subject">Subject: Request to attend DevBcn {year}</div>

          <div className="letter-body">
            <p>
              Hi <span className={formData.managerName ? "highlight" : "placeholder"}>{formData.managerName || "«Manager’s Name»"}</span>,
            </p>

            <p>
              I&apos;d like to attend <strong>DevBcn {year}</strong>, happening <strong>{eventDates}</strong> in <strong>{config.venue.name}</strong>. It&apos;s
              the leading developer&apos;s conference, bringing together 700+ developers, IT professionals, and industry leaders for 80+ technical sessions,
              hands-on learning, and networking with IT industry professional.
            </p>

            <p>
              By attending, I&apos;ll gain insights directly applicable to our current initiatives{" "}
              <span className={formData.initiative ? "highlight" : "placeholder"}>{formData.initiative || "[insert initiative/project]"}</span>, and I&apos;ll
              share a post-event recap with key takeaways for the team.
            </p>

            <p>Top reasons for attendance: networking, training/career growth, and to attend breakout sessions.</p>

            <p>
              Last year, 65%+ of attendees were in technical positions, with strong representation from Java, DevOps, and technical lead roles. Additionally,
              45% of attendees have 10+ years of experience, and 25% have between 5-10 years, making the conference highly targeted for Senior Professionals.
            </p>

            {config.brochure && (
              <p>
                If we&apos;re interested in sponsorship, you can find more information in the{" "}
                <a href={config.brochure} target="_blank" rel="noopener noreferrer" className="highlight underline">
                  Sponsorship Brochure
                </a>
                .
              </p>
            )}

            <p>
              The pass is only <span className="highlight">{formData.ticketPrice}</span> until <span className="highlight">{formData.ticketEndDate}</span> for
              the two days, offering participation options that meet our needs.
            </p>

            <p>Thanks for considering!</p>
          </div>

          <div className="letter-footer">
            <p>Best,</p>
            <p className={formData.userName ? "highlight" : "placeholder"}>{formData.userName || "«Your Name»"}</p>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="btn-copy" onClick={handleCopy}>
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
        <button className="btn-print" onClick={handlePrint}>
          <Printer size={18} />
          Print Letter / PDF
        </button>
      </div>
    </div>
  );

  return (
    <section className="convince-your-boss-section">
      <div className="container">
        <div className="section-header">
          <h2>Convince Your Boss</h2>
          <p>We&apos;ve drafted a letter to help you request approval to attend DevBcn {year}.</p>
        </div>

        <div className="row">
          <div className="col-lg-5">{renderForm()}</div>
          <div className="col-lg-7">{renderPreview()}</div>
        </div>
      </div>
    </section>
  );
}
