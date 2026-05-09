"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
};

const STORAGE_KEY = "horecaPlusCookieConsent";
const SETTINGS_EVENT = "horeca-plus:open-cookie-settings";

function getLocale(pathname: string): "el" | "en" {
  return pathname.startsWith("/en") ? "en" : "el";
}

function readConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      savedAt: String(parsed.savedAt || new Date().toISOString()),
    };
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean, marketing: boolean): ConsentState {
  const value: ConsentState = {
    necessary: true,
    analytics,
    marketing,
    savedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("horeca-plus:cookie-consent-updated", { detail: value }));
  return value;
}

function loadGtm(gtmId: string) {
  if (!gtmId || document.getElementById("hp-gtm-script")) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "hp-gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.appendChild(script);
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export default function CookieConsent() {
  const pathname = usePathname() || "/el";
  const locale = getLocale(pathname);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";

  const text = useMemo(
    () =>
      locale === "el"
        ? {
            title: "Ρυθμίσεις cookies",
            body: "Χρησιμοποιούμε απαραίτητη αποθήκευση για τη λειτουργία της ιστοσελίδας. Analytics και marketing scripts φορτώνουν μόνο μετά από συγκατάθεση.",
            necessary: "Απαραίτητα",
            necessaryDesc: "Πάντα ενεργά για βασική λειτουργία και αποθήκευση επιλογών.",
            analytics: "Analytics",
            analyticsDesc: "Στατιστική κατανόηση χρήσης, χωρίς αποστολή προσωπικών δεδομένων σε events.",
            marketing: "Marketing",
            marketingDesc: "Προαιρετικά scripts για μελλοντικές marketing λειτουργίες.",
            acceptAll: "Αποδοχή όλων",
            reject: "Απόρριψη προαιρετικών",
            save: "Αποθήκευση επιλογών",
            privacy: "Πολιτική απορρήτου",
          }
        : {
            title: "Cookie settings",
            body: "We use necessary storage for website functionality. Analytics and marketing scripts load only after consent.",
            necessary: "Necessary",
            necessaryDesc: "Always active for basic functionality and consent storage.",
            analytics: "Analytics",
            analyticsDesc: "Usage statistics, without sending personal data in events.",
            marketing: "Marketing",
            marketingDesc: "Optional scripts for future marketing features.",
            acceptAll: "Accept all",
            reject: "Reject optional",
            save: "Save choices",
            privacy: "Privacy policy",
          },
    [locale]
  );

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setAnalytics(Boolean(stored?.analytics));
    setMarketing(Boolean(stored?.marketing));
    setOpen(!stored);
    setReady(true);
  }, []);

  useEffect(() => {
    function openSettings() {
      const stored = readConsent();
      setConsent(stored);
      setAnalytics(Boolean(stored?.analytics));
      setMarketing(Boolean(stored?.marketing));
      setOpen(true);
    }

    window.addEventListener(SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    if (consent && (consent.analytics || consent.marketing)) {
      loadGtm(gtmId);
    }
  }, [consent, gtmId]);

  function commit(nextAnalytics: boolean, nextMarketing: boolean) {
    const next = saveConsent(nextAnalytics, nextMarketing);
    setConsent(next);
    setAnalytics(nextAnalytics);
    setMarketing(nextMarketing);
    setOpen(false);
  }

  if (!ready || !open) return null;

  return (
    <div className="cookieOverlay" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div className="cookiePanel">
        <div>
          <h2 id="cookie-title">{text.title}</h2>
          <p>{text.body}</p>
          <Link href={`/${locale}/privacy-cookies`}>{text.privacy}</Link>
        </div>

        <div className="cookieChoices">
          <div className="cookieChoice">
            <div>
              <strong>{text.necessary}</strong>
              <span>{text.necessaryDesc}</span>
            </div>
            <span className="cookieAlways">ON</span>
          </div>

          <label className="cookieChoice">
            <div>
              <strong>{text.analytics}</strong>
              <span>{text.analyticsDesc}</span>
            </div>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
          </label>

          <label className="cookieChoice">
            <div>
              <strong>{text.marketing}</strong>
              <span>{text.marketingDesc}</span>
            </div>
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
          </label>
        </div>

        <div className="cookieActions">
          <button type="button" className="cookiePrimary" onClick={() => commit(true, true)}>
            {text.acceptAll}
          </button>
          <button type="button" onClick={() => commit(false, false)}>
            {text.reject}
          </button>
          <button type="button" onClick={() => commit(analytics, marketing)}>
            {text.save}
          </button>
        </div>
      </div>
    </div>
  );
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}
