"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type AppLocale = "el" | "en";
type Props = { locale: AppLocale; messages: any };

export default function Header({ locale, messages }: Props) {
  const t = messages?.nav ?? {};
  const pathname = usePathname() || "/";
  const currentPathRaw = pathname.replace(/^\/(el|en)/, "") || "/";
  const currentPath = currentPathRaw === "/" ? "/home" : currentPathRaw;

  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const L = (p: string) => `/${locale}${p}`;

  const items = useMemo(
    () => [
      { id: "home", href: L("/home#home"), label: t.home ?? "Home" },
      { id: "about", href: L("/home#about"), label: t.about ?? "About" },
      { id: "services", href: L("/home#services"), label: t.services ?? "Services" },
      { id: "casestudies", href: L("/home#casestudies"), label: t.casestudies ?? "Case Studies" },
      { id: "contact", href: L("/home#contact"), label: t.contact ?? "Contact" },
    ],
    [locale, t]
  );

  const homePath = `/${locale}/home`;
  const isHomeView = pathname === homePath || pathname === `/${locale}`;

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

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!isHomeView) {
      setActiveId("");
      return;
    }

    const ids = ["home", "about", "services", "casestudies", "contact"];

    const updateActiveSection = () => {
      const offset = 150;
      let current = "home";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) current = id;
      }

      setActiveId(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [isHomeView, pathname]);

  const nextLocale: AppLocale = locale === "el" ? "en" : "el";
  const langLabel = nextLocale.toUpperCase();
  const langHref = `/${nextLocale}${currentPath}`;
  const langAria =
    nextLocale === "en" ? "Switch language to English" : "Αλλαγή γλώσσας σε Ελληνικά";

  return (
    <header className="hp-header" role="banner">
      <div className="hp-inner container">
        <Link href={L("/home")} className="hp-brand" aria-label="HORECA Plus">
          <Image
            src="/images/home/hrc.jpg"
            alt="HORECA Plus"
            width={220}
            height={70}
            className="hp-logo"
            priority
          />
        </Link>

        <nav className="hp-navDesktop" aria-label="Main">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`hp-link ${isHomeView && activeId === it.id ? "hp-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <Link href={langHref} className="hp-langSwitch" aria-label={langAria}>
          {langLabel}
        </Link>

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
              className={`hp-mobileLink ${isHomeView && activeId === it.id ? "hp-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .hp-header {
          position: sticky;
          top: 0;
          z-index: 1100;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: saturate(180%) blur(14px);
          border-bottom: 1px solid rgba(17, 17, 17, 0.08);
          --hp-header-h: 72px;
        }

        .hp-inner {
          height: var(--hp-header-h);
          display: grid;
          grid-template-columns: auto 1fr auto auto;
          align-items: center;
          gap: 14px;
          padding: 0 12px;
        }

        .hp-brand {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          line-height: 0;
        }

        .hp-logo {
          display: block;
          height: auto;
          width: 160px;
          object-fit: contain;
        }

        @media (min-width: 900px) {
          .hp-header {
            --hp-header-h: 82px;
          }

          .hp-logo {
            width: 190px;
          }
        }

        .hp-navDesktop {
          display: none;
          gap: 6px;
          justify-content: center;
          align-items: center;
        }

        .hp-link {
          text-decoration: none;
          color: #222;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.01em;
          font-family: var(--font-montserrat), Arial, sans-serif;
          transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }

        .hp-link:hover {
          background: #f5f1e8;
          color: #111;
        }

        .hp-active {
          color: #111;
          background: #f5f1e8;
          box-shadow: inset 0 0 0 1px rgba(163, 124, 64, 0.22);
        }

        .hp-langSwitch {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 46px;
          height: 34px;
          padding: 0 12px;
          border: 1px solid rgba(17, 17, 17, 0.14);
          border-radius: 999px;
          background: #111;
          color: #fff;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-decoration: none;
          line-height: 1;
          font-family: var(--font-montserrat), Arial, sans-serif;
          transition: transform 0.08s ease, opacity 0.15s ease, background 0.2s ease;
          user-select: none;
        }

        .hp-langSwitch:hover {
          background: #2a2a2a;
        }

        .hp-langSwitch:active {
          transform: translateY(1px);
        }

        .hp-burger {
          width: 44px;
          height: 44px;
          border: 0;
          background: transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .hp-burger svg rect {
          fill: #111;
        }

        .hp-mobileWrap {
          position: fixed;
          inset: calc(var(--hp-header-h)) 0 0 0;
          z-index: 1099;
          background: rgba(0, 0, 0, 0.28);
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .hp-mobileWrap.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .hp-mobileNav {
          background: #fff;
          border-top: 1px solid #eee;
          padding: 12px 12px 18px;
          display: grid;
          gap: 8px;
        }

        .hp-mobileLink {
          padding: 14px 12px;
          border-radius: 12px;
          text-decoration: none;
          color: #111;
          font-weight: 700;
          font-family: var(--font-montserrat), Arial, sans-serif;
        }

        .hp-mobileLink:hover,
        .hp-mobileLink.hp-active {
          background: #f5f1e8;
        }

        @media (min-width: 900px) {
          .hp-navDesktop {
            display: inline-flex;
          }

          .hp-burger {
            display: none;
          }

          .hp-mobileWrap {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}