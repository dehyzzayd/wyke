import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { asset } from '@/lib/base-path';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WYKE — Institutional memory, finally solved.',
  description:
    'WYKE conducts Socratic AI interviews with your critical employees, extracts their tacit reasoning patterns, and builds a living cognitive twin your entire organization can query — forever.',
  icons: { icon: asset('/favicon.svg') },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="bg-white text-ink-900 font-sans">{children}</body>
    </html>
  );
}
