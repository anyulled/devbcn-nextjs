/**
 * Convert a string to a URL-safe slug
 *
 * @param text - The text to slugify
 * @returns URL-safe slug (lowercase, hyphenated)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
