// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import SiteHeader from "@/components/ui/site-header";
import SiteFooter from "@/components/ui/site-footer";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Assembleia de Deus - Ministerio Visao de Conquista. Uma igreja acolhedora, comunitaria e centrada na Palavra de Deus.",
  metadataBase: new URL("https://igrejaadmvc.org"),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/images/favicon.ico" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://igrejaadmvc.org",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "Assembleia de Deus - Ministerio Visao de Conquista. Uma igreja acolhedora, comunitaria e centrada na Palavra de Deus.",
    images: [{ url: "/images/hero_teste.png", width: 1200, height: 630, alt: "ADMVC - Mais que uma igreja, uma familia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "Assembleia de Deus - Ministerio Visao de Conquista. Uma igreja acolhedora, comunitaria e centrada na Palavra de Deus.",
    images: ["/images/hero_teste.png"],
  },
};

export const viewport = {
  themeColor: '#3f6b4f',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "ADMVC - Assembleia de Deus Ministerio Visao de Conquista",
  alternateName: "ADMVC",
  url: "https://igrejaadmvc.org",
  description:
    "Assembleia de Deus - Ministerio Visao de Conquista. Uma igreja acolhedora, comunitaria e centrada na Palavra de Deus.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Antonio Pestana Rato 77",
    addressLocality: "Figueira da Foz",
    postalCode: "3080-014",
    addressCountry: "PT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.1556145,
    longitude: -8.8431124,
  },
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className="dark">
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
