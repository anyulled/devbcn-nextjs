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
  it.each(["/", "/2027", "/2027/"])("uses the compact footer on the 2027 home page at %s", async (pathname) => {
    const { usePathname } = await import("next/navigation");
    jest.mocked(usePathname).mockReturnValue(pathname);
    const Footer8 = (await import("@/components/layout/footer/Footer8")).default;
    const { container } = render(<Footer8 />);

    expect(container.querySelector(".footer8-sertion-area--compact")).toBeInTheDocument();
    expect(container.querySelector('img[src*="layer1.png"]')).not.toBeInTheDocument();
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    jest.mocked(usePathname).mockReturnValue("/2026");
  });

  it("renders logo image with explicit dimensions", async () => {
    const Footer8 = (await import("@/components/layout/footer/Footer8")).default;
    render(<Footer8 />);

    const logo = screen.getByRole("img", { name: "devBcn" });
    expect(logo).toHaveAttribute("src", "/assets/img/logo/devBcn.webp");
    expect(logo).toBeInTheDocument();
    expect(logo.getAttribute("width")).toBe("150");
    expect(logo.getAttribute("height")).toBe("76");
  });

  it.each(["/about-us", "/about-devbcn", "/2026", "/2027/sponsorship"])("omits footer artwork on %s", async (pathname) => {
    const { usePathname } = await import("next/navigation");
    jest.mocked(usePathname).mockReturnValue(pathname);
    const Footer8 = (await import("@/components/layout/footer/Footer8")).default;
    const { container } = render(<Footer8 />);

    expect(container.querySelector(".footer8-sertion-area > img")).not.toBeInTheDocument();
    jest.mocked(usePathname).mockReturnValue("/2026");
  });
});
