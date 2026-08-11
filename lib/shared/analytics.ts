import { track } from "@vercel/analytics";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(eventName: string, eventParams?: AnalyticsPayload) {
  track(eventName, eventParams);

  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, eventParams);
  }
}

export function trackTicketClick(location: string, year?: string) {
  trackEvent("buy_ticket_click", {
    location,
    year,
  });
}
