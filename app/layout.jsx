import './globals.css';
import { Montserrat, Open_Sans } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext', 'greek', 'greek-ext'],
  variable: '--font-open-sans',
  display: 'swap',
});

/** @type {import('next').Metadata} */
export const metadata = {
  metadataBase: new URL('https://horeca-plus.gr'),
  applicationName: 'HORECA Plus',
  title: {
    default: 'HORECA Plus | Hospitality & Tourism Business Consulting',
    template: '%s | HORECA Plus',
  },
  description:
    'Strategic, operational and costing support for hospitality and tourism businesses.',
  openGraph: {
    type: 'website',
    siteName: 'HORECA Plus',
    title: 'HORECA Plus',
    description:
      'Strategic, operational and costing support for hospitality and tourism businesses.',
    url: 'https://horeca-plus.gr',
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
    title: 'HORECA Plus',
    description:
      'Strategic, operational and costing support for hospitality and tourism businesses.',
    images: ['https://horeca-plus.gr/images/home/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111111',
};

export default function RootLayout({ children }) {
  return (
    <html lang="el" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}