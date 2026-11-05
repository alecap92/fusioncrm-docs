"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";

const searchIndex = [
  { title: "¿Qué es FusionCRM?", href: "/docs", section: "Introducción", keywords: ["fusioncrm", "crm", "introduccion"] },
  { title: "¿Qué es un CRM y por qué usarlo?", href: "/docs/que-es-un-crm", section: "Primeros Pasos", keywords: ["crm", "que es", "embudo", "pipeline", "lead", "beneficios", "conceptos"] },
  { title: "Soporte: WhatsApp y correo", href: "/docs/soporte", section: "Soporte", keywords: ["soporte", "ayuda", "contacto", "whatsapp", "correo", "problema"] },
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
  { title: "Envíos: cotizar y generar guías con Envia.com", href: "/docs/shipments", section: "Envíos", keywords: ["envios", "envio", "guia", "guias", "transportadora", "transportadoras", "envia", "despachar", "despacho", "paquete", "cotizar envio", "coordinadora", "servientrega", "interrapidisimo", "tcc"] },
  { title: "Antes de empezar con Envíos (API key y origen)", href: "/docs/shipments#setup", section: "Envíos", keywords: ["envia", "api key", "token", "origen", "direccion de origen", "saldo", "conectar"] },
  { title: "Cotizar y generar una guía", href: "/docs/shipments#quote", section: "Envíos", keywords: ["cotizar", "guia", "tarifa", "tarifas", "seguro", "contraentrega", "contra entrega", "recogida", "ciudad", "destino"] },
  { title: "Estados de un envío", href: "/docs/shipments#statuses", section: "Envíos", keywords: ["estado", "entregado", "en transito", "novedad", "devuelto", "rastreo"] },
  { title: "Rastrear, etiqueta y cancelar guía", href: "/docs/shipments#actions", section: "Envíos", keywords: ["rastrear", "rastreo", "etiqueta", "cancelar", "numero de guia", "copiar guia", "devolucion saldo"] },
  { title: "Configuración de envíos (sandbox, etiqueta, paquetes, webhook)", href: "/docs/shipments#settings", section: "Envíos", keywords: ["sandbox", "produccion", "zpl", "pdf", "termica", "zebra", "paquetes predefinidos", "webhook", "contenido por defecto"] },
  { title: "Etiquetas y rótulos de envío", href: "/docs/shipments#labels", section: "Envíos", keywords: ["etiqueta", "rotulo", "rotulos", "imprimir", "plantilla pdf", "sticker"] },
  { title: "Errores comunes de Envíos", href: "/docs/shipments#errors", section: "Envíos", keywords: ["sin saldo", "saldo insuficiente", "error", "ciudad no reconocida", "transportadora", "no genero"] },
  { title: "Cómo escribirle a un cliente por WhatsApp", href: "/docs/conversations#iniciar-whatsapp", section: "Conversaciones", keywords: ["plantilla", "24 horas", "ventana", "primer mensaje", "escribir primero", "whatsapp", "iniciar"] },
  { title: "Proyectos", href: "/docs/projects", section: "Proyectos", keywords: ["proyectos", "project management"] },
  { title: "Biblioteca de archivos", href: "/docs/biblioteca", section: "Biblioteca", keywords: ["biblioteca", "archivos", "documentos", "catalogo", "subir", "rag", "base de conocimiento", "tags"] },
  { title: "Estrategia de marketing", href: "/docs/estrategia", section: "Estrategia", keywords: ["estrategia", "funnel", "embudo", "audiencia", "buyer persona", "palabras clave", "keywords", "marketing"] },
  { title: "Configuración de la organización", href: "/docs/settings", section: "Configuración", keywords: ["settings", "configuracion", "organizacion"] },
  { title: "Gestión de usuarios y permisos", href: "/docs/settings#users", section: "Configuración", keywords: ["usuarios", "permisos", "equipo", "roles"] },
  { title: "Actividad del equipo: qué hacen tus empleados", href: "/docs/team-activity", section: "Actividad del equipo", keywords: ["actividad", "equipo", "empleados", "vendedores", "rendimiento", "log", "ultima actividad", "informe", "productividad", "supervisar"] },
  { title: "Informe de equipo automático (correo / WhatsApp)", href: "/docs/team-activity#report", section: "Actividad del equipo", keywords: ["informe", "reporte", "diario", "semanal", "programado", "correo", "whatsapp", "automatizacion"] },
  { title: "Empresas (cuentas B2B)", href: "/docs/companies", section: "Empresas", keywords: ["empresas", "companies", "cuentas", "b2b", "nit"] },
  { title: "Formularios web", href: "/docs/forms", section: "Formularios", keywords: ["formularios", "forms", "leads", "landing", "embed", "webhook", "utm"] },
  { title: "Páginas de aterrizaje (landing pages)", href: "/docs/landing-pages", section: "Páginas", keywords: ["landing", "landing page", "paginas", "página", "anuncios", "meta ads", "qr", "whatsapp", "conversion", "pixel"] },
  { title: "Requisitos por etapa (blueprints)", href: "/docs/deals#requirements", section: "Deals", keywords: ["requisitos", "blueprint", "obligatorio", "etapa", "checklist"] },
  { title: "Link público y seguimiento de cotizaciones", href: "/docs/quotes#send", section: "Cotizaciones", keywords: ["cotizacion", "link", "vista", "seguimiento", "publico"] },
  { title: "Seguridad, 2FA y sesiones", href: "/docs/settings#security", section: "Configuración", keywords: ["seguridad", "2fa", "dos pasos", "sesiones", "habeas data"] },
  { title: "Plan, asientos y módulos", href: "/docs/settings#plan", section: "Configuración", keywords: ["plan", "asientos", "usuarios", "modulos", "precio", "pro", "unlimited"] },
  { title: "Conectores MCP", href: "/docs/settings#mcp", section: "Configuración", keywords: ["mcp", "conectores", "ia", "inteligencia artificial", "claude"] },
  { title: "Tokens de API", href: "/docs/api#auth", section: "API", keywords: ["api", "token", "autenticacion", "keys", "bearer"] },
  { title: "Permisos de la API", href: "/docs/api#permissions", section: "API", keywords: ["api", "permisos", "scopes", "contacts:read"] },
  { title: "Referencia de endpoints (OpenAPI)", href: "/docs/api#reference", section: "API", keywords: ["api", "endpoints", "rest", "openapi", "swagger", "contactos", "deals"] },
  { title: "Ciudades: catálogo DANE y cityCode", href: "/docs/ciudades", section: "API", keywords: ["ciudad", "ciudades", "municipio", "municipios", "dane", "divipola", "citycode", "departamento", "statecode", "catalogo"] },
  { title: "Envíos por API (Envia.com)", href: "/docs/envios", section: "API", keywords: ["envios", "envio", "api", "endpoints", "shipments", "idempotencia", "idempotencykey", "envia"] },
  { title: "Webhooks salientes", href: "/docs/api#webhooks", section: "API", keywords: ["webhook", "evento", "etapa", "http", "automatizacion"] },
  { title: "MCP: el CRM desde tu IA", href: "/docs/mcp", section: "MCP", keywords: ["mcp", "claude", "chatgpt", "cursor", "ia", "inteligencia artificial", "tools"] },
  { title: "Agentes IA de WhatsApp", href: "/docs/agentes-ia", section: "Agentes IA", keywords: ["agente", "ia", "bot", "whatsapp", "openai", "prompt", "asistente"] },
  { title: "Integración con N8N, Make y Zapier", href: "/docs/integrations#n8n", section: "Integraciones", keywords: ["n8n", "make", "zapier", "integracion", "automatizacion"] },
  { title: "WhatsApp Business API", href: "/docs/integrations", section: "Integraciones", keywords: ["whatsapp", "business", "api", "integracion"] },
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
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(15, 22, 41, 0.45)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Buscar en la documentación"
    >
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
                  <p className="m-0 text-sm font-medium leading-snug" style={{ color: "var(--foreground)" }}>
                    {item.title}
                  </p>
                  <p className="m-0 mt-0.5 text-xs leading-snug" style={{ color: "var(--muted-foreground)" }}>
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
