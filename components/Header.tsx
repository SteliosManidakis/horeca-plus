"use client";

  import Image from "next/image";
  import Link from "next/link";
  import { usePathname } from "next/navigation";
  import { useEffect, useRef, useState } from "react";  
  import styles from "./Header.module.css";           

  type Locale = "el" | "en";   

type Props = {
  locale: Locale;
  messages: any; // περιέχει nav.*
};

export default function Header({ locale, messages }: Props) {
  const t = messages?.nav ?? {};
  const pathname = usePathname() || "/";
  const currentPath = pathname.replace(/^\/(el|en)/, "") || "/";

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Κλείσιμο όταν κάνεις click εκτός
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  // Κλείσιμο όταν αλλάζει route
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
    <header className={styles.header} role="banner">
      <div className={`${styles.inner} container`}>
        {/* Brand */}
        <Link href={L("/home")} className={styles.brand} aria-label="HORECA Plus">
          <Image
            src="/images/home/hrc.jpg"
            alt="HORECA Plus"
            width={132}
            height={36}
            className={styles.logo}
            priority
          />
          <span className={styles.brandText}>HORECA&nbsp;Plus</span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.navDesktop} aria-label="Main">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`${styles.navLink} ${isActive(it.href) ? styles.active : ""}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        {/* Language switch */}
        <div className={styles.lang}>
          <Link href={`/el${currentPath}`} aria-label="Greek">EL</Link>
          <span> / </span>
          <Link href={`/en${currentPath}`} aria-label="English">EN</Link>
        </div>

        {/* Burger button */}
        <button
          className={styles.burger}
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

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.mobileWrap} ${open ? styles.open : ""}`}
      >
        <nav className={styles.mobileNav} aria-label="Mobile">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`${styles.mobileLink} ${isActive(it.href) ? styles.active : ""}`}
            >
              {it.label}
            </Link>
          ))}
          <div className={styles.mobileLang}>
            <Link href={`/el${currentPath}`} aria-label="Greek">EL</Link>
            <span> / </span>
            <Link href={`/en${currentPath}`} aria-label="English">EN</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
