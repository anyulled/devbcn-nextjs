import { cfpData } from "@/app/[year]/cfp/cfpData";
import { hasJobOffers as checkJobOffers } from "@/config/job-offers/job-offers";
import { getEditionConfig } from "@/config/editions";
import { EditionNavigation } from "@/config/editions/types";
import { NavItem, NavCondition } from "@/config/navigation/types";
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
  const hasAmaMentoring = year === "2026";

  const conditions: Record<NavCondition, boolean> = {
    hasSpeakers,
    hasTalks,
    hasSchedule,
    hasCfp,
    hasDiversity,
    hasJobOffers,
    hasAmaMentoring,
  };

  const filterAndProcessLinks = (links: NavItem[]): NavItem[] => {
    return links
      .filter((link) => {
        if (!link.condition) return true;
        const conditionValue = conditions[link.condition as NavCondition];
        return !!conditionValue;
      })
      .map((link) => {
        if (link.requiresYear && !link.href.startsWith(`/${year}`)) {
          const strippedHref = link.href.startsWith("/#") ? link.href.substring(1) : link.href;
          const isHashOnly = strippedHref.startsWith("#");
          const needsSlash = !isHashOnly && !strippedHref.startsWith("/");
          const prefix = needsSlash ? "/" : "";

          return {
            ...link,
            href: `/${year}${prefix}${strippedHref}`,
          };
        }
        return link;
      });
  };

  const nav = config.navigation || { main: [], yearSpecific: [], news: [] };

  return {
    main: filterAndProcessLinks(nav.main || []),
    yearSpecific: filterAndProcessLinks(nav.yearSpecific || []),
    news: filterAndProcessLinks(nav.news || []),
  };
}
