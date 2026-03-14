import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import RelatedTalks from "@/components/talks/RelatedTalks";
import { Speaker, Talk } from "@/hooks/types";

const mockRelatedTalks: Talk[] = [
  {
    id: "talk-2",
    title: "Advanced React Patterns",
    description: "Learn advanced React",
    startsAt: "2026-06-15T14:00:00",
    endsAt: "2026-06-15T15:00:00",
    isServiceSession: false,
    isPlenumSession: false,
    speakers: [{ id: "speaker-1", name: "John Doe" }],
    categories: [],
    roomId: 2,
    room: "Room B",
    liveUrl: null,
    recordingUrl: null,
    status: "confirmed",
    isInformed: true,
    isConfirmed: true,
    questionAnswers: [],
  },
];

const mockSpeakersMap = new Map<string, Speaker[]>([
  [
    "talk-2",
    [
      {
        id: "speaker-1",
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe",
        bio: "Experienced developer",
        tagLine: "Senior Developer",
        profilePicture: "/assets/img/speakers/john.jpg",
        sessions: [],
        isTopSpeaker: false,
        links: [],
        questionAnswers: [],
        categories: [],
      },
    ],
  ],
]);

describe("RelatedTalks Component", () => {
  it("matches snapshot with talks", () => {
    const { container } = render(<RelatedTalks relatedTalks={mockRelatedTalks} relatedTalksSpeakers={mockSpeakersMap} year="2026" />);
    expect(container).toMatchSnapshot();
  });

  it("returns null when no talks", () => {
    const { container } = render(<RelatedTalks relatedTalks={[]} relatedTalksSpeakers={new Map()} year="2026" />);
    expect(container).toMatchSnapshot();
  });
});
