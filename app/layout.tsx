import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "FusionCRM Docs",
    template: "%s · FusionCRM Docs",
  },
  description:
    "Documentación oficial de FusionCRM — el CRM todo en uno para ventas, conversaciones y automatización.",
  metadataBase: new URL("https://docs.fusioncol.com"),
  openGraph: { siteName: "FusionCRM Docs", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme');const p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t||p);}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
