import { EditionConfig } from "./types";

/**
 * DevBcn 2024 Edition Configuration
 *
 * Based on 2024.json from the previous website.
 */
export const edition2024: EditionConfig = {
  edition: "2024",
  title: "DevBcn - Barcelona Developers Conference ",
  navigation: {
    main: [
      { label: "About Us", href: "/about-us", requiresYear: false },
      { label: "Code of Conduct", href: "/code-of-conduct", requiresYear: false },
      { label: "Travel", href: "/travel", requiresYear: false },
    ],
    yearSpecific: [
      { label: "Speakers", href: "/2024/speakers", requiresYear: false, condition: "hasSpeakers" },
      { label: "Talks", href: "/2024/talks", requiresYear: false, condition: "hasTalks" },
      { label: "Schedule", href: "/2024/schedule", requiresYear: false, condition: "hasSchedule" },
      { label: "Workshops", href: "/2024/workshops", requiresYear: false },
    ],
    news: [
      { label: "CFP", href: "/2024/cfp", requiresYear: false, condition: "hasCfp" },
      { label: "KCD", href: "/kcd", requiresYear: false },
      { label: "Sponsorship", href: "/sponsorship", requiresYear: false },
      { label: "Diversity", href: "/2024/diversity", requiresYear: false, condition: "hasDiversity" },
      { label: "Job Offers", href: "/2024/job-offers", requiresYear: false, condition: "hasJobOffers" },
    ],
  },
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
  diversity: {
    sponsors: [
      {
        name: "Barcelona JUG",
        image: "/assets/img/all-images/sponsors/bcn-jug.png",
        website: "https://www.meetup.com/barcelonajug/",
      },
    ],
    applicationForm: "TBD",
  },

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
    url: "https://tickets.devbcn.com/event/devbcn-2024",
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
  sponsorsData: {
    top: [
      {
        name: "DATASTAX",
        image: "/assets/img/all-images/sponsors/datastax.png",
        website: "https://www.datastax.com/",
      },
    ],
    premium: [
      {
        name: "Allianz",
        image: "/assets/img/all-images/sponsors/allianz.png",
        website: "https://tech.allianz.com/en.html",
      },
      {
        name: "Barcelona JUG",
        image: "/assets/img/all-images/sponsors/bcn-jug.png",
        website: "https://www.meetup.com/barcelonajug/",
      },
      {
        name: "PREM.AI",
        website: "https://www.premai.io/",
        image: "/assets/img/all-images/sponsors/prem-ai.png",
      },
      {
        name: "Revolut",
        website: "https://www.revolut.com/working-at-revolut/",
        image: "/assets/img/all-images/sponsors/revolut.png",
      },
    ],
    regular: [
      {
        name: "Sopra Steria",
        image: "/assets/img/all-images/sponsors/sopra.png",
        website: "https://www.soprasteria.es/",
      },
      {
        name: "Caixabank Tech",
        website: "https://www.caixabanktech.com/es/pagina-de-inicio/",
        image: "/assets/img/all-images/sponsors/caixabank-tech.png",
      },
      {
        name: "Idealista",
        image: "/assets/img/all-images/sponsors/idealista.jpg",
        website: "https://www.idealista.com/info/trabaja-con-nosotros",
      },
      {
        name: "Clever Cloud",
        image: "/assets/img/all-images/sponsors/clever-cloud.png",
        website: "https://www.clever-cloud.com/",
      },
      {
        name: "ALTEN",
        image: "/assets/img/all-images/sponsors/alten.png",
        website: "https://www.alten.es/",
      },
      {
        name: "TIGERA",
        image: "/assets/img/all-images/sponsors/tigera.png",
        website: "https://www.tigera.io/",
      },
      {
        name: "Dynatrace",
        image: "/assets/img/all-images/sponsors/dynatrace.png",
        website: "https://www.dynatrace.com/",
      },
    ],
    basic: [
      {
        name: "Seidor",
        website: "https://www.opentrends.net/en",
        image: "/assets/img/all-images/sponsors/seidor.png",
      },
      {
        name: "Perfect Scale",
        website: "https://www.perfectscale.io/",
        image: "/assets/img/all-images/sponsors/perfect-scale.png",
      },
      {
        name: "Auth0",
        image: "/assets/img/all-images/sponsors/auth0.png",
        website: "https://okta.com/careers",
      },
      {
        name: "Barcelona Activa",
        image: "/assets/img/all-images/sponsors/barcelona-activa.png",
        website: "https://www.barcelonactiva.cat/",
      },
      {
        name: "Reevo",
        image: "/assets/img/all-images/sponsors/reevo.png",
        website: "https://www.reevo.it/",
      },
      {
        name: "GFT",
        website: "https://www.gft.com/es/es/",
        image: "/assets/img/all-images/sponsors/GFT.jpg",
      },
      {
        name: "Grupo Castilla",
        image: "/assets/img/all-images/sponsors/grupo-castilla.png",
        website: "https://www.grupocastilla.es/servicios-rrhh/consultoria-tecnologica/",
      },
      {
        name: "Axa",
        image: "/assets/img/all-images/sponsors/axa.png",
        website: "https://www.axapartners.es/es",
      },
    ],
    communities: [
      {
        name: "KCD Barcelona",
        website: "https://community.cncf.io/events/details/cncf-kcd-spain-presents-kcd-barcelona-2024/",
        image: "/assets/img/all-images/sponsors/KCD-logo-black.webp",
      },
      {
        name: "Apache Foundation",
        image: "/assets/img/all-images/sponsors/apache-foundation.jpeg",
        website: "https://www.apache.org/",
      },
      {
        name: "Eclipse Foundation",
        image: "/assets/img/all-images/sponsors/eclipse-foundation.png",
        website: "https://www.eclipse.org/",
      },
      {
        name: "Foojay",
        image: "/assets/img/all-images/sponsors/foojay.jpg",
        website: "https://foojay.io/",
      },
      {
        name: "Migracode Barcelona",
        image: "/assets/img/all-images/sponsors/migracode.jpg",
        website: "https://www.migracode.org/",
      },
      {
        name: "Step4ward",
        image: "/assets/img/all-images/sponsors/step4ward.png",
        website: "https://bit.ly/step4wardhome",
      },
    ],
    media_partners: [
      {
        name: "Kube events",
        image: "/assets/img/all-images/sponsors/kube-events.png",
        website: "https://kube.events/",
      },
      {
        name: "Kube careers",
        image: "/assets/img/all-images/sponsors/kube-career.png",
        website: "https://kube.careers//",
      },
    ],
    supporters: [
      {
        name: "BarcelonaJS",
        website: "https://barcelonajs.com/",
        image: "/assets/img/all-images/sponsors/barcelona-js.png",
      },
    ],
  },
};
