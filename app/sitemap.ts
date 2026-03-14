import { getJobOffersByYear } from "@/config/job-offers/job-offers";
import { getAvailableEditions } from "@/config/editions";
import { getSpeakers } from "@/hooks/useSpeakers";
import { getTalks } from "@/hooks/useTalks";
import { slugify } from "@/lib/shared/slugify";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.devbcn.com";
  const years = getAvailableEditions();

  const urls: MetadataRoute.Sitemap = [];

  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  });

  const staticPages = ["about-us", "code-of-conduct"];
  for (const page of staticPages) {
    urls.push({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Fetch all years concurrently to optimize build performance
  const yearSitemaps = await Promise.all(
    years.map(async (year) => {
      const yearUrls: MetadataRoute.Sitemap = [];
      try {
        yearUrls.push({
          url: `${baseUrl}/${year}`,
          lastModified: new Date(),
          changeFrequency: "daily",
          priority: 0.9,
        });

        const yearPages = ["speakers", "talks", "schedule", "job-offers", "cfp", "diversity", "sponsorship", "travel"];
        for (const page of yearPages) {
          yearUrls.push({
            url: `${baseUrl}/${year}/${page}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }

        // Fetch speakers and talks for the given year concurrently
        const [speakers, sessionGroups] = await Promise.all([getSpeakers(year), getTalks(year)]);

        for (const speaker of speakers) {
          yearUrls.push({
            url: `${baseUrl}/${year}/speakers/${speaker.id}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }

        for (const group of sessionGroups) {
          for (const talk of group.sessions) {
            yearUrls.push({
              url: `${baseUrl}/${year}/talks/${talk.id}`,
              lastModified: new Date(),
              changeFrequency: "weekly",
              priority: 0.7,
            });
          }
        }

        const companies = getJobOffersByYear(year);
        for (const company of companies) {
          yearUrls.push({
            url: `${baseUrl}/${year}/job-offers/${slugify(company.name)}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
          });
        }
      } catch (error) {
        console.error(`Error generating sitemap for year ${year}:`, error);
      }
      return yearUrls;
    })
  );

  return [...urls, ...yearSitemaps.flat()];
}
