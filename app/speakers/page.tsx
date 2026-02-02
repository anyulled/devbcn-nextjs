import Countdown from "@/components/elements/Countdown";
import PageHeader from "@/components/layout/PageHeader";
import SpeakerCard from "@/components/layout/SpeakerCard";
import { getSpeakers } from "@/hooks/useSpeakers";
import Link from "next/link";
export default async function Speakers() {
  const speakers = await getSpeakers(2025);

  return (
    <div>
      <PageHeader title="Our Speakers" breadcrumbText="Our Speakers" backgroundImageId={6} contentColClass="col-lg-5" />
      {/*===== HERO AREA ENDS =======*/}
      {/*===== TEAM AREA STARTS =======*/}
      <div className="team-sperkers-section-area sp1">
        <div className="container">
          <div className="row">
            {speakers.map((speaker) => (
              <div key={speaker.id} className="col-lg-3 col-md-6">
                <SpeakerCard
                  name={speaker.fullName}
                  image={speaker.profilePicture}
                  position={speaker.tagLine}
                  links={speaker.links}
                  speakerId={speaker.id}
                  year={2025}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*===== TEAM AREA ENDS =======*/}
      {/*===== CTA AREA STARTS =======*/}
      <div className="cta1-section-area d-lg-block d-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="cta1-main-boxarea">
                <div className="timer-btn-area">
                  <Countdown eventDate={new Date().toISOString()} />
                  <div className="btn-area1">
                    <Link href="/pricing-plan" className="vl-btn1">
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
      {/*===== CTA AREA ENDS =======*/}
      {/*===== CTA AREA STARTS =======*/}
      <div className="cta1-section-area d-lg-none d-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="cta1-main-boxarea">
                <div className="timer-btn-area">
                  <Countdown eventDate={new Date().toISOString()} />
                  <div className="btn-area1">
                    <Link href="/pricing-plan" className="vl-btn1">
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
    </div>
  );
}
