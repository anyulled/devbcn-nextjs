import { Company } from "./types";

/**
 * Job Offers Data for 2026 Edition
 *
 * Normalized from the DevBcn 2026 submission form. The company submitted the same
 * position three times, so the data below keeps a single unique offer entry.
 */
export const jobOffers2026: Company[] = [
  {
    name: "Caixabank Tech",
    id: "caixabank-tech-2026",
    description:
      "Somos el motor de la transformación tecnológica del grupo CaixaBank. Desarrollamos soluciones financieras end to end con un claro objetivo: reinventar las reglas de juego a nivel tecnológico de una forma inteligente, flexible y con un impacto real en la sociedad.",
    logo: "/assets/img/all-images/sponsors/caixabank-tech.png",
    url: "https://caixabanktech.com/",
    linkedin: "https://www.linkedin.com/company/cabktech/",
    offers: [
      {
        id: "caixabank-tech-technical-solution-ia-2026",
        title: "Technical Solution IA",
        location: "Hybrid Barcelona",
        url: "https://caixabanktech.com/es/join-us-es/",
        text: `Forma parte de CaixaBank Tech, el terreno de juego en el que podrás crecer profesionalmente y dejar tu huella en el proceso de transformación digital del Grupo CaixaBank.

Responsabilidades:
Gestionar y desarrollar todo el ciclo de vida de pruebas de concepto y pilotos del uso de Inteligencia Artificial, Metaverso, blockchain, computación cuántica, etc.
Comprensión de documentación científico/técnica en inglés
Identificar entregables a desarrollar y desarrollo de documentos con calidad
Estudiar y evaluar el estado del arte de nuevas técnicas de IA sacando conclusiones y estructurando argumentaciones en base a lo analizado. Esto puede requerir leer y sintetizar artículos científicos.
Sintetizar y/o materializar lo investigado sobre, al menos, una tecnología incipiente/áreas de interacción en el formato entregable definido (de forma simple y estructurada)
Proponer casos de uso donde las nuevas técnicas de IA puedan impactar al grupo CaixaBank.
Divulgar los resultados internamente (charlas, formaciones, etc.) adaptando el lenguaje al público adecuado (en ocasiones público técnico y en otras no).

Ventajas:
A tu manera_ Encuentra el equilibrio que necesitas entre trabajo y vida personal con nuestro modelo de trabajo híbrido. Hasta un 60% de trabajo en remoto dependiendo del proyecto.
Descansa_ Podrás irte de vacaciones 27 días al año con la flexibilidad para escoger la mejor época del año para ti.
Be Tech, be healthy_ Se acabaron las excusas. Aprovéchate de nuestro programa de Wellbeing. Podrás disfrutar de descuentos en gimnasios, servicio de fisio en la oficina, torneos deportivos, fruta …
Crece_ Nuestro ADN está pensado para que puedas desarrollar todo tu potencial técnico a través de nuestras formaciones e iniciativas. Mantente siempre a la última y aprende de un equipo que te guiará en todas tus misiones.
Trabajar aquí compensa_ Saca más partido a tu nómina con el Programa de Retribución Flexible y aprovéchate de las ventajas financieras de pertenecer a un grupo bancario.`,
      },
    ],
  },
  {
    name: "Mews",
    id: "mews-2026",
    description:
      "Mews builds cloud-native software for hospitality, helping hotels and other stays move on from clunky legacy systems. We create modern tools that automate the boring stuff, make operations smoother, and improve the guest experience.",
    logo: "/assets/img/all-images/sponsors/mews.png",
    url: "https://developers.mewssystems.com",
    linkedin: "https://www.linkedin.com/company/mewsrnd",
    offers: [
      {
        id: "mews-lead-product-builder-2026",
        title: "Lead Product Builder",
        location: "Full remote",
        url: "https://www.mews.com/en/careers/jobs/4780557101?gh_jid=4780557101",
        text: `🧑🏻‍💻 About the role

At Mews, we're redefining how hospitality software is built. In our Back of House division, we've introduced a new role: Lead Product Builder.

This is for high-agency engineers who shape not just how things are built, but what gets built and why—combining technical depth, product thinking, and ownership.

You'll take end-to-end ownership of product initiatives, from problem definition to production, working across teams to deliver high-impact outcomes. You'll move fast, run experiments, and build AI-native products that improve how our customers operate.

From product-led growth and onboarding to automation, BI, and AI-powered features—you'll focus on solving real problems and shipping value.

You'll collaborate with Product and Design, but operate with strong autonomy. Beyond delivery, you'll define scalable patterns, mentor others, and help drive a culture of experimentation and AI-native development.

You bring:
7+ years in software engineering, strong product mindset, experience leading initiatives, comfort with ambiguity, and a track record of shipping.`,
      },
    ],
  },
  {
    name: "Edpuzzle",
    id: "edpuzzle-2026",
    description:
      "Edpuzzle is an educational platform that transforms videos into engaging, interactive lessons. It enables educators to integrate quizzes, student projects, and slides, providing a robust toolkit for complete learning activities while tracking student progress in detail.",
    logo: "/assets/img/all-images/sponsors/edpuzzle.svg",
    url: "https://edpuzzle.com/",
    linkedin: "https://www.linkedin.com/company/edpuzzle-inc-/",
    twitter: "https://x.com/edpuzzle",
    offers: [
      {
        id: "edpuzzle-software-engineer-2026",
        title: "Software Engineer",
        location: "Full remote",
        url: "https://jobs.lever.co/edpuzzle/f600c94a-c402-46d1-b414-c7d18dd30464",
        text: `We’re looking for our next Software Engineer to join our Product Team in Spain. The right person will help us create the best possible product for teachers and empower them to engage their students with videos. If you’re a self-starter who’s eager to contribute to the education sector, you’ll feel right at home with us.

As a Software Engineer, you’ll be responsible for working on all front-end, mobile and back-end sides of our software. You will participate in the design, creation, and maintenance of features, writing clean, functional, testable, and scalable code as well as fixing bugs or other coding issues. You will also continuously learn with the aim to be able to work on problems with increasing complexity, including the possibility of starting to lead projects with technical complexity, product complexity, or both.

Technically speaking, we use React and Redux for our frontend and Node and Express applying DDD and hexagonal architecture in the backend. We use MongoDB for our database and are fully hosted on AWS which we also use to store, encode and stream our own pool of videos. We work with testing, trunk based development, CI/CD, and follow best practices making sure we never compromise on code quality and reliability.`,
      },
    ],
  },
];
