import Section2027 from "@/components/sections/home8/section2027";
import Home2027Content from "@/components/sections/home8/Home2027Content";
import { formatEventDateRange } from "@/config/editions";
import { edition2027 } from "@/config/editions/2027";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevBcn 2027 - Barcelona Developers Conference",
  description: `DevBcn returns to Barcelona on ${formatEventDateRange(edition2027.event.startDay, edition2027.event.endDay)}.`,
};

export default function Page() {
  return (
    <main className="home-2027">
      <Section2027 />
      <Home2027Content />
    </main>
  );
}
