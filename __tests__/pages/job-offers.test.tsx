import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock the config modules BEFORE any other code
jest.mock("@/lib/supabase/public-queries", () => ({
  __esModule: true,
  getJobOffersForEdition: jest.fn(),
}));

jest.mock("@/config/editions", () => ({
  __esModule: true,
  getEditionConfig: jest.fn(() => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: "Test Venue",
    tickets: { url: "http://test.com" },
    showCountdown: true,
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
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt="" {...props} />,
}));

describe("Job Offers Page", () => {
  const params = Promise.resolve({ year: "2025" });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders job offers list when companies are available", async () => {
    // Dynamic import inside the test to ensure it uses the mocks
    const { getJobOffersForEdition } = await import("@/lib/supabase/public-queries");
    const JobOffersPage = (await import("@/app/[year]/job-offers/page")).default;

    const mockCompanies = [
      {
        id: "1",
        name: "Company 1",
        logo: "/logo1.png",
        description: "Description 1",
        offers: [{ id: "j1", title: "Job 1", location: "Location 1", text: "Text 1" }],
      },
    ];

    jest.mocked(getJobOffersForEdition).mockResolvedValue(mockCompanies);

    const result = await JobOffersPage({ params });
    render(result);

    expect(screen.getByTestId("page-header")).toHaveTextContent("Job Offers");
    expect(screen.getByText("Company 1")).toBeInTheDocument();
  });

  it("generates correct metadata", async () => {
    const { getJobOffersForEdition } = await import("@/lib/supabase/public-queries");
    const { generateMetadata } = await import("@/app/[year]/job-offers/page");

    const mockCompanies = [
      {
        id: "1",
        name: "Company 1",
        logo: "/logo1.png",
        description: "Description 1",
        offers: [{ id: "j1", title: "Job 1", location: "Location 1", text: "Text 1" }],
      },
    ];
    jest.mocked(getJobOffersForEdition).mockResolvedValue(mockCompanies);

    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Job Opportunities - DevBcn 2025");
  });

  it("generates static params", async () => {
    const { generateStaticParams } = await import("@/app/[year]/job-offers/page");
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025" }]);
  });
});
