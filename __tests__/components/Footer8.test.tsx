import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer8 from "@/components/layout/footer/Footer8";

jest.mock("next/navigation", () => ({
  usePathname: () => "/2026",
}));

describe("Footer8", () => {
  it("renders optimized background image", () => {
    render(<Footer8 />);

    const img = screen.getByRole("img", { name: "Footer Background" });
    expect(img).toBeInTheDocument();

    expect(img.getAttribute("src")).toContain("header-bg21.png");
  });
});
