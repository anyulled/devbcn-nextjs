import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Section3 from "@/components/sections/home8/section3";

describe("FAQ ticket links", () => {
  it.each([
    ["2027", "https://tickets.devbcn.com/event/devbcn-2027"],
    ["2026", "https://tickets.devbcn.com/event/devbcn-2026"],
  ])("uses the %s edition ticket URL", (year, ticketUrl) => {
    render(<Section3 year={year} />);

    const ticketButtons = screen.getAllByRole("link", { name: "Buy Ticket Now" });
    expect(ticketButtons.length).toBeGreaterThan(0);
    ticketButtons.forEach((button) => expect(button).toHaveAttribute("href", ticketUrl));
  });
});
