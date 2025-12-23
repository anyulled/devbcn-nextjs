import PageHeader from "@/components/layout/PageHeader";
import TalksList from "@/components/layout/TalksList";
import CTASection from "@/components/sections/CTASection";
import { formatEventDateRange, getEditionConfig } from "@/config/editions";
import { getTalks, getUniqueTracks } from "@/hooks/useTalks";

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
  const eventData = getEditionConfig(year);

  return (
    <div>
      <PageHeader title={`Talks ${year}`} breadcrumbText="Talks" />

      {talks && talks.length > 0 ? (
        <div className="talks-section-area sp1">
          <div className="container">
            <TalksList talks={talks} tracks={tracks} year={year} />
          </div>
        </div>
      ) : (
        <div className="talks-section-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 m-auto">
                <div className="text-center" style={{ padding: "60px 0" }}>
                  <h3 style={{ color: "#1a1a1a", marginBottom: "20px" }}>Talks Coming Soon!</h3>
                  <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#666" }}>
                    We&apos;re currently finalizing our talk lineup for DevBcn {year}. Stay tuned for exciting announcements about our sessions!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <CTASection
        eventDate={formatEventDateRange(eventData.event.startDay, eventData.event.endDay)}
        eventLocation={eventData.venue}
        ticketUrl={eventData.tickets.url}
      />
    </div>
  );
}
