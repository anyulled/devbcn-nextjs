import {
  areTicketsOnSale,
  CURRENT_EDITION,
  getAvailableEditions,
  getCurrentEditionConfig,
  getEditionConfig,
  isCFPOpen,
  isValidEditionYear,
  shouldShowSponsors,
} from "@/config/editions";
import { edition2025 } from "@/config/editions/2025";
import { edition2026 } from "@/config/editions/2026";

describe("Edition Configuration", () => {
  describe("getEditionConfig", () => {
    it("returns correct config for valid year string", () => {
      const config = getEditionConfig("2025");
      expect(config.edition).toBe("2025");
    });

    it("returns correct config for valid year number", () => {
      const config = getEditionConfig(2024);
      expect(config.edition).toBe("2024");
    });

    it("returns current edition for invalid year", () => {
      const config = getEditionConfig("2030");
      expect(config.edition).toBe(CURRENT_EDITION);
    });

    it("returns current edition for non-year string", () => {
      const config = getEditionConfig("invalid");
      expect(config.edition).toBe(CURRENT_EDITION);
    });

    it("returns current edition for 'default' string", () => {
      const config = getEditionConfig("default");
      expect(config.edition).toBe(CURRENT_EDITION);
    });
  });

  describe("getCurrentEditionConfig", () => {
    it("returns the current edition config", () => {
      const config = getCurrentEditionConfig();
      expect(config.edition).toBe(CURRENT_EDITION);
      expect(config).toBe(edition2026);
    });
  });

  describe("getAvailableEditions", () => {
    it("returns all available edition years", () => {
      const editions = getAvailableEditions();
      expect(editions).toContain("2023");
      expect(editions).toContain("2024");
      expect(editions).toContain("2025");
      expect(editions).toContain("2026");
      expect(editions).toHaveLength(4);
    });
  });

  describe("isValidEditionYear", () => {
    it("returns true for valid years", () => {
      expect(isValidEditionYear("2023")).toBe(true);
      expect(isValidEditionYear("2024")).toBe(true);
      expect(isValidEditionYear("2025")).toBe(true);
      expect(isValidEditionYear("2026")).toBe(true);
    });

    it("returns false for invalid years", () => {
      expect(isValidEditionYear("2022")).toBe(false);
      expect(isValidEditionYear("2030")).toBe(false);
      expect(isValidEditionYear("invalid")).toBe(false);
    });
  });

  describe("isCFPOpen", () => {
    it("returns true when current date is within CFP period", () => {
      const testDate = new Date("2025-02-01T12:00:00+01:00");
      expect(isCFPOpen(edition2025, testDate)).toBe(true);
    });

    it("returns false when current date is before CFP start", () => {
      const testDate = new Date("2024-12-01T12:00:00+01:00");
      expect(isCFPOpen(edition2025, testDate)).toBe(false);
    });

    it("returns false when current date is after CFP end", () => {
      const testDate = new Date("2025-04-01T12:00:00+01:00");
      expect(isCFPOpen(edition2025, testDate)).toBe(false);
    });
  });

  describe("areTicketsOnSale", () => {
    it("returns true when current date is within ticket sale period", () => {
      const testDate = new Date("2025-05-01T12:00:00+01:00");
      expect(areTicketsOnSale(edition2025, testDate)).toBe(true);
    });

    it("returns false when current date is before ticket sale start", () => {
      const testDate = new Date("2025-01-15T12:00:00+01:00");
      expect(areTicketsOnSale(edition2025, testDate)).toBe(false);
    });

    it("returns false when current date is after ticket sale end", () => {
      const testDate = new Date("2025-08-01T12:00:00+01:00");
      expect(areTicketsOnSale(edition2025, testDate)).toBe(false);
    });
  });

  describe("shouldShowSponsors", () => {
    it("returns true when current date is within sponsor visibility period", () => {
      const testDate = new Date("2025-06-01T12:00:00+01:00");
      expect(shouldShowSponsors(edition2025, testDate)).toBe(true);
    });

    it("returns false when current date is after sponsor visibility period", () => {
      const testDate = new Date("2025-08-01T12:00:00+01:00");
      expect(shouldShowSponsors(edition2025, testDate)).toBe(false);
    });
  });

  describe("Edition Config Properties", () => {
    it("2025 edition has correct sessionize URL", () => {
      expect(edition2025.sessionizeUrl).toBe("https://sessionize.com/api/v2/xhudniix");
    });

    it("2026 edition has sessionize URL configured", () => {
      expect(edition2026.sessionizeUrl).toBe("https://sessionize.com/api/v2/prcjw6ue/");
    });

    it("all editions have required social links", () => {
      const config = getEditionConfig("2025");
      expect(config.socialLinks.twitter).toBeDefined();
      expect(config.socialLinks.linkedin).toBeDefined();
    });

    it("edition dates are Date objects", () => {
      expect(edition2025.event.startDay).toBeInstanceOf(Date);
      expect(edition2025.event.endDay).toBeInstanceOf(Date);
      expect(edition2025.cfp.startDay).toBeInstanceOf(Date);
    });
  });
});
