"use client";
import BackgroundCarousel from "@/components/BackgroundCarousel";
import TrackBadges from "@/components/elements/TrackBadges";
import VideoOverlay from "@/components/elements/VideoOverlay";
import { formatEventDateRange, getEditionConfig } from "@/config/editions";
import { trackTicketClick } from "@/lib/utils/analytics";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Section1Props {
  year: string;
}

export default function Section1({ year }: Readonly<Section1Props>) {
  const config = getEditionConfig(year);
  const router = useRouter();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const handleTrackClick = (trackId: string) => {
    router.push(`/${year}/schedule?track=${trackId}`);
  };

  return (
    <BackgroundCarousel className="hero8-slider-area">
      <VideoOverlay opacity={0.5} />
      <div className="container">
        <div className="row">
          <div className="col-lg-10 m-auto">
            <motion.div className="hero8-header text-center" initial="hidden" animate="visible" variants={containerVariants}>
              <div className="space48"></div>
              <div className="space32" />

              {/* Logo */}
              <motion.h1 className="text-anime-style-3 d-flex justify-content-center align-items-center flex-wrap gap-4" variants={itemVariants}>
                <Image
                  src="/assets/img/logo/logo.png"
                  alt="DevBcn - Barcelona Developers Conference"
                  width={400}
                  height={120}
                  priority
                  style={{ height: "100px", width: "auto", objectFit: "contain" }}
                />
                {year === "2024" && (
                  <Link href="/kcd">
                    <Image
                      src="/assets/img/logo/KCD-logo-white.webp"
                      alt="KCD Barcelona"
                      width={400}
                      height={120}
                      priority
                      style={{ height: "100px", width: "auto", objectFit: "contain" }}
                    />
                  </Link>
                )}
              </motion.h1>

              {/* Subtitle */}
              <motion.h4 variants={itemVariants} style={{ fontSize: "1.5rem", fontWeight: 300, marginTop: "1rem" }}>
                The Barcelona Developers Conference
              </motion.h4>

              {/* Event Details */}
              <motion.div variants={itemVariants} style={{ marginTop: "1.5rem" }}>
                <h5 style={{ fontSize: "1.25rem", fontWeight: 500 }}>📅 {formatEventDateRange(config.event.startDay, config.event.endDay)}</h5>
                <h5 style={{ fontSize: "1.25rem", fontWeight: 500 }}>📍 {config.venue.name}</h5>
              </motion.div>

              <div className="space40" />

              {/* Track Badges */}
              <motion.div variants={itemVariants} style={{ marginTop: "3rem" }}>
                <TrackBadges onTrackClick={handleTrackClick} />
              </motion.div>

              <div className="space48" />

              {/* CTAs */}
              <motion.div
                className="btn-area1"
                variants={containerVariants}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} variants={itemVariants}>
                  <Link href={config.tickets.url} className="hero-cta hero-cta--primary" onClick={() => trackTicketClick("hero", year)}>
                    <span className="hero-cta__icon">🎟️</span>
                    <span className="hero-cta__text">Reserve Your Seat</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} variants={itemVariants}>
                  <Link href={config.cfp.link} className="hero-cta hero-cta--secondary">
                    <span className="hero-cta__icon">🎙️</span>
                    <span className="hero-cta__text">Become a Speaker</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} variants={itemVariants}>
                  <Link href={`/${year}/sponsorship`} className="hero-cta hero-cta--tertiary">
                    <span className="hero-cta__icon">🤝</span>
                    <span className="hero-cta__text">Become a Sponsor</span>
                  </Link>
                </motion.div>
              </motion.div>

              <div className="space48" />
            </motion.div>
          </div>
        </div>
      </div>
    </BackgroundCarousel>
  );
}
