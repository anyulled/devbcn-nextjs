"use client";
import Countdown from "@/components/elements/Countdown";
import { formatEventDateRange, getEditionConfig, getEditionYearFromPathname } from "@/config/editions";
import { trackTicketClick } from "@/lib/shared/analytics";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEditionActionAvailability } from "@/hooks/useEditionActionAvailability";

interface CTASectionProps {
  ticketUrl: string;
  eventStartDate: Date;
  eventEndDate: Date;
  eventLocation: { name: string; mapUrl: string };
  showCountdown: boolean;
}

export default function CTASection({ ticketUrl, eventStartDate, eventEndDate, eventLocation, showCountdown = true }: CTASectionProps) {
  const currentYear = getEditionYearFromPathname(usePathname());
  const travelPath = `/${currentYear}/travel`;
  const { showTickets } = useEditionActionAvailability(getEditionConfig(currentYear), currentYear === "2027");
  const showTicketButton = showCountdown && (currentYear !== "2027" || showTickets);

  return (
    <div className="cta1-section-area d-lg-block d-block">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 m-auto">
            <div className="cta1-main-boxarea">
              <div className="timer-btn-area">
                {showCountdown && (
                  <>
                    <Countdown eventDate={eventStartDate.toISOString()} />
                    {showTicketButton && (
                      <div className="btn-area1">
                        <Link href={ticketUrl} className="vl-btn1" onClick={() => trackTicketClick("cta")}>
                          Buy Ticket
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
              <ul>
                <li>
                  <Link href="#">
                    <img src="/assets/img/icons/calender1.svg" alt="" />
                    {formatEventDateRange(eventStartDate, eventEndDate)}
                  </Link>
                </li>
                <li className="m-0">
                  <Link href={travelPath}>
                    <img src="/assets/img/icons/location1.svg" alt="" />
                    {eventLocation.name}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
