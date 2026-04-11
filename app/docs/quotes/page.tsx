import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Cotizaciones" };

const toc = [
  { id: "overview", label: "¿Qué son las cotizaciones?" },
  { id: "create", label: "Crear cotización" },
  { id: "products", label: "Agregar productos y servicios" },
  { id: "send", label: "Enviar cotización" },
  { id: "status", label: "Estados de cotización" },
  { id: "convert", label: "Convertir a factura" },
  { id: "settings", label: "Configuración" },
];

export default function QuotesPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Cotizaciones</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El módulo de cotizaciones te permite generar, enviar y dar seguimiento a presupuestos
          comerciales de manera profesional, con cálculo automático de totales e impuestos.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>¿Qué son las cotizaciones?</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Una cotización (o presupuesto) es un documento comercial que detalla los productos o
            servicios ofrecidos con sus precios, condiciones y validez. En FusionCRM, las cotizaciones:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Se generan con una plantilla profesional personalizable</li>
            <li>• Incluyen logo, información de la empresa y del cliente</li>
            <li>• Calculan automáticamente subtotales, impuestos y total</li>
            <li>• Se pueden enviar por email directamente desde el CRM</li>
            <li>• Tienen seguimiento de apertura (el cliente vio la cotización)</li>
            <li>• Se pueden convertir en facturas con un clic</li>
          </ul>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear cotización</h2>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>Para crear una nueva cotización:</p>
          <ol className="space-y-3 mb-6">
            {[
              { n: "1", t: "Ve a Cotizaciones → Nueva cotización", d: "O desde el perfil de un contacto o deal, haz clic en \"Nueva cotización\"." },
              { n: "2", t: "Selecciona el cliente", d: "Busca y selecciona el contacto de tu base de datos. Los datos se rellenan automáticamente." },
              { n: "3", t: "Configura las fechas", d: "Fecha de emisión y fecha de validez de la cotización." },
              { n: "4", t: "Agrega los productos/servicios", d: "Busca en el catálogo o ingresa ítems manualmente." },
              { n: "5", t: "Ajusta precios y cantidades", d: "Modifica precios, aplica descuentos y verifica los totales." },
              { n: "6", t: "Agrega notas y condiciones", d: "Texto libre para condiciones de pago, tiempo de entrega, etc." },
              { n: "7", t: "Guarda o envía", d: "Guarda como borrador para revisar o envía directamente al cliente." },
            ].map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#d1345b" }}>{s.n}</span>
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{s.t}</p>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Campos de la cotización</div>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Campo</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Número de cotización", "Auto-generado con prefijo configurable (ej. COT-2025-001)"],
                  ["Cliente", "Contacto de la base de datos"],
                  ["Fecha de emisión", "Cuándo se genera la cotización"],
                  ["Válida hasta", "Fecha de expiración de la oferta"],
                  ["Moneda", "COP, USD u otra configurada"],
                  ["Ítems", "Productos/servicios con cantidad, precio unitario y descuento"],
                  ["Subtotal", "Calculado automáticamente"],
                  ["Impuestos (IVA)", "Configurado por producto o manual"],
                  ["Total", "Suma final"],
                  ["Notas", "Condiciones de pago, observaciones"],
                  ["Términos", "Texto legal o condiciones generales"],
                ].map(([c, d]) => (
                  <tr key={c}>
                    <td className="p-3 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{c}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="products" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Agregar productos y servicios</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En la sección de ítems de la cotización puedes:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Buscar productos del catálogo (precio se autocompleta)</li>
            <li>• Crear ítems personalizados que no están en el catálogo</li>
            <li>• Ajustar la cantidad de cada ítem</li>
            <li>• Aplicar descuentos por ítem (porcentaje o valor fijo)</li>
            <li>• Configurar el IVA por ítem (0%, 5%, 19%, exento)</li>
            <li>• Reordenar ítems arrastrando</li>
            <li>• Eliminar ítems con el botón de la papelera</li>
          </ul>
        </section>

        <section id="send" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Enviar cotización</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para enviar la cotización al cliente:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por email:</strong> Haz clic en "Enviar por email" para abrir el compositor con la cotización como PDF adjunto.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por WhatsApp:</strong> Descarga el PDF y envíalo desde el módulo de Conversaciones.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Link de vista:</strong> Genera un link único para que el cliente vea la cotización en línea sin descargar PDF.</li>
          </ul>
          <Callout type="tip">
            Cuando envías la cotización por email desde FusionCRM y el cliente la abre, recibirás
            una notificación. Esto te permite hacer seguimiento en el momento justo.
          </Callout>
        </section>

        <section id="status" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Estados de cotización</h2>
          <div className="space-y-2 mb-4">
            {[
              { status: "Borrador", color: "#6b7280", desc: "Creada pero no enviada al cliente." },
              { status: "Enviada", color: "#3b82f6", desc: "El cliente ha recibido la cotización." },
              { status: "Vista", color: "#8b5cf6", desc: "El cliente abrió la cotización (seguimiento de apertura)." },
              { status: "Aceptada", color: "#22c55e", desc: "El cliente aprobó la propuesta." },
              { status: "Rechazada", color: "#ef4444", desc: "El cliente declinó la oferta." },
              { status: "Expirada", color: "#f59e0b", desc: "Pasó la fecha de validez sin respuesta." },
              { status: "Facturada", color: "#14b8a6", desc: "Se convirtió en factura." },
            ].map((s) => (
              <div key={s.status} className="flex items-center gap-3 p-3 rounded border" style={{ borderColor: "var(--border)" }}>
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{s.status}:</span>
                <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="convert" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Convertir a factura</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cuando el cliente acepta la cotización, puedes convertirla directamente en una factura
            electrónica con un solo clic:
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Abre la cotización aceptada</li>
            <li>2. Haz clic en el botón "Convertir a factura"</li>
            <li>3. Revisa los datos de la factura (se prellenan desde la cotización)</li>
            <li>4. Emite la factura electrónica</li>
          </ol>
          <Callout type="note">
            Para emitir facturas electrónicas debes tener configurada la integración con la DIAN.
            Ve a Facturación → Configuración para completar el proceso de habilitación.
          </Callout>
        </section>

        <section id="settings" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Configuración</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Personaliza las cotizaciones desde{" "}
            <strong style={{ color: "var(--foreground)" }}>Configuración → Cotizaciones</strong>:
          </p>
          <ul className="space-y-1 pl-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Prefijo del número de cotización</li>
            <li>• Logo y datos de la empresa en el encabezado</li>
            <li>• Términos y condiciones predeterminados</li>
            <li>• Validez predeterminada (días)</li>
            <li>• Moneda predeterminada</li>
            <li>• Configuración de IVA predeterminado</li>
          </ul>
        </section>

        <DocNav
          prev={{ href: "/docs/mass-campaigns", title: "Campañas Masivas" }}
          next={{ href: "/docs/invoices", title: "Facturación" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
