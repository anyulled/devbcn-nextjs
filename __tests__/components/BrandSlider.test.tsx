import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock Swiper components
jest.mock("swiper/react", () => ({
  __esModule: true,
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
}));

// Mock Swiper modules
jest.mock("swiper/modules", () => ({
  __esModule: true,
  Autoplay: jest.fn(),
  Navigation: jest.fn(),
  Pagination: jest.fn(),
}));

// Mock edition configurations
jest.mock("@/config/editions/2023", () => ({
  __esModule: true,
  edition2023: {
    edition: "2023",
    sponsorsData: {
      top: [{ name: "Sponsor A", image: "/img/a.png" }],
      premium: [{ name: "Sponsor B", image: "/img/b.png" }],
    },
  },
}));

jest.mock("@/config/editions/2024", () => ({
  __esModule: true,
  edition2024: {
    edition: "2024",
    sponsorsData: {
      top: [{ name: "Sponsor A", image: "/img/a_new.png" }],
      premium: [{ name: "Sponsor C", image: "/img/c.png" }],
    },
  },
}));

jest.mock("@/config/editions/2025", () => ({
  __esModule: true,
  edition2025: {
    edition: "2025",
    sponsorsData: {
      top: [{ name: "Sponsor D", image: "/img/d.png" }],
      premium: [],
    },
  },
}));

describe("BrandSlider", () => {
  it("renders without crashing", async () => {
    const BrandSlider = (await import("../../components/slider/BrandSlider")).default;
    render(<BrandSlider />);
    expect(screen.getByTestId("swiper")).toBeInTheDocument();
  });

  it("aggregates and deduplicates sponsors from all editions", async () => {
    const BrandSlider = (await import("../../components/slider/BrandSlider")).default;
    render(<BrandSlider />);

    /*
     * Should contain Sponsor A, B, C, D
     * Sponsor A is in both 2023 and 2024, so it should appear only once.
     * Total unique sponsors: 4
     */
    const slides = screen.getAllByTestId("swiper-slide");
    expect(slides).toHaveLength(4);

    expect(screen.getByAltText("Sponsor A")).toBeInTheDocument();
    expect(screen.getByAltText("Sponsor B")).toBeInTheDocument();
    expect(screen.getByAltText("Sponsor C")).toBeInTheDocument();
    expect(screen.getByAltText("Sponsor D")).toBeInTheDocument();
  });
});
