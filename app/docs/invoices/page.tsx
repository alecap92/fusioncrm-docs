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
  { id: "incoming", label: "Recepción de facturas" },
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
        <Callout type="note" title="Módulo adicional">
          La facturación electrónica no viene incluida en los planes: es un módulo que se contrata aparte y se activa
          para tu organización. Incluye facturas, notas crédito y débito, compras, recepción de
          facturas, documentos soporte y cuentas por cobrar. Si no ves el menú Facturación, pide su activación en{" "}
          <strong style={{ color: "#d1345b" }}>ventas@fusioncol.com</strong>. Más detalle en{" "}
          <a href="/docs/settings#plan" style={{ color: "#d1345b" }}>Plan, asientos y módulos</a>.
        </Callout>

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
              { title: "Recepción de facturas", desc: "Buzón de las facturas que te envían tus proveedores.", color: "#22c55e" },
            ].map((t) => (
              <div key={t.title} className="p-4 rounded-lg border text-center" style={{ borderColor: t.color, backgroundColor: `${t.color}10` }}>
                <p className="font-bold" style={{ color: t.color }}>{t.title}</p>
                <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>{t.desc}</p>
              </div>
            ))}
          </div>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            En el menú <strong style={{ color: "var(--foreground)" }}>Facturación</strong> también encuentras:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Notas débito</strong>, para cobrar un valor adicional sobre una factura emitida.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Cuentas por cobrar</strong>: lo que te deben tus clientes. Desde la lista de facturas usa «Registrar pago» para anotar pagos y abonos.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Documentos Soporte</strong>, para compras a quien no factura electrónicamente.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Certificados de retención</strong> y las retenciones que te practicó cada cliente en sus facturas (se configuran en Configuración → Facturación → Retenciones).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Verificador CUFE</strong>, para consultar una factura electrónica por su CUFE.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Informes</strong> de facturación, visibles solo para el propietario y el contador.</li>
          </ul>
        </section>

        <section id="config" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Configuración DIAN</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Antes de emitir facturas electrónicas, debes completar la configuración DIAN en{" "}
            <strong style={{ color: "var(--foreground)" }}>Configuración → Facturación → Facturación electrónica</strong>.
            Está organizada en pestañas; arriba ves el estado actual: <em>Producción</em> o <em>Desarrollo</em> (pruebas).
          </p>
          <div className="space-y-4 mb-6">
            {[
              { step: "Resolución", desc: "Número de resolución DIAN, prefijo (ej. FV), rango de numeración y vigencia." },
              { step: "Compañía", desc: "Datos de tu empresa que salen en la factura: NIT y DV, dirección, municipio, teléfono, correo, tipo de régimen y de responsabilidad." },
              { step: "Email y Placeholders", desc: "Plantilla del correo con el que se envían las facturas y textos que aparecen en el PDF." },
              { step: "Software", desc: "ID del Software y PIN de tu software de facturación electrónica." },
              { step: "Certificado", desc: "Sube tu certificado digital en formato .p12 y su contraseña. Con él se firman las facturas." },
              { step: "Token", desc: "Token de autenticación con la API de facturación electrónica." },
              { step: "Actions", desc: "«Crear empresa» y «Sincronizar numeración» con la DIAN." },
              { step: "Doc Soporte", desc: "Configuración de los documentos soporte." },
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
              { n: "1", t: "Ve a Facturación → Facturas → «Nueva Factura»", d: "O usa «Generar factura» desde una cotización aceptada." },
              { n: "2", t: "Selecciona el cliente", d: "El sistema precargará sus datos de identificación (NIT o cédula)." },
              { n: "3", t: "Configura fechas y condiciones", d: "Fecha de emisión, fecha de vencimiento, condición de pago (contado/crédito)." },
              { n: "4", t: "Agrega los ítems", d: "Productos o servicios con código, descripción, cantidad, precio y IVA." },
              { n: "5", t: "Revisa el total", d: "Verifica subtotal, IVA desglosado, retenciones si aplican y total." },
              { n: "6", t: "Revisa el PDF (opcional)", d: "«Ver PDF antes de emitir» genera un PDF marcado como BORRADOR sin gastar el consecutivo." },
              { n: "7", t: "Emite la factura", d: "Pulsa «Guardar» y confirma con «Emitir factura»: se firma y envía a la DIAN. El proceso toma unos segundos." },
              { n: "8", t: "Envía al cliente", d: "Desde el menú de la factura en la lista puedes «Enviar por correo», «Enviar por WhatsApp» o descargar el PDF, el XML o el ZIP." },
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
            <strong style={{ color: "var(--foreground)" }}>Facturación → Recepción de facturas</strong> es el
            buzón donde llegan las facturas electrónicas que te envían tus proveedores.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Llegan solas desde el correo de facturas que configures; pulsa «Sincronizar» para revisar el buzón en ese momento.</li>
            <li>• También puedes registrarlas tú con «Subir XML» (y, según tu configuración, pegando el CUFE).</li>
            <li>• Para que una factura cuente como gasto y se le calculen las retenciones, pulsa «Crear compra» en su fila, revisa los datos y confirma. Nada se crea solo.</li>
            <li>• El pago al proveedor se marca después en <a href="#purchases" style={{ color: "#d1345b" }}>Compras</a>.</li>
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
            <li>1. Ve a Facturación → Notas crédito → «Nueva»</li>
            <li>2. Selecciona la factura original a la que aplica</li>
            <li>3. Elige la «Razón de Devolución» (obligatoria), de la lista oficial de motivos de la DIAN</li>
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
            El módulo de Compras registra lo que le compras a tus proveedores y tus órdenes de compra:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Crea órdenes de compra para tus proveedores</li>
            <li>
              • Revisa las facturas mes a mes: la lista arranca en el mes actual, se cambia con las
              flechas y el botón &quot;Ver todos&quot; muestra el histórico completo
            </li>
            <li>
              • Ve el Bruto, las Retenciones y el Neto del mes (total menos retenciones, sin las
              facturas anuladas). El Neto no descuenta lo que ya pagaste: es lo comprado, no lo
              que debes
            </li>
            <li>• Registra un «Gasto sin documento» cuando no tienes factura del proveedor</li>
            <li>• Calcula y ajusta las retenciones de cada compra</li>
            <li>• Marca cada compra como Pendiente, Pagada o Cancelada (las órdenes de compra: Abierta, Facturada o Cancelada)</li>
            <li>• Importa compras masivamente desde Excel/CSV con «Importar»</li>
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
