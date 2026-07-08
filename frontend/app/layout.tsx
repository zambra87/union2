import '@/app/global.css';
import { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import { Footer } from './components/Footer';
import { LiveProvider } from './contexts/LiveContext';
import { MinisteriosProvider } from './contexts/MinisteriosContext';
import { getMenuMinisterios } from '@/app/data/ministerios';

export const metadata: Metadata = {
  title: {
    template: '%s | Union Church',
    default: 'Union Church',
  },
  description: 'Union Church, una Iglesia Viña en Viña del Mar.',
  metadataBase: new URL('https://unionchurch.cl'),
};

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ministerios = getMenuMinisterios();

  return (
    <html lang="en">
      <body className={`${dmSerifDisplay.variable} ${dmSans.variable}`}>
        <MinisteriosProvider ministerios={ministerios}>
          <LiveProvider>{children}</LiveProvider>
        </MinisteriosProvider>
        <Footer />
      </body>
    </html>
  );
}
