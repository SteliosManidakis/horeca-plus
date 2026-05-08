import Image from "next/image";
import Link from "next/link";
import en from "messages/en.json";
import el from "messages/el.json";
import type { Metadata } from "next";
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
  const title = isEl ? "Σχετικά με τη HORECA Plus" : "About HORECA Plus";
  const description = isEl
    ? "Η HORECA Plus λειτουργεί ως στρατηγικός συνεργάτης για επιχειρήσεις εστίασης, hospitality και τουρισμού, με έμφαση σε έλεγχο, οργάνωση και πρακτική εφαρμογή."
    : "HORECA Plus operates as a strategic partner for food service, hospitality and tourism businesses, focused on control, organization and practical execution.";
  const canonical = `${siteUrl}/${locale}/about`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "el-GR": `${siteUrl}/el/about`,
        "en-US": `${siteUrl}/en/about`,
        "x-default": `${siteUrl}/el/about`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "HORECA Plus",
      locale: isEl ? "el_GR" : "en_US",
      type: "website",
      images: [{ url: `${siteUrl}${siteImages.aboutHero}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${siteImages.aboutHero}`],
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "el" ? (el as any) : (en as any);
  const about = t.about as {
    title: string;
    headline: string;
    intro: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    pillarsTitle: string;
    pillars: Array<{ title: string; text: string }>;
  };

  const method =
    locale === "el"
      ? [
          {
            title: "Αποτύπωση",
            text: "Ξεκινάμε από την πραγματική εικόνα της επιχείρησης: αριθμούς, ροές, ομάδα, προμηθευτές και σημεία πίεσης.",
          },
          {
            title: "Σχεδιασμός",
            text: "Μετατρέπουμε τα ευρήματα σε εφαρμόσιμες προτεραιότητες, όχι σε γενικές συστάσεις χωρίς επιχειρησιακή βάση.",
          },
          {
            title: "Εφαρμογή",
            text: "Υποστηρίζουμε την υλοποίηση με πρακτικά εργαλεία, διαδικασίες και καθαρό τρόπο παρακολούθησης.",
          },
        ]
      : [
          {
            title: "Assessment",
            text: "We start from the real business picture: numbers, workflows, team, suppliers and pressure points.",
          },
          {
            title: "Design",
            text: "We turn findings into applicable priorities, not generic recommendations without operating context.",
          },
          {
            title: "Execution",
            text: "We support implementation with practical tools, procedures and clear follow-up.",
          },
        ];

  return (
    <>
      <section className="aboutHero">
        <div className="aboutHero__content">
          <div className="onepage-eyebrow">{about.title}</div>
          <h1>{about.headline}</h1>
          <p className="aboutHero__lead">{about.intro}</p>
        </div>

        <div className="aboutHero__image">
          <Image
            src={siteImages.aboutHero}
            alt="HORECA Plus"
            fill
            priority
            sizes="(max-width: 980px) 100vw, 460px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <section className="aboutNarrative">
        <div className="aboutNarrative__text">
          <p>{about.paragraph1}</p>
          <p>{about.paragraph2}</p>
          <p>{about.paragraph3}</p>
        </div>

        <aside className="aboutNarrative__aside">
          <h2>{copy(locale, "Σε τι δίνουμε έμφαση", "What we focus on")}</h2>
          <ul>
            <li>{copy(locale, "Καθαρή οικονομική και λειτουργική εικόνα", "Clear financial and operational visibility")}</li>
            <li>{copy(locale, "Πρακτικές αποφάσεις με βάση πραγματικά δεδομένα", "Practical decisions based on real data")}</li>
            <li>{copy(locale, "Συνέπεια εφαρμογής στην καθημερινή λειτουργία", "Consistent execution in daily operations")}</li>
          </ul>
        </aside>
      </section>

      <section className="aboutMethod">
        <div className="aboutMethod__header">
          <div className="onepage-eyebrow">
            {copy(locale, "Τρόπος εργασίας", "How we work")}
          </div>
          <h2>
            {copy(
              locale,
              "Η συνεργασία χτίζεται με καθαρή σειρά ενεργειών",
              "Collaboration is built through a clear sequence of actions"
            )}
          </h2>
        </div>

        <div className="aboutMethod__grid">
          {method.map((item) => (
            <article key={item.title} className="aboutMethod__card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="aboutPillars">
        <div className="aboutMethod__header">
          <div className="onepage-eyebrow">{about.pillarsTitle}</div>
          <h2>
            {copy(
              locale,
              "Σταθερές αρχές σε κάθε συνεργασία",
              "Stable principles in every collaboration"
            )}
          </h2>
        </div>

        <div className="aboutPillars__grid">
          {about.pillars.map((pillar) => (
            <article key={pillar.title} className="aboutPillars__card">
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="aboutCta">
        <div>
          <div className="onepage-eyebrow">
            {copy(locale, "Πρώτη συζήτηση", "Introductory discussion")}
          </div>
          <h2>
            {copy(
              locale,
              "Αν θέλεις καλύτερη εικόνα και περισσότερο έλεγχο, ξεκινάμε από τις πραγματικές ανάγκες.",
              "If you want clearer visibility and stronger control, we start from the real needs."
            )}
          </h2>
        </div>
        <Link href={`/${locale}/request-consultation`} className="onepage-btn onepage-btn--primary">
          {copy(locale, "Ζήτησε πρώτη συζήτηση", "Request an introductory call")}
        </Link>
      </section>
    </>
  );
}
