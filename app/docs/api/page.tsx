import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "API Externa" };

const toc = [
  { id: "overview", label: "Introducción a la API" },
  { id: "auth", label: "Autenticación" },
  { id: "base-url", label: "URL base y versiones" },
  { id: "contacts", label: "Contactos API" },
  { id: "deals", label: "Deals API" },
  { id: "conversations", label: "Conversaciones API" },
  { id: "webhooks", label: "Webhooks" },
  { id: "errors", label: "Manejo de errores" },
  { id: "rate-limits", label: "Rate limits" },
];

export default function ApiPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>API Externa</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          La API REST de FusionCRM permite integrar el CRM con cualquier sistema externo:
          crear contactos desde formularios web, sincronizar deals con ERPs, enviar mensajes
          desde aplicaciones propias y más.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Introducción a la API</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La API de FusionCRM sigue las convenciones REST estándar:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { method: "GET", desc: "Leer datos", color: "#3b82f6" },
              { method: "POST", desc: "Crear registros", color: "#22c55e" },
              { method: "PUT/PATCH", desc: "Actualizar", color: "#f59e0b" },
              { method: "DELETE", desc: "Eliminar", color: "#ef4444" },
            ].map((m) => (
              <div key={m.method} className="p-3 rounded-lg border text-center" style={{ borderColor: m.color, backgroundColor: `${m.color}10` }}>
                <code className="font-bold text-sm" style={{ color: m.color }}>{m.method}</code>
                <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--muted-foreground)" }}>
            Todas las respuestas son en formato <code style={{ color: "#d1345b" }}>JSON</code> con
            codificación UTF-8. Los timestamps están en ISO 8601 (UTC).
          </p>
        </section>

        <section id="auth" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Autenticación</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Todas las peticiones deben incluir tu API Key en el header de autorización:
          </p>
          <div className="rounded-lg p-4 mb-4 font-mono text-sm" style={{ backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: "#22c55e", color: "white" }}>Header</span>
            </div>
            <span style={{ color: "#8b5cf6" }}>Authorization</span>
            <span style={{ color: "var(--muted-foreground)" }}>: </span>
            <span style={{ color: "#d1345b" }}>Bearer YOUR_API_KEY</span>
          </div>
          <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>Ejemplo con curl:</p>
            <pre className="text-sm" style={{ color: "var(--foreground)" }}>{`curl -X GET https://api.fusioncol.com/v1/contacts \\
  -H "Authorization: Bearer sk_live_xxxxxxxxxx" \\
  -H "Content-Type: application/json"`}</pre>
          </div>
          <Callout type="tip">
            Genera tu API Key en Configuración → API → Generar nueva clave. Guárdala en un
            lugar seguro; solo se muestra una vez al crearla.
          </Callout>
        </section>

        <section id="base-url" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>URL base y versiones</h2>
          <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--muted-foreground)" }}>URL base:</p>
            <code style={{ color: "#d1345b" }}>https://api.fusioncol.com/v1</code>
          </div>
          <p style={{ color: "var(--muted-foreground)" }}>
            La versión actual de la API es <strong style={{ color: "var(--foreground)" }}>v1</strong>.
            Cuando se lancen versiones nuevas, la versión anterior se mantiene activa por al menos
            12 meses con avisos de deprecación.
          </p>
        </section>

        <section id="contacts" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Contactos API</h2>
          <div className="space-y-4 mb-4">
            {[
              { method: "GET", path: "/contacts", desc: "Lista todos los contactos con paginación.", params: "page, limit, search, email" },
              { method: "GET", path: "/contacts/:id", desc: "Obtiene un contacto por ID.", params: "id (requerido)" },
              { method: "POST", path: "/contacts", desc: "Crea un nuevo contacto.", params: "Body: nombre, email, telefono, empresa, campos adicionales" },
              { method: "PUT", path: "/contacts/:id", desc: "Actualiza todos los campos de un contacto.", params: "id + body completo" },
              { method: "PATCH", path: "/contacts/:id", desc: "Actualiza campos específicos.", params: "id + campos a actualizar" },
              { method: "DELETE", path: "/contacts/:id", desc: "Elimina un contacto.", params: "id (requerido)" },
            ].map((ep) => (
              <div key={ep.path + ep.method} className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-3 px-4 py-2" style={{ backgroundColor: "var(--muted)" }}>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded font-mono"
                    style={{
                      backgroundColor: ep.method === "GET" ? "#3b82f6" : ep.method === "POST" ? "#22c55e" : ep.method === "PUT" ? "#f59e0b" : ep.method === "PATCH" ? "#f59e0b" : "#ef4444",
                      color: "white",
                    }}
                  >{ep.method}</span>
                  <code className="text-sm font-bold" style={{ color: "var(--foreground)" }}>/v1{ep.path}</code>
                </div>
                <div className="px-4 py-2">
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{ep.desc}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                    <span style={{ color: "#8b5cf6" }}>Params:</span> {ep.params}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>Ejemplo: Crear contacto</p>
            <pre className="text-sm" style={{ color: "var(--foreground)" }}>{`POST /v1/contacts
{
  "nombre": "Juan García",
  "email": "juan@empresa.com",
  "telefono": "3001234567",
  "empresa": "Empresa S.A.",
  "cargo": "Gerente Comercial",
  "ciudad": "Bogotá"
}`}</pre>
          </div>
        </section>

        <section id="deals" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Deals API</h2>
          <div className="space-y-4 mb-4">
            {[
              { method: "GET", path: "/deals", desc: "Lista deals con filtros opcionales.", params: "pipeline_id, stage_id, owner_id, page, limit" },
              { method: "GET", path: "/deals/:id", desc: "Obtiene detalle de un deal.", params: "id" },
              { method: "POST", path: "/deals", desc: "Crea un nuevo deal.", params: "nombre, pipeline_id, stage_id, valor, contacto_id" },
              { method: "PATCH", path: "/deals/:id", desc: "Actualiza un deal.", params: "campos a modificar" },
              { method: "DELETE", path: "/deals/:id", desc: "Elimina un deal.", params: "id" },
            ].map((ep) => (
              <div key={ep.path + ep.method} className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-3 px-4 py-2" style={{ backgroundColor: "var(--muted)" }}>
                  <span className="text-xs font-bold px-2 py-0.5 rounded font-mono" style={{ backgroundColor: ep.method === "GET" ? "#3b82f6" : ep.method === "POST" ? "#22c55e" : ep.method === "PATCH" ? "#f59e0b" : "#ef4444", color: "white" }}>{ep.method}</span>
                  <code className="text-sm font-bold" style={{ color: "var(--foreground)" }}>/v1{ep.path}</code>
                </div>
                <div className="px-4 py-2">
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{ep.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="conversations" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Conversaciones API</h2>
          <div className="space-y-3 mb-4">
            {[
              { method: "GET", path: "/conversations", desc: "Lista conversaciones activas." },
              { method: "GET", path: "/conversations/:id/messages", desc: "Obtiene mensajes de una conversación." },
              { method: "POST", path: "/conversations/:id/messages", desc: "Envía un mensaje (WhatsApp/email)." },
              { method: "POST", path: "/conversations/send-template", desc: "Envía un template de WhatsApp a un contacto." },
            ].map((ep) => (
              <div key={ep.path + ep.method} className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-3 px-4 py-2" style={{ backgroundColor: "var(--muted)" }}>
                  <span className="text-xs font-bold px-2 py-0.5 rounded font-mono" style={{ backgroundColor: ep.method === "GET" ? "#3b82f6" : "#22c55e", color: "white" }}>{ep.method}</span>
                  <code className="text-sm font-bold" style={{ color: "var(--foreground)" }}>/v1{ep.path}</code>
                </div>
                <div className="px-4 py-2">
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{ep.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>Ejemplo: Enviar template WhatsApp</p>
            <pre className="text-sm" style={{ color: "var(--foreground)" }}>{`POST /v1/conversations/send-template
{
  "contacto_id": "abc123",
  "template_name": "recordatorio_cita",
  "language": "es",
  "parameters": ["Juan", "15 de enero", "2:00 PM"]
}`}</pre>
          </div>
        </section>

        <section id="webhooks" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Webhooks</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los webhooks permiten que FusionCRM notifique a tu aplicación cuando ocurren eventos.
            En lugar de hacer polling, tu servidor recibe notificaciones en tiempo real.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Configurar un webhook</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a Configuración → API → Webhooks</li>
            <li>2. Agrega la URL de tu endpoint</li>
            <li>3. Selecciona los eventos a escuchar</li>
            <li>4. FusionCRM enviará un POST a tu URL cuando ocurra el evento</li>
          </ol>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Eventos disponibles</div>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["contact.created", "Nuevo contacto creado"],
                  ["contact.updated", "Contacto actualizado"],
                  ["deal.created", "Nuevo deal creado"],
                  ["deal.stage_changed", "Deal cambió de etapa"],
                  ["deal.closed_won", "Deal cerrado ganado"],
                  ["deal.closed_lost", "Deal cerrado perdido"],
                  ["conversation.message_received", "Nuevo mensaje entrante"],
                  ["invoice.issued", "Factura emitida"],
                ].map(([event, desc]) => (
                  <tr key={event}>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{event}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout type="note">
            Verifica los webhooks comprobando la firma HMAC incluida en el header
            <code style={{ color: "#d1345b" }}> X-FusionCRM-Signature</code> para validar que la
            petición proviene genuinamente de FusionCRM.
          </Callout>
        </section>

        <section id="errors" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Manejo de errores</h2>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Código HTTP</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Significado</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["200 OK", "Solicitud exitosa"],
                  ["201 Created", "Recurso creado exitosamente"],
                  ["400 Bad Request", "Datos inválidos o faltantes"],
                  ["401 Unauthorized", "API Key inválida o faltante"],
                  ["403 Forbidden", "Sin permisos para esa acción"],
                  ["404 Not Found", "Recurso no encontrado"],
                  ["422 Unprocessable Entity", "Error de validación"],
                  ["429 Too Many Requests", "Rate limit excedido"],
                  ["500 Internal Server Error", "Error del servidor"],
                ].map(([code, meaning]) => (
                  <tr key={code}>
                    <td className="p-3 border-b font-mono text-xs font-bold" style={{ borderColor: "var(--border)", color: code.startsWith("2") ? "#22c55e" : code.startsWith("4") ? "#ef4444" : "#f59e0b" }}>{code}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="rate-limits" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Rate limits</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para garantizar la disponibilidad del servicio, la API tiene los siguientes límites:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[
              { plan: "Básico", limit: "100 req/min" },
              { plan: "Pro", limit: "500 req/min" },
              { plan: "Enterprise", limit: "Personalizado" },
            ].map((p) => (
              <div key={p.plan} className="p-3 rounded-lg border text-center" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-bold" style={{ color: "var(--foreground)" }}>{p.plan}</p>
                <p className="text-sm" style={{ color: "#d1345b" }}>{p.limit}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--muted-foreground)" }}>
            El header de respuesta <code style={{ color: "#d1345b" }}>X-RateLimit-Remaining</code> indica
            cuántas peticiones quedan en la ventana actual.
          </p>
        </section>

        <DocNav
          prev={{ href: "/docs/settings", title: "Configuración" }}
          next={{ href: "/docs/integrations", title: "Integraciones" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
