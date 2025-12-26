import PageHeader from "@/components/layout/PageHeader";
import TalksList from "@/components/layout/TalksList";
import CTASection from "@/components/sections/CTASection";
import { formatEventDateRange, getAvailableEditions, getEditionConfig } from "@/config/editions";
import { getTalks, getUniqueTracks } from "@/hooks/useTalks";
import { generateItemListSchema, serializeJsonLd } from "@/lib/utils/jsonld";
import type { Metadata } from "next";
import Script from "next/script";

// ISR: Revalidate every 6 hours to keep talk data fresh
export const revalidate = 21600;

interface TalksProps {
  params: Promise<{
    year: number;
  }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  return years.map((year) => ({ year }));
}

export async function generateMetadata({ params }: TalksProps): Promise<Metadata> {
  const { year } = await params;
  const sessionGroups = await getTalks(year);
  const talks = sessionGroups.flatMap((group) => group.sessions);
  const talkCount = talks.length;

  return {
    title: `Talks & Sessions - DevBcn ${year}`,
    description: `Explore ${talkCount} talks and sessions at DevBcn ${year}. From beginner to advanced topics across multiple tracks.`,
    keywords: [`DevBcn ${year} talks`, "conference sessions", "tech talks", "developer sessions", "barcelona developer conference"],
    openGraph: {
      title: `DevBcn ${year} Talks & Sessions`,
      description: `${talkCount} sessions covering the latest in software development.`,
      url: `https://www.devbcn.com/${year}/talks`,
      type: "website",
      locale: "en_GB",
      siteName: "devbcn.com",
    },
    twitter: {
      card: "summary_large_image",
      site: "@dev_bcn",
      creator: "@dev_bcn",
      title: `DevBcn ${year} Talks`,
      description: `${talkCount} sessions at DevBcn ${year}.`,
    },
  };
}

export default async function Talks({ params }: TalksProps) {
  const { year } = await params;
  const sessionGroups = await getTalks(year);
  const talks = sessionGroups.flatMap((group) => group.sessions);
  const tracks = getUniqueTracks(sessionGroups);
  const eventData = getEditionConfig(year);

  // Generate JSON-LD ItemList schema for talks
  const baseUrl = "https://www.devbcn.com";
  const talksListSchema =
    talks.length > 0
      ? generateItemListSchema(
          talks.map((talk) => ({
            name: talk.title,
            url: `${baseUrl}/${year}/talks/${talk.id}`,
            description: talk.description || undefined,
          })),
          `DevBcn ${year} Talks & Sessions`
        )
      : null;

  return (
    <div>
      {talksListSchema && <Script id="talks-list-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(talksListSchema) }} />}
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
        eventStartDate={eventData.event.startDay}
        eventEndDate={eventData.event.endDay}
        eventLocation={eventData.venue}
        ticketUrl={eventData.tickets.url}
        showCountdown={eventData.showCountdown}
      />
    </div>
  );
}
