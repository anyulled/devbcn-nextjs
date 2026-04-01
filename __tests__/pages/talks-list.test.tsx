import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import type { SessionGroup } from "@/hooks/types";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  __esModule: true,
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ""),
  })),
  usePathname: jest.fn(() => "/2025/talks"),
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  })),
}));

// Mock hooks
jest.mock("@/hooks/useTalks", () => ({
  __esModule: true,
  getTalks: jest.fn(),
  getUniqueTracks: jest.fn(),
}));

// Mock components
jest.mock("@/components/layout/PageHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

jest.mock("@/components/layout/TalksList", () => ({
  __esModule: true,
  default: ({ talks, tracks }: { talks: SessionGroup[]; tracks: string[] }) => (
    <div data-testid="talks-list">
      {talks?.length} talks, {tracks?.length} tracks
    </div>
  ),
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

describe("Talks List Page", () => {
  const params = Promise.resolve({ year: "2025" });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders talks list when talks are available", async () => {
    const { getTalks, getUniqueTracks } = await import("@/hooks/useTalks");
    const Page = (await import("@/app/[year]/talks/page")).default;

    jest.mocked(getTalks).mockResolvedValue([{ sessions: [{}], groupId: 1, groupName: "Group 1" }] as SessionGroup[]);
    jest.mocked(getUniqueTracks).mockReturnValue(["Track 1"]);

    const result = await Page({ params });
    render(result);

    expect(screen.getByTestId("page-header")).toHaveTextContent("Talks 2025");
    expect(screen.getByTestId("talks-list")).toHaveTextContent("1 talks, 1 tracks");
  });

  it("renders coming soon message when no talks are available", async () => {
    const { getTalks } = await import("@/hooks/useTalks");
    const Page = (await import("@/app/[year]/talks/page")).default;

    jest.mocked(getTalks).mockResolvedValue([]);

    const result = await Page({ params });
    render(result);

    expect(screen.getByText("Talks Coming Soon!")).toBeInTheDocument();
  });

  it("generates correct metadata", async () => {
    const { getTalks } = await import("@/hooks/useTalks");
    const { generateMetadata } = await import("@/app/[year]/talks/page");

    jest.mocked(getTalks).mockResolvedValue([{ sessions: [{}], groupId: 1, groupName: "Group 1" }] as SessionGroup[]);

    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Talks & Sessions - DevBcn 2025");
  });

  it("generates static params", async () => {
    const { generateStaticParams } = await import("@/app/[year]/talks/page");
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025" }]);
  });
});
