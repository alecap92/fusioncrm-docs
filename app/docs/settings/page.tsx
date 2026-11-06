import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Configuración de la cuenta y la organización",
  description:
    "Ajusta FusionCRM a tu empresa: datos de la organización, usuarios y permisos, líneas de WhatsApp, correo, integraciones, tokens de API, seguridad y tu plan.",
  keywords: ["configuración", "usuarios y permisos", "líneas de WhatsApp", "tokens de API", "seguridad", "plan"],
  alternates: { canonical: "/docs/settings" },
  openGraph: {
    title: "Configuración de la cuenta y la organización",
    description:
      "Ajusta FusionCRM a tu empresa: datos de la organización, usuarios y permisos, líneas de WhatsApp, correo, integraciones, tokens de API, seguridad y tu plan.",
    url: "/docs/settings",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "Panel de configuración" },
  { id: "organization", label: "Organización" },
  { id: "users", label: "Usuarios y permisos" },
  { id: "notifications", label: "Notificaciones" },
  { id: "fields", label: "Campos personalizados" },
  { id: "whatsapp", label: "WhatsApp (líneas)" },
  { id: "conversations", label: "Conversaciones (pipelines)" },
  { id: "integrations", label: "Integraciones" },
  { id: "email-settings", label: "Cuentas de correo" },
  { id: "mass-email", label: "Envío masivo" },
  { id: "email-domains", label: "Dominios" },
  { id: "lead-scoring", label: "Lead Scoring" },
  { id: "mcp", label: "Conectores MCP" },
  { id: "api-keys", label: "Tokens de API" },
  { id: "security", label: "Seguridad" },
  { id: "plantillas-pdf", label: "Plantillas PDF" },
  { id: "import-history", label: "Historial de importaciones" },
  { id: "plan", label: "Plan y facturación" },
  { id: "audit-log", label: "Registro de auditoría", depth: 3 },
];

const groups: { group: string; items: string; note?: string }[] = [
  { group: "General", items: "Organización, WhatsApp, Usuarios, Seguridad, Notificaciones, Plan e Historial de importaciones" },
  { group: "Módulos del CRM", items: "Contactos, Empresas y Negocios (campos personalizados; en Negocios también pipelines y etapas), Conversaciones y Lead Scoring" },
  { group: "Documentos", items: "Cotizaciones y Plantillas PDF" },
  { group: "Correo", items: "Cuentas de correo, Envío masivo y Dominios (Dominios solo lo ve el propietario)" },
  { group: "Automatización", items: "Agentes IA" },
  { group: "Desarrollador", items: "Integraciones, API y Conectores MCP (Conectores MCP solo lo ve el propietario)" },
  { group: "Facturación", items: "Facturación electrónica y Retenciones", note: "solo si tienes Contabilidad (facturación electrónica)" },
  { group: "Envíos", items: "Envíos (Envia.com)", note: "solo si tienes el módulo de Envíos" },
];

export default function SettingsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Configuración</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          En Configuración ajustas FusionCRM a tu empresa: los datos de la organización, tu equipo,
          tus números de WhatsApp, el correo, las integraciones y tu plan.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Panel de configuración</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Entra haciendo clic en el ícono de tu organización, arriba a la derecha →{" "}
            <strong style={{ color: "var(--foreground)" }}>Configuración</strong>. En el celular, abre el
            menú (☰) y toca Configuración. Las secciones están agrupadas así:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {groups.map((s) => (
              <div key={s.group} className="flex gap-2 p-3 rounded border text-sm" style={{ borderColor: "var(--border)" }}>
                <span style={{ color: "#d1345b" }}>⚙</span>
                <div>
                  <span className="font-medium" style={{ color: "var(--foreground)" }}>{s.group}:</span>
                  <span className="ml-1" style={{ color: "var(--muted-foreground)" }}>
                    {s.items}
                    {s.note ? <em> ({s.note})</em> : null}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las automatizaciones no están aquí: se manejan desde el menú{" "}
            <strong style={{ color: "var(--foreground)" }}>Planeación → Automatizaciones</strong>. Los agentes
            IA se configuran en Configuración → Automatización → Agentes IA con tu propia clave de OpenAI o
            Claude (guía en <a href="/docs/agentes-ia" style={{ color: "#d1345b" }}>Agentes IA</a>).
          </p>
          <Callout type="note">
            Lo que ves depende de tu rol. El <strong>propietario</strong> ve y cambia todo. El{" "}
            <strong>empleado</strong> ve casi todas las secciones, menos Dominios y Conectores MCP, y no puede
            crear usuarios ni pagar el plan. El <strong>contador</strong> solo ve Seguridad y Notificaciones.
            Además, algunas funciones (Lead Scoring, Plantillas PDF, Agentes IA, API y Conectores MCP) solo
            se pueden usar si tu plan las incluye: vienen desde el plan Pro.
          </Callout>
        </section>

        <section id="organization" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Organización</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En Configuración → General → Organización llenas los datos de tu empresa que salen en
            cotizaciones, facturas y comunicaciones:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Logo de la Organización</strong> (el que va en tus documentos)</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Icono de la Organización</strong> (el que ves en la barra superior)</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Nombre de la Organización</strong> y <strong style={{ color: "var(--foreground)" }}>Nit</strong></li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Email</strong> (solo lectura) y <strong style={{ color: "var(--foreground)" }}>Teléfono</strong></li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Dirección</strong>, <strong style={{ color: "var(--foreground)" }}>Ciudad</strong> (de la lista de municipios) y <strong style={{ color: "var(--foreground)" }}>Departamento</strong> (se llena solo al elegir la ciudad)</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Idioma y moneda</strong>: definen cómo se muestran los precios y las fechas, por ejemplo en tus cotizaciones.</li>
          </ul>
        </section>

        <section id="users" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Usuarios y permisos</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En Configuración → General → Usuarios manejas a las personas de tu equipo que entran a FusionCRM.
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
                  ["Propietario", "Acceso total: usuarios, plan, exportaciones y toda la configuración. Puede haber más de uno. Ocupa un asiento."],
                  ["Empleado", "Usa todo el CRM, menos lo reservado al propietario (exportar, pagar el plan, crear usuarios). Ocupa un asiento."],
                  ["Contador", "Solo contactos, empresas y facturación, y solo en la web. Necesita Contabilidad (facturación electrónica). Con Contabilidad, un contador no ocupa asiento."],
                ].map(([r, p]) => (
                  <tr key={r}>
                    <td className="p-3 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{r}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Crear un usuario</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a Configuración → Usuarios y haz clic en <strong style={{ color: "var(--foreground)" }}>Crear Usuario</strong> (solo el propietario).</li>
            <li>2. Escribe nombre, apellido, correo, una contraseña temporal y el rol.</li>
            <li>3. La cuenta queda activa de una vez: compártele la contraseña por un canal seguro. La persona la cambia en Configuración → Seguridad.</li>
          </ol>
          <Callout type="tip">
            No se envían invitaciones por correo: tú creas la cuenta y le das la contraseña. Para crear un
            usuario necesitas un asiento libre; si no tienes, usa <strong>Agregar asiento</strong> en la misma
            pantalla. Ya no hay usuarios de solo lectura: cada persona ocupa un asiento.
          </Callout>
          <Callout type="note">
            Durante la prueba gratis de 14 días la cuenta es de un solo usuario. Si intentas crear otro,
            verás «Elige tu plan para invitar a tu equipo»: al pagar el plan puedes sumar los asientos que
            necesites.
          </Callout>
          <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--foreground)" }}>Más opciones en Usuarios</h3>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Arriba ves cuántos asientos usas; desde ahí agregas o liberas asientos.</li>
            <li>• Si tu cuenta tenía usuarios con el antiguo rol Lector, ahora aparecen como empleados, cada uno con su asiento. Si alguno ya no lo necesitas, elimínalo y libera el asiento antes de tu próxima renovación.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Actividad del equipo</strong>: qué hizo cada persona (guía en <a href="/docs/team-activity" style={{ color: "#d1345b" }}>Actividad del equipo</a>).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Acceso por API</strong>: el propietario ajusta, usuario por usuario, qué puede hacer cada uno por API.</li>
            <li>• Al eliminar un usuario eliges a quién pasan sus negocios, contactos y conversaciones.</li>
          </ul>
        </section>

        <section id="notifications" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Notificaciones</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En Configuración → General → Notificaciones cada usuario elige qué avisos quiere recibir y por
            dónde: <strong style={{ color: "var(--foreground)" }}>Campana</strong> (dentro del CRM),{" "}
            <strong style={{ color: "var(--foreground)" }}>Celular</strong> o{" "}
            <strong style={{ color: "var(--foreground)" }}>Correo</strong>. También puedes activar un resumen diario.
          </p>
        </section>

        <section id="fields" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Campos personalizados</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Puedes crear campos propios para contactos, empresas y negocios, cada uno en su sección de{" "}
            <strong style={{ color: "var(--foreground)" }}>Configuración → Módulos del CRM</strong> (Contactos,
            Empresas, Negocios). En Negocios también configuras los pipelines, las etapas con su probabilidad,
            los requisitos para avanzar de etapa y la lista de chequeo de cierre. Más detalle en{" "}
            <a href="/docs/contacts#custom-fields" style={{ color: "#d1345b" }}>Contactos → Campos personalizados</a>{" "}
            y <a href="/docs/pipelines" style={{ color: "#d1345b" }}>Pipelines</a>.
          </p>
        </section>

        <section id="whatsapp" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>WhatsApp (líneas)</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Configuración → General → WhatsApp lista tus números conectados (líneas). Por cada uno defines
            nombre, color, quién atiende los chats nuevos, el pipeline en el que nacen y si es la línea por
            defecto. Desde cada línea también editas su perfil de negocio de WhatsApp (foto, descripción y
            datos de contacto), ves si la conexión está sana y la puedes desconectar. Los números nuevos se
            agregan con <strong style={{ color: "var(--foreground)" }}>Conectar línea</strong>, y aquí vive también
            el switch de confirmaciones de lectura. Guía completa en{" "}
            <a href="/docs/whatsapp-lines" style={{ color: "#d1345b" }}>Líneas de WhatsApp</a>.
          </p>
        </section>

        <section id="conversations" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Conversaciones (pipelines)</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Configuración → Módulos del CRM → Conversaciones administra los pipelines de conversación (crear,
            renombrar, marcar predeterminado, eliminar moviendo sus chats) y las columnas de cada uno, con
            asignación automática, reapertura y webhook por columna. Aquí también manejas los números
            bloqueados y el autorespondedor. Guía completa en{" "}
            <a href="/docs/conversation-pipelines" style={{ color: "#d1345b" }}>Pipelines de conversación</a>.
          </p>
        </section>

        <section id="integrations" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Integraciones</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En Configuración → Desarrollador → Integraciones conectas servicios externos: OpenAI, Claude AI,
            Google Maps, Meta (Facebook + Instagram), ElevenLabs, Google Analytics y N8N. Ver la documentación
            completa en <a href="/docs/integrations" style={{ color: "#d1345b" }}>Integraciones</a>. Tus números de
            WhatsApp no se conectan aquí, sino en Configuración → WhatsApp.
          </p>
        </section>

        <section id="email-settings" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Cuentas de correo</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En Configuración → Correo → Cuentas de correo configuras:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Configuración SMTP</strong>: el correo desde el que salen tus envíos.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Mis firmas</strong>: puedes pegar la firma que ya usas en Gmail u Outlook.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Cuentas de correo</strong> que llenan tu bandeja de entrada: Gmail (y Google Workspace), Yahoo, iCloud, Zoho, Hostinger y cPanel.</li>
            <li>• Reglas de asignación, para repartir los correos que llegan entre tu equipo.</li>
          </ul>
          <Callout type="warning">
            Gmail, Yahoo e iCloud piden una <strong>contraseña de aplicación</strong> (Zoho también, si tienes
            verificación en dos pasos). Outlook, Hotmail y Microsoft 365 todavía no se pueden conectar.
          </Callout>
          <p className="mt-4" style={{ color: "var(--muted-foreground)" }}>
            En el mismo grupo Correo están <a href="#mass-email" style={{ color: "#d1345b" }}>Envío masivo</a>{" "}
            (para tus campañas de correo) y <a href="#email-domains" style={{ color: "#d1345b" }}>Dominios</a>{" "}
            (solo el propietario).
          </p>
        </section>

        <section id="mass-email" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Envío masivo (remitente de campañas)</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En <strong style={{ color: "var(--foreground)" }}>Configuración → Correo → Envío masivo</strong> defines cómo
            se ven tus <a href="/docs/mass-campaigns" style={{ color: "#d1345b" }}>campañas de correo</a> en la bandeja de
            tus clientes. El envío ya viene en tu plan: no tienes que contratar nada aparte.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Nombre del remitente:</strong> lo primero que ve quien recibe el correo. Si lo dejas vacío, se usa el nombre de tu organización.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Correo del remitente:</strong> ahí llegan las respuestas de tus clientes (ej. ventas@tuempresa.com).</li>
          </ul>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Guarda con <strong style={{ color: "var(--foreground)" }}>Guardar</strong>. Para que las campañas salgan
            directamente desde ese correo, verifícalo:
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Toca <strong style={{ color: "var(--foreground)" }}>Verificar este correo</strong>. Te llega un enlace a esa bandeja.</li>
            <li>2. Abre el correo y haz clic en el enlace.</li>
            <li>3. Vuelve y toca <strong style={{ color: "var(--foreground)" }}>Ya hice clic — actualizar estado</strong>. El estado pasa a <em>Verificado</em>.</li>
          </ol>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Solo se pueden verificar correos de tu propio dominio. Con un correo gratuito (Gmail, Hotmail…) la campaña sale a tu nombre con el remitente de la plataforma y las respuestas llegan a tu correo.</li>
            <li>• Si autenticas tu dominio en <a href="#email-domains" style={{ color: "#d1345b" }}>Dominios</a>, el correo queda cubierto sin verificarlo aparte.</li>
            <li>• Mientras no esté verificado, las campañas salen a tu nombre con el remitente de la plataforma.</li>
          </ul>
        </section>

        <section id="email-domains" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Dominios (autenticar tu dominio)</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En <strong style={{ color: "var(--foreground)" }}>Configuración → Correo → Dominios</strong> (solo el
            propietario) autenticas el dominio de tu empresa para que tus campañas salgan firmadas por
            él, sin el «vía» de la plataforma que muestran algunos correos como Gmail. Mejora la
            llegada a la bandeja de entrada y no necesitas ninguna cuenta externa: solo poder crear
            registros DNS donde compraste tu dominio.
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Escribe el <strong style={{ color: "var(--foreground)" }}>Dominio de tu empresa</strong>: lo que va después de la @ en tu correo corporativo (ej. tuempresa.com).</li>
            <li>2. Toca <strong style={{ color: "var(--foreground)" }}>Autenticar dominio</strong>. Aparecen los registros DNS que debes crear: 3 CNAME (son los que verifican el dominio), un MX y un TXT (completan la configuración del remitente).</li>
            <li>3. Créalos en tu proveedor de dominio (Cloudflare, GoDaddy, cPanel…) exactamente como aparecen. Cada nombre y valor tiene un botón para copiarlo.</li>
            <li>4. Toca <strong style={{ color: "var(--foreground)" }}>Verificar ahora</strong>. La detección puede tardar de minutos a horas; puedes cerrar la página y volver luego.</li>
          </ol>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El estado te dice en qué va: <em>Verificado</em> (tus correos ya salen firmados por tu
            dominio), <em>Pendiente</em> (esperando ver los registros) o <em>No se encontraron los
            registros</em> (revisa que estén creados tal cual). Con el botón «Desconectar dominio» lo
            quitas, y tus campañas vuelven a salir con el remitente de la plataforma.
          </p>
        </section>

        <section id="lead-scoring" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Lead Scoring</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Configura las reglas que determinan el puntaje de cada contacto. Ver documentación
            completa en <a href="/docs/lead-scoring" style={{ color: "#d1345b" }}>Lead Scoring</a>. Viene
            en los planes Pro y Empresarial.
          </p>
        </section>

        <section id="mcp" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Conectores MCP</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En <strong style={{ color: "var(--foreground)" }}>Configuración → Desarrollador → Conectores MCP</strong> (solo
            propietarios) creas las credenciales con las que Claude, ChatGPT o Cursor se conectan al
            servidor MCP de FusionCRM y operan el CRM con más de 200 herramientas. El MCP viene en los
            planes Pro y Empresarial, igual que la API.
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
            <strong style={{ color: "var(--foreground)" }}>Configuración → Desarrollador → API</strong>. Los crean el
            propietario y los empleados, y cada uno ve solo sus propios tokens. Los empleados no pueden darle a
            un token acceso completo ni permiso de borrar.
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. <em>Crear nuevo token</em>: nombre (ej. «integracion-n8n») y descripción.</li>
            <li>2. Expiración: 30 días, 90 días, 1 año o sin expiración.</li>
            <li>3. Permisos: usa un preset (Solo Lectura, Ventas, Acceso Completo o Bot de WhatsApp) o marca uno por uno.</li>
            <li>4. Copia el token: solo se muestra una vez. Revócalo desde la misma lista si se filtra.</li>
            <li>5. Cuando esté por vencer, usa <em>Renovar token</em> en la lista (lo extiende un año) en vez de crear otro.</li>
          </ol>
          <p style={{ color: "var(--muted-foreground)" }}>
            Headers, tabla de permisos y referencia completa en{" "}
            <a href="/docs/api" style={{ color: "#d1345b" }}>API REST</a>. La API y el MCP vienen incluidos en los
            planes Pro y Empresarial; el Básico no los trae.
          </p>
        </section>

        <section id="security" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Seguridad</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Lo que encuentras en Configuración → General → Seguridad:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Cambiar contraseña:</strong> si entraste con Google y nunca creaste una, aquí la estableces.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Verificación en dos pasos (2FA):</strong> cada usuario la activa con una app de códigos (Google Authenticator, 1Password…). El propietario puede exigirla a toda la organización: quien no la tenga configurada solo podrá activarla hasta hacerlo.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Sesiones por dispositivo:</strong> ves desde qué navegadores y dispositivos hay sesión abierta y puedes cerrar cualquiera al instante. El propietario puede cerrar todas las sesiones de la organización.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Historial de accesos:</strong> cuándo, desde qué dispositivo y con qué método se entró a tu cuenta.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Aviso de dispositivo nuevo:</strong> un correo cuando alguien entra desde un equipo desconocido.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Credenciales cifradas:</strong> las claves de integraciones (WhatsApp, OpenAI, correo) se guardan cifradas en reposo.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Habeas Data:</strong> desde la ficha de un contacto, el propietario toca <em>Exportar datos</em> y descarga un Excel con todo lo que la plataforma tiene de esa persona (consentimientos, origen y respuestas de formularios), para atender una solicitud de la Ley 1581.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Eliminar mi cuenta</strong> (solo el propietario): borra la cuenta y todos sus datos de forma permanente.</li>
          </ul>
        </section>

        <section id="plantillas-pdf" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Plantillas PDF</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las plantillas PDF te permiten imprimir documentos rellenados automáticamente con los datos de un contacto:
            rótulos de envío, contratos, formatos, autorizaciones… Se crean en{" "}
            <strong style={{ color: "var(--foreground)" }}>Configuración → Documentos → Plantillas PDF</strong> y cualquier persona de tu organización
            las usa desde la pestaña <strong style={{ color: "var(--foreground)" }}>Imprimir</strong> de la ficha del contacto.
            Crear y usar plantillas propias viene en los planes Pro y Empresarial (y en Contabilidad, para
            imprimir facturas); el PDF de cotizaciones y facturas funciona en todos los planes.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Crear una plantilla</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. <strong style={{ color: "var(--foreground)" }}>Prepara un PDF con campos rellenables.</strong> No sirve un PDF normal: necesita campos de formulario (los recuadros donde el sistema escribe). Los creas con Adobe Acrobat (opción &quot;Preparar formulario&quot;), LibreOffice o cualquier editor que permita agregar campos de texto.</li>
            <li>2. <strong style={{ color: "var(--foreground)" }}>Nombra cada campo como <code style={{ color: "#d1345b" }}>etapa.campo</code>.</strong> La etapa agrupa campos relacionados y el campo dice qué dato va ahí. Por ejemplo: <code style={{ color: "#d1345b" }}>destinatario.firstName</code>, <code style={{ color: "#d1345b" }}>destinatario.address</code> o <code style={{ color: "#d1345b" }}>remitente.firstName</code>.</li>
            <li>3. <strong style={{ color: "var(--foreground)" }}>Sube el PDF.</strong> Haz clic en <strong style={{ color: "var(--foreground)" }}>Nueva plantilla</strong>, ponle un nombre (por ejemplo &quot;Rótulo de envío&quot;) y una categoría, y selecciona el archivo. FusionCRM detecta solo los campos que trae.</li>
            <li>4. <strong style={{ color: "var(--foreground)" }}>Revisa las etapas y los campos.</strong> Cada campo se conecta con un dato del contacto por su clave (por ejemplo <code style={{ color: "#d1345b" }}>firstName</code> o <code style={{ color: "#d1345b" }}>city</code>). Si quieres juntar varios datos en un solo recuadro, usa una combinación como <code style={{ color: "#d1345b" }}>{"{firstName} {lastName}"}</code>.</li>
            <li>5. Guarda con <strong style={{ color: "var(--foreground)" }}>Crear plantilla</strong>. Después puedes previsualizar el PDF, editar la plantilla o cambiar el archivo base cuando quieras.</li>
          </ol>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Imprimir desde un contacto</h3>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En la ficha del contacto, abre la pestaña <strong style={{ color: "var(--foreground)" }}>Imprimir</strong>: verás todas las plantillas de tu
            organización. En cada una puedes <strong style={{ color: "var(--foreground)" }}>imprimir</strong> (abre el cuadro de impresión del navegador)
            o <strong style={{ color: "var(--foreground)" }}>abrirla en una pestaña nueva</strong> para verla o descargarla. Los recuadros cuyo dato no
            exista en el contacto quedan vacíos.
          </p>
          <Callout type="tip">
            Funciona muy bien para rótulos de envío: crea una etapa <code style={{ color: "#d1345b" }}>destinatario</code> con nombre, dirección,
            ciudad y teléfono, y tendrás el rótulo listo con un clic desde cada cliente.
          </Callout>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Una plantilla PDF no genera guía ni avisa a ninguna transportadora. Para cotizar, generar la
            guía oficial e imprimir su etiqueta, usa el módulo{" "}
            <a href="/docs/shipments" style={{ color: "#d1345b" }}>Envíos</a> (con tu cuenta de Envia.com).
          </p>
        </section>

        <section id="import-history" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Historial de importaciones</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En Configuración → General → Historial ves todas las importaciones que has hecho, descargas las
            filas que se rechazaron (con el motivo) y puedes <strong style={{ color: "var(--foreground)" }}>Revertir</strong>{" "}
            una importación que no quieras conservar.
          </p>
        </section>

        <section id="plan" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Plan y facturación</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Hay tres planes del CRM: <strong style={{ color: "var(--foreground)" }}>Básico</strong>,{" "}
            <strong style={{ color: "var(--foreground)" }}>Pro</strong> y{" "}
            <strong style={{ color: "var(--foreground)" }}>Empresarial</strong>. Se cobran{" "}
            <strong style={{ color: "var(--foreground)" }}>por usuario</strong>, mes a mes o por año (el anual
            trae 2 meses gratis), y todos los precios incluyen IVA: lo que ves es lo que pagas. Aparte está{" "}
            <strong style={{ color: "var(--foreground)" }}>Contabilidad</strong>, para la facturación
            electrónica. Los precios vigentes están siempre en{" "}
            <a href="https://www.fusioncol.com/precios" style={{ color: "#d1345b" }}>fusioncol.com/precios</a>.
          </p>
          <div className="rounded-lg overflow-x-auto border mb-6" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  {["", "Básico", "Pro", "Empresarial"].map((h) => (
                    <th key={h} className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Por usuario al mes", "$49.900", "$79.900", "$129.900"],
                  ["Por usuario al año", "$499.000", "$799.000", "$1.299.000"],
                  ["Prueba gratis", "14 días, 1 usuario", "—", "—"],
                  ["Líneas de WhatsApp", "1", "2", "5"],
                  ["Contactos", "2.000", "10.000", "50.000"],
                  ["Empresas", "2.000", "10.000", "50.000"],
                  ["Listas de contactos", "5", "10", "50"],
                  ["Correos de marketing al mes", "1.000", "10.000", "50.000"],
                  ["Cotizaciones y conversaciones", "Sin tope", "Sin tope", "Sin tope"],
                  ["Formularios web", "1", "3", "20"],
                  ["Landing pages", "1, con la marca de FusionCol", "5, sin marca", "20, sin marca"],
                  ["Automatizaciones activas", "2", "5", "30"],
                  ["Base de conocimiento de los agentes IA", "—", "100 documentos (200 MB)", "Sin tope"],
                  ["Campañas masivas de WhatsApp", "No", "Sí", "Sí"],
                  ["Recompra automática", "No", "Sí", "Sí"],
                  ["Agentes IA con tu propia clave", "No", "Sí", "Sí"],
                  ["Lead scoring", "No", "Sí", "Sí"],
                  ["Reportes personalizados y pronóstico", "No", "Sí", "Sí"],
                  ["Actividad del equipo", "No", "Sí", "Sí"],
                  ["Plantillas PDF propias", "No", "Sí", "Sí"],
                  ["API y MCP", "No", "Sí", "Sí"],
                  ["Envíos (Envia.com)", "No", "Incluido", "Incluido"],
                  ["Registro de auditoría", "No", "No", "Sí"],
                  ["Soporte", "Correo", "WhatsApp", "WhatsApp prioritario"],
                ].map(([k, ...v]) => (
                  <tr key={k}>
                    <td className="p-3 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{k}</td>
                    {v.map((x, i) => (
                      <td key={i} className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{x}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La bandeja de WhatsApp, Instagram y Facebook, contactos, empresas, negocios, embudos,
            cotizaciones, respuestas rápidas, biblioteca, calendario, tareas y la app móvil vienen en
            los tres planes. Desde Configuración → General → Plan (solo el propietario) puedes:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Ver tu plan, su uso (contactos, empresas, líneas, automatizaciones…) y qué incluye.</li>
            <li>• Pagar con tarjeta (Wompi), mensual o anual. Antes de pagar ves el total exacto, con los usuarios y Contabilidad si la sumas. La renovación es automática.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Subir de plan:</strong> aplica de inmediato. Solo pagas la diferencia por los días que le quedan a tu periodo, y tu fecha de renovación no cambia.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Bajar de plan o pasar de anual a mensual:</strong> queda programado y aplica en tu próxima renovación; hasta entonces sigues con lo que pagaste. Puedes deshacer el cambio antes de esa fecha. No hay reembolsos.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Usuarios:</strong> el precio del plan incluye un usuario y cada usuario adicional cuesta lo mismo. Agregas o liberas asientos en Configuración → Usuarios; un asiento nuevo se cobra por los días que quedan del periodo y uno liberado deja de cobrarse en la siguiente renovación.</li>
            <li>• Cancelar la suscripción: tu plan sigue activo hasta el final del periodo pagado.</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--foreground)" }}>Prueba gratis de 14 días</h3>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Al crear tu cuenta empiezas con el plan Básico gratis por 14 días, sin tarjeta y con un solo
            usuario. Un aviso te muestra cuántos días quedan y te escribimos por correo antes de que
            termine. Si al terminar no has elegido un plan, la cuenta queda en pausa: puedes entrar, ver
            y exportar tus datos y pagar, pero no crear ni enviar nada. Los mensajes de tus clientes
            siguen llegando a la bandeja y no se borra nada al vencer. Una cuenta que nunca paga entra
            después al proceso de inactividad, que avisa antes de borrar.
          </p>

          <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--foreground)" }}>Si un pago falla o el plan vence</h3>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Si el cobro de la renovación falla, reintentamos durante 7 días y te avisamos. Pasado ese
            plazo sin pago, la cuenta queda en pausa igual que una prueba vencida: lees, exportas y
            pagas, y al pagar vuelve a funcionar completa de inmediato.
          </p>

          <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--foreground)" }}>Contabilidad (facturación electrónica)</h3>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• $79.900 al mes o $799.000 al año, con documentos ilimitados, certificado de firma digital incluido y la habilitación ante la DIAN sin costo.</li>
            <li>• La sumas encima de cualquier plan del CRM, con la misma fecha de renovación, o la contratas sola si solo necesitas facturar (sin el CRM: contactos, empresas, productos, facturación y compras).</li>
            <li>• Sola, incluye al dueño y un contador; encima de un plan del CRM, suma un contador que no ocupa asiento.</li>
            <li>• El pago mensual tiene una permanencia mínima de 3 meses: si cancelas antes, la cancelación aplica al cumplirse ese plazo.</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--foreground)" }}>Precio fundador</h3>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los primeros 100 clientes que pagan conservan el precio con el que entraron, también si
            después suben de plan. El precio se mantiene mientras la suscripción no venza sin renovarse.
          </p>

          <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--foreground)" }}>Cuando algo no está en tu plan</h3>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Si una función no viene en tu plan, la app te lo dice y te muestra en qué plan está. Por API o MCP la respuesta es 403 <code>PLAN_MODULE_REQUIRED</code> con el campo <code>module</code> (por ejemplo <code>waCampaigns</code> o <code>aiAgents</code>).</li>
            <li>• Si llegas a un tope (contactos, empresas, líneas, formularios, landing pages, automatizaciones activas…), no puedes crear más hasta liberar espacio o subir de plan. Por API la respuesta es 403 <code>PLAN_LIMIT_REACHED</code>.</li>
            <li>• Si bajas de plan no se borra nada: sigues viendo tus campañas, reportes, agentes y páginas. Lo que el plan nuevo ya no incluye deja de poder crearse o ejecutarse al empezar el periodo nuevo.</li>
            <li>• Si quedas por encima de un tope de automatizaciones, formularios, líneas o landing pages, la cuenta sigue funcionando: no puedes activar más, y a los 30 días se pausan solas las automatizaciones más nuevas que sobren (con aviso). Tus líneas nunca se desconectan y los mensajes siempre entran.</li>
          </ul>

          <h3 id="audit-log" className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--foreground)" }}>Registro de auditoría (Empresarial)</h3>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En el plan Empresarial el propietario puede consultar quién hizo qué en la cuenta: crear,
            editar y borrar contactos, empresas, negocios y cotizaciones; cambios de etapa; envíos de
            cotizaciones y mensajes; inicios de sesión, cambios de contraseña y de 2FA. Cada registro trae
            la fecha, el usuario y, cuando aplica, la IP y el navegador. Es de solo lectura. También está por API con <code>GET /api/audit-log</code> (ver{" "}
            <a href="/docs/api#audit-log" style={{ color: "#d1345b" }}>API REST</a>).
          </p>
          <Callout type="tip">
            Si necesitas condiciones especiales, escribe a{" "}
            <strong style={{ color: "#d1345b" }}>comercial@fusioncol.com</strong> o por WhatsApp al{" "}
            <strong style={{ color: "#d1345b" }}>+57 302 400 3914</strong>.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/estrategia", title: "Estrategia" }}
          next={{ href: "/docs/team-activity", title: "Actividad del equipo" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
