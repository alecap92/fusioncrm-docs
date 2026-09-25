import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";
import catalog from "@/data/mcp-tools.json";

export const metadata: Metadata = { title: "MCP: el CRM desde tu IA" };

const MCP_URL = "https://api.fusioncol.com/api/mcp";
const API_ME_URL = "https://api.fusioncol.com/api/me";
const CATALOG_URL = "https://api.fusioncol.com/api/mcp-tools.json";

const toc = [
  { id: "overview", label: "Qué es MCP" },
  { id: "examples", label: "Qué puedes pedirle" },
  { id: "connect", label: "Conectar tu cliente" },
  { id: "credentials", label: "Qué credencial usar", depth: 3 },
  { id: "claude", label: "Claude (web y escritorio)", depth: 3 },
  { id: "claude-code", label: "Claude Code", depth: 3 },
  { id: "cursor", label: "Cursor y otros", depth: 3 },
  { id: "verify", label: "Verifica a qué cuenta apunta" },
  { id: "security", label: "Permisos y seguridad" },
  { id: "troubleshooting", label: "Problemas frecuentes" },
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
  account: "Tu cuenta",
  pipelines: "Configuración: pipelines y etapas",
  fields: "Configuración: campos personalizados",
  templates: "Plantillas de correo y documentos",
  settings: "Configuración de la cuenta",
  users: "Usuarios",
  automations: "Automatizaciones (borrador)",
  campaigns: "Campañas",
  landings: "Landing pages",
  activities: "Actividades",
  calendar: "Calendario",
  notifications: "Notificaciones",
  "import-export": "Importar y exportar",
  purchases: "Compras",
  agents: "Agentes IA",
  reports: "Reportes",
  general: "General",
};

const GROUP_ORDER = Object.keys(GROUP_LABELS);

const tools = (catalog.tools as CatalogTool[]).slice().sort((a, b) => a.name.localeCompare(b.name));
const grouped = GROUP_ORDER
  .map((group) => ({ group, label: GROUP_LABELS[group], items: tools.filter((t) => t.group === group) }))
  .filter((g) => g.items.length > 0);
const unknown = tools.filter((t) => !GROUP_LABELS[t.group]);
if (unknown.length > 0) grouped.push({ group: "otros", label: "Otros", items: unknown });

const credentials = [
  ["Claude web, escritorio o móvil", "Conector MCP: Client ID + Secreto", "El cliente hace el flujo OAuth solo y renueva el acceso sin que hagas nada."],
  ["Claude Code, Cursor, scripts o n8n", "Token de API como Authorization: Bearer", "Crea el token con expiración «Sin expiración» y solo los permisos que necesites."],
  ["Otros clientes MCP con OAuth", "Conector MCP: Client ID + Secreto", "Si el cliente admite servidores remotos con OAuth; si solo acepta headers fijos, usa un token de API."],
];

const problems = [
  ["401", "API_TOKEN_MISSING", "La petición llegó sin token.", "Revisa el header Authorization. Con un conector OAuth la respuesta trae WWW-Authenticate y el cliente vuelve a pedir el login."],
  ["401", "API_TOKEN_INVALID / API_TOKEN_EXPIRED / API_TOKEN_NOT_FOUND", "El token está mal copiado, venció o fue revocado.", "Genera un token nuevo (o vuelve a autorizar el conector) y reemplázalo en el cliente."],
  ["401", "API_TOKEN_NOT_ACCEPTED", "Usaste un token de API contra /api/v1/*, que es la API interna de la app web.", "Llama a /api/* (la API REST) o a /api/mcp."],
  ["403", "INSUFFICIENT_API_PERMISSIONS", "Al token le falta el permiso de esa operación.", "La respuesta indica requiredPermission: crea o edita el token con ese permiso."],
  ["403", "ORGANIZATION_ID_MISMATCH", "Enviaste X-Organization-Id (u organizationId) de una organización distinta a la del token.", "Quita el header o usa el token de esa organización."],
  ["403", "PLAN_MODULE_REQUIRED", "El plan de la organización no incluye el módulo API.", "Actívalo desde Configuración → Plan."],
];

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
            <li>• <strong style={{ color: "var(--foreground)" }}>Conector MCP (OAuth):</strong> en Configuración → Desarrollador → Conectores MCP creas un conector y obtienes un <em>Client ID</em> y un <em>Secreto</em>. El cliente hace el flujo OAuth solo.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Token de API:</strong> el mismo token de la <Link href="/docs/api#auth" style={{ color: "#d1345b" }}>API REST</Link>, enviado como <code>Authorization: Bearer</code>. Para clientes que aceptan headers fijos.</li>
          </ul>

          <h3 id="credentials" className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Qué credencial usar</h3>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Si usas</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Usa</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Por qué</th>
                </tr>
              </thead>
              <tbody>
                {credentials.map(([client, cred, why]) => (
                  <tr key={client}>
                    <td className="p-3 border-b align-top" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{client}</td>
                    <td className="p-3 border-b align-top" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{cred}</td>
                    <td className="p-3 border-b text-xs align-top" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout type="warning">
            No uses el Client ID y el Secreto para pedir un token a mano y pegarlo como header: ese
            token dura 1 hora y no se renueva. Si tu cliente solo acepta headers fijos, crea un token de API.
          </Callout>
          <p className="mt-4 mb-6" style={{ color: "var(--muted-foreground)" }}>
            Los tokens de API funcionan en <code>/api/*</code> (la API REST) y en <code>/api/mcp</code>. No
            sirven en <code>/api/v1/*</code>, que es la API interna de la app web: ahí responden 401 con
            el código <code>API_TOKEN_NOT_ACCEPTED</code>.
          </p>

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

        <section id="verify" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Verifica a qué cuenta apunta</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Es el primer paso recomendado después de conectar, y es obligatorio si tienes varias
            organizaciones conectadas: equivocarse de conexión es enviar un WhatsApp desde el número
            de otra empresa. Pregúntale a la IA <em>«¿a qué organización estoy conectado?»</em>; usará la
            herramienta <code style={{ color: "#d1345b" }}>get_current_organization</code>. Con un token de API
            puedes comprobarlo tú mismo:
          </p>
          <div className="rounded-lg p-4 mb-4" style={codeBox}>
            <pre className="text-sm overflow-x-auto" style={{ color: "var(--foreground)" }}>{`curl ${API_ME_URL} \\
  -H "Authorization: Bearer <token de API>"`}</pre>
          </div>
          <div className="rounded-lg p-4 mb-4" style={codeBox}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>Respuesta (recortada)</p>
            <pre className="text-sm overflow-x-auto" style={{ color: "var(--foreground)" }}>{`{
  "success": true,
  "data": {
    "organization": { "id": "665f…", "name": "Mi Empresa SAS" },
    "user": { "email": "ana@example.com", "role": "admin" },
    "token": {
      "name": "claude-code",
      "permissions": ["contacts:read", "whatsapp:send"],
      "expiresAt": null
    },
    "plan": { "name": "pro", "modules": { "api": true } }
  }
}`}</pre>
          </div>
          <Callout type="tip">
            Hazlo antes de cualquier envío (WhatsApp, correo, campañas) cuando trabajes con más de
            una cuenta. <code>expiresAt: null</code> significa que el token no vence.
          </Callout>
        </section>

        <section id="security" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Permisos y seguridad</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Un conector OAuth actúa con los permisos del usuario que lo autorizó, dentro de su organización.</li>
            <li>• Con un token de API, la IA solo ve las herramientas cuyos permisos tenga el token (por ejemplo, sin <code>whatsapp:send</code> no puede enviar mensajes).</li>
            <li>• Todo queda acotado a tu organización: no hay forma de leer datos de otra.</li>
            <li>• Los conectores y tokens se revocan desde la misma pantalla donde se crearon; el cliente pierde acceso al instante.</li>
            <li>• MCP hace parte del módulo API del plan, igual que la API REST.</li>
            <li>• El header <code>X-Organization-Id</code> (o el query <code>organizationId</code>) es opcional: sin él se usa la organización del token. Si lo envías y no coincide, la respuesta es 403 <code>ORGANIZATION_ID_MISMATCH</code> (en MCP llega como error JSON-RPC con ese código en <code>data.code</code>).</li>
          </ul>
          <Callout type="warning">
            La IA puede ejecutar acciones reales (enviar un WhatsApp, borrar un contacto). Dale a
            cada conector solo lo que necesita y revisa en la app lo que hizo, sobre todo al empezar.
          </Callout>
        </section>

        <section id="troubleshooting" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Problemas frecuentes</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada rechazo trae un <code>code</code> que dice exactamente qué pasó:
          </p>
          <div className="rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>HTTP</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>code</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Causa</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Solución</th>
                </tr>
              </thead>
              <tbody>
                {problems.map(([http, code, cause, fix]) => (
                  <tr key={code}>
                    <td className="p-3 border-b font-mono align-top" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{http}</td>
                    <td className="p-3 border-b font-mono text-xs align-top break-all" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{code}</td>
                    <td className="p-3 border-b text-xs align-top" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{cause}</td>
                    <td className="p-3 border-b text-xs align-top" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="tools" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Herramientas disponibles</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            {catalog.toolCount} herramientas, generadas desde el servidor en producción. El catálogo
            completo con los parámetros de cada una está en{" "}
            <a href={CATALOG_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#d1345b" }}>mcp-tools.json</a>.
          </p>
          <Callout type="note">
            Desde septiembre de 2026 la IA también <strong>configura</strong> el CRM: pipelines y
            etapas, campos personalizados, plantillas, reglas de puntuación, actividades,
            calendario y landing pages. Dos límites a propósito: las automatizaciones y las
            campañas se crean siempre como <strong>borrador</strong> (publicarlas o enviarlas se
            hace en la app, por una persona), y las integraciones solo se leen, sin claves ni
            contraseñas.
          </Callout>
          <div className="space-y-6 mt-6">
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
