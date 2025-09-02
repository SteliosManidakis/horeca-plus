import en from 'messages/en.json'
import el from 'messages/el.json'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: 'el' | 'en' }>
}) {
  const { locale } = await params
  const t = locale === 'el' ? el : en

  return (
    <>
      {/* TITLE */}
      <section style={{ textAlign: 'left', marginTop: '0px', marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: 35,
            lineHeight: 1.15,
            fontWeight: 700,
            letterSpacing: '0.02em',
            color: '#222',
            fontFamily: 'Georgia, serif',
          }}
        >
          {t.about.title}
        </h2>
      </section>

      {/* TITLE 2 */}
      <section style={{ textAlign: 'left', marginTop: '0px', marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: 25,
            lineHeight: 1.15,
            fontWeight: 100,
            letterSpacing: '0.02em',
            color: '#000000ff',
            fontFamily: 'Verdana, sans-serif',
          }}
        >
          {t.about.title2}
        </h2>
      </section>
    </>
  )
}
