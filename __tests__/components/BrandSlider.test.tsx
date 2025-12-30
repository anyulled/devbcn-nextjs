import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BrandSlider from "../../components/slider/BrandSlider";

// Mock Swiper components
jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
}));

// Mock Swiper modules
jest.mock("swiper/modules", () => ({
  Autoplay: jest.fn(),
  Navigation: jest.fn(),
  Pagination: jest.fn(),
}));

// Mock edition configurations
jest.mock("@/config/editions/2023", () => ({
  edition2023: {
    sponsorsData: {
      top: [{ name: "Sponsor A", image: "/img/a.png" }],
      premium: [{ name: "Sponsor B", image: "/img/b.png" }],
    },
  },
}));

jest.mock("@/config/editions/2024", () => ({
  edition2024: {
    sponsorsData: {
      top: [{ name: "Sponsor A", image: "/img/a_new.png" }], // Duplicate name
      premium: [{ name: "Sponsor C", image: "/img/c.png" }],
    },
  },
}));

jest.mock("@/config/editions/2025", () => ({
  edition2025: {
    sponsorsData: {
      top: [{ name: "Sponsor D", image: "/img/d.png" }],
      premium: [],
    },
  },
}));

describe("BrandSlider", () => {
  it("renders without crashing", () => {
    render(<BrandSlider />);
    expect(screen.getByTestId("swiper")).toBeInTheDocument();
  });

  it("aggregates and deduplicates sponsors from all editions", () => {
    render(<BrandSlider />);

    // Should contain Sponsor A, B, C, D
    // Sponsor A is in both 2023 and 2024, so it should appear only once.
    // Total unique sponsors: 4
    const slides = screen.getAllByTestId("swiper-slide");
    expect(slides).toHaveLength(4);

    expect(screen.getByAltText("Sponsor A")).toBeInTheDocument();
    expect(screen.getByAltText("Sponsor B")).toBeInTheDocument();
    expect(screen.getByAltText("Sponsor C")).toBeInTheDocument();
    expect(screen.getByAltText("Sponsor D")).toBeInTheDocument();
  });
});
