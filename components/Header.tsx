"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  locale: "el" | "en";
  messages: any;
};

export default function Header({ locale, messages }: Props) {
  const t = messages.nav;
  const pathname = usePathname();

  // Αφαίρεσε το locale από την αρχή του path
  // Παράδειγμα: "/el/contact" -> "/contact"
  let currentPath = pathname.replace(/^\/(el|en)(?=\/|$)/, "");

  // Αν μείνει κενό (δηλ. ήσουν στο /el ή /en),
  // τότε στείλε στο /home για να μη βγάλει 404
  if (currentPath === "" || currentPath === "/") {
    currentPath = "/home";
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#fff",
        padding: "12px 24px",
        borderBottom: "1px solid #eee",
        display: "flex",
        gap: 16,
        alignItems: "center",
      }}
    >
      <Link
        href={/${locale}/home}
        style={{
          display: "inline-flex",
          alignItems: "center",
          lineHeight: 0,
        }}
      >
        <Image
          src="/images/home/hrc.jpg"
          alt="HORECA Plus Logo"
          width={220}
          height={60}
          priority
          sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 220px"
          style={{
            height: "clamp(24px, 5vw, 48px)",
            width: "auto",
            display: "block",
          }}
        />
      </Link>

      <nav style={{ display: "flex", gap: 12 }}>
        <Link href={/${locale}/home}>{t.home}</Link>
        <Link href={/${locale}/about}>{t.about}</Link>
        <Link href={/${locale}/services}>{t.services}</Link>
        <Link href={/${locale}/casestudies}>{t.casestudies}</Link>
        <Link href={/${locale}/contact}>{t.contact}</Link>
      </nav>

      <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
        <Link href={/el${currentPath}} aria-label="Greek">
          EL
        </Link>
        <span>/</span>
        <Link href={/en${currentPath}} aria-label="English">
          EN
        </Link>
      </div>
    </header>
  );
}
