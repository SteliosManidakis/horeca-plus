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

  const heroTags =
    locale === 'el'
      ? ['Στρατηγική', 'Λειτουργική Οργάνωση', 'Κοστολόγηση', 'Εκπαίδευση', 'Αποδοτικότητα']
      : ['Strategy', 'Operations', 'Costing', 'Training', 'Performance']

  const approachPoints =
    locale === 'el'
      ? [
          'Ανάλυση πραγματικών δεδομένων και λειτουργικών αναγκών',
          'Σχεδιασμός εφαρμόσιμων λύσεων με σαφή επιχειρησιακή λογική',
          'Υποστήριξη υλοποίησης με στόχο σταθερό και μετρήσιμο αποτέλεσμα',
        ]
      : [
          'Analysis of real data and operational needs',
          'Design of applicable solutions with clear business logic',
          'Implementation support focused on stable and measurable results',
        ]

  const caseStudies =
  locale === 'el'
    ? [
        {
          label: 'Scenario 01',
          sector: 'Εστιατόριο / Food Service',
          title: 'Αναδιοργάνωση κόστους και τιμολογιακής πολιτικής',
          text: 'Επανεξέταση κοστολόγησης, εμπορικής λογικής και δομής καταλόγου με στόχο καλύτερο έλεγχο περιθωρίου και καθαρότερες αποφάσεις.',
          outcome: 'Εστίαση σε έλεγχο κόστους, περιθώριο και σαφέστερη εμπορική στρατηγική.',
        },
        {
          label: 'Scenario 02',
          sector: 'Ξενοδοχείο / Hospitality',
          title: 'Βελτίωση λειτουργικής οργάνωσης και διαδικασιών',
          text: 'Χαρτογράφηση ροών, ρόλων και σημείων ασυνέχειας για υποστήριξη πιο σταθερής καθημερινής λειτουργίας και καλύτερου συντονισμού ομάδων.',
          outcome: 'Έμφαση σε οργάνωση, συνέπεια εφαρμογής και λειτουργική αποδοτικότητα.',
        },
        {
          label: 'Scenario 03',
          sector: 'Procurement & Supply',
          title: 'Έλεγχος προμηθειών και αξιολόγηση προμηθευτών',
          text: 'Συγκέντρωση και ανάλυση δεδομένων αγορών, παρακολούθηση τιμών και υποστήριξη επιλογών που ενισχύουν τον εμπορικό έλεγχο.',
          outcome: 'Καλύτερη εικόνα αγορών, μεγαλύτερη διαφάνεια και ισχυρότερη διαπραγματευτική βάση.',
        },
      ]
    : [
        {
          label: 'Scenario 01',
          sector: 'Restaurant / Food Service',
          title: 'Cost structure and pricing policy realignment',
          text: 'Review of costing, commercial logic and menu structure to support stronger margin control and clearer decision-making.',
          outcome: 'Focused on cost control, margin improvement and a clearer commercial strategy.',
        },
        {
          label: 'Scenario 02',
          sector: 'Hotel / Hospitality',
          title: 'Operational organization and process improvement',
          text: 'Mapping of workflows, responsibilities and friction points to support more stable daily operations and better team coordination.',
          outcome: 'Focused on structure, execution consistency and operational efficiency.',
        },
        {
          label: 'Scenario 03',
          sector: 'Procurement & Supply',
          title: 'Purchasing control and supplier evaluation',
          text: 'Collection and analysis of purchasing data, price monitoring and support for decisions that strengthen commercial control.',
          outcome: 'Better purchasing visibility, more transparency and a stronger negotiation base.',
        },
      ]

  return (
    <main style={{ paddingTop: 'var(--hp-header-h, 72px)' }}>
      <section id="home" className="onepage-section--hero hp-heroShell">
        <div className="hp-heroGrid">
          <div className="hp-heroContent">
            <div className="onepage-eyebrow">HORECA PLUS</div>

            <h1 className="onepage-title hp-heroTitle">{t.nav.title}</h1>

            <p className="hp-heroLead">{t.nav.title2}</p>

            <p className="onepage-copy hp-heroCopy">{t.nav.title3}</p>

            <div className="hp-heroTags">
              {heroTags.map((tag) => (
                <span key={tag} className="hp-heroTag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="onepage-actions hp-heroActions">
              <Link href={`/${locale}/home#contact`} className="onepage-btn onepage-btn--primary">
                {t.nav.cta}
              </Link>

              <Link href={`/${locale}/home#services`} className="onepage-btn onepage-btn--ghost">
                {locale === 'el' ? 'Δες τις υπηρεσίες' : 'Explore services'}
              </Link>
            </div>
          </div>

          <div className="hp-heroMediaWrap">
            <div className="onepage-heroMedia hp-heroMedia">
              <Image
                src="/images/home/hero.jpg"
                alt="HORECA Plus"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1200px) 92vw, 620px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="onepage-divider" />

      <section id="about" className="onepage-section onepage-band">
        <div className="hp-aboutTop">
          <div>
            <div className="onepage-eyebrow">{about.title}</div>
            <h2 className="onepage-title--section hp-aboutTitle">{about.headline}</h2>

            <p className="onepage-copy hp-aboutIntro">{about.intro}</p>

            <div style={{ height: 18 }} />

            <p className="onepage-copy">{about.paragraph1}</p>
            <p className="onepage-copy">{about.paragraph2}</p>
            <p className="onepage-copy">{about.paragraph3}</p>
          </div>

          <aside className="hp-sideCard">
            <div className="hp-sideCardEyebrow">
              {locale === 'el' ? 'Η προσέγγισή μας' : 'Our approach'}
            </div>

            <h3 className="hp-sideCardTitle">
              {locale === 'el'
                ? 'Δουλεύουμε με επιχειρησιακή σκέψη, μεθοδικότητα και προσανατολισμό στο αποτέλεσμα.'
                : 'We work with business discipline, structure and a clear focus on results.'}
            </h3>

            <div className="hp-sideList">
              {approachPoints.map((point) => (
                <div key={point} className="hp-sideListItem">
                  <span className="hp-sideListDot" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div style={{ height: 40 }} />

        <h3 className="hp-subsectionTitle">{about.pillarsTitle}</h3>

        <div className="onepage-grid onepage-grid--2">
          {about.pillars.map((pillar) => (
            <article key={pillar.title} className="onepage-card hp-pillCard">
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="onepage-divider" />

      <section id="services" className="onepage-section">
        <div className="onepage-eyebrow">{t.nav.services}</div>

        <div className="hp-servicesTop">
          <div>
            <h2 className="onepage-title--section hp-servicesTitle">{services.heroTitle}</h2>
          </div>

          <div className="hp-servicesIntroWrap">
            <p className="onepage-copy hp-servicesLead">{services.heroSubtitle}</p>
            <p className="onepage-copy hp-servicesIntro">{services.introText}</p>
          </div>
        </div>

        <div style={{ height: 34 }} />

        <div className="onepage-grid onepage-grid--3 hp-servicesGrid">
          {services.categories.map((cat, index) => (
            <article key={cat.id} className="onepage-card hp-serviceCard">
              <div className="hp-serviceCardTop">
                <div className="hp-serviceIndex">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div>
                  <h3 className="hp-serviceCardTitle">{cat.title}</h3>
                  <p className="hp-serviceCardDesc">{cat.description}</p>
                </div>
              </div>

              <div className="hp-serviceItems">
                {cat.items.map((item) => (
                  <div key={item.id} className="hp-serviceItem">
                    <div className="hp-serviceItemTitle">{item.title}</div>
                    <div className="hp-serviceItemText">{item.short}</div>
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

        <div className="hp-casesTop">
          <div>
            <h2 className="onepage-title--section hp-casesTitle">
              {locale === 'el'
                ? 'Ενδεικτικά πεδία επιχειρησιακής παρέμβασης'
                : 'Indicative fields of operational intervention'}
            </h2>
          </div>

          <div className="hp-casesIntroWrap">
            <p className="onepage-copy hp-casesLead">
              {locale === 'el'
                ? 'Το section αυτό παρουσιάζει ενδεικτικά σενάρια έργων και τύπους παρεμβάσεων που μπορούν να υποστηριχθούν σε επιχειρήσεις εστίασης και τουρισμού.'
                : 'This section presents indicative project scenarios and intervention types that can be supported in hospitality and tourism businesses.'}
            </p>

            <p className="onepage-copy hp-casesIntro">
              {locale === 'el'
                ? 'Σύντομα θα προστεθούν αναλυτικότερα case studies με δομή, προκλήσεις, προσέγγιση και αποτέλεσμα.'
                : 'Detailed case studies with structure, challenges, approach and outcomes will be added soon.'}
            </p>
          </div>
        </div>

        <div style={{ height: 34 }} />

        <div className="hp-casesHighlight">
          <div className="hp-casesHighlightEyebrow">
            {locale === 'el' ? 'Εστίαση στο αποτέλεσμα' : 'Outcome-oriented approach'}
          </div>

          <p className="hp-casesHighlightText">
            {locale === 'el'
              ? 'Κάθε παρέμβαση σχεδιάζεται με στόχο να ενισχύει τον έλεγχο, τη λειτουργική συνέπεια και την ικανότητα της επιχείρησης να λαμβάνει πιο σωστές και έγκαιρες αποφάσεις.'
              : 'Each intervention is designed to strengthen control, operational consistency and the business’s ability to make better and more timely decisions.'}
          </p>
        </div>

        <div style={{ height: 28 }} />

        <div className="onepage-grid onepage-grid--3 hp-casesGrid">
          {caseStudies.map((item) => (
            <article key={item.label} className="onepage-card hp-caseCard">
              <div className="hp-caseMeta">{item.label}</div>
              <div className="hp-caseSector">{item.sector}</div>
              <h3 className="hp-caseTitle">{item.title}</h3>
              <p className="hp-caseText">{item.text}</p>

              <div className="hp-caseOutcomeBlock">
                <div className="hp-caseOutcomeLabel">
                  {locale === 'el' ? 'Επιδιωκόμενο αποτέλεσμα' : 'Intended outcome'}
                </div>
                <div className="hp-caseOutcomeText">{item.outcome}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="onepage-divider" />

      <section id="contact" className="onepage-section">
        <div className="onepage-eyebrow">{t.nav.contact}</div>

        <div className="hp-contactTop">
          <div>
            <h2 className="onepage-title--section hp-contactTitle">{contact.titleTop}</h2>
          </div>

          <div className="hp-contactIntroWrap">
            <p className="onepage-copy hp-contactLead">{contact.subtitleTop}</p>
            <p className="onepage-copy hp-contactIntro">
              {locale === 'el'
                ? 'Αν θέλεις να συζητήσουμε τις ανάγκες της επιχείρησής σου και να δούμε πώς μπορεί να οργανωθεί μια ουσιαστική συνεργασία, μπορείς να επικοινωνήσεις μαζί μας άμεσα.'
                : 'If you would like to discuss your business needs and explore how a meaningful collaboration could be structured, you can contact us directly.'}
            </p>
          </div>
        </div>

        <div style={{ height: 34 }} />

        <div className="hp-contactGrid">
          <article className="onepage-card hp-contactCard hp-contactCard--main">
            <div className="hp-contactCardEyebrow">
              {locale === 'el' ? 'Άμεση επικοινωνία' : 'Direct contact'}
            </div>

            <h3 className="hp-contactMainTitle">
              {locale === 'el'
                ? 'Είμαστε διαθέσιμοι για μία πρώτη συζήτηση γνωριμίας.'
                : 'We are available for an initial introductory discussion.'}
            </h3>

            <p className="hp-contactMainText">
              {locale === 'el'
                ? 'Μπορούμε να συζητήσουμε το προφίλ της επιχείρησης, τις βασικές προκλήσεις, τις προτεραιότητες και τα πιθανά πεδία υποστήριξης.'
                : 'We can discuss your business profile, key challenges, priorities and the potential areas of support.'}
            </p>

            <div className="hp-contactMainActions">
              <Link href={`/${locale}/contact`} className="onepage-btn onepage-btn--primary">
                {locale === 'el' ? 'Άνοιξε τη φόρμα επικοινωνίας' : 'Open contact form'}
              </Link>

              <a href={`tel:${contact.phone}`} className="onepage-btn onepage-btn--ghost">
                {locale === 'el' ? 'Κάλεσέ μας' : 'Call us'}
              </a>
            </div>
          </article>

          <div className="hp-contactInfoGrid">
            <article className="onepage-card hp-contactCard">
              <div className="hp-contactInfoLabel">{locale === 'el' ? 'Τηλέφωνο' : 'Phone'}</div>
              <a href={`tel:${contact.phone}`} className="hp-contactInfoValue">
                {contact.phone}
              </a>
            </article>

            <article className="onepage-card hp-contactCard">
              <div className="hp-contactInfoLabel">Email</div>
              <a href={`mailto:${contact.email}`} className="hp-contactInfoValue hp-contactInfoValue--small">
                {contact.email}
              </a>
            </article>

            <article className="onepage-card hp-contactCard">
              <div className="hp-contactInfoLabel">
                {locale === 'el' ? 'Κοινωνικά δίκτυα' : 'Social media'}
              </div>

              <div className="hp-contactSocials">
                <a href={contact.socials.facebook} target="_blank" rel="noopener noreferrer">
                  {contact.socials.facebookLabel}
                </a>

                <a href={contact.socials.instagram} target="_blank" rel="noopener noreferrer">
                  {contact.socials.instagramLabel}
                </a>

                {typeof contact.socials.linkedin === 'string' &&
                  !contact.socials.linkedin.includes('instagram.com') && (
                    <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer">
                      {contact.socials.linkedinLabel}
                    </a>
                  )}
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}