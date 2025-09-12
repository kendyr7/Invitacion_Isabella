
import type { Metadata } from 'next';
import { Great_Vibes, Bodoni_Moda } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AppProviders } from '@/components/AppProviders';
import { cn } from '@/lib/utils';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
});

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '900'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni-moda',
});

export const metadata: Metadata = {
  title: '🦁 Aventura Safari - Cumpleaños Isabella Mariana 🌿',
  description: '🐘 Únete a la aventura Safari de Isabella Mariana el 15 de febrero a las 6:00 PM. Una celebración llena de diversión en la selva 🦒🎉',
  keywords: ['cumpleaños', 'safari', 'Isabella Mariana', 'invitación', 'fiesta', 'aventura', 'selva', 'animales'],
  authors: [{ name: 'Kendyr Quintanilla' }],
  creator: 'Kendyr Quintanilla',
  publisher: 'Cumpleaños Safari Isabella Mariana',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://fonts.googleapis.com'),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,900;1,400;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'font-body antialiased',
          bodoniModa.variable,
          greatVibes.variable
        )}
        suppressHydrationWarning
      >
        <AppProviders>
          {children}
          <Toaster />
        </AppProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
