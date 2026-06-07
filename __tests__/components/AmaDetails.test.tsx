import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import AmaDetails from "@/components/sections/ama/AmaDetails";

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>;
  MockLink.displayName = "MockLink";
  return {
    __esModule: true,
    default: MockLink,
  };
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill: _fill, priority: _priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => (
    <img alt="" {...props} />
  ),
}));

describe("AmaDetails Component", () => {
  it("renders correctly with given year", () => {
    render(<AmaDetails year="2026" />);

    expect(screen.getByText("Interactive Q&A: Dynamic Conversations")).toBeInTheDocument();
    expect(screen.getByText(/Ask Me Anything sessions/i)).toBeInTheDocument();
    expect(screen.getByText("Limited Capacity")).toBeInTheDocument();
    expect(screen.getByText("Up to 6 attendees per session")).toBeInTheDocument();
  });

  it("contains the AMA image and schedule links", () => {
    const { container } = render(<AmaDetails year="2026" />);
    const image = screen.getByAltText("AMA Sessions at DevBcn");
    expect(image).toBeInTheDocument();

    const speakerLinks = screen.getAllByRole("link", { name: /Mauricio/i });
    expect(speakerLinks[0]).toHaveAttribute("href", "/2026/speakers/f44f5308-1287-4e6c-8f48-6ed26ea9f9d3");
    const avatar = container.querySelector(".session-schedule-speaker-avatar-image");
    expect(avatar).toHaveAttribute("src");
    expect(avatar?.getAttribute("src")).toContain("sessionize.com/image/");
  });
});
