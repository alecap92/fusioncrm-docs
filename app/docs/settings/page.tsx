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
  { id: "mcp", label: "Conectores MCP" },
  { id: "api-keys", label: "Tokens de API" },
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
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Conectores MCP</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En <strong style={{ color: "var(--foreground)" }}>Configuración → Desarrollador → Conectores MCP</strong> (solo
            propietarios) creas las credenciales con las que Claude, ChatGPT o Cursor se conectan al
            servidor MCP de FusionCRM y operan el CRM con más de 90 herramientas.
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. <em>Crear conector MCP</em> y ponle un nombre que diga desde dónde se conecta (ej. «Claude Desktop - Producción»).</li>
            <li>2. Copia el <strong style={{ color: "var(--foreground)" }}>Client ID</strong> y el <strong style={{ color: "var(--foreground)" }}>Secreto</strong>; el secreto se muestra una sola vez.</li>
            <li>3. En tu cliente de IA agrega un conector personalizado con la URL <code style={{ color: "#d1345b" }}>https://api.fusioncol.com/api/mcp</code> y esas credenciales.</li>
            <li>4. Revócalo desde la misma lista cuando ya no lo uses.</li>
          </ol>
          <p style={{ color: "var(--muted-foreground)" }}>
            Guía completa, clientes soportados y lista de herramientas en{" "}
            <a href="/docs/mcp" style={{ color: "#d1345b" }}>MCP: el CRM desde tu IA</a>.
          </p>
        </section>

        <section id="api-keys" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Tokens de API</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los tokens de API permiten a tus sistemas leer y escribir en FusionCRM por la API REST
            (y también sirven para el MCP). Se crean en{" "}
            <strong style={{ color: "var(--foreground)" }}>Configuración → Desarrollador → API</strong> (solo propietarios).
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. <em>Crear nuevo token</em>: nombre (ej. «integracion-n8n») y descripción.</li>
            <li>2. Expiración: 30 días, 90 días, 1 año o sin expiración.</li>
            <li>3. Permisos: usa un preset (Solo lectura, Ventas, Acceso completo) o marca uno por uno.</li>
            <li>4. Copia el token: solo se muestra una vez. Revócalo desde la misma lista si se filtra.</li>
          </ol>
          <p style={{ color: "var(--muted-foreground)" }}>
            Headers, tabla de permisos y referencia completa en{" "}
            <a href="/docs/api" style={{ color: "#d1345b" }}>API REST</a>. La API y el MCP hacen parte
            del módulo API del plan.
          </p>
        </section>

        <section id="security" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Seguridad</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Lo que encuentras en Configuración → General → Seguridad:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Verificación en dos pasos (2FA):</strong> cada usuario la activa con una app de códigos (Google Authenticator, 1Password…). El propietario puede exigirla a toda la organización: quien no la tenga configurada solo podrá activarla hasta hacerlo.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Sesiones por dispositivo:</strong> ves desde qué navegadores y dispositivos hay sesión abierta y puedes cerrar cualquiera al instante. El propietario puede cerrar todas las sesiones de la organización.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Aviso de dispositivo nuevo:</strong> un correo cuando alguien entra desde un equipo desconocido.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Credenciales cifradas:</strong> las claves de integraciones (WhatsApp, OpenAI, correo) se guardan cifradas en reposo.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Habeas Data:</strong> desde la ficha de un contacto el propietario exporta todos sus datos (JSON o Excel) con consentimientos, origen y respuestas de formularios, para atender una solicitud de la Ley 1581.</li>
          </ul>
        </section>

        <section id="plan" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Plan y facturación</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Hay tres planes: <strong style={{ color: "var(--foreground)" }}>Free</strong>,{" "}
            <strong style={{ color: "var(--foreground)" }}>Pro</strong> y{" "}
            <strong style={{ color: "var(--foreground)" }}>Unlimited</strong>. Los precios y límites vigentes
            están siempre en <a href="https://www.fusioncol.com/precios" style={{ color: "#d1345b" }}>fusioncol.com/precios</a>.
            Desde Configuración → General → Plan puedes:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Ver tu plan, su uso (contactos, usuarios, cotizaciones…) y qué incluye.</li>
            <li>• Subir de plan pagando con tarjeta (Wompi); la renovación es mensual y automática.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Asientos:</strong> cada plan incluye cierto número de usuarios; puedes comprar asientos adicionales en cualquier momento (se cobra la parte proporcional del mes) y liberarlos después. Los usuarios con rol <em>lector</em> no consumen asiento.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Módulos:</strong> la facturación electrónica y el acceso por API/MCP se contratan aparte y se activan por organización.</li>
            <li>• Ver el historial de pagos.</li>
          </ul>
          <Callout type="tip">
            Si necesitas condiciones especiales, escribe a{" "}
            <strong style={{ color: "#d1345b" }}>ventas@fusioncol.com</strong>.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/projects", title: "Proyectos" }}
          next={{ href: "/docs/api", title: "API REST" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
