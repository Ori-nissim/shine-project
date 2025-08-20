import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope, Bebas_Neue } from 'next/font/google';
import { SWRConfig } from 'swr';

export const metadata: Metadata = {
  title: 'Shine - Make Your Brand SHINE!',
  description: 'Transform your business presence with AI-powered portfolio creation. Stand out from the crowd with stunning, professional websites that convert visitors into customers.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🎇</text></svg>'
  }
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });
const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue'
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${manrope.className} ${bebasNeue.variable}`}
    >
      <body className="min-h-[100vh]">
        <div className="flex flex-col min-h-screen">
          <main >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
