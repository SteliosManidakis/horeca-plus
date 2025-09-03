'use client'

import React from 'react'
import en from 'messages/en.json'
import el from 'messages/el.json'
import Link from 'next/link'

type Locale = 'el' | 'en'

// Ρύθμισε αυτά σύμφωνα με το header σου
const HEADER_H = 64  // περίπου το ύψος του Header
const SUBNAV_H = 48  // περίπου το ύψος του subnav

export default function ServicesPage(
  { params }: { params: Promise<{ locale: Locale }> }
) {
  const { locale } = React.use(params)
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
      {/* HERO */}
      <section style={{ padding: '24px 0', marginBottom: 24 }}>
        <h1 style={{
          fontSize: 34, lineHeight: 1.2, fontWeight: 800,
          letterSpacing: '0.01em', color: '#a37c40', fontFamily: 'Georgia, serif', margin: 0
        }}>
          {services.heroTitle}
        </h1>
        <p style={{ marginTop: 20, fontSize: 20, color: '#555', fontFamily: 'Verdana, sans-serif' }}>
          {services.heroSubtitle}
        </p>
        {services.introText && (
          <p style={{ marginTop: 12, fontSize: 20, color: '#444', maxWidth: 900 }}>
            {services.introText}
          </p>
        )}
      </section>

      {/* STICKY SUBNAV */}
      <nav style={{
        position: 'sticky',
        top: HEADER_H,       // ✅ κάθεται κάτω από τον header
        zIndex: 500,         // μικρότερο από το header
        background: '#fff',
        borderTop: '1px solid #000000ff',
        borderBottom: '1px solid #000000ff',
        padding: '10px 0',
        marginBottom: 30
      }}>
        
        
{/*
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                textDecoration: 'none',
                background: '#a37c40',
                color: '#333',
                fontFamily: 'Verdana, sans-serif',
                fontSize: 14
              }}
            >
              {cat.title}
            </a>
          ))}
        </div>
*/}        

      </nav>

      {/* CATEGORIES */}
      {categories.map(cat => (
        <section
          key={cat.id}
          id={cat.id}
          style={{
            marginBottom: 40,
            // ✅ offset όταν κάνεις anchor scroll
            scrollMarginTop: HEADER_H + SUBNAV_H + 12
          }}
        >
          <header style={{ marginBottom: 12 }}>
            <h2 style={{
              fontSize: 26, lineHeight: 1.25, fontWeight: 700,
              color: '#a37c40', fontFamily: 'Georgia, serif', margin: '0 0 6px 0'
            }}>
              {cat.title}
            </h2>
            <p style={{
              margin: 0, fontSize: 20, color: '#666', fontFamily: 'Verdana, sans-serif'
            }}>
              {cat.description}
            </p>
          </header>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16
          }}>
            {cat.items.map(svc => (
              <article key={svc.id} style={{
                border: '1px solid #eee',
                borderRadius: 12,
                padding: 16,
                boxShadow: '0 4px 12px #4476CF(0, 0, 0, 1)',
                background: '#fff'
              }}>
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#4476CF',
                  fontFamily: 'Georgia, serif'
                }}>
                  {svc.title}
                </h3>
                <p style={{
                  margin: 0, fontSize: 14, lineHeight: 1.5, color: '#444',
                  fontFamily: 'Verdana, sans-serif'
                }}>
                  {svc.short}
                </p>

                <div style={{ marginTop: 12 }}>
                  
                  
                  
                  {/* **************************ΕΔΩ ΕΙΝΑΙ ΤΟ ΚΟΥΜΠΙ ΓΙΑ ΠΕΡΙΣΣΟΤΕΡΑ ΣΕ ΚΑΘΕ ΥΠΗΡΕΣΙΑ
                  <Link
                    href={`/${locale}/services/${svc.slug}`}
                    style={{
                      textDecoration: 'none',
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#4476CF'
                    }}
                  >
                    {locale === 'el' ? 'Περισσότερα' : 'More details'}
                  </Link>
                  */}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
