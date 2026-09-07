import { beforeEach, describe, expect, it, jest } from "@jest/globals";

const track = jest.fn();

jest.mock("@vercel/analytics", () => ({
  track: (...args: unknown[]) => track(...args),
}));

describe("analytics", () => {
  beforeEach(() => {
    track.mockClear();
  });

  it("sends custom events only through Vercel Analytics", async () => {
    const { trackEvent } = await import("@/lib/shared/analytics");
    const payload = { location: "hero", year: "2026" };

    trackEvent("buy_ticket_click", payload);

    expect(track).toHaveBeenCalledWith("buy_ticket_click", payload);
    expect(window).not.toHaveProperty("dataLayer");
    expect(window).not.toHaveProperty("gtag");
  });

  it("keeps the ticket click event contract", async () => {
    const { trackTicketClick } = await import("@/lib/shared/analytics");

    trackTicketClick("header", "2026");

    expect(track).toHaveBeenCalledWith("buy_ticket_click", { location: "header", year: "2026" });
  });
});
