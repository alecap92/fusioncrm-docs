import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Correo / Email" };

const toc = [
  { id: "overview", label: "Bandeja de entrada" },
  { id: "connect", label: "Conectar cuenta de email" },
  { id: "compose", label: "Redactar correo" },
  { id: "scheduled", label: "Correos programados" },
  { id: "snippets", label: "Fragmentos (Snippets)" },
  { id: "templates", label: "Plantillas de email" },
  { id: "auto-responder", label: "Auto-responder" },
];

export default function EmailPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Correo / Email</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          FusionCRM incluye un cliente de email completo que centraliza tus correos junto con
          WhatsApp y chat, permitiendo gestionar toda la comunicación desde un solo lugar.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Bandeja de entrada</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La bandeja de entrada muestra todos los correos electrónicos de tus cuentas conectadas.
            Puedes ver, responder y gestionar emails sin salir de FusionCRM.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Entrada", desc: "Emails recibidos" },
              { label: "Enviados", desc: "Emails enviados" },
              { label: "Borradores", desc: "Sin enviar" },
              { label: "Programados", desc: "Envío futuro" },
              { label: "Archivados", desc: "Procesados" },
              { label: "Spam", desc: "No deseados" },
              { label: "Papelera", desc: "Eliminados" },
              { label: "Sin leer", desc: "Pendientes" },
            ].map((f) => (
              <div key={f.label} className="p-2 rounded border text-sm text-center" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-medium" style={{ color: "var(--foreground)" }}>{f.label}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="connect" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Conectar cuenta de email</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            FusionCRM soporta conexión con las principales plataformas de email:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { name: "Gmail / Google Workspace", proto: "OAuth 2.0", steps: "Configuración → Email → Conectar Gmail → Autorizar con Google" },
              { name: "Microsoft Outlook / 365", proto: "OAuth 2.0", steps: "Configuración → Email → Conectar Outlook → Autorizar con Microsoft" },
              { name: "IMAP/SMTP genérico", proto: "IMAP + SMTP", steps: "Configuración → Email → Agregar cuenta IMAP → Ingresar servidor y credenciales" },
            ].map((p) => (
              <div key={p.name} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{p.name}</p>
                <span className="text-xs px-2 py-0.5 rounded font-mono mb-2 inline-block" style={{ backgroundColor: "#1f2a48", color: "white" }}>{p.proto}</span>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.steps}</p>
              </div>
            ))}
          </div>
          <Callout type="warning">
            Para Gmail, asegúrate de habilitar el acceso de aplicaciones de terceros en la
            configuración de tu cuenta Google. En cuentas de Google Workspace, el administrador
            de IT puede necesitar autorizar FusionCRM en la consola de administración.
          </Callout>
        </section>

        <section id="compose" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Redactar correo</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El editor de correo incluye todas las funciones estándar más características adicionales:
          </p>
          <div className="space-y-3 mb-4">
            {[
              { feature: "Editor de texto enriquecido", desc: "Formato de texto (negrita, cursiva, subrayado), listas, tablas, colores." },
              { feature: "Adjuntos", desc: "Agrega archivos desde tu computador o desde la biblioteca de documentos de FusionCRM." },
              { feature: "Firma de email", desc: "Firma HTML personalizable por usuario. Configurable en Configuración → Email." },
              { feature: "CC / BCC", desc: "Agrega destinatarios en copia o copia oculta." },
              { feature: "Responder / Reenviar", desc: "Botones estándar para responder y reenviar emails recibidos." },
              { feature: "Insertar snippet", desc: "Inserta fragmentos de texto predefinidos mientras redactas." },
            ].map((f) => (
              <div key={f.feature} className="flex gap-3 p-3 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                <span style={{ color: "#3b82f6" }}>✦</span>
                <div>
                  <span className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{f.feature}:</span>
                  <span className="text-sm ml-1" style={{ color: "var(--muted-foreground)" }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="scheduled" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Correos programados</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Puedes programar el envío de un email para una fecha y hora específica:
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Redacta el email normalmente</li>
            <li>2. En lugar de "Enviar", haz clic en la flecha junto al botón de envío</li>
            <li>3. Selecciona "Programar envío"</li>
            <li>4. Elige la fecha y hora de envío</li>
            <li>5. El email aparecerá en la carpeta "Programados" hasta la hora de envío</li>
          </ol>
          <Callout type="tip">
            Usa el envío programado para entregar propuestas y cotizaciones a primera hora de la
            mañana, que es cuando tienen mayor tasa de apertura.
          </Callout>
        </section>

        <section id="snippets" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Fragmentos (Snippets)</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los snippets son bloques de texto o HTML predefinidos que puedes insertar rápidamente
            al redactar un email. Son diferentes a las plantillas de email completas: los snippets
            son fragmentos de texto para partes recurrentes de un email.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Crear un snippet</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a la sección <strong style={{ color: "var(--foreground)" }}>Snippets</strong> en la barra lateral</li>
            <li>2. Haz clic en <strong style={{ color: "var(--foreground)" }}>"+ Nuevo snippet"</strong></li>
            <li>3. Asigna un nombre corto (será el shortcode)</li>
            <li>4. Escribe el contenido del fragmento</li>
            <li>5. Guarda el snippet</li>
          </ol>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Usar un snippet</h3>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Al redactar un email, escribe <code style={{ color: "#d1345b" }}>/</code> seguido del
            nombre del snippet para buscarlo e insertarlo. También puedes usar el botón de snippets
            en la barra de herramientas del editor.
          </p>
        </section>

        <section id="templates" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Plantillas de email</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            A diferencia de los snippets, las plantillas de email son emails completos (asunto +
            cuerpo) que puedes usar como punto de partida para emails frecuentes.
          </p>
          <div className="rounded-lg p-4 border mb-4" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>Casos de uso comunes:</p>
            <ul className="space-y-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
              <li>• Email de bienvenida a nuevos clientes</li>
              <li>• Seguimiento post-reunión</li>
              <li>• Envío de propuesta comercial</li>
              <li>• Confirmación de pedido</li>
              <li>• Email de reactivación de cliente inactivo</li>
            </ul>
          </div>
        </section>

        <section id="auto-responder" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Auto-responder</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El auto-responder envía automáticamente un email de respuesta cuando recibes un nuevo
            correo en una cuenta conectada. Útil para confirmar recepción y establecer expectativas
            de tiempo de respuesta.
          </p>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Configura el auto-responder en{" "}
            <strong style={{ color: "var(--foreground)" }}>Configuración → Email → Auto-responder</strong>.
          </p>
          <Callout type="note">
            El auto-responder solo se activa para el primer email de una conversación. No responde
            automáticamente a emails de seguimiento dentro de un mismo hilo.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/whatsapp-templates", title: "Templates WhatsApp" }}
          next={{ href: "/docs/mass-campaigns", title: "Campañas Masivas" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
