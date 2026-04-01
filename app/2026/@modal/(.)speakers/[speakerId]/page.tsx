import ArchivePage from "@/app/[year]/@modal/(.)speakers/[speakerId]/page";

export default async function Page({ params }: { params: Promise<{ speakerId: string }> }) {
  const { speakerId } = await params;
  return ArchivePage({ params: Promise.resolve({ year: "2026", speakerId }) });
}
