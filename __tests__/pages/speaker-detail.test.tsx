import SpeakerDetail, { generateMetadata, generateStaticParams } from "@/app/[year]/speakers/[speaker_id]/page";
import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import { getSpeakerByYearAndId, getSpeakers } from "@/hooks/useSpeakers";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

// Mock hooks
jest.mock("@/hooks/useSpeakers", () => ({
  getSpeakerByYearAndId: jest.fn(),
  getSpeakers: jest.fn(),
}));

// Mock components
jest.mock("@/components/elements/Countdown", () => ({
  __esModule: true,
  default: () => <div data-testid="countdown">Countdown</div>,
}));

// Mock config
jest.mock("@/config/editions", () => ({
  getEditionConfig: jest.fn(() => ({
    event: { startDay: new Date("2026-06-16"), endDay: new Date("2026-06-17") },
    venue: "Test Venue",
    tickets: { url: "http://test.com" },
  })),
  getAvailableEditions: jest.fn(() => ["2026"]),
}));

// Mock JsonLd utils
jest.mock("@/lib/utils/jsonld", () => ({
  generatePersonSchema: jest.fn(() => ({})),
  generateItemListSchema: jest.fn(() => ({})),
  generateBreadcrumbSchema: jest.fn(() => ({})),
  serializeJsonLd: jest.fn(() => "{}"),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("Speaker Detail Page", () => {
  const params = Promise.resolve({ year: "2026", speaker_id: "speaker-1" });
  const mockSpeaker = {
    id: "speaker-1",
    fullName: "Speaker 1",
    firstName: "Speaker",
    profilePicture: "/img.jpg",
    tagLine: "Expert",
    bio: "Long bio about speaker 1.",
    links: [{ title: "X", url: "http://x.com", linkType: "Twitter" }],
    sessions: [{ id: "session-1", name: "Session 1" }],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getSpeakerByYearAndId as jest.Mock).mockResolvedValue(mockSpeaker);
  });

  it("renders speaker details correctly", async () => {
    const result = await SpeakerDetail({ params });
    render(result);

    expect(screen.getAllByText("Speaker 1")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Expert")[0]).toBeInTheDocument();
    expect(screen.getByText("About Speaker")).toBeInTheDocument();
    expect(screen.getAllByText("Session 1")[0]).toBeInTheDocument();
  });

  it("renders notFound if speaker is not found", async () => {
    (getSpeakerByYearAndId as jest.Mock).mockResolvedValue(null);
    try {
      await SpeakerDetail({ params });
    } catch (e) {
      // ignore
    }
    expect(notFound).toHaveBeenCalled();
  });

  it("generates correct metadata", async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Speaker 1 - DevBcn 2026 Speaker");
  });

  it("generates static params", async () => {
    (getSpeakers as jest.Mock).mockResolvedValue([mockSpeaker]);
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2026", speaker_id: "speaker-1" }]);
  });
});
