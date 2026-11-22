import Section2027 from "@/components/sections/home8/section2027";
import Section2027Teaser from "@/components/sections/home8/section2027-teaser";
import Section3 from "@/components/sections/home8/section3";
import Section4 from "@/components/sections/home8/section4";
import { formatEventDateRange } from "@/config/editions";
import { edition2027 } from "@/config/editions/2027";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevBcn 2027 - Barcelona Developers Conference",
  description: `DevBcn returns to Barcelona on ${formatEventDateRange(edition2027.event.startDay, edition2027.event.endDay)}.`,
};

export default function Page() {
  return (
    <>
      <Section2027 />
      <Section2027Teaser />
      <Section3 year="2027" />
      <Section4 sponsors={edition2027.sponsorsData} eventVenue={edition2027.venue} />
    </>
  );
}
