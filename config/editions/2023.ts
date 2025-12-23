import { EditionConfig } from "./types";

/**
 * DevBcn 2023 Edition Configuration
 *
 * Based on 2023.json from the previous website.
 */
export const edition2023: EditionConfig = {
  edition: "2023",
  title: "DevBcn - Barcelona Developers Conference ",
  email: "info@devbcn.com",
  venue: "La Farga, Hospitalet de Llobregat",
  trackNumber: 7,
  tracks: "Java | JVM | Go, Rust, C++, C# | Cloud, DevOps, VMs, Kubernetes | Frontend | Leadership, Agile, Diversity | Big Data, Machine Learning, AI, Python",

  event: {
    startDay: new Date("2023-07-03T09:00:00"),
    endDay: new Date("2023-07-05T14:00:00"),
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
    startDay: new Date("2022-11-01T00:00:00"),
    endDay: new Date("2023-03-15T00:00:00"),
    link: "https://sessionize.com/devbcn23/",
  },

  tickets: {
    startDay: new Date("2022-11-01T00:00:00"),
    endDay: new Date("2023-06-26T00:00:00"),
    url: "",
  },

  sponsors: {
    startDate: new Date("2022-01-01T09:00:00"),
    endDate: new Date("2023-07-13T09:00:00"),
  },

  brochure: "https://bit.ly/devbcn25-brochure-v3",
  sessionizeUrl: "https://sessionize.com/api/v2/ttsitynd",
  openFeedbackId: "devbcn-2023",

  socialLinks: {
    twitter: "https://twitter.com/dev_bcn",
    linkedin: "https://www.linkedin.com/company/devbcn",
    facebook: "https://facebook.com/devbcn",
    youtube: "https://www.youtube.com/dev_bcn",
    flickr: "https://flickr.com/devbcn",
    github: "https://github.com/devbcn",
  },
};
