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
      url: `https://www.devbcn.com/${year}/mentoring`,
      type: "website",
      images: [
        {
          url: "/assets/img/features/speaking-mentoring.png",
          width: 1200,
          height: 630,
          alt: `Speaking Mentoring - DevBcn ${year}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Speaking Mentoring - DevBcn ${year}`,
      description: `Master public speaking and abstract preparation with expert mentoring at DevBcn ${year}.`,
      images: ["/assets/img/features/speaking-mentoring.png"],
    },
    alternates: {
      canonical: `https://www.devbcn.com/${year}/mentoring`,
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
        <PageHeader title="Mentoring" breadcrumbText="Mentoring" backgroundImageId={12} />
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
