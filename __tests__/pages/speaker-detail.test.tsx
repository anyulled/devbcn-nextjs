import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import type { Speaker } from "@/hooks/types";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  __esModule: true,
  notFound: jest.fn(() => {
    throw new Error("notFound");
  }),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ""),
  })),
  usePathname: jest.fn(() => "/2025/speakers/1"),
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
  getSpeakerByYearAndId: jest.fn(),
  getSpeakers: jest.fn(() => Promise.resolve([])),
}));

// Mock components
jest.mock("@/components/speakers/SpeakerContent", () => ({
  __esModule: true,
  default: ({ speaker }: { speaker: { fullName: string } }) => <div data-testid="speaker-content">{speaker.fullName}</div>,
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
  getArchivedEditions: jest.fn(() => ["2025"]),
  formatEventDateRange: jest.fn(() => "July 10-11, 2025"),
}));

// Mock JsonLd utils
jest.mock("@/lib/shared/jsonld", () => ({
  __esModule: true,
  generatePersonSchema: jest.fn(() => ({})),
  generateBreadcrumbSchema: jest.fn(() => ({})),
  generateItemListSchema: jest.fn(() => ({})),
  serializeJsonLd: jest.fn(() => "{}"),
}));

describe("Speaker Detail Page", () => {
  const params = Promise.resolve({ year: "2025", speakerId: "1" });
  const mockSpeaker = {
    id: "1",
    fullName: "Test Speaker",
    bio: "Test Bio",
    tagLine: "Test Tagline",
    profilePicture: "/img.png",
    links: [],
    sessions: [{ id: "t1", name: "Test Talk" }],
  } as unknown as Speaker;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders speaker details correctly", async () => {
    const { getSpeakerByYearAndId } = await import("@/hooks/useSpeakers");
    const Page = (await import("@/app/[year]/speakers/[speakerId]/page")).default;

    jest.mocked(getSpeakerByYearAndId).mockResolvedValue(mockSpeaker);

    const result = await Page({ params });
    render(result);

    expect(screen.getByTestId("speaker-content")).toHaveTextContent("Test Speaker");
  });

  it("renders notFound if speaker is not found", async () => {
    const { getSpeakerByYearAndId } = await import("@/hooks/useSpeakers");
    const Page = (await import("@/app/[year]/speakers/[speakerId]/page")).default;
    const { notFound } = await import("next/navigation");

    jest.mocked(getSpeakerByYearAndId).mockResolvedValue(undefined);

    await expect(Page({ params })).rejects.toThrow("notFound");
    expect(notFound).toHaveBeenCalled();
  });

  it("generates correct metadata", async () => {
    const { getSpeakerByYearAndId } = await import("@/hooks/useSpeakers");
    const { generateMetadata } = await import("@/app/[year]/speakers/[speakerId]/page");

    jest.mocked(getSpeakerByYearAndId).mockResolvedValue(mockSpeaker);

    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Test Speaker - DevBcn 2025 Speaker");
  });
});
