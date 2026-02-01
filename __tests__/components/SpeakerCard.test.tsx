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

    mockLinks.forEach((mockLink) => {
      const linkElement = links.find((l) => l.getAttribute("href") === mockLink.url);
      expect(linkElement).toBeInTheDocument();
    });
  });

  it("does not render missing social links", () => {
     const propsWithNoLinks = {
        ...defaultProps,
        links: []
     };
     render(<SpeakerCard {...propsWithNoLinks} />);

     const links = screen.getAllByRole("link");
     // Should only contain link to speaker page (x2) and share button
     // Speaker page image, Share button, Speaker page name
     // Actually let's just verify specific social links are absent

     expect(links.some(l => l.getAttribute("href")?.includes("twitter"))).toBe(false);
     expect(links.some(l => l.getAttribute("href")?.includes("linkedin"))).toBe(false);
  });
});
