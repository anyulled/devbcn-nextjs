import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock next/navigation BEFORE imports
jest.mock("next/navigation", () => ({
  __esModule: true,
  usePathname: jest.fn(() => "/2026"),
}));

describe("Footer8", () => {
  it("renders optimized background image", async () => {
    const Footer8 = (await import("@/components/layout/footer/Footer8")).default;
    render(<Footer8 />);

    const img = screen.getByRole("img", { name: "Footer Background" });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("header-bg21.png");
  });
});
