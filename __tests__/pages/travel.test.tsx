import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock the components
jest.mock("@/components/layout/PageHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

jest.mock("@/components/sections/venue/LaFargaVenue", () => ({
  __esModule: true,
  default: () => <div data-testid="lafarga-venue">La Farga Venue</div>,
}));

jest.mock("@/components/sections/venue/WTCVenue", () => ({
  __esModule: true,
  default: () => <div data-testid="wtc-venue">WTC Venue</div>,
}));

jest.mock("@/components/sections/CTASection", () => ({
  __esModule: true,
  default: () => <div data-testid="cta-section">CTA Section</div>,
}));

// Mock config
jest.mock("@/config/editions", () => ({
  __esModule: true,
  getEditionConfig: jest.fn((_year: string) => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: { name: "Test Venue", address: "Test Address" },
    tickets: { url: "http://test.com" },
    showCountdown: true,
  })),
  getAvailableEditions: jest.fn(() => ["2025", "2026"]),
}));

describe("Travel Page", () => {
  const params = Promise.resolve({ year: "2025" });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders travel page content", async () => {
    const TravelPage = (await import("@/app/[year]/travel/page")).default;
    const result = await TravelPage({ params });
    render(result);

    // Matches the actual implementation: title={`Travel to Barcelona - DevBcn ${year}`}
    expect(screen.getByTestId("page-header")).toHaveTextContent("Travel to Barcelona - DevBcn 2025");
    expect(screen.getByTestId("lafarga-venue")).toBeInTheDocument();
  });

  it("generates correct metadata", async () => {
    const { generateMetadata } = await import("@/app/[year]/travel/page");
    const metadata = await generateMetadata({ params });
    // Matches the actual implementation: title: `Travel to Barcelona - DevBcn ${year}`
    expect(metadata.title).toBe("Travel to Barcelona - DevBcn 2025");
  });

  it("generates static params", async () => {
    const { generateStaticParams } = await import("@/app/[year]/travel/page");
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025" }, { year: "2026" }]);
  });
});
