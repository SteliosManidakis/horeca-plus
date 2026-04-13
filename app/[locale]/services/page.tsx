import type { Metadata } from 'next'
import en from 'messages/en.json'
import el from 'messages/el.json'

type Locale = 'el' | 'en'

const HEADER_H = 64
const SUBNAV_H = 48

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEl = locale === 'el'

  const title = isEl ? 'Υπηρεσίες' : 'Services'
  const description = isEl
    ? 'Δες τις υπηρεσίες της HORECA Plus σε κοστολόγηση, λειτουργική οργάνωση, προμήθειες, εκπαίδευση και στρατηγική υποστήριξη.'
    : 'Explore HORECA Plus services in costing, operational structure, procurement, training and strategic support.'

  const canonical = `https://horeca-plus.gr/${locale}/services`

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'el-GR': 'https://horeca-plus.gr/el/services',
        'en-US': 'https://horeca-plus.gr/en/services',
        'x-default': 'https://horeca-plus.gr/el/services',
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'HORECA Plus',
      locale: isEl ? 'el_GR' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://horeca-plus.gr/images/home/hero.jpg',
          width: 1200,
          height: 630,
          alt: 'HORECA Plus',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://horeca-plus.gr/images/home/hero.jpg'],
    },
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const t = locale === 'el' ? (el as any) : (en as any)

  const services = t.services
  const categories = services.categories as Array<{
    id: string
    title: string
    description: string
    items: Array<{ id: string; slug: string; title: string; short: string }>
  }>

  return (
    <>
      <section style={{ padding: '24px 0', marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 34,
            lineHeight: 1.2,
            fontWeight: 800,
            letterSpacing: '0.01em',
            color: '#a37c40',
            fontFamily: 'Georgia, serif',
            margin: 0,
          }}
        >
          {services.heroTitle}
        </h1>

        <p
          style={{
            marginTop: 20,
            fontSize: 20,
            color: '#555',
            fontFamily: 'Verdana, sans-serif',
          }}
        >
          {services.heroSubtitle}
        </p>

        {services.introText && (
          <p
            style={{
              marginTop: 12,
              fontSize: 20,
              color: '#444',
              maxWidth: 900,
            }}
          >
            {services.introText}
          </p>
        )}
      </section>

      <nav
        style={{
          position: 'sticky',
          top: HEADER_H,
          zIndex: 500,
          background: '#fff',
          borderTop: '1px solid #000000ff',
          borderBottom: '1px solid #000000ff',
          padding: '10px 0',
          marginBottom: 30,
        }}
      />

      {categories.map((cat) => (
        <section
          key={cat.id}
          id={cat.id}
          style={{
            marginBottom: 40,
            scrollMarginTop: HEADER_H + SUBNAV_H + 12,
          }}
        >
          <header style={{ marginBottom: 12 }}>
            <h2
              style={{
                fontSize: 26,
                lineHeight: 1.25,
                fontWeight: 700,
                color: '#a37c40',
                fontFamily: 'Georgia, serif',
                margin: '0 0 6px 0',
              }}
            >
              {cat.title}
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: 20,
                color: '#666',
                fontFamily: 'Verdana, sans-serif',
              }}
            >
              {cat.description}
            </p>
          </header>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {cat.items.map((svc) => (
              <article
                key={svc.id}
                style={{
                  border: '1px solid #000000ff',
                  borderRadius: 12,
                  padding: 16,
                  background: '#fff',
                }}
              >
                <h3
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#4476CF',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  {svc.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: '#444',
                    fontFamily: 'Verdana, sans-serif',
                  }}
                >
                  {svc.short}
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}