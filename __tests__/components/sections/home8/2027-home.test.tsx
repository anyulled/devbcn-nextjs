import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import HomePage from "@/app/2027/page";
import { edition2027 } from "@/config/editions/2027";

jest.mock("@/components/sections/home8/section4", () => ({ __esModule: true, default: () => null }));
jest.mock("@/components/elements/TrackBadges", () => ({ __esModule: true, default: () => null }));

describe("2027 home page", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(edition2027.event.startDay.getTime() - 10_000));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("replaces the taking-shape messages with a live event countdown", () => {
    render(<HomePage />);

    expect(screen.queryByText(/taking shape/i)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The Barcelona Developers Conference", level: 1 })).toHaveClass("visually-hidden");
    expect(screen.getByRole("link", { name: "Become a Sponsor" })).toHaveAttribute("href", "/2027/sponsorship");
    expect(screen.queryByRole("link", { name: "Reserve Your Seat" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Become a Speaker" })).not.toBeInTheDocument();
    expect(screen.getByText(/AMA Sessions and Speaking Mentoring will return/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Countdown to DevBcn 2027")).toHaveTextContent(/10\s+Seconds/);

    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByLabelText("Countdown to DevBcn 2027")).toHaveTextContent(/9\s+Seconds/);

    act(() => jest.advanceTimersByTime(9000));
    expect(screen.getByLabelText("Countdown to DevBcn 2027")).toBeEmptyDOMElement();
  });
});
