import { newsDropdownLinks } from "../navigation";
import type { EditionNavigation, Sponsor, Sponsors } from "./types";

export interface PlannedEditionConfig {
  edition: string;
  title: string;
  hideSpeakers: boolean;
  hideTalks: boolean;
  venue: { name: string; mapUrl: string };
  navigation: EditionNavigation;
  hero: { mobileVideo: string; desktopVideo: string; fallbackImage: string };
  sponsorsData: Sponsors;
  diversity: { sponsors: Sponsor[] };
}

export const edition2027: PlannedEditionConfig = {
  edition: "2027",
  title: "DevBcn 2027 - Barcelona Developers Conference",
  hideSpeakers: true,
  hideTalks: true,
  venue: {
    name: "World Trade Center, Barcelona",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.0089347896845!2d2.1750847!3d41.3755825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f7c8f7c8f7%3A0x7c8f7c8f7c8f!2sWorld%20Trade%20Center%20Barcelona!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses",
  },
  navigation: {
    main: [{ label: "Sponsors", href: "#sponsors", requiresYear: true }],
    yearSpecific: [],
    news: newsDropdownLinks.filter((link) => !link.requiresYear),
  },
  hero: {
    mobileVideo: "/assets/video/devbcn-2027-hero-360.mp4",
    desktopVideo: "/assets/video/devbcn-2027-hero-720.mp4",
    fallbackImage: "/assets/img/all-images/venue/wtc-gemini-2.webp",
  },
  sponsorsData: {
    top: [],
    premium: [],
    regular: [],
    communities: [],
    basic: [],
    media_partners: [],
    supporters: [],
  },
  diversity: { sponsors: [] },
};
