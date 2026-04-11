"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const labels: Record<string, string> = {
  docs: "Docs",
  "getting-started": "Primeros Pasos",
  contacts: "Contactos",
  deals: "Deals",
  pipelines: "Pipelines",
  conversations: "Conversaciones",
  "whatsapp-templates": "Templates WhatsApp",
  email: "Correo",
  "mass-campaigns": "Campañas Masivas",
  quotes: "Cotizaciones",
  invoices: "Facturación",
  products: "Productos",
  reports: "Reportes",
  "lead-scoring": "Lead Scoring",
  workflows: "Automatizaciones",
  calendar: "Calendario",
  projects: "Proyectos",
  settings: "Configuración",
  api: "API Externa",
  integrations: "Integraciones",
  spikey: "Spikey AI",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) return null;

  return (
    <nav className="flex items-center gap-1 text-sm mb-6" aria-label="Breadcrumb">
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const label = labels[segment] ?? segment;

        return (
          <span key={href} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight size={13} style={{ color: "var(--muted-foreground)" }} />
            )}
            {isLast ? (
              <span style={{ color: "var(--foreground)" }} className="font-medium">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:underline transition-colors"
                style={{ color: "var(--muted-foreground)" }}
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
