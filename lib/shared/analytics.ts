/**
 * Analytics tracking utilities for Google Analytics and Vercel Analytics
 */

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

/**
 * Track a custom event to Google Analytics and Vercel Analytics
 * @param eventName - Name of the event (e.g., 'buy_ticket_click')
 * @param eventParams - Additional parameters for the event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }

  if (typeof window !== "undefined" && (window as unknown as { va: (event: string, name: string, params?: Record<string, unknown>) => void }).va) {
    (window as unknown as { va: (event: string, name: string, params?: Record<string, unknown>) => void }).va("track", eventName, eventParams);
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, eventParams);
  }
}

/**
 * Track a ticket purchase button click
 * @param location - Where the button was clicked (e.g., 'header', 'hero', 'cta', 'talk_detail')
 * @param year - Optional year parameter
 * @param talkId - Optional talk ID if clicked from talk detail page
 */
export function trackTicketClick(location: string, year?: string, talkId?: string) {
  trackEvent("buy_ticket_click", {
    location,
    year,
    talk_id: talkId,
  });
}
