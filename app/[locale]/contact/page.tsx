import Image from "next/image";
import Link from "next/link";
import en from "messages/en.json";
import el from "messages/el.json";
import ContactForm from "./ContactForm";
import s from "./page.module.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
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
  const title = isEl ? "Επικοινωνία με τη HORECA Plus" : "Contact HORECA Plus";
  const description = isEl
    ? "Επικοινώνησε με τη HORECA Plus για μία πρώτη συζήτηση σχετικά με τις ανάγκες και τις προτεραιότητες της επιχείρησής σου."
    : "Contact HORECA Plus for an initial discussion about your business needs and priorities.";
  const canonical = `${siteUrl}/${locale}/contact`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "el-GR": `${siteUrl}/el/contact`,
        "en-US": `${siteUrl}/en/contact`,
        "x-default": `${siteUrl}/el/contact`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "HORECA Plus",
      locale: isEl ? "el_GR" : "en_US",
      type: "website",
      images: [{ url: `${siteUrl}${siteImages.contactHero}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${siteImages.contactHero}`],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "el" ? (el as any) : (en as any);
  const contact = t.contact;
  const socials = contact.socials as {
    facebook: string;
    instagram: string;
    linkedin: string;
    facebookLabel: string;
    instagramLabel: string;
    linkedinLabel: string;
  };

  const linkedinOk =
    typeof socials.linkedin === "string" &&
    socials.linkedin.length > 0 &&
    !socials.linkedin.includes("instagram.com");

  return (
    <main className={s.contactPage}>
      <section className={s.hero}>
        <div className={s.heroContent}>
          <div className="onepage-eyebrow">{copy(locale, "Επικοινωνία", "Contact")}</div>
          <h1>{contact.titleTop}</h1>
          <p>{contact.subtitleTop}</p>
          <div className={s.heroActions}>
            <Link href={`/${locale}/request-consultation`} className="onepage-btn onepage-btn--primary">
              {copy(locale, "Ζήτησε πρώτη συζήτηση", "Request an introductory call")}
            </Link>
            <a href={`tel:${contact.phone}`} className="onepage-btn onepage-btn--ghost">
              {copy(locale, "Κάλεσέ μας", "Call us")}
            </a>
          </div>
        </div>

        <div className={s.heroImage}>
          <Image
            src={siteImages.contactHero}
            alt={copy(locale, "Επικοινωνία HORECA Plus", "HORECA Plus contact")}
            fill
            priority
            sizes="(max-width: 980px) 100vw, 460px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <section className={s.contactGrid}>
        <article className={s.infoPanel}>
          <h2>{copy(locale, "Άμεση επικοινωνία", "Direct contact")}</h2>
          <div className={s.contactList}>
            <a href={`tel:${contact.phone}`}>
              <FiPhone aria-hidden />
              <span>{contact.phone}</span>
            </a>
            <a href={`mailto:${contact.email}`}>
              <FiMail aria-hidden />
              <span>{contact.email}</span>
            </a>
            <div>
              <FiMapPin aria-hidden />
              <span>{copy(locale, "Επτανήσου 3, Βούλα, 16673, Αθήνα", "3 Eptanisou St., Voula, 16673, Athens")}</span>
            </div>
          </div>

          <h3>{copy(locale, "Κοινωνικά δίκτυα", "Social media")}</h3>
          <div className={s.socials}>
            <a href={socials.facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebook aria-hidden />
              <span>{socials.facebookLabel}</span>
            </a>
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram aria-hidden />
              <span>{socials.instagramLabel}</span>
            </a>
            {linkedinOk && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin aria-hidden />
                <span>{socials.linkedinLabel}</span>
              </a>
            )}
          </div>

          <div className={s.compactMapBlock}>
            <h3>{copy(locale, "Περιοχή", "Area")}</h3>
            <p>
              {copy(
                locale,
                "Υποστήριξη σε Αθήνα, Νότια Προάστια και online, ανάλογα με τις ανάγκες της επιχείρησης.",
                "Support in Athens, Southern Suburbs and online, depending on the business needs."
              )}
            </p>
            <div className={s.compactMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25206.072543381757!2d23.742530042114005!3d37.842525896581165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a19561d7406b57%3A0x400bd2ce2b97be0!2zzpLOv8-NzrvOsQ!5e0!3m2!1sel!2sgr!4v1756725050390!5m2!1sel!2sgr"
                title={copy(locale, "Χάρτης", "Map")}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </article>

        <article className={s.formPanel}>
          <div className={s.panelHeader}>
            <h2>{copy(locale, "Στείλε μήνυμα", "Send a message")}</h2>
            <p>
              {copy(
                locale,
                "Για γενική επικοινωνία χρησιμοποίησε την παρακάτω φόρμα. Για αίτημα συνεργασίας, προτίμησε την πρώτη συζήτηση.",
                "For general contact use the form below. For collaboration requests, prefer the introductory call form."
              )}
            </p>
          </div>
          <ContactForm t={t} />
        </article>
      </section>

    </main>
  );
}
