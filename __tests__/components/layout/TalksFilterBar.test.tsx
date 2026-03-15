import { describe, expect, it, jest, beforeEach, afterEach } from "@jest/globals";
import { act, fireEvent, render, screen } from "@testing-library/react";

const push = jest.fn();
const useSearchParams = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/2026/talks",
  useSearchParams: () => useSearchParams(),
}));

describe("TalksFilterBar", () => {
  beforeEach(() => {
    push.mockClear();
    useSearchParams.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("initializes with URL params", async () => {
    useSearchParams.mockReturnValue(new URLSearchParams("track=Java&q=test"));
    const TalksFilterBar = (await import("@/components/layout/TalksFilterBar")).default;
    render(<TalksFilterBar tracks={["Java", "Cloud"]} year="2026" />);

    expect(screen.getByPlaceholderText("Search talks...")).toHaveValue("test");
    expect(screen.getByRole("button", { name: "Java" })).toHaveClass("btn-primary");
  });

  it("updates search query after debounce", async () => {
    useSearchParams.mockReturnValue(new URLSearchParams("track=Java"));
    const TalksFilterBar = (await import("@/components/layout/TalksFilterBar")).default;
    render(<TalksFilterBar tracks={["Java", "Cloud"]} year="2026" />);

    fireEvent.change(screen.getByPlaceholderText("Search talks..."), { target: { value: "kotlin" } });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(push).toHaveBeenCalledWith("/2026/talks?track=Java&q=kotlin", { scroll: false });
  });

  it("toggles track selection", async () => {
    useSearchParams.mockReturnValue(new URLSearchParams("track=Java"));
    const TalksFilterBar = (await import("@/components/layout/TalksFilterBar")).default;
    render(<TalksFilterBar tracks={["Java", "Cloud"]} year="2026" />);

    fireEvent.click(screen.getByRole("button", { name: "Java" }));

    expect(push).toHaveBeenCalledWith("/2026/talks?", { scroll: false });
  });
});
