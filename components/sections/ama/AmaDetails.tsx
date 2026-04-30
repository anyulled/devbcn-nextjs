"use client";

import React from "react";
import Image from "next/image";
import { Users, Clock, CheckCircle, Info } from "lucide-react";
import BuyTicketButton from "@/components/elements/BuyTicketButton";
import { getEditionConfig } from "@/config/editions";

interface AmaDetailsProps {
  year: string;
}

export default function AmaDetails({ year }: Readonly<AmaDetailsProps>) {
  const eventData = getEditionConfig(year);
  return (
    <section className="feature-details-section">
      <div className="container">
        <div className="section-header">
          <p>Get up close and personal with our world-class speakers in these exclusive Ask Me Anything sessions.</p>
        </div>

        <div className="feature-content-wrapper">
          <div className="feature-image">
            <Image src="/assets/img/features/ama-sessions.png" alt="AMA Sessions at DevBcn" fill className="object-cover" priority />
          </div>
          <div className="feature-info">
            <h3>Interactive Q&A: Dynamic Conversations</h3>
            <div className="feature-description">
              <p>
                The AMA (Ask Me Anything) sessions are 1-hour interactive gatherings designed to bridge the gap between speakers and attendees. Held right after
                selected talks, these sessions provide a cozy environment for deep dives into specific topics.
              </p>
              <p>
                Whether you want to clarify a point from the talk, ask about industry trends, or get career advice, this is your chance to have a meaningful
                conversation with the experts.
              </p>
            </div>

            <div className="feature-highlights">
              <div className="highlight-item">
                <div className="icon-box">
                  <Users size={20} />
                </div>
                <div className="text-box">
                  <span>Limited Capacity</span>
                  <p>Up to 6 attendees per session</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="icon-box">
                  <Clock size={20} />
                </div>
                <div className="text-box">
                  <span>Duration</span>
                  <p>1-hour focused discussion</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="icon-box">
                  <CheckCircle size={20} />
                </div>
                <div className="text-box">
                  <span>Guaranteed Seat</span>
                  <p>Check-in to secure your spot</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="icon-box">
                  <Info size={20} />
                </div>
                <div className="text-box">
                  <span>Availability</span>
                  <p>Additional seats upon room availability</p>
                </div>
              </div>
            </div>

            <div className="cta-area">
              <BuyTicketButton text={`Register for DevBcn ${eventData.edition}`} href={eventData.tickets.url} location="ama_details" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
