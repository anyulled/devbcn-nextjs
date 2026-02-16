import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import TagPage, { generateMetadata, generateStaticParams } from "@/app/[year]/tags/[tag]/page";
import { getTagsFromTalk, getTalks } from "@/hooks/useTalks";
import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";

// Mock the hooks and next/navigation
jest.mock("@/hooks/useTalks", () => ({
  getTalks: jest.fn(),
  getTagsFromTalk: jest.fn(),
  groupTalksByTrack: jest.fn(),
  getTalkByYearAndId: jest.fn(),
  getTalkSpeakersWithDetails: jest.fn(),
  getRandomRelatedTalksByTrack: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

interface TalkCardProps {
  talk: { id: string; title: string };
}

jest.mock("@/components/layout/TalkCard", () => ({
  __esModule: true,
  default: ({ talk }: TalkCardProps) => <div data-testid="talk-card">{talk.title}</div>,
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

import { Talk } from "@/hooks/types";

describe("TagPage", () => {
  const mockTalks: Talk[] = [
    {
      id: "1",
      title: "Talk 1",
      description: "Description 1",
      startsAt: "2025-07-10T10:00:00Z",
      endsAt: "2025-07-10T11:00:00Z",
      isServiceSession: false,
      isPlenumSession: false,
      speakers: [],
      categories: [],
      roomId: 1,
      room: "Room 1",
      liveUrl: null,
      recordingUrl: null,
      status: "published",
      isInformed: true,
      isConfirmed: true,
      questionAnswers: [{ id: 101, question: "Tags/Topics", questionType: "ShortText", answer: "Java, Cloud", sort: 1, answerExtra: null }],
    },
    {
      id: "2",
      title: "Talk 2",
      description: "Description 2",
      startsAt: "2025-07-10T11:00:00Z",
      endsAt: "2025-07-10T12:00:00Z",
      isServiceSession: false,
      isPlenumSession: false,
      speakers: [],
      categories: [],
      roomId: 2,
      room: "Room 2",
      liveUrl: null,
      recordingUrl: null,
      status: "published",
      isInformed: true,
      isConfirmed: true,
      questionAnswers: [{ id: 102, question: "Tags/Topics", questionType: "ShortText", answer: "Cloud, Kubernetes", sort: 2, answerExtra: null }],
    },
    {
      id: "3",
      title: "Talk 3",
      description: "Description 3",
      startsAt: "2025-07-10T12:00:00Z",
      endsAt: "2025-07-10T13:00:00Z",
      isServiceSession: false,
      isPlenumSession: false,
      speakers: [],
      categories: [],
      roomId: 3,
      room: "Room 3",
      liveUrl: null,
      recordingUrl: null,
      status: "published",
      isInformed: true,
      isConfirmed: true,
      questionAnswers: [{ id: 103, question: "Tags/Topics", questionType: "ShortText", answer: "JavaScript", sort: 3, answerExtra: null }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(getTalks).mockResolvedValue([
      {
        sessions: mockTalks,
        groupId: 1,
        groupName: "Group 1",
      },
    ]);
    jest.mocked(getTagsFromTalk).mockImplementation((talk) => {
      const tags = (talk as Talk).questionAnswers.find((qa) => qa.question === "Tags/Topics")?.answer || "";
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
      } catch {
        // Ignore
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
      jest.mocked(getTalks).mockRejectedValueOnce(new Error("API Error"));
      const params = await generateStaticParams();
      expect(params).toEqual([]);
    });
  });
});
