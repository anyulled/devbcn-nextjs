import ArchivePage, {
  generateMetadata as generateArchiveMetadata,
  generateStaticParams as generateArchiveStaticParams,
} from "@/app/[year]/talks/[talkId]/page";

export const revalidate = 43200;
export const dynamicParams = false;

export async function generateStaticParams() {
  const params = await generateArchiveStaticParams();
  return params.filter((param) => param.year === "2026").map(({ talkId }) => ({ talkId }));
}

export async function generateMetadata({ params }: { params: Promise<{ talkId: string }> }) {
  const { talkId } = await params;
  return generateArchiveMetadata({ params: Promise.resolve({ year: "2026", talkId }) });
}

export default async function Page({ params }: { params: Promise<{ talkId: string }> }) {
  const { talkId } = await params;
  return ArchivePage({ params: Promise.resolve({ year: "2026", talkId }) });
}
