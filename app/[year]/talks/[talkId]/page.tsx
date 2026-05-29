export const dynamicParams = false;

import CTASection from "@/components/sections/CTASection";
import RelatedTalks from "@/components/talks/RelatedTalks";
import TalkContent from "@/components/talks/TalkContent";
import { getArchivedEditions, getEditionConfig } from "@/config/editions";
import { Speaker } from "@/hooks/types";
import {
  getLevelFromTalk,
  getRelatedTalksByTrack,
  getSlidesUrl,
  getTagsFromTalk,
  getTalkByYearAndId,
  getTalks,
  getTalkSpeakersWithDetails,
  getTrackFromTalk,
} from "@/hooks/useTalks";
import { generateBreadcrumbSchema, generateEducationEventSchema, generatePersonSchema, serializeJsonLd } from "@/lib/shared/jsonld";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

interface TalkDetailProps {
  params: Promise<{
    year: string;
    talkId: string;
  }>;
}

export async function generateStaticParams() {
  const years = getArchivedEditions();

  const nestedParams = await Promise.all(
    years.map(async (year) => {
      try {
        const sessionGroups = await getTalks(year);
        const allTalks = sessionGroups.flatMap((group) => group.sessions);
        return allTalks.map((talk) => ({ year, talkId: talk.id }));
      } catch (error) {
        console.warn(`Failed to fetch talks for year ${year}:`, error);
        return [];
      }
    })
  );

  return nestedParams.flat();
}

export async function generateMetadata({ params }: TalkDetailProps): Promise<Metadata> {
  const { year, talkId } = await params;
  const talk = await getTalkByYearAndId(year, talkId);

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
      url: `https://www.devbcn.com/${year}/talks/${talkId}`,
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

export default async function TalkDetail({ params }: Readonly<TalkDetailProps>) {
  const { year, talkId } = await params;
  const talk = await getTalkByYearAndId(year, talkId);
  const eventData = getEditionConfig(year);

  if (!talk) {
    notFound();
  }

  const speakerIds = talk.speakers.map((s) => s.id);
  const speakers = await getTalkSpeakersWithDetails(year, speakerIds);
  const track = getTrackFromTalk(talk);
  const level = getLevelFromTalk(talk);
  const relatedTalks = await getRelatedTalksByTrack(year, track, talk.id, 5);

  const relatedTalksSpeakers: Map<string, Speaker[]> = new Map();
  await Promise.all(
    relatedTalks.map(async (relatedTalk) => {
      const relSpeakerIds = relatedTalk.speakers.map((s) => s.id);
      const relSpeakers = await getTalkSpeakersWithDetails(year, relSpeakerIds);
      relatedTalksSpeakers.set(relatedTalk.id, relSpeakers);
    })
  );

  const tags = getTagsFromTalk(talk);
  const slidesUrl = getSlidesUrl(talk);
  const voteUrl = `https://openfeedback.io/${talk.id}`;

  const baseUrl = "https://www.devbcn.com";
  const educationEventSchema = generateEducationEventSchema(talk, year, eventData.venue);
  const speakerSchemas = speakers.map((speaker) => ({
    speakerId: speaker.id,
    schema: generatePersonSchema(speaker, year),
  }));
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `${baseUrl}/${year}` },
    { name: "Talks", url: `${baseUrl}/${year}/talks` },
    { name: talk.title, url: `${baseUrl}/${year}/talks/${talk.id}` },
  ]);

  return (
    <div>
      <Script id="talk-education-event-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(educationEventSchema) }} />
      {speakerSchemas.map(({ speakerId, schema }) => (
        <Script
          key={`speaker-${speakerId}`}
          id={`talk-speaker-${speakerId}-jsonld`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}
      <Script id="talk-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />

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
