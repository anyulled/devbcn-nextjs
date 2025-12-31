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
    main: [
      { label: "About Us", href: "/about-us", requiresYear: false },
      { label: "Code of Conduct", href: "/code-of-conduct", requiresYear: false },
      { label: "Travel", href: "/travel", requiresYear: false }, // assuming global travel page or check if it needs year
    ],
    yearSpecific: [
      { label: "Speakers", href: "/2026/speakers", requiresYear: false, condition: "hasSpeakers" },
      { label: "Talks", href: "/2026/talks", requiresYear: false, condition: "hasTalks" },
      { label: "Schedule", href: "/2026/schedule", requiresYear: false, condition: "hasSchedule" },
    ],
    news: [
      { label: "CFP", href: "/2026/cfp", requiresYear: false, condition: "hasCfp" },
      { label: "Sponsorship", href: "/sponsorship", requiresYear: true },
      { label: "Diversity", href: "/2026/diversity", requiresYear: false, condition: "hasDiversity" },
      { label: "Job Offers", href: "/2026/job-offers", requiresYear: false, condition: "hasJobOffers" },
    ],
  },
  email: "info@devbcn.com",
  venue: {
    name: "World Trade Center, Barcelona",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=World+Trade+Center+Barcelona",
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

  brochure: "https://drive.google.com/file/d/1gl8rGHr5puw9-bbBV1I3LEm7N-GmrxHq/view?usp=sharing",
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
    regular: [],
    basic: [],
    communities: [],
    media_partners: [],
    supporters: [],
  },
};
