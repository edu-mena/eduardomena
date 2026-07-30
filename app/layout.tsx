import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Press_Start_2P } from 'next/font/google';

import "./globals.css";
import { ThemeProvider } from "./provider";
const pressStart = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start'
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Eduardo Mena | Engenheiro DevOps & Full-Stack',
  description: 'Portfólio profissional de Eduardo Mena. Engenheiro DevOps focado em criar estruturas sólidas, escaláveis e aplicações web/móveis.',
  openGraph: {
    title: 'Eduardo Mena | Engenheiro DevOps & Full-Stack',
    description: 'Portfólio profissional de Eduardo Mena.',
    url: 'https://eduardomena.vercel.app/',
    siteName: 'Eduardo Mena Portefólio',
    images: [
      {
        url: '/banner/banner.png',
        width: 1200,
        height: 630,
        alt: 'Eduardo Mena - Engenheiro DevOps & Full-Stack',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduardo Mena | Engenheiro DevOps & Full-Stack',
    description: 'Portfólio profissional de Eduardo Mena.',
    images: ['/banner/banner.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/jsm-logo.png" sizes="any" />
      </head>
      <body className={`${inter.className} ${pressStart.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
