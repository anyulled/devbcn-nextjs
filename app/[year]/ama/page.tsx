import { getEditionConfig } from "@/config/editions";
import AmaDetails from "@/components/sections/ama/AmaDetails";
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
    title: `AMA Sessions - DevBcn ${year}`,
    description: `Join exclusive Ask Me Anything sessions with world-class speakers at DevBcn ${year}.`,
    openGraph: {
      title: `AMA Sessions - DevBcn ${year}`,
      description: `Join exclusive Ask Me Anything sessions with world-class speakers at DevBcn ${year}.`,
      images: ["/assets/img/features/ama-sessions.png"],
    },
  };
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { year } = await params;

  if (year !== "2026") {
    notFound();
  }

  try {
    const eventData = getEditionConfig(year);
    return (
      <main className="main-content">
        <PageHeader title="AMA Sessions" breadcrumbText="AMA Sessions" backgroundImageId={14} />
        <AmaDetails year={year} />
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
