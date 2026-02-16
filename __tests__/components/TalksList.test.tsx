import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import TalksList from "@/components/layout/TalksList";
import { Talk } from "@/hooks/types";
jest.mock("@/lib/shared/talk-filters", () => ({
  filterTalks: jest.fn((talks: Talk[]) => talks),
}));

jest.mock("@/hooks/useTalks", () => ({
  groupTalksByTrack: jest.fn((talks: Talk[]) => {
    const map = new Map();
    if (talks && talks.length > 0) {
      map.set("Track A", [talks[0], talks[1]]);
      map.set("Track B", [talks[2]]);
    }
    return map;
  }),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: jest.fn((key: string) => {
      if (key === "track") return "";
      if (key === "q") return "";
      return null;
    }),
  }),
  usePathname: () => "/2025/talks",
  useRouter: () => ({
    replace: jest.fn(),
    push: jest.fn(),
  }),
}));

jest.mock("@/components/layout/TalksFilterBar", () => ({
  __esModule: true,
  default: function TalksFilterBarMock() {
    return <div data-testid="talks-filter-bar">Talks Filter Bar</div>;
  },
}));

jest.mock("@/components/layout/TalkCard", () => ({
  __esModule: true,
  default: function TalkCardMock({ talk }: { talk: Talk }) {
    return <div data-testid="talk-card">{talk.title}</div>;
  },
}));

describe("TalksList", () => {
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
      questionAnswers: [],
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
      roomId: 1,
      room: "Room 1",
      liveUrl: null,
      recordingUrl: null,
      status: "published",
      isInformed: true,
      isConfirmed: true,
      questionAnswers: [],
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
      roomId: 1,
      room: "Room 1",
      liveUrl: null,
      recordingUrl: null,
      status: "published",
      isInformed: true,
      isConfirmed: true,
      questionAnswers: [],
    },
  ];
  const mockTracks = ["Track A", "Track B"];
  const year = 2025;

  it("renders filters and talk lists", () => {
    render(<TalksList talks={mockTalks} tracks={mockTracks} year={year} />);

    expect(screen.getByTestId("talks-filter-bar")).toBeInTheDocument();

    expect(screen.getByText("Track A")).toBeInTheDocument();
    expect(screen.getByText("Track B")).toBeInTheDocument();

    expect(screen.getByText("Talk 1")).toBeInTheDocument();
    expect(screen.getByText("Talk 2")).toBeInTheDocument();
    expect(screen.getByText("Talk 3")).toBeInTheDocument();
  });

  it("renders correct layout structure", () => {
    const { container } = render(<TalksList talks={mockTalks} tracks={mockTracks} year={year} />);

    expect(container.getElementsByClassName("talks-grouped").length).toBeGreaterThan(0);

    const rows = container.getElementsByClassName("row");
    expect(rows.length).toBeGreaterThan(0);
  });
});
