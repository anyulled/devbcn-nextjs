"use client";

import { edition2027 } from "@/config/editions/2027";
import TrackBadges from "@/components/elements/TrackBadges";
import { motion, type Variants } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const DESKTOP_BREAKPOINT = 768;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function Section2027() {
  const [videoSource, setVideoSource] = useState<string | null>(null);

  useEffect(() => {
    const desktopQuery = globalThis.window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const reducedMotionQuery = globalThis.window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateVideoSource = () =>
      setVideoSource(reducedMotionQuery.matches ? null : desktopQuery.matches ? edition2027.hero.desktopVideo : edition2027.hero.mobileVideo);

    updateVideoSource();
    desktopQuery.addEventListener("change", updateVideoSource);
    reducedMotionQuery.addEventListener("change", updateVideoSource);
    return () => {
      desktopQuery.removeEventListener("change", updateVideoSource);
      reducedMotionQuery.removeEventListener("change", updateVideoSource);
    };
  }, []);

  return (
    <section className="hero8-slider-area hero8-slider-area--2027">
      <Image src={edition2027.hero.fallbackImage} alt="World Trade Center Barcelona" fill priority sizes="100vw" className="hero8-video__fallback" />
      {videoSource && (
        <video
          key={videoSource}
          className="hero8-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={edition2027.hero.fallbackImage}
          src={videoSource}
        />
      )}
      <div className="hero8-video__overlay" />
      <div className="container hero8-video__content">
        <div className="row">
          <div className="col-lg-10 m-auto">
            <motion.div className="hero8-header text-center" initial="hidden" animate="visible" variants={containerVariants}>
              <motion.div className="hero8-header__branding" variants={itemVariants}>
                <Image src="/assets/img/logo/logo.png" alt="DevBcn - Barcelona Developers Conference" width={400} height={120} priority className="hero-logo" />
                <h1 className="hero8-header__subtitle hero8-header__subtitle--2027">The Barcelona Developers Conference</h1>
              </motion.div>
              <div className="hero8-header__spacer" />
              <motion.div className="hero8-header__special-highlight hero8-header__special-highlight--2027" variants={itemVariants}>
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
              </motion.div>
              <motion.div variants={itemVariants}>
                <TrackBadges className="hero8-header__tracks--2027" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
