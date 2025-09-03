export default async function Page({
  params,
}: {
  params: Promise<{ locale: 'el' | 'en' }>
}) {
  const { locale } = await params

  const text = locale === 'el' 
    ? 'Η σελίδα είναι υπό κατασκευή' 
    : 'This page is under construction'

  return (
    <main style={{
      minHeight: 'calc(100vh - var(--hp-header-h, 72px))',
      paddingTop: 'var(--hp-header-h, 72px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: 'Georgia, serif',
      fontSize: 28,
      fontWeight: 700,
      color: '#a37c40'
    }}>
      {text}
    </main>
  )
}
