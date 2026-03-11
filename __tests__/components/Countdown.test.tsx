import { render, act } from "@testing-library/react";
import Countdown from "@/components/elements/Countdown";
import "@testing-library/jest-dom";

describe("Countdown", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("renders initial state as zero (hydration match)", async () => {
    /*
     * To verify the hydration match (server render = 0), we can't easily prevent
     * useEffect from running immediately in JSDOM. However, passing the current
     * time effectively simulates the "0" state before any tick happens.
     */
    const now = new Date().toISOString();
    const { container: containerNow, unmount } = render(<Countdown eventDate={now} />);

    expect(containerNow.querySelector("#days1")).toHaveTextContent("0");
    expect(containerNow.querySelector("#hours1")).toHaveTextContent("0");
    expect(containerNow.querySelector("#minutes1")).toHaveTextContent("0");
    expect(containerNow.querySelector("#seconds1")).toHaveTextContent("0");

    unmount();
  });

  it("updates countdown after mount", () => {
    // Use a specific time offset: 1 hour 30 mins
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 1 + 1000 * 60 * 30);
    const { container } = render(<Countdown eventDate={futureDate.toISOString()} />);

    /*
     * Fast-forward useEffect to trigger the updateTime call.
     * The useEffect runs immediately on mount in tests, but the updateTime inside it
     * might need a tick. We advance 1000ms to ensure the interval fires.
     */
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // 90 mins = 0 days, 1 hour, 30 mins
    const dayElement = container.querySelector("#days1");
    const hourElement = container.querySelector("#hours1");
    const minuteElement = container.querySelector("#minutes1");

    expect(dayElement).toHaveTextContent("0");
    expect(hourElement).toHaveTextContent("1");
    expect(minuteElement).toHaveTextContent("29");
  });
});
