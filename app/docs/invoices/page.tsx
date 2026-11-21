import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Factura electrónica DIAN en Colombia",
  description:
    "Emite factura electrónica DIAN desde el CRM: configuración, notas crédito y débito, compras, documentos soporte, retenciones, cuentas por cobrar e informes.",
  keywords: ["factura electrónica DIAN", "facturación electrónica Colombia", "notas crédito", "documento soporte", "retenciones", "cuentas por cobrar", "CUFE"],
  alternates: { canonical: "/docs/invoices" },
  openGraph: {
    title: "Factura electrónica DIAN en Colombia",
    description:
      "Emite factura electrónica DIAN desde el CRM: configuración, notas crédito y débito, compras, documentos soporte, retenciones, cuentas por cobrar e informes.",
    url: "/docs/invoices",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "Facturación electrónica" },
  { id: "config", label: "Configuración DIAN" },
  { id: "create", label: "Crear factura" },
  { id: "fields", label: "Campos de factura" },
  { id: "incoming", label: "Recepción de facturas" },
  { id: "credit-notes", label: "Notas crédito" },
  { id: "purchases", label: "Compras" },
  { id: "debit-notes", label: "Notas débito" },
  { id: "receivables", label: "Cuentas por cobrar" },
  { id: "customer-withholdings", label: "Retenciones del cliente" },
  { id: "support-documents", label: "Documentos soporte" },
  { id: "withholdings-config", label: "Retenciones a proveedores" },
  { id: "certificates", label: "Certificados de retención" },
  { id: "reports", label: "Informes" },
  { id: "verify-cufe", label: "Verificador CUFE" },
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
        <Callout type="note" title="Contabilidad">
          La facturación electrónica viene en <strong>Contabilidad</strong>: $79.900 al mes o $799.000 al año,
          con documentos ilimitados, certificado de firma digital incluido y habilitación ante la DIAN sin
          costo. La sumas a cualquier plan del CRM desde Configuración → Plan, o la contratas sola si solo
          necesitas facturar. Incluye facturas, notas crédito y débito, compras, recepción de
          facturas, documentos soporte, retenciones y cuentas por cobrar, y un usuario contador sin costo.
          El pago mensual tiene una permanencia mínima de 3 meses, sola o encima de un plan. Más detalle en{" "}
          <a href="/docs/settings#plan" style={{ color: "#d1345b" }}>Plan y facturación</a>.
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
            <li>• <a href="#debit-notes" style={{ color: "#d1345b" }}>Notas débito</a>, para cobrar un valor adicional sobre una factura emitida.</li>
            <li>• <a href="#receivables" style={{ color: "#d1345b" }}>Cuentas por cobrar</a>: lo que te deben tus clientes. Desde la lista de facturas usa «Registrar pago» para anotar pagos y abonos.</li>
            <li>• <a href="#support-documents" style={{ color: "#d1345b" }}>Documentos Soporte</a>, para compras a quien no factura electrónicamente.</li>
            <li>• <a href="#certificates" style={{ color: "#d1345b" }}>Certificados de retención</a> y las retenciones que te practicó cada cliente en sus facturas (se configuran en Configuración → Facturación → Retenciones).</li>
            <li>• <a href="#verify-cufe" style={{ color: "#d1345b" }}>Verificador CUFE</a>, para consultar una factura electrónica por su CUFE.</li>
            <li>• <a href="#reports" style={{ color: "#d1345b" }}>Informes</a> de facturación, visibles solo para el propietario y el contador.</li>
          </ul>
        </section>

        <section id="config" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Configuración DIAN</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Antes de emitir facturas electrónicas, tu empresa debe estar dada de alta ante la DIAN y
            configurada en{" "}
            <strong style={{ color: "var(--foreground)" }}>Ajustes → Facturación → Facturación electrónica</strong>.
            Si todavía no facturas electrónicamente, empieza por el{" "}
            <a href="/docs/alta-dian" style={{ color: "#d1345b" }}>asistente de alta en la DIAN</a>: te lleva paso a paso
            y deja esta configuración lista.
          </p>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La configuración está organizada en pestañas:
          </p>
          <div className="space-y-4 mb-6">
            {[
              { step: "Empresa", desc: "Datos de tu empresa que salen en la factura: NIT y DV, dirección, municipio, teléfono, correo, tipo de régimen y de responsabilidad. Aquí está también el botón «Sincronizar con la DIAN»." },
              { step: "Resolución y consecutivos", desc: "Resolución de facturación, prefijo, rango de numeración y vigencia." },
              { step: "Certificado", desc: "Tu certificado digital (.p12 o .pfx) y su contraseña. Con él se firman los documentos." },
              { step: "Software", desc: "ID del software y PIN de tu software de facturación electrónica." },
              { step: "Documento soporte", desc: "Configuración de los documentos soporte y su habilitación ante la DIAN." },
              { step: "Correo de envío", desc: "Opcional. Si no configuras nada, tus facturas salen solas desde el correo de Fusion con el nombre de tu empresa. Si pones tu propia cuenta (SMTP), salen desde ella." },
              { step: "Recepción de facturas", desc: "El buzón de donde se leen las facturas que te envían tus proveedores." },
              { step: "Plantilla del PDF", desc: "Cómo se ve el PDF de tus facturas." },
              { step: "Avanzado", desc: "Opciones técnicas. Solo la ve el propietario de la cuenta." },
            ].map((s) => (
              <div key={s.step} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{s.step}</p>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Cómo se guardan los cambios</h3>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Cada pestaña tiene su propio botón <strong style={{ color: "var(--foreground)" }}>Guardar</strong>: guarda solo lo de esa pestaña. No hay un botón para guardar todo a la vez, así que guarda antes de cambiar de pestaña.</li>
            <li>• Al guardar las pestañas <em>Resolución y consecutivos</em>, <em>Software</em>, <em>Certificado</em> y <em>Correo de envío</em>, los cambios también se envían al servicio de facturación.</li>
            <li>• En la pestaña <em>Empresa</em>, <strong style={{ color: "var(--foreground)" }}>Guardar</strong> solo actualiza los datos en FusionCRM. Para que la DIAN y el servicio de facturación los conozcan, pulsa además <strong style={{ color: "var(--foreground)" }}>Sincronizar con la DIAN</strong>.</li>
            <li>• Si otra persona (o tú mismo en otra pestaña del navegador) guardó cambios antes que tú, verás un aviso de que la configuración cambió. Recarga la página para ver la versión actual antes de volver a guardar.</li>
          </ul>
          <h3 id="correo-de-envio" className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Desde qué correo salen tus facturas</h3>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            No necesitas configurar un correo para que tus clientes reciban la factura. Hay dos caminos:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Sin configurar nada</strong>: la factura, las notas y el documento soporte salen solos desde <code>facturacion@mail.fusioncol.com</code>, con el nombre de tu empresa como remitente. Si tu cliente responde ese correo, la respuesta llega al correo de tu empresa (el de la pestaña <em>Empresa</em>).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Con tu propia cuenta</strong>: si en <em>Correo de envío</em> guardas los datos SMTP de tu correo, las facturas salen desde esa cuenta y con tu dominio. Después de guardar, pulsa <strong style={{ color: "var(--foreground)" }}>Probar conexión</strong> para confirmar que funciona.</li>
          </ul>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Esto aplica tanto al correo automático al emitir como a «Enviar por correo» desde el menú de la factura.
            Por el correo de Fusion puedes enviar hasta 200 correos al día; si necesitas más, configura tu propia cuenta.
            Si guardaste una cuenta propia y deja de funcionar (por ejemplo, cambiaste la contraseña), el envío falla
            hasta que la corrijas: no pasa solo al correo de Fusion.
          </p>
          <Callout type="danger" title="Datos sensibles">
            Nunca compartas el PIN del software ni la contraseña del certificado por chat o correo,
            ni siquiera con el soporte de FusionCRM. Escríbelos solo en sus campos dentro de FusionCRM.
          </Callout>
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

          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Traer de la DIAN lo que el correo no trajo</h3>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El correo no siempre trae todas las facturas: algunos proveedores las envían a otra dirección o
            no las envían. La DIAN sí las tiene todas a nombre de tu empresa. Si tus compras están en la
            facturación electrónica de FusionCRM, «Sincronizar» tiene un segundo paso que revisa esa lista
            y trae lo que falte.
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Entra a <strong style={{ color: "var(--foreground)" }}>catalogo-vpfe.dian.gov.co</strong>, elige <strong style={{ color: "var(--foreground)" }}>Empresa</strong> y escribe el tipo y número de documento del representante legal y el NIT de la empresa.</li>
            <li>2. La DIAN envía un correo con un enlace de acceso a la dirección registrada en el RUT. El enlace sirve durante 60 minutos.</li>
            <li>3. En ese correo, haz clic derecho sobre el botón de ingreso y elige «Copiar dirección del enlace».</li>
            <li>4. En Recepción de facturas pulsa <strong style={{ color: "var(--foreground)" }}>Sincronizar</strong>, pasa al paso <strong style={{ color: "var(--foreground)" }}>DIAN</strong>, pega el enlace, revisa las fechas y pulsa <strong style={{ color: "var(--foreground)" }}>Revisar en la DIAN</strong>.</li>
          </ol>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Al terminar ves cuántos documentos listó la DIAN, cuántos son nuevos y cuántos ya estaban. Los nuevos se descargan solos en unos minutos y aparecen en la pestaña Pendientes; puedes cerrar la ventana mientras tanto.</li>
            <li>• Los acuses de recibo de tus clientes aparecen en el conteo pero no se registran: no son compras.</li>
            <li>• Las fechas vienen puestas desde tu última revisión hasta hoy. Para ponerte al día con meses anteriores, cámbialas; cada revisión cubre máximo 366 días. Si un rango trae más de 400 documentos, la ventana te lo dice: repite con un rango más corto, por ejemplo mes por mes.</li>
            <li>• Si pasan más de 7 días sin revisar, la pantalla te lo recuerda.</li>
            <li>• Nunca se crea la compra sola: cada factura que llega queda pendiente hasta que pulsas «Crear compra».</li>
          </ul>
          <Callout type="info">
            El enlace de la DIAN se usa una sola vez para leer la lista y se descarta: FusionCRM no lo guarda.
            Si la DIAN responde con una verificación de seguridad, la revisión se detiene; espera un rato y
            pide un enlace nuevo. FusionCRM nunca entra a la DIAN con tu certificado ni resuelve verificaciones
            por ti.
          </Callout>

          <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--foreground)" }}>Pestañas y origen de cada factura</h3>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Pendientes:</strong> las que todavía no has registrado como compra. Es la vista con la que abre la pantalla.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Ya en compras:</strong> las que ya tienen su compra, con enlace a ella.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Todas:</strong> la lista completa.</li>
          </ul>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada fila dice por dónde llegó: <strong style={{ color: "var(--foreground)" }}>Correo</strong> (el buzón de facturas),{" "}
            <strong style={{ color: "var(--foreground)" }}>DIAN</strong> (la trajo una revisión en la DIAN),{" "}
            <strong style={{ color: "var(--foreground)" }}>CUFE</strong> (pegaste su CUFE),{" "}
            <strong style={{ color: "var(--foreground)" }}>XML</strong> (subiste el archivo),{" "}
            <strong style={{ color: "var(--foreground)" }}>Migración</strong> (venía de tu historial) o{" "}
            <strong style={{ color: "var(--foreground)" }}>Referencia</strong> (se trajo porque una nota crédito o débito la menciona).
            «Visto en la DIAN» significa que, además, una revisión confirmó que la DIAN la tiene.
          </p>
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
          <Callout type="note" title="Con la contabilidad activada">
            Una compra se paga con un comprobante de egreso, desde «Pagos y saldo» en su menú o con «Registrar el
            pago» en «Cambiar estado»: la opción «Pagada» ya no se marca a mano. Mientras la compra tenga pagos, su
            estado lo fijan ellos. Ver{" "}
            <a href="/docs/contabilidad#registrar-pago" style={{ color: "#d1345b" }}>Contabilidad → Pagar una compra</a>.
          </Callout>
        </section>

        <section id="debit-notes" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Notas débito</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La nota débito es lo contrario de la nota crédito: aumenta el valor de una factura ya
            emitida, por ejemplo para cobrar intereses o un gasto que no incluiste. También se envía a
            la DIAN.
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a <strong style={{ color: "var(--foreground)" }}>Facturación → Notas débito</strong> y haz clic en <strong style={{ color: "var(--foreground)" }}>Nueva</strong>.</li>
            <li>2. Selecciona la factura a la que aplica.</li>
            <li>3. Elige el motivo de la lista oficial de la DIAN: <em>Intereses</em>, <em>Gastos por cobrar</em> o <em>Cambio del valor</em>.</li>
            <li>4. Agrega las líneas con el valor adicional y emite. La numeración usa el prefijo de notas débito de tu configuración (por defecto ND).</li>
          </ol>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Igual que la nota crédito, una vez emitida no se puede modificar ni eliminar.
          </p>
        </section>

        <section id="receivables" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Cuentas por cobrar</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            <strong style={{ color: "var(--foreground)" }}>Facturación → Cuentas por cobrar</strong> es tu cartera: toda
            factura de venta emitida, de contado o a crédito, aparece aquí hasta que registres su pago.
            Las de contado vencen el mismo día en que se emiten.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Antigüedad:</strong> arriba ves cuánto te deben y en cuántas facturas, por tramos: <em>Al día</em>, <em>1 a 30 días</em>, <em>31 a 60 días</em>, <em>61 a 90 días</em> y <em>Más de 90 días</em> de vencidas. Los tramos vencidos con saldo se resaltan en rojo.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Filtro:</strong> <em>Con saldo</em> (por defecto), <em>Solo vencidas</em>, <em>Solo abonadas</em>, <em>Solo pendientes</em>, <em>Anuladas por nota crédito</em> o <em>Todas</em>.</li>
            <li>• La tabla muestra factura, cliente, si es de contado o crédito, fecha de vencimiento, total, saldo y estado. Clic en el número te lleva a la factura.</li>
          </ul>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Registrar un pago o un abono</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. En la fila de la factura, haz clic en <strong style={{ color: "var(--foreground)" }}>Registrar pago</strong> (también está en el menú de la factura en la lista de Facturas).</li>
            <li>2. Revisa el resumen: Total, Retenido, Neto a cobrar, Abonado y Saldo.</li>
            <li>3. Escribe la <strong style={{ color: "var(--foreground)" }}>Fecha</strong> y el <strong style={{ color: "var(--foreground)" }}>Valor</strong>, o usa <strong style={{ color: "var(--foreground)" }}>Registrar pago total</strong> para llenar el saldo completo. Elige la <strong style={{ color: "var(--foreground)" }}>Forma de pago</strong> y, si quieres, una referencia (comprobante, cuenta a la que entró) y una nota.</li>
            <li>4. Haz clic en <strong style={{ color: "var(--foreground)" }}>Guardar pago</strong>. Si el pago cubre el saldo, la factura sale de la cartera; si es parcial, queda como abonada.</li>
          </ol>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En la misma ventana ves los <strong style={{ color: "var(--foreground)" }}>Abonos registrados</strong>. Si
            anotaste uno mal, elimínalo con su botón y vuelve a registrarlo. Las facturas rechazadas,
            anuladas o en borrador no se pueden cobrar.
          </p>
          <Callout type="note" title="Con la contabilidad activada">
            «Registrar pago» pide además el banco o la caja y crea un recibo de caja. Un abono que nació de un
            recibo no se elimina aquí: se quita anulando el recibo. Ver{" "}
            <a href="/docs/contabilidad#registrar-pago" style={{ color: "#d1345b" }}>Contabilidad → Registrar pago</a>.
          </Callout>
        </section>

        <section id="customer-withholdings" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Retenciones que te aplica el cliente</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cuando un cliente te paga una factura descontando retenciones (ReteFuente, ReteIVA,
            ReteICA), anótalas para que la cartera cuadre con lo que realmente te consignó:
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. En <strong style={{ color: "var(--foreground)" }}>Facturación → Facturas</strong>, abre el menú de la factura y elige <strong style={{ color: "var(--foreground)" }}>Aplicar retenciones</strong>.</li>
            <li>2. Arriba ves la base sin IVA, el IVA y el total de la factura.</li>
            <li>3. Elige el <strong style={{ color: "var(--foreground)" }}>Concepto</strong> que aplicó el cliente y toca <strong style={{ color: "var(--foreground)" }}>Agregar</strong>. El monto se sugiere con el porcentaje del concepto y lo puedes ajustar al comprobante del cliente.</li>
            <li>4. Revisa el <strong style={{ color: "var(--foreground)" }}>Neto que consigna el cliente</strong> y toca <strong style={{ color: "var(--foreground)" }}>Aplicar</strong>.</li>
          </ol>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La columna <strong style={{ color: "var(--foreground)" }}>Retenciones</strong> de la lista muestra lo
            aplicado. Para corregir, usa <strong style={{ color: "var(--foreground)" }}>Editar retenciones</strong> en el
            mismo menú, o <strong style={{ color: "var(--foreground)" }}>Quitar retenciones</strong>. La ReteIVA no puede
            superar el IVA, y el total retenido no puede superar la base más el IVA.
          </p>
        </section>

        <section id="support-documents" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Documentos soporte</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cuando le compras a alguien que no está obligado a facturar (una persona natural, un
            pequeño proveedor), tú emites el documento soporte electrónico para poder llevar esa
            compra como costo o gasto. Se manejan en{" "}
            <strong style={{ color: "var(--foreground)" }}>Facturación → Documentos Soporte</strong>, y su resolución
            se configura en la pestaña <em>Documento soporte</em> de la <a href="#config" style={{ color: "#d1345b" }}>configuración DIAN</a>.
          </p>
          <Callout type="warning" title="Primero, habilítalo ante la DIAN">
            Si tu documento soporte no ha superado su set de pruebas ante la DIAN, FusionCRM no te deja
            emitirlo: la DIAN lo rechazaría y se perdería el consecutivo. En Ajustes → Facturación verás el
            aviso «Tu documento soporte no está habilitado ante la DIAN» con el botón «Habilitar ahora».
            Sigue los pasos en <a href="/docs/alta-dian#documento-soporte" style={{ color: "#d1345b" }}>Habilitar el documento soporte</a>.
          </Callout>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Haz clic en <strong style={{ color: "var(--foreground)" }}>Nuevo Documento Soporte</strong>.</li>
            <li>2. En <strong style={{ color: "var(--foreground)" }}>Proveedor</strong>, toca <strong style={{ color: "var(--foreground)" }}>Seleccionar</strong> y elige al proveedor de tus contactos. Si el contacto tiene empresa vinculada, puedes emitir a nombre de la persona o de la empresa.</li>
            <li>3. Revisa el encabezado (prefijo, número, resolución DIAN, tarifa ICA y actividad económica).</li>
            <li>4. Agrega las líneas con <strong style={{ color: "var(--foreground)" }}>Agregar línea</strong>: descripción, cantidad y valor unitario.</li>
            <li>5. Llena <strong style={{ color: "var(--foreground)" }}>Fechas y Pago</strong> (fecha, fecha de pago y método de pago) y, si quieres, el <strong style={{ color: "var(--foreground)" }}>Concepto</strong>: la línea del estado de resultados donde cae ese gasto (honorarios, arriendo…). El concepto también se puede poner después desde la lista.</li>
            <li>6. Haz clic en <strong style={{ color: "var(--foreground)" }}>Guardar</strong>: el documento se envía a la DIAN. Si la DIAN lo rechaza, te muestra el motivo.</li>
          </ol>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Desde el menú de cada documento puedes <strong style={{ color: "var(--foreground)" }}>Descargar PDF</strong>,{" "}
            <strong style={{ color: "var(--foreground)" }}>Descargar XML</strong> o <strong style={{ color: "var(--foreground)" }}>Enviar por correo</strong> al
            proveedor. Un documento ya validado por la DIAN no se puede eliminar.
          </p>

          <h3 id="pagar-documento-soporte" className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Pagar un documento soporte</h3>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Emitir el documento soporte <strong style={{ color: "var(--foreground)" }}>no lo paga</strong>. El documento le dice a la DIAN que
            hiciste la compra; el pago es otro paso. El <strong style={{ color: "var(--foreground)" }}>Método de pago</strong> que eliges al
            emitirlo (efectivo, transferencia…) es un dato del documento: no saca plata de ningún banco ni
            de la caja.
          </p>
          <Callout type="note" title="Con la contabilidad activada">
            Cuando la DIAN valida el documento, FusionCRM lo registra solo como una 
            <a href="#purchases" style={{ color: "#d1345b" }}>compra</a> a nombre de ese proveedor, con el mismo número. Desde ahí se
            paga con un comprobante de egreso, igual que cualquier factura de proveedor. El gasto se
            cuenta una sola vez. Ver 
            <a href="/docs/contabilidad#pagar-documento-soporte" style={{ color: "#d1345b" }}>Contabilidad → Pagar un documento soporte</a>.
          </Callout>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Con la contabilidad activada, la lista tiene la columna <strong style={{ color: "var(--foreground)" }}>Pago</strong>:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Falta el egreso:</strong> el documento está validado pero no has registrado su pago. En tus libros todavía le debes al proveedor. Haz clic en el aviso para registrarlo.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Pagado:</strong> su compra quedó pagada con un comprobante de egreso.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>—:</strong> no aplica (el documento está cancelado o rechazado, o es anterior a tus saldos iniciales).</li>
          </ul>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para pagarlo, abre el menú del documento y elige <strong style={{ color: "var(--foreground)" }}>Registrar pago</strong>, o haz clic
            en «Falta el egreso». Se abre «Pagos y saldo» de su compra. Si el documento es anterior a este
            cambio y todavía no tiene compra, primero se abre el formulario de la compra ya lleno: revísalo,
            haz clic en <strong style={{ color: "var(--foreground)" }}>Crear compra</strong> y enseguida se abre «Pagos y saldo».
          </p>
          <Callout type="warning" title="No lo pagues de otra forma: el gasto quedaría dos veces">
            No registres el pago con un egreso al concepto «Gasto», ni crees a mano una compra de tipo
            «Documento soporte con no obligados» para un documento que emitiste en FusionCRM. En los dos
            casos el gasto se cuenta dos veces: una por el documento y otra por lo que registraste.
          </Callout>
        </section>

        <section id="withholdings-config" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Configurar las retenciones a proveedores</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En <strong style={{ color: "var(--foreground)" }}>Configuración → Facturación → Retenciones</strong> defines
            las tarifas con las que FusionCRM calcula lo que le retienes a cada proveedor en tus{" "}
            <a href="#purchases" style={{ color: "#d1345b" }}>compras</a>. Conviene llenarla con tu contador.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Año gravable:</strong> la configuración es por año, porque la UVT y las tarifas cambian. Así el certificado de un año pasado se sigue generando con las tarifas de ese año.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Valor de la UVT:</strong> sin este dato ninguna compra calcula retenciones (a propósito: un cero se confundiría con «no había que retener»).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Ciudad:</strong> el municipio del ICA, que también sale en el certificado.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Qué retenciones practicas:</strong> activa ReteFuente, ReteIVA (solo si eres agente retenedor de IVA) y ReteICA (por mil, según el municipio).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Conceptos:</strong> cada concepto (ej. «Servicios generales») tiene su porcentaje y su base mínima en UVT. Agrega los tuyos con <strong style={{ color: "var(--foreground)" }}>Agregar concepto</strong>.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Excepciones por proveedor:</strong> los proveedores con un trato especial (autorretenedor, sin ICA, no responsable de IVA o un concepto fijo), identificados por NIT. Desde aquí los ves y los quitas.</li>
          </ul>
          <Callout type="warning" title="Tabla en borrador">
            Mientras la tabla del año esté en borrador, el cálculo de retenciones en lote no guarda
            nada. Apruébala con el interruptor cuando tu contador confirme las tarifas; ahí queda como
            «Tabla aprobada» y se puede aplicar a las compras del año.
          </Callout>
        </section>

        <section id="certificates" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Certificados de retención</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En <strong style={{ color: "var(--foreground)" }}>Facturación → Certificados de retención</strong> ves lo que
            le retuviste a cada proveedor durante el año, listo para expedir sus certificados (se
            entregan antes del 31 de marzo del año siguiente).
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Elige el <strong style={{ color: "var(--foreground)" }}>Año gravable</strong>.</li>
            <li>2. Arriba ves el Total retenido y su desglose en ReteFuente, ReteIVA y ReteICA. La tabla lo muestra por proveedor, con el número de compras.</li>
            <li>3. Busca al proveedor por nombre o NIT y haz clic en <strong style={{ color: "var(--foreground)" }}>Certificado</strong>: se descarga el PDF listo para enviarle.</li>
          </ol>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Desde una compra también puedes ir directo al certificado de su proveedor con{" "}
            <strong style={{ color: "var(--foreground)" }}>Certificado del proveedor</strong>.
          </p>
        </section>

        <section id="reports" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Informes de facturación</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            <strong style={{ color: "var(--foreground)" }}>Facturación → Informes</strong> es el cierre del periodo para
            tu contador: ventas, compras, IVA y documentos emitidos. Solo lo ven el propietario y el
            contador.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Periodo:</strong> Este mes, Mes pasado, Últimos 3 meses, Este año o Personalizado (Desde / Hasta).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Ventas netas:</strong> facturas menos notas crédito, más notas débito, con base e IVA.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Compras:</strong> facturas de proveedores y documentos soporte.</li>
            <li>• También ves los documentos del periodo (y si hubo rechazados), las retenciones, el recaudo del periodo, lo vencido de la cartera, los documentos por tipo y los clientes con más facturación.</li>
            <li>• El propietario ve además el <strong style={{ color: "var(--foreground)" }}>Estado de resultados</strong>: ingresos, costos y gastos por concepto, y el resultado del mes.</li>
          </ul>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para exportar, elige el <strong style={{ color: "var(--foreground)" }}>Informe a exportar</strong> y toca{" "}
            <strong style={{ color: "var(--foreground)" }}>Descargar Excel</strong>. Opciones: Resumen del periodo (todo),
            que trae el resumen contable y una hoja por tipo de documento; Facturas de venta; Notas
            crédito; Notas débito; Documentos soporte; Facturas de proveedores; y Estado de resultados
            (solo el propietario).
          </p>
        </section>

        <section id="verify-cufe" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Verificador CUFE</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Con <strong style={{ color: "var(--foreground)" }}>Facturación → Verificador CUFE</strong> le preguntas a la
            DIAN si una factura electrónica, nota crédito o nota débito es válida. Sirve para cualquier
            documento, no solo los tuyos: por ejemplo, para revisar la factura de un proveedor antes de
            pagarla.
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Pega el <strong style={{ color: "var(--foreground)" }}>CUFE o CUDE</strong> (96 caracteres, números y letras de la A a la F), o toca <strong style={{ color: "var(--foreground)" }}>Subir XML/ZIP</strong> y elige el archivo que te mandó el proveedor. El archivo se lee en tu navegador y solo se envía el CUFE.</li>
            <li>2. Haz clic en <strong style={{ color: "var(--foreground)" }}>Verificar en la DIAN</strong>.</li>
          </ol>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>El resultado te dice una de estas cosas:</p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Válida ante la DIAN</strong>, o <strong style={{ color: "var(--foreground)" }}>Válida, con notas crédito/débito</strong> que pueden cambiar su valor.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Rechazada por la DIAN</strong>: no tiene validez fiscal.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>La DIAN no la encuentra</strong>: revisa que el CUFE esté completo o pídele al emisor el documento correcto.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>En proceso en la DIAN</strong>: vuelve a consultar en unos minutos.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>No se pudo determinar</strong>: revisa el detalle o consúltala en el portal de la DIAN.</li>
          </ul>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            También ves el tipo de documento, la fecha de emisión, el emisor, el adquiriente, el total,
            su relación con tu empresa (<em>La emitiste tú</em>, <em>Es una compra tuya</em> o <em>De terceros</em>),
            sus notas crédito o débito y los eventos RADIAN (acuse de recibo, aceptación…). Los botones{" "}
            <strong style={{ color: "var(--foreground)" }}>Copiar CUFE</strong> y <strong style={{ color: "var(--foreground)" }}>Ver en el portal DIAN</strong> te
            ayudan a compartirla, y si el documento ya está en el CRM, te lleva a él.
          </p>
          <Callout type="tip">
            No tienes que copiar el CUFE a mano: en las listas de Facturas, Notas crédito y Recepción de
            facturas, el menú de cada documento tiene <strong>Verificar en la DIAN</strong>.
          </Callout>
          <Callout type="note">
            Para consultar la DIAN tu organización necesita tener la facturación electrónica configurada.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/quotes", title: "Cotizaciones" }}
          next={{ href: "/docs/alta-dian", title: "Alta en la DIAN y documento soporte" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
