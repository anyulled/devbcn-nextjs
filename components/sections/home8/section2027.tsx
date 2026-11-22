"use client";

import { formatEventDateRange } from "@/config/editions";
import { edition2027 } from "@/config/editions/2027";
import TrackBadges from "@/components/elements/TrackBadges";
import HeroActions from "./HeroActions";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const DESKTOP_BREAKPOINT = 768;

export default function Section2027() {
  const [videoSource, setVideoSource] = useState<string | null>(null);
  const eventDate = formatEventDateRange(edition2027.event.startDay, edition2027.event.endDay);

  useEffect(() => {
    const desktopQuery = globalThis.window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const reducedMotionQuery = globalThis.window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (globalThis.navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const isSaveData = Boolean(connection?.saveData);

    const updateVideoSource = () => {
      if (reducedMotionQuery.matches || isSaveData) {
        setVideoSource(null);
        return;
      }
      setVideoSource(desktopQuery.matches ? edition2027.hero.desktopVideo : edition2027.hero.mobileVideo);
    };

    if (reducedMotionQuery.matches || isSaveData) {
      return undefined;
    }

    const cleanupTimeouts: Array<() => void> = [];
    const interactionEvents: Array<keyof WindowEventMap> = ["pointerdown", "scroll", "keydown", "touchstart"];
    const state = { triggered: false };

    const triggerVideo = () => {
      if (state.triggered) {
        return;
      }
      state.triggered = true;
      cleanupTimeouts.forEach((cancel) => cancel());
      interactionEvents.forEach((eventName) => globalThis.window.removeEventListener(eventName, triggerVideo));
      updateVideoSource();
    };

    // Defer background video download until user interaction or well after initial load so it doesn't compete with LCP/TBT.
    const scheduleVideo = () => {
      if (state.triggered) {
        return;
      }
      const id = setTimeout(triggerVideo, 5000);
      cleanupTimeouts.push(() => clearTimeout(id));
    };

    interactionEvents.forEach((eventName) => globalThis.window.addEventListener(eventName, triggerVideo, { once: true, passive: true }));

    if (document.readyState === "complete") {
      scheduleVideo();
    } else {
      globalThis.window.addEventListener("load", scheduleVideo, { once: true });
    }

    desktopQuery.addEventListener("change", updateVideoSource);
    reducedMotionQuery.addEventListener("change", updateVideoSource);
    return () => {
      cleanupTimeouts.forEach((cancel) => cancel());
      interactionEvents.forEach((eventName) => globalThis.window.removeEventListener(eventName, triggerVideo));
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
                <h1 className="visually-hidden">The Barcelona Developers Conference</h1>
              </div>
              <div className="hero8-header__spacer" />
              <div className="hero8-header__special-highlight hero8-header__special-highlight--2027">
                <p className="hero8-header__special-kicker">Summer Barcelona 2027</p>
                <p className="hero8-header__special-copy">{eventDate}. AMA Sessions and Speaking Mentoring will return.</p>
                <div className="hero8-header__event-info">
                  <div className="hero8-header__event-line">
                    <MapPin className="hero8-header__event-icon" />
                    <span>{edition2027.venue.name}</span>
                  </div>
                  <div className="hero8-header__event-line">
                    <CalendarDays className="hero8-header__event-icon" />
                    <span>{eventDate}</span>
                  </div>
                </div>
              </div>
              <HeroActions config={edition2027} year="2027" />
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
