import { hasAmaMentoring as checkAmaMentoring } from "@/config/ama-mentoring";
import { hasCfpCommittee } from "@/config/cfp";
import { hasJobOffers as checkJobOffers } from "@/config/job-offers";
import { getEditionConfig } from "@/config/editions";
import { edition2027 } from "@/config/editions/2027";
import { EditionNavigation } from "@/config/editions/types";
import { NavItem, NavCondition } from "@/config/navigation/types";
import { getSchedule } from "@/hooks/useSchedule";
import { getSpeakers } from "@/hooks/useSpeakers";
import { getTalks } from "@/hooks/useTalks";

export async function getEditionNavigation(year: string): Promise<EditionNavigation> {
  const config = year === "2027" ? edition2027 : getEditionConfig(year);

  const [speakers, talks, schedule] = await Promise.all([getSpeakers(year).catch(() => []), getTalks(year).catch(() => []), getSchedule(year).catch(() => [])]);

  const hasSpeakers = !config.hideSpeakers && speakers.length > 0;
  const hasTalks = !config.hideTalks && talks.length > 0;

  const hasSchedule = schedule.length > 0;

  const hasCfp = hasCfpCommittee(year);

  const hasDiversity = config.diversity.sponsors.length > 0;

  const hasJobOffers = checkJobOffers(year);
  const hasAmaMentoring = checkAmaMentoring(year);

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
        const conditionValue = Object.hasOwn(conditions, link.condition) ? conditions[link.condition] : undefined;
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
