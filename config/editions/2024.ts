import { EditionConfig } from "./types";

/**
 * DevBcn 2024 Edition Configuration
 *
 * Based on 2024.json from the previous website.
 */
export const edition2024: EditionConfig = {
  edition: "2024",
  title: "DevBcn - Barcelona Developers Conference ",
  email: "info@devbcn.com",
  venue: "La Farga, Hospitalet de Llobregat",
  trackNumber: 5,
  tracks:
    "Java & JVM | Cloud, DevOps, VMs, Kubernetes | Frontend, JavaScript, TypeScript, Angular, WASM | Leadership, Agile, Diversity | Big Data, Machine Learning, AI, Python",

  event: {
    startDay: new Date("2024-06-13T09:00:00"),
    endDay: new Date("2024-06-14T14:00:00"),
  },

  actionButtons: false,
  showCountdown: false,
  showInfoButtons: true,
  hideSpeakers: false,
  hideTalks: false,
  diversity: true,

  carrousel: { enabled: true },
  schedule: { enabled: true },
  jobOffers: { enabled: true },

  cfp: {
    startDay: new Date("2024-01-01T00:00:00"),
    endDay: new Date("2024-04-01T00:00:00"),
    link: "https://sessionize.com/devbcn-2024/",
  },

  tickets: {
    startDay: new Date("2024-01-01T00:00:00"),
    endDay: new Date("2024-06-01T00:00:00"),
    url: "",
  },

  sponsors: {
    startDate: new Date("2023-12-01T09:00:00"),
    endDate: new Date("2024-05-13T09:00:00"),
  },

  brochure: "https://bit.ly/devbcn25-brochure-v3",
  sessionizeUrl: "https://sessionize.com/api/v2/teq4asez",
  openFeedbackId: "devbcn24",

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
