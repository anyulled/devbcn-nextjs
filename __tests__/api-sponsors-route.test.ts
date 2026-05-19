import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { Sponsors } from "@/config/editions/types";

jest.mock("next/server", () => ({
  __esModule: true,
  NextResponse: {
    json: (body: unknown, init?: ResponseInit) =>
      new Response(JSON.stringify(body), {
        headers: {
          "content-type": "application/json",
        },
        status: init?.status ?? 200,
      }),
  },
}));

const mockGetSponsorsForEdition = jest.fn<(year: string) => Promise<Sponsors>>();

jest.mock("@/lib/supabase/public-queries", () => ({
  __esModule: true,
  getSponsorsForEdition: (year: string) => mockGetSponsorsForEdition(year),
}));

interface ErrorPayload {
  error: string;
}

interface SponsorPayload {
  name: string;
  category: string;
  image: string;
}

describe("GET /api/sponsors/[year]", () => {
  const originalToken = process.env.API_AUTH_TOKEN;

  beforeEach(() => {
    process.env.API_AUTH_TOKEN = "test-secret-token";
    jest.resetModules();
    mockGetSponsorsForEdition.mockReset();
    mockGetSponsorsForEdition.mockResolvedValue({
      top: null,
      premium: [
        {
          name: "Edpuzzle",
          website: "https://edpuzzle.com",
          image: "/assets/img/all-images/sponsors/edpuzzle.svg",
        },
      ],
      regular: null,
      communities: null,
      basic: null,
      media_partners: null,
      supporters: null,
    });
  });

  afterEach(() => {
    process.env.API_AUTH_TOKEN = originalToken;
  });

  it("returns 500 when API_AUTH_TOKEN is not set", async () => {
    delete process.env.API_AUTH_TOKEN;

    const { GET } = await import("@/app/api/sponsors/[year]/route");
    const request = new Request("https://www.devbcn.com/api/sponsors/2026", {
      method: "GET",
    });

    const response = await GET(request as never, { params: Promise.resolve({ year: "2026" }) });
    const payload = (await response.json()) as ErrorPayload;

    expect(response.status).toBe(500);
    expect(payload.error).toMatch(/Authentication token not set/);
  });

  it("returns 401 when missing Authorization header", async () => {
    const { GET } = await import("@/app/api/sponsors/[year]/route");
    const request = new Request("https://www.devbcn.com/api/sponsors/2026", {
      method: "GET",
    });

    const response = await GET(request as never, { params: Promise.resolve({ year: "2026" }) });
    const payload = (await response.json()) as ErrorPayload;

    expect(response.status).toBe(401);
    expect(payload.error).toBe("Unauthorized");
  });

  it("returns 401 when Authorization header has invalid token", async () => {
    const { GET } = await import("@/app/api/sponsors/[year]/route");
    const request = new Request("https://www.devbcn.com/api/sponsors/2026", {
      method: "GET",
      headers: {
        authorization: "Bearer wrong-token",
      },
    });

    const response = await GET(request as never, { params: Promise.resolve({ year: "2026" }) });
    const payload = (await response.json()) as ErrorPayload;

    expect(response.status).toBe(401);
    expect(payload.error).toBe("Unauthorized");
  });

  it("returns 404 for an invalid year", async () => {
    const { GET } = await import("@/app/api/sponsors/[year]/route");
    const request = new Request("https://www.devbcn.com/api/sponsors/1999", {
      method: "GET",
      headers: {
        authorization: "Bearer test-secret-token",
      },
    });

    const response = await GET(request as never, { params: Promise.resolve({ year: "1999" }) });
    const payload = (await response.json()) as ErrorPayload;

    expect(response.status).toBe(404);
    expect(payload.error).toBe("Edition not found");
  });

  it("returns 200 and formatted sponsors list for a valid year with token", async () => {
    const { GET } = await import("@/app/api/sponsors/[year]/route");

    const request = new Request("https://www.devbcn.com/api/sponsors/2026", {
      method: "GET",
      headers: {
        authorization: "test-secret-token",
      },
    });

    const response = await GET(request as never, { params: Promise.resolve({ year: "2026" }) });
    const payload = (await response.json()) as SponsorPayload[];

    expect(response.status).toBe(200);
    expect(Array.isArray(payload)).toBe(true);

    const edpuzzle = payload.find((s) => s.name === "Edpuzzle");
    expect(edpuzzle).toBeDefined();

    if (edpuzzle) {
      expect(edpuzzle.category).toBe("Premium Sponsor");
      expect(edpuzzle.image).toContain("https://www.devbcn.com/assets/img/");
    }
  });
});
