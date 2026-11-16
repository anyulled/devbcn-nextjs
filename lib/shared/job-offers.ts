import { getJobOffersByYear } from "@/config/job-offers";
import { Company } from "@/config/job-offers/types";
import { slugify } from "@/lib/shared/slugify";

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
