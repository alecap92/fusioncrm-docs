import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Alta en la DIAN y documento soporte",
  description:
    "Da de alta tu empresa en la DIAN para facturar electrónicamente desde el CRM y habilita el documento soporte con su set de pruebas, paso a paso.",
  keywords: ["habilitación DIAN", "set de pruebas DIAN", "TestSetId", "documento soporte", "facturación electrónica", "certificado digital", "resolución de facturación"],
  alternates: { canonical: "/docs/alta-dian" },
  openGraph: {
    title: "Alta en la DIAN y documento soporte",
    description:
      "Da de alta tu empresa en la DIAN para facturar electrónicamente desde el CRM y habilita el documento soporte con su set de pruebas, paso a paso.",
    url: "/docs/alta-dian",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "Qué vas a hacer" },
  { id: "asistente", label: "Asistente de alta DIAN" },
  { id: "pasos", label: "Pasos del asistente", depth: 3 },
  { id: "crear", label: "Crear la empresa", depth: 3 },
  { id: "documento-soporte", label: "Habilitar documento soporte" },
  { id: "portal", label: "En el portal de la DIAN", depth: 3 },
  { id: "fusioncrm", label: "En FusionCRM", depth: 3 },
  { id: "produccion", label: "Sincronizar a producción", depth: 3 },
  { id: "seguridad", label: "PIN y contraseña" },
];

const fg = { color: "var(--foreground)" };
const muted = { color: "var(--muted-foreground)" };
const link = { color: "#d1345b" };

function Steps({ items }: { items: { t: string; d: React.ReactNode }[] }) {
  return (
    <ol className="space-y-3 mb-6">
      {items.map((s, i) => (
        <li key={s.t} className="flex gap-3">
          <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#d1345b" }}>{i + 1}</span>
          <div>
            <p className="font-medium text-sm" style={fg}>{s.t}</p>
            <div className="text-sm" style={muted}>{s.d}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function AltaDianPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={fg}>Alta en la DIAN y documento soporte</h1>
        <p className="text-lg mb-8" style={muted}>
          Cómo dejar tu empresa lista para facturar electrónicamente desde FusionCRM y cómo habilitar
          el documento soporte ante la DIAN.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Qué vas a hacer</h2>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• <strong style={fg}>Si tu empresa aún no factura electrónicamente</strong> con FusionCRM: usa el <a href="#asistente" style={link}>asistente de alta DIAN</a>. Te pide los datos del RUT, el certificado, pasa el set de pruebas y trae la resolución.</li>
            <li>• <strong style={fg}>Si ya facturas, pero no has habilitado el documento soporte</strong>: sigue <a href="#documento-soporte" style={link}>Habilitar documento soporte</a>.</li>
            <li>• Para cambiar después cualquier dato, ve a la <a href="/docs/invoices#config" style={link}>configuración DIAN</a>.</li>
          </ul>
          <Callout type="note" title="Quién puede hacerlo">
            Solo el propietario de la cuenta puede dar de alta la empresa y habilitar el documento
            soporte. El contador ve el asistente en modo de solo lectura.
          </Callout>
        </section>

        <section id="asistente" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Asistente de alta DIAN</h2>
          <p className="mb-4" style={muted}>
            En <strong style={fg}>Ajustes → Facturación → Facturación electrónica</strong>, si tu empresa todavía
            no factura, aparece <strong style={fg}>Dar de alta tu empresa en la DIAN</strong>. El asistente va por
            pasos y guarda tu progreso: puedes cerrarlo y volver después para seguir donde quedaste.
          </p>
          <p className="mb-4" style={muted}>Antes de empezar, ten a mano:</p>
          <ul className="space-y-1 pl-4 mb-6" style={muted}>
            <li>• El RUT actualizado de la empresa.</li>
            <li>• El certificado digital en archivo <strong style={fg}>.p12</strong> o <strong style={fg}>.pfx</strong> y su contraseña.</li>
            <li>• Acceso al portal de habilitación de la DIAN, para copiar el SoftwareID, el PIN y el TestSetId.</li>
          </ul>

          <h3 id="pasos" className="text-lg font-semibold mb-3" style={fg}>Pasos del asistente</h3>
          <Steps
            items={[
              { t: "Antes de empezar", d: "Resumen de lo que vas a necesitar." },
              { t: "Empresa", d: "Los datos tal como aparecen en el RUT. El asistente te indica de qué casilla sale cada dato (casillas 5, 6, 24, 35, 39 a 44 y 53)." },
              { t: "Certificado", d: "Sube el archivo .p12 o .pfx y escribe su contraseña." },
              {
                t: "Set de pruebas de factura electrónica",
                d: (
                  <>
                    Copia del portal de habilitación de la DIAN el <strong style={fg}>SoftwareID</strong>, el{" "}
                    <strong style={fg}>PIN</strong> y el <strong style={fg}>TestSetId</strong>. Con{" "}
                    <strong style={fg}>Probar envío rápido</strong> confirmas que la conexión funciona; luego pulsa{" "}
                    <strong style={fg}>Enviar set de pruebas</strong>.
                  </>
                ),
              },
              { t: "Set de documento soporte (opcional)", d: "Si también vas a emitir documentos soporte, puedes pasar su set de pruebas aquí. Si lo saltas, lo haces después desde Habilitar documento soporte." },
              {
                t: "Resolución",
                d: (
                  <>
                    Pulsa <strong style={fg}>Traer de la DIAN</strong>. El prefijo, el rango de numeración y las
                    fechas de vigencia se traen tal como están registrados en la DIAN: no se escriben a mano.
                  </>
                ),
              },
              { t: "Correo de envío (opcional)", d: "Puedes saltarlo: sin configurarlo, tus facturas salen solas desde el correo de Fusion (facturacion@mail.fusioncol.com) con el nombre de tu empresa, y las respuestas llegan al correo de tu empresa. Si prefieres que salgan desde tu propio correo, pon aquí los datos SMTP de tu cuenta." },
              { t: "Revisión", d: "Revisa el resumen y pulsa «Crear empresa»." },
            ]}
          />

          <h3 id="crear" className="text-lg font-semibold mb-3" style={fg}>Crear la empresa</h3>
          <p className="mb-4" style={muted}>
            Al pulsar <strong style={fg}>Crear empresa</strong> ves el avance paso a paso. Si algún paso falla,
            el asistente te muestra cuál y te deja <strong style={fg}>reintentar desde ese paso</strong>, sin
            repetir lo que ya salió bien. Al terminar, la empresa queda en uno de estos estados:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• <strong style={fg}>Lista para facturar</strong>: ya puedes <a href="/docs/invoices#create" style={link}>crear tu primera factura</a>.</li>
            <li>• <strong style={fg}>Pendiente de activación</strong>: el alta quedó hecha, pero falta que se complete la activación antes de emitir.</li>
          </ul>
        </section>

        <section id="documento-soporte" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Habilitar documento soporte</h2>
          <p className="mb-4" style={muted}>
            Para emitir <a href="/docs/invoices#support-documents" style={link}>documentos soporte</a>, la DIAN exige
            superar antes su propio set de pruebas. Mientras no lo superes, FusionCRM no te deja emitirlos: la
            DIAN los rechazaría y se perdería el consecutivo.
          </p>
          <p className="mb-4" style={muted}>
            Si tu empresa ya factura pero el documento soporte no está habilitado, en{" "}
            <strong style={fg}>Ajustes → Facturación</strong> verás el aviso{" "}
            <strong style={fg}>«Tu documento soporte no está habilitado ante la DIAN»</strong> con el botón{" "}
            <strong style={fg}>Habilitar ahora</strong>. Si intentas emitir un documento soporte sin haberlo
            habilitado, el mensaje de error trae un botón que te lleva a ese mismo paso.
          </p>

          <h3 id="portal" className="text-lg font-semibold mb-3" style={fg}>1. En el portal de habilitación de la DIAN</h3>
          <p className="mb-4" style={muted}>
            Entra al portal de habilitación de la DIAN (catalogo-vpfe-hab.dian.gov.co o
            certificate-vpfe-hab.dian.gov.co) con tu empresa y haz esto para obtener el{" "}
            <strong style={fg}>TestSetId</strong>:
          </p>
          <Steps
            items={[
              { t: "Ve a Documentos Electrónicos", d: <>Elige <strong style={fg}>Documento para no obligados a facturar</strong>. No elijas «Documentos equivalentes»: es otro trámite.</> },
              { t: "Elige el modo de operación", d: <>En «Seleccione el modo de operación», elige <strong style={fg}>Software Propio</strong>.</> },
              { t: "Asocia el software", d: <>Pulsa <strong style={fg}>Asociar</strong>. Se usa el mismo software de tu factura electrónica: no te pide un ID ni un PIN nuevos.</> },
              { t: "Abre el set de pruebas", d: <>En la fila que aparece, pulsa el ícono del ojo y luego <strong style={fg}>Set de pruebas</strong>.</> },
              { t: "Copia el TestSetId", d: "Fíjate también en cuántos documentos pide el portal." },
            ]}
          />

          <h3 id="fusioncrm" className="text-lg font-semibold mb-3" style={fg}>2. En FusionCRM</h3>
          <Steps
            items={[
              { t: "Pulsa «Habilitar ahora»", d: "Desde el aviso en Ajustes → Facturación." },
              { t: "Pega el TestSetId", d: "El que copiaste del portal." },
              { t: "Indica los documentos requeridos", d: "El número que dice el portal. Si dice 0, escribe 1: así se verifica con un envío real." },
              { t: "Deja vacíos el SoftwareID y el PIN de documento soporte", d: "Se usan los de tu factura electrónica." },
              { t: "Pulsa «Enviar set de pruebas»", d: <>Cuando la DIAN lo acepte verás <strong style={fg}>Set de documento soporte superado</strong>.</> },
            ]}
          />
          <Callout type="note">
            Los documentos del set de pruebas van a la DIAN de habilitación: no cuentan como documentos
            reales y no usan tu numeración.
          </Callout>

          <h3 id="produccion" className="text-lg font-semibold mb-3 mt-6" style={fg}>3. Sincronizar a producción</h3>
          <p className="mb-4" style={muted}>
            Después de superar el set, vuelve al portal de habilitación de la DIAN y pulsa{" "}
            <strong style={fg}>Sincronizar a Producción</strong>. Sin este paso, la DIAN de producción no reconoce
            tu documento soporte y rechazaría los documentos reales.
          </p>
        </section>

        <section id="seguridad" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>PIN y contraseña del certificado</h2>
          <Callout type="danger" title="No los compartas">
            Nunca envíes el PIN del software ni la contraseña del certificado por chat o correo, ni
            siquiera al soporte de FusionCRM. Escríbelos solo en sus campos dentro de FusionCRM.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/invoices", title: "Facturación" }}
          next={{ href: "/docs/contabilidad", title: "Contabilidad" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
