"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { getEditionConfig } from "@/config/editions";

export default function KCDPage() {
  const config = getEditionConfig("2024");
  return (
    <div>
      <PageHeader title="KCD - Barcelona" breadcrumbText="KCD - Barcelona" backgroundImageId={14} />

      <div className="blog-details-section sp8">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="blog-deatils-content heading2 text-center">
                {/* KCD Logo */}
                <div className="img1 mb-4">
                  <img
                    src="/assets/img/logo/KCD-logo-white.webp"
                    alt="KCD - Barcelona"
                    className="img-fluid"
                    style={{ backgroundColor: "#002856", padding: "20px", borderRadius: "10px" }}
                  />
                </div>

                <div className="text-start">
                  <p>
                    <a
                      href="https://community.cncf.io/events/details/cncf-kcd-spain-presents-kcd-barcelona-2024"
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontWeight: "bold", color: "#002856" }}
                    >
                      KCD Barcelona
                    </a>{" "}
                    is an event within the CNCF framework called Kubernetes Community Days (KCDs).
                  </p>
                  <div className="space16" />
                  <p>
                    KCDs are community-organised events, with the support of the Cloud Native Computing Foundation, which aims to bring together adopters and
                    technologists from open source communities to share knowledge, collaborate and network.
                  </p>
                  <div className="space16" />
                  <p>
                    There will be talks in English and Spanish in order to foster the Spanish-speaking community and will be related to technologies from the
                    Cloud Native ecosystem.
                  </p>
                  <div className="space16" />
                  <p>
                    After 3 editions in 2021, 2022 and 2023 completely virtual, in 2024 we have joined forces with <strong>DevBcn</strong> to present our first
                    face-to-face event.
                  </p>
                </div>

                <div className="space32" />

                {/* Social Icons */}
                <div className="tags-social-area justify-content-center">
                  <div className="social">
                    <ul>
                      <li>
                        <a href="https://twitter.com/kcdspain" target="_blank" rel="noreferrer">
                          <i className="fa-brands fa-x-twitter" /> {/* Updated Twitter icon if available, or fa-twitter */}
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/company/kcdspain/" target="_blank" rel="noreferrer">
                          <i className="fa-brands fa-linkedin" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/channel/UC2666lycS6cx5a8KL_hBhKA" target="_blank" rel="noreferrer">
                          <i className="fa-brands fa-youtube" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection
        eventEndDate={config.event.endDay}
        eventLocation={config.venue}
        eventStartDate={config.event.startDay}
        showCountdown={config.showCountdown}
        ticketUrl={config.tickets.url}
      />
    </div>
  );
}
