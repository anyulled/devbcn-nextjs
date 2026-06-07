import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/react";
import React from "react";
import MentoringDetails from "@/components/sections/mentoring/MentoringDetails";

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

describe("MentoringDetails Component", () => {
  it("renders correctly with given year", () => {
    render(<MentoringDetails year="2026" />);

    expect(screen.getByText("Master Your Message: Expert Mentoring")).toBeInTheDocument();
    expect(screen.getByText(/Elevate your public speaking/i)).toBeInTheDocument();
    expect(screen.getByText("Small Groups")).toBeInTheDocument();
    expect(screen.getByText("Up to 10 attendees per session")).toBeInTheDocument();
  });

  it("contains the mentoring image and schedule links", () => {
    const { container } = render(<MentoringDetails year="2026" />);
    const image = screen.getByAltText("Speaking Mentoring at DevBcn");
    expect(image).toBeInTheDocument();

    const timeBlock = Array.from(container.querySelectorAll(".session-schedule-time-block")).find((node) => node.textContent?.includes("11:25"));
    expect(timeBlock).toBeTruthy();
    const timeBlockQueries = within(timeBlock as HTMLElement);

    const speakerLink = timeBlockQueries.getByRole("link", { name: "Victor Rentea" });
    expect(speakerLink).toHaveAttribute("href", "/2026/speakers/8f5f4c31-232b-4e04-b736-6b2775c939cf");
    expect(timeBlockQueries.queryByRole("link", { name: "Bruno Souza" })).not.toBeInTheDocument();
    expect(timeBlockQueries.queryByRole("link", { name: "Paolo Ricciuti" })).not.toBeInTheDocument();
    expect(container.querySelectorAll(".session-schedule-speaker-avatar-image")).toHaveLength(8);
  });
});
