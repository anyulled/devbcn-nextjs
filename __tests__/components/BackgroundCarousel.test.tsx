/**
 * @jest-environment jsdom
 */

import BackgroundCarousel from "@/components/BackgroundCarousel";
import { render, screen } from "@testing-library/react";

// Mock Swiper
jest.mock("swiper/react", () => ({
  Swiper: ({ children, className }: any) => (
    <div className={`swiper ${className || ""}`} data-testid="swiper">
      {children}
    </div>
  ),
  SwiperSlide: ({ children, className }: any) => (
    <div className={`swiper-slide ${className || ""}`} data-testid="swiper-slide">
      {children}
    </div>
  ),
}));

jest.mock("swiper/modules", () => ({
  Autoplay: jest.fn(),
  EffectFade: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("BackgroundCarousel", () => {
  it("renders children content", () => {
    render(
      <BackgroundCarousel>
        <div data-testid="test-content">Test Content</div>
      </BackgroundCarousel>
    );
    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders swiper container and slides", () => {
    render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    expect(screen.getByTestId("swiper")).toBeInTheDocument();
    const slides = screen.getAllByTestId("swiper-slide");
    // We expect 8 images in the IMAGES array
    expect(slides.length).toBe(8);
  });

  it("renders gradient and vignette overlays", () => {
    const { container } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    expect(container.querySelector(".background-carousel__gradient")).toBeInTheDocument();
    expect(container.querySelector(".background-carousel__vignette")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <BackgroundCarousel className="custom-test-class">
        <div>Content</div>
      </BackgroundCarousel>
    );

    const mainDiv = container.querySelector(".background-carousel");
    expect(mainDiv).toHaveClass("custom-test-class");
  });
});
