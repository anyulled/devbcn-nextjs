import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import TalkDetail, { generateMetadata, generateStaticParams } from "@/app/[year]/talks/[talkId]/page";
import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import { Talk, Speaker } from "@/hooks/types";
import {
  getTalkByYearAndId,
  getTalks,
  getTalkSpeakersWithDetails,
  getTrackFromTalk,
  getRandomRelatedTalksByTrack,
  getLevelFromTalk,
  getTagsFromTalk,
} from "@/hooks/useTalks";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

// Mock hooks
jest.mock("@/hooks/useTalks", () => ({
  getTalkByYearAndId: jest.fn(),
  getTalks: jest.fn(),
  getTalkSpeakersWithDetails: jest.fn(),
  getTrackFromTalk: jest.fn(),
  getRandomRelatedTalksByTrack: jest.fn(),
  getLevelFromTalk: jest.fn(),
  getLevelStars: jest.fn(),
  getTagsFromTalk: jest.fn(),
  getSlidesUrl: jest.fn(),
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
jest.mock("@/components/elements/VideoPlayer", () => ({
  __esModule: true,
  default: ({ url }: { url: string }) => <div data-testid="video-player">{url}</div>,
}));
jest.mock("@/components/elements/AddToCalendarWrapper", () => ({
  __esModule: true,
  default: () => <div data-testid="calendar-wrapper">Add to Calendar</div>,
}));

// Mock config
jest.mock("@/config/editions", () => ({
  getEditionConfig: jest.fn(() => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: "Test Venue",
    tickets: { url: "http://test.com" },
    showCountdown: true,
  })),
  getAvailableEditions: jest.fn(() => ["2025"]),
}));

// Mock JsonLd utils
jest.mock("@/lib/shared/jsonld", () => ({
  generateEducationEventSchema: jest.fn(() => ({})),
  generatePersonSchema: jest.fn(() => ({})),
  generateBreadcrumbSchema: jest.fn(() => ({})),
  serializeJsonLd: jest.fn(() => "{}"),
}));

describe("Talk Detail Page", () => {
  const params = Promise.resolve({ year: "2025", talkId: "talk-1" });
  const mockTalk: Talk = {
    id: "talk-1",
    title: "Talk 1",
    description: "Description 1",
    startsAt: "2025-07-10T10:00:00Z",
    endsAt: "2025-07-10T11:00:00Z",
    isServiceSession: false,
    isPlenumSession: false,
    speakers: [{ id: "speaker-1", name: "Speaker 1" }],
    categories: [],
    roomId: 1,
    room: "Room A",
    liveUrl: null,
    recordingUrl: "http://video.com",
    status: "published",
    isInformed: true,
    isConfirmed: true,
    questionAnswers: [],
  };
  const mockSpeakers: Speaker[] = [
    {
      id: "speaker-1",
      firstName: "Speaker",
      lastName: "One",
      fullName: "Speaker 1",
      profilePicture: "/img.jpg",
      tagLine: "Expert",
      bio: "Bio 1",
      isTopSpeaker: false,
      links: [{ title: "X", url: "http://x.com", linkType: "Twitter" }],
      sessions: [],
      questionAnswers: [],
      categories: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(getTalkByYearAndId).mockResolvedValue(mockTalk);
    jest.mocked(getTalkSpeakersWithDetails).mockResolvedValue(mockSpeakers);
    jest.mocked(getTrackFromTalk).mockReturnValue("Java");
    jest.mocked(getRandomRelatedTalksByTrack).mockResolvedValue([]);
    jest.mocked(getLevelFromTalk).mockReturnValue("Intermediate");
    jest.mocked(getTagsFromTalk).mockReturnValue(["Java", "Cloud"]);
  });

  it("renders talk details correctly", async () => {
    const result = await TalkDetail({ params });
    render(result);

    expect(screen.getByTestId("page-header")).toHaveTextContent("Talk 1");
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Speaker 1")).toBeInTheDocument();
    expect(screen.getByTestId("video-player")).toHaveTextContent("http://video.com");
  });

  it("renders notFound if talk is not found", async () => {
    jest.mocked(getTalkByYearAndId).mockResolvedValue(undefined);
    try {
      await TalkDetail({ params });
    } catch {
      // Ignore
    }
    expect(notFound).toHaveBeenCalled();
  });

  it("generates correct metadata", async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Talk 1 - DevBcn 2025");
  });

  it("generates static params", async () => {
    jest.mocked(getTalks).mockResolvedValue([{ sessions: [mockTalk], groupId: 1, groupName: "Group 1" }]);
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025", talkId: "talk-1" }]);
  });
});
