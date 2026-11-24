import { mainNavLinks, newsDropdownLinks, yearSpecificNavLinks } from "../navigation";
import { EditionConfig, HeroConfig } from "./types";

/**
 * DevBcn 2027 Edition Configuration
 */
export const edition2027: EditionConfig & { hero: HeroConfig } = {
  edition: "2027",
  title: "DevBcn - Barcelona Developers Conference ",
  navigation: {
    main: mainNavLinks,
    yearSpecific: yearSpecificNavLinks,
    news: newsDropdownLinks,
  },
  email: "info@devbcn.com",
  venue: {
    name: "World Trade Center, Barcelona",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.0089347896845!2d2.1750847!3d41.3755825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f7c8f7c8f7%3A0x7c8f7c8f7c8f7c8f!2sWorld%20Trade%20Center%20Barcelona!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses",
  },
  trackNumber: 5,
  tracks:
    "Java & JVM | Cloud, DevOps, VMs, Kubernetes | Frontend, JavaScript, TypeScript, Angular, WASM | Leadership, Agile, Diversity | Big Data, Machine Learning, AI, Python",

  event: {
    startDay: new Date("2027-07-06T08:00:00+01:00"),
    endDay: new Date("2027-07-07T19:00:00+01:00"),
  },

  actionButtons: true,
  showCountdown: true,
  showInfoButtons: false,
  hideSpeakers: true,
  hideTalks: true,
  diversity: {
    sponsors: [],
    applicationForm: "TBD",
  },

  carrousel: { enabled: false },
  schedule: { enabled: false },
  jobOffers: { enabled: false },

  cfp: {
    startDay: new Date("2027-01-01T00:00:00+01:00"),
    endDay: new Date("2027-03-01T00:00:00+01:00"),
    link: "https://sessionize.com/devbcn-2027/?e=f455b8",
  },

  tickets: {
    startDay: new Date("2027-02-01T00:00:00+01:00"),
    endDay: new Date("2027-06-30T23:59:59+01:00"),
    url: "https://tickets.devbcn.com/event/devbcn-2027",
    categories: [
      { name: "Blind", price: "300€", startDate: new Date("2027-02-01T00:00:00+01:00"), endDate: new Date("2027-02-28T23:59:59+01:00") },
      { name: "Early Bird", price: "370€", startDate: new Date("2027-03-01T00:00:00+01:00"), endDate: new Date("2027-03-31T23:59:59+01:00") },
      { name: "Regular", price: "440€", startDate: new Date("2027-04-01T00:00:00+01:00"), endDate: new Date("2027-04-30T23:59:59+01:00") },
      { name: "Late", price: "600€", startDate: new Date("2027-05-01T00:00:00+01:00"), endDate: new Date("2027-05-14T23:59:59+01:00") },
      { name: "Last Minute", price: "700€", startDate: new Date("2027-05-15T00:00:00+01:00"), endDate: new Date("2027-05-31T23:59:59+01:00") },
      { name: "Super Last Minute", price: "800€", startDate: new Date("2027-06-01T00:00:00+01:00"), endDate: new Date("2027-06-30T23:59:59+01:00") },
    ],
  },

  sponsors: {
    startDate: new Date("2026-12-01T09:00:00+01:00"),
    endDate: new Date("2027-07-08T09:00:00+01:00"),
  },

  brochure: "",
  sessionizeUrl: "",
  openFeedbackId: "devbcn27",

  socialLinks: {
    twitter: "https://twitter.com/dev_bcn",
    linkedin: "https://www.linkedin.com/company/devbcn",
    facebook: "https://facebook.com/devbcn",
    youtube: "https://www.youtube.com/dev_bcn",
    flickr: "https://flickr.com/devbcn",
    github: "https://github.com/devbcn",
    instagram: "https://www.instagram.com/devbcn.conf/",
    bluesky: "https://bsky.app/profile/devbcn.bsky.social",
  },
  hero: {
    mobileVideo: "/assets/video/devbcn-2027-hero-360.mp4",
    desktopVideo: "/assets/video/devbcn-2027-hero-1080.mp4",
    fallbackImage: "/assets/img/all-images/venue/wtc-gemini-2.webp",
  },
  sponsorsData: {
    top: [],
    premium: [],
    regular: [],
    basic: [],
    communities: [],
    media_partners: [],
    supporters: [],
  },
};
