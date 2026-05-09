"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { openCookieSettings } from "components/CookieConsent";
import { siteImages } from "src/content/images";

type Props = {
  locale: "el" | "en";
  messages: any;
};

export default function Footer({ locale, messages }: Props) {
  const nav = messages?.nav ?? {};
  const contact = messages?.contact ?? {};
  const socials = contact?.socials ?? {};

  const linkedinOk =
    typeof socials.linkedin === "string" &&
    socials.linkedin.length > 0 &&
    !socials.linkedin.includes("instagram.com");

  return (
    <footer className="hp-footer">
      <div className="hp-footerInner container">
        <div className="hp-footerCol hp-footerBrand">
          <div className="hp-footerEyebrow">HORECA PLUS</div>
          <h3 className="hp-footerTitle">
            {locale === "el"
              ? "Στρατηγικός συνεργάτης για επιχειρήσεις εστίασης και τουρισμού"
              : "Strategic partner for hospitality and tourism businesses"}
          </h3>
          <p className="hp-footerText">
            {locale === "el"
              ? "Υποστηρίζουμε επιχειρήσεις με πρακτική σκέψη, επιχειρησιακή γνώση και λύσεις που οδηγούν σε καλύτερο έλεγχο, οργάνωση και αποτέλεσμα."
              : "We support businesses with practical thinking, operational expertise and solutions that lead to better control, organization and results."}
          </p>
          <div className="hp-footerLogo">
            <Image
              src={siteImages.logos.footer}
              alt="HORECA Plus"
              width={150}
              height={64}
            />
          </div>
        </div>

        <div className="hp-footerCol">
          <h4 className="hp-footerHeading">
            {locale === "el" ? "Πλοήγηση" : "Navigation"}
          </h4>

          <nav className="hp-footerNav">
            <Link href={`/${locale}/home`}>{nav.home}</Link>
            <Link href={`/${locale}/about`}>{nav.about}</Link>
            <Link href={`/${locale}/services`}>{nav.services}</Link>
            <Link href={`/${locale}/casestudies`}>{nav.casestudies}</Link>
            <Link href={`/${locale}/request-consultation`}>
              {locale === "el" ? "Πρώτη συζήτηση" : "Introductory call"}
            </Link>
            <Link href={`/${locale}/contact`}>{nav.contact}</Link>
          </nav>
        </div>

        <div className="hp-footerCol">
          <h4 className="hp-footerHeading">
            {locale === "el" ? "Επικοινωνία" : "Contact"}
          </h4>

          <div className="hp-footerContact">
            <span className="hp-footerContactItem">
              <FiMapPin aria-hidden />
              <span>{locale === "el" ? "Επτανήσου 3, Βούλα, 16673, Αθήνα" : "3 Eptanisou St., Voula, 16673, Athens"}</span>
            </span>
            <a href={`tel:${contact.phone}`} className="hp-footerContactItem">
              <FiPhone aria-hidden />
              <span>{contact.phone}</span>
            </a>
            <a href={`mailto:${contact.email}`} className="hp-footerContactItem">
              <FiMail aria-hidden />
              <span>{contact.email}</span>
            </a>
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
        </div>
      </div>

      <div className="hp-footerBottom container">
        <span>{messages.footer.copyright}</span>
        <nav className="hp-footerLegal" aria-label={locale === "el" ? "Νομικά" : "Legal"}>
          <Link href={`/${locale}/terms`}>
            {locale === "el" ? "Όροι" : "Terms"}
          </Link>
          <Link href={`/${locale}/privacy-cookies`}>
            {locale === "el" ? "Απόρρητο & Cookies" : "Privacy & Cookies"}
          </Link>
          <button type="button" onClick={openCookieSettings}>
            {locale === "el" ? "Ρυθμίσεις cookies" : "Cookie settings"}
          </button>
        </nav>
      </div>

      <style jsx>{`
        .hp-footer {
          margin-top: 0;
          border-top: 1px solid #e9e6df;
          background: #111;
          color: #f4f1ea;
        }

        .hp-footerInner {
          display: grid;
          grid-template-columns: 1.3fr 0.8fr 1fr;
          gap: 30px;
          padding: 8px 16px 14px;
        }

        .hp-footerCol {
          min-width: 0;
        }

        .hp-footerEyebrow {
          margin-bottom: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #c7a15b;
          font-family: var(--font-montserrat), Arial, sans-serif;
        }

        .hp-footerTitle {
          margin: 0 0 10px;
          font-size: 23px;
          line-height: 1.15;
          font-weight: 700;
          color: #fff;
          font-family: var(--font-montserrat), Arial, sans-serif;
        }

        .hp-footerText {
          margin: 0;
          font-size: 15px;
          line-height: 1.55;
          color: rgba(244, 241, 234, 0.86);
        }

        .hp-footerLogo {
          margin-top: 12px;
          line-height: 0;
        }

        .hp-footerLogo :global(img) {
          width: 120px;
          height: auto;
          object-fit: contain;
        }

        .hp-footerHeading {
          margin: 0 0 10px;
          font-size: 15px;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #c7a15b;
          font-family: var(--font-montserrat), Arial, sans-serif;
        }

        .hp-footerNav,
        .hp-footerContact {
          display: grid;
          gap: 0;
        }

        .hp-footerContact {
          gap: 20px;
        }

        .hp-footerContact :global(a),
        .hp-footerContactItem {
          display: grid;
          grid-template-columns: 16px 1fr;
          gap: 10px;
          align-items: start;
        }

        .hp-footerContact :global(svg) {
          width: 14px;
          height: 14px;
          margin-top: 2px;
          color: #c7a15b;
        }

        .hp-footer :global(a),
        .hp-footerContact span {
          color: rgba(255, 255, 255, 0.86);
          text-decoration: none;
          transition: color 0.2s ease;
          line-height: 1.1;
          padding: 1px 0;
        }

        .hp-footerNav :global(a) {
          display: block;
          line-height: 2;
          padding: 2;
          margin: 0;
        }

        .hp-footerLegal {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .hp-footerLegal :global(a) {
          color: rgba(255, 255, 255, 0.62);
          line-height: 1;
          padding: 0;
          text-decoration: none;
        }

        .hp-footerLegal button {
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.62);
          cursor: pointer;
          font: inherit;
          line-height: 1;
          padding: 0;
        }

        .hp-footerLegal :global(a:hover),
        .hp-footerLegal button:hover {
          color: #fff;
        }

        .hp-footer :global(a:hover) {
          color: #fff;
        }

        .hp-footerBottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 13px;
          color: rgba(255, 255, 255, 0.62);
        }

        @media (max-width: 900px) {
          .hp-footerInner {
            grid-template-columns: 1fr;
            gap: 18px;
            padding: 8px 16px 16px;
          }

          .hp-footerTitle {
            font-size: 24px;
          }

          .hp-footerBottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
            padding: 16px 16px 24px;
          }
        }
      `}</style>
    </footer>
  );
}
