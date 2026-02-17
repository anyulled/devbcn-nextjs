import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock config BEFORE any other code
jest.mock("@/config/editions", () => ({
  __esModule: true,
  getEditionConfig: jest.fn((_year: string) => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: "Test Venue",
    tickets: { url: "http://test.com" },
    showCountdown: true,
    diversity: {
      sponsors: [{ name: "Sponsor 1", image: "/img.png", website: "http://sponsor.com" }],
      applicationForm: "http://form.com",
    },
  })),
  getAvailableEditions: jest.fn(() => ["2025"]),
  formatEventDateRange: jest.fn(() => "July 10-11, 2025"),
}));

// Mock components
jest.mock("@/components/layout/PageHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));
jest.mock("@/components/sections/CTASection", () => ({
  __esModule: true,
  default: () => <div data-testid="cta-section">CTA Section</div>,
}));

describe("Diversity Page", () => {
  const params = Promise.resolve({ year: "2025" });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders diversity page content", async () => {
    const DiversityPage = (await import("@/app/[year]/diversity/page")).default;
    const result = await DiversityPage({ params });
    render(result);

    expect(screen.getByTestId("page-header")).toHaveTextContent("Diversity Sponsorship");
    expect(screen.getByAltText("Sponsor 1")).toBeInTheDocument();
  });

  it("generates correct metadata", async () => {
    const { generateMetadata } = await import("@/app/[year]/diversity/page");
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Diversity Sponsorship - DevBcn 2025");
  });

  it("generates static params", async () => {
    const { generateStaticParams } = await import("@/app/[year]/diversity/page");
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025" }]);
  });
});
