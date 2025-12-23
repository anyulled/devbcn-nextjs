import { EditionConfig } from "./types";

/**
 * DevBcn 2025 Edition Configuration
 *
 * Based on 2025.json from the previous website.
 */
export const edition2025: EditionConfig = {
  edition: "2025",
  title: "DevBcn - Barcelona Developers Conference ",
  email: "info@devbcn.com",
  venue: "La Farga, Hospitalet de Llobregat",
  trackNumber: 5,
  tracks:
    "Java & JVM | Cloud, DevOps, VMs, Kubernetes | Frontend, JavaScript, TypeScript, Angular, WASM | Leadership, Agile, Diversity | Big Data, Machine Learning, AI, Python",

  event: {
    startDay: new Date("2025-07-08T08:00:00+01:00"),
    endDay: new Date("2025-07-10T19:00:00+01:00"),
  },

  actionButtons: false,
  showCountdown: false,
  showInfoButtons: true,
  hideSpeakers: false,
  hideTalks: false,
  diversity: false,

  carrousel: { enabled: true },
  schedule: { enabled: true },
  jobOffers: { enabled: true },

  cfp: {
    startDay: new Date("2025-01-01T00:00:00+01:00"),
    endDay: new Date("2025-03-01T00:00:00+01:00"),
    link: "https://sessionize.com/devbcn-2025/",
  },

  tickets: {
    startDay: new Date("2025-02-01T00:00:00+01:00"),
    endDay: new Date("2025-07-01T00:00:00+01:00"),
    url: "https://tickets.devbcn.com/event/devbcn-2025",
  },

  sponsors: {
    startDate: new Date("2024-01-01T09:00:00+01:00"),
    endDate: new Date("2025-07-11T09:00:00+01:00"),
  },

  brochure: "https://bit.ly/devbcn25-brochure-v3",
  sessionizeUrl: "https://sessionize.com/api/v2/xhudniix",
  openFeedbackId: "TG4hBcL7iPtV2LecVdHu",

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
};
