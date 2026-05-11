import Image from "next/image";
import Link from "next/link";
import en from "messages/en.json";
import el from "messages/el.json";
import type { Metadata } from "next";
import { servicesContent } from "src/content/services";
import { siteImages } from "src/content/images";

type Locale = "el" | "en";

const siteUrl = "https://horeca-plus.gr";

function copy(locale: Locale, elText: string, enText: string) {
  return locale === "el" ? elText : enText;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEl = locale === "el";
  const title = isEl
    ? "Στρατηγική υποστήριξη για επιχειρήσεις εστίασης και τουρισμού"
    : "Strategic support for hospitality and tourism businesses";
  const description = isEl
    ? "Η HORECA Plus υποστηρίζει επιχειρήσεις εστίασης και τουρισμού με λειτουργική οργάνωση, κοστολόγηση, στρατηγική σκέψη και πρακτικές λύσεις."
    : "HORECA Plus supports hospitality and tourism businesses with operational structure, costing, strategic thinking and practical solutions.";
  const canonical = `${siteUrl}/${locale}/home`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "el-GR": `${siteUrl}/el/home`,
        "en-US": `${siteUrl}/en/home`,
        "x-default": `${siteUrl}/el/home`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "HORECA Plus",
      locale: isEl ? "el_GR" : "en_US",
      type: "website",
      images: [{ url: `${siteUrl}/images/home/horecaplus.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/images/home/horecaplus.jpg`],
    },
  };
}

export default async function Page({ params }: any) {
  const p = typeof params?.then === "function" ? await params : params;
  const locale: Locale = p?.locale === "el" ? "el" : "en";
  const t = locale === "el" ? (el as any) : (en as any);

  const servicePreview = servicesContent.slice(0, 4);
  const proofPoints =
    locale === "el"
      ? [
          "Καθαρή εικόνα τιμών, κόστους και περιθωρίου κέρδους",
          "Λειτουργικές διαδικασίες που μπορούν να εφαρμοστούν στην πράξη",
          "Συντονισμός οικονομικών, προμηθειών, ομάδας και καθημερινής λειτουργίας",
        ]
      : [
          "Clear visibility over cost, pricing and margins",
          "Operational procedures that can be applied in practice",
          "Coordination of finance, procurement, team and daily operations",
        ];

  return (
    <>
      <section className="homeHero">
        <div className="homeHero__grid">
          <div>
            <div className="onepage-eyebrow">HORECA PLUS</div>
            <h1 className="homeHero__title">{t.nav.title}</h1>
            <p className="homeHero__lead">{t.nav.title2}</p>
            <p className="homeHero__copy">{t.nav.title3}</p>
            <div className="homeHero__actions">
              <Link href={`/${locale}/request-consultation`} className="onepage-btn onepage-btn--primary">
                {t.nav.cta}
              </Link>
              <Link href={`/${locale}/services`} className="onepage-btn onepage-btn--ghost">
                {copy(locale, "Δες τις υπηρεσίες", "Explore services")}
              </Link>
            </div>
          </div>

          <div className="homeHero__media">
            <Image
              src={siteImages.homeHero}
              alt="HORECA Plus"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 520px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="homeProof">
        <div className="homeProof__intro">
          <div className="onepage-eyebrow">
            {copy(locale, "Προσέγγιση", "Approach")}
          </div>
          <h2>
            {copy(
              locale,
              "Σοβαρή επιχειρησιακή υποστήριξη, χωρίς περιττή θεωρία",
              "Serious business support without unnecessary theory"
            )}
          </h2>
        </div>
        <div className="homeProof__list">
          {proofPoints.map((point) => (
            <div key={point} className="homeProof__item">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="homePreview">
        <div className="homePreview__header">
          <div>
            <div className="onepage-eyebrow">{t.nav.services}</div>
            <h2>{copy(locale, "Κρίσιμα πεδία υποστήριξης", "Critical areas of support")}</h2>
          </div>
          <Link href={`/${locale}/services`} className="homePreview__link">
            {copy(locale, "Όλες οι υπηρεσίες", "All services")}
          </Link>
        </div>

        <div className="homePreview__grid">
          {servicePreview.map((service) => (
            <article key={service.id} className="homePreview__card">
              <h3>{service.title[locale]}</h3>
              <p>{service.summary[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="homeCta">
        <div>
          <div className="onepage-eyebrow">
            {copy(locale, "Πρώτη συζήτηση", "Introductory discussion")}
          </div>
          <h2>
            {copy(
              locale,
              "Αν υπάρχει ανάγκη για καλύτερο έλεγχο, ξεκινάμε από καθαρή αποτύπωση.",
              "If stronger control is needed, we start with a clear assessment."
            )}
          </h2>
        </div>
        <div className="homeCta__actions">
          <Link href={`/${locale}/request-consultation`} className="onepage-btn onepage-btn--primary">
            {copy(locale, "Ζήτησε πρώτη συζήτηση", "Request an introductory call")}
          </Link>
          <Link href={`/${locale}/casestudies`} className="onepage-btn onepage-btn--ghost">
            {copy(locale, "Δες ενδεικτικά σενάρια", "View indicative scenarios")}
          </Link>
        </div>
      </section>
    </>
  );
}
