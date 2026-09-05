import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";
import SwaggerEmbed from "@/components/SwaggerEmbed";

export const metadata: Metadata = { title: "API REST" };

const API_BASE = "https://api.fusioncol.com/api";
const SPEC_URL = `${API_BASE}/openapi.json`;

const toc = [
  { id: "overview", label: "Qué incluye" },
  { id: "auth", label: "Autenticación y tokens" },
  { id: "permissions", label: "Permisos" },
  { id: "base-url", label: "URL base y convenciones" },
  { id: "reference", label: "Referencia de endpoints" },
  { id: "webhooks", label: "Webhooks salientes" },
  { id: "errors", label: "Errores y límites del plan" },
];

const modules = [
  { path: "/contacts", name: "Contactos", perms: "contacts:*" },
  { path: "/companies", name: "Empresas (B2B)", perms: "companies:*" },
  { path: "/deals", name: "Negocios", perms: "deals:*" },
  { path: "/forms", name: "Formularios web y sus envíos", perms: "forms:*" },
  { path: "/conversations", name: "Conversaciones, pipelines y etapas", perms: "conversations:*" },
  { path: "/whatsapp", name: "Envío de WhatsApp y plantillas", perms: "whatsapp:send / whatsapp:read" },
  { path: "/quotations", name: "Cotizaciones y su PDF", perms: "quotations:*" },
  { path: "/products", name: "Productos y variantes", perms: "products:*" },
  { path: "/invoices", name: "Facturación electrónica (DIAN)", perms: "invoices:*" },
  { path: "/projects", name: "Proyectos", perms: "projects:*" },
  { path: "/tasks", name: "Tareas", perms: "tasks:*" },
  { path: "/lists", name: "Listas de contactos", perms: "contacts:*" },
  { path: "/fragments", name: "Respuestas rápidas", perms: "fragments:*" },
  { path: "/library", name: "Biblioteca de archivos", perms: "library:*" },
  { path: "/rag", name: "Base de conocimiento (RAG)", perms: "rag:*" },
  { path: "/agents", name: "Agentes IA", perms: "agents:*" },
  { path: "/agent-context", name: "Contexto de cliente para agentes", perms: "conversations:read / agents:write" },
];

const permissions = [
  ["contacts:read · contacts:write · contacts:delete", "Contactos y listas de contactos"],
  ["companies:read · companies:write · companies:delete", "Empresas"],
  ["deals:read · deals:write · deals:delete", "Negocios"],
  ["forms:read · forms:write", "Formularios, sus respuestas y el envío server-to-server"],
  ["conversations:read · conversations:write · conversations:delete", "Conversaciones, mensajes, pipelines y etapas"],
  ["whatsapp:send · whatsapp:read", "Enviar mensajes y plantillas; listar plantillas"],
  ["quotations:read · quotations:write · quotations:delete", "Cotizaciones"],
  ["products:read · products:write", "Productos"],
  ["invoices:read · invoices:write", "Facturas (requiere el módulo de facturación)"],
  ["projects:read · projects:write · tasks:read · tasks:write", "Proyectos y tareas"],
  ["fragments:read · fragments:write · fragments:delete", "Respuestas rápidas"],
  ["library:read · library:write", "Biblioteca (solo metadatos; la subida vive en la app)"],
  ["rag:read · rag:write · rag:delete", "Base de conocimiento"],
  ["agents:read · agents:write", "Agentes IA y prueba de prompts (gasta créditos de OpenAI)"],
  ["*", "Acceso completo"],
];

const errors = [
  ["401", "API_TOKEN_MISSING / API_TOKEN_INVALID", "Falta el token, es inválido, expiró o fue revocado."],
  ["403", "INSUFFICIENT_API_PERMISSIONS", "El token no tiene el permiso de la operación (la respuesta lista requiredPermission)."],
  ["403", "PLAN_MODULE_REQUIRED", "El plan de la organización no incluye el módulo API (o el de facturación, en /invoices)."],
  ["403", "PLAN_LIMIT_REACHED", "Se alcanzó un límite del plan al crear (contactos, cotizaciones, facturas, listas, documentos RAG)."],
  ["400", "—", "Datos inválidos: el cuerpo lleva success:false y error con el motivo."],
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
              { title: "17 módulos, 98 operaciones", desc: "Cada endpoint documentado con parámetros, cuerpo, respuestas y ejemplos validados." },
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
            como herramientas para Claude, ChatGPT o Cursor.
          </p>
          <Callout type="note">
            La API y el MCP son parte del <strong>módulo API</strong> del plan. Si tu plan no lo
            incluye, cualquier llamada responde 403 con el código <code>PLAN_MODULE_REQUIRED</code>.
            Puedes activarlo desde Configuración → Plan.
          </Callout>
        </section>

        <section id="auth" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Autenticación y tokens</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La API se autentica con <strong style={{ color: "var(--foreground)" }}>tokens de API</strong>,
            que crea el propietario de la organización en <strong style={{ color: "var(--foreground)" }}>Configuración → Desarrollador → API</strong>:
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Pulsa <em>Crear nuevo token</em> y ponle un nombre que diga para qué es (ej. <code>integracion-n8n</code>).</li>
            <li>2. Elige la expiración: 30 días, 90 días, 1 año o sin expiración.</li>
            <li>3. Marca los permisos. Hay presets (Solo lectura, Ventas, Acceso completo) o puedes marcarlos uno por uno.</li>
            <li>4. Copia el token: <strong style={{ color: "var(--foreground)" }}>solo se muestra una vez</strong>. Desde la misma pantalla puedes revocarlo cuando quieras.</li>
          </ol>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Envíalo en cualquiera de los dos headers (basta uno):
          </p>
          <div className="rounded-lg p-4 mb-4 font-mono text-sm space-y-1" style={codeBox}>
            <div><span style={{ color: "#8b5cf6" }}>Authorization</span>: <span style={{ color: "#d1345b" }}>Bearer &lt;token&gt;</span></div>
            <div><span style={{ color: "#8b5cf6" }}>X-API-Key</span>: <span style={{ color: "#d1345b" }}>&lt;token&gt;</span></div>
          </div>
          <div className="rounded-lg p-4 mb-4" style={codeBox}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>Ejemplo: listar contactos</p>
            <pre className="text-sm overflow-x-auto" style={{ color: "var(--foreground)" }}>{`curl "${API_BASE}/contacts?page=1&limit=50" \\
  -H "Authorization: Bearer <token>"`}</pre>
          </div>
          <div className="rounded-lg p-4 mb-4" style={codeBox}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>Ejemplo: crear un contacto (si ya existe por email o celular, responde 200 con el existente)</p>
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
            <li>• Listados paginados con <code>page</code> y <code>limit</code> (máximo 1000); la respuesta trae <code>pagination</code> con <code>total</code> y <code>pages</code>.</li>
            <li>• <code>search</code> es una coincidencia parcial literal, sin distinguir mayúsculas.</li>
            <li>• Los identificadores son ObjectId de 24 caracteres hexadecimales; uno mal formado responde 400.</li>
            <li>• Todo está acotado a la organización del token: un id de otra organización responde 404.</li>
            <li>• Cambios aditivos: nunca se renombran ni se quitan campos de una respuesta publicada; lo que sobra se marca <em>deprecated</em>.</li>
          </ul>
          <div className="rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Módulos disponibles</div>
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

        <section id="reference" className="mb-10">
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
                nueva, el pipeline y quién la movió. Headers <code>X-Fusioncrm-Event</code> y{" "}
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
            Los límites que aplican son los del plan (contactos, cotizaciones, facturas, listas,
            documentos de conocimiento), los mismos que en la app. No hay un tope de peticiones por
            minuto para tokens de API; sé razonable con los listados y usa <code>limit</code> alto en
            vez de muchas páginas pequeñas.
          </p>
        </section>

        <DocNav
          prev={{ href: "/docs/settings", title: "Configuración" }}
          next={{ href: "/docs/mcp", title: "MCP: el CRM desde tu IA" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
