import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.fusioncol.com"),
  title: {
    default: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp",
    template: "%s · FusionCRM Docs",
  },
  description:
    "Guías oficiales de FusionCRM: atiende WhatsApp con todo tu equipo, gestiona tu embudo de ventas, cotiza, emite factura electrónica DIAN y despacha con Envia.com.",
  applicationName: "FusionCRM",
  keywords: [
    "CRM para WhatsApp",
    "CRM Colombia",
    "WhatsApp Business API",
    "plantillas de WhatsApp",
    "factura electrónica DIAN",
    "embudo de ventas",
    "automatizaciones",
    "FusionCRM",
  ],
  openGraph: {
    siteName: "FusionCRM Docs",
    type: "website",
    locale: "es_CO",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  robots: { index: true, follow: true },
};

// Datos estructurados para Google: quién publica la documentación y qué producto describe.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fusioncol.com/#organization",
      name: "FusionCRM",
      url: "https://fusioncol.com",
      logo: "https://docs.fusioncol.com/icon.png",
      email: "comercial@fusioncol.com",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+57-302-400-3914",
        email: "comercial@fusioncol.com",
        areaServed: "CO",
        availableLanguage: "es",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://docs.fusioncol.com/#website",
      name: "FusionCRM Docs",
      url: "https://docs.fusioncol.com/docs",
      inLanguage: "es-CO",
      publisher: { "@id": "https://fusioncol.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      name: "FusionCRM",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://fusioncol.com",
      description:
        "CRM para negocios que venden por WhatsApp: bandeja compartida, embudo de ventas, cotizaciones, factura electrónica DIAN, envíos y automatizaciones.",
      publisher: { "@id": "https://fusioncol.com/#organization" },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "COP",
        lowPrice: "59900",
        highPrice: "159900",
        offerCount: 3,
        description:
          "Planes Básico, Pro y Empresarial por usuario al mes, IVA incluido. Prueba gratis de 14 días del plan Básico, sin tarjeta.",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}catch(e){}`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
