import TravelPage, { generateMetadata, generateStaticParams } from "@/app/[year]/travel/page";
import { render, screen } from "@testing-library/react";

// Mock components
jest.mock("@/components/layout/PageHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));
jest.mock("@/components/sections/CTASection", () => ({
  __esModule: true,
  default: () => <div data-testid="cta-section">CTA Section</div>,
}));
jest.mock("@/components/sections/venue/LaFargaVenue", () => ({
  __esModule: true,
  default: () => <div data-testid="la-farga">La Farga</div>,
}));
jest.mock("@/components/sections/venue/WTCVenue", () => ({
  __esModule: true,
  default: ({ venueName }: { venueName: string }) => <div data-testid="wtc-venue">WTC {venueName}</div>,
}));

// Mock config
jest.mock("@/config/editions", () => ({
  getEditionConfig: jest.fn((year: string) => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: year === "2026" ? "WTC" : "La Farga",
    tickets: { url: "http://test.com" },
  })),
  formatEventDateRange: jest.fn(() => "July 10-11, 2025"),
  getAvailableEditions: jest.fn(() => ["2025", "2026"]),
}));

describe("Travel Page", () => {
  it("renders La Farga venue for 2025", async () => {
    const params = Promise.resolve({ year: "2025" });
    const result = await TravelPage({ params });
    render(result);

    expect(screen.getByTestId("la-farga")).toBeInTheDocument();
    expect(screen.queryByTestId("wtc-venue")).not.toBeInTheDocument();
  });

  it("renders WTC venue for 2026", async () => {
    const params = Promise.resolve({ year: "2026" });
    const result = await TravelPage({ params });
    render(result);

    expect(screen.getByTestId("wtc-venue")).toHaveTextContent("WTC WTC");
    expect(screen.queryByTestId("la-farga")).not.toBeInTheDocument();
  });

  it("generates correct metadata", async () => {
    const params = Promise.resolve({ year: "2025" });
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Travel to Barcelona - DevBcn 2025");
  });

  it("generates static params", async () => {
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025" }, { year: "2026" }]);
  });
});
