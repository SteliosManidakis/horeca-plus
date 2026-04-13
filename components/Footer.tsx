"use client";

import Link from "next/link";

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
        </div>

        <div className="hp-footerCol">
          <h4 className="hp-footerHeading">
            {locale === "el" ? "Πλοήγηση" : "Navigation"}
          </h4>

          <nav className="hp-footerNav">
            <Link href={`/${locale}/home#home`}>{nav.home}</Link>
            <Link href={`/${locale}/home#about`}>{nav.about}</Link>
            <Link href={`/${locale}/home#services`}>{nav.services}</Link>
            <Link href={`/${locale}/home#casestudies`}>{nav.casestudies}</Link>
            <Link href={`/${locale}/home#contact`}>{nav.contact}</Link>
          </nav>
        </div>

        <div className="hp-footerCol">
          <h4 className="hp-footerHeading">
            {locale === "el" ? "Επικοινωνία" : "Contact"}
          </h4>

          <div className="hp-footerContact">
            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={socials.facebook} target="_blank" rel="noopener noreferrer">
              {socials.facebookLabel}
            </a>
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
              {socials.instagramLabel}
            </a>
            {linkedinOk && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                {socials.linkedinLabel}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="hp-footerBottom container">
        <span>{messages.footer.copyright}</span>
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
          gap: 36px;
          padding: 56px 16px 28px;
        }

        .hp-footerCol {
          min-width: 0;
        }

        .hp-footerEyebrow {
          margin-bottom: 12px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #c7a15b;
          font-family: var(--font-montserrat), Arial, sans-serif;
        }

        .hp-footerTitle {
          margin: 0 0 14px;
          font-size: 28px;
          line-height: 1.15;
          font-weight: 700;
          color: #fff;
          font-family: var(--font-montserrat), Arial, sans-serif;
        }

        .hp-footerText {
          margin: 0;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(244, 241, 234, 0.86);
        }

        .hp-footerHeading {
          margin: 0 0 14px;
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
          gap: 10px;
        }

        .hp-footer a {
          color: rgba(255, 255, 255, 0.86);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .hp-footer a:hover {
          color: #fff;
        }

        .hp-footerBottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 16px 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 13px;
          color: rgba(255, 255, 255, 0.62);
        }

        @media (max-width: 900px) {
          .hp-footerInner {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 40px 16px 24px;
          }

          .hp-footerTitle {
            font-size: 24px;
          }

          .hp-footerBottom {
            padding: 16px 16px 24px;
          }
        }
      `}</style>
    </footer>
  );
}