import { Company } from "./types";

/**
 * Job Offers Data for 2026 Edition
 *
 * Normalized from the DevBcn 2026 submission form. The company submitted the same
 * position three times, so the data below keeps a single unique offer entry.
 */
export const jobOffers2026: Company[] = [
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
