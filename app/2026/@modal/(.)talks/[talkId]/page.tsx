import ArchivePage from "@/app/[year]/@modal/(.)talks/[talkId]/page";

export default async function Page({ params }: { params: Promise<{ talkId: string }> }) {
  const { talkId } = await params;
  return ArchivePage({ params: Promise.resolve({ year: "2026", talkId }) });
}
