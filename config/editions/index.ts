/**
 * Edition Configuration Exports
 *
 * Central export point for all edition configurations.
 * Provides helper functions to access edition-specific settings.
 */

import { edition2023 } from "./2023";
import { edition2024 } from "./2024";
import { edition2025 } from "./2025";
import { edition2026 } from "./2026";
import { EditionConfig, EditionYear, isValidEditionYear } from "./types";

// Re-export types for convenience
export type {
  CFPConfig,
  DateRangeConfig,
  EditionConfig,
  EditionYear,
  FeatureConfig,
  SocialLinks,
  SponsorConfig,
} from "./types";

export { isValidEditionYear } from "./types";

/**
 * Map of all available editions
 */
export const editions: Record<EditionYear, EditionConfig> = {
  "2023": edition2023,
  "2024": edition2024,
  "2025": edition2025,
  "2026": edition2026,
};

/**
 * The current/default edition
 */
export const CURRENT_EDITION: EditionYear = "2026";

/**
 * Get configuration for a specific edition year
 *
 * @param year - The edition year (e.g., "2025")
 * @returns The edition configuration (returns latest edition if year not found)
 *
 * @example
 * const config = getEditionConfig("2025");
 * console.log(config.cfp.link);
 */
export const getEditionConfig = (year: string | number): EditionConfig => {
  const yearStr = String(year);
  if (isValidEditionYear(yearStr)) {
    return editions[yearStr];
  }
  return editions[CURRENT_EDITION];
};

/**
 * Get the current edition configuration
 *
 * @returns The current edition configuration
 */
export const getCurrentEditionConfig = (): EditionConfig => {
  return editions[CURRENT_EDITION];
};

/**
 * Get all available edition years
 *
 * @returns Array of valid edition years
 */
export const getAvailableEditions = (): EditionYear[] => {
  return Object.keys(editions) as EditionYear[];
};

/**
 * Check if CFP is currently open for an edition
 *
 * @param config - The edition configuration
 * @param now - Optional date to check against (defaults to current time)
 * @returns Whether the CFP is currently accepting submissions
 */
export const isCFPOpen = (
  config: EditionConfig,
  now: Date = new Date(),
): boolean => {
  return now >= config.cfp.startDay && now <= config.cfp.endDay;
};

/**
 * Check if tickets are currently on sale for an edition
 *
 * @param config - The edition configuration
 * @param now - Optional date to check against (defaults to current time)
 * @returns Whether tickets are currently on sale
 */
export const areTicketsOnSale = (
  config: EditionConfig,
  now: Date = new Date(),
): boolean => {
  return now >= config.tickets.startDay && now <= config.tickets.endDay;
};

/**
 * Check if sponsors section should be visible
 *
 * @param config - The edition configuration
 * @param now - Optional date to check against (defaults to current time)
 * @returns Whether sponsors section should be displayed
 */
export const shouldShowSponsors = (
  config: EditionConfig,
  now: Date = new Date(),
): boolean => {
  return now >= config.sponsors.startDate && now <= config.sponsors.endDate;
};
