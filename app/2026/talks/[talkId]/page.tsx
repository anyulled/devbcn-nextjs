import ArchivePage, { generateMetadata as generateArchiveMetadata } from "@/app/[year]/talks/[talkId]/page";
import { getTalks } from "@/hooks/useTalks";

export const revalidate = 43200;
export const dynamicParams = false;

export async function generateStaticParams() {
  const sessionGroups = await getTalks("2026");
  const params = [];

  for (const group of sessionGroups) {
    for (const talk of group.sessions) {
      params.push({ talkId: talk.id });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ talkId: string }> }) {
  const { talkId } = await params;
  return generateArchiveMetadata({ params: Promise.resolve({ year: "2026", talkId }) });
}

export default async function Page({ params }: { params: Promise<{ talkId: string }> }) {
  const { talkId } = await params;
  return ArchivePage({ params: Promise.resolve({ year: "2026", talkId }) });
}
