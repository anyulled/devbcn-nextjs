import { generateStaticParams } from "@/app/[year]/talks/[talk_id]/page";
import { getTalks } from "@/hooks/useTalks";

// Mock dependencies
jest.mock("next/script", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("@/components/sections/CTASection", () => () => null);
jest.mock("@/components/talks/RelatedTalks", () => () => null);
jest.mock("@/components/talks/TalkContent", () => () => null);

// Mock utility functions
jest.mock("@/lib/utils/jsonld", () => ({
  generateBreadcrumbSchema: jest.fn(),
  generateEducationEventSchema: jest.fn(),
  generatePersonSchema: jest.fn(),
  serializeJsonLd: jest.fn(),
}));

// Mock hooks
jest.mock("@/hooks/useTalks", () => {
  return {
    getTalks: jest.fn(),
    getTalkByYearAndId: jest.fn(),
    getTalkSpeakersWithDetails: jest.fn(),
    getRandomRelatedTalksByTrack: jest.fn(),
    getTagsFromTalk: jest.fn(),
    getSlidesUrl: jest.fn(),
    getTrackFromTalk: jest.fn(),
    getLevelFromTalk: jest.fn(),
  };
});

describe("generateStaticParams Performance", () => {
  const years = ["2023", "2024", "2025", "2026"];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock getTalks implementation with a delay
    (getTalks as jest.Mock).mockImplementation(async (year) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 100));
      return [
        {
          groupId: 1,
          groupName: "Group 1",
          sessions: [{ id: "101", title: "Talk One" }],
        },
      ];
    });
  });

  it("measures execution time of generateStaticParams", async () => {
    const start = performance.now();
    const params = await generateStaticParams();
    const end = performance.now();
    const duration = end - start;

    console.log(`generateStaticParams duration: ${duration}ms`);

    // Verify correct behavior
    expect(params).toHaveLength(years.length); // 4 years * 1 talk
    expect(params).toEqual(
      expect.arrayContaining([
        { year: "2023", talk_id: "101" },
        { year: "2024", talk_id: "101" },
        { year: "2025", talk_id: "101" },
        { year: "2026", talk_id: "101" },
      ])
    );

    // Assert parallel execution (roughly 100ms)
    // It should be faster than sequential (400ms)
    expect(duration).toBeLessThan(300);
    expect(duration).toBeGreaterThanOrEqual(100);
  }, 10000); // Increase timeout
});
