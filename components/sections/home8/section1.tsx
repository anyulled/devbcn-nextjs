"use client";
import BackgroundCarousel from "@/components/BackgroundCarousel";
import TrackBadges from "@/components/elements/TrackBadges";
import VideoOverlay from "@/components/elements/VideoOverlay";
import { formatEventDateRange, getEditionConfig } from "@/config/editions";
import { trackTicketClick } from "@/lib/shared/analytics";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Handshake, MapPin, Mic, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Section1Props {
  year: string;
}

export default function Section1({ year }: Readonly<Section1Props>) {
  const config = getEditionConfig(year);
  const router = useRouter();

  const currentDate = new Date();
  const isCfpOpen = currentDate >= config.cfp.startDay && currentDate <= config.cfp.endDay;

  // Find ticket start and end dates based on categories if available
  const blindBird = config.tickets.categories?.find((c) => c.name.toLowerCase().includes("blind bird"));
  const superLastMinute = config.tickets.categories?.find((c) => c.name.toLowerCase().includes("super last minute"));

  const ticketsStart = blindBird ? blindBird.startDate : config.tickets.startDay;
  const ticketsEnd = superLastMinute ? superLastMinute.endDate : config.tickets.endDay;

  const isTicketsOpen = currentDate >= ticketsStart && currentDate <= ticketsEnd;

  const handleTrackClick = (trackId: string) => {
    router.push(`/${year}/schedule?track=${trackId}`);
  };

  return (
    <BackgroundCarousel className="hero8-slider-area">
      <VideoOverlay opacity={0.5} />
      <div className="container">
        <div className="row">
          <div className="col-lg-10 m-auto">
            <motion.div className="hero8-header text-center">
              <div className="hero8-header__branding">
                <motion.h1 className="text-anime-style-3 d-flex justify-content-center align-items-center flex-wrap gap-4">
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

                <motion.h4 className="hero8-header__subtitle">The Barcelona Developers Conference</motion.h4>

                <motion.div className="hero8-header__event-info">
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
                <motion.div className="hero8-header__special-highlight">
                  <span className="hero8-header__special-kicker">New at DevBcn {year}</span>
                  <h5 className="hero8-header__special-title">Private AMA Sessions + Public Speaking Mentoring</h5>
                  <p className="hero8-header__special-copy">Limited seats and direct access to speakers. Book your spot before sessions fill up.</p>
                  <div className="hero8-header__special-actions">
                    <Link href={`/${year}/ama`} className="hero8-header__special-link">
                      Explore AMA
                      <ArrowRight />
                    </Link>
                    <Link href={`/${year}/mentoring`} className="hero8-header__special-link hero8-header__special-link--alt">
                      Explore Mentoring
                      <ArrowRight />
                    </Link>
                  </div>
                </motion.div>

                <motion.div>
                  <TrackBadges onTrackClick={handleTrackClick} />
                </motion.div>

                <motion.div className="btn-area1">
                  {isTicketsOpen && (
                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Link href={config.tickets.url} className="hero-cta hero-cta--primary" onClick={() => trackTicketClick("hero", year)}>
                        <Ticket className="hero-cta__icon" />
                        <span className="hero-cta__text">Reserve Your Seat</span>
                      </Link>
                    </motion.div>
                  )}
                  {isCfpOpen && (
                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Link href={config.cfp.link} className="hero-cta hero-cta--secondary">
                        <Mic className="hero-cta__icon" />
                        <span className="hero-cta__text">Become a Speaker</span>
                      </Link>
                    </motion.div>
                  )}
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
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
