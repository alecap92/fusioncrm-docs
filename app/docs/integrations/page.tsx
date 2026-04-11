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
  { id: "webhooks", label: "Webhooks entrantes" },
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
              { name: "N8N", status: "Webhook", color: "#EA5B0C", desc: "Automatizaciones avanzadas" },
              { name: "Facebook", status: "API", color: "#1877F2", desc: "Leads y mensajes FB" },
              { name: "Instagram", status: "API", color: "#E4405F", desc: "DMs y comentarios" },
              { name: "LinkedIn", status: "Próximo", color: "#0A66C2", desc: "Prospectos B2B" },
              { name: "Webhooks", status: "REST", color: "#6b7280", desc: "Cualquier sistema con API" },
              { name: "MCP (IA)", status: "Nativo", color: "#1f2a48", desc: "Modelos de lenguaje" },
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
            N8N es una plataforma de automatización de flujos de trabajo open-source. La integración
            con FusionCRM permite construir automatizaciones más complejas que las que ofrece el
            editor de workflows nativo.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Casos de uso con N8N</h3>
          <div className="space-y-3 mb-4">
            {[
              { case: "Sincronización con ERP", desc: "Cuando se crea una factura en FusionCRM, crea la misma entrada en tu ERP contable." },
              { case: "Lead desde formulario web", desc: "Captura leads de tu sitio web (Typeform, Google Forms) y crea contactos en FusionCRM automáticamente." },
              { case: "Notificaciones en Slack/Teams", desc: "Cuando se cierra un deal importante, notifica al equipo en el canal de Slack." },
              { case: "Enriquecimiento de datos", desc: "Cuando se crea un contacto, busca información adicional en LinkedIn o Clearbit y actualiza el perfil." },
            ].map((c) => (
              <div key={c.case} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{c.case}</p>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Conectar N8N</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. En N8N, agrega el nodo HTTP Request</li>
            <li>2. Usa la URL base de la API de FusionCRM: <code style={{ color: "#d1345b" }}>https://api.fusioncol.com/v1</code></li>
            <li>3. Configura la autenticación con tu API Key en el header Authorization</li>
            <li>4. Para recibir eventos de FusionCRM, usa el nodo Webhook de N8N y configúralo en Configuración → Webhooks</li>
          </ol>
          <Callout type="tip">
            FusionCRM también tiene un nodo nativo en N8N. Busca "FusionCRM" en la biblioteca
            de nodos de N8N para una integración simplificada sin configuración manual.
          </Callout>
        </section>

        <section id="webhooks" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Webhooks entrantes</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            FusionCRM puede recibir webhooks de sistemas externos para crear o actualizar datos
            automáticamente. Útil para integrar formularios web, e-commerce, ERPs y más.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Configurar webhook entrante</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a Configuración → Integraciones → Webhooks entrantes</li>
            <li>2. Crea un nuevo webhook y obtén la URL única generada</li>
            <li>3. Configura el mapping de campos (qué campo del JSON va a qué campo del CRM)</li>
            <li>4. Configura el sistema externo para enviar un POST a esa URL</li>
          </ol>
          <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>Ejemplo: Crear contacto desde formulario web</p>
            <pre className="text-sm" style={{ color: "var(--foreground)" }}>{`POST https://api.fusioncol.com/webhooks/abc123xyz
{
  "name": "María López",
  "email": "maria@empresa.com",
  "phone": "3109876543",
  "company": "Empresa SAS",
  "source": "landing-page-enero-2025"
}`}</pre>
          </div>
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
          prev={{ href: "/docs/api", title: "API Externa" }}
          next={{ href: "/docs/spikey", title: "Spikey AI" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
