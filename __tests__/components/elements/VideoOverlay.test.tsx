import { describe, expect, it, beforeEach } from "@jest/globals";
import { render } from "@testing-library/react";
import VideoOverlay from "@/components/elements/VideoOverlay";

describe("VideoOverlay", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }),
    });
  });

  it("renders overlay structure", () => {
    const { container } = render(<VideoOverlay />);

    expect(container.querySelector(".video-overlay")).toBeTruthy();
    expect(container.querySelector(".video-overlay__particles")).toBeTruthy();
    expect(container.querySelector(".video-overlay__scanlines")).toBeTruthy();
  });
});
