"use client";

import type { EditionConfig } from "@/config/editions/types";
import { trackTicketClick } from "@/lib/shared/analytics";
import { motion, useReducedMotion } from "framer-motion";
import { Handshake, Mic, Ticket } from "lucide-react";
import Link from "next/link";
import { useEditionActionAvailability } from "@/hooks/useEditionActionAvailability";

interface HeroActionsProps {
  config: EditionConfig;
  year: string;
  exploreHref?: string;
}

export default function HeroActions({ config, year, exploreHref }: Readonly<HeroActionsProps>) {
  const { isInitialized, showTickets, showCfp } = useEditionActionAvailability(config);
  const reduceMotion = useReducedMotion();
  const hover = reduceMotion ? undefined : { scale: 1.05, y: -2 };
  const press = reduceMotion ? undefined : { scale: 0.98 };

  return (
    <div className="btn-area1 hero8-header__primary-actions">
      {showTickets && (
        <motion.div whileHover={hover} whileTap={press}>
          <Link href={config.tickets.url} className="hero-cta hero-cta--primary" onClick={() => trackTicketClick("hero", year)}>
            <Ticket className="hero-cta__icon" aria-hidden="true" />
            <span className="hero-cta__text">Reserve Your Seat</span>
          </Link>
        </motion.div>
      )}
      {showCfp && (
        <motion.div whileHover={hover} whileTap={press}>
          <Link href={config.cfp.link} className={exploreHref && !showTickets ? "hero-cta hero-cta--primary" : "hero-cta hero-cta--secondary"}>
            <Mic className="hero-cta__icon" aria-hidden="true" />
            <span className="hero-cta__text">Become a Speaker</span>
          </Link>
        </motion.div>
      )}
      {exploreHref && isInitialized && !showTickets && !showCfp && (
        <motion.div whileHover={hover} whileTap={press}>
          <Link href={exploreHref} className="hero-cta hero-cta--primary">
            <span className="hero-cta__text">Explore the conference</span>
          </Link>
        </motion.div>
      )}
      <motion.div whileHover={hover} whileTap={press}>
        <Link href={`/${year}/sponsorship`} className="hero-cta hero-cta--tertiary">
          <Handshake className="hero-cta__icon" aria-hidden="true" />
          <span className="hero-cta__text">Become a Sponsor</span>
        </Link>
      </motion.div>
    </div>
  );
}
