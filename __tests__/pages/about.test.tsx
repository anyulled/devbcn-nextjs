import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock the components
jest.mock("@/components/layout/Layout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>,
}));

jest.mock("@/components/layout/PageHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

jest.mock("@/components/elements/AboutCounter", () => ({
  __esModule: true,
  default: () => <div data-testid="about-counter">About Counter</div>,
}));

jest.mock("@/components/elements/Countdown", () => ({
  __esModule: true,
  default: () => <div data-testid="countdown">Countdown</div>,
}));

jest.mock("@/components/slider/BrandSlider", () => ({
  __esModule: true,
  default: () => <div data-testid="brand-slider">Brand Slider</div>,
}));

describe("About Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the about page and images", async () => {
    // Dynamic import to ensure mocks are applied
    const About = (await import("@/app/about/page")).default;
    const { container } = render(<About />);

    // Check for main structural elements
    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(screen.getByTestId("page-header")).toBeInTheDocument();

    /*
     * Check for images
     * Since we check for <img> tags which might have alt="" (role=presentation), querySelectorAll is safer.
     */
    const images = container.querySelectorAll("img");
    expect(images.length).toBeGreaterThan(0);

    // Check specific images by src attribute
    const imagesArray = Array.from(images);
    const img1 = imagesArray.find((img) => (img as HTMLImageElement).src.includes("about-img1.png"));
    expect(img1).toBeInTheDocument();
  });
});
