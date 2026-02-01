import { render, screen } from "@testing-library/react";
import SpeakerCard from "../../components/layout/SpeakerCard";
import { Link as LinkType } from "../../hooks/types";

describe("SpeakerCard", () => {
  const mockLinks: LinkType[] = [
    { title: "Twitter", url: "https://twitter.com/johndoe", linkType: "Twitter" },
    { title: "LinkedIn", url: "https://linkedin.com/in/johndoe", linkType: "LinkedIn" },
    { title: "Instagram", url: "https://instagram.com/johndoe", linkType: "Instagram" },
    { title: "bluesky", url: "https://bsky.app/profile/johndoe.bsky.social", linkType: "bluesky" },
  ];

  const defaultProps = {
    name: "John Doe",
    position: "Software Engineer",
    image: "/path/to/image.jpg",
    links: mockLinks,
    speakerId: "johndoe",
    year: 2024,
  };

  it("renders speaker name and position", () => {
    render(<SpeakerCard {...defaultProps} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("renders social links with correct URLs", () => {
    render(<SpeakerCard {...defaultProps} />);

    // Instead, let's look for the hrefs
    const links = screen.getAllByRole("link");

    const twitterParams = links.find(l => l.getAttribute("href") === "https://twitter.com/johndoe");
    expect(twitterParams).toBeInTheDocument();

    const linkedinParams = links.find(l => l.getAttribute("href") === "https://linkedin.com/in/johndoe");
    expect(linkedinParams).toBeInTheDocument();

    const instagramParams = links.find(l => l.getAttribute("href") === "https://instagram.com/johndoe");
    expect(instagramParams).toBeInTheDocument();

    const blueskyParams = links.find(l => l.getAttribute("href") === "https://bsky.app/profile/johndoe.bsky.social");
    expect(blueskyParams).toBeInTheDocument();
  });

  it("does not render missing social links", () => {
    const propsWithNoLinks = {
      ...defaultProps,
      links: [],
    };
    render(<SpeakerCard {...propsWithNoLinks} />);

    const links = screen.getAllByRole("link");

    mockLinks.forEach((mockLink) => {
      expect(links.some((l) => l.getAttribute("href") === mockLink.url)).toBe(false);
    });
  });
});
