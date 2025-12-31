import { EditionConfig } from "./types";

/**
 * DevBcn 2023 Edition Configuration
 *
 * Based on 2023.json from the previous website.
 */
export const edition2023: EditionConfig = {
  edition: "2023",
  title: "DevBcn - Barcelona Developers Conference ",
  navigation: {
    main: [
      { label: "About Us", href: "/about-us", requiresYear: false },
      { label: "Code of Conduct", href: "/code-of-conduct", requiresYear: false },
      { label: "Travel", href: "/travel", requiresYear: false },
    ],
    yearSpecific: [
      { label: "Speakers", href: "/2023/speakers", requiresYear: false, condition: "hasSpeakers" },
      { label: "Talks", href: "/2023/talks", requiresYear: false, condition: "hasTalks" },
      { label: "Schedule", href: "/2023/schedule", requiresYear: false, condition: "hasSchedule" },
    ],
    news: [
      { label: "CFP", href: "/2023/cfp", requiresYear: false, condition: "hasCfp" },
      { label: "Sponsorship", href: "/sponsorship", requiresYear: true },
      { label: "Diversity", href: "/2023/diversity", requiresYear: false, condition: "hasDiversity" },
      { label: "Job Offers", href: "/2023/job-offers", requiresYear: false, condition: "hasJobOffers" },
    ],
  },
  email: "info@devbcn.com",
  venue: {
    name: "La Farga, Hospitalet de Llobregat",
    mapUrl: "https://maps.app.goo.gl/2zao7ynr4wE7UYDn8",
  },
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
  diversity: {
    sponsors: [
      {
        name: "Adevinta",
        website: "https://www.adevinta.com/",
        image: "/assets/img/all-images/sponsors/adevinta.png",
      },
      {
        name: "Veepee",
        image: "/assets/img/all-images/sponsors/veepee.png",
        website: "https://www.veepee.es/gr/home/default",
      },
    ],
    applicationForm: "https://docs.google.com/forms/d/e/1FAIpQLSdyRqQkh2iRD_QxzAwodIM1cXmO_Q4hNGojXnFli-crob2QUQ/viewform",
  },

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
    url: "https://tickets.devbcn.com/event/devbcn-2023",
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

  sponsorsData: {
    top: [
      {
        name: "GFT",
        website: "https://www.gft.com/es/es/",
        image: "/assets/img/all-images/sponsors/GFT.jpg",
      },
    ],
    premium: [
      {
        name: "Barcelona JUG",
        image: "/assets/img/all-images/sponsors/bcn-jug.png",
        website: "https://www.meetup.com/barcelonajug/",
      },
      {
        name: "Adevinta",
        website: "https://www.adevinta.com/",
        image: "/assets/img/all-images/sponsors/adevinta.png",
      },
      {
        name: "Red Hat",
        website: "https://developers.redhat.com/",
        image: "/assets/img/all-images/sponsors/red-hat.png",
      },
      {
        name: "Revolut",
        website: "https://www.revolut.com/working-at-revolut/",
        image: "/assets/img/all-images/sponsors/revolut.png",
      },
    ],
    regular: [
      {
        name: "Adaptive",
        image: "/assets/img/all-images/sponsors/adaptive.png",
        website: "https://www.weareadaptive.com/",
      },
      {
        name: "Capitol",
        image: "/assets/img/all-images/sponsors/capitole.png",
        website: "https://capitole-consulting.com/es/",
      },
      {
        name: "Allianz",
        image: "/assets/img/all-images/sponsors/allianz.png",
        website: "https://careers.allianz.com/es_ES.html",
      },
      {
        name: "Sopra Steria",
        image: "/assets/img/all-images/sponsors/sopra.jpg",
        website: "https://www.soprasteria.es/",
      },
      {
        name: "Idealista",
        image: "/assets/img/all-images/sponsors/idealista.jpg",
        website: "https://www.idealista.com/info/trabaja-con-nosotros",
      },
      {
        name: "King",
        image: "/assets/img/all-images/sponsors/king.png",
        website: "https://careers.king.com/about-us/",
      },
      {
        name: "Azul",
        image: "/assets/img/all-images/sponsors/azul.png",
        website: "https://www.azul.com/?utm_medium=email&utm_campaign=20230703-SEV-DevBCN&utm_source=DevBCN&utm_content=&utm_term=",
      },
      {
        name: "Gradle",
        image: "/assets/img/all-images/sponsors/gradle.png",
        website: "https://gradle.com/",
      },
      {
        name: "CouchBase",
        website: "https://developer.couchbase.com/",
        image: "/assets/img/all-images/sponsors/couchbase.png",
      },
      {
        name: "Alten",
        image: "/assets/img/all-images/sponsors/alten.png",
        website: "https://www.alten.es",
      },
      {
        name: "New Relic",
        image: "/assets/img/all-images/sponsors/someRelic.png",
        website: "https://newrelic.com",
      },
      {
        name: "Confluent",
        website: "https://www.confluent.io/",
        image: "/assets/img/all-images/sponsors/confluent.png",
      },
    ],
    basic: [
      {
        name: "Caixabank Tech",
        website: "https://www.caixabanktech.com/es/pagina-de-inicio/",
        image: "/assets/img/all-images/sponsors/caixabank-tech.png",
      },
      {
        name: "Ocado Tech",
        website:
          "https://careers.ocadogroup.com/where-we-are/europe/development-centre-barcelona?utm_source=event&utm_medium=other&utm_campaign=ot_event_bcn_devbcn_website",
        image: "/assets/img/all-images/sponsors/ocado.png",
      },
      {
        name: "Honeypot",
        website: "https://app.honeypot.io/users/sign_up?utm_source=Live&utm_medium=sourcing&utm_campaign=event_02072023&utm_content=DevBCN",
        image: "/assets/img/all-images/sponsors/honeypot.jpg",
      },
      {
        name: "Edreams",
        image: "/assets/img/all-images/sponsors/edreams.png",
        website: "https://www.edreamsodigeo.com",
      },
      {
        name: "barcelona Activa",
        image: "/assets/img/all-images/sponsors/barcelona-activa.png",
        website: "https://www.barcelonactiva.cat/",
      },
      {
        name: "Seidor",
        website: "https://www.opentrends.net/en",
        image: "/assets/img/all-images/sponsors/seidor.png",
      },
      {
        name: "Veepee",
        image: "/assets/img/all-images/sponsors/veepee.png",
        website: "https://www.veepee.es/gr/home/default",
      },
      {
        name: "Zurich",
        website: "https://bcntdc.zurich.com/en",
        image: "/assets/img/all-images/sponsors/zurich.png",
      },
      {
        name: "Inditex",
        website: "https://www.zaratalent.com/es/tech/",
        image: "/assets/img/all-images/sponsors/inditex.png",
      },
      {
        name: "Axa",
        image: "/assets/img/all-images/sponsors/axa.png",
        website: "https://www.careers.axapartners.com/es/es",
      },
      {
        name: "Servicenow",
        image: "/assets/img/all-images/sponsors/servicenow.png",
        website: "https://www.servicenow.com/products/observability.html",
      },
    ],
    communities: [
      {
        name: "Agile Spain",
        image: "/assets/img/all-images/sponsors/agile.png",
        website: "https://agile-spain.org/",
      },
      {
        name: "step4ward",
        image: "/assets/img/all-images/sponsors/step4ward.png",
        website: "https://bit.ly/step4wardhome",
      },
      {
        name: "Apache foundation",
        image: "/assets/img/all-images/sponsors/apache-foundation.jpeg",
        website: "https://www.apache.org/",
      },
      {
        name: "Eclipse foundation",
        website: "https://www.eclipse.org/",
        image: "/assets/img/all-images/sponsors/eclipse-foundation.png",
      },
    ],
    media_partners: [
      {
        name: "Kube events",
        image: "/assets/img/all-/assets/img/all-images/sponsors/kube-events.png",
        website: "https://kube.events/",
      },
      {
        name: "Kube careers",
        image: "/assets/img/all-/assets/img/all-images/sponsors/kube-career.png",
        website: "https://kube.careers//",
      },
      {
        name: "entre devs y ops",
        image: "/assets/img/all-/assets/img/all-images/sponsors/entre-devs-y-ops.svg",
        website: "https://www.entredevyops.es/",
      },
      {
        name: "Codely",
        image: "/assets/img/all-/assets/img/all-images/sponsors/codely.png",
        website: "https://codely.com/pro/jbcnconf22",
      },
      {
        name: "CIO Insigths",
        website: "https://www.cioinsights.com/",
        image: "/assets/img/all-/assets/img/all-images/sponsors/cio.png",
      },
      {
        name: "Glorium",
        image: "/assets/img/all-/assets/img/all-images/sponsors/glorium.png",
        website: "https://gloriumtech.com/",
      },
    ],
    supporters: [
      {
        name: "Jetbrains",
        image: "/assets/img/all-images/sponsors/jetbrains.png",
        website: "https://www.jetbrains.com",
      },
      {
        name: "Madrid JUG",
        website: "https://www.meetup.com/MadridJUG",
        image: "/assets/img/all-images/sponsors/madrid-jug.png",
      },
      {
        name: "Malaga JUG",
        image: "/assets/img/all-images/sponsors/malaga-jug.png",
        website: "https://www.meetup.com/MalagaJUG",
      },
      {
        name: "PythonBCN",
        website: "https://pybcn.org/",
        image: "/assets/img/all-images/sponsors/python-bcn.png",
      },
      {
        name: "BarcelonaJS",
        website: "https://barcelonajs.com/",
        image: "/assets/img/all-images/sponsors/barcelona-js.png",
      },
    ],
  },
};
