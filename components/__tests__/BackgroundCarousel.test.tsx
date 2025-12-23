/**
 * @jest-environment jsdom
 */

import { act, render } from "@testing-library/react";
import BackgroundCarousel from "../BackgroundCarousel";

// Mock timers
jest.useFakeTimers();

describe("BackgroundCarousel", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("renders children content", () => {
    const { container } = render(
      <BackgroundCarousel>
        <div data-testid="test-content">Test Content</div>
      </BackgroundCarousel>
    );

    const content = container.querySelector('[data-testid="test-content"]');
    expect(content).toBeTruthy();
    expect(content?.textContent).toBe("Test Content");
  });

  it("applies custom className", () => {
    const { container } = render(
      <BackgroundCarousel className="custom-class">
        <div>Content</div>
      </BackgroundCarousel>
    );

    const carousel = container.querySelector(".background-carousel");
    expect(carousel?.classList.contains("custom-class")).toBe(true);
  });

  it("renders all background images", () => {
    const { container } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    const images = container.querySelectorAll(".background-carousel__image");
    expect(images.length).toBe(8); // 8 images in the IMAGES array
  });

  it("shows first image initially with opacity 1", () => {
    const { container } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    const images = container.querySelectorAll(".background-carousel__image");
    const firstImage = images[0] as HTMLElement;

    expect(firstImage.style.opacity).toBe("1");
  });

  it("hides other images initially with opacity 0", () => {
    const { container } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    const images = container.querySelectorAll(".background-carousel__image");

    for (let i = 1; i < images.length; i++) {
      const image = images[i] as HTMLElement;
      expect(image.style.opacity).toBe("0");
    }
  });

  it("rotates to next image after 10 seconds", () => {
    const { container } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    const images = container.querySelectorAll(".background-carousel__image");

    // Initially first image is visible
    expect((images[0] as HTMLElement).style.opacity).toBe("1");
    expect((images[1] as HTMLElement).style.opacity).toBe("0");

    // Advance time by 10 seconds
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Now second image should be visible
    expect((images[0] as HTMLElement).style.opacity).toBe("0");
    expect((images[1] as HTMLElement).style.opacity).toBe("1");
  });

  it("cycles through all images and returns to first", () => {
    const { container } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    const images = container.querySelectorAll(".background-carousel__image");

    // Verify first image is visible
    expect((images[0] as HTMLElement).style.opacity).toBe("1");

    // Cycle through all 8 images
    for (let i = 1; i < 8; i++) {
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      expect((images[i] as HTMLElement).style.opacity).toBe("1");
    }

    // Advance one more time to cycle back to first
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect((images[0] as HTMLElement).style.opacity).toBe("1");
  });

  it("renders gradient overlay", () => {
    const { container } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    const gradient = container.querySelector(".background-carousel__gradient");
    expect(gradient).toBeTruthy();
  });

  it("renders vignette overlay", () => {
    const { container } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    const vignette = container.querySelector(".background-carousel__vignette");
    expect(vignette).toBeTruthy();
  });

  it("cleans up interval on unmount", () => {
    const { unmount } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it("has correct background image URLs", () => {
    const { container } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    const images = container.querySelectorAll(".background-carousel__image");
    const expectedImages = [
      "assets/img/all-images/venue/wtc-gemini-2.webp",
      "assets/img/all-images/venue/wtc-gemini-1.webp",
      "assets/img/all-images/venue/wtc-gemini-3.webp",
      "assets/img/all-images/venue/venue-1.webp",
      "assets/img/all-images/venue/venue-2.webp",
      "assets/img/all-images/venue/venue-3.webp",
      "assets/img/all-images/venue/venue-4.webp",
      "assets/img/all-images/venue/venue-5.webp",
    ];

    images.forEach((img, index) => {
      const element = img as HTMLElement;
      expect(element.style.backgroundImage).toBe(`url("${expectedImages[index]}")`);
    });
  });

  it("applies transition style to images", () => {
    const { container } = render(
      <BackgroundCarousel>
        <div>Content</div>
      </BackgroundCarousel>
    );

    const images = container.querySelectorAll(".background-carousel__image");
    images.forEach((img) => {
      const element = img as HTMLElement;
      expect(element.style.transition).toBe("opacity 1.5s ease-in-out");
    });
  });
});
