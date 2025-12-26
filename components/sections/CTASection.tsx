"use client";
import Countdown from "@/components/elements/Countdown";
import { formatEventDateRange } from "@/config/editions";
import { trackTicketClick } from "@/lib/utils/analytics";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CTASectionProps {
  ticketUrl: string;
  eventStartDate: Date;
  eventEndDate: Date;
  eventLocation: string;
  showCountdown: boolean;
}

export default function CTASection({ ticketUrl, eventStartDate, eventEndDate, eventLocation, showCountdown = true }: CTASectionProps) {
  const pathname = usePathname();
  const yearMatch = pathname.match(/^\/(\d{4})/);
  const currentYear = yearMatch ? yearMatch[1] : "2026";
  const travelPath = `/${currentYear}/travel`;

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
                    <div className="btn-area1">
                      <Link href={ticketUrl} className="vl-btn1" onClick={() => trackTicketClick("cta")}>
                        Buy Ticket
                      </Link>
                    </div>
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
                    {eventLocation}
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
