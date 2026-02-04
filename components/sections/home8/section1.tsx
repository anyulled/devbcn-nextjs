"use client";
import BackgroundCarousel from "@/components/BackgroundCarousel";
import { formatEventDateRange, getEditionConfig } from "@/config/editions";
import { trackTicketClick } from "@/lib/utils/analytics";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Section1Props {
  year: string;
}

export default function Section1({ year }: Section1Props) {
  const config = getEditionConfig(year);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
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

  return (
    <BackgroundCarousel className="hero8-slider-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <motion.div className="hero8-header text-center" initial="hidden" animate="visible" variants={containerVariants}>
              <div className="space48"></div>
              <div className="space32" />
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
              <motion.h4 variants={itemVariants}>The Barcelona Developers Conference</motion.h4>
              <motion.div variants={itemVariants}>
                <h5>{formatEventDateRange(config.event.startDay, config.event.endDay)}</h5>
                <h5>{config.venue.name}</h5>
              </motion.div>
              <div className="space32" />
              <div className="space24" />
              <div className="space40" />
              <motion.h5 variants={itemVariants}>
                {config.trackNumber} tracks with the following topics: {config.tracks}
              </motion.h5>
              <div className="space40"></div>
              <div className="space32" />
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={itemVariants}>
                  <Link href={config.tickets.url} className="vl-btn8" onClick={() => trackTicketClick("hero", year)}>
                    <span className="demo">🎟️ Reserve your Seat</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={itemVariants}>
                  <Link href={config.cfp.link} className="vl-btn8">
                    <span className="demo">🎙️ Become a Speaker</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={itemVariants}>
                  <Link href={`/${year}/sponsorship`} className="vl-btn8">
                    <span className="demo">🤝🏽 Sponsorship</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <Image
        src="/assets/img/elements/layer1.png"
        alt=""
        className="layer1"
        width={1440}
        height={230}
        style={{ width: "100%", height: "auto" }}
      />
    </BackgroundCarousel>
  );
}
