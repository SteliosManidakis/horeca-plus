import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { siteImages } from "src/content/images";

type Locale = "el" | "en";

const siteUrl = "https://horeca-plus.gr";

function copy(locale: Locale, elText: string, enText: string) {
  return locale === "el" ? elText : enText;
}

function getCases(locale: Locale) {
  return locale === "el"
    ? [
        {
          label: "Scenario 01",
          sector: "Εστιατόριο / Food Service",
          title: "Αναδιοργάνωση κόστους και τιμολογιακής πολιτικής",
          text: "Επανεξέταση κοστολόγησης, εμπορικής λογικής και δομής καταλόγου με στόχο καλύτερο έλεγχο περιθωρίου και καθαρότερες αποφάσεις.",
          approach: "Σύνδεση συνταγών, τιμών αγοράς, τιμοκαταλόγου και στόχων κερδοφορίας σε ένα πρακτικό πλαίσιο αποφάσεων.",
          outcome: "Εστίαση σε έλεγχο κόστους, περιθώριο και σαφέστερη εμπορική στρατηγική.",
          image: siteImages.caseStudies.costControl,
        },
        {
          label: "Scenario 02",
          sector: "Ξενοδοχείο / Hospitality",
          title: "Βελτίωση λειτουργικής οργάνωσης και διαδικασιών",
          text: "Χαρτογράφηση ροών, ρόλων και σημείων ασυνέχειας για υποστήριξη πιο σταθερής καθημερινής λειτουργίας και καλύτερου συντονισμού ομάδων.",
          approach: "Οργάνωση διαδικασιών, ευθυνών και καθημερινών ελέγχων ώστε η λειτουργία να είναι πιο προβλέψιμη.",
          outcome: "Έμφαση σε οργάνωση, συνέπεια εφαρμογής και λειτουργική αποδοτικότητα.",
          image: siteImages.caseStudies.operations,
        },
        {
          label: "Scenario 03",
          sector: "Procurement & Supply",
          title: "Έλεγχος προμηθειών και αξιολόγηση προμηθευτών",
          text: "Συγκέντρωση και ανάλυση δεδομένων αγορών, παρακολούθηση τιμών και υποστήριξη επιλογών που ενισχύουν τον εμπορικό έλεγχο.",
          approach: "Δημιουργία καθαρής εικόνας προμηθευτών, τιμών και αγοραστικής συμπεριφοράς για καλύτερη διαπραγμάτευση.",
          outcome: "Καλύτερη εικόνα αγορών, μεγαλύτερη διαφάνεια και ισχυρότερη διαπραγματευτική βάση.",
          image: siteImages.caseStudies.procurement,
        },
      ]
    : [
        {
          label: "01",
          sector: "Restaurant / Food Service",
          title: "Cost structure and pricing policy realignment",
          text: "Review of costing, commercial logic and menu structure to support stronger margin control and clearer decision-making.",
          approach: "Connection of recipes, purchase prices, menu structure and profitability targets into a practical decision framework.",
          outcome: "Focused on cost control, margin improvement and a clearer commercial strategy.",
          image: siteImages.caseStudies.costControl,
        },
        {
          label: "02",
          sector: "Hotel / Hospitality",
          title: "Operational organization and process improvement",
          text: "Mapping of workflows, responsibilities and friction points to support more stable daily operations and better team coordination.",
          approach: "Organization of procedures, responsibilities and daily control points so operations become more predictable.",
          outcome: "Focused on structure, execution consistency and operational efficiency.",
          image: siteImages.caseStudies.operations,
        },
        {
          label: "03",
          sector: "Procurement & Supply",
          title: "Purchasing control and supplier evaluation",
          text: "Collection and analysis of purchasing data, price monitoring and support for decisions that strengthen commercial control.",
          approach: "Creation of clear supplier, price and purchasing visibility to support better negotiation.",
          outcome: "Better purchasing visibility, more transparency and a stronger negotiation base.",
          image: siteImages.caseStudies.procurement,
        },
      ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = copy(locale, "Case Studies και σενάρια έργων", "Case studies and project scenarios");
  const description = copy(
    locale,
    "Σενάρια επιχειρησιακής παρέμβασης για επιχειρήσεις εστίασης, hospitality και τουρισμού.",
    "Operational intervention scenarios for food service, hospitality and tourism businesses."
  );
  const canonical = `${siteUrl}/${locale}/casestudies`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "el-GR": `${siteUrl}/el/casestudies`,
        "en-US": `${siteUrl}/en/casestudies`,
        "x-default": `${siteUrl}/el/casestudies`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "HORECA Plus",
      locale: locale === "el" ? "el_GR" : "en_US",
      type: "website",
      images: [{ url: `${siteUrl}/images/casestudies/case1.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/images/casestudies/case1.jpg`],
    },
  };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const cases = getCases(locale);

  return (
    <>
      <section className="casesHero">
        <div className="onepage-eyebrow">Case Studies</div>
        <h1>
          {copy(
            locale,
            "Σενάρια επιχειρησιακής παρέμβασης",
            "Operational intervention scenarios"
          )}
        </h1>
        <p>
          {copy(
            locale,
            "Τα παρακάτω σενάρια δείχνουν τον τρόπο με τον οποίο προσεγγίζουμε συνήθεις ανάγκες επιχειρήσεων εστίασης, hospitality και τουρισμού.",
            "The following scenarios show how we approach common needs in food service, hospitality and tourism businesses."
          )}
        </p>
      </section>

      <section className="casesList">
        {cases.map((item) => (
          <article key={item.label} className="caseDetail">
            <div className="caseDetail__content">
              <div className="hp-caseMeta">{item.label}</div>
              <div className="hp-caseSector">{item.sector}</div>
              <h2>{item.title}</h2>
              <p className="caseDetail__text">{item.text}</p>

              <div className="caseDetail__columns">
                <div>
                  <h3>{copy(locale, "Προσέγγιση", "Approach")}</h3>
                  <p>{item.approach}</p>
                </div>
                <div>
                  <h3>{copy(locale, "Επιδιωκόμενο αποτέλεσμα", "Intended outcome")}</h3>
                  <p>{item.outcome}</p>
                </div>
              </div>
            </div>

            <div className="caseDetail__image">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 980px) 100vw, 420px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </article>
        ))}
      </section>

      <section className="caseStudiesCta">
        <h2>
          {copy(
            locale,
            "Θέλεις να δούμε πως μπορούμε να βοηθήσουμε και τη δική σου επιχείρηση;",
            "Want to explore how to help your business too?"
          )}
        </h2>
        <Link href={`/${locale}/request-consultation`} className="onepage-btn onepage-btn--primary">
          {copy(locale, "Ζήτησε πρώτη συζήτηση", "Request an introductory call")}
        </Link>
      </section>
    </>
  );
}
