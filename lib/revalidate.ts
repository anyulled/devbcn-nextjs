import { CURRENT_EDITION, isValidEditionYear } from "@/config/editions";

const CURRENT_EDITION_REVALIDATE_SECONDS = 43200;

const getEditionYearForCache = (year: string | number): string => {
  const yearStr = String(year);
  return isValidEditionYear(yearStr) ? yearStr : CURRENT_EDITION;
};

export const getSessionizeTag = (year: string | number): string => `sessionize:${getEditionYearForCache(year)}`;

export const getSessionizeFetchOptions = (year: string | number): { next: { revalidate: number | false; tags: [string] } } => ({
  next: {
    revalidate: getEditionYearForCache(year) === CURRENT_EDITION ? CURRENT_EDITION_REVALIDATE_SECONDS : false,
    tags: [getSessionizeTag(year)],
  },
});
