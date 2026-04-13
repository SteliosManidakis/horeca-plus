// app/[locale]/casestudies/page.tsx

import Link from "next/link";
import type { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = typeof params?.then === 'function' ? await params : params
  const locale: 'el' | 'en' = p?.locale === 'el' ? 'el' : 'en'
  const isEl = locale === 'el'

  const title = isEl ? 'Case Studies' : 'Case Studies'
  const description = isEl
    ? 'Ενδεικτικά σενάρια έργων και πεδία επιχειρησιακής παρέμβασης για επιχειρήσεις εστίασης και τουρισμού.'
    : 'Indicative project scenarios and fields of operational intervention for hospitality and tourism businesses.'

  const canonical = `https://horeca-plus.gr/${locale}/casestudies`

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'el-GR': 'https://horeca-plus.gr/el/casestudies',
        'en-US': 'https://horeca-plus.gr/en/casestudies',
        'x-default': 'https://horeca-plus.gr/el/casestudies',
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'HORECA Plus',
      locale: isEl ? 'el_GR' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://horeca-plus.gr/images/home/hero.jpg',
          width: 1200,
          height: 630,
          alt: 'HORECA Plus',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://horeca-plus.gr/images/home/hero.jpg'],
    },
  }
}

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
