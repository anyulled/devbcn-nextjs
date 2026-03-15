import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

const push = jest.fn();
const replace = jest.fn();
const useSearchParams = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace }),
  usePathname: () => "/2026/talks",
  useSearchParams: () => useSearchParams(),
}));

describe("TrackFilter", () => {
  beforeEach(() => {
    push.mockClear();
    replace.mockClear();
    useSearchParams.mockClear();
    sessionStorage.clear();
  });

  it("prefers URL track when provided", async () => {
    useSearchParams.mockReturnValue(new URLSearchParams("track=Frontend"));
    const TrackFilter = (await import("@/components/layout/TrackFilter")).default;
    render(<TrackFilter tracks={["Frontend", "Cloud"]} year="2026" />);

    expect(screen.getByLabelText("Filter by Track:")).toHaveValue("Frontend");
    expect(sessionStorage.getItem("talks-track-filter")).toBe("Frontend");
  });

  it("falls back to stored track when URL missing", async () => {
    useSearchParams.mockReturnValue(new URLSearchParams(""));
    sessionStorage.setItem("talks-track-filter", "Cloud");

    const TrackFilter = (await import("@/components/layout/TrackFilter")).default;
    render(<TrackFilter tracks={["Frontend", "Cloud"]} year="2026" />);

    expect(screen.getByLabelText("Filter by Track:")).toHaveValue("Cloud");
  });

  it("updates URL and storage on change", async () => {
    useSearchParams.mockReturnValue(new URLSearchParams("track=Frontend"));
    const TrackFilter = (await import("@/components/layout/TrackFilter")).default;
    render(<TrackFilter tracks={["Frontend", "Cloud"]} year="2026" />);

    fireEvent.change(screen.getByLabelText("Filter by Track:"), { target: { value: "Cloud" } });

    expect(sessionStorage.getItem("talks-track-filter")).toBe("Cloud");
    expect(push).toHaveBeenCalledWith("/2026/talks?track=Cloud");
  });

  it("clears URL and storage when selection removed", async () => {
    useSearchParams.mockReturnValue(new URLSearchParams("track=Frontend"));
    sessionStorage.setItem("talks-track-filter", "Frontend");
    const TrackFilter = (await import("@/components/layout/TrackFilter")).default;
    render(<TrackFilter tracks={["Frontend", "Cloud"]} year="2026" />);

    fireEvent.change(screen.getByLabelText("Filter by Track:"), { target: { value: "" } });

    expect(sessionStorage.getItem("talks-track-filter")).toBeNull();
    expect(push).toHaveBeenCalledWith("/2026/talks?");
  });
});
