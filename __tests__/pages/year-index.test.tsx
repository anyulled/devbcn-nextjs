import Page, { generateMetadata, generateStaticParams } from "@/app/[year]/page";
import { render, screen } from "@testing-library/react";

// Mock sections
jest.mock("@/components/sections/home8/section1", () => ({
  __esModule: true,
  default: ({ year }: { year: string }) => <div data-testid="section1">Section 1 {year}</div>,
}));
jest.mock("@/components/sections/home8/section2", () => ({
  __esModule: true,
  default: ({ eventDate, showCountdown }: any) => (
    <div data-testid="section2">
      Section 2 {eventDate} {showCountdown ? "countdown" : "no-countdown"}
    </div>
  ),
}));
jest.mock("@/components/sections/home8/section3", () => ({
  __esModule: true,
  default: () => <div data-testid="section3">Section 3</div>,
}));
jest.mock("@/components/sections/home8/section4", () => ({
  __esModule: true,
  default: ({ sponsors }: any) => <div data-testid="section4">Section 4 {sponsors?.length} sponsors</div>,
}));
jest.mock("@/components/sections/home8/section5", () => ({
  __esModule: true,
  default: ({ year }: { year: string }) => <div data-testid="section5">Section 5 {year}</div>,
}));
jest.mock("@/components/sections/home8/section6", () => ({
  __esModule: true,
  default: ({ eventVenue, eventDate }: any) => (
    <div data-testid="section6">
      Section 6 {eventVenue} {eventDate}
    </div>
  ),
}));

// Mock config
jest.mock("@/config/editions", () => ({
  getEditionConfig: jest.fn((year: string) => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: "Test Venue",
    tickets: { url: "http://test.com" },
    sponsorsData: [],
    showCountdown: true,
  })),
  formatEventDateRange: jest.fn(() => "July 10-11, 2025"),
  getAvailableEditions: jest.fn(() => ["2024", "2025"]),
}));

// Mock JsonLd utils
jest.mock("@/lib/utils/jsonld", () => ({
  generateEventSchema: jest.fn(() => ({})),
  generateOrganizationSchema: jest.fn(() => ({})),
  serializeJsonLd: jest.fn(() => "{}"),
}));

describe("Year Index Page", () => {
  const params = Promise.resolve({ year: "2025" });

  it("renders all sections with correct props", async () => {
    const result = await Page({ params });
    render(result);

    expect(screen.getByTestId("section1")).toHaveTextContent("Section 1 2025");
    expect(screen.getByTestId("section2")).toHaveTextContent("Section 2 2025-07-10T00:00:00.000Z countdown");
    expect(screen.getByTestId("section3")).toBeInTheDocument();
    expect(screen.getByTestId("section4")).toBeInTheDocument();
    expect(screen.getByTestId("section5")).toHaveTextContent("Section 5 2025");
    expect(screen.getByTestId("section6")).toHaveTextContent("Section 6 Test Venue 2025-07-10T00:00:00.000Z");
  });

  it("generates correct metadata", async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("DevBcn 2025 - Barcelona Developers Conference");
    expect(metadata.description).toContain("Join DevBcn 2025");
  });

  it("generates static params for available editions", async () => {
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2024" }, { year: "2025" }]);
  });
});
