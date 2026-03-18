import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FloatingContactCtas } from "@/src/components/FloatingContactCtas";
import { siteConfig } from "@/src/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: `${siteConfig.name} | Retaining Walls, Patios & Landscape Construction`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "retaining walls",
    "patios and pavers",
    "landscape construction",
    "drainage and site work",
    "land shaping and site planning",
    "productive edible landscapes",
    "permaculture landscaping",
    "Westblock GravityStone",
    "South Sound landscaping",
    "Tacoma retaining walls",
    "Gig Harbor patios",
    "Puyallup landscape construction",
  ],
  openGraph: {
    title: `${siteConfig.name} | Retaining Walls, Patios & Landscape Construction`,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-card.svg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} organic landscape design preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Retaining Walls, Patios & Landscape Construction`,
    description: siteConfig.description,
    images: ["/og-card.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f3ea",
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `https://${siteConfig.domain}/#business`,
  name: siteConfig.name,
  founder: siteConfig.owner,
  description: siteConfig.description,
  areaServed: siteConfig.serviceAreas,
  email: siteConfig.contactEmail,
  telephone: siteConfig.contactPhone,
  url: `https://${siteConfig.domain}`,
  image: `https://${siteConfig.domain}/og-card.svg`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.contactPhone,
      email: siteConfig.contactEmail,
      areaServed: "US-WA",
      availableLanguage: "en",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "WA",
    addressCountry: "US",
  },
  knowsAbout: [
    "Retaining walls",
    "Patios and pavers",
    "Landscape construction",
    "Drainage and site work",
    "Land shaping and site planning",
    "Productive edible landscapes",
    "Permaculture landscaping",
    "Outdoor living spaces",
    "Westblock GravityStone retaining wall systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <FloatingContactCtas />
      </body>
    </html>
  );
}
