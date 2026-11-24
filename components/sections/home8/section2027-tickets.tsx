"use client";

import ScrollHeading2027 from "./ScrollHeading2027";
import BuyTicketButton from "@/components/elements/BuyTicketButton";
import Countdown from "@/components/elements/Countdown";
import { formatEventDateRange, getTicketSaleWindow } from "@/config/editions";
import { edition2027 } from "@/config/editions/2027";
import { useEditionActionAvailability } from "@/hooks/useEditionActionAvailability";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const { startDate } = getTicketSaleWindow(edition2027);
const launchTime = startDate.toISOString();
const launchDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "Europe/Madrid" }).format(startDate);
const eventStart = edition2027.event.startDay.toISOString();
const eventDates = formatEventDateRange(edition2027.event.startDay, edition2027.event.endDay);

export default function Section2027Tickets() {
  const { isInitialized, isBeforeTicketSale, showTickets } = useEditionActionAvailability(edition2027);

  return (
    <section id="tickets" aria-labelledby="countdown-title" className="home-2027__section home-2027__ticket-section">
      <div className="home-2027__inner home-2027__tickets">
        <div>
          <ScrollHeading2027 id="countdown-title">Countdown to DevBcn 2027</ScrollHeading2027>
          <p>{eventDates}</p>
          {edition2027.showCountdown && (
            <div role="timer" aria-labelledby="countdown-title">
              <Countdown style={1} eventDate={eventStart} />
            </div>
          )}
        </div>
        <div className="home-2027__ticket-actions">
          <h3>Tickets</h3>
          {showTickets && <p>Tickets are on sale.</p>}
          {isInitialized && !isBeforeTicketSale && !showTickets && <p>Online ticket sales have closed.</p>}
          {isBeforeTicketSale && (
            <p>
              Tickets go on sale <time dateTime={launchTime}>{launchDate}</time>.
            </p>
          )}
          {showTickets && <BuyTicketButton href={edition2027.tickets.url} year={edition2027.edition} location="home_tickets" text="Buy a ticket" />}
          <Link href={`/${edition2027.edition}/pricing-plan`} className="home-2027__text-link">
            View ticket prices <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
