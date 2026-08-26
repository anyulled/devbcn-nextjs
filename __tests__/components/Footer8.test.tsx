import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";

jest.mock("next/navigation", () => ({
  __esModule: true,
  usePathname: jest.fn(() => "/2026"),
}));

describe("Footer8", () => {
  it("does not render a footer background image", async () => {
    const Footer8 = (await import("@/components/layout/footer/Footer8")).default;
    render(<Footer8 />);

    expect(screen.queryByRole("img", { name: "Footer Background" })).not.toBeInTheDocument();
  });

  it("does not render a decorative footer background image", async () => {
    const Footer8 = (await import("@/components/layout/footer/Footer8")).default;
    const { container } = render(<Footer8 />);

    const layer1 = container.querySelector('img[src*="layer1.png"]');
    expect(layer1).not.toBeInTheDocument();
  });

  it("renders logo image with explicit dimensions", async () => {
    const Footer8 = (await import("@/components/layout/footer/Footer8")).default;
    render(<Footer8 />);

    const logo = screen.getByRole("img", { name: "devBcn" });
    expect(logo).toBeInTheDocument();
    expect(logo.getAttribute("width")).toBe("150");
    expect(logo.getAttribute("height")).toBe("76");
  });
});
