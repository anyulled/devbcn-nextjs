import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import HeroActions from "@/components/sections/home8/HeroActions";
import { edition2027 } from "@/config/editions/2027";

describe("edition hero actions", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows actions only in their configured windows and updates at each boundary", () => {
    jest.setSystemTime(edition2027.cfp.startDay.getTime() - 1);
    render(<HeroActions config={edition2027} year="2027" />);
    expect(screen.getByRole("link", { name: "Become a Sponsor" })).toHaveAttribute("href", "/2027/sponsorship");
    expect(screen.queryByRole("link", { name: "Become a Speaker" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Reserve Your Seat" })).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.getByRole("link", { name: "Become a Speaker" })).toHaveAttribute("href", "https://sessionize.com/devbcn-2027/?e=f455b8");
    act(() => {
      jest.advanceTimersByTime(edition2027.tickets.startDay.getTime() - Date.now());
    });
    expect(screen.getByRole("link", { name: "Reserve Your Seat" })).toHaveAttribute("href", edition2027.tickets.url);
    act(() => {
      jest.advanceTimersByTime(edition2027.cfp.endDay.getTime() - Date.now());
    });
    expect(screen.getByRole("link", { name: "Become a Speaker" })).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.queryByRole("link", { name: "Become a Speaker" })).not.toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(edition2027.tickets.endDay.getTime() - Date.now());
    });
    expect(screen.getByRole("link", { name: "Reserve Your Seat" })).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.queryByRole("link", { name: "Reserve Your Seat" })).not.toBeInTheDocument();
  });

  it("uses the historical category overrides for the ticket window", () => {
    const start = new Date("2027-01-10T00:00:00Z");
    const end = new Date("2027-01-20T00:00:00Z");
    const config = {
      ...edition2027,
      tickets: {
        ...edition2027.tickets,
        categories: [
          { name: "Blind Bird", price: "", startDate: start, endDate: start },
          { name: "Super Last Minute", price: "", startDate: end, endDate: end },
        ],
      },
    };
    jest.setSystemTime(start);
    render(<HeroActions config={config} year="2027" />);
    expect(screen.getByRole("link", { name: "Reserve Your Seat" })).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(end.getTime() - Date.now() + 1);
    });
    expect(screen.queryByRole("link", { name: "Reserve Your Seat" })).not.toBeInTheDocument();
  });
});
