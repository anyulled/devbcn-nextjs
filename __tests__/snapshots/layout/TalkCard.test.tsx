import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import TalkCard from "@/components/layout/TalkCard";
import { Talk } from "@/hooks/types";

jest.mock("@/hooks/useTalks", () => ({
  getLevelFromTalk: () => "Beginner",
  getLevelStars: () => "★",
  getTagsFromTalk: () => ["Java", "Testing"],
  getTrackFromTalk: () => "Core Java",
}));

describe("TalkCard Component", () => {
  const mockTalk: Talk = {
    id: "talk-123",
    title: "Test Driven Development",
    description: "Learn TDD best practices",
    startsAt: "2026-06-15T10:00:00",
    endsAt: "2026-06-15T11:00:00",
    isServiceSession: false,
    isPlenumSession: false,
    speakers: [{ id: "speaker-1", name: "John Doe" }],
    categories: [],
    roomId: 1,
    room: "Room A",
    liveUrl: null,
    recordingUrl: null,
    status: "confirmed",
    isInformed: true,
    isConfirmed: true,
    questionAnswers: [],
  };

  it("matches snapshot with complete talk data", () => {
    const { container } = render(<TalkCard talk={mockTalk} year={2026} />);
    expect(container).toMatchSnapshot();
  });
});
