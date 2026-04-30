import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import MentoringDetails from "@/components/sections/mentoring/MentoringDetails";

describe("MentoringDetails Component", () => {
  it("renders correctly with given year", () => {
    render(<MentoringDetails year="2026" />);

    expect(screen.getByText("Speaking Mentoring")).toBeInTheDocument();
    expect(screen.getByText(/Elevate your public speaking/i)).toBeInTheDocument();
    expect(screen.getByText("Small Groups")).toBeInTheDocument();
    expect(screen.getByText("Up to 10 attendees per session")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to Home/i })).toHaveAttribute("href", "/2026");
  });

  it("contains the mentoring image", () => {
    render(<MentoringDetails year="2026" />);
    const image = screen.getByAltText("Speaking Mentoring at DevBcn");
    expect(image).toBeInTheDocument();
  });
});
