import { describe, expect, it, jest } from "@jest/globals";

jest.mock("@/lib/supabase/public-queries", () => ({
  __esModule: true,
  getCompanyJobOffersForEditionBySlug: jest.fn(),
  getJobOffersForEdition: jest.fn(),
}));

jest.mock("@/config/editions", () => ({
  __esModule: true,
  getAvailableEditions: jest.fn(() => ["2026"]),
  getEditionConfig: jest.fn(),
}));

describe("Company job offers page", () => {
  it("returns a placeholder static parameter when no companies are available at build time", async () => {
    const { getJobOffersForEdition } = await import("@/lib/supabase/public-queries");
    const { generateStaticParams } = await import("@/app/[year]/job-offers/[companyName]/page");

    jest.mocked(getJobOffersForEdition).mockResolvedValue([]);

    await expect(generateStaticParams()).resolves.toEqual([{ year: "2026", companyName: "__placeholder__" }]);
  });
});
