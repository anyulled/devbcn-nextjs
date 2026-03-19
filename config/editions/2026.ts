import { mainNavLinks, newsDropdownLinks, yearSpecificNavLinks } from "../navigation";
import { EditionConfig } from "./types";

/**
 * DevBcn 2026 Edition Configuration
 *
 * Based on 2026.json from the previous website.
 * Current/upcoming edition.
 */
export const edition2026: EditionConfig = {
  edition: "2026",
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
    startDay: new Date("2026-06-16T08:00:00+01:00"),
    endDay: new Date("2026-06-17T19:00:00+01:00"),
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
    startDay: new Date("2026-01-01T00:00:00+01:00"),
    endDay: new Date("2026-03-01T00:00:00+01:00"),
    link: "https://sessionize.com/devbcn26/",
  },

  tickets: {
    startDay: new Date("2026-02-01T00:00:00+01:00"),
    endDay: new Date("2026-06-17T00:00:00+01:00"),
    url: "https://tickets.devbcn.com/event/devbcn-2026",
  },

  sponsors: {
    startDate: new Date("2025-12-01T09:00:00+01:00"),
    endDate: new Date("2026-06-18T09:00:00+01:00"),
  },

  brochure: "https://bit.ly/brochure-devbcn2026-v1",
  sessionizeUrl: "https://sessionize.com/api/v2/prcjw6ue/",
  openFeedbackId: "devbcn26",

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
  sponsorsData: {
    top: [],
    premium: [],
    regular: [
      {
        name: "Caixabank Tech",
        website: "https://www.caixabanktech.com/es/pagina-de-inicio/",
        image: "/assets/img/all-images/sponsors/caixabank-tech.png",
      },
      {
        name: "Elastic",
        image: "/assets/img/all-images/sponsors/logo-elastic-horizontal-color.png",
        website: "https://www.elastic.co/",
      },
    ],
    basic: [
      {
        name: "MAMBU",
        website: "https://www.mambu.com/en",
        image: "/assets/img/all-images/sponsors/mambu.png",
      },
    ],
    communities: [],
    media_partners: [],
    supporters: [],
  },
};
