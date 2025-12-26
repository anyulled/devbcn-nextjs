import Countdown from "@/components/elements/Countdown";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { formatEventDateRange, getAvailableEditions, getEditionConfig } from "@/config/editions";
import type { Metadata } from "next";
import Link from "next/link";

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
                <p>
                  <strong>{config.venue}</strong>
                </p>
                <p>1ª planta Edif. Este, Moll de Barcelona, s/n, 08039 Barcelona</p>

                <div className="space40" />
                <div className="img1">
                  <img
                    src="/assets/img/all-images/venue/wtc.webp"
                    alt="World Trade Center Barcelona - Exterior view"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                <div className="space40" />
                <h4>Conference Auditorium</h4>
                <div className="space16" />
                <div className="img1">
                  <img
                    src="/assets/img/all-images/venue/wtc-auditorio.webp"
                    alt="World Trade Center Barcelona - Auditorium"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                <div className="space40" />
                <h4>Access by Car</h4>
                <div className="space16" />
                <p>
                  🚙 Access by <strong>car:</strong> via C-31 & B-10 (14 minutes from the Airport)
                </p>
                <p>
                  The World Trade Center Barcelona offers paid parking facilities. For detailed parking information and rates, please visit the{" "}
                  <Link href="https://www.wtcbarcelona.com/" target="_blank" rel="noreferrer">
                    <strong>World Trade Center Barcelona website</strong>
                  </Link>
                  .
                </p>

                <div className="space40" />
                <h4>Access by Public Transport</h4>
                <div className="space16" />
                <ul>
                  <li>
                    <strong>🚇 Metro:</strong> Líneas L3: Parada Drassanes, Línea L2: Parada Paral·lel
                  </li>
                  <li>
                    <strong>🚍 Bus:</strong> Línea V11, parada Moll de Barcelona
                  </li>
                </ul>

                <div className="space40" />
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      width="100%"
                      height="450"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.0089347896845!2d2.1750847!3d41.3755825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f7c8f7c8f7%3A0x7c8f7c8f7c8f7c8f!2sWorld%20Trade%20Center%20Barcelona!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses"
                      title="World Trade Center Barcelona Map"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{ border: 0 }}
                    />
                  </div>
                </div>
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
