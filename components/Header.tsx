"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type AppLocale = "el" | "en";

type Props = {
  locale: AppLocale;
  messages: any; // περιέχει nav.*
};

export default function Header({ locale, messages }: Props) {
  const t = messages?.nav ?? {};
  const pathname = usePathname() || "/";
  const currentPath = pathname.replace(/^\/(el|en)/, "") || "/";

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // κλείσιμο όταν κλικάρεις εκτός
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  // κλείσιμο όταν αλλάζει route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
    <header className="header" role="banner">
      <div className="inner container">
        {/* brand */}
        <Link href={L("/home")} className="brand" aria-label="HORECA Plus">
          <Image
            src="/images/home/hrc.jpg"
            alt="HORECA Plus"
            width={132}
            height={36}
            className="logo"
            priority
          />
          {/* Αν ΔΕΝ θες καθόλου το κείμενο, σβήστο */}
          <span className="brandText">HORECA&nbsp;Plus</span>
        </Link>

        {/* desktop nav */}
        <nav className="navDesktop" aria-label="Main">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`navLink ${isActive(it.href) ? "active" : ""}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        {/* language */}
        <div className="lang">
          <Link href={`/el${currentPath}`} aria-label="Greek">EL</Link>
          <span> / </span>
          <Link href={`/en${currentPath}`} aria-label="English">EN</Link>
        </div>

        {/* burger */}
        <button
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* mobile drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobileWrap ${open ? "open" : ""}`}
      >
        <nav className="mobileNav" aria-label="Mobile">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`mobileLink ${isActive(it.href) ? "active" : ""}`}
            >
              {it.label}
            </Link>
          ))}
          <div className="mobileLang">
            <Link href={`/el${currentPath}`} aria-label="Greek">EL</Link>
            <span> / </span>
            <Link href={`/en${currentPath}`} aria-label="English">EN</Link>
          </div>
        </nav>
      </div>

      {/* styled-jsx: δεν χρειάζεται κανένα .module.css */}
      <style jsx>{`
        .header { position: sticky; top: 0; z-index: 1000; background: #fff; border-bottom: 1px solid #eee; }
        .inner { height: 64px; display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; gap: 12px; padding: 0 8px; }
        .brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; line-height: 0; }
        .logo { height: 36px; width: auto; }
        .brandText { font-weight: 700; color: #111; letter-spacing: .2px; display: none; } /* κρυφό στο mobile */

        .navDesktop { display: none; justify-content: center; gap: 10px; }
        .navLink { text-decoration: none; color: #222; padding: 10px 12px; border-radius: 8px; font-weight: 500; }
        .navLink:hover { background: #f6f6f6; }
        .active { color: #0e300e; }

        .lang { display: none; gap: 6px; align-items: center; }

        .burger { width: 42px; height: 42px; border: 0; background: transparent; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
        .burger span { width: 22px; height: 2px; background: #111; margin: 3px 0; display: block; transition: transform .2s ease; }

        .mobileWrap { position: fixed; inset: 64px 0 0 0; background: rgba(0,0,0,.35); backdrop-filter: blur(1px);
                      transform: translateY(-100%); opacity: 0; pointer-events: none; transition: opacity .2s, transform .2s; }
        .open { transform: translateY(0); opacity: 1; pointer-events: auto; }
        .mobileNav { background: #fff; border-top: 1px solid #eee; padding: 12px 12px 18px; display: grid; gap: 6px; }
        .mobileLink { padding: 12px 8px; border-radius: 8px; text-decoration: none; color: #111; font-weight: 600; }
        .mobileLink:hover { background: #f6f6f6; }
        .mobileLang { margin-top: 6px; display: inline-flex; gap: 6px; align-items: center; color: #444; }

        /* ≥ 900px = desktop */
        @media (min-width: 900px){
          .brandText{ display:inline; }      /* δείχνει το “HORECA Plus” μόνο σε desktop */
          .navDesktop{ display:inline-flex; }
          .lang{ display:inline-flex; }
          .burger{ display:none; }           /* burger εξαφανίζεται */
          .mobileWrap{ display:none; }
        }
      `}</style>
    </header>
  );
}
