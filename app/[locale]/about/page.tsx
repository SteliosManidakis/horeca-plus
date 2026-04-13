import en from 'messages/en.json'
import el from 'messages/el.json'
import type { Metadata } from 'next'

type Locale = 'el' | 'en'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'el' | 'en' }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEl = locale === 'el'

  const title = isEl
    ? 'Σχετικά με εμάς'
    : 'About us'

  const description = isEl
    ? 'Γνώρισε τη φιλοσοφία και την προσέγγιση της HORECA Plus ως στρατηγικού συνεργάτη για επιχειρήσεις εστίασης και τουρισμού.'
    : 'Learn about the philosophy and approach of HORECA Plus as a strategic partner for hospitality and tourism businesses.'

  const canonical = `https://horeca-plus.gr/${locale}/about`

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'el-GR': 'https://horeca-plus.gr/el/about',
        'en-US': 'https://horeca-plus.gr/en/about',
        'x-default': 'https://horeca-plus.gr/el/about',
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'HORECA Plus',
      locale: isEl ? 'el_GR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
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

  return (
    <>
      <section className="onepage-section">
        <div className="onepage-eyebrow">{about.title}</div>
        <h1 className="onepage-title--section" style={{ marginBottom: 18 }}>
          {about.headline}
        </h1>

        <p className="onepage-copy" style={{ fontSize: 20, color: '#111', marginBottom: 18 }}>
          {about.intro}
        </p>

        <p className="onepage-copy">{about.paragraph1}</p>
        <p className="onepage-copy">{about.paragraph2}</p>
        <p className="onepage-copy">{about.paragraph3}</p>

        <div style={{ height: 32 }} />

        <h2 className="onepage-title--section" style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: 20 }}>
          {about.pillarsTitle}
        </h2>

        <div className="onepage-grid onepage-grid--2">
          {about.pillars.map((pillar) => (
            <article key={pillar.title} className="onepage-card">
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}