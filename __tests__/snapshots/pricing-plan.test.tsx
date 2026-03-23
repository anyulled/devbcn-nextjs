import { expect, describe, it, jest } from "@jest/globals";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock config
jest.mock("@/config/editions", () => ({
  __esModule: true,
  getEditionConfig: jest.fn((year: string) => ({
    title: `DevBcn ${year}`,
    event: {
      startDay: new Date("2026-06-16T08:00:00Z"),
      endDay: new Date("2026-06-17T19:00:00Z"),
    },
    venue: { name: "Test Venue", mapUrl: "http://maps.com" },
    tickets: {
      url: "https://tickets.test.com",
      categories: [
        {
          name: "Test Bird",
          price: "100€",
          startDate: new Date("2026-01-01"),
          endDate: new Date("2026-01-31"),
        },
      ],
    },
    showCountdown: true,
  })),
  getAvailableEditions: jest.fn(() => ["2026"]),
  isValidEditionYear: jest.fn((year) => year === "2026"),
}));

/*
 * Mock components to avoid deep tree in snapshots if preferred,
 * but for "comprehensive" snapshots we usually want the full render minus external links/side effects.
 */
jest.mock("@/components/layout/PageHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

jest.mock("@/components/sections/CTASection", () => ({
  __esModule: true,
  default: () => <div data-testid="cta-section">CTA Section</div>,
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  __esModule: true,
  notFound: jest.fn(),
  usePathname: () => "/2026/pricing-plan",
}));

describe("PricingPlan Page Snapshot", () => {
  it("matches the snapshot for 2026 edition", async () => {
    const PricingPlan = (await import("@/app/[year]/pricing-plan/page")).default;
    const params = Promise.resolve({ year: "2026" });

    // PricingPlan is an async Server Component
    const result = await PricingPlan({ params });
    const { container } = render(result);

    expect(container).toMatchSnapshot();
  });
});
