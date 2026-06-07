import { beforeEach, describe, expect, it, jest } from "@jest/globals";

jest.mock("@/config/editions", () => ({
  __esModule: true,
  getEditionConfig: jest.fn(() => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: { name: "Test Venue", address: "Test Address" },
    tickets: { url: "http://test.com" },
    showCountdown: true,
  })),
}));

jest.mock("@/components/sections/ama/AmaDetails", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("@/components/sections/mentoring/MentoringDetails", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("@/components/layout/PageHeader", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("@/components/sections/CTASection", () => ({
  __esModule: true,
  default: () => null,
}));

describe("AMA and mentoring SEO metadata", () => {
  const params = Promise.resolve({ year: "2026" });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("exposes social preview metadata for AMA", async () => {
    const { generateMetadata } = await import("@/app/[year]/ama/page");
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toBe("AMA Sessions - DevBcn 2026");
    expect(metadata.alternates?.canonical).toBe("https://www.devbcn.com/2026/ama");
    expect(metadata.openGraph).toMatchObject({
      title: "AMA Sessions - DevBcn 2026",
      url: "https://www.devbcn.com/2026/ama",
      type: "website",
    });
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "/assets/img/features/ama-sessions.png",
        width: 1200,
        height: 630,
        alt: "AMA Sessions - DevBcn 2026",
      },
    ]);
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      images: ["/assets/img/features/ama-sessions.png"],
    });
  });

  it("exposes social preview metadata for mentoring", async () => {
    const { generateMetadata } = await import("@/app/[year]/mentoring/page");
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toBe("Speaking Mentoring - DevBcn 2026");
    expect(metadata.alternates?.canonical).toBe("https://www.devbcn.com/2026/mentoring");
    expect(metadata.openGraph).toMatchObject({
      title: "Speaking Mentoring - DevBcn 2026",
      url: "https://www.devbcn.com/2026/mentoring",
      type: "website",
    });
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "/assets/img/features/speaking-mentoring.png",
        width: 1200,
        height: 630,
        alt: "Speaking Mentoring - DevBcn 2026",
      },
    ]);
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      images: ["/assets/img/features/speaking-mentoring.png"],
    });
  });
});
