import Script from "next/script";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getArchivedEditions, getEditionConfig } from "@/config/editions";
import { Speaker } from "@/hooks/types";
import { getSpeakerByYearAndId, getSpeakers } from "@/hooks/useSpeakers";
import { generateBreadcrumbSchema, generateItemListSchema, generatePersonSchema, serializeJsonLd } from "@/lib/shared/jsonld";

import SpeakerContent from "@/components/speakers/SpeakerContent";

export const dynamicParams = false;

interface SpeakerDetailProps {
  params: Promise<{
    year: string;
    speakerId: string;
  }>;
}

export async function generateStaticParams() {
  const years = getArchivedEditions();

  const yearParams = await Promise.all(
    years.map(async (year) => {
      try {
        const speakers = await getSpeakers(year);
        return speakers.map((speaker) => ({
          year,
          speakerId: speaker.id,
        }));
      } catch (error) {
        console.warn(`Failed to fetch speakers for year ${year}:`, error);
        return [];
      }
    })
  );

  return yearParams.flat();
}

export async function generateMetadata({ params }: SpeakerDetailProps): Promise<Metadata> {
  const { year, speakerId } = await params;
  const speaker = await getSpeakerByYearAndId(year, speakerId);

  if (!speaker) {
    return {
      title: "Speaker Not Found",
      description: "The requested speaker could not be found.",
    };
  }

  const sessionCount = speaker.sessions.length;
  const sessionsText = sessionCount === 1 ? "1 session" : `${sessionCount} sessions`;
  const bioPreview = speaker.bio.length > 150 ? `${speaker.bio.substring(0, 150)}...` : speaker.bio;

  return {
    title: `${speaker.fullName} - DevBcn ${year} Speaker`,
    description: `${speaker.tagLine}. ${speaker.fullName} is speaking at DevBcn ${year} with ${sessionsText}. ${bioPreview}`,
    keywords: [speaker.fullName, `DevBcn ${year}`, "conference speaker", "tech speaker", speaker.tagLine, "barcelona developer conference"],
    openGraph: {
      title: `${speaker.fullName} - DevBcn ${year} Speaker`,
      description: `${speaker.tagLine}. Speaking at DevBcn ${year} with ${sessionsText}.`,
      url: `https://www.devbcn.com/${year}/speakers/${speakerId}`,
      type: "profile",
      locale: "en_GB",
      siteName: "devbcn.com",
    },
    twitter: {
      card: "summary_large_image",
      site: "@dev_bcn",
      creator: "@dev_bcn",
      title: `${speaker.fullName} - DevBcn ${year}`,
      description: `${speaker.tagLine}. Speaking at DevBcn ${year}.`,
    },
  };
}

const generateJsonSchema = (speaker: Speaker, year: string) => {
  const baseUrl = "https://www.devbcn.com";
  const personSchema = generatePersonSchema(speaker, year);
  const sessionsListSchema =
    speaker.sessions.length > 0
      ? generateItemListSchema(
          speaker.sessions.map((session) => ({
            name: session.name,
            url: `${baseUrl}/${year}/talks/${session.id}`,
          })),
          `Sessions by ${speaker.fullName}`
        )
      : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `${baseUrl}/${year}` },
    { name: "Speakers", url: `${baseUrl}/${year}/speakers` },
    { name: speaker.fullName, url: `${baseUrl}/${year}/speakers/${speaker.id}` },
  ]);
  return { personSchema, sessionsListSchema, breadcrumbSchema };
};

export default async function SpeakerDetail({ params }: SpeakerDetailProps) {
  const { year, speakerId } = await params;
  const speaker = await getSpeakerByYearAndId(year, speakerId);
  const eventData = getEditionConfig(year);

  if (!speaker) {
    notFound();
  }

  const { personSchema, sessionsListSchema, breadcrumbSchema } = generateJsonSchema(speaker, year);

  return (
    <div>
      <Script id="speaker-person-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(personSchema) }} />
      {sessionsListSchema && (
        <Script id="speaker-sessions-list-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(sessionsListSchema) }} />
      )}
      <Script id="speaker-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />

      {/* Reusable Speaker Content */}
      <SpeakerContent speaker={speaker} year={year} eventData={eventData} />
    </div>
  );
}
