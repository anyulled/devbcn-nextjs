import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/home8/section1";
import Section2 from "@/components/sections/home8/section2";
import Section3 from "@/components/sections/home8/section3";
import Section4 from "@/components/sections/home8/section4";
import Section5 from "@/components/sections/home8/section5";
import Section6 from "@/components/sections/home8/section6";
import { getRandomSpeakers, getSpeakers } from "@/hooks/useSpeakers";

export default async function Home8() {
  const allSpeakers = await getSpeakers("2026");
  const randomSpeakers = getRandomSpeakers(allSpeakers, 6);
  const totalSpeakers = allSpeakers.length;

  return (
    <Layout headerStyle={8} footerStyle={8}>
      <Section1 year="2026" />
      <Section2 eventDate={new Date().toISOString()} showCountdown={false} />
      <Section3 />
      <Section4
        sponsors={{ top: [], premium: [], regular: [], basic: [], communities: [], media_partners: [], supporters: [] }}
        eventVenue={{
          name: "World Trade Center Barcelona",
          mapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.0089347896845!2d2.1750847!3d41.3755825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f7c8f7c8f7%3A0x7c8f7c8f7c8f7c8f!2sWorld%20Trade%20Center%20Barcelona!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses",
        }}
      />
      <Section5 year={"2026"} speakers={randomSpeakers} totalSpeakers={totalSpeakers} />
      <Section6
        eventDate={new Date().toISOString()}
        eventVenue={{
          name: "World Trade Center Barcelona",
          mapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.0089347896845!2d2.1750847!3d41.3755825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f7c8f7c8f7%3A0x7c8f7c8f7c8f7c8f!2sWorld%20Trade%20Center%20Barcelona!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses",
        }}
      />
    </Layout>
  );
}
