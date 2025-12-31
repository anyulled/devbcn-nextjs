/* eslint-disable jsx-a11y/alt-text */
import JobOffers, { generateMetadata, generateStaticParams } from "@/app/[year]/job-offers/page";
import { getJobOffersByYear } from "@/config/data/job-offers";
import { render, screen } from "@testing-library/react";

// Mock config data
jest.mock("@/config/data/job-offers", () => ({
  getJobOffersByYear: jest.fn(),
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

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("Job Offers Page", () => {
  const params = Promise.resolve({ year: "2025" });
  const mockCompanies = [
    {
      id: "1",
      name: "Company 1",
      logo: "/logo1.png",
      description: "Description 1",
      offers: [{ title: "Job 1" }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getJobOffersByYear as jest.Mock).mockReturnValue(mockCompanies);
  });

  it("renders job offers list when companies are available", async () => {
    const result = await JobOffers({ params });
    render(result);

    expect(screen.getByTestId("page-header")).toHaveTextContent("Job Offers");
    expect(screen.getByText("Company 1")).toBeInTheDocument();
    expect(screen.getByText("1 position available")).toBeInTheDocument();
  });

  it("renders empty message when no companies are available", async () => {
    (getJobOffersByYear as jest.Mock).mockReturnValue([]);
    const result = await JobOffers({ params });
    render(result);

    expect(screen.getByText("No job offers are currently available for this year.")).toBeInTheDocument();
  });

  it("generates correct metadata", async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Job Opportunities - DevBcn 2025");
    expect(metadata.description).toContain("Explore career opportunities from 1 companies");
  });

  it("generates static params", async () => {
    const staticParams = await generateStaticParams();
    expect(staticParams).toEqual([{ year: "2025" }]);
  });
});
