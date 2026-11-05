import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Cotizaciones: crea, envía y convierte en factura",
  description:
    "Crea cotizaciones en PDF con cálculo automático de impuestos, envíalas por correo o WhatsApp, sigue su estado y conviértelas en factura electrónica.",
  keywords: ["cotizaciones", "cotización en PDF", "presupuestos", "enviar cotización por WhatsApp", "convertir a factura"],
  alternates: { canonical: "/docs/quotes" },
  openGraph: {
    title: "Cotizaciones: crea, envía y convierte en factura",
    description:
      "Crea cotizaciones en PDF con cálculo automático de impuestos, envíalas por correo o WhatsApp, sigue su estado y conviértelas en factura electrónica.",
    url: "/docs/quotes",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

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
            <li>• Se pueden enviar por correo o por WhatsApp directamente desde el CRM</li>
            <li>• Tienen un enlace público donde el cliente puede verlas, aceptarlas o rechazarlas</li>
            <li>• Tienen seguimiento de apertura (el cliente vio la cotización)</li>
            <li>• Se pueden convertir en facturas (requiere el módulo de Facturación)</li>
          </ul>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear cotización</h2>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>Para crear una nueva cotización:</p>
          <ol className="space-y-3 mb-6">
            {[
              { n: "1", t: "Ve a Negocio → Cotizaciones → «Nueva Cotización»", d: "También puedes usar «Crear cotización» desde la ficha de un contacto o de una empresa, o desde el panel del chat." },
              { n: "2", t: "Selecciona el cliente", d: "Busca y selecciona el contacto de tu base de datos. Los datos se rellenan automáticamente." },
              { n: "3", t: "Revisa las fechas", d: "Fecha de Creación y Fecha de Vencimiento de la cotización." },
              { n: "4", t: "Agrega los productos/servicios", d: "Busca en el catálogo o ingresa ítems manualmente." },
              { n: "5", t: "Ajusta precios y cantidades", d: "Modifica precios, aplica descuentos y verifica los totales." },
              { n: "6", t: "Agrega términos y notas", d: "Términos de pago, términos de envío y notas para el cliente." },
              { n: "7", t: "Guarda", d: "«Guardar borrador» si aún no está terminada (queda en Borrador) o «Crear» para dejarla Lista. Luego la envías desde el menú ⋮ de la lista." },
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
                  ["Número de cotización", "Automático: prefijo + consecutivo (ej. COT-125)"],
                  ["Cliente", "Contacto de la base de datos"],
                  ["Fecha de Creación", "Cuándo se genera la cotización"],
                  ["Fecha de Vencimiento", "Hasta cuándo es válida la oferta"],
                  ["Ítems", "Productos/servicios con cantidad, precio unitario, descuento e impuesto"],
                  ["Subtotal, impuestos y total", "Calculados automáticamente"],
                  ["Términos de pago", "Se eligen de las opciones de Configuración o se escriben a mano"],
                  ["Términos de envío", "Igual que los términos de pago"],
                  ["Notas", "Observaciones para el cliente"],
                ].map(([c, d]) => (
                  <tr key={c}>
                    <td className="p-3 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{c}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La moneda es la de tu organización; no se elige por cotización.
          </p>
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
            <li>• Aplicar un descuento por ítem, en valor (no en porcentaje)</li>
            <li>• Elegir el impuesto de cada ítem entre las tasas que usan tus productos</li>
            <li>• Reordenar ítems con los botones Subir y Bajar</li>
            <li>• Agregar más líneas con «Agregar Item» y eliminarlas con el botón de la papelera</li>
          </ul>
        </section>

        <section id="send" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Enviar cotización</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para enviar la cotización al cliente:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por correo:</strong> en el menú ⋮ de la cotización elige «Enviar por correo» para abrir el compositor con la cotización como PDF adjunto. Necesitas tener tu cuenta de correo de envío configurada.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por WhatsApp:</strong> en el mismo menú elige «Enviar por WhatsApp»; tras confirmar, se envían el PDF y el enlace al cliente. Si el cliente no te ha escrito en las últimas 24 horas, WhatsApp no deja enviarla y te avisamos.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por otro canal:</strong> si la entregaste en persona o por otro medio, usa «Marcar como enviada» en «Cambiar estado».</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Link público:</strong> cada cotización puede tener un enlace <code>/q/&lt;código&gt;</code> que muestra la misma cotización del PDF en el navegador, sin sesión. Se incluye en el correo y puedes copiarlo para WhatsApp. Caduca a los 120 días y lo puedes revocar cuando quieras.</li>
          </ul>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Al enviarla, la cotización pasa a <em>Enviada</em> y queda una actividad
            «Cotización enviada» en la ficha del contacto, sin importar si salió por el compositor
            de correo o por la API.
          </p>
          <Callout type="tip">
            Cuando el cliente abre el link público se registra una vista (varias aperturas del mismo
            lector en 30 minutos cuentan como una). Con el disparador <em>Cotización vista</em> de
            automatizaciones puedes avisarle al asesor en la primera apertura, o solo cuando el
            cliente la abre por tercera vez. La apertura del correo es una señal más débil: los
            clientes de correo la marcan solos.
          </Callout>
        </section>

        <section id="status" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Estados de cotización</h2>
          <div className="space-y-2 mb-4">
            {[
              { status: "Borrador", color: "#6b7280", desc: "A medias, todavía no está terminada." },
              { status: "Lista", color: "#64748b", desc: "Terminada, pero aún no se ha enviado." },
              { status: "Enviada", color: "#3b82f6", desc: "Se le envió al cliente." },
              { status: "Aceptada", color: "#22c55e", desc: "El cliente aprobó la propuesta." },
              { status: "Rechazada", color: "#ef4444", desc: "El cliente declinó la oferta." },
              { status: "Vencida", color: "#f59e0b", desc: "Pasó la fecha de vencimiento sin respuesta." },
              { status: "Facturada", color: "#14b8a6", desc: "Se convirtió en factura." },
              { status: "Anulada", color: "#991b1b", desc: "Queda en el historial, pero ya no se puede enviar ni facturar." },
            ].map((s) => (
              <div key={s.status} className="flex items-center gap-3 p-3 rounded border" style={{ borderColor: "var(--border)" }}>
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{s.status}:</span>
                <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.desc}</span>
              </div>
            ))}
          </div>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• &ldquo;Vista&rdquo; no es un estado: el ícono de vista, debajo del estado, indica que el cliente abrió el enlace.</li>
            <li>• El cliente puede <strong style={{ color: "var(--foreground)" }}>Aceptar</strong> o <strong style={{ color: "var(--foreground)" }}>Rechazar</strong> (con motivo) desde el enlace público, y la cotización cambia de estado sola.</li>
            <li>• Tú cambias el estado desde el menú ⋮ → «Cambiar estado». Al marcarla como rechazada eliges el motivo: Precio, Tiempo de entrega, Eligió a otro, No respondió u Otro.</li>
            <li>• A una cotización vencida le puedes extender la vigencia con «Extender vigencia (abrir el editor)».</li>
            <li>• En la lista puedes filtrar por estado; cada filtro muestra cuántas cotizaciones tiene.</li>
          </ul>
        </section>

        <section id="convert" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Convertir a factura</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cuando el cliente acepta la cotización, puedes convertirla en una factura electrónica.
            Esta opción solo aparece si tu organización tiene el módulo adicional de{" "}
            <a href="/docs/invoices" style={{ color: "#d1345b" }}>Facturación</a>.
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Abre la cotización aceptada</li>
            <li>2. Pulsa «Generar factura» (en el aviso de la cotización o en su menú ⋮)</li>
            <li>3. Revisa los datos de la factura (se prellenan desde la cotización)</li>
            <li>4. Emite la factura electrónica</li>
          </ol>
          <Callout type="note">
            Para emitir facturas electrónicas debes tener configurada la integración con la DIAN.
            La configuración está en Configuración → Facturación → Facturación electrónica.
          </Callout>
        </section>

        <section id="settings" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Configuración</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Personaliza las cotizaciones desde{" "}
            <strong style={{ color: "var(--foreground)" }}>Configuración → Documentos → Cotizaciones</strong>:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Próximo número de cotización (solo lectura) y prefijo del número</li>
            <li>• Días de validez (15 por defecto)</li>
            <li>• Nombre del impuesto (IVA, VAT…)</li>
            <li>• Opciones de términos de pago y de términos de envío</li>
            <li>• Notas predeterminadas</li>
            <li>• Texto del pie de página e imagen de fondo del PDF</li>
          </ul>
          <p style={{ color: "var(--muted-foreground)" }}>
            El diseño del PDF se ajusta en Configuración → Documentos → Plantillas PDF.
          </p>
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
