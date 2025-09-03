import Image from 'next/image'
import en from 'messages/en.json'
import el from 'messages/el.json'
import ContactForm from './ContactForm'
import s from './page.module.css'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";


type Locale = 'el' | 'en'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const t = locale === 'el' ? (el as any) : (en as any)

  const contact = t.contact
  const socials = contact.socials as {
    facebook: string
    instagram: string
    linkedin: string
    facebookLabel: string
    instagramLabel: string
    linkedinLabel: string
  }

  return (
    <main className={s.contactWrap}>
      {/* Τίτλοι */}
      <section className={s.title}>
        <h1>{contact.titleTop}</h1>
        <p>{contact.subtitleTop}</p>
      </section>

      {/* ΕΠΑΝΩ ΣΕΙΡΑ: [Αριστερά: Contacts] [Δεξιά: Image] */}
      <section className={s.row}>
        <div className={`${s.card} ${s.stretchCard}`}>
          <ul className={s.list}>
            <li><span aria-hidden>📞</span><a href={`tel:${contact.phone}`}>{contact.phone}</a></li>
            <li><span aria-hidden>✉️</span><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><FaFacebook aria-hidden style={{ fontSize: 22 }} /><a href={socials.facebook} target="_blank" rel="noopener noreferrer">{socials.facebookLabel}</a></li>
            <li><FaInstagram aria-hidden style={{ fontSize: 22 }} /><a href={socials.instagram} target="_blank" rel="noopener noreferrer">{socials.instagramLabel}</a></li>
            <li><FaLinkedin aria-hidden style={{ fontSize: 22 }} /><a href={socials.linkedin}target="_blank"rel="noopener noreferrer">{socials.linkedinLabel}</a></li>
          </ul>
          <div style={{ flex: 1 }} />
        </div>

        {/* Δεξιά — εικόνα με ίδιο “οπτικό πλάτος” (padding στο mediaCard) */}
        <div className={s.mediaCard}>
          <div className={s.mediaInner}>
            <div className={s.topMediaBox}>
              <Image
                src="/images/contact/contact.jpg"
                alt={locale === 'el' ? 'Επικοινωνία' : 'Contact us'}
                fill
                priority
                className={s.mediaImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ΚΑΤΩ ΣΕΙΡΑ: [Αριστερά: Map] [Δεξιά: Form] */}
      <section className={s.row}>
        {/* Αριστερά — χάρτης */}
        <div className={s.mediaCard}>
          <div className={s.mediaInner}>
            <div className={s.mapBox}>
              <iframe
                className={s.mediaIframe}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25206.072543381757!2d23.742530042114005!3d37.842525896581165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a19561d7406b57%3A0x400bd2ce2b97be0!2zzpLOv8-NzrvOsQ!5e0!3m2!1sel!2sgr!4v1756725050390!5m2!1sel!2sgr"
                title={locale === 'el' ? 'Χάρτης' : 'Map'}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Δεξιά — φόρμα */}
        <div className={`${s.card} ${s.stretchCard}`}>
          <h2 className={s.formTitle}>{locale === 'el' ? 'Φόρμα Επικοινωνίας' : 'Contact Form'}</h2>
          <ContactForm t={t} />
        </div>
      </section>
    </main>
  )
}
