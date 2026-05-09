import Link from "next/link";
import type { Metadata } from "next";

type Locale = "el" | "en";

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
  const title = copy(locale, "Όροι & Προϋποθέσεις", "Terms & Conditions");
  const description = copy(
    locale,
    "Όροι χρήσης της ιστοσελίδας και βασικό πλαίσιο παροχής συμβουλευτικών υπηρεσιών από τη HORECA Plus.",
    "Website terms of use and basic framework for consulting services provided by HORECA Plus."
  );
  const canonical = `${siteUrl}/${locale}/terms`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "el-GR": `${siteUrl}/el/terms`,
        "en-US": `${siteUrl}/en/terms`,
        "x-default": `${siteUrl}/el/terms`,
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

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="legalPage">
      <header className="legalHero">
        <div className="onepage-eyebrow">HORECA PLUS</div>
        <h1>{copy(locale, "Όροι & Προϋποθέσεις", "Terms & Conditions")}</h1>
        <p>
          {copy(
            locale,
            "Οι παρόντες όροι περιγράφουν τη χρήση της ιστοσελίδας και το βασικό πλαίσιο επικοινωνίας και συνεργασίας με τη HORECA Plus.",
            "These terms describe use of the website and the basic framework for communication and collaboration with HORECA Plus."
          )}
        </p>
      </header>

      <section>
        <h2>{copy(locale, "1. Περιγραφή υπηρεσιών", "1. Services description")}</h2>
        <p>
          {copy(
            locale,
            "Η HORECA Plus παρέχει συμβουλευτική υποστήριξη σε επιχειρήσεις εστίασης, hospitality και τουρισμού σε πεδία όπως οικονομικός σχεδιασμός, κοστολόγηση, τιμολογιακή πολιτική, λειτουργική οργάνωση, προμήθειες, εκπαίδευση και επιχειρησιακή υποστήριξη.",
            "HORECA Plus provides consulting support to food service, hospitality and tourism businesses in areas such as financial planning, costing, pricing, operations organization, procurement, training and business support."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "2. Πλαίσιο συνεργασίας", "2. Collaboration framework")}</h2>
        <p>
          {copy(
            locale,
            "Η αποστολή φόρμας ή μηνύματος μέσω της ιστοσελίδας δεν δημιουργεί αυτόματα σύμβαση συνεργασίας. Οποιαδήποτε συνεργασία συμφωνείται ξεχωριστά, με βάση το αντικείμενο, το χρονοδιάγραμμα, τις αμοιβές και τις ευθύνες των μερών.",
            "Submitting a form or message through the website does not automatically create a service agreement. Any collaboration is agreed separately based on scope, timeline, fees and responsibilities."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "3. Κανόνες συμμετοχής και πληροφορίες πελάτη", "3. Participation rules and client information")}</h2>
        <p>
          {copy(
            locale,
            "Για την ορθή παροχή υπηρεσιών, ο πελάτης οφείλει να παρέχει ακριβείς και πλήρεις πληροφορίες. Η HORECA Plus βασίζεται στα διαθέσιμα στοιχεία που παρέχονται από την επιχείρηση και δεν ευθύνεται για λανθασμένα συμπεράσματα που προκύπτουν από ανακριβή ή ελλιπή δεδομένα.",
            "For proper service delivery, the client must provide accurate and complete information. HORECA Plus relies on the available data provided by the business and is not responsible for conclusions affected by inaccurate or incomplete data."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "4. Χρήση ιστοσελίδας", "4. Website use")}</h2>
        <p>
          {copy(
            locale,
            "Η ιστοσελίδα παρέχεται για ενημερωτικούς και επικοινωνιακούς σκοπούς. Δεν επιτρέπεται η χρήση της για παράνομες ενέργειες, αποστολή κακόβουλου περιεχομένου, παραβίαση συστημάτων ή απόπειρα μη εξουσιοδοτημένης πρόσβασης.",
            "The website is provided for informational and communication purposes. It must not be used for unlawful activity, malicious content, system abuse or unauthorized access attempts."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "5. Πνευματική ιδιοκτησία", "5. Intellectual property")}</h2>
        <p>
          {copy(
            locale,
            "Το περιεχόμενο της ιστοσελίδας, συμπεριλαμβανομένων κειμένων, δομής, εικόνων, λογοτύπων και σχεδιαστικών στοιχείων, προστατεύεται από δικαιώματα πνευματικής ιδιοκτησίας. Δεν επιτρέπεται αντιγραφή, αναπαραγωγή ή εμπορική χρήση χωρίς προηγούμενη άδεια.",
            "Website content, including text, structure, images, logos and design elements, is protected by intellectual property rights. Copying, reproduction or commercial use is not permitted without prior permission."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "6. Περιορισμός ευθύνης", "6. Liability disclaimer")}</h2>
        <p>
          {copy(
            locale,
            "Οι πληροφορίες της ιστοσελίδας έχουν γενικό ενημερωτικό χαρακτήρα και δεν αποτελούν εξατομικευμένη οικονομική, νομική ή φορολογική συμβουλή. Η HORECA Plus δεν εγγυάται συγκεκριμένο επιχειρηματικό αποτέλεσμα χωρίς πλήρη ανάλυση και συμφωνημένο πλαίσιο συνεργασίας.",
            "The information on this website is general and informational and does not constitute individualized financial, legal or tax advice. HORECA Plus does not guarantee a specific business outcome without full analysis and an agreed collaboration framework."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "7. Προσωπικά δεδομένα", "7. Personal data")}</h2>
        <p>
          {copy(
            locale,
            "Η επεξεργασία προσωπικών δεδομένων περιγράφεται στην Πολιτική Απορρήτου & Cookies.",
            "Personal data processing is described in the Privacy & Cookies Policy."
          )}{" "}
          <Link href={`/${locale}/privacy-cookies`}>
            {copy(locale, "Δες την πολιτική εδώ.", "Read the policy here.")}
          </Link>
        </p>
      </section>

      <section>
        <h2>{copy(locale, "8. Εφαρμοστέο δίκαιο και δικαιοδοσία", "8. Governing law and jurisdiction")}</h2>
        <p>
          {copy(
            locale,
            "Οι παρόντες όροι διέπονται από το ελληνικό δίκαιο. Για οποιαδήποτε διαφορά, αρμόδια είναι τα ελληνικά δικαστήρια, εκτός αν ορίζεται διαφορετικά από υποχρεωτική διάταξη νόμου.",
            "These terms are governed by Greek law. Any dispute is subject to the competent Greek courts, unless otherwise required by mandatory law."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "9. Επικοινωνία", "9. Contact")}</h2>
        <p>
          {copy(locale, "Για ερωτήσεις σχετικά με τους όρους, μπορείς να επικοινωνήσεις στο", "For questions about these terms, contact")}{" "}
          <a href="mailto:info@horeca-plus.gr">info@horeca-plus.gr</a>.
        </p>
      </section>
    </article>
  );
}
