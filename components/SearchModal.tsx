"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";

const searchIndex = [
  { title: "¿Qué es FusionCRM?", href: "/docs", section: "Introducción", keywords: ["fusioncrm", "crm", "introduccion"] },
  { title: "Cómo acceder y configurar la cuenta", href: "/docs/getting-started", section: "Primeros Pasos", keywords: ["acceder", "login", "cuenta", "configurar"] },
  { title: "Directorio de contactos", href: "/docs/contacts", section: "Contactos", keywords: ["contactos", "directorio", "personas"] },
  { title: "Campos personalizados en contactos", href: "/docs/contacts#custom-fields", section: "Contactos", keywords: ["campos", "custom", "personalizados"] },
  { title: "Listas y segmentos de contactos", href: "/docs/contacts#lists", section: "Contactos", keywords: ["listas", "segmentos", "grupos"] },
  { title: "Importar contactos CSV", href: "/docs/contacts#import", section: "Contactos", keywords: ["importar", "csv", "bulk"] },
  { title: "Vista Kanban de Deals", href: "/docs/deals", section: "Deals", keywords: ["deals", "negocios", "kanban", "pipeline"] },
  { title: "Crear y editar un deal", href: "/docs/deals#crud", section: "Deals", keywords: ["crear", "deal", "negocio"] },
  { title: "Gestión de Pipelines", href: "/docs/pipelines", section: "Pipelines", keywords: ["pipeline", "etapas", "stages"] },
  { title: "Conversaciones WhatsApp y Email", href: "/docs/conversations", section: "Conversaciones", keywords: ["conversaciones", "whatsapp", "chat", "mensajes"] },
  { title: "Tipos de mensajes WhatsApp", href: "/docs/conversations#message-types", section: "Conversaciones", keywords: ["mensajes", "tipos", "imagen", "documento", "ubicacion"] },
  { title: "Templates WhatsApp", href: "/docs/whatsapp-templates", section: "Templates", keywords: ["templates", "plantillas", "whatsapp"] },
  { title: "Bandeja de entrada de correo", href: "/docs/email", section: "Email", keywords: ["email", "correo", "inbox", "bandeja"] },
  { title: "Campañas de email masivo", href: "/docs/mass-campaigns", section: "Campañas", keywords: ["masivo", "campanas", "email marketing", "bulk"] },
  { title: "Cotizaciones y presupuestos", href: "/docs/quotes", section: "Cotizaciones", keywords: ["cotizaciones", "presupuestos", "quotes"] },
  { title: "Facturas electrónicas (DIAN)", href: "/docs/invoices", section: "Facturación", keywords: ["facturas", "dian", "electronica", "facturacion"] },
  { title: "Catálogo de productos", href: "/docs/products", section: "Productos", keywords: ["productos", "catalogo", "precios"] },
  { title: "Reportes y Analytics", href: "/docs/reports", section: "Reportes", keywords: ["reportes", "analytics", "estadisticas", "graficos"] },
  { title: "Lead Scoring", href: "/docs/lead-scoring", section: "Analytics", keywords: ["lead scoring", "puntuacion", "calificacion", "leads"] },
  { title: "Editor de Automatizaciones", href: "/docs/workflows", section: "Automatizaciones", keywords: ["workflows", "automatizaciones", "triggers", "acciones"] },
  { title: "Calendario y eventos", href: "/docs/calendar", section: "Calendario", keywords: ["calendario", "eventos", "citas", "tareas"] },
  { title: "Proyectos", href: "/docs/projects", section: "Proyectos", keywords: ["proyectos", "project management"] },
  { title: "Configuración de la organización", href: "/docs/settings", section: "Configuración", keywords: ["settings", "configuracion", "organizacion"] },
  { title: "Gestión de usuarios y permisos", href: "/docs/settings#users", section: "Configuración", keywords: ["usuarios", "permisos", "equipo", "roles"] },
  { title: "MCP Connectors", href: "/docs/settings#mcp", section: "Configuración", keywords: ["mcp", "connectors", "ia", "inteligencia artificial"] },
  { title: "API Keys y autenticación", href: "/docs/api", section: "API", keywords: ["api", "token", "autenticacion", "keys"] },
  { title: "Endpoints API - Contactos", href: "/docs/api#contacts", section: "API", keywords: ["api", "contactos", "endpoints", "rest"] },
  { title: "Integración con N8N", href: "/docs/integrations#n8n", section: "Integraciones", keywords: ["n8n", "integracion", "automatizacion"] },
  { title: "WhatsApp Business API", href: "/docs/integrations", section: "Integraciones", keywords: ["whatsapp", "business", "api", "integracion"] },
  { title: "Spikey AI – Asistente inteligente", href: "/docs/spikey", section: "Spikey AI", keywords: ["spikey", "ai", "inteligencia artificial", "chatgpt"] },
];

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length > 0
    ? searchIndex.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.section.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.includes(q))
        );
      }).slice(0, 8)
    : searchIndex.slice(0, 6);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4" onClick={onClose}>
      <div
        className="w-full max-w-xl rounded-xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <Search size={16} style={{ color: "var(--muted-foreground)" }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en la documentación..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "var(--foreground)" }}
          />
          <button onClick={onClose} style={{ color: "var(--muted-foreground)" }}>
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="py-2 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-center py-8 text-sm" style={{ color: "var(--muted-foreground)" }}>
              Sin resultados para &quot;{query}&quot;
            </p>
          ) : (
            results.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-2.5 group transition-colors hover:bg-[#d1345b]/10"
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {item.title}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {item.section}
                  </p>
                </div>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#d1345b" }} />
              </Link>
            ))
          )}
        </div>

        <div
          className="px-4 py-2 border-t text-xs flex gap-3"
          style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
        >
          <span>↑↓ navegar</span>
          <span>↵ abrir</span>
          <span>Esc cerrar</span>
        </div>
      </div>
    </div>
  );
}
