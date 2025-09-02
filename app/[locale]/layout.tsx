import React, { type ReactNode } from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'
import en from 'messages/en.json'
import el from 'messages/el.json'

type Locale = 'el' | 'en'

export function generateStaticParams() {
  return [{ locale: 'el' }, { locale: 'en' }]
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}) {
  // Next 15: params είναι Promise — unwrap με React.use (server only)
  const { locale } = React.use(params)
  const messages = locale === 'el' ? el : en

  return (
    <>
      <Header locale={locale} messages={messages} />
      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }}>
        {children}
      </main>
      <Footer messages={messages} />
    </>
  )
}
