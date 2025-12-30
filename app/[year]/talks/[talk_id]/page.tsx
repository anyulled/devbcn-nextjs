import TalkContent from "@/components/talks/TalkContent";
import RelatedTalks from "@/components/talks/RelatedTalks";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { getAvailableEditions, getEditionConfig } from "@/config/editions";
import { Speaker } from "@/hooks/types";
import {
  getLevelFromTalk,
  getRandomRelatedTalksByTrack,
  getSlidesUrl,
  getTagsFromTalk,
  getTalkByYearAndId,
  getTalks,
  getTalkSpeakersWithDetails,
  getTrackFromTalk,
} from "@/hooks/useTalks";
import { generateBreadcrumbSchema, generateEducationEventSchema, generatePersonSchema, serializeJsonLd } from "@/lib/utils/jsonld";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

// ISR: Revalidate every 6 hours to keep talk data fresh
export const revalidate = 21600;

interface TalkDetailProps {
  params: Promise<{
    year: string;
    talk_id: string;
  }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  const params = [];

  for (const year of years) {
    try {
      const sessionGroups = await getTalks(year);
      const allTalks = sessionGroups.flatMap((group) => group.sessions);
      for (const talk of allTalks) {
        params.push({ year, talk_id: talk.id });
      }
    } catch (error) {
      console.warn(`Failed to fetch talks for year ${year}:`, error);
    }
  }

  return params;
}

export async function generateMetadata({ params }: TalkDetailProps): Promise<Metadata> {
  const { year, talk_id } = await params;
  const talk = await getTalkByYearAndId(year, talk_id);

  if (!talk) {
    return {
      title: "Talk Not Found",
      description: "The requested talk could not be found.",
    };
  }

  const track = getTrackFromTalk(talk);
  const level = getLevelFromTalk(talk);
  const speakerNames = talk.speakers.map((s) => s.name).join(", ");
  const descriptionPreview = talk.description.length > 150 ? `${talk.description.substring(0, 150)}...` : talk.description;

  return {
    title: `${talk.title} - DevBcn ${year}`,
    description: `${descriptionPreview} Track: ${track}. Level: ${level}. By ${speakerNames}.`,
    keywords: [talk.title, `DevBcn ${year}`, track, level, ...speakerNames.split(", "), "tech talk", "conference session", "barcelona developer conference"],
    openGraph: {
      title: `${talk.title} - DevBcn ${year}`,
      description: `${descriptionPreview} By ${speakerNames}`,
      url: `https://www.devbcn.com/${year}/talks/${talk_id}`,
      type: "article",
      locale: "en_GB",
      siteName: "devbcn.com",
    },
    twitter: {
      card: "summary_large_image",
      site: "@dev_bcn",
      creator: "@dev_bcn",
      title: `${talk.title} - DevBcn ${year}`,
      description: `${descriptionPreview} By ${speakerNames}`,
    },
  };
}

export default async function TalkDetail({ params }: TalkDetailProps) {
  const { year, talk_id } = await params;
  const talk = await getTalkByYearAndId(year, talk_id);
  const eventData = getEditionConfig(year);

  if (!talk) {
    notFound();
  }

  const speakerIds = talk.speakers.map((s) => s.id);
  const speakers = await getTalkSpeakersWithDetails(year, speakerIds);
  const track = getTrackFromTalk(talk);
  const level = getLevelFromTalk(talk);
  const relatedTalks = await getRandomRelatedTalksByTrack(year, track, talk.id, 3);

  // Get speakers for related talks
  const relatedTalksSpeakers: Map<string, Speaker[]> = new Map();
  for (const relatedTalk of relatedTalks) {
    const relSpeakerIds = relatedTalk.speakers.map((s) => s.id);
    const relSpeakers = await getTalkSpeakersWithDetails(year, relSpeakerIds);
    relatedTalksSpeakers.set(relatedTalk.id, relSpeakers);
  }

  const tags = getTagsFromTalk(talk);
  const slidesUrl = getSlidesUrl(talk);
  const voteUrl = `https://openfeedback.io/${talk.id}`;

  // Generate JSON-LD schemas
  const baseUrl = "https://www.devbcn.com";
  const educationEventSchema = generateEducationEventSchema(talk, year, eventData.venue);
  const speakerSchemas = speakers.map((speaker) => generatePersonSchema(speaker, year));
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `${baseUrl}/${year}` },
    { name: "Talks", url: `${baseUrl}/${year}/talks` },
    { name: talk.title, url: `${baseUrl}/${year}/talks/${talk.id}` },
  ]);

  return (
    <div>
      <Script id="talk-education-event-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(educationEventSchema) }} />
      {speakerSchemas.map((schema, idx) => (
        <Script
          key={`speaker-${idx}`}
          id={`talk-speaker-${idx}-jsonld`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}
      <Script id="talk-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      {/* Hero Header Section */}
      <PageHeader title={talk.title} backgroundImageId={9} breadcrumbText="Talks" />

      {/* Main Content from Reusable Component */}
      <TalkContent
        talk={talk}
        speakers={speakers}
        year={year}
        tags={tags}
        slidesUrl={slidesUrl || ""}
        voteUrl={voteUrl}
        eventData={eventData}
        track={track}
        level={level}
      />

      {/* Related Talks Section */}
      <RelatedTalks relatedTalks={relatedTalks} relatedTalksSpeakers={relatedTalksSpeakers} year={year} />

      <CTASection
        eventStartDate={eventData.event.startDay}
        eventEndDate={eventData.event.endDay}
        eventLocation={eventData.venue}
        ticketUrl={eventData.tickets.url}
        showCountdown={eventData.showCountdown}
      />
    </div>
  );
}
