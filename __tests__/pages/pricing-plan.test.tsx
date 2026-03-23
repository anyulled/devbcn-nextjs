import { expect, describe, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock configuration
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
          name: "Early Bird",
          price: "370€",
          startDate: new Date("2026-03-01"),
          endDate: new Date("2026-03-31"),
        },
        {
          name: "Regular",
          price: "440€",
          startDate: new Date("2026-04-01"),
          endDate: new Date("2026-04-30"),
        },
      ],
    },
    showCountdown: true,
  })),
  getAvailableEditions: jest.fn(() => ["2023", "2024", "2025", "2026"]),
  isValidEditionYear: jest.fn((year: string) => ["2023", "2024", "2025", "2026"].includes(year)),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  __esModule: true,
  notFound: jest.fn(() => {
    throw new Error("notFound");
  }),
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

describe("PricingPlan Page Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders ticket categories from config", async () => {
      const PricingPlan = (await import("@/app/[year]/pricing-plan/page")).default;
      const params = Promise.resolve({ year: "2026" });

      const result = await PricingPlan({ params });
      render(result);

      expect(screen.getByText("Event Pass & Tickets")).toBeInTheDocument();
      expect(screen.getByText("Early Bird")).toBeInTheDocument();
      expect(screen.getByText("Regular")).toBeInTheDocument();
      expect(screen.getByText("370€")).toBeInTheDocument();
      expect(screen.getByText("440€")).toBeInTheDocument();
    });

    it("includes the validity dates for each category", async () => {
      const PricingPlan = (await import("@/app/[year]/pricing-plan/page")).default;
      const params = Promise.resolve({ year: "2026" });

      const result = await PricingPlan({ params });
      render(result);

      // Locales might vary in tests, but we expect en-GB format as per page.tsx
      expect(screen.getByText(/Valid: 0?1\/0?3\/2026 - 31\/0?3\/2026/)).toBeInTheDocument();
    });

    it("triggers notFound for invalid years", async () => {
      const PricingPlan = (await import("@/app/[year]/pricing-plan/page")).default;
      const { notFound } = await import("next/navigation");
      const params = Promise.resolve({ year: "invalid" });

      await expect(PricingPlan({ params })).rejects.toThrow("notFound");
      expect(notFound).toHaveBeenCalled();
    });
  });

  describe("Metadata & Static Params", () => {
    it("generates correct metadata", async () => {
      const { generateMetadata } = await import("@/app/[year]/pricing-plan/page");
      const params = Promise.resolve({ year: "2026" });

      const metadata = await generateMetadata({ params });
      expect(metadata.title).toBe("Pricing Plan - DevBcn 2026");
      expect(metadata.description).toContain("DevBcn 2026");
    });

    it("generates static params for all available editions", async () => {
      const { generateStaticParams } = await import("@/app/[year]/pricing-plan/page");
      const params = await generateStaticParams();

      expect(params).toEqual([{ year: "2023" }, { year: "2024" }, { year: "2025" }, { year: "2026" }]);
    });
  });
});
