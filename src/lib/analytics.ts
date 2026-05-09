type ConsentState = {
  analytics?: boolean;
  marketing?: boolean;
};

const CONSENT_KEY = "horecaPlusCookieConsent";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function hasTrackingConsent() {
  if (typeof window === "undefined") return false;

  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const consent = JSON.parse(raw) as ConsentState;
    return Boolean(consent.analytics || consent.marketing);
  } catch {
    return false;
  }
}

export function trackEvent(event: string, params: Record<string, string | number | boolean | null | undefined> = {}) {
  if (typeof window === "undefined" || !hasTrackingConsent()) return;

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...cleanParams,
  });
}
