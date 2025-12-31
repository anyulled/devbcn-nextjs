import { NavItem } from "@/config/navigation/types";

/**
 * Edition Configuration Types
 *
 * Centralized type definitions for year-specific event configuration.
 * Each edition has its own config file that implements EditionConfig.
 */

export type NavCondition = "hasSpeakers" | "hasCfp" | "hasDiversity" | "hasSchedule" | "hasTalks" | "hasJobOffers";

export interface EditionNavItem extends NavItem {
  condition?: NavCondition;
}

export interface EditionNavigation {
  main: EditionNavItem[];
  yearSpecific: EditionNavItem[];
  news: EditionNavItem[];
}

/**
 * General feature toggle configuration
 */
export interface FeatureConfig {
  enabled: boolean;
}

/**
 * Date range configuration for time-bounded features
 */
export interface DateRangeConfig {
  startDay: Date;
  endDay: Date;
}

/**
 * Call for Papers configuration
 */
export interface CFPConfig extends DateRangeConfig {
  link: string;
}

/**
 * Sponsor visibility configuration
 */
export interface SponsorConfig {
  startDate: Date;
  endDate: Date;
}

/**
 * Tickets configuration with sale period and purchase URL
 */
export interface TicketsConfig extends DateRangeConfig {
  url: string;
}

/**
 * Diversity configuration
 */
export interface DiversityConfig {
  sponsors: Sponsor[];
  applicationForm: string;
}

/**
 * Social media links configuration
 */
export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  flickr?: string;
  github?: string;
  instagram?: string;
  bluesky?: string;
}

/**
 * Main edition configuration interface
 *
 * Contains all year-specific settings for a DevBcn edition.
 * Each year has its own file implementing this interface.
 */
export interface Sponsor {
  name: string;
  website: string;
  image: string;
}

export interface Sponsors {
  top: Sponsor[] | null;
  premium: Sponsor[] | null;
  regular: Sponsor[] | null;
  communities: Sponsor[] | null;
  basic: Sponsor[] | null;
  media_partners: Sponsor[] | null;
  supporters: Sponsor[] | null;
}

export interface EditionConfig {
  // Navigation structure (Mandatory)
  navigation: EditionNavigation;

  // Basic info
  edition: string;
  title: string;
  email: string;
  venue: string;
  trackNumber: number;
  tracks: string;

  // Event dates
  event: DateRangeConfig;

  // Feature flags
  actionButtons: boolean;
  showCountdown: boolean;
  showInfoButtons: boolean;
  hideSpeakers: boolean;
  hideTalks: boolean;
  diversity: DiversityConfig;

  // Feature toggles with nested config
  carrousel: FeatureConfig;
  schedule: FeatureConfig;
  jobOffers: FeatureConfig;

  // Time-bounded features
  cfp: CFPConfig;
  tickets: TicketsConfig;
  sponsors: SponsorConfig;
  sponsorsData: Sponsors;

  // External resources
  brochure: string;
  sessionizeUrl: string;
  openFeedbackId: string;

  // Social media
  socialLinks: SocialLinks;
}

/**
 * Supported edition years
 */
export type EditionYear = "2023" | "2024" | "2025" | "2026";

/**
 * Type guard to check if a string is a valid edition year
 */
export const isValidEditionYear = (year: string): year is EditionYear => {
  return ["2023", "2024", "2025", "2026"].includes(year);
};
