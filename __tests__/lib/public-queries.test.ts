import { describe, expect, it, beforeEach, jest } from "@jest/globals";

const createClientMock = jest.fn();

jest.mock("@supabase/supabase-js", () => ({
  createClient: (...args: unknown[]) => createClientMock(...args),
}));

function setupSupabaseMock({
  sponsorsResult,
  offersResult,
}: {
  sponsorsResult: { data: unknown; error: unknown };
  offersResult: { data: unknown; error: unknown };
}) {
  const sponsorsQuery = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    in: jest.fn().mockImplementation(async () => sponsorsResult),
  };

  const offersQuery = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockImplementation(async () => offersResult),
  };

  const from = jest.fn((table: string) => {
    if (table === "sponsors") return sponsorsQuery;
    if (table === "job_offers") return offersQuery;
    throw new Error(`Unexpected table: ${table}`);
  });

  createClientMock.mockReturnValue({ from });
}

describe("getCompanyJobOffersForEditionBySlug", () => {
  beforeEach(() => {
    jest.resetModules();
    createClientMock.mockReset();
    process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_STORAGE_SUPABASE_ANON_KEY = "anon-key";
  });

  it("returns null when public supabase env vars are missing", async () => {
    delete process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL;

    const { getCompanyJobOffersForEditionBySlug } = await import("@/lib/supabase/public-queries");
    const result = await getCompanyJobOffersForEditionBySlug("2026", "acme");

    expect(result).toBeNull();
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("returns null when sponsor lookup fails", async () => {
    setupSupabaseMock({
      sponsorsResult: { data: null, error: { message: "boom" } },
      offersResult: { data: [], error: null },
    });

    const { getCompanyJobOffersForEditionBySlug } = await import("@/lib/supabase/public-queries");
    const result = await getCompanyJobOffersForEditionBySlug("2026", "acme");

    expect(result).toBeNull();
  });

  it("returns null when sponsor slug is not found", async () => {
    setupSupabaseMock({
      sponsorsResult: {
        data: [{ id: "1", name: "Other Co", website: null, logo_url: null, description: null, status: "published", twitter: null, linkedin: null }],
        error: null,
      },
      offersResult: { data: [], error: null },
    });

    const { getCompanyJobOffersForEditionBySlug } = await import("@/lib/supabase/public-queries");
    const result = await getCompanyJobOffersForEditionBySlug("2026", "acme");

    expect(result).toBeNull();
  });

  it("returns null when company has no offers", async () => {
    setupSupabaseMock({
      sponsorsResult: {
        data: [{ id: "1", name: "Acme Co", website: null, logo_url: null, description: null, status: "published", twitter: null, linkedin: null }],
        error: null,
      },
      offersResult: { data: [], error: null },
    });

    const { getCompanyJobOffersForEditionBySlug } = await import("@/lib/supabase/public-queries");
    const result = await getCompanyJobOffersForEditionBySlug("2026", "acme-co");

    expect(result).toBeNull();
  });

  it("returns mapped company data for matching slug", async () => {
    setupSupabaseMock({
      sponsorsResult: {
        data: [
          {
            id: "1",
            name: "Acme Co",
            website: "https://acme.dev",
            logo_url: "https://cdn.dev/logo.png",
            description: "Acme description",
            status: "published",
            twitter: "https://x.com/acme",
            linkedin: "https://linkedin.com/company/acme",
          },
        ],
        error: null,
      },
      offersResult: {
        data: [{ id: 10, title: "Frontend Engineer", url: "https://acme.dev/jobs/10", text: "Details", location: "Barcelona" }],
        error: null,
      },
    });

    const { getCompanyJobOffersForEditionBySlug } = await import("@/lib/supabase/public-queries");
    const result = await getCompanyJobOffersForEditionBySlug("2026", "acme-co");

    expect(result).toEqual({
      id: "acme-co",
      name: "Acme Co",
      description: "Acme description",
      logo: "https://cdn.dev/logo.png",
      url: "https://acme.dev",
      linkedin: "https://linkedin.com/company/acme",
      twitter: "https://x.com/acme",
      offers: [
        {
          id: "10",
          title: "Frontend Engineer",
          url: "https://acme.dev/jobs/10",
          text: "Details",
          location: "Barcelona",
        },
      ],
    });
  });
});
