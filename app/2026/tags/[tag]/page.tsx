import ArchivePage, { generateMetadata as generateArchiveMetadata, generateStaticParams as generateArchiveStaticParams } from "@/app/[year]/tags/[tag]/page";

export const revalidate = 43200;

export async function generateStaticParams() {
  const params = await generateArchiveStaticParams();
  return params.filter((param) => param.year === "2026").map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  return generateArchiveMetadata({ params: Promise.resolve({ year: "2026", tag }) });
}

export default async function Page({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  return ArchivePage({ params: Promise.resolve({ year: "2026", tag }) });
}
