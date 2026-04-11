import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Configuración" };

const toc = [
  { id: "overview", label: "Panel de configuración" },
  { id: "organization", label: "Organización" },
  { id: "users", label: "Usuarios y permisos" },
  { id: "fields", label: "Campos personalizados" },
  { id: "integrations", label: "Integraciones" },
  { id: "email-settings", label: "Configuración de email" },
  { id: "lead-scoring", label: "Lead Scoring" },
  { id: "mcp", label: "MCP Connectors" },
  { id: "api-keys", label: "API Keys" },
  { id: "security", label: "Seguridad" },
  { id: "plan", label: "Plan y facturación" },
];

export default function SettingsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Configuración</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El panel de configuración permite personalizar cada aspecto de FusionCRM para tu
          organización: desde el perfil de empresa hasta integraciones avanzadas con IA.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Panel de configuración</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Accede desde la barra lateral → Configuración (ícono ⚙️). El panel está organizado
            en secciones en una barra lateral izquierda:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {[
              { section: "Organización", desc: "Logo, nombre, dirección, datos de empresa" },
              { section: "Usuarios", desc: "Equipo, roles, invitaciones" },
              { section: "Seguridad", desc: "Contraseñas, 2FA, sesiones" },
              { section: "Campos de contacto", desc: "Campos personalizados" },
              { section: "Deals", desc: "Pipelines y etapas" },
              { section: "Email", desc: "Cuentas de correo, firma, auto-responder" },
              { section: "Facturas", desc: "Config DIAN, plantilla de factura" },
              { section: "Cotizaciones", desc: "Plantilla, numeración" },
              { section: "Conversaciones", desc: "WhatsApp, canales de chat" },
              { section: "Lead Scoring", desc: "Reglas de puntuación" },
              { section: "Automatizaciones", desc: "Lista de workflows activos" },
              { section: "Integraciones", desc: "Conectores externos" },
              { section: "API", desc: "Claves API, documentación" },
              { section: "MCP Connectors", desc: "IA y conectores MCP" },
              { section: "Plan y facturación", desc: "Suscripción, pagos" },
            ].map((s) => (
              <div key={s.section} className="flex gap-2 p-3 rounded border text-sm" style={{ borderColor: "var(--border)" }}>
                <span style={{ color: "#d1345b" }}>⚙</span>
                <div>
                  <span className="font-medium" style={{ color: "var(--foreground)" }}>{s.section}:</span>
                  <span className="ml-1" style={{ color: "var(--muted-foreground)" }}>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <Callout type="note">
            Solo los usuarios con rol <strong>Administrador</strong> u <strong>Propietario</strong> tienen
            acceso completo a la configuración. Los usuarios regulares solo pueden ver algunas
            secciones como Email y su propio perfil.
          </Callout>
        </section>

        <section id="organization" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Organización</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Configura los datos de tu empresa que aparecerán en cotizaciones, facturas y comunicaciones:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Nombre de la organización</strong></li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Logo</strong> (PNG o JPG, máx 2MB, fondo transparente recomendado)</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>NIT / Identificación tributaria</strong></li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Dirección</strong> (calle, ciudad, país)</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Teléfono de contacto</strong></li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Sitio web</strong></li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Zona horaria</strong></li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Moneda predeterminada</strong></li>
          </ul>
        </section>

        <section id="users" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Usuarios y permisos</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Gestiona los miembros del equipo que tienen acceso a FusionCRM.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Roles de usuario</h3>
          <div className="rounded-lg overflow-hidden border mb-6" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Roles disponibles</div>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Rol</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Permisos</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Propietario", "Acceso total. Solo uno por organización. Puede eliminar la organización."],
                  ["Administrador", "Acceso total a configuración, usuarios, exportaciones y todas las funciones."],
                  ["Vendedor", "Gestión de contactos, deals, conversaciones, cotizaciones y facturas. Sin acceso a configuración avanzada."],
                  ["Solo lectura", "Puede ver datos pero no crear, editar ni eliminar nada."],
                ].map(([r, p]) => (
                  <tr key={r}>
                    <td className="p-3 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{r}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Invitar usuarios</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a Configuración → Usuarios</li>
            <li>2. Haz clic en "Invitar usuario"</li>
            <li>3. Ingresa el email del nuevo usuario</li>
            <li>4. Selecciona el rol que tendrá</li>
            <li>5. Envía la invitación. El usuario recibirá un email para activar su cuenta.</li>
          </ol>
          <Callout type="tip">
            Los usuarios invitados deben aceptar la invitación dentro de 72 horas. Puedes
            reenviar la invitación desde la lista de usuarios si expira.
          </Callout>
        </section>

        <section id="fields" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Campos personalizados</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los campos personalizados te permiten agregar información adicional a los contactos
            más allá de los campos estándar. Consulta la documentación de{" "}
            <a href="/docs/contacts#custom-fields" style={{ color: "#d1345b" }}>Contactos → Campos personalizados</a>{" "}
            para más detalles.
          </p>
        </section>

        <section id="integrations" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Integraciones</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Desde Configuración → Integraciones puedes gestionar todas las conexiones con
            servicios externos. Ver la documentación completa en{" "}
            <a href="/docs/integrations" style={{ color: "#d1345b" }}>Integraciones</a>.
          </p>
        </section>

        <section id="email-settings" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Configuración de email</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Configura las cuentas de email conectadas, firma HTML personal, plantillas de email
            y reglas de auto-responder. Accede desde Configuración → Email.
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Conectar/desconectar cuentas de Gmail, Outlook o IMAP</li>
            <li>• Configurar firma de email por usuario</li>
            <li>• Plantillas de email reutilizables</li>
            <li>• Auto-responder para emails entrantes</li>
            <li>• Horarios de envío permitidos (evitar envíos fuera de horario laboral)</li>
          </ul>
        </section>

        <section id="lead-scoring" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Lead Scoring</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Configura las reglas que determinan el puntaje de cada contacto. Ver documentación
            completa en <a href="/docs/lead-scoring" style={{ color: "#d1345b" }}>Lead Scoring</a>.
          </p>
        </section>

        <section id="mcp" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>MCP Connectors</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El protocolo MCP (Model Context Protocol) permite conectar FusionCRM con modelos
            de inteligencia artificial externos como Claude (Anthropic), GPT-4 (OpenAI) y otros.
          </p>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Con los conectores MCP puedes:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Dar acceso a una IA a los datos del CRM para responder preguntas</li>
            <li>• Permitir que la IA cree contactos, deals o actividades desde una conversación</li>
            <li>• Conectar agentes de IA personalizados al flujo de atención al cliente</li>
            <li>• Integrar con herramientas como Claude Desktop o n8n con IA</li>
          </ul>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Configurar un conector MCP</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a Configuración → MCP Connectors</li>
            <li>2. Haz clic en "+ Nuevo conector"</li>
            <li>3. Selecciona el tipo de cliente MCP (Claude, GPT, personalizado)</li>
            <li>4. Configura los permisos de acceso (lectura, escritura)</li>
            <li>5. Copia la URL del servidor MCP generada</li>
            <li>6. Configura el cliente MCP externo con esa URL</li>
          </ol>
          <Callout type="warning">
            Los conectores MCP tienen acceso a datos sensibles del CRM. Configura solo los
            permisos mínimos necesarios y revisa regularmente qué acciones ejecuta la IA.
          </Callout>
        </section>

        <section id="api-keys" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>API Keys</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las API Keys permiten a aplicaciones externas interactuar con FusionCRM a través
            de la API REST.
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a Configuración → API</li>
            <li>2. Haz clic en "+ Generar nueva API Key"</li>
            <li>3. Asigna un nombre descriptivo (ej. "Integración N8N")</li>
            <li>4. Copia y guarda la clave. Solo se muestra una vez.</li>
          </ol>
          <Callout type="danger">
            Nunca compartas tu API Key públicamente ni la incluyas en código del lado del cliente.
            Si una clave se compromete, revócala inmediatamente desde este panel y genera una nueva.
          </Callout>
        </section>

        <section id="security" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Seguridad</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Opciones de seguridad disponibles en Configuración → Seguridad:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>2FA (autenticación de dos factores):</strong> Activa para toda la organización</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Políticas de contraseña:</strong> Longitud mínima, complejidad requerida</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Sesiones activas:</strong> Ver y revocar sesiones activas de usuarios</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Log de auditoría:</strong> Registro de acciones realizadas por usuarios</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>IP permitidas:</strong> Restricción de acceso por rango de IP (plan Enterprise)</li>
          </ul>
        </section>

        <section id="plan" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Plan y facturación</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Desde Configuración → Plan puedes:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Ver el plan actual y sus límites (usuarios, contactos, almacenamiento)</li>
            <li>• Actualizar a un plan superior</li>
            <li>• Ver el historial de facturas</li>
            <li>• Actualizar el método de pago</li>
            <li>• Cancelar la suscripción</li>
          </ul>
          <Callout type="tip">
            Para descuentos por volumen o planes Enterprise personalizados, contacta al equipo
            comercial en <strong style={{ color: "#d1345b" }}>ventas@fusioncol.com</strong>.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/projects", title: "Proyectos" }}
          next={{ href: "/docs/api", title: "API Externa" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
