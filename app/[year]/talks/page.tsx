import Countdown from "@/components/elements/Countdown";
import TalksList from "@/components/layout/TalksList";
import { getTalks, getUniqueTracks } from "@/hooks/useTalks";
import Link from "next/link";

interface TalksProps {
  params: Promise<{
    year: number;
  }>;
}

export default async function Talks({ params }: TalksProps) {
  const { year } = await params;
  const sessionGroups = await getTalks(year);
  const talks = sessionGroups.flatMap((group) => group.sessions);
  const tracks = getUniqueTracks(sessionGroups);

  return (
    <div>
      {/* Header Section */}
      <div
        className="inner-page-header"
        style={{ backgroundImage: "url(/assets/img/bg/header-bg6.png)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-5 m-auto">
              <div className="heading1 text-center">
                <h1>Talks {year}</h1>
                <div className="space20" />
                <Link href="/">
                  Home <i className="fa-solid fa-angle-right" />{" "}
                  <span>Talks</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Talks Section */}
      <div className="talks-section-area sp1">
        <div className="container">
          <TalksList talks={talks} tracks={tracks} year={year} />
        </div>
      </div>
      <div className="cta1-section-area d-lg-block d-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="cta1-main-boxarea">
                <div className="timer-btn-area">
                  <Countdown />
                  <div className="btn-area1">
                    <Link href="https://tickets.devbcn.com/event/devbcn-2026" className="vl-btn1">
                      Buy Ticket
                    </Link>
                  </div>
                </div>
                <ul>
                  <li>
                    <Link href="/#">
                      <img src="/assets/img/icons/calender1.svg" alt="" />
                      16-17 June 2026
                    </Link>
                  </li>
                  <li className="m-0">
                    <Link href="/travel">
                      <img src="/assets/img/icons/location1.svg" alt="" />
                      World Trade Center Barcelona
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
