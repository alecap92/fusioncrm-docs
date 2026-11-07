import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";
import catalog from "@/data/mcp-tools.json";

export const metadata: Metadata = {
  title: "MCP: usa el CRM desde Claude, Cursor y tu IA",
  description:
    "Conecta Claude, Claude Code o Cursor al servidor MCP de FusionCRM y opera contactos, negocios, WhatsApp y cotizaciones con IA: credenciales, permisos y errores.",
  keywords: ["MCP", "Model Context Protocol", "Claude", "Cursor", "CRM con IA", "servidor MCP"],
  alternates: { canonical: "/docs/mcp" },
  openGraph: {
    title: "MCP: usa el CRM desde Claude, Cursor y tu IA",
    description:
      "Conecta Claude, Claude Code o Cursor al servidor MCP de FusionCRM y opera contactos, negocios, WhatsApp y cotizaciones con IA: credenciales, permisos y errores.",
    url: "/docs/mcp",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

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
  shipments: "Envíos",
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
  ["Claude web, escritorio o móvil", "Inicio de sesión (OAuth): solo la URL del servidor", "Claude te muestra una pantalla de FusionCRM para iniciar sesión y autorizar; luego renueva el acceso solo. El Client ID y el Secreto de un conector son opcionales."],
  ["Claude Code, Cursor, scripts o n8n", "Token de API como Authorization: Bearer", "Crea el token con expiración «Sin expiración» y solo los permisos que necesites."],
  ["Otros clientes MCP con OAuth", "Token de API como header", "El inicio de sesión OAuth solo devuelve el acceso a Claude, a Cursor o a un cliente que corre en tu equipo (localhost). Para cualquier otro cliente, usa un token de API."],
];

const problems = [
  ["401", "(sin code)", "Falta el token, está mal copiado, venció o fue revocado. En /api/mcp todos estos casos responden igual: {\"error\":\"unauthorized\"} con el header WWW-Authenticate.", "Con inicio de sesión OAuth, el cliente vuelve a pedirte el login. Con un token de API, pruébalo con curl contra /api/me: la API REST sí te dice el motivo exacto (API_TOKEN_MISSING, API_TOKEN_EXPIRED, API_TOKEN_NOT_FOUND…). Si hace falta, genera uno nuevo."],
  ["403", "INSUFFICIENT_API_PERMISSIONS", "Al token le falta el permiso de esa herramienta. Llega dentro de la respuesta de la herramienta.", "La respuesta indica requiredPermission: crea un token con ese permiso."],
  ["403", "API_ACCESS_DISABLED", "El propietario apagó tu acceso por API y MCP.", "Pídele que lo active en Configuración → Usuarios → Acceso por API."],
  ["403", "ORGANIZATION_ID_MISMATCH", "Enviaste X-Organization-Id (u organizationId) de una organización distinta a la del token.", "Quita el header o usa el token de esa organización."],
  ["403", "PLAN_MODULE_REQUIRED", "El plan no incluye lo que pidió la herramienta. module dice qué falta: api (el MCP mismo, de los planes Pro y Empresarial) o una función como waCampaigns, aiAgents, leadScoring, pdfDocuments o auditLog.", "Cambia de plan en Configuración → Plan. Mientras tu plan incluya el MCP (Pro o Empresarial), las herramientas de lectura siguen funcionando; si bajas a Básico, el MCP deja de responder, también para leer, y tus datos siguen en la app."],
  ["403", "PLAN_LIMIT_REACHED", "Llegaste a un tope del plan al crear (contactos, empresas, listas, formularios, landing pages…). details trae el uso y el tope.", "Libera espacio o sube de plan."],
  ["403", "ACCOUNT_RESTRICTED", "La cuenta está en pausa porque la prueba gratis o el plan vencieron: se puede leer, pero no crear ni enviar.", "El propietario paga el plan en Configuración → Plan."],
  ["429", "API_QUOTA_EXCEEDED", "Llegaste al tope de acciones por hora de tu usuario (creaciones, ediciones o envíos).", "Espera a la siguiente hora o pídele al propietario que suba tu tope en Configuración → Usuarios → Acceso por API."],
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
          FusionCRM expone un servidor MCP: conectas Claude (web, escritorio, móvil o Claude
          Code), Cursor o cualquier cliente que acepte un token de API en los headers, y la IA consulta y opera el CRM con {catalog.toolCount} herramientas,
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
              { title: "Con tus permisos", desc: "La IA solo puede hacer lo que tu usuario o el token que uses le permita." },
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
            <li>• <strong style={{ color: "var(--foreground)" }}>Inicio de sesión (OAuth):</strong> en Claude basta con pegar la URL del servidor. Claude abre una pantalla de FusionCRM donde inicias sesión con tu correo y contraseña y pulsas <em>Autorizar</em>; el acceso queda con los permisos de tu usuario. Así se puede conectar cualquier usuario, empleados incluidos. Si eres el propietario también puedes crear credenciales fijas (<em>Client ID</em> y <em>Secreto</em>) en Configuración → Desarrollador → Conectores MCP; esa pantalla solo la ve el propietario.</li>
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
            No uses el Client ID y el Secreto de un conector para pedir un token a mano y pegarlo como header: ese
            token dura 1 hora y no se renueva. Si tu cliente solo acepta headers fijos, crea un token de API.
          </Callout>
          <p className="mt-4 mb-6" style={{ color: "var(--muted-foreground)" }}>
            Los tokens de API funcionan en <code>/api/*</code> (la API REST) y en <code>/api/mcp</code>. No
            sirven en <code>/api/v1/*</code>, que es la API interna de la app web: ahí responden 401 con
            el código <code>API_TOKEN_NOT_ACCEPTED</code>.
          </p>

          <h3 id="claude" className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Claude (web y escritorio)</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. En Claude: Configuración → Conectores → <em>Agregar conector personalizado</em>.</li>
            <li>2. Pega la URL del servidor (abajo) y guarda.</li>
            <li>3. Claude abre una ventana de FusionCRM: inicia sesión con tu correo y contraseña. Verás la pantalla <em>Autorizar acceso a FusionCRM</em> con el destino al que se enviará el acceso; si es Claude, pulsa <em>Autorizar</em>.</li>
            <li>4. Listo: en un chat nuevo ya verás las herramientas de FusionCRM.</li>
          </ol>
          <p className="mb-4 text-sm" style={{ color: "var(--muted-foreground)" }}>
            Opcional, solo para el propietario: si prefieres credenciales fijas, en FusionCRM ve a
            Configuración → Desarrollador → Conectores MCP → <em>Nuevo conector</em>, ponle un nombre y pulsa{" "}
            <em>Crear credenciales</em>. Guarda el Client ID y el Secreto (el secreto se muestra una sola
            vez) y pégalos en Claude en <em>Configuración avanzada</em> al agregar el conector.
          </p>
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
            Cursor también acepta el inicio de sesión OAuth (redirige a{" "}
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
            <li>• Con inicio de sesión OAuth, la IA actúa con los permisos de quien autorizó, según su rol: el propietario puede todo; un empleado puede todo menos borrar (salvo que el propietario se lo active) y tiene un tope de acciones por hora; un contador trabaja solo con contactos, empresas, facturación y compras (y puede consultar productos y cotizaciones).</li>
            <li>• Con un token de API, la IA ve todas las herramientas, pero solo puede usar las que permita el token: si intenta, por ejemplo, enviar un WhatsApp sin el permiso <code>whatsapp:send</code>, recibe un error de permiso y no se envía nada.</li>
            <li>• Todo queda acotado a tu organización: no hay forma de leer datos de otra.</li>
            <li>• Los usuarios que no son propietarios tienen topes por hora (200 creaciones, 300 ediciones y 30 envíos de WhatsApp o correo), los mismos de la <Link href="/docs/api#errors" style={{ color: "#d1345b" }}>API REST</Link>. El propietario puede apagarle la API y el MCP a un usuario, o ajustar sus topes, en Configuración → Usuarios → Acceso por API.</li>
            <li>• Revocar un token de API corta el acceso al instante. Revocar un conector MCP impide conexiones nuevas, pero un cliente que ya estaba conectado puede seguir funcionando: para cortarlo del todo, desconéctalo también en tu cliente (por ejemplo en Claude → Conectores) o apágale el acceso por API a ese usuario.</li>
            <li>• MCP hace parte del módulo API, incluido en los planes Pro y Empresarial, igual que la API REST. Las herramientas respetan además las funciones del plan: por ejemplo, crear o programar campañas de WhatsApp, activar agentes IA o editar reglas de lead scoring piden un plan que las incluya.</li>
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
            Los rechazos de permisos, plan o topes traen un <code>code</code> (en MCP llega en{" "}
            <code>data.code</code> del error o dentro de la respuesta de la herramienta). Los 401 no lo traen:
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
            {catalog.toolCount} herramientas en este listado. La lista vigente, con los parámetros de
            cada herramienta, se genera desde el servidor en producción y está en{" "}
            <a href={CATALOG_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#d1345b" }}>mcp-tools.json</a>.
          </p>
          <Callout type="note">
            Desde septiembre de 2026 la IA también <strong>configura</strong> el CRM: pipelines y
            etapas, campos personalizados, plantillas, reglas de puntuación, actividades,
            calendario y landing pages. Límites a propósito: las automatizaciones se crean siempre
            como <strong>borrador</strong> y las publica una persona en la app. Las campañas también
            nacen como borrador; la IA puede <strong>programarlas</strong> para una fecha futura
            (<code>schedule_campaign</code>, y quitar la programación con <code>unschedule_campaign</code>),
            pero solo si la plantilla está aprobada y hay destinatarios, y enviarlas en el momento
            solo se hace desde la app con <em>Enviar ahora</em>. Las integraciones solo se leen, sin
            claves ni contraseñas.
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
          prev={{ href: "/docs/envios", title: "Envíos por API (Envia.com)" }}
          next={{ href: "/docs/integrations", title: "Integraciones" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
