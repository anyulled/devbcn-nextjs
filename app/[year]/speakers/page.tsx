import SpeakerCard from "@/components/layout/SpeakerCard";
import CTASection from "@/components/sections/CTASection";
import { getSpeakers } from "@/hooks/useSpeakers";
import Link from "next/link";

interface SpeakersProps {
  params: Promise<{
    year: number;
  }>;
}

export default async function Speakers({ params }: SpeakersProps) {
  const { year } = await params;
  const speakers = await getSpeakers(year);

  return (
    <div>
      <div
        className="inner-page-header"
        style={{ backgroundImage: "url(/assets/img/bg/header-bg6.png)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-5 m-auto">
              <div className="heading1 text-center">
                <h1>Our Speakers</h1>
                <div className="space20" />
                <Link href="/">
                  Home <i className="fa-solid fa-angle-right" />{" "}
                  <span>Our Speakers</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  year={year}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*===== TEAM AREA ENDS =======*/}
      {/*===== CTA AREA STARTS =======*/}
      <CTASection />
    </div>
  );
}
