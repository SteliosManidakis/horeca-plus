import './globals.css';
import { Montserrat, Open_Sans } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
});

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext', 'greek', 'greek-ext'],
  variable: '--font-open-sans',
});

export const metadata = {
  title: 'HORECA Plus',
  description: 'Your trusted partner in hospitality & tourism',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="el" className={`${montserrat.variable} ${openSans.variable}`}>
      <body style={{ fontFamily: 'system-ui, Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
