import Section1 from "@/components/sections/home8/section1";
import Section2 from "@/components/sections/home8/section2";
import Section3 from "@/components/sections/home8/section3";
import Section4 from "@/components/sections/home8/section4";
import Section5 from "@/components/sections/home8/section5";
import Section6 from "@/components/sections/home8/section6";
import { formatEventDateRange, getAvailableEditions, getEditionConfig } from "@/config/editions";
import { generateEventSchema, generateOrganizationSchema, serializeJsonLd } from "@/lib/utils/jsonld";
import type { Metadata } from "next";
import Script from "next/script";

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
    title: `DevBcn ${year} - Barcelona Developers Conference`,
    description: `Join DevBcn ${year}, Barcelona's biggest developer conference on ${eventDate} at ${config.venue}. Explore cutting-edge talks, workshops, and networking opportunities.`,
    keywords: [
      `DevBcn ${year}`,
      "barcelona developer conference",
      "tech conference spain",
      "software development",
      "frontend",
      "backend",
      "cloud",
      "AI",
      "machine learning",
      "DevOps",
      "agile",
      "kubernetes",
    ],
    openGraph: {
      title: `DevBcn ${year} - Barcelona Developers Conference in Spain — ${eventDate}`,
      description: `Home • DevBcn ${year}. The Barcelona Developer Conference in Spain`,
      url: `https://www.devbcn.com/${year}`,
      type: "website",
      locale: "en_GB",
      siteName: "devbcn.com",
    },
    twitter: {
      card: "summary_large_image",
      site: "@dev_bcn",
      creator: "@dev_bcn",
      title: `DevBcn ${year} - Barcelona Developers Conference in Spain — ${eventDate}`,
      description: `Home • DevBcn ${year}. The Barcelona Developer Conference in Spain`,
    },
    other: {
      "twitter:label1": "Date",
      "twitter:data1": eventDate,
      "twitter:label2": "Location",
      "twitter:data2": config.venue,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { year } = await params;
  const config = getEditionConfig(year);

  // Generate JSON-LD schemas
  const eventSchema = generateEventSchema(config, year);
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <Script id="event-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(eventSchema) }} />
      <Script id="organization-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }} />
      <Section1 year={year} />
      <Section2 />
      <Section3 />
      <Section4 sponsors={config.sponsorsData} />
      <Section5 year={year} />
      <Section6 />
    </>
  );
}
