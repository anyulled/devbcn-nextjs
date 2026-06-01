import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import TalkContent from "@/components/talks/TalkContent";
import { Speaker, Talk } from "@/hooks/types";

const mockTalk: Talk = {
  id: "talk-1",
  title: "Introduction to React",
  description: "Learn the basics of React",
  startsAt: "2026-06-15T10:00:00",
  endsAt: "2026-06-15T11:00:00",
  isServiceSession: false,
  isPlenumSession: false,
  speakers: [{ id: "speaker-1", name: "John Doe" }],
  categories: [],
  roomId: 1,
  room: "Room A",
  liveUrl: null,
  recordingUrl: "https://youtube.com/watch?v=test",
  status: "confirmed",
  isInformed: true,
  isConfirmed: true,
  questionAnswers: [],
};

const mockSpeakers: Speaker[] = [
  {
    id: "speaker-1",
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    bio: "Experienced developer",
    tagLine: "Senior Developer",
    profilePicture: "/assets/img/speakers/john.jpg",
    sessions: [{ id: 1, name: "Introduction to React" }],
    isTopSpeaker: true,
    links: [{ title: "Twitter", url: "https://twitter.com/johndoe", linkType: "Twitter" }],
    questionAnswers: [],
    categories: [],
  },
];

const mockEventData = {
  venue: { name: "World Trade Center", mapUrl: "https://maps.google.com" },
  tickets: { url: "https://tickets.devbcn.com" },
};

describe("TalkContent Component", () => {
  it("matches snapshot with full data", () => {
    const { container } = render(
      <TalkContent
        talk={mockTalk}
        speakers={mockSpeakers}
        year="2026"
        tags={["React", "JavaScript"]}
        slidesUrl="https://slides.com"
        voteUrl="https://openfeedback.io/devbcn26/2026-06-15/talk-1"
        eventData={mockEventData}
        track="Web Development"
        level="Beginner"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
