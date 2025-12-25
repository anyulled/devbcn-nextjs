import { formatEventDateRange, getAvailableEditions, getEditionConfig } from "@/config/editions";
import type { Metadata } from "next";
import Link from "next/link";

// ISR: Revalidate every 24 hours to keep schedule data fresh
export const revalidate = 86400;

interface ScheduleProps {
  params: Promise<{ year: string }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  return years.map((year) => ({ year }));
}

export async function generateMetadata({ params }: ScheduleProps): Promise<Metadata> {
  const { year } = await params;
  const config = getEditionConfig(year);
  const eventDate = formatEventDateRange(config.event.startDay, config.event.endDay);

  return {
    title: `Schedule - DevBcn ${year}`,
    description: `View the complete schedule for DevBcn ${year} on ${eventDate}. Plan your conference experience.`,
    keywords: [`DevBcn ${year} schedule`, "conference schedule", "event agenda", "barcelona developer conference"],
    openGraph: {
      title: `DevBcn ${year} Schedule`,
      description: `Full conference schedule for ${eventDate}.`,
      url: `https://www.devbcn.com/${year}/schedule`,
      type: "website",
      locale: "en_GB",
      siteName: "devbcn.com",
    },
    twitter: {
      card: "summary_large_image",
      site: "@dev_bcn",
      creator: "@dev_bcn",
      title: `DevBcn ${year} Schedule`,
      description: `Plan your DevBcn ${year} experience.`,
    },
  };
}

export default async function Schedule({ params }: ScheduleProps) {
  const { year } = await params;
  return (
    <div>
      <div className="inner-page-header" style={{ backgroundImage: "url(/assets/img/bg/header-bg6.png)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 m-auto">
              <div className="heading1 text-center">
                <h1>Schedule</h1>
                <div className="space20" />
                <Link href="/">
                  Home <i className="fa-solid fa-angle-right" /> <span>Schedule</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="team-sperkers-section-area sp1">
        <div className="container">
          <div className="row">Coming Soon</div>
        </div>
      </div>
    </div>
  );
}
