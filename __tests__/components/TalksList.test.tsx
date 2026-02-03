import { render, screen } from "@testing-library/react";
import TalksList from "@/components/layout/TalksList";
import { Talk } from "@/hooks/types";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: jest.fn((key) => {
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

// Mock child components to simplify test and focus on layout
jest.mock("@/components/layout/TrackFilter", () => ({
  __esModule: true,
  default: () => <div data-testid="track-filter">Track Filter</div>,
}));

jest.mock("@/components/layout/SearchFilter", () => ({
  __esModule: true,
  default: () => <div data-testid="search-filter">Search Filter</div>,
}));

jest.mock("@/components/layout/TalkCard", () => ({
  __esModule: true,
  default: ({ talk }: { talk: Talk }) => <div data-testid="talk-card">{talk.title}</div>,
}));

describe("TalksList", () => {
  const mockTalks: Talk[] = [
    {
      id: "1",
      title: "Talk 1",
      description: "Description 1",
      track: "Track A",
      speakers: [],
    },
    {
      id: "2",
      title: "Talk 2",
      description: "Description 2",
      track: "Track A",
      speakers: [],
    },
    {
      id: "3",
      title: "Talk 3",
      description: "Description 3",
      track: "Track B",
      speakers: [],
    },
  ];
  const mockTracks = ["Track A", "Track B"];
  const year = 2025;

  it("renders filters and talk lists", () => {
    render(<TalksList talks={mockTalks} tracks={mockTracks} year={year} />);

    // Verify Filters are present
    expect(screen.getByTestId("track-filter")).toBeInTheDocument();
    expect(screen.getByTestId("search-filter")).toBeInTheDocument();

    // Verify Tracks headings
    expect(screen.getByText("Track A")).toBeInTheDocument();
    expect(screen.getByText("Track B")).toBeInTheDocument();

    // Verify Talk Cards
    expect(screen.getByText("Talk 1")).toBeInTheDocument();
    expect(screen.getByText("Talk 2")).toBeInTheDocument();
    expect(screen.getByText("Talk 3")).toBeInTheDocument();
  });

  it("renders correct layout structure", () => {
    const { container } = render(<TalksList talks={mockTalks} tracks={mockTracks} year={year} />);

    // Check for the new wrapper class ensuring styles
    expect(container.getElementsByClassName("blog-details-section").length).toBeGreaterThan(0);

    // Check that we have a grid system in place (generic check)
    const rows = container.getElementsByClassName("row");
    expect(rows.length).toBeGreaterThan(0);
  });
});
