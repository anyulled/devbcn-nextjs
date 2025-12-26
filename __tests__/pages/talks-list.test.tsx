import Talks, { generateMetadata, generateStaticParams } from "@/app/[year]/talks/page";
import { getTalks, getUniqueTracks } from "@/hooks/useTalks";
import { render, screen } from "@testing-library/react";

// Mock hooks
jest.mock("@/hooks/useTalks", () => ({
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
  default: ({ talks, tracks }: any) => (
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

describe("Talks List Page", () => {
  const params = Promise.resolve({ year: 2025 });
  const mockTalks = [{ id: "1", title: "Talk 1" }];
  const mockTracks = ["Java"];

  beforeEach(() => {
    jest.clearAllMocks();
    (getTalks as jest.Mock).mockResolvedValue([{ sessions: mockTalks }]);
    (getUniqueTracks as jest.Mock).mockReturnValue(mockTracks);
  });

  it("renders talks list when talks are available", async () => {
    const result = await Talks({ params });
    render(result);

    expect(screen.getByTestId("page-header")).toHaveTextContent("Talks 2025");
    expect(screen.getByTestId("talks-list")).toHaveTextContent("1 talks, 1 tracks");
  });

  it("renders coming soon message when no talks are available", async () => {
    (getTalks as jest.Mock).mockResolvedValue([]);
    const result = await Talks({ params });
    render(result);

    expect(screen.getByText("Talks Coming Soon!")).toBeInTheDocument();
  });

  it("generates correct metadata", async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Talks & Sessions - DevBcn 2025");
    expect(metadata.description).toContain("Explore 1 talks");
  });

  it("generates static params", async () => {
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025" }]);
  });
});
