import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Facturación" };

const toc = [
  { id: "overview", label: "Facturación electrónica" },
  { id: "config", label: "Configuración DIAN" },
  { id: "create", label: "Crear factura" },
  { id: "fields", label: "Campos de factura" },
  { id: "incoming", label: "Facturas de compra" },
  { id: "credit-notes", label: "Notas crédito" },
  { id: "purchases", label: "Compras" },
];

export default function InvoicesPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Facturación</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          FusionCRM incluye un módulo de facturación electrónica con integración directa a la DIAN
          (Colombia), permitiendo emitir facturas de venta, notas crédito y gestionar compras.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Facturación electrónica</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La facturación electrónica en Colombia es obligatoria para la mayoría de contribuyentes.
            FusionCRM genera facturas en el formato XML requerido por la DIAN, firma electrónicamente
            con tu certificado digital y envía el documento al cliente y a la DIAN en un solo proceso.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { title: "Factura de venta", desc: "Documento de venta electrónico CUFE.", color: "#3b82f6" },
              { title: "Nota crédito", desc: "Anulación o ajuste de factura emitida.", color: "#8b5cf6" },
              { title: "Factura de compra", desc: "Registro de facturas recibidas de proveedores.", color: "#22c55e" },
            ].map((t) => (
              <div key={t.title} className="p-4 rounded-lg border text-center" style={{ borderColor: t.color, backgroundColor: `${t.color}10` }}>
                <p className="font-bold" style={{ color: t.color }}>{t.title}</p>
                <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="config" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Configuración DIAN</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Antes de emitir facturas electrónicas, debes completar la configuración DIAN. Este proceso
            se realiza una sola vez desde <strong style={{ color: "var(--foreground)" }}>
            Facturas → Configuración</strong>.
          </p>
          <div className="space-y-4 mb-6">
            {[
              { step: "Paso 1: Datos de empresa", desc: "NIT, razón social, dirección, actividad económica (CIIU), régimen tributario." },
              { step: "Paso 2: Certificado digital", desc: "Sube tu certificado .p12 o .pfx y su contraseña. Este certificado firma las facturas electrónicamente." },
              { step: "Paso 3: Resolución DIAN", desc: "Número de resolución, prefijo (ej. FV), rango de numeración y fecha de vigencia." },
              { step: "Paso 4: Verificación", desc: "FusionCRM envía una factura de prueba a la DIAN en ambiente de habilitación para validar la configuración." },
              { step: "Paso 5: Activación", desc: "Una vez verificado, activa el modo de producción para emitir facturas reales." },
            ].map((s) => (
              <div key={s.step} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{s.step}</p>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <Callout type="warning">
            Para obtener tu resolución de facturación electrónica, debes solicitarla directamente
            ante la DIAN en el portal Muisca. Este proceso puede tomar varios días hábiles.
          </Callout>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear factura</h2>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>Para emitir una nueva factura de venta:</p>
          <ol className="space-y-3 mb-6">
            {[
              { n: "1", t: "Ve a Facturas → Nueva factura", d: "O conviértela desde una cotización aceptada." },
              { n: "2", t: "Selecciona el cliente", d: "El sistema precargará sus datos de identificación (NIT o cédula)." },
              { n: "3", t: "Configura fechas y condiciones", d: "Fecha de emisión, fecha de vencimiento, condición de pago (contado/crédito)." },
              { n: "4", t: "Agrega los ítems", d: "Productos o servicios con código, descripción, cantidad, precio y IVA." },
              { n: "5", t: "Revisa el total", d: "Verifica subtotal, IVA desglosado, retenciones si aplican y total." },
              { n: "6", t: "Emite la factura", d: "Al hacer clic en \"Emitir\", se firma y envía a la DIAN. El proceso toma unos segundos." },
              { n: "7", t: "Envía al cliente", d: "El sistema puede enviar automáticamente el PDF y XML al email del cliente." },
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
        </section>

        <section id="fields" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Campos de factura</h2>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Campos requeridos por DIAN</div>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Campo</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["CUFE", "Código Único de Factura Electrónica (generado automáticamente)"],
                  ["NIT emisor", "NIT de tu empresa con dígito de verificación"],
                  ["NIT/CC receptor", "Identificación del cliente"],
                  ["Prefijo + número", "Ej: FV-2025-001 según resolución DIAN"],
                  ["Fecha de emisión", "Fecha en que se genera la factura"],
                  ["Descripción ítem", "Descripción clara del producto o servicio"],
                  ["Código de ítem", "Código interno o estándar del producto"],
                  ["Unidad de medida", "UND, KG, LT, HR, etc."],
                  ["Precio unitario", "Valor antes de impuestos"],
                  ["IVA (%)", "0%, 5%, 19% según el bien/servicio"],
                  ["Forma de pago", "Contado o crédito con fecha de vencimiento"],
                ].map(([c, d]) => (
                  <tr key={c}>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{c}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="incoming" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Facturas de compra</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El módulo de facturas de compra (también llamadas facturas de proveedor o facturas entrantes)
            te permite registrar las facturas que recibes de tus proveedores.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Ve a Facturas → Facturas de compra</li>
            <li>• Registra manualmente o importa desde un XML de la DIAN</li>
            <li>• Asocia la factura a un proveedor (contacto)</li>
            <li>• Registra la fecha de vencimiento para control de pagos</li>
            <li>• Marca como pagada cuando realices el pago</li>
          </ul>
        </section>

        <section id="credit-notes" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Notas crédito</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Una nota crédito anula total o parcialmente una factura previamente emitida. En Colombia,
            también deben enviarse electrónicamente a la DIAN.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Crear nota crédito</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a Facturas → Notas crédito → Nueva nota crédito</li>
            <li>2. Selecciona la factura original a la que aplica</li>
            <li>3. Indica el concepto (devolución de mercancía, descuento, anulación)</li>
            <li>4. Ajusta los ítems y montos si es una anulación parcial</li>
            <li>5. Emite la nota crédito (se envía automáticamente a la DIAN)</li>
          </ol>
          <Callout type="danger">
            Las notas crédito son documentos legales. No puedes modificar ni eliminar una nota
            crédito una vez emitida. Para corregir errores, emite una nueva nota débito o crédito.
          </Callout>
        </section>

        <section id="purchases" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Compras</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El módulo de Compras gestiona las órdenes de compra a proveedores:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Crea órdenes de compra para tus proveedores</li>
            <li>• Importa compras masivamente desde Excel/CSV</li>
            <li>• Asocia compras a proyectos o centros de costo</li>
            <li>• Genera reportes de compras por proveedor y período</li>
          </ul>
        </section>

        <DocNav
          prev={{ href: "/docs/quotes", title: "Cotizaciones" }}
          next={{ href: "/docs/products", title: "Productos" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
