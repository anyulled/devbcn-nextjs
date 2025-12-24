import { findCompanyBySlug, getJobOffersByYear, hasJobOffers } from "@/config/data/job-offers";

describe("Job Offers Data Access", () => {
  describe("getJobOffersByYear", () => {
    it("should return companies for 2023", () => {
      const companies = getJobOffersByYear("2023");
      expect(companies).toBeDefined();
      expect(Array.isArray(companies)).toBe(true);
      expect(companies.length).toBeGreaterThan(0);
    });

    it("should return specific companies for 2023", () => {
      const companies = getJobOffersByYear("2023");
      const companyNames = companies.map((c) => c.name);
      expect(companyNames).toContain("GFT");
      expect(companyNames).toContain("Idealista");
      expect(companyNames).toContain("Revolut");
    });

    it("should return empty array for non-existent year", () => {
      const companies = getJobOffersByYear("2030");
      expect(companies).toEqual([]);
    });

    it("should return companies with offers", () => {
      const companies = getJobOffersByYear("2023");
      companies.forEach((company) => {
        expect(company.offers).toBeDefined();
        expect(Array.isArray(company.offers)).toBe(true);
        expect(company.offers.length).toBeGreaterThan(0);
      });
    });
  });

  describe("findCompanyBySlug", () => {
    it("should find GFT by slug", () => {
      const company = findCompanyBySlug("2023", "gft");
      expect(company).toBeDefined();
      expect(company?.name).toBe("GFT");
    });

    it("should find company with multi-word name", () => {
      const company = findCompanyBySlug("2023", "new-relic");
      expect(company).toBeDefined();
      expect(company?.name).toBe("New Relic");
    });

    it("should return undefined for non-existent company", () => {
      const company = findCompanyBySlug("2023", "non-existent-company");
      expect(company).toBeUndefined();
    });

    it("should return undefined for non-existent year", () => {
      const company = findCompanyBySlug("2030", "gft");
      expect(company).toBeUndefined();
    });

    it("should be case-insensitive (via slug)", () => {
      const company = findCompanyBySlug("2023", "gft");
      expect(company).toBeDefined();
    });

    it("should return company with all properties", () => {
      const company = findCompanyBySlug("2023", "gft");
      expect(company).toHaveProperty("id");
      expect(company).toHaveProperty("name");
      expect(company).toHaveProperty("logo");
      expect(company).toHaveProperty("description");
      expect(company).toHaveProperty("offers");
    });
  });

  describe("hasJobOffers", () => {
    it("should return true for 2023", () => {
      expect(hasJobOffers("2023")).toBe(true);
    });

    it("should return false for non-existent year", () => {
      expect(hasJobOffers("2030")).toBe(false);
    });

    it("should return false for empty string", () => {
      expect(hasJobOffers("")).toBe(false);
    });
  });
});
