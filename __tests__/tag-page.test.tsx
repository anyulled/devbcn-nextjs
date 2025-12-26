import TagPage, { generateMetadata, generateStaticParams } from "@/app/[year]/tags/[tag]/page";
import { getTagsFromTalk, getTalks } from "@/hooks/useTalks";
import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";

// Mock the hooks and next/navigation
jest.mock("@/hooks/useTalks", () => ({
  ...jest.requireActual("@/hooks/useTalks"),
  getTalks: jest.fn(),
  getTagsFromTalk: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("@/components/layout/TalkCard", () => ({
  __esModule: true,
  default: ({ talk }: { talk: any }) => <div data-testid="talk-card">{talk.title}</div>,
}));

jest.mock("@/components/sections/CTASection", () => ({
  __esModule: true,
  default: () => <div data-testid="cta-section">CTA Section</div>,
}));

jest.mock("@/config/editions", () => ({
  getEditionConfig: () => ({
    event: { startDay: new Date(), endDay: new Date() },
    venue: "Test Venue",
    tickets: { url: "http://test.com" },
  }),
  formatEventDateRange: jest.fn(() => "July 8-10, 2025"),
  getAvailableEditions: jest.fn(() => ["2025"]),
}));

describe("TagPage", () => {
  const mockTalks = [
    {
      id: "1",
      title: "Talk 1",
      questionAnswers: [{ question: "Tags/Topics", answer: "Java, Cloud" }],
    },
    {
      id: "2",
      title: "Talk 2",
      questionAnswers: [{ question: "Tags/Topics", answer: "Cloud, Kubernetes" }],
    },
    {
      id: "3",
      title: "Talk 3",
      questionAnswers: [{ question: "Tags/Topics", answer: "JavaScript" }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getTalks as jest.Mock).mockResolvedValue([
      {
        sessions: mockTalks,
      },
    ]);
    (getTagsFromTalk as jest.Mock).mockImplementation((talk) => {
      const tags = talk.questionAnswers.find((qa: any) => qa.question === "Tags/Topics")?.answer || "";
      return tags.split(",").map((t: string) => t.trim());
    });
  });

  describe("TagPage component", () => {
    it("renders talks with matching matching tag", async () => {
      const params = Promise.resolve({ year: "2025", tag: "Cloud" });
      const result = await TagPage({ params });
      render(result);

      expect(screen.getByText('Talks tagged "Cloud"')).toBeInTheDocument();
      expect(screen.getByText("Talk 1")).toBeInTheDocument();
      expect(screen.getByText("Talk 2")).toBeInTheDocument();
      expect(screen.queryByText("Talk 3")).not.toBeInTheDocument();
    });

    it("renders notFound when no talks match", async () => {
      const params = Promise.resolve({ year: "2025", tag: "NonExistent" });
      try {
        await TagPage({ params });
      } catch (e) {
        // ignore
      }
      expect(notFound).toHaveBeenCalled();
    });

    it("decodes tag parameter correctly", async () => {
      const params = Promise.resolve({ year: "2025", tag: "Machine%20Learning" });
      const result = await TagPage({ params });
      render(result);

      expect(screen.getByText('Talks tagged "Machine Learning"')).toBeInTheDocument();
    });
  });

  describe("generateMetadata", () => {
    it("returns correct metadata", async () => {
      const params = Promise.resolve({ year: "2025", tag: "Cloud" });
      const metadata = await generateMetadata({ params });
      expect(metadata).toEqual({
        title: 'Talks tagged "Cloud" - DevBcn 2025',
        description: "Browse all sessions tagged with Cloud at DevBcn 2025",
      });
    });

    it("decodes tag in metadata", async () => {
      const params = Promise.resolve({ year: "2025", tag: "Machine%20Learning" });
      const metadata = await generateMetadata({ params });
      expect(metadata.title).toBe('Talks tagged "Machine Learning" - DevBcn 2025');
    });
  });

  describe("generateStaticParams", () => {
    it("returns static params for all tags across years", async () => {
      const params = await generateStaticParams();
      expect(params).toEqual(
        expect.arrayContaining([
          { year: "2025", tag: "Java" },
          { year: "2025", tag: "Cloud" },
          { year: "2025", tag: "Kubernetes" },
          { year: "2025", tag: "JavaScript" },
        ])
      );
    });

    it("handles errors when fetching talks gracefully", async () => {
      (getTalks as jest.Mock).mockRejectedValueOnce(new Error("API Error"));
      const params = await generateStaticParams();
      expect(params).toEqual([]);
    });
  });
});
