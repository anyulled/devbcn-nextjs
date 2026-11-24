import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import HomePage from "@/app/2027/page";
import { getTicketSaleWindow } from "@/config/editions";
import { edition2027 } from "@/config/editions/2027";

const { startDate, endDate } = getTicketSaleWindow(edition2027);

describe("2027 home page", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows the edition heading and links to the conference while submissions and sales are closed", () => {
    jest.setSystemTime(edition2027.cfp.startDay.getTime() - 1000);
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "DevBcn 2027", level: 1 })).toBeVisible();
    expect(screen.getByRole("link", { name: "Explore the conference" })).toHaveAttribute("href", "#experience");
    expect(screen.getByRole("link", { name: "Become a Sponsor" })).toHaveAttribute("href", "/2027/sponsorship");
    expect(screen.getByRole("link", { name: "AMA Sessions" })).toHaveAttribute("href", "/2027/ama");
    expect(screen.getByRole("link", { name: "Speaking Mentoring" })).toHaveAttribute("href", "/2027/mentoring");
    expect(screen.getByRole("link", { name: "Plan your visit" })).toHaveAttribute("href", "/2027/travel");
    expect(screen.getByRole("link", { name: "View ticket prices" })).toHaveAttribute("href", "/2027/pricing-plan");
    const sponsors = screen.getByRole("region", { name: "Sponsors" });
    const faq = screen.getByRole("region", { name: "Before you go" });
    expect(sponsors).toHaveTextContent("Past sponsors");
    expect(sponsors.compareDocumentPosition(faq)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.queryByRole("link", { name: "Buy a ticket" })).not.toBeInTheDocument();
  });

  it("keeps the event countdown running when the configured ticket link opens", () => {
    jest.setSystemTime(startDate.getTime() - 10_000);
    const { unmount } = render(<HomePage />);

    const timer = screen.getByRole("timer", { name: "Countdown to DevBcn 2027" });
    expect(timer).not.toBeEmptyDOMElement();
    expect(screen.queryByRole("link", { name: "Buy a ticket" })).not.toBeInTheDocument();

    act(() => jest.advanceTimersByTime(10_000));
    expect(timer).not.toBeEmptyDOMElement();
    expect(screen.getByRole("link", { name: "Buy a ticket" })).toHaveAttribute("href", edition2027.tickets.url);

    unmount();
    jest.setSystemTime(endDate.getTime() + 1);
    render(<HomePage />);
    expect(screen.queryByRole("link", { name: "Buy a ticket" })).not.toBeInTheDocument();
    expect(screen.getByText("Online ticket sales have closed.")).toBeVisible();
    expect(screen.getByRole("timer", { name: "Countdown to DevBcn 2027" })).not.toBeEmptyDOMElement();
  });

  it("counts down to the configured start of the conference", () => {
    jest.setSystemTime(edition2027.event.startDay.getTime() - 10_000);
    render(<HomePage />);

    const timer = screen.getByRole("timer", { name: "Countdown to DevBcn 2027" });
    expect(timer).toHaveTextContent(/10\s+Seconds/);
    act(() => jest.advanceTimersByTime(1000));
    expect(timer).toHaveTextContent(/9\s+Seconds/);
    act(() => jest.advanceTimersByTime(9000));
    expect(timer).toBeEmptyDOMElement();
  });
});
