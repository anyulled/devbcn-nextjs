import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { act, render } from "@testing-library/react";
import Countdown from "@/components/elements/Countdown";

describe("Countdown", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders default style countdown values", () => {
    const { container } = render(<Countdown eventDate="2026-01-02T00:00:00Z" />);

    expect(container.querySelector("#days1")?.textContent).toBe("1");
    expect(container.querySelector("#hours1")?.textContent).toBe("0");
  });

  it("updates seconds over time", () => {
    const { container } = render(<Countdown eventDate="2026-01-01T00:00:10Z" />);

    expect(container.querySelector("#seconds1")?.textContent).toBe("10");

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(container.querySelector("#seconds1")?.textContent).toBe("9");
  });

  it("renders style 2 layout", () => {
    const { container } = render(<Countdown style={2} eventDate="2026-01-02T00:00:00Z" />);

    expect(container.querySelector("#days1")?.textContent).toContain("1");
    expect(container.querySelector("#hours1")?.textContent).toContain("0");
  });
});
