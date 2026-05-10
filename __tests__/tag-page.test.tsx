import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import type { Talk } from "@/hooks/types";
type TalkQuestionAnswer = Talk["questionAnswers"][number];

// Mock modules
jest.mock("@/hooks/useTalks", () => ({
  __esModule: true,
  getTalks: jest.fn(),
  getTagsFromTalk: jest.fn(),
  groupTalksByTrack: jest.fn(),
  getTalkByYearAndId: jest.fn(),
  getTalkSpeakersWithDetails: jest.fn(),
  getRandomRelatedTalksByTrack: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  notFound: jest.fn(() => {
    throw new Error("notFound");
  }),
}));

jest.mock("@/components/layout/TalkCard", () => ({
  __esModule: true,
  default: ({ talk }: { talk: { id: string; title: string } }) => <div data-testid="talk-card">{talk.title}</div>,
}));

jest.mock("@/components/sections/CTASection", () => ({
  __esModule: true,
  default: () => <div data-testid="cta-section">CTA Section</div>,
}));

jest.mock("@/config/editions", () => ({
  __esModule: true,
  getEditionConfig: () => ({
    event: { startDay: new Date("2025-07-10"), endDay: new Date("2025-07-11") },
    venue: "Test Venue",
    tickets: { url: "http://test.com" },
  }),
  formatEventDateRange: jest.fn(() => "July 8-10, 2025"),
  getAvailableEditions: jest.fn(() => ["2025"]),
  getArchivedEditions: jest.fn(() => ["2025"]),
}));

describe("TagPage", () => {
  const mockTalks = [
    {
      id: "1",
      title: "Talk 1",
      description: "Description 1",
      startsAt: "2025-07-10T10:00:00Z",
      endsAt: "2025-07-10T11:00:00Z",
      speakers: [],
      questionAnswers: [{ question: "Tags/Topics", answer: "Java, Cloud" }],
    },
    {
      id: "2",
      title: "Talk 2",
      description: "Description 2",
      startsAt: "2025-07-10T11:00:00Z",
      endsAt: "2025-07-10T12:00:00Z",
      speakers: [],
      questionAnswers: [{ question: "Tags/Topics", answer: "Cloud, Kubernetes" }],
    },
    {
      id: "3",
      title: "Talk 3",
      description: "Description 3",
      startsAt: "2025-07-10T12:00:00Z",
      endsAt: "2025-07-10T13:00:00Z",
      speakers: [],
      questionAnswers: [{ question: "Tags/Topics", answer: "JavaScript" }],
    },
  ] as unknown as Talk[];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("TagPage component", () => {
    it("renders talks with matching matching tag", async () => {
      const { getTalks, getTagsFromTalk } = await import("@/hooks/useTalks");
      const TagPage = (await import("@/app/[year]/tags/[tag]/page")).default;

      jest.mocked(getTalks).mockResolvedValue([{ sessions: mockTalks, groupId: 1, groupName: "Group 1" }]);
      jest.mocked(getTagsFromTalk).mockImplementation((talk: Talk) => {
        const tags = talk.questionAnswers?.find((qa: TalkQuestionAnswer) => qa.question === "Tags/Topics")?.answer || "";
        return tags.split(",").map((tag: string) => tag.trim());
      });

      const params = Promise.resolve({ year: "2025", tag: "cloud" });
      const result = await TagPage({ params });
      render(result);

      expect(screen.getByText('Talks tagged "Cloud"')).toBeInTheDocument();
      expect(screen.getByText("Talk 1")).toBeInTheDocument();
      expect(screen.getByText("Talk 2")).toBeInTheDocument();
      expect(screen.queryByText("Talk 3")).not.toBeInTheDocument();
    });

    it("renders notFound when no talks match", async () => {
      const { getTalks, getTagsFromTalk } = await import("@/hooks/useTalks");
      const TagPage = (await import("@/app/[year]/tags/[tag]/page")).default;
      const { notFound } = await import("next/navigation");

      jest.mocked(getTalks).mockResolvedValue([{ sessions: mockTalks, groupId: 1, groupName: "Group 1" }]);
      jest.mocked(getTagsFromTalk).mockReturnValue([]);

      const params = Promise.resolve({ year: "2025", tag: "NonExistent" });
      await expect(TagPage({ params })).rejects.toThrow("notFound");
      expect(notFound).toHaveBeenCalled();
    });
  });

  describe("generateMetadata", () => {
    it("returns correct metadata", async () => {
      const { generateMetadata } = await import("@/app/[year]/tags/[tag]/page");
      const params = Promise.resolve({ year: "2025", tag: "Cloud" });
      const metadata = await generateMetadata({ params });
      expect(metadata.title).toBe('Talks tagged "Cloud" - DevBcn 2025');
    });
  });

  describe("generateStaticParams", () => {
    it("returns static params for all tags across years", async () => {
      const { getTalks, getTagsFromTalk } = await import("@/hooks/useTalks");
      const { generateStaticParams } = await import("@/app/[year]/tags/[tag]/page");

      jest.mocked(getTalks).mockResolvedValue([{ sessions: mockTalks, groupId: 1, groupName: "Group 1" }]);
      jest.mocked(getTagsFromTalk).mockImplementation((talk: Talk) => {
        const tags = talk.questionAnswers?.find((qa: TalkQuestionAnswer) => qa.question === "Tags/Topics")?.answer || "";
        return tags.split(",").map((tag: string) => tag.trim());
      });

      const params = await generateStaticParams();
      expect(params).toEqual(
        expect.arrayContaining([
          { year: "2025", tag: "java" },
          { year: "2025", tag: "cloud" },
          { year: "2025", tag: "kubernetes" },
          { year: "2025", tag: "javascript" },
        ])
      );
    });
  });
});
