import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import SpeakerCard from "@/components/layout/SpeakerCard";

describe("SpeakerCard Component", () => {
  const mockSpeaker = {
    name: "John Doe",
    position: "Senior Developer",
    image: "/assets/img/speakers/john.jpg",
    links: [
      { title: "Twitter", url: "https://twitter.com/johndoe", linkType: "Twitter" },
      { title: "LinkedIn", url: "https://linkedin.com/in/johndoe", linkType: "LinkedIn" },
    ],
    speakerId: "john-doe",
    year: 2026,
  };

  it("matches snapshot with full data", () => {
    const { container } = render(<SpeakerCard {...mockSpeaker} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot without position", () => {
    const speakerWithoutPosition = { ...mockSpeaker, position: "" };
    const { container } = render(<SpeakerCard {...speakerWithoutPosition} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot without social links", () => {
    const speakerWithoutLinks = { ...mockSpeaker, links: [] };
    const { container } = render(<SpeakerCard {...speakerWithoutLinks} />);
    expect(container).toMatchSnapshot();
  });
});
