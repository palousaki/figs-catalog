import './globals.css';
import { Inter, Instrument_Serif, Caveat } from 'next/font/google';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const bodySans = Inter({
  subsets: ['latin', 'greek'],
  variable: '--font-work-sans',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata = {
  title: 'Helios Figs - Premium Dried Figs',
  description:
    'Discover the finest dried figs, naturally sourced and packed with care.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodySans.variable} ${instrumentSerif.variable} ${caveat.variable}`}>
      <body className="bg-parchment text-ink flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
