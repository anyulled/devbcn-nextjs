import { render, fireEvent, act } from "@testing-library/react";
import BackToTop from "@/components/elements/BackToTop";

describe("BackToTop", () => {
  beforeAll(() => {
    // Mock window.scrollTo
    Object.defineProperty(window, "scrollTo", {
      value: jest.fn(),
      writable: true,
    });
    // Mock requestAnimationFrame to execute callback immediately
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    });
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  });

  afterAll(() => {
    (window.requestAnimationFrame as jest.Mock).mockRestore();
    (window.cancelAnimationFrame as jest.Mock).mockRestore();
  });

  it("should render nothing initially (scrollY <= 100)", () => {
    const { container } = render(<BackToTop target="#top" />);
    expect(container.firstChild).toBeNull();
  });

  it("should appear after scrolling down (> 100px)", () => {
    const { container } = render(<BackToTop target="#top" />);

    act(() => {
      // Mock scrollY
      Object.defineProperty(window, "scrollY", {
        value: 200,
        writable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    const button = container.querySelector(".paginacontainer");
    expect(button).toBeInTheDocument();
  });

  it("should disappear after scrolling back up (<= 100px)", () => {
    const { container } = render(<BackToTop target="#top" />);

    // Scroll down first
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 200,
        writable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(container.querySelector(".paginacontainer")).toBeInTheDocument();

    // Scroll back up
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 50,
        writable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(container.querySelector(".paginacontainer")).not.toBeInTheDocument();
  });

  it("should scroll to top when clicked", () => {
    // Mock the target element
    document.body.innerHTML = '<div id="top"></div>';
    const targetElement = document.getElementById("top");
    if (targetElement) {
        Object.defineProperty(targetElement, "offsetTop", {
            value: 0,
            writable: true,
        });
    }

    const { container } = render(<BackToTop target="#top" />);

    // Scroll down to make button visible
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 200,
        writable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    const button = container.querySelector(".paginacontainer");
    expect(button).toBeInTheDocument();

    if (button) {
      fireEvent.click(button);
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      });
    }
  });
});
