import Image from 'next/image'
import en from 'messages/en.json'
import el from 'messages/el.json'

// ΜΟΝΗ αλλαγή: async + await params (Next 15 App Router)
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
        <h2 style={{
          fontSize: 35, lineHeight: 1.15, fontWeight: 700, letterSpacing: '0.02em',
          color: '#a37c40', fontFamily: 'Georgia, serif'
        }}>
          {t.about.title}
        </h2>
      </section>

      {/* TITLE 2 */}
      <section style={{ textAlign: 'left', marginTop: '0px', marginBottom: '40px' }}>
        <h2 style={{
          fontSize: 25, lineHeight: 1.15, fontWeight: 100, letterSpacing: '0.02em',
          color: '#000000ff', fontFamily: 'Verdana, sans-serif'
        }}>
          {t.about.title2}
        </h2>
      </section>

      {/* TITLE 3 */}
      <section style={{ textAlign: 'left', marginTop: '-20px', marginBottom: '40px' }}>
        <h2 style={{
          fontSize: 20, lineHeight: 1.3, fontWeight: 100, letterSpacing: '0.02em',
          color: '#000000ff', fontFamily: 'Georgia, serif'
        }}>
          {t.about.title3}
        </h2>
      </section>

      {/* ΑΡΙΣΤΕΡΑ ΕΙΚΟΝΑ – ΔΕΞΙΑ ΚΕΙΜΕΝΟ */}
      <section style={{ textAlign: 'left', marginTop: '0px', marginBottom: '40px' }}>
        <div style={{
          float: 'left', width: 'min(42vw, 420px)',
          marginRight: 24, marginBottom: 12, borderRadius: 12, overflow: 'hidden'
        }}>
          <Image
            src="/images/aboutus/stelios.jpg"
            alt={t.about.memberName}
            width={1000} height={670}
            style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover' }}
            priority
          />
        </div>

        <h2 style={{
          fontSize: 24, lineHeight: 1.3, fontWeight: 700, color: '#a37c40',
          fontFamily: 'Georgia, serif', marginTop: 0, marginBottom: 8
        }}>
          {t.about.memberName}
        </h2>

        <h3 style={{
          fontSize: 18, lineHeight: 1.3, fontWeight: 400, color: '#1a499bff',
          fontFamily: 'Verdana, sans-serif', marginTop: 0, marginBottom: 16
        }}>
          {t.about.memberTitle}
        </h3>

        <p style={{
          fontSize: 20, lineHeight: 1.5, fontWeight: 100, color: '#000',
          fontFamily: 'Georgia, serif', textAlign: 'justify', marginTop: 0
        }}>
          {t.about.memberDescription}
        </p>

        <div style={{ clear: 'both' }} />
      </section>

      {/* ΔΕΞΙΑ ΕΙΚΟΝΑ – ΑΡΙΣΤΕΡΑ ΚΕΙΜΕΝΟ */}
      <section style={{ textAlign: 'left', marginTop: '0px', marginBottom: '40px' }}>
        <div style={{
          float: 'right', width: 'min(42vw, 420px)',
          marginLeft: 24, marginBottom: 12, borderRadius: 12, overflow: 'hidden'
        }}>
          <Image
            src="/images/aboutus/stratis.jpg"
            alt={t.about.memberName1}
            width={1000} height={670}
            style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover' }}
            priority
          />
        </div>

        <h2 style={{
          fontSize: 24, lineHeight: 1.3, fontWeight: 700, color: '##a37c40',
          fontFamily: 'Georgia, serif', marginTop: 0, marginBottom: 8
        }}>
          {t.about.memberName1}
        </h2>

        <h3 style={{
          fontSize: 18, lineHeight: 1.3, fontWeight: 400, color: '#1a499bff',
          fontFamily: 'Verdana, sans-serif', marginTop: 0, marginBottom: 16
        }}>
          {t.about.memberTitle1}
        </h3>

        <p style={{
          fontSize: 20, lineHeight: 1.5, fontWeight: 100, color: '#000',
          fontFamily: 'Georgia, serif', textAlign: 'justify', marginTop: 0
        }}>
          {t.about.memberDescription1}
        </p>

        <div style={{ clear: 'both' }} />
      </section>
    </>
  )
}
