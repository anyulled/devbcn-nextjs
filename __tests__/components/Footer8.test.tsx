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
  it("renders optimized background image", async () => {
    const Footer8 = (await import("@/components/layout/footer/Footer8")).default;
    render(<Footer8 />);

    const img = screen.getByRole("img", { name: "Footer Background" });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("header-bg21.png");
  });

  it("renders layer1 decorative image with explicit dimensions", async () => {
    const Footer8 = (await import("@/components/layout/footer/Footer8")).default;
    const { container } = render(<Footer8 />);

    const layer1 = container.querySelector('img[src*="layer1.png"]');
    expect(layer1).toBeInTheDocument();
    expect(layer1?.getAttribute("width")).toBe("1440");
    expect(layer1?.getAttribute("height")).toBe("230");
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
