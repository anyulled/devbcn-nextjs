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

interface DynamicNavigationFlags {
  hasSpeakers: boolean;
  hasTalks: boolean;
  hasSchedule: boolean;
}

function buildEditionNavigation(year: string, flags: DynamicNavigationFlags): EditionNavigation {
  const config = year === "2027" ? edition2027 : getEditionConfig(year);

  const conditions: Record<NavCondition, boolean> = {
    hasSpeakers: flags.hasSpeakers,
    hasTalks: flags.hasTalks,
    hasSchedule: flags.hasSchedule,
    hasCfp: hasCfpCommittee(year),
    hasDiversity: config.diversity.sponsors.length > 0,
    hasJobOffers: checkJobOffers(year),
    hasAmaMentoring: checkAmaMentoring(year),
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

export function getStaticEditionNavigation(year: string): EditionNavigation {
  return buildEditionNavigation(year, {
    hasSpeakers: false,
    hasTalks: false,
    hasSchedule: false,
  });
}

export async function getEditionNavigation(year: string): Promise<EditionNavigation> {
  const config = year === "2027" ? edition2027 : getEditionConfig(year);

  const [speakers, talks, schedule] = await Promise.all([getSpeakers(year).catch(() => []), getTalks(year).catch(() => []), getSchedule(year).catch(() => [])]);

  return buildEditionNavigation(year, {
    hasSpeakers: !config.hideSpeakers && speakers.length > 0,
    hasTalks: !config.hideTalks && talks.length > 0,
    hasSchedule: schedule.length > 0,
  });
}
