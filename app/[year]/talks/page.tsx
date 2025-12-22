import TalksList from "@/components/layout/TalksList";
import CTASection from "@/components/sections/CTASection";
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
      <CTASection ticketUrl="https://tickets.devbcn.com/event/devbcn-2026" />
    </div>
  );
}
