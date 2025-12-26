import TagPage from "@/app/[year]/tags/[tag]/page";
import { getTalks } from "@/hooks/useTalks";
import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";

// Mock the hooks and next/navigation
jest.mock("@/hooks/useTalks", () => ({
  ...jest.requireActual("@/hooks/useTalks"),
  getTalks: jest.fn(),
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
  });

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
