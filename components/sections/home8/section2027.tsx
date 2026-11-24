"use client";

import HeroActions from "./HeroActions";
import { CalendarDays, MapPin, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatEventDateRange } from "@/config/editions";
import { edition2027 } from "@/config/editions/2027";

const DESKTOP_BREAKPOINT = 992;

export default function Section2027() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSource, setVideoSource] = useState<string | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const eventDate = formatEventDateRange(edition2027.event.startDay, edition2027.event.endDay);

  useEffect(() => {
    const desktopQuery = globalThis.window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px) and (pointer: fine)`);
    const reducedMotionQuery = globalThis.window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateVideoSource = () => {
      if (reducedMotionQuery.matches) {
        videoRef.current?.pause();
        setVideoSource(null);
        setIsPlaying(false);
        return;
      }

      setVideoSource(desktopQuery.matches ? edition2027.hero.desktopVideo : edition2027.hero.mobileVideo);
    };

    const timer: { current?: ReturnType<typeof setTimeout> } = {};
    const scheduleVideo = () => {
      timer.current = setTimeout(updateVideoSource, 1500);
    };

    if (document.readyState === "complete") {
      scheduleVideo();
    } else {
      globalThis.window.addEventListener("load", scheduleVideo, { once: true });
    }

    reducedMotionQuery.addEventListener("change", updateVideoSource);
    return () => {
      clearTimeout(timer.current);
      globalThis.window.removeEventListener("load", scheduleVideo);
      reducedMotionQuery.removeEventListener("change", updateVideoSource);
    };
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  return (
    <section className="hero8-slider-area hero8-slider-area--2027" aria-labelledby="hero-2027-title">
      <div className="container hero8-video__content">
        <div className="hero8-header">
          <h1 id="hero-2027-title" className="hero8-header__title">
            DevBcn <span>2027</span>
          </h1>
          <p className="hero8-header__subtitle">The Barcelona Developers Conference</p>

          <div className="hero8-header__event-info" aria-label="Event details">
            <p className="hero8-header__event-line">
              <CalendarDays className="hero8-header__event-icon" aria-hidden="true" />
              <span>{eventDate}</span>
            </p>
            <p className="hero8-header__event-line">
              <MapPin className="hero8-header__event-icon" aria-hidden="true" />
              <span>{edition2027.venue.name}</span>
            </p>
          </div>

          <HeroActions config={edition2027} year="2027" exploreHref="#experience" />
        </div>
      </div>

      <div className="hero8-video__media">
        <Image
          src={edition2027.hero.fallbackImage}
          alt="World Trade Center Barcelona, home of DevBcn 2027"
          fill
          fetchPriority="high"
          sizes="(min-width: 992px) 58vw, 100vw"
          className="hero8-video__fallback"
        />
        {videoSource && !videoFailed && (
          <video
            ref={videoRef}
            key={videoSource}
            className="hero8-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            src={videoSource}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              setVideoFailed(true);
              setIsPlaying(false);
            }}
          />
        )}
        <div className="hero8-video__overlay" />
        {videoSource && !videoFailed && (
          <button
            className="hero8-video__control"
            type="button"
            onClick={() => void togglePlayback()}
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
          >
            {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </button>
        )}
      </div>

      <div className="hero8-2027__mosaic" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
