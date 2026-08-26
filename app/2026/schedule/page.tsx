import ArchivePage, { generateMetadata as generateArchiveMetadata } from "@/app/[year]/schedule/page";

export function generateMetadata() {
  return generateArchiveMetadata({ params: Promise.resolve({ year: "2026" }) });
}

export default function Page() {
  return ArchivePage({ params: Promise.resolve({ year: "2026" }) });
}
