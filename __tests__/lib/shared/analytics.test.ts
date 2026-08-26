import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { track } from "@vercel/analytics";

import { trackEvent, trackTicketClick } from "@/lib/shared/analytics";

const trackMock = track as jest.MockedFunction<typeof track>;

describe("Vercel analytics", () => {
  beforeEach(() => {
    trackMock.mockClear();
  });

  it("sends custom events only through Vercel Analytics", () => {
    trackEvent("newsletter_signup", { location: "footer" });

    expect(trackMock).toHaveBeenCalledWith("newsletter_signup", { location: "footer" });
    expect(window).not.toHaveProperty("dataLayer");
    expect(window).not.toHaveProperty("gtag");
  });

  it("preserves ticket click dimensions", () => {
    trackTicketClick("hero", "2026");

    expect(trackMock).toHaveBeenCalledWith("buy_ticket_click", { location: "hero", year: "2026" });
  });
});
