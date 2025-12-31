import { EditionConfig } from "./types";

/**
 * DevBcn 2025 Edition Configuration
 *
 * Based on 2025.json from the previous website.
 */
export const edition2025: EditionConfig = {
  edition: "2025",
  title: "DevBcn - Barcelona Developers Conference ",
  navigation: {
    main: [
      { label: "About Us", href: "/about-us", requiresYear: false },
      { label: "Code of Conduct", href: "/code-of-conduct", requiresYear: false },
      { label: "Travel", href: "/travel", requiresYear: false },
    ],
    yearSpecific: [
      { label: "Speakers", href: "/2025/speakers", requiresYear: false, condition: "hasSpeakers" },
      { label: "Talks", href: "/2025/talks", requiresYear: false, condition: "hasTalks" },
      { label: "Schedule", href: "/2025/schedule", requiresYear: false, condition: "hasSchedule" },
    ],
    news: [
      { label: "CFP", href: "/2025/cfp", requiresYear: false, condition: "hasCfp" },
      { label: "Sponsorship", href: "/sponsorship", requiresYear: false },
      { label: "Diversity", href: "/2025/diversity", requiresYear: false, condition: "hasDiversity" },
      { label: "Job Offers", href: "/2025/job-offers", requiresYear: false, condition: "hasJobOffers" },
    ],
  },
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
  diversity: {
    sponsors: [
      {
        name: "NUBANK",
        website: "https://nubank.com.br/",
        image: "/assets/img/all-images/sponsors/datomic.svg",
      },
    ],
    applicationForm: "https://docs.google.com/forms/d/e/1FAIpQLSeX6",
  },

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
  sponsorsData: {
    top: [],
    premium: [
      {
        name: "Dynatrace",
        image: "/assets/img/all-images/sponsors/dynatrace.png",
        website: "https://www.dynatrace.com/",
      },
    ],
    regular: [
      {
        name: "Caixabank Tech",
        website: "https://www.caixabanktech.com/es/pagina-de-inicio/",
        image: "/assets/img/all-images/sponsors/caixabank-tech.png",
      },
      {
        name: "Sopra Steria",
        image: "/assets/img/all-images/sponsors/sopra.png",
        website: "https://www.soprasteria.es/",
      },
      {
        name: "Elastic",
        image: "/assets/img/all-images/sponsors/logo-elastic-horizontal-color.png",
        website: "https://www.elastic.co/",
      },
      {
        name: "Manychat",
        website: "https://careers.manychat.com/",
        image: "/assets/img/all-images/sponsors/logo-manychat.webp",
      },
      {
        name: "Snowflake",
        website: "https://www.snowflake.com/en/developers/",
        image: "/assets/img/all-images/sponsors/logo-snowflake.png",
      },
      {
        name: "Clever Cloud",
        image: "/assets/img/all-images/sponsors/clever-cloud.png",
        website: "https://www.clever-cloud.com/",
      },
      {
        name: "Vonage",
        website: "https://vonage.dev/DevBcn",
        image: "/assets/img/all-images/sponsors/vonage.jpg",
      },
      {
        name: "NUBANK",
        image: "/assets/img/all-images/sponsors/datomic.svg",
        website: "https://nubank.com.br/",
      },
    ],
    basic: [
      {
        name: "Seidor",
        website: "https://www.opentrends.net/en",
        image: "/assets/img/all-images/sponsors/seidor.png",
      },
      {
        name: "Grupo Castilla",
        image: "/assets/img/all-images/sponsors/grupo-castilla.png",
        website: "https://www.grupocastilla.es/servicios-rrhh/consultoria-tecnologica/",
      },
      {
        name: "FOR GOOD AI",
        website: "https://zencoder.ai/",
        image: "/assets/img/all-images/sponsors/zencoder.png",
      },
      {
        name: "ORTUS SOLUTIONS",
        website: "https://boxlang.io/",
        image: "/assets/img/all-images/sponsors/boxlang.png",
      },
      {
        name: "Preply",
        website: "https://preply.com/en/careers",
        image: "/assets/img/all-images/sponsors/preply.svg",
      },
      {
        name: "Dow Jones",
        image: "/assets/img/all-images/sponsors/dow-jones.png",
        website: "https://www.dowjones.com/",
      },
      {
        name: "Azul",
        image: "/assets/img/all-images/sponsors/azul.png",
        website: "https://www.azul.com",
      },
      {
        name: "Glovo",
        website: "https://jobs.glovoapp.com/departments/engineering-2/?d=engineering&l=barcelona-hq",
        image: "/assets/img/all-images/sponsors/glovo.png",
      },
    ],
    communities: [
      {
        name: "Step4ward",
        image: "/assets/img/all-images/sponsors/step4ward.png",
        website: "https://bit.ly/step4wardhome",
      },
      {
        name: "Migracode Barcelona",
        image: "/assets/img/all-images/sponsors/migracode.jpg",
        website: "https://www.migracode.org/",
      },
      {
        name: "CodeWomen+",
        image: "/assets/img/all-images/sponsors/codewomen.png",
        website: "https://codewomen.plus/",
      },
    ],
    media_partners: [
      {
        name: "Digital Expert Online",
        website: "https://digital-expert.online/en/",
        image: "/assets/img/all-images/sponsors/logo-digital-expert.svg",
      },
      {
        name: "Kube events",
        image: "/assets/img/all-images/sponsors/kube-events.png",
        website: "https://kube.events/",
      },
      {
        name: "Kube careers",
        image: "/assets/img/all-images/sponsors/kube-career.png",
        website: "https://kube.careers/",
      },
      {
        name: "CIO Insights",
        website: "https://www.cioinsights.com/",
        image: "/assets/img/all-images/sponsors/cio-insights.png",
      },
      {
        name: "Codely",
        image: "/assets/img/all-images/sponsors/codely.png",
        website: "https://codely.com/",
      },
      {
        name: "Foojay",
        image: "/assets/img/all-images/sponsors/foojay.jpg",
        website: "https://foojay.io/",
      },
    ],
    supporters: [],
  },
};
