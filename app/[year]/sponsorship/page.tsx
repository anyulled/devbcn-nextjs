import { formatEventDateRange, getAvailableEditions, getEditionConfig } from "@/config/editions";
import type { Metadata } from "next";
import SponsorshipClient from "./SponsorshipClient";

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
    title: `Sponsorship - DevBcn ${year}`,
    description: `Partner with DevBcn ${year}, Barcelona's biggest developer conference on ${eventDate} at ${config.venue}. Explore sponsorship opportunities.`,
    keywords: [`DevBcn ${year} sponsorship`, "conference sponsor", "tech partnership barcelona", "developer community"],
    openGraph: {
      title: `Sponsorship • DevBcn ${year} - Barcelona Developers Conference`,
      description: `Join us as a sponsor for DevBcn ${year} in Barcelona.`,
      url: `https://www.devbcn.com/${year}/sponsorship`,
      type: "website",
      locale: "en_GB",
      siteName: "devbcn.com",
    },
    twitter: {
      card: "summary_large_image",
      site: "@dev_bcn",
      creator: "@dev_bcn",
      title: `Sponsorship • DevBcn ${year} - Barcelona Developers Conference`,
      description: `Join us as a sponsor for DevBcn ${year} in Barcelona.`,
    },
  };
}

export default async function SponsorshipPage({ params }: PageProps) {
  const { year } = await params;
  const config = getEditionConfig(year);

  return <SponsorshipClient year={year} config={config} />;
}
