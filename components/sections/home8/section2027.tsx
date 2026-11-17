"use client";

import { edition2027 } from "@/config/editions/2027";
import TrackBadges from "@/components/elements/TrackBadges";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const DESKTOP_BREAKPOINT = 768;

export default function Section2027() {
  const [videoSource, setVideoSource] = useState<string | null>(null);

  useEffect(() => {
    const desktopQuery = globalThis.window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const reducedMotionQuery = globalThis.window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateVideoSource = () =>
      setVideoSource(reducedMotionQuery.matches ? null : desktopQuery.matches ? edition2027.hero.desktopVideo : edition2027.hero.mobileVideo);

    const cleanupTimeouts: Array<() => void> = [];
    // Defer background video download until after initial load so it doesn't compete with LCP.
    const scheduleVideo = () => {
      const id = setTimeout(updateVideoSource, 1500);
      cleanupTimeouts.push(() => clearTimeout(id));
    };

    if (document.readyState === "complete") {
      scheduleVideo();
    } else {
      globalThis.window.addEventListener("load", scheduleVideo, { once: true });
    }

    desktopQuery.addEventListener("change", updateVideoSource);
    reducedMotionQuery.addEventListener("change", updateVideoSource);
    return () => {
      cleanupTimeouts.forEach((cancel) => cancel());
      globalThis.window.removeEventListener("load", scheduleVideo);
      desktopQuery.removeEventListener("change", updateVideoSource);
      reducedMotionQuery.removeEventListener("change", updateVideoSource);
    };
  }, []);

  return (
    <section className="hero8-slider-area hero8-slider-area--2027">
      <Image src={edition2027.hero.fallbackImage} alt="World Trade Center Barcelona" fill priority sizes="100vw" className="hero8-video__fallback" />
      {videoSource && <video key={videoSource} className="hero8-video" autoPlay loop muted playsInline preload="metadata" src={videoSource} />}
      <div className="hero8-video__overlay" />
      <div className="container hero8-video__content">
        <div className="row">
          <div className="col-lg-10 m-auto">
            <div className="hero8-header text-center">
              <div className="hero8-header__branding">
                <Image
                  src="/assets/img/logo/logo.png"
                  alt="DevBcn - Barcelona Developers Conference"
                  width={800}
                  height={327}
                  sizes="(max-width: 767px) 245px, 400px"
                  priority
                  className="hero-logo"
                />
                <h1 className="hero8-header__subtitle hero8-header__subtitle--2027">The Barcelona Developers Conference</h1>
              </div>
              <div className="hero8-header__spacer" />
              <div className="hero8-header__special-highlight hero8-header__special-highlight--2027">
                <p className="hero8-header__special-kicker">Summer Barcelona 2027</p>
                <h2 className="hero8-header__special-title">The next edition is taking shape.</h2>
                <p className="hero8-header__special-copy">Dates to be announced. AMA Sessions and Speaking Mentoring will return.</p>
                <div className="hero8-header__event-info">
                  <div className="hero8-header__event-line">
                    <MapPin className="hero8-header__event-icon" />
                    <span>{edition2027.venue.name}</span>
                  </div>
                  <div className="hero8-header__event-line">
                    <CalendarDays className="hero8-header__event-icon" />
                    <span>Dates to be announced</span>
                  </div>
                </div>
              </div>
              <div>
                <TrackBadges className="hero8-header__tracks--2027" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
