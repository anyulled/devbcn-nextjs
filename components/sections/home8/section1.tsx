"use client";
import BackgroundCarousel from "@/components/BackgroundCarousel";
import { formatEventDateRange, getEditionConfig } from "@/config/editions";
import { trackTicketClick } from "@/lib/utils/analytics";
import Link from "next/link";

interface Section1Props {
  year: string;
}

export default function Section1({ year }: Section1Props) {
  const config = getEditionConfig(year);
  return (
    <BackgroundCarousel className="hero8-slider-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <div className="hero8-header text-center">
              <div className="space40"></div>
              <div className="space32" />
              <h1 className="text-anime-style-3">
                <img src="/assets/img/logo/logo.png" alt="DevBcn" />
              </h1>
              <h4>The Barcelona Developers Conference</h4>
              <h5>{formatEventDateRange(config.event.startDay, config.event.endDay)}</h5>
              <h5>World Trade Center, Barcelona</h5>
              <div className="space32" />
              <div className="space24" />
              <div className="space40" />
              <h5>
                5 tracks with the following topics: Java &amp; JVM | Cloud, DevOps, VMs, Kubernetes | Frontend, JavaScript, TypeScript, Angular, WASM |
                Leadership, Agile, Diversity | Big Data, Machine Learning, AI, Python
              </h5>
              <div className="space40"></div>
              <div className="space32" />
              <div
                className="btn-area1"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <Link href={config.tickets.url} className="vl-btn8" onClick={() => trackTicketClick("hero", year)}>
                  <span className="demo">🎟️ Reserve your Seat</span>
                </Link>
                <Link href={config.cfp.link} className="vl-btn8">
                  <span className="demo">🎙️ Become a Speaker</span>
                </Link>
                <Link href="/sponsorship" className="vl-btn8">
                  <span className="demo">🤝🏽 Sponsorship</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="/assets/img/elements/layer1.png" alt="" className="layer1" />
    </BackgroundCarousel>
  );
}
