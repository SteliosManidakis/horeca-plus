import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { servicesContent, type Locale } from "src/content/services";
import { siteImages } from "src/content/images";

const siteUrl = "https://horeca-plus.gr";

function label(locale: Locale, el: string, en: string) {
  return locale === "el" ? el : en;
}

function serviceJsonLd(locale: Locale) {
  const services = servicesContent.map((service) => ({
    "@type": "Service",
    "@id": `${siteUrl}/${locale}/services#${service.id}`,
    name: service.title[locale],
    description: service.summary[locale],
    url: `${siteUrl}/${locale}/services#${service.id}`,
    image: `${siteUrl}${service.image}`,
    provider: {
      "@id": `${siteUrl}/#localbusiness`,
    },
    areaServed: [
      { "@type": "City", name: label(locale, "Αθήνα", "Athens") },
      { "@type": "AdministrativeArea", name: label(locale, "Νότια Προάστια", "Southern Suburbs") },
      { "@type": "Country", name: label(locale, "Ελλάδα", "Greece") },
      { "@type": "VirtualLocation", url: siteUrl },
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      url: `${siteUrl}/${locale}/request-consultation?service=${service.id}`,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: "HORECA Plus",
        url: siteUrl,
        logo: `${siteUrl}${siteImages.logos.header}`,
        image: `${siteUrl}${siteImages.socialShare}`,
        email: "horecaplusgr@gmail.com",
        telephone: "+30 693 72 46 891",
        address: {
          "@type": "PostalAddress",
          addressLocality: label(locale, "Βούλα", "Voula"),
          addressRegion: label(locale, "Αττική", "Attica"),
          addressCountry: "GR",
        },
        areaServed: [
          label(locale, "Αθήνα", "Athens"),
          label(locale, "Νότια Προάστια", "Southern Suburbs"),
          label(locale, "Online", "Online"),
        ],
        priceRange: "$$",
      },
      ...services,
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEl = locale === "el";
  const title = isEl
    ? "Υπηρεσίες HORECA consulting για εστίαση και τουρισμό"
    : "HORECA consulting services for hospitality and tourism";
  const description = isEl
    ? "Οικονομικός σχεδιασμός, κοστολόγηση, τιμολογιακή πολιτική, λειτουργική οργάνωση, προμήθειες, menu engineering και εκπαίδευση για επιχειρήσεις εστίασης και τουρισμού."
    : "Financial planning, costing, pricing, operations, procurement, menu engineering and training for hospitality and tourism businesses.";
  const canonical = `${siteUrl}/${locale}/services`;

  return {
    title,
    description,
    keywords: isEl
      ? [
          "HORECA consulting Αθήνα",
          "σύμβουλος εστίασης",
          "κοστολόγηση εστιατορίου",
          "λειτουργική οργάνωση εστιατορίου",
          "menu engineering",
          "τουριστικές επιχειρήσεις",
        ]
      : [
          "HORECA consulting Greece",
          "hospitality consultant",
          "restaurant costing",
          "restaurant operations",
          "menu engineering",
          "tourism business consulting",
        ],
    alternates: {
      canonical,
      languages: {
        "el-GR": `${siteUrl}/el/services`,
        "en-US": `${siteUrl}/en/services`,
        "x-default": `${siteUrl}/el/services`,
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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const jsonLd = JSON.stringify(serviceJsonLd(locale)).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <section className="servicesHero">
        <div className="servicesHero__content">
          <div className="onepage-eyebrow">
            {label(locale, "Υπηρεσίες", "Services")}
          </div>
          <h1 className="servicesHero__title">
            {label(
              locale,
              "Συμβουλευτική υποστήριξη για πιο οργανωμένες και αποδοτικές επιχειρήσεις HORECA",
              "Consulting support for more organized and profitable HORECA businesses"
            )}
          </h1>
          <p className="servicesHero__lead">
            {label(
              locale,
              "Καλύπτουμε κρίσιμα πεδία λειτουργίας, από την οικονομική εικόνα και την κοστολόγηση μέχρι τις διαδικασίες, τις προμήθειες, τον κατάλογο και την εκπαίδευση της ομάδας.",
              "We cover critical operating areas, from financial visibility and costing to processes, procurement, menu structure and team training."
            )}
          </p>
          <div className="servicesHero__actions">
            <Link href={`/${locale}/request-consultation`} className="onepage-btn onepage-btn--primary">
              {label(locale, "Ζήτησε πρώτη συζήτηση", "Request an introductory call")}
            </Link>
            <Link href={`/${locale}/contact`} className="onepage-btn onepage-btn--ghost">
              {label(locale, "Επικοινωνία", "Contact")}
            </Link>
          </div>
        </div>
      </section>

      <nav className="servicesIndex" aria-label={label(locale, "Λίστα υπηρεσιών", "Service list")}>
        {servicesContent.map((service) => (
          <a key={service.id} href={`#${service.id}`}>
            {service.title[locale]}
          </a>
        ))}
      </nav>

      <div className="servicesList">
        {servicesContent.map((service) => (
          <section key={service.id} id={service.id} className="serviceSection">
            <div className="serviceSection__grid">
              <div className="serviceSection__content">
                <h2>{service.title[locale]}</h2>
                <p className="serviceSection__summary">{service.summary[locale]}</p>
                <p className="serviceSection__body">{service.body[locale]}</p>

                <div className="serviceSection__details">
                  <div>
                    <h3>{label(locale, "Τι προσφέρει", "What it provides")}</h3>
                    <ul>
                      {service.offers[locale].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>{label(locale, "Για ποιον είναι", "Who it is for")}</h3>
                    <ul>
                      {service.audience[locale].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <aside className="serviceSection__side">
                <div className="serviceSection__image">
                  <Image
                    src={service.image}
                    alt={service.title[locale]}
                    fill
                    sizes="(max-width: 980px) 100vw, 420px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="serviceSection__panel">
                  <h3>{service.panel.title[locale]}</h3>
                  <p>{service.panel.text[locale]}</p>
                  <Link
                    href={`/${locale}/request-consultation?service=${service.id}`}
                    className="serviceSection__cta"
                  >
                    {label(locale, "Αίτημα για αυτή την υπηρεσία", "Request this service")}
                  </Link>
                </div>
              </aside>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
