import Countdown from "@/components/elements/Countdown";
import Link from "next/link";

interface CTASectionProps {
    ticketUrl?: string;
    eventDate?: string;
    eventLocation?: string;
}

export default function CTASection({
    ticketUrl = "/pricing-plan",
    eventDate = "16-17 June 2026",
    eventLocation = "World Trade Center Barcelona",
}: CTASectionProps) {
    return (
        <div className="cta1-section-area d-lg-block d-block">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="cta1-main-boxarea">
                            <div className="timer-btn-area">
                                <Countdown />
                                <div className="btn-area1">
                                    <Link href={ticketUrl} className="vl-btn1">
                                        Buy Ticket
                                    </Link>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <Link href="/#">
                                        <img src="/assets/img/icons/calender1.svg" alt="" />
                                        {eventDate}
                                    </Link>
                                </li>
                                <li className="m-0">
                                    <Link href="/travel">
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
