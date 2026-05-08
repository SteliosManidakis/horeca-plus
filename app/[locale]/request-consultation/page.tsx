import type { Metadata } from "next";
import ConsultationForm from "./ConsultationForm";
import { getServiceById, type Locale } from "src/content/services";

const siteUrl = "https://horeca-plus.gr";

function copy(locale: Locale, el: string, en: string) {
  return locale === "el" ? el : en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = copy(locale, "Αίτημα πρώτης συμβουλευτικής συζήτησης", "Request an introductory consultation");
  const description = copy(
    locale,
    "Στείλε αίτημα για μια πρώτη συζήτηση με τη HORECA Plus σχετικά με τις ανάγκες της επιχείρησής σου.",
    "Send a request for an introductory discussion with HORECA Plus about your business needs."
  );
  const canonical = `${siteUrl}/${locale}/request-consultation`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "el-GR": `${siteUrl}/el/request-consultation`,
        "en-US": `${siteUrl}/en/request-consultation`,
        "x-default": `${siteUrl}/el/request-consultation`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "HORECA Plus",
      locale: locale === "el" ? "el_GR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RequestConsultationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  const { service = "" } = await searchParams;
  const selectedService = getServiceById(service);

  return (
    <section className="consultationPage">
      <div className="consultationPage__intro">
        <div className="onepage-eyebrow">
          {copy(locale, "Πρώτη συζήτηση", "Introductory consultation")}
        </div>
        <h1>
          {copy(
            locale,
            "Ας δούμε πώς μπορεί να οργανωθεί μια ουσιαστική συνεργασία",
            "Let us explore how a meaningful collaboration can be structured"
          )}
        </h1>
        <p>
          {selectedService
            ? copy(
                locale,
                `Η φόρμα έχει προεπιλεγμένη την υπηρεσία: ${selectedService.title.el}.`,
                `The form is preselected for: ${selectedService.title.en}.`
              )
            : copy(
                locale,
                "Συμπλήρωσε τα βασικά στοιχεία και θα επικοινωνήσουμε μαζί σου για μια πρώτη εικόνα των αναγκών της επιχείρησης.",
                "Fill in the basic details and we will contact you for an initial view of the business needs."
              )}
        </p>
      </div>

      <div className="consultationPage__grid">
        <div className="consultationPage__note">
          <h2>{copy(locale, "Τι συζητάμε αρχικά", "What we discuss first")}</h2>
          <ul>
            <li>{copy(locale, "Το προφίλ και το στάδιο της επιχείρησης.", "The business profile and stage.")}</li>
            <li>{copy(locale, "Τις βασικές λειτουργικές ή οικονομικές προκλήσεις.", "The key operational or financial challenges.")}</li>
            <li>{copy(locale, "Ποια πεδία χρειάζονται άμεση προτεραιότητα.", "Which areas need immediate priority.")}</li>
            <li>{copy(locale, "Πώς μπορεί να στηθεί ένα πρακτικό πλάνο υποστήριξης.", "How a practical support plan can be structured.")}</li>
          </ul>
        </div>

        <ConsultationForm locale={locale} initialService={service} />
      </div>
    </section>
  );
}
