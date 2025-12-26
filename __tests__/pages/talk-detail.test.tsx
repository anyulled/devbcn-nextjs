import TalkDetail, { generateMetadata, generateStaticParams } from "@/app/[year]/talks/[talk_id]/page";
import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
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
jest.mock("@/lib/utils/jsonld", () => ({
  generateEducationEventSchema: jest.fn(() => ({})),
  generatePersonSchema: jest.fn(() => ({})),
  generateBreadcrumbSchema: jest.fn(() => ({})),
  serializeJsonLd: jest.fn(() => "{}"),
}));

describe("Talk Detail Page", () => {
  const params = Promise.resolve({ year: "2025", talk_id: "talk-1" });
  const mockTalk = {
    id: "talk-1",
    title: "Talk 1",
    description: "Description 1",
    speakers: [{ id: "speaker-1", name: "Speaker 1" }],
    startsAt: "2025-07-10T10:00:00Z",
    endsAt: "2025-07-10T11:00:00Z",
    room: "Room A",
    recordingUrl: "http://video.com",
  };
  const mockSpeakers = [
    {
      id: "speaker-1",
      fullName: "Speaker 1",
      profilePicture: "/img.jpg",
      tagLine: "Expert",
      links: [{ title: "X", url: "http://x.com", linkType: "Twitter" }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getTalkByYearAndId as jest.Mock).mockResolvedValue(mockTalk);
    (getTalkSpeakersWithDetails as jest.Mock).mockResolvedValue(mockSpeakers);
    (getTrackFromTalk as jest.Mock).mockReturnValue("Java");
    (getRandomRelatedTalksByTrack as jest.Mock).mockResolvedValue([]);
    (getLevelFromTalk as jest.Mock).mockReturnValue("Intermediate");
    (getTagsFromTalk as jest.Mock).mockReturnValue(["Java", "Cloud"]);
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
    (getTalkByYearAndId as jest.Mock).mockResolvedValue(null);
    try {
      await TalkDetail({ params });
    } catch (e) {
      // ignore
    }
    expect(notFound).toHaveBeenCalled();
  });

  it("generates correct metadata", async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Talk 1 - DevBcn 2025");
  });

  it("generates static params", async () => {
    (getTalks as jest.Mock).mockResolvedValue([{ sessions: [mockTalk] }]);
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025", talk_id: "talk-1" }]);
  });
});
