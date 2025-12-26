import SponsorshipPage, { generateMetadata, generateStaticParams } from "@/app/[year]/sponsorship/page";
import { render, screen } from "@testing-library/react";

// Mock client component
jest.mock("@/app/[year]/sponsorship/SponsorshipClient", () => ({
  __esModule: true,
  default: ({ year }: { year: string }) => <div data-testid="sponsorship-client">Sponsorship Client {year}</div>,
}));

// Mock config
jest.mock("@/config/editions", () => ({
  getEditionConfig: jest.fn((year: string) => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: "Test Venue",
    tickets: { url: "http://test.com" },
  })),
  formatEventDateRange: jest.fn(() => "July 10-11, 2025"),
  getAvailableEditions: jest.fn(() => ["2025"]),
}));

describe("Sponsorship Page", () => {
  const params = Promise.resolve({ year: "2025" });

  it("renders sponsorship client", async () => {
    const result = await SponsorshipPage({ params });
    render(result);

    expect(screen.getByTestId("sponsorship-client")).toHaveTextContent("Sponsorship Client 2025");
  });

  it("generates correct metadata", async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Sponsorship - DevBcn 2025");
  });

  it("generates static params", async () => {
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025" }]);
  });
});
