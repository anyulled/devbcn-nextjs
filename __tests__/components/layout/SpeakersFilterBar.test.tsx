import { describe, expect, it, jest, beforeEach, afterEach } from "@jest/globals";
import { act, fireEvent, render, screen } from "@testing-library/react";

const push = jest.fn();
const useSearchParams = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/2026/speakers",
  useSearchParams: () => useSearchParams(),
}));

describe("SpeakersFilterBar", () => {
  beforeEach(() => {
    push.mockClear();
    useSearchParams.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("uses existing query from URL", async () => {
    useSearchParams.mockReturnValue(new URLSearchParams("q=John"));
    const SpeakersFilterBar = (await import("@/components/layout/SpeakersFilterBar")).default;
    render(<SpeakersFilterBar />);

    expect(screen.getByPlaceholderText("Search by name, tagline, or bio...")).toHaveValue("John");
  });

  it("pushes query updates after debounce", async () => {
    useSearchParams.mockReturnValue(new URLSearchParams(""));
    const SpeakersFilterBar = (await import("@/components/layout/SpeakersFilterBar")).default;
    render(<SpeakersFilterBar />);

    fireEvent.change(screen.getByPlaceholderText("Search by name, tagline, or bio..."), { target: { value: "Jane" } });
    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(push).toHaveBeenCalledWith("/2026/speakers?q=Jane", { scroll: false });
  });
});
