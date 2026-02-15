"use client";
import BackgroundCarousel from "@/components/BackgroundCarousel";
import TrackBadges from "@/components/elements/TrackBadges";
import VideoOverlay from "@/components/elements/VideoOverlay";
import { formatEventDateRange, getEditionConfig } from "@/config/editions";
import { trackTicketClick } from "@/lib/shared/analytics";
import { motion, Variants } from "framer-motion";
import { CalendarDays, Handshake, MapPin, Mic, Ticket } from "lucide-react";
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
              <div className="hero8-header__branding">
                <motion.h1 className="text-anime-style-3 d-flex justify-content-center align-items-center flex-wrap gap-4" variants={itemVariants}>
                  <Image
                    src="/assets/img/logo/logo.png"
                    alt="DevBcn - Barcelona Developers Conference"
                    width={400}
                    height={120}
                    priority
                    className="hero-logo"
                  />
                  {year === "2024" && (
                    <Link href="/kcd">
                      <Image src="/assets/img/logo/KCD-logo-white.webp" alt="KCD Barcelona" width={400} height={120} priority className="hero-logo-kcd" />
                    </Link>
                  )}
                </motion.h1>

                <motion.h4 className="hero8-header__subtitle" variants={itemVariants}>
                  The Barcelona Developers Conference
                </motion.h4>

                <motion.div className="hero8-header__event-info" variants={itemVariants}>
                  <div className="hero8-header__event-line">
                    <MapPin className="hero8-header__event-icon" />
                    <span>{config.venue.name}</span>
                  </div>
                  <div className="hero8-header__event-line">
                    <CalendarDays className="hero8-header__event-icon" />
                    <span>{formatEventDateRange(config.event.startDay, config.event.endDay)}</span>
                  </div>
                </motion.div>
              </div>

              <div className="hero8-header__spacer" />

              <div className="hero8-header__actions">
                <motion.div variants={itemVariants}>
                  <TrackBadges onTrackClick={handleTrackClick} />
                </motion.div>

                <motion.div className="btn-area1" variants={containerVariants}>
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} variants={itemVariants}>
                    <Link href={config.tickets.url} className="hero-cta hero-cta--primary" onClick={() => trackTicketClick("hero", year)}>
                      <Ticket className="hero-cta__icon" />
                      <span className="hero-cta__text">Reserve Your Seat</span>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} variants={itemVariants}>
                    <Link href={config.cfp.link} className="hero-cta hero-cta--secondary">
                      <Mic className="hero-cta__icon" />
                      <span className="hero-cta__text">Become a Speaker</span>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} variants={itemVariants}>
                    <Link href={`/${year}/sponsorship`} className="hero-cta hero-cta--tertiary">
                      <Handshake className="hero-cta__icon" />
                      <span className="hero-cta__text">Become a Sponsor</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </BackgroundCarousel>
  );
}
