import { getEditionConfig } from "@/config/editions";
import MentoringDetails from "@/components/sections/mentoring/MentoringDetails";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";

interface PageProps {
  params: Promise<{
    year: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ year: "2026" }];
}

export async function generateMetadata({ params }: Readonly<PageProps>): Promise<Metadata> {
  const { year } = await params;

  if (year !== "2026") {
    return { title: "Not Found" };
  }

  return {
    title: `Speaking Mentoring - DevBcn ${year}`,
    description: `Master public speaking and abstract preparation with expert mentoring at DevBcn ${year}.`,
    openGraph: {
      title: `Speaking Mentoring - DevBcn ${year}`,
      description: `Master public speaking and abstract preparation with expert mentoring at DevBcn ${year}.`,
      images: ["/assets/img/features/speaking-mentoring.png"],
    },
  };
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { year } = await params;
  const eventData = getEditionConfig(year);

  if (year !== "2026") {
    notFound();
  }

  try {
    getEditionConfig(year);
    return (
      <main className="main-content">
        <PageHeader title="AMA Sessions" breadcrumbText="AMA Sessions" backgroundImageId={12} />
        <MentoringDetails year={year} />
        <CTASection
          eventStartDate={eventData.event.startDay}
          eventEndDate={eventData.event.endDay}
          eventLocation={eventData.venue}
          ticketUrl={eventData.tickets.url}
          showCountdown={eventData.showCountdown}
        />
      </main>
    );
  } catch {
    notFound();
  }
}
