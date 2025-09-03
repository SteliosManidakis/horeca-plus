// app/[locale]/casestudies/page.tsx

import Link from "next/link";

export default async function Page({ params }: any) {
  // params μπορεί να είναι είτε object είτε Promise<object> στο δικό σου setup
  const p = typeof params?.then === "function" ? await params : params;
  const locale: "el" | "en" = p?.locale === "el" ? "el" : "en";

  const title = locale === "el" ? "Case Studies" : "Case Studies";
  const desc =
    locale === "el"
      ? "Η σελίδα είναι υπό κατασκευή."
      : "This page is under construction.";

  return (
    <main style={{ paddingTop: "var(--hp-header-h, 72px)", paddingBottom: 40 }}>
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ fontSize: 34, margin: 0 }}>{title}</h1>
        <p style={{ fontSize: 18, color: "#555", marginTop: 12 }}>{desc}</p>

        <div style={{ marginTop: 24 }}>
          <Link
            href={`/${locale}/home`}
            style={{
              display: "inline-block",
              padding: "10px 18px",
              borderRadius: 10,
              textDecoration: "none",
              background: "#111",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {locale === "el" ? "Επιστροφή στην αρχική" : "Back to Home"}
          </Link>
        </div>
      </section>
    </main>
  );
}
