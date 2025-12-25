/**
 * Navigation Configuration Types
 *
 * Type definitions for centralized navigation management across
 * Header, MobileMenu, and other navigation components.
 */

/**
 * Single navigation item
 */
export interface NavItem {
  /** Display label for the link */
  label: string;
  /** URL path for the link */
  href: string;
  /** Whether this link opens in a new tab */
  isExternal?: boolean;
  /** Whether this link requires year prefix (e.g., /2026/speakers) */
  requiresYear?: boolean;
}

/**
 * Navigation group with dropdown items
 */
export interface NavGroup {
  /** Display label for the dropdown */
  label: string;
  /** Navigation items in the dropdown */
  items: NavItem[];
}

/**
 * Social media link configuration
 */
export interface SocialLink {
  /** Platform name (e.g., 'twitter', 'linkedin') */
  platform: string;
  /** Full URL to social profile */
  url: string;
  /** Font Awesome icon class */
  icon: string;
}
