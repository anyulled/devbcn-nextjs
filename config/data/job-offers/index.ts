import { slugify } from "@/lib/utils/slugify";
import { jobOffers2023 } from "./2023";
import { Company } from "./types";

/**
 * Job Offers Data Access
 *
 * Provides functions to retrieve job offers by year and company.
 */

// Map of year to job offers data
const jobOffersMap: Record<string, Company[]> = {
  "2023": jobOffers2023,
  // Add future years here:
  // "2024": jobOffers2024,
  // "2025": jobOffers2025,
};

/**
 * Get all companies with job offers for a specific year
 *
 * @param year - The year to get job offers for
 * @returns Array of companies with job offers, or empty array if no data exists
 */
export function getJobOffersByYear(year: string): Company[] {
  return jobOffersMap[year] || [];
}

/**
 * Find a company by its slugified name for a specific year
 *
 * @param year - The year to search in
 * @param companySlug - The URL-safe slug of the company name
 * @returns The company object if found, undefined otherwise
 */
export function findCompanyBySlug(year: string, companySlug: string): Company | undefined {
  const companies = getJobOffersByYear(year);
  return companies.find((company) => slugify(company.name) === companySlug);
}

/**
 * Check if job offers are available for a specific year
 *
 * @param year - The year to check
 * @returns true if job offers exist for the year, false otherwise
 */
export function hasJobOffers(year: string): boolean {
  return jobOffersMap[year] !== undefined && jobOffersMap[year].length > 0;
}
