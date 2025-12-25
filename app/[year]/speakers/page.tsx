import PageHeader from "@/components/layout/PageHeader";
import SpeakerCard from "@/components/layout/SpeakerCard";
import CTASection from "@/components/sections/CTASection";
import { formatEventDateRange, getAvailableEditions, getEditionConfig } from "@/config/editions";
import { getSpeakers } from "@/hooks/useSpeakers";

interface SpeakersProps {
  params: Promise<{
    year: number;
  }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  return years.map((year) => ({ year }));
}

export default async function Speakers({ params }: SpeakersProps) {
  const { year } = await params;
  const speakers = await getSpeakers(year);
  const eventData = getEditionConfig(year);

  return (
    <div>
      <PageHeader title="Our Speakers" breadcrumbText="Our Speakers" />
      {speakers && speakers.length > 0 ? (
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
      ) : (
        <div className="team-sperkers-section-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 m-auto">
                <div className="text-center" style={{ padding: "60px 0" }}>
                  <h3 style={{ color: "#1a1a1a", marginBottom: "20px" }}>Speakers Coming Soon!</h3>
                  <p
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.8",
                      color: "#666",
                    }}
                  >
                    We&apos;re currently finalizing our speaker lineup for DevBcn {year}. Stay tuned for exciting announcements about our amazing speakers!
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
