import Image from 'next/image'
import en from 'messages/en.json'
import el from 'messages/el.json'
import Link from 'next/link'

export default async function Page({ params }: any) {
  // params μπορεί να είναι είτε object είτε Promise<object> ανάλογα με το setup σου
  const p = typeof params?.then === 'function' ? await params : params
  const locale: 'el' | 'en' = p?.locale === 'el' ? 'el' : 'en'
  const t = locale === 'el' ? el : en

  return (
    <main style={{ paddingTop: 'var(--hp-header-h, 72px)' }}>
      {/* ΚΕΝΤΡΙΚΗ ΦΩΤΟ */}
      <section style={{ textAlign: 'center', margin: '20px 0 40px' }}>
        <div style={{
          display:'inline-block',
          position:'relative',
          width:'min(92vw, 900px)',
          aspectRatio:'16 / 9',
          background:'#fff',
          borderRadius:12,
          overflow:'hidden'
        }}>
          <Image
            src="/images/home/horecaplus1.jpg"
            alt="Κεντρική εικόνα"
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 900px) 92vw, 900px"
            priority
          />
        </div>
      </section>

      {/* TITLE */}
      <section style={{ textAlign: 'center', margin: '0 0 24px' }}>
        <h2
          style={{
            fontSize: 35,
            lineHeight: 1.15,
            fontWeight: 700,
            letterSpacing: '0.02em',
            color: '#a37c40',
            fontFamily: 'Georgia, serif'
          }}
        >
          {t.nav.title}
        </h2>
      </section>

      {/* TITLE 2 */}
      <section style={{ textAlign: 'center', margin: '0 0 32px' }}>
        <h2
          style={{
            fontSize: 30,
            lineHeight: 1.15,
            fontWeight: 700,
            letterSpacing: '0.02em',
            color: '#000000',
            fontFamily: 'Georgia, serif'
          }}
        >
          {t.nav.title2}
        </h2>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Link
          href={`/${locale}/contact`}
          style={{
            display: 'inline-block',
            padding: '12px 40px',
            fontSize: 20,
            fontWeight: 700,
            borderRadius: 10,
            backgroundColor: '#a37c40',
            color: '#000000',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'background 0.3s ease'
          }}
        >
          {t.nav.cta}
        </Link>
      </section>

      {/* TITLE 3 */}
      <section style={{ textAlign: 'center', margin: '0 0 24px' }}>
        <h2
          style={{
            fontSize: 30,
            lineHeight: 1.15,
            fontWeight: 700,
            letterSpacing: '0.02em',
            color: '#000000',
            fontFamily: 'Georgia, serif'
          }}
        >
          {t.nav.title3}
        </h2>
      </section>

      {/* TITLE 4 */}
      <section style={{ textAlign: 'center', margin: '0 0 32px' }}>
        <h2
          style={{
            fontSize: 30,
            lineHeight: 1.15,
            fontWeight: 700,
            letterSpacing: '0.02em',
            color: '#a37c40',
            fontFamily: 'Georgia, serif'
          }}
        >
          {t.nav.title4}
        </h2>
      </section>

      {/* ΜΕΓΑΛΗ ΦΩΤΟ */}
      <section style={{ display: 'flex', justifyContent: 'center', margin: '0 0 40px' }}>
        <div
          style={{
            width: 'min(92vw, 1000px)',
            aspectRatio: '16 / 9',
            position: 'relative',
            borderRadius: 12,
            overflow: 'hidden'
          }}
        >
          <Image
            src="/images/home/hero.jpg"
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1024px) 92vw, 1000px"
            priority
          />
        </div>
      </section>
    </main>
  )
}
