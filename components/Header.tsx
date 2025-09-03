"use client";

import Image from "next/image";
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

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

  return (
    <header className="hp-header" role="banner">
      <div className="hp-inner container">
        {/* LOGO — σταθερό, δεν μικραίνει */}
        <Link href={L("/home")} className="hp-brand" aria-label="HORECA Plus">
          <Image
            src="/images/home/hrc.jpg"
            alt="HORECA Plus"
            width={220}
            height={60}
            priority
            className="hp-logo"
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

        {/* LANGUAGE */}
        <div className="hp-lang">
          <Link href={`/el${currentPath}`}>EL</Link>
          <span> / </span>
          <Link href={`/en${currentPath}`}>EN</Link>
        </div>

        {/* BURGER (mobile) */}
        <button
          className="hp-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="hp-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div id="hp-mobile" ref={ref} className={`hp-mobileWrap ${open ? "open" : ""}`}>
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
          <div className="hp-mobileLang">
            <Link href={`/el${currentPath}`}>EL</Link>
            <span> / </span>
            <Link href={`/en${currentPath}`}>EN</Link>
          </div>
        </nav>
      </div>

      {/* ---- STYLES (scoped, δεν επηρεάζονται από globals.css) ---- */}
      <style jsx>{`
        .hp-header { position: sticky; top: 0; z-index: 1000; background: #fff; border-bottom: 1px solid #eee; }
        .hp-inner { height: 72px; display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; gap: 12px; padding: 0 12px; }

        .hp-brand { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; line-height: 0; }
        .hp-logo { width: 220px !important; height: auto !important; display: block; }      /* ✅ σταθερό */
        .hp-brandText { font-weight: 700; color: #111; letter-spacing: .2px; display: none; } /* κρυφό στο mobile πάντα */

        .hp-navDesktop { display: none; gap: 10px; justify-content: center; }
        .hp-link { text-decoration: none; color: #222; padding: 10px 12px; border-radius: 8px; font-weight: 500; }
        .hp-link:hover { background: #f6f6f6; }
        .hp-active { color: #0e300e; }

        .hp-lang { display: none; gap: 6px; align-items: center; }

        .hp-burger { width: 44px; height: 44px; border: 0; background: transparent; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
        .hp-burger span { width: 24px; height: 2px; background: #111; margin: 3px 0; display: block; }

        .hp-mobileWrap { position: fixed; inset: 72px 0 0 0; background: rgba(0,0,0,.35); transform: translateY(-100%); opacity: 0; pointer-events: none; transition: opacity .2s, transform .2s; }
        .hp-mobileWrap.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
        .hp-mobileNav { background: #fff; border-top: 1px solid #eee; padding: 12px 12px 18px; display: grid; gap: 6px; }
        .hp-mobileLink { padding: 14px 8px; border-radius: 8px; text-decoration: none; color: #111; font-weight: 600; }
        .hp-mobileLink:hover { background: #f6f6f6; }
        .hp-mobileLang { margin-top: 6px; display: inline-flex; gap: 6px; align-items: center; color: #444; }

        /* DESKTOP ONLY */
        @media (min-width: 900px){
          .hp-brandText{ display: none; }                         /* ❗️αν ΔΕΝ θες το κείμενο ποτέ, κράτα το hidden */
          .hp-navDesktop{ display: inline-flex; }
          .hp-lang{ display: inline-flex; }
          .hp-burger{ display: none; }
          .hp-mobileWrap{ display: none; }
        }
      `}</style>
    </header>
  );
}
