import { describe, expect, it } from "@jest/globals";
import { getOpenGraphCacheControl, getSessionizeFetchOptions, getSessionizeTag, isArchivedEditionYear } from "@/lib/revalidate";

describe("revalidate helpers", () => {
  it("identifies archived editions", () => {
    expect(isArchivedEditionYear("2023")).toBe(true);
    expect(isArchivedEditionYear("2024")).toBe(true);
    expect(isArchivedEditionYear("2025")).toBe(true);
    expect(isArchivedEditionYear("2026")).toBe(false);
  });

  it("returns immutable fetch options for archived editions", () => {
    expect(getSessionizeFetchOptions("2023")).toEqual({
      next: {
        revalidate: false,
        tags: ["sessionize:2023"],
      },
    });
  });

  it("returns timed revalidation for current edition", () => {
    expect(getSessionizeFetchOptions("2026")).toEqual({
      next: {
        revalidate: 43200,
        tags: ["sessionize:2026"],
      },
    });
  });

  it("keeps stable sessionize tags by year", () => {
    expect(getSessionizeTag("2024")).toBe("sessionize:2024");
    expect(getSessionizeTag("2026")).toBe("sessionize:2026");
  });

  it("returns immutable OpenGraph cache control for archived years", () => {
    expect(getOpenGraphCacheControl("2025")).toBe("public, max-age=31536000, immutable");
  });

  it("returns revalidating OpenGraph cache control for current year", () => {
    expect(getOpenGraphCacheControl("2026")).toBe("public, s-maxage=604800, stale-while-revalidate=86400");
  });
});
