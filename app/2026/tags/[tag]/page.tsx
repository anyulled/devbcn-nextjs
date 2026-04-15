import PageHeader from "@/components/layout/PageHeader";
import TalkCard from "@/components/layout/TalkCard";
import CTASection from "@/components/sections/CTASection";
import { getEditionConfig } from "@/config/editions";
import { getTagsFromTalk, getTalks } from "@/hooks/useTalks";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 43200;
export const dynamicParams = false;

export async function generateStaticParams() {
  const year = "2026";
  const params = [];

  try {
    const sessionGroups = await getTalks(year);
    const allTalks = sessionGroups.flatMap((group) => group.sessions);
    const allTags = new Set<string>();

    for (const talk of allTalks) {
      getTagsFromTalk(talk).forEach((tag) => allTags.add(tag));
    }

    for (const tag of allTags) {
      params.push({ tag: tag.replaceAll(" ", "-").toLowerCase() });
    }
  } catch (error) {
    console.warn(`Failed to fetch talks for year ${year}:`, error);
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const year = "2026";
  const decodedTag = decodeURIComponent(tag);

  const sessionGroups = await getTalks(year);
  const allTalks = sessionGroups.flatMap((group) => group.sessions);
  const displayTag =
    allTalks.flatMap(getTagsFromTalk).find((t) => t.replaceAll(" ", "-").toLowerCase() === decodedTag.toLowerCase()) ?? decodedTag.replaceAll("-", " ");

  return {
    title: `Talks tagged "${displayTag}" - DevBcn ${year}`,
    description: `Browse all sessions tagged with ${displayTag} at DevBcn ${year}`,
  };
}

export default async function Page({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const year = "2026";
  const decodedTag = decodeURIComponent(tag);
  const eventData = getEditionConfig(year);

  const sessionGroups = await getTalks(year);
  const allTalks = sessionGroups.flatMap((group) => group.sessions);

  const displayTag =
    allTalks.flatMap(getTagsFromTalk).find((t) => t.replaceAll(" ", "-").toLowerCase() === decodedTag.toLowerCase()) ?? decodedTag.replaceAll("-", " ");

  const filteredTalks = allTalks.filter((talk) => {
    const talkTags = getTagsFromTalk(talk);

    return talkTags.some((t) => t.replaceAll(" ", "-").toLowerCase() === decodedTag.toLowerCase());
  });

  if (filteredTalks.length === 0) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <PageHeader breadcrumbText={`Talks tagged "${displayTag}"`} backgroundImageId={6} title={displayTag} />

      {/* Talks List */}
      <div className="case-study-elements-area sp1">
        <div className="container">
          <div className="row">
            {filteredTalks.map((talk) => (
              <div key={talk.id} className="col-lg-4 col-md-6 mb-4">
                <TalkCard talk={talk} year={year} />
              </div>
            ))}
          </div>
          {filteredTalks.length === 0 && (
            <div className="text-center">
              <p>No talks found for this tag.</p>
              <div className="space24" />
              <Link href={`/${year}/talks`} className="vl-btn1">
                Browse all talks
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
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
