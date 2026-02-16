import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
// Mock config
jest.mock("@/config/editions", () => ({
  getEditionConfig: jest.fn((_year: string) => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: "Test Venue",
    tickets: { url: "http://test.com" },
    sponsorsData: [],
    showCountdown: true,
  })),
  formatEventDateRange: jest.fn(() => "July 10-11, 2025"),
  getAvailableEditions: jest.fn(() => ["2024", "2025"]),
}));

import Page, { generateMetadata, generateStaticParams } from "@/app/[year]/page";
import { render, screen } from "@testing-library/react";

// Mock sections
jest.mock("@/components/sections/home8/section1", () => ({
  __esModule: true,
  default: ({ year }: { year: string }) => <div data-testid="section1">Section 1 {year}</div>,
}));
interface Section2Props {
  eventDate: Date;
  showCountdown: boolean;
}

jest.mock("@/components/sections/home8/section2", () => ({
  __esModule: true,
  default: ({ eventDate, showCountdown }: Section2Props) => (
    <div data-testid="section2">
      Section 2 {eventDate.toISOString()} {showCountdown ? "countdown" : "no-countdown"}
    </div>
  ),
}));
jest.mock("@/components/sections/home8/section3", () => ({
  __esModule: true,
  default: () => <div data-testid="section3">Section 3</div>,
}));
interface Section4Props {
  sponsors: Array<unknown> | undefined;
}

jest.mock("@/components/sections/home8/section4", () => ({
  __esModule: true,
  default: ({ sponsors }: Section4Props) => <div data-testid="section4">Section 4 {sponsors?.length} sponsors</div>,
}));
interface Section5Props {
  year: string;
  speakers: Array<{ id: string; fullName: string }> | undefined;
  totalSpeakers: number;
}

jest.mock("@/components/sections/home8/section5", () => ({
  __esModule: true,
  default: ({ year, speakers, totalSpeakers }: Section5Props) => (
    <div data-testid="section5">
      Section 5 {year} {speakers?.length} speakers ({totalSpeakers} total)
    </div>
  ),
}));
interface Section6Props {
  eventVenue: string;
  eventDate: Date;
}

jest.mock("@/components/sections/home8/section6", () => ({
  __esModule: true,
  default: ({ eventVenue, eventDate }: Section6Props) => (
    <div data-testid="section6">
      Section 6 {eventVenue} {eventDate.toISOString()}
    </div>
  ),
}));

// Mock config
jest.mock("@/config/editions", () => ({
  getEditionConfig: jest.fn((_year: string) => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: "Test Venue",
    tickets: { url: "http://test.com" },
    sponsorsData: [],
    showCountdown: true,
  })),
  formatEventDateRange: jest.fn(() => "July 10-11, 2025"),
  getAvailableEditions: jest.fn(() => ["2024", "2025"]),
}));

// Mock speakers hook
jest.mock("@/hooks/useSpeakers", () => ({
  getSpeakers: jest.fn(() => Promise.resolve([{ id: "1", fullName: "Test Speaker" }])),
  getRandomSpeakers: jest.fn(<T,>(speakers: T[]) => speakers),
}));

// Mock JsonLd utils
jest.mock("@/lib/shared/jsonld", () => ({
  generateEventSchema: jest.fn(() => ({})),
  generateOrganizationSchema: jest.fn(() => ({})),
  serializeJsonLd: jest.fn(() => "{}"),
}));

describe("Year Index Page", () => {
  const params = Promise.resolve({ year: "2025" });

  it("renders all sections with correct props", async () => {
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
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("DevBcn 2025 - Barcelona Developers Conference");
    expect(metadata.description).toContain("Join DevBcn 2025");
  });

  it("generates static params for available editions", async () => {
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2024" }, { year: "2025" }]);
  });
});
