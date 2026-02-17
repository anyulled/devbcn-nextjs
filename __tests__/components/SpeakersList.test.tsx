import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import type { Speaker } from "@/hooks/types";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  __esModule: true,
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ""),
  })),
  usePathname: jest.fn(() => "/2025/speakers"),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  })),
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
  const mockSpeakers = [
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
  ] as unknown as Speaker[];
  const year = 2025;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search filter and speaker list", async () => {
    const SpeakersList = (await import("@/components/layout/SpeakersList")).default;
    render(<SpeakersList speakers={mockSpeakers} year={year} />);

    expect(screen.getByTestId("speakers-filter-bar")).toBeInTheDocument();
    expect(screen.getByTestId("speaker-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("speaker-card-2")).toBeInTheDocument();
  });

  it("renders correct layout structure", async () => {
    const SpeakersList = (await import("@/components/layout/SpeakersList")).default;
    const { container } = render(<SpeakersList speakers={mockSpeakers} year={year} />);

    const filterWrapper = container.querySelector(".container");
    expect(filterWrapper).toBeInTheDocument();

    const speakerColums = container.querySelectorAll(".col-lg-3");
    expect(speakerColums.length).toBe(2);
  });
});
