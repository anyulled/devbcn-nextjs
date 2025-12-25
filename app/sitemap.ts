import { getJobOffersByYear } from "@/config/data/job-offers";
import { getAvailableEditions } from "@/config/editions";
import { getSpeakers } from "@/hooks/useSpeakers";
import { getTalks } from "@/hooks/useTalks";
import { slugify } from "@/lib/utils/slugify";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.devbcn.com";
  const years = getAvailableEditions();

  const urls: MetadataRoute.Sitemap = [];

  // Root page
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  });

  // Static pages
  const staticPages = ["about-us", "code-of-conduct", "sponsorship", "travel"];
  for (const page of staticPages) {
    urls.push({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Year-specific pages
  for (const year of years) {
    // Year homepage
    urls.push({
      url: `${baseUrl}/${year}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    });

    // Year sub-pages
    const yearPages = ["speakers", "talks", "schedule", "job-offers", "cfp", "diversity"];
    for (const page of yearPages) {
      urls.push({
        url: `${baseUrl}/${year}/${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Speakers
    const speakers = await getSpeakers(year);
    for (const speaker of speakers) {
      urls.push({
        url: `${baseUrl}/${year}/speakers/${speaker.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    // Talks
    const sessionGroups = await getTalks(year);
    for (const group of sessionGroups) {
      for (const talk of group.sessions) {
        urls.push({
          url: `${baseUrl}/${year}/talks/${talk.id}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }

    // Job offers
    const companies = getJobOffersByYear(year);
    for (const company of companies) {
      urls.push({
        url: `${baseUrl}/${year}/job-offers/${slugify(company.name)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return urls;
}
