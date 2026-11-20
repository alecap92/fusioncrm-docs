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
  { title: "Configuración de facturación electrónica (pestañas)", href: "/docs/invoices#config", section: "Facturación", keywords: ["configuracion dian", "ajustes facturacion", "resolucion", "certificado", "software", "pin", "guardar", "sincronizar con la dian", "plantilla pdf", "correo de envio"] },
  { title: "Alta en la DIAN: asistente para empezar a facturar", href: "/docs/alta-dian", section: "Facturación", keywords: ["alta dian", "habilitacion", "habilitar", "set de pruebas", "testsetid", "softwareid", "pin", "certificado", "p12", "pfx", "rut", "resolucion", "traer de la dian", "crear empresa"] },
  { title: "Habilitar documento soporte ante la DIAN", href: "/docs/alta-dian#documento-soporte", section: "Facturación", keywords: ["documento soporte", "no obligados a facturar", "set de pruebas", "testsetid", "habilitar ahora", "sincronizar a produccion", "software propio"] },
  { title: "Contabilidad: comprobantes, recibos, egresos y libros", href: "/docs/contabilidad", section: "Contabilidad", keywords: ["contabilidad", "contable", "contador", "libros", "comprobantes", "activar contabilidad", "puc"] },
  { title: "Configura tu contabilidad (catálogo de cuentas, períodos, opciones)", href: "/docs/contabilidad#configurar", section: "Contabilidad", keywords: ["catalogo de cuentas", "puc", "cuentas por defecto", "conceptos e ingresos", "ver debitos y creditos", "periodos", "fecha de cierre", "cerrar periodo", "nueva cuenta"] },
  { title: "Documento interno de venta (venta no electrónica)", href: "/docs/contabilidad#documento-interno", section: "Contabilidad", keywords: ["documento interno", "venta no electronica", "remision", "sin factura electronica", "anular documento", "prefijo", "numeracion"] },
  { title: "Comprobantes contables, manual y saldos iniciales", href: "/docs/contabilidad#comprobantes", section: "Contabilidad", keywords: ["comprobantes", "comprobante manual", "nuevo comprobante", "saldos iniciales", "apertura", "anular comprobante", "debito", "credito", "sincronizar ahora"] },
  { title: "Recibos de caja y comprobantes de egreso", href: "/docs/contabilidad#recibos-y-egresos", section: "Contabilidad", keywords: ["recibo de caja", "recibos", "egreso", "egresos", "comprobante de egreso", "anticipo", "otro ingreso", "revisar", "en proceso", "atascado", "anular recibo", "pagar proveedor"] },
  { title: "Bancos y caja", href: "/docs/contabilidad#bancos-y-caja", section: "Contabilidad", keywords: ["bancos", "caja", "banco o caja", "cuenta bancaria", "agregar banco"] },
  { title: "Registrar pago con recibo de caja y pagar una compra con egreso", href: "/docs/contabilidad#registrar-pago", section: "Contabilidad", keywords: ["registrar pago", "abono", "eliminar abono", "anular recibo", "pagar compra", "pagos y saldo", "descargar recibo"] },
  { title: "Importar contabilidad desde Siigo (catálogo y saldos iniciales)", href: "/docs/contabilidad#importar", section: "Contabilidad", keywords: ["importar", "siigo", "otro software", "excel", "xlsx", "saldos iniciales", "catalogo de cuentas", "balance de prueba por tercero", "fecha de corte", "migrar"] },
  { title: "Libros: balance de prueba y auxiliares", href: "/docs/contabilidad#libros", section: "Contabilidad", keywords: ["libros", "balance de prueba", "auxiliar", "auxiliar por cuenta", "auxiliar por tercero", "exportar a excel", "movimientos de la cuenta"] },
  { title: "Conciliación bancaria: subir el extracto y cruzar", href: "/docs/contabilidad#conciliacion", section: "Contabilidad", keywords: ["conciliacion", "conciliacion bancaria", "extracto", "extracto bancario", "bancolombia", "csv", "cruzar movimientos", "4x1000", "comision", "saldo inicial", "conciliado", "subir extracto", "detectar columnas", "registrar en libros", "sugerencias seguras"] },
  { title: "Transferencias entre cuentas de dinero", href: "/docs/contabilidad#transferencias", section: "Contabilidad", keywords: ["transferencia", "transferencias", "caja a banco", "consignacion", "entre cuentas", "traslado"] },
  { title: "Cierre del año y fecha de cierre", href: "/docs/contabilidad#cierre-anual", section: "Contabilidad", keywords: ["cierre anual", "cierre del año", "cerrar año", "cerrar mes", "comprobante de cierre", "utilidad del ejercicio", "perdida del ejercicio", "360505", "361005", "reabrir año", "fecha de cierre", "simular el cierre", "periodo cerrado", "año cerrado"] },
  { title: "Estados financieros: balance general y estado de resultados", href: "/docs/contabilidad#estados-financieros", section: "Contabilidad", keywords: ["balance general", "estado de resultados", "estados financieros", "comparativo", "utilidad neta", "resultado del ejercicio", "pdf con firmas", "por que difieren", "informes gerenciales"] },
  { title: "Libro diario y mayor y balances", href: "/docs/contabilidad#diario-y-mayor", section: "Contabilidad", keywords: ["libro diario", "mayor y balances", "libro mayor", "diario"] },
  { title: "PDF del comprobante contable, recibo y egreso", href: "/docs/contabilidad#pdf-contables", section: "Contabilidad", keywords: ["pdf comprobante", "comprobante contable pdf", "recibo sin cuentas", "egreso con cuentas", "imprimir comprobante", "pdf para el cliente", "pdf para el proveedor", "pdf con cuentas contables"] },
  { title: "Egreso con IVA descontable (gasto con IVA incluido)", href: "/docs/contabilidad#egreso-iva-y-compras", section: "Contabilidad", keywords: ["iva descontable", "gasto con iva", "egreso con iva", "iva incluido"] },
  { title: "Compra repetida y compra con pagos", href: "/docs/contabilidad#compra-repetida", section: "Contabilidad", keywords: ["compra duplicada", "compra repetida", "guardar de todos modos", "compra con pagos", "editar compra", "corregir compra"] },
  { title: "Firmantes de los estados financieros", href: "/docs/contabilidad#firmantes", section: "Contabilidad", keywords: ["firmantes", "representante legal", "contador", "tarjeta profesional", "firmas", "pdf con firmas"] },
  { title: "Dónde está cada cosa: menú de Facturación y de Contabilidad", href: "/docs/contabilidad#menu", section: "Contabilidad", keywords: ["menu", "donde esta", "cobros y pagos", "recibos de caja", "egresos", "movimientos", "ajustes de contabilidad", "balance de prueba"] },
  { title: "Ajustes de contabilidad: Resumen, Cuentas, Preferencias y las demás secciones", href: "/docs/contabilidad#ajustes-contabilidad", section: "Contabilidad", keywords: ["ajustes de contabilidad", "resumen", "cuentas", "periodos y cierre", "documentos y numeracion", "retenciones", "preferencias", "media carta", "tamano del pdf", "saldos iniciales hasta"] },
  { title: "Banco y caja por defecto", href: "/docs/contabilidad#banco-por-defecto", section: "Contabilidad", keywords: ["banco por defecto", "caja por defecto", "cuenta por defecto", "a donde entra el pago"] },
  { title: "Contabilidad de este documento (panel en facturas y compras)", href: "/docs/contabilidad#documento-panel", section: "Contabilidad", keywords: ["contabilidad de este documento", "comprobantes de una factura", "pagos y recibos", "pagos y egresos", "panel"] },
  { title: "Compra pagada con egreso: «Registrar el pago»", href: "/docs/contabilidad#compra-pagada", section: "Contabilidad", keywords: ["registrar el pago", "compra pagada", "marcar pagada", "cambiar estado", "ya la pagaste"] },
  { title: "Gasto sin documento con egreso y tercero genérico", href: "/docs/contabilidad#gasto-sin-documento", section: "Contabilidad", keywords: ["gasto sin documento", "tercero generico", "cuantias menores", "222222222222", "nit o cedula", "caja menor"] },
  { title: "Cobros por la API y por un asistente (MCP) con contabilidad", href: "/docs/contabilidad#api-y-mcp", section: "Contabilidad", keywords: ["api", "mcp", "asistente", "integracion", "pago por api", "recibo de caja", "banco por defecto"] },
  { title: "Inventario: existencias, kardex y costo promedio", href: "/docs/contabilidad#inventario", section: "Contabilidad", keywords: ["inventario", "existencias", "kardex", "costo promedio", "maneja inventario", "existencia minima", "stock", "bodega", "vender sin existencias", "en negativo"] },
  { title: "Ajustes de inventario y saldo inicial de inventario", href: "/docs/contabilidad#ajustes-inventario", section: "Contabilidad", keywords: ["ajuste de inventario", "saldo inicial", "conteo", "dano", "perdida", "sobrante", "devolucion", "anular ajuste"] },
  { title: "Impuestos: borradores de IVA (300), retención (350) y anticipo del Simple", href: "/docs/contabilidad#impuestos", section: "Contabilidad", keywords: ["impuestos", "iva", "formulario 300", "retencion en la fuente", "formulario 350", "regimen simple", "anticipo", "saldo a favor", "marcar como presentada", "tarifa de iva", "borrador"] },
  { title: "Revisión: los controles antes de cerrar un período", href: "/docs/contabilidad#revision", section: "Contabilidad", keywords: ["revision", "controles", "saldos al reves", "saltos de numeracion", "posibles repetidos", "inventario contra libros", "lo que te deben", "lo que debes"] },
  { title: "Registro de cambios: quién hizo qué en la contabilidad", href: "/docs/contabilidad#registro-de-cambios", section: "Contabilidad", keywords: ["registro de cambios", "auditoria", "quien hizo que", "historial", "quien anulo"] },
  { title: "Quién puede hacer qué en la contabilidad (roles)", href: "/docs/contabilidad#roles", section: "Contabilidad", keywords: ["roles", "permisos", "lector", "solo lectura", "contador", "empleado", "propietario"] },
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
  { title: "Plan, precios y usuarios", href: "/docs/settings#plan", section: "Configuración", keywords: ["plan", "asientos", "usuarios", "precio", "basico", "pro", "empresarial", "prueba gratis", "anual", "contabilidad"] },
  { title: "Registro de auditoría", href: "/docs/settings#audit-log", section: "Configuración", keywords: ["auditoria", "registro", "quien hizo", "historial", "empresarial"] },
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
