import { getJobOffersByYear } from "@/config/job-offers/job-offers";
import { getAvailableEditions } from "@/config/editions";
import { getSpeakers } from "@/hooks/useSpeakers";
import { getTalks } from "@/hooks/useTalks";
import { slugify } from "@/lib/shared/slugify";
import type { MetadataRoute } from "next";

const BUILD_TIME = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.devbcn.com";
  const years = getAvailableEditions();

  const urls: MetadataRoute.Sitemap = [];

  urls.push({
    url: baseUrl,
    lastModified: BUILD_TIME,
    changeFrequency: "monthly",
    priority: 1,
  });

  const staticPages = ["about-us", "code-of-conduct"];
  for (const page of staticPages) {
    urls.push({
      url: `${baseUrl}/${page}`,
      lastModified: BUILD_TIME,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  /*
   * ⚡ Bolt Optimization: Parallelize sitemap generation across years.
   * Impact: Reduces sitemap generation time by fetching talks, speakers, and job offers
   * concurrently for all years instead of sequentially waiting for each year to finish.
   */
  const yearUrlsNested = await Promise.all(
    years.map(async (year) => {
      const yearUrls: MetadataRoute.Sitemap = [];

      yearUrls.push({
        url: `${baseUrl}/${year}`,
        lastModified: BUILD_TIME,
        changeFrequency: "daily",
        priority: 0.9,
      });

      const yearPages = ["speakers", "talks", "schedule", "job-offers", "cfp", "diversity", "sponsorship", "travel"];
      for (const page of yearPages) {
        yearUrls.push({
          url: `${baseUrl}/${year}/${page}`,
          lastModified: BUILD_TIME,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }

      const speakers = await getSpeakers(year);
      for (const speaker of speakers) {
        yearUrls.push({
          url: `${baseUrl}/${year}/speakers/${speaker.id}`,
          lastModified: BUILD_TIME,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }

      const sessionGroups = await getTalks(year);
      for (const group of sessionGroups) {
        for (const talk of group.sessions) {
          yearUrls.push({
            url: `${baseUrl}/${year}/talks/${talk.id}`,
            lastModified: BUILD_TIME,
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      }

      const companies = getJobOffersByYear(year);
      for (const company of companies) {
        yearUrls.push({
          url: `${baseUrl}/${year}/job-offers/${slugify(company.name)}`,
          lastModified: BUILD_TIME,
          changeFrequency: "monthly",
          priority: 0.5,
        });
      }

      return yearUrls;
    })
  );

  return [...urls, ...yearUrlsNested.flat()];
}
