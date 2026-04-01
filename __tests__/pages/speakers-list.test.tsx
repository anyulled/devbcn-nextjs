import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import type { Speaker } from "@/hooks/types";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  __esModule: true,
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ""),
  })),
  usePathname: jest.fn(() => "/2025/speakers"),
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  })),
}));

// Mock hooks
jest.mock("@/hooks/useSpeakers", () => ({
  __esModule: true,
  getSpeakers: jest.fn(),
}));

// Mock components
jest.mock("@/components/layout/PageHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

jest.mock("@/components/layout/SpeakersList", () => ({
  __esModule: true,
  default: ({ speakers }: { speakers: Speaker[] }) => <div data-testid="speakers-list">{speakers?.length} speakers</div>,
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
    venue: { name: "Test Venue" },
    tickets: { url: "http://test.com" },
    showCountdown: true,
  })),
  getAvailableEditions: jest.fn(() => ["2025"]),
  formatEventDateRange: jest.fn(() => "July 10-11, 2025"),
}));

// Mock JsonLd utils
jest.mock("@/lib/shared/jsonld", () => ({
  __esModule: true,
  generateItemListSchema: jest.fn(() => ({})),
  serializeJsonLd: jest.fn(() => "{}"),
}));

describe("Speakers List Page", () => {
  const params = Promise.resolve({ year: 2025 });
  const mockSpeakers = [{ id: "1", fullName: "Speaker One" }] as unknown as Speaker[];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders speakers list when speakers are available", async () => {
    const { getSpeakers } = await import("@/hooks/useSpeakers");
    const Page = (await import("@/app/[year]/speakers/page")).default;

    jest.mocked(getSpeakers).mockResolvedValue(mockSpeakers);

    const result = await Page({ params });
    render(result);

    expect(screen.getByTestId("page-header")).toHaveTextContent("Our Speakers");
    expect(screen.getByTestId("speakers-list")).toHaveTextContent("1 speakers");
  });

  it("renders coming soon message when no speakers are available", async () => {
    const { getSpeakers } = await import("@/hooks/useSpeakers");
    const Page = (await import("@/app/[year]/speakers/page")).default;

    jest.mocked(getSpeakers).mockResolvedValue([]);

    const result = await Page({ params });
    render(result);

    expect(screen.getByText("Speakers Coming Soon!")).toBeInTheDocument();
  });

  it("generates correct metadata", async () => {
    const { getSpeakers } = await import("@/hooks/useSpeakers");
    const { generateMetadata } = await import("@/app/[year]/speakers/page");

    jest.mocked(getSpeakers).mockResolvedValue(mockSpeakers);

    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Speakers - DevBcn 2025");
  });

  it("generates static params", async () => {
    const { generateStaticParams } = await import("@/app/[year]/speakers/page");
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025" }]);
  });
});
