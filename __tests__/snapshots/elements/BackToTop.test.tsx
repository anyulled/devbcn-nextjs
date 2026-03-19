import { expect, describe, it } from "@jest/globals";
import { render, fireEvent, screen } from "@testing-library/react";
import BackToTop from "@/components/elements/BackToTop";

describe("BackToTop Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<BackToTop target="#top" />);
    expect(container).toMatchSnapshot();
  });

  it("updates scroll state on scroll event", () => {
    render(<BackToTop target="#top" />);

    Object.defineProperty(window, "scrollY", { value: 150, writable: true, configurable: true });
    window.requestAnimationFrame = (cb) => {
      cb(performance.now());
      return 1;
    };
    fireEvent.scroll(window);
  });
});
