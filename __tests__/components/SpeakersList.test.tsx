import { render, screen } from "@testing-library/react";
import SpeakersList from "@/components/layout/SpeakersList";
import { Speaker } from "@/hooks/types";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: jest.fn(() => ""), // return empty string for 'q'
  }),
}));

// Mock child components
jest.mock("@/components/layout/SearchFilter", () => ({
  __esModule: true,
  default: () => <div data-testid="search-filter">Search Filter</div>,
}));

jest.mock("@/components/layout/SpeakerCard", () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid="speaker-card">{name}</div>,
}));

describe("SpeakersList", () => {
  const mockSpeakers: Speaker[] = [
    {
      id: "1",
      fullName: "Speaker One",
      tagLine: "Dev",
      profilePicture: "img1.jpg",
      links: [],
      sessions: [],
    },
    {
      id: "2",
      fullName: "Speaker Two",
      tagLine: "Dev",
      profilePicture: "img2.jpg",
      links: [],
      sessions: [],
    },
  ];
  const year = 2025;

  it("renders search filter and speaker list", () => {
    render(<SpeakersList speakers={mockSpeakers} year={year} />);

    expect(screen.getByTestId("search-filter")).toBeInTheDocument();
    expect(screen.getByText("Speaker One")).toBeInTheDocument();
    expect(screen.getByText("Speaker Two")).toBeInTheDocument();
  });

  it("renders correct layout structure", () => {
    const { container } = render(<SpeakersList speakers={mockSpeakers} year={year} />);

    // Check for search filter wrapper
    const filterWrapper = container.querySelector(".blog-details-section");
    expect(filterWrapper).toBeInTheDocument();

    // Check for grid classes
    // We expect speakers to use col-lg-3 for 4 items per row
    const speakerColumns = container.querySelectorAll(".col-lg-3");
    expect(speakerColumns.length).toBe(2); // Since we rendered 2 speakers
  });
});
