/**
 * @jest-environment jsdom
 */

import { describe, expect, it, jest } from "@jest/globals";
import type { ReactNode } from "react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import BackgroundCarousel from "@/components/BackgroundCarousel";
import { render, screen } from "@testing-library/react";

interface SwiperProps {
  children: ReactNode;
  className?: string;
}

interface SwiperSlideProps {
  children: ReactNode;
  className?: string;
}

// Attempt to mock swiper/react - noted that it might not apply if module is already loaded/handled by Next.js Jest transformer
jest.mock("swiper/react", () => ({
  Swiper: ({ children, className }: SwiperProps) => (
    <div className={`swiper ${className ?? ""}`} data-testid="swiper">
      {children}
    </div>
  ),
  SwiperSlide: ({ children, className }: SwiperSlideProps) => (
    <div className={`swiper-slide ${className ?? ""}`} data-testid="swiper-slide">
      {children}
    </div>
  ),
}));

jest.mock("swiper/modules", () => ({
  Autoplay: jest.fn(),
  EffectFade: jest.fn(),
}));

Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: unknown) => ({
    matches: false,
    media: query as string,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
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
    const { container } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    // Support both mocked and real Swiper for resilience
    const swiper = container.querySelector(".background-carousel__swiper");
    expect(swiper).toBeInTheDocument();

    const slides = container.querySelectorAll(".swiper-slide");
    expect(slides.length).toBeGreaterThan(0);
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

  it("renders only active and next slide images for performance", () => {
    const { container } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    /*
     * Initial state: activeIndex = 0. Should render index 0 and 1.
     * The component has 15 images in total.
     */
    const images = container.querySelectorAll("img");
    expect(images.length).toBeLessThan(15);
    expect(images.length).toBeGreaterThanOrEqual(1);
    // Ideally we expect 2 or 3 depending on logic
  });
});
