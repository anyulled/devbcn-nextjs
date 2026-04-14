import { CURRENT_EDITION, isValidEditionYear } from "@/config/editions";

const CURRENT_EDITION_REVALIDATE_SECONDS = 43200;
const ARCHIVED_EDITIONS = new Set(["2023", "2024", "2025"]);

const getEditionYearForCache = (year: string | number): string => {
  const yearStr = String(year);
  return isValidEditionYear(yearStr) ? yearStr : CURRENT_EDITION;
};

export const isArchivedEditionYear = (year: string | number): boolean => ARCHIVED_EDITIONS.has(getEditionYearForCache(year));

export const getSessionizeTag = (year: string | number): string => `sessionize:${getEditionYearForCache(year)}`;

export const getSessionizeFetchOptions = (year: string | number): { next: { revalidate: number | false; tags: [string] } } => ({
  next: {
    revalidate: isArchivedEditionYear(year) ? false : CURRENT_EDITION_REVALIDATE_SECONDS,
    tags: [getSessionizeTag(year)],
  },
});

export const getOpenGraphCacheControl = (year: string | number): string =>
  isArchivedEditionYear(year) ? "public, max-age=31536000, immutable" : "public, s-maxage=604800, stale-while-revalidate=86400";
