import { track } from "@vercel/analytics";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

type GtagFn = (command: string, eventName: string, params?: AnalyticsPayload) => void;

/**
 * Track a custom event to Google Analytics, Google Tag Manager and Vercel Analytics
 * @param eventName - Name of the event (e.g., 'buy_ticket_click')
 * @param eventParams - Additional parameters for the event
 */
export function trackEvent(eventName: string, eventParams?: AnalyticsPayload) {
  const params = eventParams ?? {};

  if (typeof window !== "undefined") {
    const dataLayer = ((window as Window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer ??= []);
    dataLayer.push({ event: eventName, ...params });

    const gtag = (window as Window & { gtag?: GtagFn }).gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, params);
    }
  }

  track(eventName, eventParams);

  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, eventParams);
  }
}

/**
 * Track a ticket purchase button click
 * @param location - Where the button was clicked (e.g., 'header', 'hero', 'cta', 'talk_detail')
 * @param year - Optional year parameter
 */
export function trackTicketClick(location: string, year?: string) {
  trackEvent("buy_ticket_click", {
    location,
    year,
  });
}
