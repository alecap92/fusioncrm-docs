import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Líneas de WhatsApp" };

const toc = [
  { id: "overview", label: "Qué es una línea" },
  { id: "connect", label: "Conectar y administrar líneas" },
  { id: "profile", label: "Perfil de negocio del número" },
  { id: "where", label: "Dónde se ve la línea" },
  { id: "routing", label: "Por cuál línea sale cada mensaje" },
  { id: "pipeline", label: "El pipeline de la línea" },
  { id: "api", label: "Líneas en la API y el MCP" },
  { id: "faq", label: "Preguntas frecuentes" },
];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--foreground)" }}>{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>{children}</p>
);
const B = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: "var(--foreground)" }}>{children}</strong>
);
const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ color: "#d1345b" }}>{children}</code>
);

export default function WhatsappLinesPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Líneas de WhatsApp</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Una organización puede conectar <B>varios números de WhatsApp</B> al mismo CRM: por ejemplo
          dos negocios que comparten un equipo, o un número de ventas y otro de soporte. Cada número
          es una <B>línea</B>, con su nombre, su color, sus plantillas y su propio pipeline.
        </p>

        <section id="overview" className="mb-10">
          <H2>Qué es una línea</H2>
          <P>
            Una línea es un número de WhatsApp Business conectado a tu organización. Cada línea tiene:
          </P>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Atributo</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Para qué sirve</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Nombre", "Cómo se ve en el CRM (\"Ventas\", \"Mayoristas\", \"Soporte\"…)."],
                  ["Color", "El punto que identifica sus conversaciones en el kanban y en el chat."],
                  ["Por defecto", "La línea por la que sale todo envío que no dice por cuál línea va. Hay exactamente una por organización."],
                  ["Asignación de conversaciones nuevas", "A qué asesor o agente IA llega cada conversación nueva que entra por esa línea. Un agente IA no toma los chats que tu equipo abre enviando una plantilla."],
                  ["Pipeline de la línea", "En qué pipeline de conversaciones nacen sus chats nuevos (vacío = el pipeline por defecto de la organización)."],
                  ["Plantillas", "Las de la cuenta de WhatsApp Business (WABA) de ese número. Cada línea tiene las suyas."],
                  ["Perfil de negocio", "Lo que el cliente ve al abrir el chat: foto, info, descripción, dirección, correo, sitios web y categoría. Se edita desde el CRM."],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="p-3 border-b font-medium whitespace-nowrap" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{k}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout type="note" title="Regla de oro">
            Un cliente que escribe a dos líneas tiene <strong>dos conversaciones</strong>, una por línea,
            cada una con su historial, su columna y su asesor. En el kanban verás dos tarjetas con el
            mismo nombre y distinto punto de color: no es un duplicado.
          </Callout>
        </section>

        <section id="connect" className="mb-10">
          <H2>Conectar y administrar líneas</H2>
          <P>
            Todo se hace en <B>Ajustes → WhatsApp</B> (categoría General). Solo el propietario de la
            organización puede conectar, editar, marcar por defecto, cambiar el perfil o desconectar
            líneas; el resto del equipo solo ve la tabla. La tabla muestra el estado de cada número,
            por ejemplo "Pendiente de conectar" o un aviso si su conexión con Meta necesita atención.
          </P>
          <H3>Conectar una línea</H3>
          <P>
            Pulsa <B>"Conectar línea"</B> (o <B>"Terminar conexión"</B> si dejaste una a medias). Se abre la
            ventana "Conectar línea de WhatsApp", donde eliges el método:
          </P>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <B>Automática (recomendada):</B> pulsa "Conectar con Facebook" y sigue los pasos de Meta. Se repite por cada número nuevo que quieras agregar.</li>
            <li>• <B>Manual (avanzada):</B> guardas el App ID, App Secret y Verify Token de una app de Meta propia. La línea queda <em>pendiente de conectar</em> y el botón "Conectar" la completa con el número. Solo puede haber una línea pendiente a la vez.</li>
          </ul>
          <H3>Editar, marcar por defecto y desconectar</H3>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <B>Perfil de WhatsApp (icono de persona):</B> la foto, la descripción y los datos que ven tus clientes. Ver <Link href="#profile" style={{ color: "#d1345b" }}>Perfil de negocio del número</Link>.</li>
            <li>• <B>Editar (lápiz):</B> nombre, color, a quién se asignan las conversaciones nuevas y el pipeline de la línea.</li>
            <li>• <B>Hacer por defecto (estrella):</B> cambia la línea de salida para los envíos que no eligen línea.</li>
            <li>• <B>Desconectar:</B> la línea por defecto no se puede desconectar mientras haya otras; primero marca otra como por defecto. Las conversaciones de una línea desconectada se conservan.</li>
            <li>• <B>Confirmaciones de lectura al cliente:</B> el switch de los chulos azules vive aquí y aplica a toda la organización.</li>
          </ul>
          <Callout type="tip">
            Con una sola línea nada cambia: el CRM se ve igual que siempre. Los selectores de línea
            solo aparecen cuando hay dos o más líneas conectadas y activas.
          </Callout>
        </section>

        <section id="profile" className="mb-10">
          <H2>Perfil de negocio del número</H2>
          <P>
            Cuando un cliente abre tu chat en WhatsApp ve el <B>perfil de negocio</B> del número: la foto,
            una frase corta ("info"), la descripción, la dirección, el correo, los sitios web y la
            categoría. Antes había que configurarlo en el WhatsApp Manager de Meta; ahora se hace desde
            el CRM, en <B>Ajustes → WhatsApp</B>, con el icono de persona de cada línea. Solo el
            propietario puede editarlo.
          </P>
          <H3>Qué puedes cambiar</H3>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Campo</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Detalle</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Foto de perfil", "JPG, PNG o WebP hasta 5 MB. El CRM la recorta al centro y la ajusta a 640×640, que es lo que pide WhatsApp. Se guarda en Meta apenas la eliges."],
                  ["Info", "Una frase bajo el nombre, hasta 139 caracteres (\"Respondemos de lunes a viernes, 8 a 6\"). WhatsApp no la deja en blanco."],
                  ["Descripción", "Qué vendes y para quién, hasta 512 caracteres. Junto con la foto, es lo primero que mira el cliente."],
                  ["Dirección y correo", "Opcionales. El correo debe ser válido."],
                  ["Sitios web", "Hasta 2, uno por línea. Si escribes \"www.tunegocio.com\" el CRM le agrega https://."],
                  ["Categoría", "La lista de categorías de Meta (comercio, servicios profesionales, restaurante, salud…)."],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="p-3 border-b font-medium whitespace-nowrap" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{k}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>
            A la izquierda del formulario hay una <B>vista previa</B> de cómo se ve el perfil en un
            teléfono; cambia mientras escribes. Los textos se guardan con "Guardar"; la foto, en el
            momento en que la eliges. Meta suele reflejar los cambios en unos minutos.
          </P>
          <H3>Lo que no se cambia desde el CRM</H3>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <B>El nombre visible:</B> lo aprueba Meta. El modal lo muestra en solo lectura con un enlace al WhatsApp Manager para pedir el cambio.</li>
            <li>• <B>La verificación del negocio y el chulo verde:</B> se gestionan en el Business Manager de Meta.</li>
          </ul>
          <Callout type="tip" title="Completa tu perfil">
            Apenas conectas una línea nueva, el CRM abre el perfil con el aviso "Completa tu perfil".
            Puedes cerrarlo con "Lo hago después" y volver cuando quieras desde el icono de persona.
            En la tabla de líneas, el chip <strong>Perfil incompleto</strong> te recuerda cuáles siguen
            sin foto o sin descripción.
          </Callout>
        </section>

        <section id="where" className="mb-10">
          <H2>Dónde se ve la línea</H2>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Pantalla</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Con varias líneas</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Kanban de conversaciones", "Punto de color y nombre de la línea en cada tarjeta, y el filtro \"Línea:\" en la barra superior para ver solo una."],
                  ["Cabecera del chat", "Chip con el nombre y el color de la línea por la que va esa conversación."],
                  ["Nueva conversación", "Selector \"Enviar desde\", preseleccionado en la línea por defecto."],
                  ["Plantillas de WhatsApp", "Selector de línea junto al buscador: cada línea tiene sus propias plantillas."],
                  ["Campañas masivas", "\"Enviar desde\" al crear la campaña; la línea se guarda con ella."],
                  ["Automatizaciones", "La acción \"Enviar WhatsApp\" responde por la línea de la conversación que disparó el flujo."],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="p-3 border-b font-medium whitespace-nowrap" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{k}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="routing" className="mb-10">
          <H2>Por cuál línea sale cada mensaje</H2>
          <P>El CRM decide la línea de salida en este orden:</P>
          <ol className="space-y-3 mb-4">
            {[
              { n: "1", t: "La línea elegida explícitamente", d: "\"Enviar desde\" en la app, o lineId en la API y el MCP." },
              { n: "2", t: "La línea de la conversación", d: "Responder en un chat siempre sale por la línea por la que entró ese chat." },
              { n: "3", t: "La última línea por la que habló el contacto", d: "Para envíos sueltos a un contacto sin conversación abierta." },
              { n: "4", t: "La línea por defecto", d: "Si nada de lo anterior aplica." },
            ].map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#25D366" }}>{s.n}</span>
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{s.t}</p>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="pipeline" className="mb-10">
          <H2>El pipeline de la línea</H2>
          <P>
            Si tu organización tiene varios <Link href="/docs/conversation-pipelines" style={{ color: "#d1345b" }}>pipelines de conversación</Link>,
            cada línea puede tener el suyo. <B>Todo chat nuevo de ese número nace en el pipeline de la
            línea</B>, en su primera columna: da igual si lo inició el cliente escribiendo, si lo inició
            un asesor con una plantilla, o si lo creó una campaña masiva. Si la línea no tiene pipeline,
            usa el pipeline por defecto de la organización.
          </P>
          <Callout type="note">
            Si el contacto ya tiene un chat abierto en esa línea, no se crea uno nuevo: el mensaje
            entra en el hilo existente y ese hilo se queda en el pipeline y la columna donde esté.
            Los chats de Messenger e Instagram siempre nacen en el pipeline por defecto.
          </Callout>
        </section>

        <section id="api" className="mb-10">
          <H2>Líneas en la API y el MCP</H2>
          <P>
            Sin <Code>lineId</Code> todo se comporta como antes: sale por la línea de la conversación o
            por la línea por defecto. Un <Code>lineId</Code> que no existe o que es de otra organización
            responde <Code>400</Code> o <Code>404</Code>, nunca filtra en silencio.
          </P>
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
                  ["Listar líneas (el id es el lineId)", "GET /api/whatsapp/lines", "list_whatsapp_lines"],
                  ["Enviar texto o plantilla por una línea", "lineId en POST /api/whatsapp/send y /send-template", "lineId en send_whatsapp_message y send_whatsapp_template"],
                  ["Crear una conversación en una línea", "lineId en POST /api/conversations", "lineId en create_conversation"],
                  ["Filtrar conversaciones por línea", "?lineId= en GET /api/conversations, /search y /find-by-phone; cada conversación trae lineId y lineName", "lineId en list_conversations, search_conversations, find_conversation_by_phone; conversations_summary agrupa en byLine"],
                  ["Plantillas de una línea", "?lineId= en GET /api/whatsapp/templates; lineId al crear, consultar o borrar", "lineId en list/create/get/delete_whatsapp_template"],
                  ["Campañas por una línea", "lineId al crear o editar el borrador en /api/campaigns; el preflight dice si la plantilla existe en esa línea", "lineId en create_campaign_draft y update_campaign_draft"],
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
          <P>
            Referencia completa: <Link href="/docs/api#reference" style={{ color: "#d1345b" }}>API REST</Link> y{" "}
            <Link href="/docs/mcp#tools" style={{ color: "#d1345b" }}>herramientas MCP</Link>.
          </P>
        </section>

        <section id="faq" className="mb-10">
          <H2>Preguntas frecuentes</H2>
          <div className="space-y-3">
            {[
              { q: "Un mismo cliente aparece dos veces en el kanban.", a: "Escribió a dos líneas. Es lo esperado: cada tarjeta lleva el punto y el nombre de su línea." },
              { q: "Una respuesta salió por el número equivocado.", a: "La conversación pertenece a otra línea (mira el chip de la cabecera), o fue un envío suelto sin conversación y usó la línea por defecto. Elige \"Enviar desde\" o pasa lineId." },
              { q: "Las plantillas no cargan en una línea.", a: "La línea no tiene cuenta de WhatsApp Business asociada o su token venció. Revisa su estado en Ajustes → WhatsApp y reconéctala." },
              { q: "No puedo desconectar una línea.", a: "Es la línea por defecto y hay otras conectadas. Marca otra como por defecto primero." },
              { q: "Cambié la foto o la descripción y el cliente sigue viendo la anterior.", a: "Meta tarda unos minutos en propagar el perfil. Si pasa más de una hora, abre el perfil desde el CRM: lo que muestra es lo que Meta tiene guardado." },
              { q: "Quiero cambiar el nombre que ve el cliente.", a: "Ese es el nombre visible, que aprueba Meta. Usa el enlace al WhatsApp Manager que hay en el perfil de la línea." },
              { q: "Los chats nuevos de una línea caen en el pipeline equivocado.", a: "Edita la línea (lápiz) y cambia su pipeline. Los chats que ya existen no se mueven solos: muévelos desde el kanban o desde Ajustes → Conversaciones." },
            ].map((f) => (
              <div key={f.q} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{f.q}</p>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <DocNav
          prev={{ href: "/docs/conversation-pipelines", title: "Pipelines de conversación" }}
          next={{ href: "/docs/whatsapp-templates", title: "Templates WhatsApp" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
