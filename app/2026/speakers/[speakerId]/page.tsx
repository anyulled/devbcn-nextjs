import ArchivePage, {
  generateMetadata as generateArchiveMetadata,
  generateStaticParams as generateArchiveStaticParams,
} from "@/app/[year]/speakers/[speakerId]/page";

export const revalidate = 43200;
export const dynamicParams = false;

export async function generateStaticParams() {
  const params = await generateArchiveStaticParams();
  return params.filter((param) => param.year === "2026").map(({ speakerId }) => ({ speakerId }));
}

export async function generateMetadata({ params }: { params: Promise<{ speakerId: string }> }) {
  const { speakerId } = await params;
  return generateArchiveMetadata({ params: Promise.resolve({ year: "2026", speakerId }) });
}

export default async function Page({ params }: { params: Promise<{ speakerId: string }> }) {
  const { speakerId } = await params;
  return ArchivePage({ params: Promise.resolve({ year: "2026", speakerId }) });
}
