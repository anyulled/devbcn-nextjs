import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import type { Speaker } from "@/hooks/types";

// Mock config BEFORE imports
jest.mock("@/config/editions", () => ({
  __esModule: true,
  getEditionConfig: jest.fn(() => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: { name: "Test Venue" },
    tickets: { url: "http://test.com" },
    sponsorsData: [],
    showCountdown: true,
  })),
  formatEventDateRange: jest.fn(() => "July 10-11, 2025"),
  getAvailableEditions: jest.fn(() => ["2024", "2025"]),
  getArchivedEditions: jest.fn(() => ["2024", "2025"]),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  __esModule: true,
  usePathname: jest.fn(() => "/2025"),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ""),
  })),
}));

// Mock other dependencies
jest.mock("@/components/sections/home8/section1", () => ({
  __esModule: true,
  default: ({ year }: { year: string }) => <div data-testid="section1">Section 1 {year}</div>,
}));

jest.mock("@/components/sections/home8/section2", () => ({
  __esModule: true,
  default: ({ eventDate, showCountdown }: { eventDate: string; showCountdown: boolean }) => (
    <div data-testid="section2">
      Section 2 {eventDate} {showCountdown ? "countdown" : "no-countdown"}
    </div>
  ),
}));

jest.mock("@/components/sections/home8/section3", () => ({
  __esModule: true,
  default: () => <div data-testid="section3">Section 3</div>,
}));

jest.mock("@/components/sections/home8/section4", () => ({
  __esModule: true,
  default: ({ sponsors }: { sponsors: unknown[] }) => <div data-testid="section4">Section 4 {sponsors?.length} sponsors</div>,
}));

jest.mock("@/components/sections/home8/section5", () => ({
  __esModule: true,
  default: ({ year, speakers, totalSpeakers }: { year: string; speakers: unknown[]; totalSpeakers: number }) => (
    <div data-testid="section5">
      Section 5 {year} {speakers?.length} speakers ({totalSpeakers} total)
    </div>
  ),
}));

jest.mock("@/components/sections/home8/section6", () => ({
  __esModule: true,
  default: ({ eventVenue, eventDate }: { eventVenue: { name: string }; eventDate: string }) => (
    <div data-testid="section6">
      Section 6 {eventVenue.name} {eventDate}
    </div>
  ),
}));

jest.mock("@/hooks/useSpeakers", () => ({
  __esModule: true,
  getSpeakers: jest.fn(() => Promise.resolve([{ id: "1", fullName: "Test Speaker" } as Speaker])),
  getFeaturedSpeakers: jest.fn((speakers: Speaker[]) => speakers),
}));

jest.mock("@/lib/shared/jsonld", () => ({
  __esModule: true,
  generateEventSchema: jest.fn(() => ({})),
  generateOrganizationSchema: jest.fn(() => ({})),
  serializeJsonLd: jest.fn(() => "{}"),
}));

jest.mock("@/lib/supabase/public-queries", () => ({
  __esModule: true,
  getSponsorsForEdition: jest.fn(() =>
    Promise.resolve({
      top: [],
      premium: [],
      regular: [],
      communities: [],
      basic: [],
      media_partners: [],
      supporters: [],
    })
  ),
  getJobOffersForEdition: jest.fn(() => Promise.resolve([])),
}));

describe("Year Index Page", () => {
  const params = Promise.resolve({ year: "2025" });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all sections with correct props", async () => {
    const Page = (await import("@/app/[year]/page")).default;
    const result = await Page({ params });
    render(result);

    expect(screen.getByTestId("section1")).toHaveTextContent("Section 1 2025");
    expect(await screen.findByTestId("section2")).toHaveTextContent("Section 2 2025-07-10T00:00:00.000Z countdown");
    expect(await screen.findByTestId("section3")).toBeInTheDocument();
    expect(await screen.findByTestId("section4")).toBeInTheDocument();
    expect(await screen.findByTestId("section5")).toHaveTextContent("Section 5 2025 1 speakers (1 total)");
    expect(await screen.findByTestId("section6")).toHaveTextContent("Section 6 Test Venue 2025-07-10T00:00:00.000Z");
  });

  it("generates correct metadata", async () => {
    const { generateMetadata } = await import("@/app/[year]/page");
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("DevBcn 2025 - Barcelona Developers Conference");
    expect(metadata.description).toContain("Join DevBcn 2025");
  });

  it("generates static params for available editions", async () => {
    const { generateStaticParams } = await import("@/app/[year]/page");
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2024" }, { year: "2025" }]);
  });
});
