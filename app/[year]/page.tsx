import Section1 from "@/components/sections/home8/section1";
import Section2 from "@/components/sections/home8/section2";
import Section3 from "@/components/sections/home8/section3";
import Section4 from "@/components/sections/home8/section4";
import Section5 from "@/components/sections/home8/section5";
import Section6 from "@/components/sections/home8/section6";
import { getAvailableEditions, getEditionConfig } from "@/config/editions";

interface PageProps {
  params: Promise<{
    year: string;
  }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  return years.map((year) => ({ year }));
}

export default async function Page({ params }: PageProps) {
  const { year } = await params;
  const config = getEditionConfig(year);

  return (
    <>
      <Section1 year={year} />
      <Section2 />
      <Section3 />
      <Section4 sponsors={config.sponsorsData} />
      <Section5 year={year} />
      <Section6 />
    </>
  );
}
