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
  const title = copy(locale, "Πολιτική Απορρήτου & Cookies", "Privacy & Cookies Policy");
  const description = copy(
    locale,
    "Πληροφορίες για τα προσωπικά δεδομένα, τις φόρμες, τα cookies, το Google Tag Manager, το GA4 και τα δικαιώματα των χρηστών.",
    "Information about personal data, forms, cookies, Google Tag Manager, GA4 and user rights."
  );
  const canonical = `${siteUrl}/${locale}/privacy-cookies`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "el-GR": `${siteUrl}/el/privacy-cookies`,
        "en-US": `${siteUrl}/en/privacy-cookies`,
        "x-default": `${siteUrl}/el/privacy-cookies`,
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

export default async function PrivacyCookiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="legalPage">
      <header className="legalHero">
        <div className="onepage-eyebrow">HORECA PLUS</div>
        <h1>{copy(locale, "Πολιτική Απορρήτου & Cookies", "Privacy & Cookies Policy")}</h1>
        <p>
          {copy(
            locale,
            "Η πολιτική αυτή εξηγεί ποια δεδομένα συλλέγονται μέσω της ιστοσελίδας, πώς χρησιμοποιούνται και πώς λειτουργεί η συγκατάθεση για cookies και analytics.",
            "This policy explains what data is collected through the website, how it is used and how cookie and analytics consent works."
          )}
        </p>
      </header>

      <section>
        <h2>{copy(locale, "1. Υπεύθυνος επεξεργασίας", "1. Data controller")}</h2>
        <p>
          {copy(
            locale,
            "Υπεύθυνος για την επεξεργασία δεδομένων μέσω της ιστοσελίδας είναι η HORECA Plus. Για θέματα προσωπικών δεδομένων μπορείς να επικοινωνήσεις στο",
            "The controller for data processed through this website is HORECA Plus. For personal data matters, contact"
          )}{" "}
          <a href="mailto:horecaplusgr@gmail.com">horecaplusgr@gmail.com</a>.
        </p>
      </section>

      <section>
        <h2>{copy(locale, "2. Δεδομένα που συλλέγουμε", "2. Data we collect")}</h2>
        <p>
          {copy(
            locale,
            "Μέσω των φορμών μπορεί να συλλέγονται στοιχεία όπως όνομα, επώνυμο, email, τηλέφωνο, επιχείρηση, τύπος επιχείρησης, υπηρεσία ενδιαφέροντος, πόλη/περιοχή και μήνυμα. Τα στοιχεία χρησιμοποιούνται για απάντηση στο αίτημα και για οργάνωση πιθανής συνεργασίας.",
            "Through forms we may collect details such as first name, last name, email, phone, company, business type, service of interest, city/area and message. These details are used to respond to requests and organize potential collaboration."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "3. Φόρμες και email", "3. Forms and email")}</h2>
        <p>
          {copy(
            locale,
            "Τα αιτήματα επικοινωνίας και πρώτης συζήτησης αποστέλλονται στον διαχειριστή της ιστοσελίδας μέσω υπηρεσίας email/transactional email. Όταν ενεργοποιηθεί το Brevo, μπορεί να χρησιμοποιείται για transactional emails και, εφόσον υπάρχει newsletter, για διαχείριση λίστας επαφών.",
            "Contact and introductory consultation requests are sent to the website owner through an email/transactional email service. When Brevo is enabled, it may be used for transactional emails and, if a newsletter is active, contact list management."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "4. Πάροχοι", "4. Providers")}</h2>
        <p>
          {copy(
            locale,
            "Η ιστοσελίδα φιλοξενείται σε υποδομή Vercel. Μπορεί να χρησιμοποιούνται Google Tag Manager και Google Analytics 4 μόνο μετά από σχετική συγκατάθεση του χρήστη. Το Brevo μπορεί να χρησιμοποιηθεί για newsletter και transactional emails όταν ρυθμιστεί.",
            "The website is hosted on Vercel infrastructure. Google Tag Manager and Google Analytics 4 may be used only after the user's relevant consent. Brevo may be used for newsletter and transactional emails when configured."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "5. Cookies", "5. Cookies")}</h2>
        <p>
          {copy(
            locale,
            "Η ιστοσελίδα χρησιμοποιεί απαραίτητα cookies/τοπική αποθήκευση για βασική λειτουργία και αποθήκευση επιλογών συγκατάθεσης. Analytics και marketing cookies φορτώνουν μόνο αν ο χρήστης δώσει συγκατάθεση.",
            "The website uses necessary cookies/local storage for basic functionality and consent choice storage. Analytics and marketing cookies load only if the user gives consent."
          )}
        </p>
        <ul>
          <li>{copy(locale, "Απαραίτητα: πάντα ενεργά για βασική λειτουργία.", "Necessary: always active for basic functionality.")}</li>
          <li>{copy(locale, "Analytics: προαιρετικά, για στατιστική ανάλυση χρήσης.", "Analytics: optional, for usage statistics.")}</li>
          <li>{copy(locale, "Marketing: προαιρετικά, για μελλοντικές marketing λειτουργίες.", "Marketing: optional, for future marketing features.")}</li>
        </ul>
      </section>

      <section>
        <h2>{copy(locale, "6. Μη αποστολή προσωπικών δεδομένων σε analytics", "6. No personal data in analytics events")}</h2>
        <p>
          {copy(
            locale,
            "Τα analytics events δεν πρέπει να περιλαμβάνουν προσωπικά δεδομένα όπως όνομα, email, τηλέφωνο ή μήνυμα. Σε επιτυχημένες υποβολές μπορούν να καταγράφονται μόνο μη προσωπικά events, όπως contact_request_submit, consultation_request_submit ή newsletter_subscribe.",
            "Analytics events must not include personal data such as name, email, phone or message. Successful submissions may only trigger non-personal events such as contact_request_submit, consultation_request_submit or newsletter_subscribe."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "7. Αλλαγή επιλογών cookies", "7. Changing cookie settings")}</h2>
        <p>
          {copy(
            locale,
            "Ο χρήστης μπορεί να αλλάζει τις επιλογές cookies από το κουμπί “Cookie settings” στο footer όταν ενεργοποιηθεί ο μηχανισμός συγκατάθεσης.",
            "The user can change cookie choices from the “Cookie settings” button in the footer once the consent mechanism is enabled."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "8. Χρόνος διατήρησης", "8. Data retention")}</h2>
        <p>
          {copy(
            locale,
            "Τα στοιχεία των φορμών διατηρούνται για όσο είναι απαραίτητο για την απάντηση στο αίτημα, την οργάνωση συνεργασίας και την τήρηση νόμιμων υποχρεώσεων. Δεδομένα newsletter διατηρούνται μέχρι ανάκληση συγκατάθεσης ή διαγραφή.",
            "Form data is retained for as long as needed to respond to the request, organize collaboration and comply with legal obligations. Newsletter data is retained until consent is withdrawn or deletion is requested."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "9. Δικαιώματα χρήστη", "9. User rights")}</h2>
        <p>
          {copy(
            locale,
            "Ο χρήστης μπορεί να ζητήσει πρόσβαση, διόρθωση, διαγραφή, περιορισμό επεξεργασίας ή αντίρρηση, όπου προβλέπεται από την ισχύουσα νομοθεσία. Τα αιτήματα αποστέλλονται στο email επικοινωνίας.",
            "Users may request access, correction, deletion, processing restriction or objection where provided by applicable law. Requests should be sent to the contact email."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "10. Ασφάλεια", "10. Security")}</h2>
        <p>
          {copy(
            locale,
            "Λαμβάνονται εύλογα τεχνικά και οργανωτικά μέτρα για την προστασία των δεδομένων. Καμία μέθοδος μετάδοσης ή αποθήκευσης δεν είναι απόλυτα ασφαλής, αλλά εφαρμόζονται πρακτικές περιορισμού κινδύνου.",
            "Reasonable technical and organizational measures are taken to protect data. No transmission or storage method is absolutely secure, but risk-reduction practices are applied."
          )}
        </p>
      </section>

      <section>
        <h2>{copy(locale, "11. Ενημερώσεις πολιτικής", "11. Policy updates")}</h2>
        <p>
          {copy(
            locale,
            "Η πολιτική μπορεί να ενημερώνεται όταν αλλάζουν οι λειτουργίες της ιστοσελίδας, οι πάροχοι ή οι νομικές απαιτήσεις. Η νεότερη έκδοση δημοσιεύεται σε αυτή τη σελίδα.",
            "This policy may be updated when website features, providers or legal requirements change. The latest version is published on this page."
          )}
        </p>
      </section>
    </article>
  );
}
