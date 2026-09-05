import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Integraciones" };

const toc = [
  { id: "overview", label: "Integraciones disponibles" },
  { id: "whatsapp", label: "WhatsApp Business" },
  { id: "n8n", label: "N8N" },
  { id: "webhooks", label: "Webhooks y datos entrantes" },
  { id: "social", label: "Redes sociales" },
  { id: "gmail", label: "Gmail y Outlook" },
];

export default function IntegrationsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Integraciones</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          FusionCRM se conecta con las herramientas más populares del ecosistema empresarial:
          WhatsApp Business, N8N, email, redes sociales y más.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Integraciones disponibles</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {[
              { name: "WhatsApp Business", status: "Nativo", color: "#25D366", desc: "Canal principal de mensajería" },
              { name: "Gmail", status: "OAuth", color: "#EA4335", desc: "Email de Google Workspace" },
              { name: "Outlook / M365", status: "OAuth", color: "#0078D4", desc: "Email de Microsoft" },
              { name: "N8N / Make / Zapier", status: "API", color: "#EA5B0C", desc: "Por la API REST y peticiones HTTP" },
              { name: "Facebook Messenger", status: "OAuth", color: "#1877F2", desc: "Mensajes de la página" },
              { name: "Instagram", status: "OAuth", color: "#E4405F", desc: "Mensajes directos" },
              { name: "API REST", status: "Nativo", color: "#6b7280", desc: "98 operaciones con tokens por permiso" },
              { name: "MCP (IA)", status: "Nativo", color: "#1f2a48", desc: "Claude, ChatGPT, Cursor" },
              { name: "Formularios web", status: "Nativo", color: "#0f766e", desc: "Link, embed o webhook" },
            ].map((i) => (
              <div key={i.name} className="p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{i.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ backgroundColor: i.status === "Próximo" ? "var(--muted)" : `${i.color}20`, color: i.color }}>
                    {i.status}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{i.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="whatsapp" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>WhatsApp Business</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La integración con WhatsApp Business API (Meta) es el canal de comunicación principal
            de FusionCRM. A diferencia de WhatsApp Web, la API oficial permite:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Múltiples agentes atendiendo desde el mismo número</li>
            <li>• Envíos masivos con templates aprobados</li>
            <li>• Integración completa con el CRM (contactos, deals)</li>
            <li>• Sin necesidad de tener el teléfono conectado</li>
            <li>• Analytics de mensajes (entregados, leídos)</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Requisitos para conectar WhatsApp</h3>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Cuenta de empresa verificada en Meta Business Manager</li>
            <li>• Número de teléfono no vinculado a WhatsApp personal o WhatsApp Business App</li>
            <li>• Número con capacidad de recibir SMS o llamada para verificación</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Proceso de conexión</h3>
          <ol className="space-y-3 mb-4">
            {[
              { n: "1", t: "Configura Meta Business Manager", d: "Crea una cuenta en business.facebook.com si no tienes una. Verifica tu empresa." },
              { n: "2", t: "Crea una app en Meta Developers", d: "Agrega el producto WhatsApp Business a tu app." },
              { n: "3", t: "Conecta en FusionCRM", d: "Ve a Configuración → WhatsApp → Conectar y sigue el proceso de autorización OAuth." },
              { n: "4", t: "Configura el webhook", d: "FusionCRM proporciona una URL de webhook. Agrégala en la configuración de tu app de Meta." },
              { n: "5", t: "Prueba la conexión", d: "Envía un mensaje de prueba desde FusionCRM para verificar que funciona." },
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
          <Callout type="warning">
            El proceso de aprobación de WhatsApp Business API puede tomar entre 1 y 5 días
            hábiles dependiendo del estado de verificación de tu empresa en Meta.
          </Callout>
        </section>

        <section id="n8n" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>N8N</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            N8N (igual que Make o Zapier) es una plataforma de automatización externa. Úsala cuando
            necesites conectar FusionCRM con sistemas que el editor de automatizaciones nativo no
            alcanza: un ERP, una hoja de cálculo, Slack, un enriquecedor de datos.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Casos de uso con N8N</h3>
          <div className="space-y-3 mb-4">
            {[
              { case: "Sincronización con ERP", desc: "Cuando se crea una factura en FusionCRM, crea la misma entrada en tu ERP contable." },
              { case: "Lead desde otra fuente", desc: "Un formulario de Typeform o una hoja de Google crea el contacto con POST /contacts (para tu propio sitio usa mejor los Formularios web nativos)." },
              { case: "Notificaciones en Slack/Teams", desc: "Una automatización con la acción Petición HTTP llama a tu flujo de n8n cuando un negocio cambia de etapa o llega una cotización." },
              { case: "Enriquecimiento de datos", desc: "Cuando se crea un contacto, n8n consulta un proveedor externo y actualiza el perfil con PUT /contacts/{id}." },
            ].map((c) => (
              <div key={c.case} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{c.case}</p>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Conectar N8N</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Crea un token en Configuración → Desarrollador → API con los permisos que necesite el flujo.</li>
            <li>2. En n8n usa el nodo <em>HTTP Request</em> contra <code style={{ color: "#d1345b" }}>https://api.fusioncol.com/api</code> con el header <code>Authorization: Bearer &lt;token&gt;</code>.</li>
            <li>3. Para que FusionCRM llame a n8n, crea una automatización con el disparador que te interese y la acción <em>Petición HTTP</em> apuntando a la URL del nodo <em>Webhook</em> de n8n; o pon esa URL como webhook de una columna del pipeline de conversaciones.</li>
          </ol>
          <Callout type="tip">
            No hay un nodo «FusionCRM» en n8n: con el nodo HTTP Request y la{" "}
            <a href="/docs/api" style={{ color: "#d1345b" }}>referencia de la API</a> tienes todo. Si
            lo que quieres es que una IA opere el CRM, mira <a href="/docs/mcp" style={{ color: "#d1345b" }}>MCP</a>.
          </Callout>
        </section>

        <section id="webhooks" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Webhooks y datos entrantes</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            <strong style={{ color: "var(--foreground)" }}>Hacia FusionCRM</strong> hay dos puertas: la API (cualquier
            recurso, con token) y el webhook de un <a href="/docs/forms" style={{ color: "#d1345b" }}>formulario web</a>,
            pensado para leads: deduplica por correo o celular, guarda el origen y puede abrir un
            negocio y avisar al equipo. Cada formulario tiene su URL con una clave pública revocable:
          </p>
          <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>Ejemplo: lead desde un formulario propio</p>
            <pre className="text-sm overflow-x-auto" style={{ color: "var(--foreground)" }}>{`POST https://forms.fusioncol.com/api/v1/forms/submit/<formId>?key=fk_xxxxxxxx
{
  "nombre": "María López",
  "email": "maria@empresa.com",
  "celular": "3109876543",
  "utm_source": "google",
  "utm_campaign": "landing-enero"
}`}</pre>
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            <strong style={{ color: "var(--foreground)" }}>Desde FusionCRM</strong> hacia tu sistema: el webhook de
            etapa del pipeline de conversaciones y la acción <em>Petición HTTP</em> de las
            automatizaciones. Los cuerpos exactos están documentados en{" "}
            <a href="/docs/api#webhooks" style={{ color: "#d1345b" }}>API REST → Webhooks salientes</a>.
          </p>
        </section>

        <section id="social" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Redes sociales</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            FusionCRM se integra con Facebook e Instagram a través de la API de Meta:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              { platform: "Facebook Pages", features: ["Mensajes directos de Facebook", "Leads de Facebook Lead Ads", "Comentarios en posts (monitoreo)"] },
              { platform: "Instagram Business", features: ["Mensajes directos de Instagram", "Menciones y comentarios", "Leads de Instagram Ads"] },
            ].map((p) => (
              <div key={p.platform} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>{p.platform}</p>
                <ul className="space-y-1">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm flex gap-2" style={{ color: "var(--muted-foreground)" }}>
                      <span style={{ color: "#d1345b" }}>•</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Callout type="note">
            Para conectar redes sociales, ve a Configuración → Integraciones → Social Media
            y sigue el proceso de autorización con tu cuenta de Meta Business Manager.
          </Callout>
        </section>

        <section id="gmail" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Gmail y Outlook</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Conecta tu cuenta de Gmail o Microsoft Outlook para gestionar tu correo directamente
            desde FusionCRM sin salir de la plataforma.
          </p>
          <p style={{ color: "var(--muted-foreground)" }}>
            Ver instrucciones detalladas en{" "}
            <a href="/docs/email#connect" style={{ color: "#d1345b" }}>Correo → Conectar cuenta de email</a>.
          </p>
        </section>

        <DocNav
          prev={{ href: "/docs/mcp", title: "MCP: el CRM desde tu IA" }}
          next={{ href: "/docs/agentes-ia", title: "Agentes IA" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
