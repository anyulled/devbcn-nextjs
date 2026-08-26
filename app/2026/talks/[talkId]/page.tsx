import ArchivePage, { generateMetadata as generateArchiveMetadata } from "@/app/[year]/talks/[talkId]/page";
import { getTalks } from "@/hooks/useTalks";

export async function generateStaticParams() {
  const sessionGroups = await getTalks("2026");
  const talks = sessionGroups.flatMap((group) => group.sessions);

  return talks.map(({ id }) => ({ talkId: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ talkId: string }> }) {
  const { talkId } = await params;
  return generateArchiveMetadata({ params: Promise.resolve({ year: "2026", talkId }) });
}

export default async function Page({ params }: { params: Promise<{ talkId: string }> }) {
  const { talkId } = await params;
  return ArchivePage({ params: Promise.resolve({ year: "2026", talkId }) });
}
