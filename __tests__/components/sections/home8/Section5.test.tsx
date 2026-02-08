import { render, screen } from "@testing-library/react";
import Section5 from "@/components/sections/home8/section5";
import { Speaker } from "@/hooks/types";

// Mock Swiper
jest.mock("swiper/react", () => ({
  Swiper: function Swiper({ children }: any) {
    return <div data-testid="swiper">{children}</div>;
  },
  SwiperSlide: function SwiperSlide({ children }: any) {
    return <div data-testid="swiper-slide">{children}</div>;
  },
}));

jest.mock("swiper/modules", () => ({
  Autoplay: jest.fn(),
  Navigation: jest.fn(),
  Pagination: jest.fn(),
}));

// Mock Link
jest.mock("next/link", () => {
  return function Link({ children, href }: any) {
    return <a href={href}>{children}</a>;
  };
});

describe("Section5", () => {
  const mockSpeakers: Speaker[] = [
    {
      id: "1",
      fullName: "Speaker One",
      tagLine: "Developer at Company",
      profilePicture: "https://example.com/speaker1.jpg",
      firstName: "Speaker",
      lastName: "One",
      bio: "Bio",
      sessions: [],
      isTopSpeaker: false,
      links: [],
      questionAnswers: [],
      categories: [],
    },
  ];

  it("renders speakers and images correctly", () => {
    render(<Section5 year="2025" speakers={mockSpeakers} totalSpeakers={1} />);

    expect(screen.getByText("Speaker One")).toBeInTheDocument();
    expect(screen.getByText("1 Event Speakers")).toBeInTheDocument();

    // Check background image
    const bgImg = screen.getByAltText("Background");
    expect(bgImg).toBeInTheDocument();
    expect(decodeURIComponent(bgImg.getAttribute("src") || "")).toContain("/assets/img/bg/header-bg20.png");

    // Check speaker image
    const speakerImg = screen.getByAltText("Speaker One");
    expect(speakerImg).toBeInTheDocument();
    expect(decodeURIComponent(speakerImg.getAttribute("src") || "")).toContain("https://example.com/speaker1.jpg");
  });
});
