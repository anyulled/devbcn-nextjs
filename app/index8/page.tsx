import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/home8/section1";
import Section2 from "@/components/sections/home8/section2";
import Section3 from "@/components/sections/home8/section3";
import Section4 from "@/components/sections/home8/section4";
import Section5 from "@/components/sections/home8/section5";
import Section6 from "@/components/sections/home8/section6";
export default function Home8() {
  return (
    <Layout headerStyle={8} footerStyle={8}>
      <Section1 year="2026" />
      <Section2 eventDate={new Date().toISOString()} showCountdown={false} />
      <Section3 />
      <Section4 sponsors={{ top: [], premium: [], regular: [], basic: [], communities: [], media_partners: [], supporters: [] }} />
      <Section5 year={"2026"} />
      <Section6 eventDate={new Date().toISOString()} eventVenue={{ name: "World Trade Center, Barcelona", mapUrl: "https://goo.gl/maps" }} />
    </Layout>
  );
}
