/**
 * Tests for Navigation Configuration
 */

import { editionLinks, getAllMainNavLinks, getNavLinksWithYear, mainNavLinks, newsDropdownLinks, socialLinks, yearSpecificNavLinks } from "@/config/navigation";

describe("Navigation Configuration", () => {
  describe("editionLinks", () => {
    it("should contain past edition links", () => {
      expect(editionLinks).toHaveLength(4);
      expect(editionLinks[0]).toEqual({
        label: "Current Edition",
        href: "/2026",
        requiresYear: false,
      });
      expect(editionLinks[1]).toEqual({
        label: "2025 Edition",
        href: "/2025",
        requiresYear: false,
      });
      expect(editionLinks[2]).toEqual({
        label: "2024 Edition",
        href: "/2024",
        requiresYear: false,
      });
      expect(editionLinks[3]).toEqual({
        label: "2023 Edition",
        href: "/2023",
        requiresYear: false,
      });
    });

    it("should have valid hrefs", () => {
      editionLinks.forEach((link) => {
        expect(link.href).toBeTruthy();
        expect(link.href).toMatch(/^\/\d{4}$/);
      });
    });
  });

  describe("mainNavLinks", () => {
    it("should contain main navigation items", () => {
      expect(mainNavLinks).toHaveLength(2);
      expect(mainNavLinks.map((link) => link.label)).toEqual(["About Us", "Code of Conduct"]);
    });

    it("should have valid hrefs", () => {
      mainNavLinks.forEach((link) => {
        expect(link.href).toBeTruthy();
        expect(link.href).toMatch(/^\//);
      });
    });

    it("should not require year prefix", () => {
      mainNavLinks.forEach((link) => {
        expect(link.requiresYear).toBe(false);
      });
    });
  });

  describe("yearSpecificNavLinks", () => {
    it("should contain year-specific navigation items", () => {
      expect(yearSpecificNavLinks).toHaveLength(3);
      expect(yearSpecificNavLinks.map((link) => link.label)).toEqual(["Sponsors", "Speakers", "Talks"]);
    });

    it("should require year prefix", () => {
      yearSpecificNavLinks.forEach((link) => {
        expect(link.requiresYear).toBe(true);
      });
    });
  });

  describe("newsDropdownLinks", () => {
    it("should contain news dropdown items", () => {
      expect(newsDropdownLinks).toHaveLength(5);
      expect(newsDropdownLinks.map((link) => link.label)).toEqual(["CFP", "Sponsorship", "Diversity", "Job Offers", "Travel"]);
    });

    it("should have correct year requirement flags", () => {
      expect(newsDropdownLinks[0].requiresYear).toBe(true); // CFP
      expect(newsDropdownLinks[1].requiresYear).toBe(true); // Sponsorship
      expect(newsDropdownLinks[2].requiresYear).toBe(true); // Diversity
      expect(newsDropdownLinks[3].requiresYear).toBe(true); // Job Offers
      expect(newsDropdownLinks[4].requiresYear).toBe(true); // Travel
    });
  });

  describe("socialLinks", () => {
    it("should contain all social media platforms", () => {
      expect(socialLinks).toHaveLength(4);
      expect(socialLinks.map((link) => link.platform)).toEqual(["twitter", "instagram", "linkedin", "bluesky"]);
    });

    it("should have valid URLs", () => {
      socialLinks.forEach((link) => {
        expect(link.url).toBeTruthy();
        expect(link.url).toMatch(/^https?:\/\//);
      });
    });

    it("should have valid icon classes", () => {
      socialLinks.forEach((link) => {
        expect(link.icon).toBeTruthy();
        expect(link.icon).toMatch(/^fa-brands fa-/);
      });
    });
  });

  describe("getNavLinksWithYear", () => {
    it("should prefix year-specific links with year", () => {
      const year = "2026";
      const result = getNavLinksWithYear(year);

      expect(result).toHaveLength(yearSpecificNavLinks.length);
      result.forEach((link, index) => {
        expect(link.href).toBe(`/${year}${yearSpecificNavLinks[index].href}`);
        expect(link.label).toBe(yearSpecificNavLinks[index].label);
      });
    });

    it("should work with different years", () => {
      const years = ["2023", "2024", "2025", "2026"];
      years.forEach((year) => {
        const result = getNavLinksWithYear(year);
        expect(result[0].href).toBe(`/${year}/#sponsors`);
        expect(result[1].href).toBe(`/${year}/speakers`);
        expect(result[2].href).toBe(`/${year}/talks`);
      });
    });
  });

  describe("getAllMainNavLinks", () => {
    it("should combine main and year-specific nav links", () => {
      const result = getAllMainNavLinks();
      expect(result).toHaveLength(mainNavLinks.length + yearSpecificNavLinks.length);
    });

    it("should maintain order: main nav first, then year-specific", () => {
      const result = getAllMainNavLinks();
      expect(result[0].label).toBe("About Us");
      expect(result[1].label).toBe("Code of Conduct");
      expect(result[2].label).toBe("Sponsors");
      expect(result[3].label).toBe("Speakers");
      expect(result[4].label).toBe("Talks");
    });
  });
});
