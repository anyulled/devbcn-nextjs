import Speakers, { generateMetadata, generateStaticParams } from "@/app/[year]/speakers/page";
import { getSpeakers } from "@/hooks/useSpeakers";
import { render, screen } from "@testing-library/react";

// Mock hooks
jest.mock("@/hooks/useSpeakers", () => ({
  getSpeakers: jest.fn(),
}));

// Mock components
jest.mock("@/components/layout/PageHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));
jest.mock("@/components/layout/SpeakerCard", () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid="speaker-card">{name}</div>,
}));
jest.mock("@/components/sections/CTASection", () => ({
  __esModule: true,
  default: () => <div data-testid="cta-section">CTA Section</div>,
}));

// Mock config
jest.mock("@/config/editions", () => ({
  getEditionConfig: jest.fn((year: string) => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: "Test Venue",
    tickets: { url: "http://test.com" },
    showCountdown: true,
  })),
  getAvailableEditions: jest.fn(() => ["2025"]),
}));

// Mock JsonLd utils
jest.mock("@/lib/utils/jsonld", () => ({
  generateItemListSchema: jest.fn(() => ({})),
  serializeJsonLd: jest.fn(() => "{}"),
}));

describe("Speakers List Page", () => {
  const params = Promise.resolve({ year: 2025 });
  const mockSpeakers = [{ id: "1", fullName: "Speaker 1", profilePicture: "/img1.jpg", tagLine: "Expert", links: [] }];

  beforeEach(() => {
    jest.clearAllMocks();
    (getSpeakers as jest.Mock).mockResolvedValue(mockSpeakers);
  });

  it("renders speakers list when speakers are available", async () => {
    const result = await Speakers({ params });
    render(result);

    expect(screen.getByTestId("page-header")).toHaveTextContent("Our Speakers");
    expect(screen.getByTestId("speaker-card")).toHaveTextContent("Speaker 1");
  });

  it("renders coming soon message when no speakers are available", async () => {
    (getSpeakers as jest.Mock).mockResolvedValue([]);
    const result = await Speakers({ params });
    render(result);

    expect(screen.getByText("Speakers Coming Soon!")).toBeInTheDocument();
  });

  it("generates correct metadata", async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Speakers - DevBcn 2025");
    expect(metadata.description).toContain("Meet the 1 amazing speakers");
  });

  it("generates static params", async () => {
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025" }]);
  });
});
