import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import type { Talk } from "@/hooks/types";

// Mock next/navigation BEFORE imports
jest.mock("next/navigation", () => ({
  __esModule: true,
  useSearchParams: jest.fn(() => ({
    get: jest.fn((key: string) => {
      if (key === "track") return "";
      if (key === "q") return "";
      return "";
    }),
  })),
  usePathname: jest.fn(() => "/2025/talks"),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  })),
}));

// Mock other dependencies
jest.mock("@/lib/shared/talk-filters", () => ({
  __esModule: true,
  filterTalks: jest.fn((talks: unknown[]) => talks),
}));

jest.mock("@/hooks/useTalks", () => ({
  __esModule: true,
  groupTalksByTrack: jest.fn((talks: Talk[]) => {
    const map = new Map<string, Talk[]>();
    if (talks && talks.length > 0) {
      map.set("Track A", [talks[0], talks[1]]);
      map.set("Track B", [talks[2]]);
    }
    return map;
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
  default: function TalkCardMock({ talk }: { talk: { title: string } }) {
    return <div data-testid="talk-card">{talk.title}</div>;
  },
}));

describe("TalksList", () => {
  const mockTalks = [
    { id: "1", title: "Talk 1", startsAt: "2025-07-10T10:00:00Z" },
    { id: "2", title: "Talk 2", startsAt: "2025-07-10T11:00:00Z" },
    { id: "3", title: "Talk 3", startsAt: "2025-07-10T12:00:00Z" },
  ] as Talk[];
  const mockTracks = ["Track A", "Track B"];
  const year = 2025;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders filters and talk lists", async () => {
    const TalksList = (await import("@/components/layout/TalksList")).default;
    render(<TalksList talks={mockTalks} tracks={mockTracks} year={year} />);

    expect(screen.getByTestId("talks-filter-bar")).toBeInTheDocument();
    expect(screen.getByText("Track A")).toBeInTheDocument();
    expect(screen.getByText("Track B")).toBeInTheDocument();
  });

  it("renders correct layout structure", async () => {
    const TalksList = (await import("@/components/layout/TalksList")).default;
    const { container } = render(<TalksList talks={mockTalks} tracks={mockTracks} year={year} />);
    expect(container.getElementsByClassName("talks-grouped").length).toBeGreaterThan(0);
  });
});
