"use client";

import type { EditionConfig } from "@/config/editions/types";
import { trackTicketClick } from "@/lib/shared/analytics";
import { Handshake, Mic, Ticket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroActionsProps {
  config: EditionConfig;
  year: string;
}

const MAX_TIMEOUT = 2_147_483_647;

export default function HeroActions({ config, year }: Readonly<HeroActionsProps>) {
  const [now, setNow] = useState<number | null>(null);
  const ticketStart = config.tickets.categories.find((category) => category.name.toLowerCase().includes("blind bird"))?.startDate ?? config.tickets.startDay;
  const ticketEnd = config.tickets.categories.find((category) => category.name.toLowerCase().includes("super last minute"))?.endDate ?? config.tickets.endDay;
  useEffect(() => {
    const boundaries = [config.cfp.startDay.getTime(), config.cfp.endDay.getTime() + 1, ticketStart.getTime(), ticketEnd.getTime() + 1];
    const timer: { current?: ReturnType<typeof setTimeout> } = {};
    const update = () => {
      const current = Date.now();
      setNow(current);
      const next = boundaries.filter((boundary) => boundary > current).sort((a, b) => a - b)[0];
      if (next !== undefined) timer.current = setTimeout(update, Math.min(next - current, MAX_TIMEOUT));
    };
    update();
    return () => clearTimeout(timer.current);
  }, [config.cfp.startDay, config.cfp.endDay, ticketStart, ticketEnd]);

  const showTickets = now !== null && now >= ticketStart.getTime() && now <= ticketEnd.getTime();
  const showCfp = now !== null && now >= config.cfp.startDay.getTime() && now <= config.cfp.endDay.getTime();

  return (
    <div className="btn-area1 hero8-header__primary-actions">
      {showTickets && (
        <div>
          <Link href={config.tickets.url} className="hero-cta hero-cta--primary" onClick={() => trackTicketClick("hero", year)}>
            <Ticket className="hero-cta__icon" aria-hidden="true" />
            <span className="hero-cta__text">Reserve Your Seat</span>
          </Link>
        </div>
      )}
      {showCfp && (
        <div>
          <Link href={config.cfp.link} className="hero-cta hero-cta--secondary">
            <Mic className="hero-cta__icon" aria-hidden="true" />
            <span className="hero-cta__text">Become a Speaker</span>
          </Link>
        </div>
      )}
      <div>
        <Link href={`/${year}/sponsorship`} prefetch={false} className="hero-cta hero-cta--tertiary">
          <Handshake className="hero-cta__icon" aria-hidden="true" />
          <span className="hero-cta__text">Become a Sponsor</span>
        </Link>
      </div>
    </div>
  );
}
