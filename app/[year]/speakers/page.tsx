import PageHeader from "@/components/layout/PageHeader";
import SpeakerCard from "@/components/layout/SpeakerCard";
import CTASection from "@/components/sections/CTASection";
import { formatEventDateRange, getAvailableEditions, getEditionConfig } from "@/config/editions";
import { getSpeakers } from "@/hooks/useSpeakers";
import { generateItemListSchema, serializeJsonLd } from "@/lib/utils/jsonld";
import type { Metadata } from "next";
import Script from "next/script";

// ISR: Revalidate every 6 hours to keep speaker data fresh
export const revalidate = 21600;

interface SpeakersProps {
  params: Promise<{
    year: number;
  }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  return years.map((year) => ({ year }));
}

export async function generateMetadata({ params }: SpeakersProps): Promise<Metadata> {
  const { year } = await params;
  const speakers = await getSpeakers(year);
  const speakerCount = speakers.length;

  return {
    title: `Speakers - DevBcn ${year}`,
    description: `Meet the ${speakerCount} amazing speakers at DevBcn ${year}. Industry experts sharing their knowledge on cutting-edge technologies.`,
    keywords: [`DevBcn ${year} speakers`, "conference speakers", "tech speakers", "barcelona developer conference", "industry experts"],
    openGraph: {
      title: `DevBcn ${year} Speakers`,
      description: `${speakerCount} speakers sharing their expertise at Barcelona's premier developer conference.`,
      url: `https://www.devbcn.com/${year}/speakers`,
      type: "website",
      locale: "en_GB",
      siteName: "devbcn.com",
    },
    twitter: {
      card: "summary_large_image",
      site: "@dev_bcn",
      creator: "@dev_bcn",
      title: `DevBcn ${year} Speakers`,
      description: `${speakerCount} industry experts speaking at DevBcn ${year}.`,
    },
  };
}

export default async function Speakers({ params }: SpeakersProps) {
  const { year } = await params;
  const speakers = await getSpeakers(year);
  const eventData = getEditionConfig(year);

  // Generate JSON-LD ItemList schema for speakers
  const baseUrl = "https://www.devbcn.com";
  const speakersListSchema =
    speakers.length > 0
      ? generateItemListSchema(
          speakers.map((speaker) => ({
            name: speaker.fullName,
            url: `${baseUrl}/${year}/speakers/${speaker.id}`,
            description: speaker.bio || speaker.tagLine || undefined,
          })),
          `DevBcn ${year} Speakers`
        )
      : null;

  return (
    <div>
      {speakersListSchema && (
        <Script id="speakers-list-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(speakersListSchema) }} />
      )}
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
        showCountdown={eventData.showCountdown}
      />
    </div>
  );
}
