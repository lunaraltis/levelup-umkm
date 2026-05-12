"use client";

type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
    fbq?: (command: "track" | "trackCustom", eventName: string, params?: AnalyticsParams) => void;
  }
}

function cleanParams(params: AnalyticsParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ""),
  ) as AnalyticsParams;
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const eventParams = cleanParams(params);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...eventParams });
  window.gtag?.("event", eventName, eventParams);
  window.fbq?.("trackCustom", eventName, eventParams);
}
