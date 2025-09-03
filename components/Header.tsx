"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type AppLocale = "el" | "en";
type Props = { locale: AppLocale; messages: any };

export default function Header({ locale, messages }: Props) {
  const t = messages?.nav ?? {};
  const pathname = usePathname() || "/";
  const currentPath = pathname.replace(/^\/(el|en)/, "") || "/";

  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Κλείσιμο με click έξω, αλλά όχι όταν πατάμε το burger
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (drawerRef.current?.contains(target)) return;
      if (burgerRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  // Κλείσιμο όταν αλλάξει route
  useEffect(() => setOpen(false), [pathname]);

  const L = (p: string) => `/${locale}${p}`;
  const items = [
    { href: L("/home"), label: t.home ?? "Home" },
    { href: L("/about"), label: t.about ?? "About" },
    { href: L("/services"), label: t.services ?? "Services" },
    { href: L("/casestudies"), label: t.casestudies ?? "Case Studies" },
    { href: L("/contact"), label: t.contact ?? "Contact" },
  ];
  const isActive = (href: string) => pathname === href;

  // Γλώσσα: δείχνουμε ΜΟΝΟ την εναλλακτική
  const nextLocale: AppLocale = locale === "el" ? "en" : "el";
  const langLabel = nextLocale.toUpperCase();
  const langHref = `/${nextLocale}${currentPath}`;
  const langAria =
    nextLocale === "en" ? "Switch language to English" : "Αλλαγή γλώσσας σε Ελληνικά";

  return (
    <header className="hp-header" role="banner">
      <div className="hp-inner container">
        {/* LOGO */}
        <Link href={L("/home")} className="hp-brand" aria-label="HORECA Plus">
          <img
            src="/images/home/hrc.jpg"
            alt="HORECA Plus"
            className="hp-logo"
            loading="eager"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hp-navDesktop" aria-label="Main">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`hp-link ${isActive(it.href) ? "hp-active" : ""}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        {/* LANGUAGE SWITCH (δεξιά στο header) */}
        <Link href={langHref} className="hp-langSwitch" aria-label={langAria}>
          {langLabel}
        </Link>

        {/* BURGER */}
        <button
          ref={burgerRef}
          className="hp-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="hp-mobile"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
        >
          <svg width="26" height="22" viewBox="0 0 26 22" aria-hidden="true">
            <rect x="0" y="1" width="26" height="2" rx="1"></rect>
            <rect x="0" y="10" width="26" height="2" rx="1"></rect>
            <rect x="0" y="19" width="26" height="2" rx="1"></rect>
          </svg>
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div
        id="hp-mobile"
        ref={drawerRef}
        className={`hp-mobileWrap ${open ? "open" : ""}`}
      >
        <nav className="hp-mobileNav" aria-label="Mobile">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`hp-mobileLink ${isActive(it.href) ? "hp-active" : ""}`}
            >
              {it.label}
            </Link>
          ))}
          {/* Γλώσσα αφαιρέθηκε από το drawer */}
        </nav>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .hp-header {
          position: sticky;
          top: 0;
          z-index: 1100;
          background: #fff;
          border-bottom: 1px solid #eee;
        }
        .hp-inner {
          height: 64px;
          display: grid;
          grid-template-columns: auto 1fr auto auto; /* brand | spacer | lang | burger (nav εμφανίζεται μόνο σε desktop) */
          align-items: center;
          gap: 12px;
          padding: 0 12px;
        }

        /* LOGO */
        .hp-brand { display:inline-flex; align-items:center; text-decoration:none; line-height:0; }
        .hp-logo { display:block; height:48px; width:auto; object-fit:contain; }
        @media (min-width: 900px) {
          .hp-logo { height:56px; }
          .hp-inner { height:72px; grid-template-columns: auto 1fr auto auto; }
        }

        /* DESKTOP NAV */
        .hp-navDesktop { display:none; gap:10px; justify-content:center; }
        .hp-link {
          text-decoration:none; color:#222;
          padding:10px 12px; border-radius:8px; font-weight:500;
        }
        .hp-link:hover { background:#f6f6f6; }
        .hp-active { color:#0e300e; }

        /* LANGUAGE SWITCH PILL */
        .hp-langSwitch {
          display:inline-flex; align-items:center; justify-content:center;
          padding:6px 12px;
          background:#111; color:#fff;
          border-radius:9999px;
          text-decoration:none; font-weight:700; line-height:1;
          border:1px solid #111;
          transition: transform .08s ease, opacity .15s ease, background .2s ease;
          user-select:none;
        }
        .hp-langSwitch:hover { opacity:.92; }
        .hp-langSwitch:active { transform: translateY(1px); }

        /* BURGER */
        .hp-burger {
          width:44px; height:44px; border:0; background:transparent;
          display:inline-flex; align-items:center; justify-content:center; cursor:pointer;
        }
        .hp-burger svg rect { fill:#111; }

        /* MOBILE DRAWER */
        .hp-mobileWrap {
          position: fixed; inset: 72px 0 0 0;
          z-index: 1099;
          background: rgba(0,0,0,.35);
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: opacity .2s ease, transform .2s ease;
        }
        .hp-mobileWrap.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .hp-mobileNav {
          background:#fff; border-top:1px solid #eee;
          padding:12px 12px 18px; display:grid; gap:6px;
        }
        .hp-mobileLink {
          padding:14px 8px; border-radius:8px; text-decoration:none; color:#111; font-weight:600;
        }
        .hp-mobileLink:hover { background:#f6f6f6; }

        /* RESPONSIVE */
        @media (min-width: 900px) {
          .hp-navDesktop { display:inline-flex; }
          /* Σε desktop: μετακινούμε τη nav στη μέση με CSS order μέσω grid? Δεν χρειάζεται, ήδη κεντραρισμένη. */
        }
      `}</style>
    </header>
  );
}
