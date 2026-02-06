import { render, screen } from "@testing-library/react";
import Footer8 from "@/components/layout/footer/Footer8";

// Mock usePathname since Footer8 uses it
jest.mock("next/navigation", () => ({
  usePathname: () => "/2026",
}));

describe("Footer8", () => {
  it("renders optimized background image", () => {
    render(<Footer8 />);

    // Check if the optimized image is present
    // Note: We are asserting that the image SHOULD be there (after optimization)
    const img = screen.getByAltText("Footer Background");
    expect(img).toBeInTheDocument();

    // Check if it has the correct src
    // Next.js Image component modifies the src, so we check if it contains the original path
    expect(img.getAttribute("src")).toContain("header-bg21.png");
  });
});
