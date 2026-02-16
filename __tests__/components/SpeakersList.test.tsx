import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SpeakersList from "@/components/layout/SpeakersList";
import { Speaker } from "@/hooks/types";

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: jest.fn(() => ""),
  }),
}));

// Mock child components
jest.mock("@/components/layout/SpeakersFilterBar", () => ({
  __esModule: true,
  default: function SpeakersFilterBarMock() {
    return <div data-testid="speakers-filter-bar">Speakers Filter Bar</div>;
  },
}));

jest.mock("@/components/layout/SpeakerCard", () => ({
  __esModule: true,
  default: function SpeakerCardMock({ name, speakerId }: { name: string; speakerId: string }) {
    return <div data-testid={`speaker-card-${speakerId}`}>{name}</div>;
  },
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
    // Wrap in Suspense since SpeakersList uses useSearchParams
    render(<SpeakersList speakers={mockSpeakers} year={year} />);

    expect(screen.getByTestId("speakers-filter-bar")).toBeInTheDocument();
    expect(screen.getByTestId("speaker-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("speaker-card-2")).toBeInTheDocument();
  });

  it("renders correct layout structure", () => {
    const { container } = render(<SpeakersList speakers={mockSpeakers} year={year} />);

    const filterWrapper = container.querySelector(".container");
    expect(filterWrapper).toBeInTheDocument();

    const speakerColums = container.querySelectorAll(".col-lg-3");
    expect(speakerColums.length).toBe(2);
  });
});
