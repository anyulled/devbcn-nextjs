import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import SpeakerContent from "@/components/speakers/SpeakerContent";
import type { Speaker } from "@/hooks/types";

jest.mock("@/components/layout/PageHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

jest.mock("@/components/sections/CTASection", () => ({
  __esModule: true,
  default: () => <div data-testid="cta-section" />,
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  usePathname: () => "/2026/speakers/speaker-1",
}));

const mockEventData = {
  showCountdown: true,
  venue: { name: "La Farga", mapUrl: "https://example.com/map" },
  tickets: { url: "https://example.com/tickets" },
  event: {
    startDay: new Date("2026-06-10T08:00:00Z"),
    endDay: new Date("2026-06-12T18:00:00Z"),
  },
};

const createSpeaker = (sessions: Speaker["sessions"]): Speaker => ({
  id: "speaker-1",
  firstName: "Carles",
  lastName: "Nuñez",
  fullName: "Carles Nuñez",
  bio: "Speaker bio",
  tagLine: "Product Engineer @ framer.com",
  profilePicture: "/assets/img/speakers/carles.jpg",
  sessions,
  isTopSpeaker: false,
  links: [],
  questionAnswers: [],
  categories: [],
});

describe("SpeakerContent", () => {
  it("renders sessions section with talk-detail layout contract", () => {
    const speaker = createSpeaker([
      { id: 1, name: "Killing iframe flicker" },
      { id: 2, name: "Advanced rendering" },
    ]);

    const { container } = render(<SpeakerContent speaker={speaker} year="2026" eventData={mockEventData} />);

    expect(screen.getByRole("heading", { name: "Sessions by Carles Nuñez" })).toBeInTheDocument();
    expect(container.querySelector(".event-single-section-area.sp1")).toBeTruthy();
    expect(container.querySelector(".event2-header.heading2.text-center")).toBeTruthy();
    expect(container.querySelector(".tab-content .tab-pane.fade.show.active")).toBeTruthy();
    expect(container.querySelectorAll(".event2-boxarea.box1")).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "View Session Details" })).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Killing iframe flicker" })).toHaveAttribute("href", "/2026/talks/1");
  });

  it("does not render sessions section when speaker has no sessions", () => {
    const speaker = createSpeaker([]);

    const { container } = render(<SpeakerContent speaker={speaker} year="2026" eventData={mockEventData} />);

    expect(screen.queryByRole("heading", { name: /Sessions by/i })).not.toBeInTheDocument();
    expect(container.querySelector(".event-single-section-area.sp1")).toBeNull();
  });

  it("matches inline snapshot when speaker has sessions", () => {
    const speaker = createSpeaker([{ id: 1, name: "Killing iframe flicker" }]);

    render(<SpeakerContent speaker={speaker} year="2026" eventData={mockEventData} />);
    expect(screen.getByRole("heading", { name: "Sessions by Carles Nuñez" })).toMatchInlineSnapshot(`
<h2>
  Sessions by Carles Nuñez
</h2>
`);
  });

  it("matches inline snapshot when speaker has no sessions", () => {
    const speaker = createSpeaker([]);

    render(<SpeakerContent speaker={speaker} year="2026" eventData={mockEventData} />);
    expect(screen.getByTestId("page-header")).toMatchInlineSnapshot(`
<div
  data-testid="page-header"
>
  Carles Nuñez
</div>
`);
  });
});
