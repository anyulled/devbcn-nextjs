import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import type { Talk, Speaker } from "@/hooks/types";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  __esModule: true,
  notFound: jest.fn(() => {
    throw new Error("notFound");
  }),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ""),
  })),
  usePathname: jest.fn(() => "/2025/talks/1"),
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
  getTalkByYearAndId: jest.fn(),
  getTalkSpeakersWithDetails: jest.fn(),
  getTrackFromTalk: jest.fn(),
  getLevelFromTalk: jest.fn(),
  getRelatedTalksByTrack: jest.fn(),
  getTagsFromTalk: jest.fn(() => []),
  getSlidesUrl: jest.fn(() => ""),
  getTalks: jest.fn(() => Promise.resolve([])),
}));

// Mock components
jest.mock("@/components/layout/PageHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

jest.mock("@/components/talks/TalkContent", () => ({
  __esModule: true,
  default: ({ talk }: { talk: { title: string } }) => <div data-testid="talk-content">{talk.title}</div>,
}));

jest.mock("@/components/talks/RelatedTalks", () => ({
  __esModule: true,
  default: () => <div data-testid="related-talks">Related Talks</div>,
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
    venue: { name: "Test Venue", mapUrl: "http://maps.com" },
    tickets: { url: "http://test.com" },
    showCountdown: true,
  })),
  getAvailableEditions: jest.fn(() => ["2025"]),
  formatEventDateRange: jest.fn(() => "July 10-11, 2025"),
}));

// Mock JsonLd utils
jest.mock("@/lib/shared/jsonld", () => ({
  __esModule: true,
  generateEducationEventSchema: jest.fn(() => ({})),
  generatePersonSchema: jest.fn(() => ({})),
  generateBreadcrumbSchema: jest.fn(() => ({})),
  serializeJsonLd: jest.fn(() => "{}"),
}));

describe("Talk Detail Page", () => {
  const params = Promise.resolve({ year: "2025", talkId: "1" });
  const mockTalk = {
    id: "1",
    title: "Test Talk",
    description: "Test Description",
    startsAt: "2025-07-10T10:00:00Z",
    endsAt: "2025-07-10T11:00:00Z",
    room: "Room 1",
    speakers: [{ id: "s1", name: "Speaker 1" }],
  } as unknown as Talk;
  const mockSpeakers = [{ id: "s1", fullName: "Speaker 1" }] as unknown as Speaker[];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders talk details correctly", async () => {
    const { getTalkByYearAndId, getTalkSpeakersWithDetails, getTrackFromTalk, getLevelFromTalk, getRelatedTalksByTrack } = await import("@/hooks/useTalks");
    const Page = (await import("@/app/[year]/talks/[talkId]/page")).default;

    jest.mocked(getTalkByYearAndId).mockResolvedValue(mockTalk);
    jest.mocked(getTalkSpeakersWithDetails).mockResolvedValue(mockSpeakers);
    jest.mocked(getTrackFromTalk).mockReturnValue("Java");
    jest.mocked(getLevelFromTalk).mockReturnValue("Intermediate");
    jest.mocked(getRelatedTalksByTrack).mockResolvedValue([]);

    const result = await Page({ params });
    render(result);

    expect(screen.getByTestId("talk-content")).toHaveTextContent("Test Talk");
  });

  it("renders notFound if talk is not found", async () => {
    const { getTalkByYearAndId } = await import("@/hooks/useTalks");
    const Page = (await import("@/app/[year]/talks/[talkId]/page")).default;
    const { notFound } = await import("next/navigation");

    jest.mocked(getTalkByYearAndId).mockResolvedValue(undefined);

    await expect(Page({ params })).rejects.toThrow("notFound");
    expect(notFound).toHaveBeenCalled();
  });

  it("generates correct metadata", async () => {
    const { getTalkByYearAndId, getTrackFromTalk, getLevelFromTalk } = await import("@/hooks/useTalks");
    const { generateMetadata } = await import("@/app/[year]/talks/[talkId]/page");

    jest.mocked(getTalkByYearAndId).mockResolvedValue(mockTalk);
    jest.mocked(getTrackFromTalk).mockReturnValue("Java");
    jest.mocked(getLevelFromTalk).mockReturnValue("Intermediate");

    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Test Talk - DevBcn 2025");
  });
});
