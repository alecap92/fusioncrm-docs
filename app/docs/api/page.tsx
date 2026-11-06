import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";
import SwaggerEmbed from "@/components/SwaggerEmbed";

export const metadata: Metadata = {
  title: "API REST de FusionCRM: tokens, endpoints y webhooks",
  description:
    "Conecta tu sistema con FusionCRM por API REST: autenticación con tokens, permisos, endpoints en OpenAPI, webhooks salientes, errores y límites del plan.",
  keywords: ["API REST CRM", "OpenAPI", "tokens de API", "webhooks salientes", "integración CRM", "endpoints"],
  alternates: { canonical: "/docs/api" },
  openGraph: {
    title: "API REST de FusionCRM: tokens, endpoints y webhooks",
    description:
      "Conecta tu sistema con FusionCRM por API REST: autenticación con tokens, permisos, endpoints en OpenAPI, webhooks salientes, errores y límites del plan.",
    url: "/docs/api",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

const API_BASE = "https://api.fusioncol.com/api";
const SPEC_URL = `${API_BASE}/openapi.json`;

const toc = [
  { id: "overview", label: "Qué incluye" },
  { id: "auth", label: "Autenticación y tokens" },
  { id: "permissions", label: "Permisos" },
  { id: "base-url", label: "URL base y convenciones" },
  { id: "reference", label: "Referencia de endpoints" },
  { id: "webhooks", label: "Webhooks salientes" },
  { id: "audit-log", label: "Registro de auditoría" },
  { id: "errors", label: "Errores y límites del plan" },
];

const modules = [
  { path: "/catalogs", name: "Catálogos DANE: municipios y departamentos (cityCode)", perms: "cualquier token" },
  { path: "/contacts", name: "Contactos", perms: "contacts:*" },
  { path: "/companies", name: "Empresas (B2B)", perms: "companies:*" },
  { path: "/deals", name: "Negocios", perms: "deals:*" },
  { path: "/forms", name: "Formularios web y sus envíos", perms: "forms:*" },
  { path: "/conversations", name: "Conversaciones y mensajes; filtros por línea (lineId) y pipeline; mover de etapa o de pipeline", perms: "conversations:*" },
  { path: "/conversation-pipelines", name: "Pipelines de conversación, sus etapas y movimiento masivo (move-all)", perms: "pipelines:read / pipelines:write" },
  { path: "/whatsapp", name: "Envío de WhatsApp, líneas (/lines) y plantillas: listar, crear, consultar estado, borrar y subir cabecera multimedia", perms: "whatsapp:send" },
  { path: "/campaigns", name: "Campañas masivas de WhatsApp: borradores (con lineId), preflight, programar o desprogramar el envío y resultados", perms: "contacts:read / automations:write" },
  { path: "/quotations", name: "Cotizaciones y su PDF", perms: "quotations:*" },
  { path: "/products", name: "Productos y variantes", perms: "products:*" },
  { path: "/invoices", name: "Facturación electrónica (DIAN)", perms: "invoices:*" },
  { path: "/purchases", name: "Compras (requiere el módulo de facturación)", perms: "purchases:*" },
  { path: "/shipments", name: "Envíos con Envia.com (módulo Envíos)", perms: "shipments:read / shipments:write" },
  { path: "/projects", name: "Proyectos", perms: "projects:*" },
  { path: "/tasks", name: "Tareas", perms: "tasks:*" },
  { path: "/lists", name: "Listas de contactos", perms: "contacts:*" },
  { path: "/fragments", name: "Respuestas rápidas", perms: "fragments:*" },
  { path: "/library", name: "Biblioteca de archivos", perms: "library:*" },
  { path: "/rag", name: "Base de conocimiento (RAG)", perms: "rag:*" },
  { path: "/agents", name: "Agentes IA", perms: "agents:*" },
  { path: "/agent-context", name: "Contexto de cliente para agentes", perms: "conversations:read / agents:write" },
  { path: "/landing-pages", name: "Landing pages: crear, duplicar, publicar y estadísticas", perms: "forms:read / landings:write" },
  { path: "/automations", name: "Automatizaciones (se crean y editan como borrador) y su historial de ejecuciones", perms: "automations:*" },
  { path: "/activities", name: "Actividades del CRM", perms: "activities:*" },
  { path: "/calendar-events", name: "Eventos del calendario", perms: "calendar:*" },
  { path: "/import", name: "Importación de contactos e historial (con deshacer)", perms: "contacts:*" },
  { path: "/audit-log", name: "Registro de auditoría de la cuenta, solo lectura (plan Empresarial; el token debe ser de un propietario)", perms: "settings:read" },
];

const permissions = [
  ["contacts:read · contacts:write · contacts:delete", "Contactos y listas de contactos"],
  ["companies:read · companies:write · companies:delete", "Empresas"],
  ["deals:read · deals:write · deals:delete", "Negocios"],
  ["forms:read · forms:write", "Formularios, sus respuestas y el envío server-to-server"],
  ["conversations:read · conversations:write · conversations:delete", "Conversaciones, mensajes, pipelines y etapas"],
  ["whatsapp:send", "Todo lo de WhatsApp: enviar mensajes y plantillas, listar líneas y administrar plantillas de Meta (crear, consultar, borrar). whatsapp:read existe en el catálogo pero hoy no da acceso a nada por sí solo"],
  ["pipelines:read · pipelines:write", "Pipelines de conversación y de negocios, sus etapas y el movimiento masivo"],
  ["quotations:read · quotations:write · quotations:delete", "Cotizaciones"],
  ["products:read · products:write · products:delete", "Productos y variantes"],
  ["invoices:read · invoices:write", "Facturas (requiere el módulo de facturación)"],
  ["purchases:read · purchases:write", "Compras (requiere el módulo de facturación)"],
  ["shipments:read · shipments:write", "Envíos: read lista, consulta y cotiza (no cobra); write genera guías (cobra saldo de Envia), rastrea y cancela. Requiere el módulo Envíos"],
  ["projects:read · projects:write · projects:delete · tasks:read · tasks:write · tasks:delete", "Proyectos y tareas"],
  ["fragments:read · fragments:write · fragments:delete", "Respuestas rápidas"],
  ["library:read · library:write", "Biblioteca (solo metadatos; la subida vive en la app)"],
  ["rag:read · rag:write · rag:delete", "Base de conocimiento"],
  ["agents:read · agents:write", "Agentes IA y prueba de prompts (gasta créditos de OpenAI)"],
  ["fields:read · fields:write", "Campos personalizados de contactos, empresas y negocios"],
  ["templates:read · templates:write", "Plantillas de correo y de documentos PDF"],
  ["settings:read · settings:write", "Configuración de la cuenta: organización, facturación, integraciones, cuentas de correo, lead scoring, checklists y variantes"],
  ["users:read", "Usuarios de la organización"],
  ["automations:read · automations:write", "Automatizaciones y campañas masivas"],
  ["activities:read · activities:write", "Actividades"],
  ["calendar:read · calendar:write", "Calendario"],
  ["notifications:read · notifications:write", "Notificaciones"],
  ["exports:read · exports:write", "Exportaciones"],
  ["landings:write", "Crear y editar landing pages"],
  ["*", "Acceso completo (solo el propietario puede crear tokens con este permiso)"],
];

const errors = [
  ["401", "API_TOKEN_MISSING / API_TOKEN_INVALID / API_TOKEN_EXPIRED", "Falta el token, está mal copiado o expiró."],
  ["401", "API_TOKEN_NOT_FOUND", "El token fue revocado (o renovado: al renovar, el anterior deja de funcionar)."],
  ["401", "API_TOKEN_NOT_ACCEPTED", "Usó un token de API en /api/v1/*, que es la API interna de la app web. Use /api/*."],
  ["403", "INSUFFICIENT_API_PERMISSIONS", "El token no tiene el permiso de la operación (la respuesta lista requiredPermission)."],
  ["403", "ORGANIZATION_ID_MISMATCH", "El header X-Organization-Id (o el query organizationId) no coincide con la organización del token. Es opcional: sin él se usa la del token."],
  ["403", "API_ACCESS_DISABLED", "El propietario desactivó tu acceso por API en Configuración → Usuarios → Acceso por API."],
  ["403", "ACCOUNT_SUSPENDED / ACCOUNT_RESTRICTED", "La cuenta está suspendida o en modo solo lectura (por ejemplo, por el estado del plan)."],
  ["403", "PERMISSION_NOT_ALLOWED_FOR_ROLE", "Al crear un token: tu rol no puede pedir acceso completo (*) ni permisos de borrar."],
  ["403", "PLAN_MODULE_REQUIRED", "El plan no incluye la función que pide la operación. El campo module dice cuál (por ejemplo api, waCampaigns, aiAgents, leadScoring, advancedReports, teamActivity, pdfDocuments, auditLog, invoices, envios o crm); si la operación acepta varias, también llega modules con la lista."],
  ["403", "PLAN_LIMIT_REACHED", "Se alcanzó un tope del plan al crear o activar (contactos, empresas, listas, formularios activos, landing pages, automatizaciones activas, documentos RAG). details trae el uso y el tope."],
  ["403", "TRIAL_SINGLE_USER", "Al crear un usuario durante la prueba gratis (o con la prueba vencida): la prueba es de un solo usuario. Elige un plan para sumar a tu equipo."],
  ["429", "API_QUOTA_EXCEEDED", "Llegaste al tope por hora de tu usuario. Espera los segundos que indica el header Retry-After."],
  ["400", "—", "Datos inválidos: el cuerpo lleva success:false y error con el motivo."],
  ["400", "INVALID_CITY_CODE", "El cityCode enviado no existe en el catálogo DANE. Ver Ciudades."],
  ["422", "CITY_UNRESOLVED", "La ciudad (texto) es ambigua, está mal escrita o no existe; la respuesta trae candidates para reenviar con cityCode. Ver Ciudades."],
  ["404", "—", "El recurso no existe o pertenece a otra organización (nunca se distingue entre ambos)."],
  ["409", "—", "Conflicto: por ejemplo un atajo de respuesta rápida repetido."],
  ["503", "RAG_QUEUE_UNAVAILABLE", "La cola de indexación no aceptó un documento; reintente."],
];

const codeBox = { backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" } as const;

export default function ApiPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>API REST</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Todo lo que ves en la app se puede leer y escribir por API: contactos, empresas,
          negocios, conversaciones, WhatsApp, cotizaciones, facturas, formularios, proyectos y
          más. La referencia completa se genera desde el mismo código que corre en producción.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Qué incluye</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {[
              { title: "Más de 40 módulos y 200 operaciones", desc: "Cada endpoint documentado con parámetros, cuerpo, respuestas y ejemplos validados. El conteo exacto está en la referencia de abajo." },
              { title: "Tokens por permiso", desc: "Cada token lleva solo los permisos que le des; nada de llaves maestras en tus integraciones." },
              { title: "Mismo motor que la app", desc: "Crear un negocio por API dispara las mismas automatizaciones y reglas que crearlo a mano." },
            ].map((c) => (
              <div key={c.title} className="p-4 rounded-lg border" style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{c.title}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            ¿Prefieres que una IA use el CRM en vez de programar contra él? Mira la página de{" "}
            <Link href="/docs/mcp" style={{ color: "#d1345b" }}>MCP</Link>: los mismos módulos expuestos
            como herramientas para Claude, Cursor u otros clientes compatibles.
          </p>
          <Callout type="note">
            La API y el MCP están incluidos en los planes <strong>Pro</strong> y <strong>Empresarial</strong>.
            Con el Básico (o durante la prueba gratis) no puedes crear ni renovar tokens, y las llamadas
            responden 403 con el código <code>PLAN_MODULE_REQUIRED</code> y <code>{'module: "api"'}</code>.
            Cambia de plan en Configuración → Plan.
          </Callout>
        </section>

        <section id="auth" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Autenticación y tokens</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La API se autentica con <strong style={{ color: "var(--foreground)" }}>tokens de API</strong>.
            Cada usuario (propietario o empleado) crea los suyos en{" "}
            <strong style={{ color: "var(--foreground)" }}>Configuración → Desarrollador → API</strong> y ve
            solo los propios; el rol contador no puede crear tokens:
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Pulsa <em>Nuevo token</em> y ponle un nombre que diga para qué es (ej. <code>integracion-n8n</code>).</li>
            <li>2. Elige la expiración: 30 días, 90 días, 1 año (la opción por defecto) o sin expiración.</li>
            <li>3. Marca los permisos. Hay grupos rápidos (Solo Lectura, Ventas, Bot de WhatsApp y Acceso Completo, este último solo para el propietario) o puedes marcarlos uno por uno. Pulsa <em>Crear token</em>.</li>
            <li>4. Copia el token: <strong style={{ color: "var(--foreground)" }}>solo se muestra una vez</strong>. Desde la misma pantalla puedes revocarlo cuando quieras.</li>
          </ol>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Si un token está por vencer, usa <em>Renovar token</em>: te entrega uno nuevo por 1 año y el
            anterior deja de funcionar de inmediato. En la misma pantalla, la pestaña{" "}
            <em>Endpoints disponibles</em> trae ejemplos listos para copiar y verás cuántas sesiones de
            Claude (MCP) hay conectadas.
          </p>
          <Callout type="note">
            Solo el propietario puede crear tokens con acceso completo (<code>*</code>) o con permisos de
            borrar. Desde <strong>Configuración → Usuarios → Acceso por API</strong> el propietario puede,
            para cada usuario, apagarle la API y el MCP, permitirle borrar por API y ajustar sus topes por
            hora (ver <a href="#errors" style={{ color: "#d1345b" }}>Errores y límites</a>).
          </Callout>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Envíalo en cualquiera de los dos headers (basta uno):
          </p>
          <div className="rounded-lg p-4 mb-4 font-mono text-sm space-y-1" style={codeBox}>
            <div><span style={{ color: "#8b5cf6" }}>Authorization</span>: <span style={{ color: "#d1345b" }}>Bearer &lt;token&gt;</span></div>
            <div><span style={{ color: "#8b5cf6" }}>X-API-Key</span>: <span style={{ color: "#d1345b" }}>&lt;token&gt;</span></div>
          </div>
          <div className="rounded-lg p-4 mb-4" style={codeBox}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>Primer paso: verifica a qué organización apunta el token</p>
            <pre className="text-sm overflow-x-auto" style={{ color: "var(--foreground)" }}>{`curl "${API_BASE}/me" \\
  -H "Authorization: Bearer <token>"`}</pre>
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            <code>GET /me</code> no exige ningún permiso y devuelve la organización, el usuario que
            emitió el token, sus permisos, su vencimiento (<code>expiresAt</code>) y el plan. Úsalo
            siempre que manejes tokens de varias organizaciones.
          </p>
          <div className="rounded-lg p-4 mb-4" style={codeBox}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>Ejemplo: listar contactos</p>
            <pre className="text-sm overflow-x-auto" style={{ color: "var(--foreground)" }}>{`curl "${API_BASE}/contacts?page=1&limit=50" \\
  -H "Authorization: Bearer <token>"`}</pre>
          </div>
          <div className="rounded-lg p-4 mb-4" style={codeBox}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>Ejemplo: crear un contacto (si ya existe uno con ese email o celular, se actualiza con los datos enviados y responde 200; si es nuevo, 201)</p>
            <pre className="text-sm overflow-x-auto" style={{ color: "var(--foreground)" }}>{`curl -X POST "${API_BASE}/contacts" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "Ana",
    "lastName": "Ejemplo",
    "email": "ana@example.com",
    "mobile": "+57 300 000 0000",
    "source": "website"
  }'`}</pre>
          </div>
          <Callout type="danger">
            Un token es una credencial: no lo pongas en código del navegador ni en repositorios.
            Si se filtra, revócalo en la misma pantalla donde lo creaste y genera otro.
          </Callout>
        </section>

        <section id="permissions" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Permisos</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada operación exige un permiso concreto; la referencia lo indica en{" "}
            <code style={{ color: "#d1345b" }}>x-required-permissions</code>. Un token sin el permiso
            recibe 403 con el permiso que le falta.
          </p>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Permiso</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Da acceso a</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map(([perm, desc]) => (
                  <tr key={perm}>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{perm}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="base-url" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>URL base y convenciones</h2>
          <div className="rounded-lg p-4 mb-4 font-mono text-sm" style={codeBox}>
            <span style={{ color: "#d1345b" }}>{API_BASE}</span>
          </div>
          <ul className="space-y-2 pl-4 mb-6" style={{ color: "var(--muted-foreground)" }}>
            <li>• JSON en UTF-8 de ida y vuelta; fechas en ISO 8601.</li>
            <li>• Listados paginados con <code>page</code> y <code>limit</code> (máximo 1000 en general; algunos listados, como campañas o notificaciones, tienen un tope menor indicado en la referencia); la respuesta trae <code>pagination</code> con <code>total</code> y <code>pages</code>.</li>
            <li>• <code>search</code> es una coincidencia parcial literal, sin distinguir mayúsculas.</li>
            <li>• Los identificadores son ObjectId de 24 caracteres hexadecimales; uno mal formado responde 400.</li>
            <li>• Todo está acotado a la organización del token: un id de otra organización responde 404.</li>
            <li>• Cambios aditivos: nunca se renombran ni se quitan campos de una respuesta publicada; lo que sobra se marca <em>deprecated</em>.</li>
          </ul>
          <div className="rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Módulos principales (la lista completa está en la referencia)</div>
            <table className="w-full text-sm">
              <tbody>
                {modules.map((m) => (
                  <tr key={m.path}>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{m.path}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{m.name}</td>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{m.perms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Callout type="tip">
          Dos guías aparte para módulos con reglas propias:{" "}
          <Link href="/docs/ciudades" style={{ color: "#d1345b" }}>Ciudades (catálogo DANE)</Link>, que explica{" "}
          <code>cityCode</code> y el 422 <code>CITY_UNRESOLVED</code> de contactos y empresas, y{" "}
          <Link href="/docs/envios" style={{ color: "#d1345b" }}>Envíos</Link>, con la idempotencia de{" "}
          <code>POST /shipments</code> (generar una guía cobra saldo).
        </Callout>

        <section id="reference" className="mb-10 mt-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Referencia de endpoints</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La referencia se genera en cada despliegue desde el spec OpenAPI 3.1 del backend, así
            que siempre coincide con lo que hay en producción. Puedes verla aquí, abrirla completa en{" "}
            <a href={`${API_BASE}/docs`} target="_blank" rel="noopener noreferrer" style={{ color: "#d1345b" }}>api.fusioncol.com/api/docs</a>{" "}
            o descargar el spec en{" "}
            <a href={SPEC_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#d1345b" }}>openapi.json</a>{" "}
            para importarlo en Postman, Insomnia o generar un cliente.
          </p>
          <SwaggerEmbed specUrl={SPEC_URL} />
        </section>

        <section id="webhooks" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Webhooks salientes</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            FusionCRM avisa a tu sistema de dos maneras. Los cuerpos exactos, con ejemplos, están
            en la sección <em>Webhooks</em> de la referencia de arriba.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg border" style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
              <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>Webhook de etapa — <code style={{ color: "#d1345b" }}>conversation.stage.entered</code></p>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                En Configuración → Conversaciones, cada columna del pipeline puede llevar una URL.
                Cuando una conversación entra a esa etapa (desde la app, la API, el MCP o una
                automatización) FusionCRM hace un POST con el contacto, la etapa anterior y la
                nueva, el pipeline, el asesor asignado y el origen del movimiento (usuario,
                automatización o sistema). En la configuración de la etapa ves si el último envío
                funcionó o el motivo del error. Headers <code>X-Fusioncrm-Event</code> y{" "}
                <code>X-Fusioncrm-Organization</code>; 10 segundos de espera, sin reintentos ni firma:
                protege la URL con un secreto en la ruta.
              </p>
            </div>
            <div className="p-4 rounded-lg border" style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
              <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>Petición HTTP desde una automatización</p>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Los eventos de negocio (negocio cambió de etapa, cotización creada, factura emitida,
                formulario enviado, contacto o empresa nuevos, mensaje entrante, cotización vista,
                factura vencida, cita próxima) se envían con la acción{" "}
                <strong style={{ color: "var(--foreground)" }}>Petición HTTP</strong> de una automatización.
                Tú defines URL, método, headers y cuerpo con variables como{" "}
                <code>{"{{trigger.quotation_total}}"}</code> o <code>{"{{contact.email}}"}</code>; la
                referencia documenta qué trae <code>trigger</code> en cada disparador. Cada evento
                lleva un <code>eventId</code> estable para que puedas deduplicar.
              </p>
            </div>
          </div>
          <Callout type="tip">
            Para recibir datos <em>hacia</em> FusionCRM no necesitas un webhook especial: usa la API
            (por ejemplo <code>POST /contacts</code>) o el envío server-to-server de un{" "}
            <Link href="/docs/forms" style={{ color: "#d1345b" }}>formulario web</Link>, que además
            deduplica y registra el origen del lead.
          </Callout>
        </section>

        <section id="audit-log" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Registro de auditoría</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En el plan <strong>Empresarial</strong>, <code>GET /api/audit-log</code> devuelve quién hizo qué en la
            cuenta, del más reciente al más antiguo. Es de solo lectura, pide <code>settings:read</code> y el
            token tiene que ser de un propietario.
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Filtros: <code>type</code> (uno o varios separados por coma, por ejemplo <code>CONTACT_UPDATE,DEAL_STAGE_CHANGE</code>), <code>userId</code>, <code>contactId</code>, <code>companyId</code>, <code>from</code> y <code>to</code> (ISO 8601).</li>
            <li>• Paginación: <code>page</code> y <code>limit</code> (de 1 a 100, 50 por defecto).</li>
            <li>• Cada registro trae <code>type</code>, <code>timestamp</code>, el usuario, el contacto o la empresa que tocó, <code>data</code> y, cuando aplica, la IP, el navegador y los cambios.</li>
          </ul>
        </section>

        <section id="errors" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Errores y límites del plan</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los errores de autenticación y permisos vienen con <code>message</code> y <code>code</code>;
            los de validación de cada módulo con <code>success: false</code> y <code>error</code>.
          </p>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>HTTP</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>code</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Cuándo</th>
                </tr>
              </thead>
              <tbody>
                {errors.map(([http, code, when]) => (
                  <tr key={`${http}-${code}`}>
                    <td className="p-3 border-b font-mono text-xs font-bold" style={{ borderColor: "var(--border)", color: http.startsWith("4") ? "#ef4444" : "#f59e0b" }}>{http}</td>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{code}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "var(--muted-foreground)" }}>
            Aplican los mismos topes y funciones del plan que en la app (contactos, empresas, listas,
            formularios, landing pages, documentos de conocimiento; campañas de WhatsApp, agentes IA,
            lead scoring, reportes personalizados y plantillas PDF desde el plan Pro). Leer, borrar y
            desprogramar nunca se bloquean por el plan: si bajas de plan, sigues consultando lo que ya
            tenías. Si <code>create_contact</code> (o <code>POST /contacts</code> con empresa) no tiene cupo de
            empresas, el contacto se crea sin empresa y la respuesta trae{" "}
            <code>{'warnings: ["COMPANY_PLAN_LIMIT_REACHED"]'}</code>.
          </p>
          <p className="mt-3" style={{ color: "var(--muted-foreground)" }}>
            Además, cada usuario que no sea el propietario tiene un <strong style={{ color: "var(--foreground)" }}>tope por hora</strong>,
            que aplica igual a la API y al MCP: 200 creaciones, 300 ediciones y 30 envíos (WhatsApp o
            correo), y no puede borrar por API salvo que el propietario lo active (entonces, 20 borrados
            por hora). Si llega al tope recibe un 429 <code>API_QUOTA_EXCEEDED</code> con el tiempo de
            espera en <code>Retry-After</code>, y el propietario recibe un aviso. El propietario no tiene
            topes y puede ajustar los de cada usuario en Configuración → Usuarios → Acceso por API. Las
            lecturas no tienen tope; aun así, usa <code>limit</code> alto en vez de muchas páginas pequeñas.
          </p>
          <p className="mt-3" style={{ color: "var(--muted-foreground)" }}>
            Si la cuenta queda en pausa porque la prueba gratis o el plan vencieron, la API sigue leyendo
            y exportando, pero las escrituras y los envíos responden 403 <code>ACCOUNT_RESTRICTED</code> hasta
            que el propietario pague. El plan y los pagos no se manejan por la API pública: se hacen en la
            app (Configuración → Plan), que calcula cada cobro en el servidor con{" "}
            <code>POST /api/v1/plans/quote</code> con la sesión del propietario.
          </p>
        </section>

        <DocNav
          prev={{ href: "/docs/settings", title: "Configuración" }}
          next={{ href: "/docs/ciudades", title: "Ciudades: catálogo DANE" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
