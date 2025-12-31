import { cfpData } from "@/app/[year]/cfp/cfpData";
import { hasJobOffers as checkJobOffers } from "@/config/data/job-offers";
import { getEditionConfig } from "@/config/editions";
import { EditionNavigation, EditionNavItem, NavCondition } from "@/config/editions/types";
import { getSchedule } from "@/hooks/useSchedule";
import { getSpeakers } from "@/hooks/useSpeakers";
import { getTalks } from "@/hooks/useTalks";

export async function getEditionNavigation(year: string): Promise<EditionNavigation> {
  const config = getEditionConfig(year);

  // 1. Fetch data availability in parallel
  const [speakers, talks, schedule] = await Promise.all([getSpeakers(year).catch(() => []), getTalks(year).catch(() => []), getSchedule(year).catch(() => [])]);

  const hasSpeakers = speakers.length > 0;
  const hasTalks = talks.length > 0;
  // Schedule returns an array of days. If valid and has content
  const hasSchedule = schedule.length > 0;

  // CFP: logic from cfpData.ts structure
  // cfpData is Record<string, CfpTrack[]>
  const editionCfp = cfpData[year];
  const hasCfp = editionCfp ? editionCfp.some((track) => track.members && track.members.length > 0) : false;

  // Diversity: check sponsors
  const hasDiversity = config.diversity.sponsors.length > 0;

  // Job Offers
  const hasJobOffers = checkJobOffers(year);

  // 2. Define condition map
  const conditions: Record<NavCondition, boolean> = {
    hasSpeakers,
    hasTalks,
    hasSchedule,
    hasCfp,
    hasDiversity,
    hasJobOffers,
  };

  // 3. Helper to filter links
  const filterLinks = (links: EditionNavItem[]): EditionNavItem[] => {
    return links.filter((link) => {
      if (!link.condition) return true;
      return conditions[link.condition];
    });
  };

  // 4. Return filtered navigation
  // Fallback to empty structure if navigation is not defined (legacy configs)
  const nav = config.navigation || { main: [], yearSpecific: [], news: [] };

  return {
    main: filterLinks(nav.main || []),
    yearSpecific: filterLinks(nav.yearSpecific || []),
    news: filterLinks(nav.news || []),
  };
}
