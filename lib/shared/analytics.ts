import { sendGTMEvent, sendGAEvent } from "@next/third-parties/google";
import { track } from "@vercel/analytics";

/**
 * Track a custom event to Google Analytics, Google Tag Manager and Vercel Analytics
 * @param eventName - Name of the event (e.g., 'buy_ticket_click')
 * @param eventParams - Additional parameters for the event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, string | number | boolean | null | undefined>) {
  // Track to Google Tag Manager
  sendGTMEvent({ event: eventName, ...eventParams });

  // Track to Google Analytics
  sendGAEvent("event", eventName, eventParams ?? {});

  // Track to Vercel Analytics
  track(eventName, eventParams ?? undefined);

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
