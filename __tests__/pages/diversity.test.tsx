import Diversity, { generateMetadata, generateStaticParams } from "@/app/[year]/diversity/page";
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

// Mock config
jest.mock("@/config/editions", () => ({
  getEditionConfig: jest.fn((year: string) => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: "Test Venue",
    tickets: { url: "http://test.com" },
    showCountdown: true,
    diversity: {
      sponsors: [{ name: "Sponsor 1", image: "/img.png", website: "http://sponsor.com" }],
      applicationForm: "http://form.com",
    },
  })),
  getAvailableEditions: jest.fn(() => ["2025"]),
}));

describe("Diversity Page", () => {
  const params = Promise.resolve({ year: "2025" });

  it("renders diversity page content", async () => {
    const result = await Diversity({ params });
    render(result);

    expect(screen.getByTestId("page-header")).toHaveTextContent("Diversity Sponsorship");
    expect(screen.getByAltText("Sponsor 1")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /application form/i })).toHaveAttribute("href", "http://form.com");
  });

  it("generates correct metadata", async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Diversity Sponsorship - DevBcn 2025");
  });

  it("generates static params", async () => {
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025" }]);
  });
});
