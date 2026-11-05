import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Correo / Email" };

const toc = [
  { id: "overview", label: "Bandeja de entrada" },
  { id: "connect", label: "Conectar cuenta de correo" },
  { id: "assign", label: "Asignar correos al equipo" },
  { id: "compose", label: "Redactar correo" },
  { id: "scheduled", label: "Correos programados" },
  { id: "snippets", label: "Fragmentos" },
  { id: "templates", label: "Plantillas de correo" },
];

export default function EmailPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Correo / Email</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          FusionCRM trae tu correo al CRM: lees los buzones de la empresa, respondes, asignas cada
          correo a un asesor y ves la ficha del cliente al lado, sin salir de la plataforma. Lo
          encuentras en <strong style={{ color: "var(--foreground)" }}>Comunicación → Correo</strong>.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Bandeja de entrada</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            A la izquierda ves las carpetas de tu buzón, las mismas que tienes en tu proveedor de
            correo (Recibidos, Enviados, Spam, etc.), cada una con su contador de no leídos. En la
            lista puedes filtrar para ver solo los no leídos, marcar varios como leídos o no leídos,
            eliminarlos en lote o marcar todos como leídos.
          </p>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Al abrir un correo, el CRM busca al remitente entre tus contactos y te muestra su ficha y
            su actividad reciente al lado, con un acceso para abrir el contacto.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Atajos de teclado</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { key: "j / k", desc: "Siguiente / anterior" },
              { key: "c", desc: "Redactar" },
              { key: "r", desc: "Responder" },
              { key: "f", desc: "Reenviar" },
              { key: "#", desc: "Eliminar" },
              { key: "Shift + U", desc: "Marcar no leído" },
              { key: "/", desc: "Buscar" },
              { key: "?", desc: "Ver todos los atajos" },
            ].map((s) => (
              <div key={s.key} className="p-2 rounded border text-sm text-center" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-mono font-medium" style={{ color: "var(--foreground)" }}>{s.key}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <Callout type="note">
            El rol contador no tiene acceso al módulo de correo.
          </Callout>
        </section>

        <section id="connect" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Conectar cuenta de correo</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Todo se configura en{" "}
            <strong style={{ color: "var(--foreground)" }}>Configuración → Correo → Cuentas de correo</strong>,
            que tiene tres pestañas:
          </p>
          <div className="space-y-3 mb-6">
            {[
              { tab: "Envío (SMTP)", desc: "Tu cuenta personal para ENVIAR: por aquí salen los correos que redactas, las cotizaciones y las respuestas. Cada usuario configura la suya." },
              { tab: "Firmas", desc: "Tus firmas reutilizables. Puedes tener varias (comercial, soporte, personal) y marcar una como predeterminada." },
              { tab: "Bandeja de entrada", desc: "Los buzones de la EMPRESA que el CRM lee y muestra en Comunicación → Correo. Son compartidos por todo el equipo, no personales." },
            ].map((t) => (
              <div key={t.tab} className="flex gap-3 p-3 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                <span style={{ color: "#3b82f6" }}>✦</span>
                <div>
                  <span className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{t.tab}:</span>
                  <span className="text-sm ml-1" style={{ color: "var(--muted-foreground)" }}>{t.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Agregar un buzón</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. En la pestaña <strong style={{ color: "var(--foreground)" }}>Bandeja de entrada</strong>, agrega una cuenta.</li>
            <li>2. Elige tu proveedor: Gmail, Yahoo, iCloud, Zoho, Hostinger u Otro. Al escribir el correo, el CRM intenta encontrar solo el servidor.</li>
            <li>3. Escribe tu correo completo y la contraseña (en Gmail, Yahoo e iCloud es una contraseña de aplicación; el asistente te da el enlace para crearla).</li>
            <li>4. Prueba la conexión y guarda.</li>
          </ol>
          <Callout type="warning">
            En Gmail y Google Workspace no sirve tu contraseña normal: activa la verificación en dos
            pasos en tu cuenta de Google, crea una contraseña de aplicación (16 letras) y pégala en el
            campo de contraseña. En Google Workspace, el administrador debe tener IMAP habilitado.
          </Callout>
          <Callout type="note">
            Por ahora no puedes conectar cuentas de Outlook, Hotmail o Microsoft 365: Microsoft solo
            permite entrar iniciando sesión con su cuenta, y esa conexión todavía no está disponible
            en el CRM.
          </Callout>
        </section>

        <section id="assign" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Asignar correos al equipo</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada correo se puede asignar a un asesor desde el correo abierto, y en la bandeja tienes un
            filtro por asesor para que cada uno vea lo suyo. En la pestaña{" "}
            <strong style={{ color: "var(--foreground)" }}>Bandeja de entrada</strong> de la configuración
            decides qué pasa con los correos nuevos:{" "}
            <strong style={{ color: "var(--foreground)" }}>No asignar</strong>,{" "}
            <strong style={{ color: "var(--foreground)" }}>A un asesor</strong> (todos a la misma persona) o{" "}
            <strong style={{ color: "var(--foreground)" }}>Rotar entre asesores</strong> (por turnos entre los que elijas).
          </p>
        </section>

        <section id="compose" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Redactar correo</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El redactor incluye:
          </p>
          <div className="space-y-3 mb-4">
            {[
              { feature: "Editor con formato", desc: "Negrita, cursiva, listas, tablas, colores y tamaño de letra. También puedes ver y editar el HTML del cuerpo." },
              { feature: "Adjuntos", desc: "Agrega archivos desde tu computador con el ícono del clip." },
              { feature: "Firma", desc: "Tu firma predeterminada entra sola; con el botón «Insertar firma» la cambias por otra de las que tengas en Configuración → Correo → Cuentas de correo → Firmas." },
              { feature: "CC / BCC", desc: "Agrega destinatarios en copia (CC) o copia oculta (BCC)." },
              { feature: "Responder / Reenviar", desc: "Desde el correo abierto, con los botones o con las teclas r y f." },
              { feature: "Fragmentos", desc: "Inserta textos guardados con el botón de la burbuja de mensaje (ver abajo)." },
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
            Puedes dejar un correo listo para que salga en una fecha y hora específica:
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Redacta el correo normalmente.</li>
            <li>2. Toca el ícono del reloj que está junto a <strong style={{ color: "var(--foreground)" }}>Enviar</strong>.</li>
            <li>3. Elige la fecha y la hora; el botón cambia a <strong style={{ color: "var(--foreground)" }}>Programar</strong>.</li>
            <li>4. Pulsa <strong style={{ color: "var(--foreground)" }}>Programar</strong>. Te sale un aviso confirmando cuándo se enviará.</li>
          </ol>
          <Callout type="note">
            Hoy no hay una carpeta ni una lista donde ver los correos programados: una vez programado,
            sale solo a la hora indicada. El rol contador no ve esta opción.
          </Callout>
          <Callout type="tip">
            Usa el envío programado para que tus propuestas y cotizaciones lleguen a primera hora de
            la mañana.
          </Callout>
        </section>

        <section id="snippets" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Fragmentos</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los fragmentos son textos guardados que insertas en segundos: saludos, datos de pago,
            condiciones de envío. Sirven tanto para el correo como para el chat de WhatsApp.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Crear un fragmento</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a <strong style={{ color: "var(--foreground)" }}>Comunicación → Fragmentos</strong></li>
            <li>2. Haz clic en <strong style={{ color: "var(--foreground)" }}>Nuevo Fragmento</strong></li>
            <li>3. Escribe un <strong style={{ color: "var(--foreground)" }}>Título</strong> y elige el <strong style={{ color: "var(--foreground)" }}>Tipo de formato</strong>: «Texto / WhatsApp» o «Correo (con formato)»</li>
            <li>4. Escribe el <strong style={{ color: "var(--foreground)" }}>Contenido</strong> (y un <strong style={{ color: "var(--foreground)" }}>Asunto</strong> si es para correo). Puedes agregar una imagen.</li>
            <li>5. Si quieres, ponle un <strong style={{ color: "var(--foreground)" }}>Atajo</strong> de una palabra y guarda</li>
          </ol>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Usar un fragmento en un correo</h3>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            En el redactor, toca el botón de la burbuja de mensaje que está en la barra de abajo y
            elige el fragmento. Si el fragmento tiene asunto y todavía no escribiste uno, el asunto se
            rellena solo.
          </p>
          <Callout type="note">
            El atajo (<code style={{ color: "#d1345b" }}>#atajo</code> + Tab) funciona en el chat de
            WhatsApp; en el correo los fragmentos se insertan con el botón.
          </Callout>
        </section>

        <section id="templates" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Plantillas de correo</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las plantillas de correo (con el editor de arrastrar y soltar) se usan en{" "}
            <strong style={{ color: "var(--foreground)" }}>Email Marketing</strong>, para campañas a
            muchos contactos. En el redactor del correo uno a uno no hay selector de plantillas.
          </p>
          <Callout type="tip">
            Para correos que repites seguido (bienvenida, seguimiento después de una reunión, envío de
            propuesta), crea un fragmento de tipo «Correo (con formato)» con su asunto: lo insertas
            con un clic y el asunto se llena solo.
          </Callout>
          <Callout type="note">
            La respuesta automática fuera de horario existe solo para WhatsApp, en Configuración →
            Conversaciones. El correo no tiene respuesta automática.
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
