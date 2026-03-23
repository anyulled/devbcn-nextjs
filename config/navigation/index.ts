/**
 * Centralized Navigation Configuration
 *
 * Single source of truth for all navigation links across the application.
 * Used by Header8, MobileMenu, and other navigation components.
 */

import type { NavItem, SocialLink } from "./types";

/**
 * Past edition links for Home dropdown
 */
export const editionLinks: NavItem[] = [
  { label: "Current Edition", href: "/2026", requiresYear: false },
  { label: "2025 Edition", href: "/2025", requiresYear: false },
  { label: "2024 Edition", href: "/2024", requiresYear: false },
  { label: "2023 Edition", href: "/2023", requiresYear: false },
];

/**
 * Main navigation links (non-year-specific)
 */
export const mainNavLinks: NavItem[] = [
  { label: "About Us", href: "/about-us", requiresYear: false },
  { label: "Code of Conduct", href: "/code-of-conduct", requiresYear: false },
  { label: "Sponsors", href: "#sponsors", requiresYear: true },
  { label: "Travel", href: "/travel", requiresYear: true },
];

/**
 * Year-specific navigation links
 */
export const yearSpecificNavLinks: NavItem[] = [
  { label: "Speakers", href: "/speakers", requiresYear: true, condition: "hasSpeakers" },
  { label: "Talks", href: "/talks", requiresYear: true, condition: "hasTalks" },
  { label: "Schedule", href: "/schedule", requiresYear: true, condition: "hasSchedule" },
];

/**
 * News dropdown links
 */
export const newsDropdownLinks: NavItem[] = [
  { label: "CFP", href: "/cfp", requiresYear: true, condition: "hasCfp" },
  { label: "Sponsorship", href: "/sponsorship", requiresYear: true },
  { label: "Diversity", href: "/diversity", requiresYear: true, condition: "hasDiversity" },
  { label: "Job Offers", href: "/job-offers", requiresYear: true, condition: "hasJobOffers" },
  { label: "Contact Us", href: "/contact-us", requiresYear: false },
];

/**
 * Social media links
 */
export const socialLinks: SocialLink[] = [
  {
    platform: "twitter",
    url: "https://twitter.com/dev_bcn",
    icon: "fa-brands fa-twitter",
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/devbcn.conf/",
    icon: "fa-brands fa-instagram",
  },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/company/devbcn/",
    icon: "fa-brands fa-linkedin-in",
  },
  {
    platform: "bluesky",
    url: "https://bsky.app/profile/devbcn.bsky.social",
    icon: "fa-brands fa-bluesky",
  },
];

/**
 * Helper function to get navigation links with year prefix
 * @param year - The edition year (e.g., "2026")
 * @returns Navigation links with year prefix applied where needed
 */
export const getNavLinksWithYear = (year: string): NavItem[] => {
  return yearSpecificNavLinks.map((link) => ({
    ...link,
    href: `/${year}${link.href}`,
  }));
};

/**
 * Helper function to get all main navigation items for mobile menu
 * Combines main nav and year-specific nav
 */
export const getAllMainNavLinks = (): NavItem[] => {
  return [...mainNavLinks, ...yearSpecificNavLinks];
};
