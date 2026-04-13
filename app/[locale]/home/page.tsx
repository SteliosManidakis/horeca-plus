import Image from 'next/image'
import Link from 'next/link'
import en from 'messages/en.json'
import el from 'messages/el.json'

type Locale = 'el' | 'en'

export default async function Page({ params }: any) {
  const p = typeof params?.then === 'function' ? await params : params
  const locale: Locale = p?.locale === 'el' ? 'el' : 'en'
  const t = locale === 'el' ? (el as any) : (en as any)

  const about = t.about as {
    title: string
    headline: string
    intro: string
    paragraph1: string
    paragraph2: string
    paragraph3: string
    pillarsTitle: string
    pillars: Array<{ title: string; text: string }>
  }

  const services = t.services as {
    heroTitle: string
    heroSubtitle: string
    introText: string
    categories: Array<{
      id: string
      title: string
      description: string
      items: Array<{ id: string; slug: string; title: string; short: string }>
    }>
  }

  const contact = t.contact as {
    titleTop: string
    subtitleTop: string
    phone: string
    email: string
    socials: {
      facebook: string
      instagram: string
      linkedin: string
      facebookLabel: string
      instagramLabel: string
      linkedinLabel: string
    }
  }

  return (
    <main style={{ paddingTop: 'var(--hp-header-h, 72px)' }}>
      <section id="home" className="onepage-section--hero onepage-center">
        <div className="onepage-eyebrow">HORECA PLUS</div>

        <h1 className="onepage-title">{t.nav.title}</h1>

        <p className="onepage-copy" style={{ fontSize: 22, color: '#111' }}>
          {t.nav.title2}
        </p>

        <p className="onepage-copy" style={{ marginTop: 16 }}>
          {t.nav.title3}
        </p>

        <div className="onepage-actions">
          <Link href={`/${locale}/home#contact`} className="onepage-btn onepage-btn--primary">
            {t.nav.cta}
          </Link>

          <Link href={`/${locale}/home#services`} className="onepage-btn onepage-btn--ghost">
            {locale === 'el' ? 'Δες τις υπηρεσίες' : 'Explore services'}
          </Link>
        </div>

        <div style={{ height: 34 }} />

        <div className="onepage-heroMedia">
          <Image
            src="/images/home/hero.jpg"
            alt={locale === 'el' ? 'HORECA Plus' : 'HORECA Plus'}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1200px) 92vw, 1100px"
            priority
          />
        </div>
      </section>

      <div className="onepage-divider" />

      <section id="about" className="onepage-section onepage-band">
        <div className="onepage-eyebrow">{about.title}</div>

        <h2 className="onepage-title--section">{about.headline}</h2>

        <p className="onepage-copy" style={{ fontSize: 20, color: '#111' }}>
          {about.intro}
        </p>

        <div style={{ height: 18 }} />

        <p className="onepage-copy">{about.paragraph1}</p>
        <p className="onepage-copy">{about.paragraph2}</p>
        <p className="onepage-copy">{about.paragraph3}</p>

        <div style={{ height: 34 }} />

        <h3
          style={{
            margin: '0 0 18px',
            fontSize: 26,
            lineHeight: 1.2,
            fontWeight: 700,
            color: '#111',
            fontFamily: 'Georgia, serif',
          }}
        >
          {about.pillarsTitle}
        </h3>

        <div className="onepage-grid onepage-grid--2">
          {about.pillars.map((pillar) => (
            <article key={pillar.title} className="onepage-card">
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="onepage-divider" />

      <section id="services" className="onepage-section">
        <div className="onepage-eyebrow">{t.nav.services}</div>

        <h2 className="onepage-title--section">{services.heroTitle}</h2>

        <p className="onepage-copy">{services.heroSubtitle}</p>

        <div style={{ height: 18 }} />

        <p className="onepage-copy">{services.introText}</p>

        <div style={{ height: 30 }} />

        <div className="onepage-grid onepage-grid--3">
          {services.categories.map((cat) => (
            <article key={cat.id} className="onepage-card">
              <h3>{cat.title}</h3>
              <p style={{ marginBottom: 14 }}>{cat.description}</p>

              <div style={{ display: 'grid', gap: 12 }}>
                {cat.items.map((item) => (
                  <div key={item.id}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: '#111',
                        marginBottom: 4,
                        fontSize: 16,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: '#444',
                      }}
                    >
                      {item.short}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="onepage-divider" />

      <section id="casestudies" className="onepage-section onepage-band">
        <div className="onepage-eyebrow">{t.nav.casestudies}</div>

        <h2 className="onepage-title--section">
          {locale === 'el'
            ? 'Παραδείγματα εφαρμογής και επιχειρησιακής παρέμβασης'
            : 'Examples of implementation and operational intervention'}
        </h2>

        <p className="onepage-copy">
          {locale === 'el'
            ? 'Σύντομα θα δημοσιευθούν επιλεγμένα case studies που θα παρουσιάζουν ενδεικτικά έργα, προκλήσεις, παρεμβάσεις και αποτελέσματα σε επιχειρήσεις εστίασης και τουρισμού.'
            : 'Selected case studies will be published soon, presenting indicative projects, challenges, interventions and outcomes in hospitality and tourism businesses.'}
        </p>

        <div style={{ height: 30 }} />

        <div className="onepage-grid onepage-grid--3">
          <article className="onepage-card">
            <h3>{locale === 'el' ? 'Κοστολόγηση & τιμολογιακή πολιτική' : 'Costing & pricing policy'}</h3>
            <p>
              {locale === 'el'
                ? 'Δομημένη προσέγγιση για έλεγχο κόστους, βελτίωση περιθωρίου και καθαρότερη εμπορική στρατηγική.'
                : 'A structured approach for cost control, margin improvement and a clearer commercial strategy.'}
            </p>
          </article>

          <article className="onepage-card">
            <h3>{locale === 'el' ? 'Λειτουργική οργάνωση' : 'Operational organization'}</h3>
            <p>
              {locale === 'el'
                ? 'Ανασχεδιασμός ροών, ρόλων και διαδικασιών για πιο αποδοτική καθημερινή λειτουργία.'
                : 'Redesign of workflows, roles and procedures for more efficient day-to-day operation.'}
            </p>
          </article>

          <article className="onepage-card">
            <h3>{locale === 'el' ? 'Προμήθειες & έλεγχος αγορών' : 'Procurement & purchasing control'}</h3>
            <p>
              {locale === 'el'
                ? 'Παρακολούθηση τιμών, αξιολόγηση προμηθευτών και υποστήριξη εμπορικών αποφάσεων με καλύτερη εικόνα δεδομένων.'
                : 'Price monitoring, supplier evaluation and support for commercial decisions through better data visibility.'}
            </p>
          </article>
        </div>
      </section>

      <div className="onepage-divider" />

      <section id="contact" className="onepage-section">
        <div className="onepage-eyebrow">{t.nav.contact}</div>

        <h2 className="onepage-title--section">{contact.titleTop}</h2>

        <p className="onepage-copy">{contact.subtitleTop}</p>

        <div style={{ height: 30 }} />

        <div className="onepage-grid onepage-grid--3">
          <article className="onepage-card">
            <h3>{locale === 'el' ? 'Τηλέφωνο' : 'Phone'}</h3>
            <p>
              <a href={`tel:${contact.phone}`} style={{ color: '#111', textDecoration: 'none' }}>
                {contact.phone}
              </a>
            </p>
          </article>

          <article className="onepage-card">
            <h3>Email</h3>
            <p>
              <a href={`mailto:${contact.email}`} style={{ color: '#111', textDecoration: 'none' }}>
                {contact.email}
              </a>
            </p>
          </article>

          <article className="onepage-card">
            <h3>{locale === 'el' ? 'Κοινωνικά δίκτυα' : 'Social media'}</h3>
            <div style={{ display: 'grid', gap: 8 }}>
              <a href={contact.socials.facebook} target="_blank" rel="noopener noreferrer" style={{ color: '#111' }}>
                {contact.socials.facebookLabel}
              </a>
              <a href={contact.socials.instagram} target="_blank" rel="noopener noreferrer" style={{ color: '#111' }}>
                {contact.socials.instagramLabel}
              </a>
              {typeof contact.socials.linkedin === 'string' &&
                !contact.socials.linkedin.includes('instagram.com') && (
                  <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#111' }}>
                    {contact.socials.linkedinLabel}
                  </a>
                )}
            </div>
          </article>
        </div>

        <div className="onepage-actions" style={{ justifyContent: 'flex-start' }}>
          <Link href={`/${locale}/contact`} className="onepage-btn onepage-btn--primary">
            {locale === 'el' ? 'Άνοιξε τη φόρμα επικοινωνίας' : 'Open contact form'}
          </Link>
        </div>
      </section>
    </main>
  )
}