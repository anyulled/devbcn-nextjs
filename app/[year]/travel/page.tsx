import Countdown from "@/components/elements/Countdown";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { formatEventDateRange, getAvailableEditions, getEditionConfig } from "@/config/editions";
import type { Metadata } from "next";
import Link from "next/link";
import LaFargaVenue from "@/components/sections/venue/LaFargaVenue";
import WTCVenue from "@/components/sections/venue/WTCVenue";

interface PageProps {
  params: Promise<{
    year: string;
  }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  return years.map((year) => ({ year }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params;
  const config = getEditionConfig(year);
  const eventDate = formatEventDateRange(config.event.startDay, config.event.endDay);

  return {
    title: `Travel to Barcelona - DevBcn ${year}`,
    description: `How to get to DevBcn ${year} at the ${config.venue}. Information about public transport, parking, and venue access.`,
    keywords: [`DevBcn ${year} travel`, "Barcelona travel", "World Trade Center Barcelona", "public transport barcelona"],
    openGraph: {
      title: `Travel to Barcelona • DevBcn ${year}`,
      description: `Join us for DevBcn ${year} at the World Trade Center Barcelona.`,
      url: `https://www.devbcn.com/${year}/travel`,
      type: "website",
      locale: "en_GB",
      siteName: "devbcn.com",
    },
  };
}

export default async function TravelPage({ params }: PageProps) {
  const { year } = await params;
  const config = getEditionConfig(year);
  const eventDateRange = formatEventDateRange(config.event.startDay, config.event.endDay);

  return (
    <div>
      {/* Header Section */}
      <PageHeader breadcrumbText="Travel" title={`Travel to Barcelona - DevBcn ${year}`} backgroundImageId={8} />
      {/* Main Content Section */}
      <div className="event-sidepage-section-area sp8">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="event-side-images">
                <div className="space32" />
                <h3>Venue</h3>
                <div className="space16" />

                {/* Conditional rendering based on year */}
                {["2023", "2024", "2025"].includes(year) ? (
                  /* La Farga venue for 2023-2025 editions */
                  <LaFargaVenue />
                ) : (
                  /* World Trade Center Barcelona for 2026+ editions */
                  <WTCVenue venueName={config.venue} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Countdown */}
      <CTASection
        eventStartDate={config.event.startDay}
        eventEndDate={config.event.endDay}
        ticketUrl={config.tickets.url}
        eventLocation={config.venue}
        showCountdown={config.showCountdown}
      />
    </div>
  );
}
