import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import AmaDetails from "@/components/sections/ama/AmaDetails";

describe("AmaDetails Component", () => {
  it("renders correctly with given year", () => {
    render(<AmaDetails year="2026" />);

    expect(screen.getByText("Interactive Q&A: Dynamic Conversations")).toBeInTheDocument();
    expect(screen.getByText(/Ask Me Anything sessions/i)).toBeInTheDocument();
    expect(screen.getByText("Limited Capacity")).toBeInTheDocument();
    expect(screen.getByText("Up to 6 attendees per session")).toBeInTheDocument();
  });

  it("contains the AMA image", () => {
    render(<AmaDetails year="2026" />);
    const image = screen.getByAltText("AMA Sessions at DevBcn");
    expect(image).toBeInTheDocument();
  });
});
