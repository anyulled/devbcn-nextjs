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
  email: "info@devbcn.com",
  venue: "World Trade Center, Barcelona",
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
  diversity: false,

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

  brochure:
    "https://drive.google.com/file/d/1gl8rGHr5puw9-bbBV1I3LEm7N-GmrxHq/view?usp=sharing",
  sessionizeUrl: "",
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
};
