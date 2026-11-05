import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const BASE = "https://docs.fusioncol.com";

// Páginas con más prioridad: las que más buscan quienes llegan por primera vez.
const PRIORITY: Record<string, number> = {
  "": 1,
  "que-es-un-crm": 0.9,
  "getting-started": 0.9,
  conversations: 0.8,
  "whatsapp-templates": 0.8,
  "whatsapp-lines": 0.8,
  contacts: 0.8,
  deals: 0.8,
  invoices: 0.8,
  quotes: 0.8,
  shipments: 0.8,
  workflows: 0.8,
  "agentes-ia": 0.8,
};

// Lee las carpetas de app/docs al construir el sitio: una página nueva entra sola al sitemap.
function docSlugs(): string[] {
  const root = path.join(process.cwd(), "app", "docs");
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(root, d.name, "page.tsx")))
    .map((d) => d.name)
    .sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ["", ...docSlugs()].map((slug) => ({
    url: slug ? `${BASE}/docs/${slug}` : `${BASE}/docs`,
    lastModified,
    changeFrequency: slug === "" ? "weekly" : "monthly",
    priority: PRIORITY[slug] ?? 0.6,
  }));
}
