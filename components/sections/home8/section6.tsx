import Countdown from "@/components/elements/Countdown";
import Image from "next/image";
import Link from "next/link";

interface Section6Props {
  eventDate: string;
  eventVenue: { name: string; mapUrl: string };
}

export default function Section6({ eventDate, eventVenue }: Section6Props) {
  const eventDateFormated = new Date(eventDate);
  return (
    <>
      <div className="cta8-section-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="cta1-main-boxarea">
                <div className="timer-btn-area">
                  <Countdown eventDate={eventDate} />
                  <div className="btn-area1">
                    <Link className="vl-btn8" href="/pricing-plan">
                      <span className="demo">Buy A Ticket</span>
                      <span className="arrow">
                        <i className="fa-solid fa-arrow-right" />
                      </span>
                    </Link>
                  </div>
                </div>
                <ul>
                  <li>
                    <Link href="/#">
                      <Image src="/assets/img/icons/calender2.svg" alt="Calendar" width={24} height={24} />
                      {eventDateFormated.toDateString()}
                    </Link>
                  </li>
                  <li className="m-0">
                    <Link href="/#">
                      <Image src="/assets/img/icons/location1.svg" alt="Location" width={24} height={24} />
                      {eventVenue.name}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
