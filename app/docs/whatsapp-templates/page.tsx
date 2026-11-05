import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Templates WhatsApp" };

const toc = [
  { id: "overview", label: "¿Qué son los templates?" },
  { id: "create", label: "Crear template" },
  { id: "variables", label: "Variables y parámetros" },
  { id: "categories", label: "Categorías de templates" },
  { id: "approval", label: "Proceso de aprobación" },
  { id: "mass-send", label: "Envío masivo" },
  { id: "limits", label: "Límites de mensajes de Meta" },
  { id: "tips", label: "Consejos de redacción" },
  { id: "lines", label: "Plantillas por línea" },
  { id: "api", label: "Crear por API o MCP" },
];

export default function WhatsAppTemplatesPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Templates WhatsApp</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Los templates (plantillas) de WhatsApp son mensajes preaprobados por Meta que permiten
          iniciar conversaciones proactivas o enviar mensajes masivos a contactos.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>¿Qué son los templates?</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Según las políticas de WhatsApp Business API, solo puedes enviar mensajes libres a
            un contacto dentro de las primeras 24 horas después de su último mensaje. Para
            contactarlos fuera de esta ventana, debes usar un template aprobado por Meta.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg border" style={{ backgroundColor: "rgba(34,197,94,0.08)", borderColor: "#22c55e" }}>
              <p className="font-semibold text-sm mb-2" style={{ color: "#16a34a" }}>✓ Templates permiten:</p>
              <ul className="space-y-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <li>• Iniciar conversaciones (outbound)</li>
                <li>• Envíos masivos a listas</li>
                <li>• Recordatorios y notificaciones</li>
                <li>• Retomar conversaciones cerradas</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border" style={{ backgroundColor: "rgba(239,68,68,0.08)", borderColor: "#ef4444" }}>
              <p className="font-semibold text-sm mb-2" style={{ color: "#dc2626" }}>✗ Templates NO son para:</p>
              <ul className="space-y-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <li>• Publicidad engañosa</li>
                <li>• Mensajes spam o no solicitados</li>
                <li>• Contenido prohibido por Meta</li>
                <li>• Mensajes dentro de la ventana 24h</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear template</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para crear un template en FusionCRM:
          </p>
          <ol className="space-y-3 mb-6">
            {[
              { n: "1", t: "Ve a Comunicación → Plantillas de WhatsApp", d: "En el menú superior." },
              { n: "2", t: "Pulsa \"Nueva Plantilla\"", d: "También puedes crearla desde el formulario de una campaña de WhatsApp masivo, con el botón \"Nueva plantilla\"." },
              { n: "3", t: "Elige la categoría", d: "Marketing o Utilidad. Las plantillas de autenticación (códigos de verificación) no se crean desde aquí." },
              { n: "4", t: "Selecciona el idioma", d: "Español (es, España o México), inglés (en o EE. UU.) o portugués de Brasil. Puedes tener la misma plantilla en varios idiomas." },
              { n: "5", t: "Escribe el contenido", d: "Redacta el cuerpo del mensaje. Usa {{1}}, {{2}} para las partes que cambian en cada envío." },
              { n: "6", t: "Agrega cabecera, pie y botones (opcional)", d: "La cabecera puede ser texto, imagen (JPG o PNG hasta 5 MB), video (MP4 hasta 16 MB), documento PDF (hasta 25 MB desde aquí) o ubicación. Puedes sumar hasta 10 botones: respuesta rápida, enlace, llamada o copiar código." },
              { n: "7", t: "Revisa la vista previa y envía para aprobación", d: "La vista previa cambia mientras escribes. Meta suele aprobar en unos minutos y hasta 24 horas." },
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
          <div className="rounded-lg p-4 border mb-4" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>Ejemplo de template:</p>
            <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: "var(--code-bg)", borderLeft: "3px solid #25D366" }}>
              <p style={{ color: "var(--foreground)" }}>
                Hola <span style={{ color: "#d1345b" }}>{"{{1}}"}</span>, te escribimos de{" "}
                <span style={{ color: "#d1345b" }}>{"{{2}}"}</span> para recordarte tu cita del día{" "}
                <span style={{ color: "#d1345b" }}>{"{{3}}"}</span> a las{" "}
                <span style={{ color: "#d1345b" }}>{"{{4}}"}</span>. ¿Confirmas tu asistencia?
              </p>
            </div>
          </div>
        </section>

        <section id="variables" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Variables y parámetros</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las variables se definen con la notación <code style={{ color: "#d1345b" }}>{"{{número}}"}</code> y
            se reemplazan con valores reales al enviar el mensaje. Ningún número tiene un valor fijo: de
            dónde sale cada uno depende de cómo envíes la plantilla.
          </p>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Cómo se llenan las variables</div>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Dónde envías</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Cómo se llenan</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Ejemplo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Desde un chat", "{{1}} se llena con el nombre del contacto (puedes cambiarlo); las demás las escribes tú.", "Juan"],
                  ["En una campaña", "Para cada variable eliges un campo del contacto (Nombre, Apellido, Empresa, Correo, Celular, Teléfono o Ciudad) o un texto fijo, y un valor por si el contacto no tiene ese dato.", "Empresa → \"Mi Empresa S.A.\""],
                ].map(([v, a, e]) => (
                  <tr key={v}>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{v}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{a}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="categories" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Categorías de templates</h2>
          <div className="space-y-4">
            {[
              { cat: "Marketing", color: "#f59e0b", desc: "Promociones, ofertas, anuncios de nuevos productos, contenido de valor.", examples: "\"¡Nueva colección disponible! Descuento del 20% hasta el viernes.\"" },
              { cat: "Utilidad", color: "#3b82f6", desc: "Confirmaciones, actualizaciones de estado, recordatorios, información transaccional.", examples: "\"Tu pedido #1234 ha sido despachado. Seguimiento: ...\"" },
              { cat: "Autenticación", color: "#8b5cf6", desc: "Códigos de verificación y confirmación de identidad. Meta arma estas plantillas con un formato fijo, así que no se crean desde la pantalla del CRM.", examples: "\"Tu código de verificación es 847291. Válido por 10 minutos.\"" },
            ].map((c) => (
              <div key={c.cat} className="p-4 rounded-lg border" style={{ borderColor: c.color, backgroundColor: `${c.color}10` }}>
                <p className="font-bold mb-1" style={{ color: c.color }}>{c.cat}</p>
                <p className="text-sm mb-2" style={{ color: "var(--muted-foreground)" }}>{c.desc}</p>
                <p className="text-xs italic" style={{ color: "var(--foreground)" }}>Ejemplo: {c.examples}</p>
              </div>
            ))}
          </div>
          <Callout type="warning">
            Categorizar incorrectamente el template puede resultar en rechazo por parte de Meta.
            Los templates de Marketing tienen mayor costo por mensaje enviado que los de Utilidad.
          </Callout>
        </section>

        <section id="approval" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Proceso de aprobación</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Meta revisa todos los templates antes de aprobarlos. Los posibles estados son:
          </p>
          <div className="space-y-2 mb-4">
            {[
              { status: "Pendiente", color: "#f59e0b", desc: "En revisión por Meta (suele tardar de unos minutos a 24 horas)." },
              { status: "Aprobada", color: "#22c55e", desc: "Lista para usar." },
              { status: "Rechazada", color: "#ef4444", desc: "Meta no la aceptó. Crea una nueva con el texto corregido." },
              { status: "Pausada", color: "#6b7280", desc: "Meta la frenó temporalmente por baja calidad." },
              { status: "Deshabilitada", color: "#6b7280", desc: "Meta la desactivó y ya no se puede enviar." },
              { status: "En apelación", color: "#f97316", desc: "Pediste a Meta revisar de nuevo un rechazo." },
            ].map((s) => (
              <div key={s.status} className="flex items-center gap-3 p-3 rounded border" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs font-bold px-2 py-1 rounded font-mono" style={{ backgroundColor: s.color, color: "white" }}>{s.status}</span>
                <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.desc}</span>
              </div>
            ))}
          </div>
          <Callout type="tip">
            Las plantillas no se editan desde el CRM: en la lista solo tienes Vista previa y Eliminar.
            Si Meta rechaza una, crea otra con el texto corregido. El motivo del rechazo no aparece en la
            pantalla de plantillas: pídeselo a tu IA por <a href="/docs/mcp" style={{ color: "#d1345b" }}>MCP</a> o
            míralo en el WhatsApp Manager de Meta.
          </Callout>
        </section>

        <section id="mass-send" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Envío masivo</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para enviar una plantilla a muchos contactos a la vez, usa
            <strong style={{ color: "var(--foreground)" }}> Comunicación → WhatsApp Masivo</strong>.
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Pulsa "Nueva Campaña" y ponle nombre</li>
            <li>2. Elige la plantilla aprobada</li>
            <li>3. Define de dónde sale cada variable</li>
            <li>4. Elige una lista de contactos (estática o dinámica)</li>
            <li>5. Guárdala con "Guardar como borrador" o "Programar envío"</li>
            <li>6. Para enviarla ya, usa "Enviar ahora" en la lista de campañas</li>
          </ol>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El paso a paso completo está en <a href="/docs/mass-campaigns#whatsapp" style={{ color: "#d1345b" }}>Campañas masivas</a>.
          </p>
          <Callout type="warning">
            Meta limita cuántas personas distintas puedes contactar por plantilla cada día. Antes de
            una campaña grande revisa tu nivel actual: mira <a href="#limits" style={{ color: "#d1345b" }}>Límites de mensajes de Meta</a>.
          </Callout>
        </section>

        <section id="limits" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Límites de mensajes de Meta</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cuando <strong style={{ color: "var(--foreground)" }}>tú inicias</strong> la conversación (enviando una plantilla),
            Meta cuenta cuántos clientes <strong style={{ color: "var(--foreground)" }}>distintos</strong> contactas en un período
            continuo de 24 horas. Ese tope es tu <strong style={{ color: "var(--foreground)" }}>límite de mensajes</strong> y
            funciona por niveles: empiezas abajo y vas desbloqueando el siguiente a medida que demuestras que envías
            mensajes que la gente sí quiere recibir.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              { tier: "250", desc: "Punto de partida" },
              { tier: "2.000", desc: "Primer nivel desbloqueado" },
              { tier: "10.000", desc: "" },
              { tier: "100.000", desc: "" },
              { tier: "Ilimitado", desc: "Nivel máximo" },
            ].map((n) => (
              <div key={n.tier} className="p-3 rounded-lg border text-center" style={{ borderColor: "var(--border)" }}>
                <p className="font-bold text-lg" style={{ color: "var(--foreground)" }}>{n.tier}</p>
                <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>{n.desc || "clientes / 24 h"}</p>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Qué cuenta y qué no</h3>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Cuenta:</strong> cada cliente distinto al que le envías una plantilla para abrir conversación. Si le escribes 3 veces al mismo cliente el mismo día, cuenta como 1.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>No cuenta:</strong> responder a un cliente que te escribió primero, mientras esté abierta la ventana de 24 horas desde su último mensaje.</li>
            <li>• El límite es de tu cuenta de WhatsApp Business ante Meta: si tienes varias líneas, revisa en Meta cómo se reparte en tu caso.</li>
          </ul>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Cómo subir de nivel</h3>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Meta te pide iniciar <strong style={{ color: "var(--foreground)" }}>conversaciones de calidad</strong> con un número mínimo de clientes únicos en un período continuo de 7 días. Por ejemplo, estando en 2.000, el requisito para pasar a 10.000 es iniciar conversaciones con 1.000 clientes únicos en 7 días.</li>
            <li>• Cuando cumples el requisito, el nuevo límite puede tardar hasta <strong style={{ color: "var(--foreground)" }}>24 horas</strong> en aplicarse.</li>
            <li>• &quot;Calidad&quot; quiere decir que la gente no te bloquea ni te reporta. Si muchos lo hacen, la calificación de calidad de tu número baja y Meta puede frenar tu subida o bajarte de nivel.</li>
          </ul>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Dónde ver tu nivel</h3>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En el <strong style={{ color: "var(--foreground)" }}>Administrador de WhatsApp de Meta</strong> (business.facebook.com), sección
            <strong style={{ color: "var(--foreground)" }}> Límites de mensajes</strong>, ves tu nivel actual, el requisito exacto para
            el siguiente y cuántos clientes únicos llevas en los últimos 7 días. FusionCRM no muestra este dato: la fuente oficial es Meta.
          </p>
          <Callout type="tip">
            Para crecer sin sustos: envía primero a los contactos que más probablemente respondan (clientes recientes, gente que ya te
            escribió), divide las campañas grandes en varios días y deja que cada envío se haga dentro de tu límite actual.
          </Callout>
        </section>

        <section id="tips" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Consejos de redacción</h2>
          <div className="space-y-3">
            {[
              "Sé conciso: Los mejores templates tienen 2-3 oraciones. El usuario no leerá textos largos.",
              "Personaliza con variables: Usar el nombre del destinatario aumenta las tasas de respuesta.",
              "Un CTA claro: Termina siempre con una acción específica (\"Responde SÍ para confirmar\").",
              "Evita mayúsculas excesivas y signos de exclamación repetidos: Meta los considera spam.",
              "No incluyas URLs acortadas ni números de teléfono externos: Son causas comunes de rechazo.",
              "Prueba antes de enviar masivo: Envíate el template a ti mismo para verificar que las variables se ven bien.",
            ].map((tip, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg" style={{ backgroundColor: "var(--muted)", border: "1px solid var(--border)" }}>
                <span className="text-lg">💡</span>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="lines" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Plantillas por línea</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las plantillas viven en la cuenta de WhatsApp Business (WABA) de cada número. Si tu
            organización tiene varias <a href="/docs/whatsapp-lines" style={{ color: "#d1345b" }}>líneas de WhatsApp</a>,
            cada una tiene sus propias plantillas: en el módulo de Templates aparece un selector de
            línea junto al buscador, y al crear una plantilla la creas en la línea elegida.
          </p>
          <Callout type="warning">
            Una plantilla aprobada en la línea "Ventas" no existe en la línea "Soporte". Si una
            campaña o un envío va a salir por una línea, la plantilla tiene que estar aprobada en esa
            misma línea. El preflight de las campañas te lo avisa antes de enviar.
          </Callout>
        </section>

        <section id="api" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear por API o MCP</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Todo lo que haces en la pantalla de Templates también se puede hacer por la{" "}
            <a href="/docs/api" style={{ color: "#d1345b" }}>API REST</a> (permiso{" "}
            <code style={{ color: "#d1345b" }}>whatsapp:send</code>) o pidiéndoselo a tu IA por{" "}
            <a href="/docs/mcp" style={{ color: "#d1345b" }}>MCP</a> (planes Pro y Unlimited):
          </p>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Qué</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>API REST</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>MCP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Listar las plantillas de una línea", "GET /api/whatsapp/templates?lineId=", "list_whatsapp_templates"],
                  ["Crear una plantilla en Meta", "POST /api/whatsapp/templates", "create_whatsapp_template"],
                  ["Subir imagen, video o PDF de cabecera", "POST /api/whatsapp/templates/header-media (archivo o { mediaUrl })", "upload_whatsapp_template_media"],
                  ["Consultar estado y motivo de rechazo", "GET /api/whatsapp/templates/{name}", "get_whatsapp_template"],
                  ["Borrar (todos los idiomas, irreversible)", "DELETE /api/whatsapp/templates/{name}", "delete_whatsapp_template"],
                ].map(([k, a, m]) => (
                  <tr key={k}>
                    <td className="p-3 border-b align-top" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{k}</td>
                    <td className="p-3 border-b align-top font-mono text-xs" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{a}</td>
                    <td className="p-3 border-b align-top font-mono text-xs" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Qué opciones admite al crear</h3>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            El cuerpo "simple" cubre todas las opciones de Meta sin armar el JSON de componentes a mano;
            si prefieres, puedes mandar los <code style={{ color: "#d1345b" }}>components</code> de Meta tal cual.
            Antes de llamar a Meta el CRM valida límites y devuelve un 400 con el detalle.
          </p>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Nombre, idioma y categoría", "Nombre en minúsculas, dígitos y guion bajo. MARKETING o UTILITY (AUTHENTICATION solo con components de Meta)."],
                  ["Variables posicionales", "{{1}}, {{2}}… consecutivas, con un ejemplo por variable. El texto no puede empezar ni terminar con una variable."],
                  ["Variables con nombre", "{{nombre}}, {{pedido}}… con su ejemplo. No se mezclan con posicionales en la misma plantilla."],
                  ["Cabecera", "Texto (máx. 60 caracteres, una variable), imagen (JPG/PNG ≤ 5 MB), video (MP4 ≤ 16 MB), documento (PDF ≤ 25 MB si subes el archivo, ≤ 100 MB si pasas mediaUrl) o ubicación."],
                  ["Cuerpo y pie", "Cuerpo obligatorio (≤ 1024). Pie opcional (≤ 60) sin variables."],
                  ["Botones (hasta 10)", "Respuesta rápida (≤ 25 caracteres), URL (máx. 2, con una variable al final), llamada (máx. 1), copiar código (máx. 1)."],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="p-3 border-b font-medium whitespace-nowrap align-top" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{k}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg p-4 border mb-4" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>Ejemplo (cuerpo simple):</p>
            <pre className="p-3 rounded-lg text-xs overflow-x-auto" style={{ backgroundColor: "var(--code-bg)", color: "var(--foreground)" }}>{`POST /api/whatsapp/templates
{
  "lineId": "6900…",
  "name": "pedido_despachado",
  "language": "es",
  "category": "UTILITY",
  "header": { "format": "TEXT", "text": "Pedido {{numero}}", "example": "1234" },
  "body": {
    "text": "Hola {{nombre}}, tu pedido ya salió. Guía: {{guia}}.",
    "examples": { "nombre": "Ana", "guia": "ABC123" }
  },
  "footer": { "text": "Manillas de Control" },
  "buttons": [
    { "type": "URL", "text": "Rastrear", "url": "https://rastreo.com/{{1}}", "urlExample": "ABC123" },
    { "type": "QUICK_REPLY", "text": "Tengo una duda" }
  ]
}`}</pre>
          </div>
          <Callout type="tip">
            Con el MCP basta con pedirlo: "crea en la línea Ventas una plantilla de utilidad que avise
            que el pedido salió, con botón para rastrear". La IA usa create_whatsapp_template y luego
            puedes preguntarle el estado de aprobación.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/whatsapp-lines", title: "Líneas de WhatsApp" }}
          next={{ href: "/docs/email", title: "Correo" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
