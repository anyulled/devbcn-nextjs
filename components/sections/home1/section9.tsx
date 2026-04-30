"use client";
import Countdown from "@/components/elements/Countdown";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackTicketClick } from "@/lib/shared/analytics";

export default function Section9() {
  const pathname = usePathname();
  const segment = pathname.split("/").find(Boolean);
  const yearFromPath = segment && /^\d{4}$/.test(segment) ? segment : new Date().getFullYear().toString();

  return (
    <div className="cta1-section-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 m-auto">
            <div className="cta1-main-boxarea">
              <div className="timer-btn-area">
                <Countdown eventDate={new Date().toISOString()} />
                <div className="btn-area1">
                  <Link href="/pricing-plan" className="vl-btn1" onClick={() => trackTicketClick("cta", yearFromPath)}>
                    Buy Ticket
                  </Link>
                </div>
              </div>
              <ul>
                <li>
                  <Link href="/#">
                    <img src="/assets/img/icons/calender1.svg" alt="" />
                    30 January 2025 - 6pm to 11:30pm
                  </Link>
                </li>
                <li className="m-0">
                  <Link href="/#">
                    <img src="/assets/img/icons/location1.svg" alt="" />
                    Secret Location In The UK
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
