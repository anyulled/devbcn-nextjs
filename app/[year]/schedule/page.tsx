import { formatEventDateRange, getAvailableEditions, getEditionConfig } from "@/config/editions";
import type { Metadata } from "next";
import Link from "next/link";
import { getSchedule } from "@/hooks/useSchedule";
import ScheduleContainer from "@/components/schedule/ScheduleContainer";
import { ScheduleProvider } from "@/context/ScheduleContext";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";

// ISR: Revalidate every 1 hour (3600s) to keep schedule data reasonably fresh without overloading
export const revalidate = 3600;

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
  const config = getEditionConfig(year);

  // Server-side fetch
  const scheduleData = await getSchedule(year);

  return (
    <div>
      <PageHeader title="Schedule" breadcrumbText="Schedule" backgroundImageId={6} />

      <div className="schedule-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ScheduleProvider>
                <ScheduleContainer initialSchedule={scheduleData} year={year} />
              </ScheduleProvider>
            </div>
          </div>
        </div>
      </div>

      <CTASection
        eventLocation={config.venue}
        eventStartDate={config.event.startDay}
        eventEndDate={config.event.endDay}
        ticketUrl={config.tickets.url}
        showCountdown={config.showCountdown}
      />
    </div>
  );
}
