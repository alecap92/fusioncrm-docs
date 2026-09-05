import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";
import catalog from "@/data/mcp-tools.json";

export const metadata: Metadata = { title: "MCP: el CRM desde tu IA" };

const MCP_URL = "https://api.fusioncol.com/api/mcp";
const CATALOG_URL = "https://api.fusioncol.com/api/mcp-tools.json";

const toc = [
  { id: "overview", label: "Qué es MCP" },
  { id: "examples", label: "Qué puedes pedirle" },
  { id: "connect", label: "Conectar tu cliente" },
  { id: "claude", label: "Claude (web y escritorio)", depth: 3 },
  { id: "claude-code", label: "Claude Code", depth: 3 },
  { id: "cursor", label: "Cursor y otros", depth: 3 },
  { id: "security", label: "Permisos y seguridad" },
  { id: "tools", label: "Herramientas disponibles" },
];

interface CatalogTool {
  name: string;
  description: string;
  group: string;
}

const GROUP_LABELS: Record<string, string> = {
  contacts: "Contactos",
  "contact-lists": "Listas de contactos",
  companies: "Empresas",
  deals: "Negocios",
  conversations: "Conversaciones y WhatsApp entrante",
  whatsapp: "Envío de WhatsApp",
  email: "Correo",
  quotations: "Cotizaciones",
  invoices: "Facturas",
  products: "Productos",
  forms: "Formularios web",
  projects: "Proyectos",
  tasks: "Tareas",
  fragments: "Respuestas rápidas",
  library: "Biblioteca",
  "knowledge-base": "Base de conocimiento",
  general: "General",
};

const GROUP_ORDER = Object.keys(GROUP_LABELS);

const tools = (catalog.tools as CatalogTool[]).slice().sort((a, b) => a.name.localeCompare(b.name));
const grouped = GROUP_ORDER
  .map((group) => ({ group, label: GROUP_LABELS[group], items: tools.filter((t) => t.group === group) }))
  .filter((g) => g.items.length > 0);
const unknown = tools.filter((t) => !GROUP_LABELS[t.group]);
if (unknown.length > 0) grouped.push({ group: "otros", label: "Otros", items: unknown });

const codeBox = { backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" } as const;

export default function McpPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>MCP: el CRM desde tu IA</h1>
          <span className="text-xs px-2 py-1 rounded font-bold" style={{ backgroundColor: "#1f2a48", color: "white" }}>IA</span>
        </div>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          FusionCRM expone un servidor MCP: conectas Claude, ChatGPT, Cursor o cualquier
          cliente compatible y la IA consulta y opera el CRM con {catalog.toolCount} herramientas,
          las mismas capacidades de la <Link href="/docs/api" style={{ color: "#d1345b" }}>API REST</Link>{" "}
          sin escribir una línea de código.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Qué es MCP</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El <strong style={{ color: "var(--foreground)" }}>Model Context Protocol</strong> es el
            estándar abierto con el que los asistentes de IA se conectan a herramientas externas.
            En vez de copiar y pegar datos en un chat, el asistente llama directamente a FusionCRM:
            busca un contacto, resume las conversaciones de la semana, crea una cotización o mueve un
            negocio de etapa, y te muestra el resultado.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {[
              { title: "Un solo servidor", desc: `${MCP_URL} — transporte Streamable HTTP, sin instalar nada en tu equipo.` },
              { title: "Con tus permisos", desc: "La IA solo puede hacer lo que el conector o el token que uses le permita." },
              { title: "Mismas reglas", desc: "Lo que la IA crea pasa por las mismas validaciones, límites del plan y automatizaciones que la app." },
            ].map((c) => (
              <div key={c.title} className="p-4 rounded-lg border" style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{c.title}</p>
                <p className="text-xs break-all" style={{ color: "var(--muted-foreground)" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="examples" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Qué puedes pedirle</h2>
          <div className="space-y-2 mb-4">
            {[
              "«¿Qué conversaciones tengo pendientes en la columna Pedidos Medellín?»",
              "«Busca el contacto con el celular 300 000 0000 y dime qué negocios abiertos tiene.»",
              "«Crea una cotización para Ana Ejemplo con 500 manillas Tyvek a $850 cada una.»",
              "«Resume los negocios cerrados este mes por vendedor.»",
              "«Mueve la conversación de Carlos a Oportunidad y agrégale una nota.»",
              "«Envía la plantilla de seguimiento de WhatsApp a los contactos de la lista Feria 2026.»",
            ].map((q) => (
              <div key={q} className="p-3 rounded-lg border text-sm" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{q}</div>
            ))}
          </div>
          <Callout type="note">
            El asistente decide qué herramientas llamar a partir de tu pedido. Cuando una acción
            escribe datos (crear, enviar, borrar), la mayoría de clientes te piden confirmación
            antes de ejecutarla.
          </Callout>
        </section>

        <section id="connect" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Conectar tu cliente</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Hay dos formas de autenticarse; ambas terminan en un token con la organización ya dentro,
            así que no hay nada más que configurar:
          </p>
          <ul className="space-y-2 pl-4 mb-6" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Conector MCP (OAuth):</strong> en Configuración → Desarrollador → Conectores MCP creas un conector y obtienes un <em>Client ID</em> y un <em>Secreto</em>. Es lo recomendado para Claude y ChatGPT: el cliente hace el flujo OAuth solo.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Token de API:</strong> el mismo token de la <Link href="/docs/api#auth" style={{ color: "#d1345b" }}>API REST</Link>, enviado como <code>Authorization: Bearer</code>. Útil en clientes que aceptan headers fijos (Claude Code, Cursor, scripts).</li>
          </ul>

          <h3 id="claude" className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Claude (web y escritorio)</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. En FusionCRM: Configuración → Desarrollador → Conectores MCP → <em>Crear conector MCP</em>. Guarda el Client ID y el Secreto (el secreto se muestra una sola vez).</li>
            <li>2. En Claude: Configuración → Conectores → <em>Agregar conector personalizado</em>.</li>
            <li>3. Pega la URL del servidor y, en <em>Configuración avanzada</em>, el Client ID y el Secreto.</li>
            <li>4. Autoriza el acceso cuando Claude lo pida. Listo: en un chat nuevo ya verás las herramientas de FusionCRM.</li>
          </ol>
          <div className="rounded-lg p-4 mb-6 font-mono text-sm" style={codeBox}>
            <span style={{ color: "#d1345b" }}>{MCP_URL}</span>
          </div>

          <h3 id="claude-code" className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Claude Code</h3>
          <div className="rounded-lg p-4 mb-6" style={codeBox}>
            <pre className="text-sm overflow-x-auto" style={{ color: "var(--foreground)" }}>{`claude mcp add --transport http fusioncrm ${MCP_URL} \\
  --header "Authorization: Bearer <token de API>"`}</pre>
          </div>

          <h3 id="cursor" className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Cursor y otros clientes</h3>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Cualquier cliente que soporte servidores MCP remotos (Streamable HTTP) funciona. En
            Cursor, el archivo <code>mcp.json</code> queda así:
          </p>
          <div className="rounded-lg p-4 mb-4" style={codeBox}>
            <pre className="text-sm overflow-x-auto" style={{ color: "var(--foreground)" }}>{`{
  "mcpServers": {
    "fusioncrm": {
      "url": "${MCP_URL}",
      "headers": { "Authorization": "Bearer <token de API>" }
    }
  }
}`}</pre>
          </div>
          <p style={{ color: "var(--muted-foreground)" }}>
            Cursor también acepta el flujo OAuth con un conector (redirige a{" "}
            <code>cursor://anysphere.cursor-mcp/oauth/callback</code>); los metadatos del servidor están
            en <code>/.well-known/oauth-authorization-server</code>.
          </p>
        </section>

        <section id="security" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Permisos y seguridad</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Un conector OAuth actúa con los permisos del usuario que lo autorizó, dentro de su organización.</li>
            <li>• Con un token de API, la IA solo ve las herramientas cuyos permisos tenga el token (por ejemplo, sin <code>whatsapp:send</code> no puede enviar mensajes).</li>
            <li>• Todo queda acotado a tu organización: no hay forma de leer datos de otra.</li>
            <li>• Los conectores y tokens se revocan desde la misma pantalla donde se crearon; el cliente pierde acceso al instante.</li>
            <li>• MCP hace parte del módulo API del plan, igual que la API REST.</li>
          </ul>
          <Callout type="warning">
            La IA puede ejecutar acciones reales (enviar un WhatsApp, borrar un contacto). Dale a
            cada conector solo lo que necesita y revisa en la app lo que hizo, sobre todo al empezar.
          </Callout>
        </section>

        <section id="tools" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Herramientas disponibles</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            {catalog.toolCount} herramientas, generadas desde el servidor en producción. El catálogo
            completo con los parámetros de cada una está en{" "}
            <a href={CATALOG_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#d1345b" }}>mcp-tools.json</a>.
          </p>
          <div className="space-y-6">
            {grouped.map((g) => (
              <div key={g.group}>
                <h3 className="text-base font-semibold mb-2" style={{ color: "var(--foreground)" }}>
                  {g.label} <span className="text-xs font-normal" style={{ color: "var(--muted-foreground)" }}>({g.items.length})</span>
                </h3>
                <div className="rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                  <table className="w-full text-sm">
                    <tbody>
                      {g.items.map((t) => (
                        <tr key={t.name}>
                          <td className="p-2.5 border-b font-mono text-xs align-top whitespace-nowrap" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{t.name}</td>
                          <td className="p-2.5 border-b text-xs" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{t.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        <DocNav
          prev={{ href: "/docs/api", title: "API REST" }}
          next={{ href: "/docs/integrations", title: "Integraciones" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
