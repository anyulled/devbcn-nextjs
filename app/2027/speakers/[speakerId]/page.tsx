import ArchivePage, { generateMetadata as generateArchiveMetadata } from "@/app/[year]/speakers/[speakerId]/page";
import { getSpeakers } from "@/hooks/useSpeakers";

export async function generateStaticParams() {
  const speakers = await getSpeakers("2027");
  if (speakers.length === 0) {
    return [{ speakerId: "__placeholder__" }];
  }
  return speakers.map(({ id }) => ({ speakerId: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ speakerId: string }> }) {
  const { speakerId } = await params;
  return generateArchiveMetadata({ params: Promise.resolve({ year: "2027", speakerId }) });
}

export default async function Page({ params }: { params: Promise<{ speakerId: string }> }) {
  const { speakerId } = await params;
  return ArchivePage({ params: Promise.resolve({ year: "2027", speakerId }) });
}
