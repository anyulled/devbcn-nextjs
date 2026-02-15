import { cfpData } from "@/app/[year]/cfp/cfpData";
import { hasJobOffers as checkJobOffers } from "@/config/job-offers/job-offers";
import { getEditionConfig } from "@/config/editions";
import { EditionNavigation, EditionNavItem, NavCondition } from "@/config/editions/types";
import { getSchedule } from "@/hooks/useSchedule";
import { getSpeakers } from "@/hooks/useSpeakers";
import { getTalks } from "@/hooks/useTalks";

export async function getEditionNavigation(year: string): Promise<EditionNavigation> {
  const config = getEditionConfig(year);

  const [speakers, talks, schedule] = await Promise.all([getSpeakers(year).catch(() => []), getTalks(year).catch(() => []), getSchedule(year).catch(() => [])]);

  const hasSpeakers = speakers.length > 0;
  const hasTalks = talks.length > 0;

  const hasSchedule = schedule.length > 0;

  const editionCfp = cfpData[year];
  const hasCfp = editionCfp ? editionCfp.some((track) => track.members && track.members.length > 0) : false;

  const hasDiversity = config.diversity.sponsors.length > 0;

  const hasJobOffers = checkJobOffers(year);

  const conditions: Record<NavCondition, boolean> = {
    hasSpeakers,
    hasTalks,
    hasSchedule,
    hasCfp,
    hasDiversity,
    hasJobOffers,
  };

  const filterLinks = (links: EditionNavItem[]): EditionNavItem[] => {
    return links.filter((link) => {
      if (!link.condition) return true;
      return conditions[link.condition];
    });
  };

  const nav = config.navigation || { main: [], yearSpecific: [], news: [] };

  return {
    main: filterLinks(nav.main || []),
    yearSpecific: filterLinks(nav.yearSpecific || []),
    news: filterLinks(nav.news || []),
  };
}
