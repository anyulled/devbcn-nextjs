import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { act, render } from "@testing-library/react";
import Countdown2 from "@/components/elements/Countdown2";

describe("Countdown2", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders initial values", () => {
    const { container } = render(<Countdown2 />);

    expect(container.querySelector("#days1")?.textContent).toContain("2");
    expect(container.querySelector("#hours1")?.textContent).toContain("0");
  });

  it("decrements seconds over time", () => {
    const { container } = render(<Countdown2 />);

    const initialSeconds = container.querySelector("#seconds1")?.textContent;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const nextSeconds = container.querySelector("#seconds1")?.textContent;
    expect(nextSeconds).not.toBe(initialSeconds);
  });
});
