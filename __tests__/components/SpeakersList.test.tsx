import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
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
      firstName: "Speaker",
      lastName: "One",
      fullName: "Speaker One",
      bio: "Bio 1",
      tagLine: "Dev",
      profilePicture: "img1.jpg",
      isTopSpeaker: false,
      links: [],
      sessions: [],
      questionAnswers: [],
      categories: [],
    },
    {
      id: "2",
      firstName: "Speaker",
      lastName: "Two",
      fullName: "Speaker Two",
      bio: "Bio 2",
      tagLine: "Dev",
      profilePicture: "img2.jpg",
      isTopSpeaker: false,
      links: [],
      sessions: [],
      questionAnswers: [],
      categories: [],
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
