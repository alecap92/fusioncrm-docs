import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Conversaciones" };

const toc = [
  { id: "overview", label: "Vista general" },
  { id: "inbox", label: "Bandeja unificada" },
  { id: "iniciar-whatsapp", label: "Cómo escribirle a un cliente" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "message-types", label: "Tipos de mensajes" },
  { id: "quick-replies", label: "Respuestas rápidas" },
  { id: "assignment", label: "Asignación de chats" },
  { id: "search", label: "Búsqueda en conversaciones" },
  { id: "status", label: "Estados de conversación" },
  { id: "kanban", label: "Kanban, líneas y pipelines" },
];

export default function ConversationsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Conversaciones</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El módulo de Conversaciones centraliza todos los canales de chat — WhatsApp, Messenger e
          Instagram — en un tablero kanban para que tu equipo no pierda ningún mensaje. Si tienes varios
          números de WhatsApp o varios equipos, cada uno puede tener su{" "}
          <a href="/docs/whatsapp-lines" style={{ color: "#d1345b" }}>línea</a> y su{" "}
          <a href="/docs/conversation-pipelines" style={{ color: "#d1345b" }}>pipeline</a> propios.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Vista general</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Lo encuentras en el menú <strong style={{ color: "var(--foreground)" }}>Comunicación → WhatsApp</strong>.
            El inbox es un tablero kanban: cada columna es una etapa y cada tarjeta es una conversación.
            Tu tablero arranca con una sola columna, "Nuevas"; agrega las que necesites (por ejemplo
            "En proceso" o "Cerrado") en <strong style={{ color: "var(--foreground)" }}>Ajustes → Conversaciones</strong>.
            Al abrir una tarjeta ves el hilo completo de mensajes y, a la derecha, la información del contacto.
          </p>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El menú <strong style={{ color: "var(--foreground)" }}>⋯</strong> de cada tarjeta permite fijarla
            arriba de su columna, marcarla como leída o no leída, moverla y eliminarla.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Tablero de conversaciones", items: ["Columnas = etapas del pipeline", "Tarjetas ordenadas por último mensaje", "Canal, línea de WhatsApp y asesor en cada tarjeta", "Arrastra para cambiar de etapa"] },
              { title: "Chat abierto", items: ["Historial completo del hilo, con respuestas citadas y reacciones", "Barra superior: Prioridad, Puntuación, Asignado a, Etapa y Etiquetas", "Panel lateral: empresa, negocios, cotizaciones y, con el módulo de Facturación, facturas", "Marcar \"No contactar por WhatsApp\" o bloquear el número"] },
            ].map((p) => (
              <div key={p.title} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>{p.title}</p>
                <ul className="space-y-1">
                  {p.items.map((i) => (
                    <li key={i} className="text-sm flex gap-2" style={{ color: "var(--muted-foreground)" }}>
                      <span style={{ color: "#d1345b" }}>•</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="inbox" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Bandeja unificada</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La bandeja muestra en una sola vista los chats de WhatsApp, Messenger e Instagram. El
            correo se maneja aparte, en <strong style={{ color: "var(--foreground)" }}>Comunicación → Correo</strong>.
            En la barra de arriba del tablero tienes:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {[
              { filter: "Asesor:", desc: "Solo los chats de un asesor (o \"- Sin Filtro -\")" },
              { filter: "Pipeline:", desc: "Aparece si tienes 2 o más pipelines" },
              { filter: "Línea:", desc: "Aparece si tienes 2 o más números de WhatsApp" },
              { filter: "Actualizar", desc: "Recarga el tablero" },
              { filter: "Buscar", desc: "Busca en los mensajes" },
              { filter: "Nuevo Chat", desc: "Escríbele a un contacto con una plantilla" },
            ].map((f) => (
              <div key={f.filter} className="p-2 rounded border text-center text-sm" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-medium" style={{ color: "var(--foreground)" }}>{f.filter}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <Callout type="tip">
            El tablero recuerda en tu navegador el asesor, el pipeline y la línea que elegiste. Si hay
            chats sin leer en otro pipeline, el selector "Pipeline:" muestra un punto rojo.
          </Callout>
        </section>

        <section id="iniciar-whatsapp" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Cómo escribirle a un cliente por WhatsApp</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Si vienes del WhatsApp del celular (o de WhatsApp Business en el celular), aquí hay una regla nueva que
            confunde al principio: <strong style={{ color: "var(--foreground)" }}>no puedes escribirle a cualquiera cuando quieras con un mensaje normal</strong>.
            FusionCRM usa la conexión oficial de WhatsApp para empresas, y Meta (la dueña de WhatsApp) la limita así para frenar
            el spam. No es una falla del CRM: aplica igual en cualquier herramienta conectada a WhatsApp.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b" style={{ color: "var(--foreground)" }}></th>
                  <th className="text-left p-2 border-b" style={{ color: "var(--foreground)" }}>WhatsApp en el celular</th>
                  <th className="text-left p-2 border-b" style={{ color: "var(--foreground)" }}>WhatsApp en FusionCRM</th>
                </tr>
              </thead>
              <tbody style={{ color: "var(--muted-foreground)" }}>
                <tr><td className="p-2 border-b font-semibold" style={{ color: "var(--foreground)" }}>Escribirle primero a alguien</td><td className="p-2 border-b">Escribes lo que quieras</td><td className="p-2 border-b">Solo con una <strong style={{ color: "var(--foreground)" }}>plantilla</strong> aprobada por Meta</td></tr>
                <tr><td className="p-2 border-b font-semibold" style={{ color: "var(--foreground)" }}>Cuando el cliente te escribe</td><td className="p-2 border-b">Chateas normal</td><td className="p-2 border-b">Chateas normal durante <strong style={{ color: "var(--foreground)" }}>24 horas</strong> desde su último mensaje</td></tr>
                <tr><td className="p-2 border-b font-semibold" style={{ color: "var(--foreground)" }}>Si pasan más de 24 horas sin que te escriba</td><td className="p-2 border-b">Sigues escribiendo</td><td className="p-2 border-b">Vuelves a necesitar una plantilla</td></tr>
                <tr><td className="p-2 border-b font-semibold" style={{ color: "var(--foreground)" }}>Varias personas atendiendo</td><td className="p-2 border-b">Un solo teléfono</td><td className="p-2 border-b">Todo el equipo, desde el computador o la app</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>El ciclo, en tres pasos</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. <strong style={{ color: "var(--foreground)" }}>Abres la conversación con una plantilla.</strong> Es un mensaje que escribiste antes y Meta aprobó, por ejemplo: <em>&quot;Hola {"{{1}}"}, te escribo de Tienda Ejemplo sobre tu pedido. ¿Tienes un momento?&quot;</em></li>
            <li>2. <strong style={{ color: "var(--foreground)" }}>El cliente responde.</strong> Con su respuesta se abre una ventana de 24 horas.</li>
            <li>3. <strong style={{ color: "var(--foreground)" }}>Chateas normal.</strong> Durante esas 24 horas envías texto, fotos, audios, documentos y botones, igual que en el celular. Cada vez que el cliente vuelve a escribir, las 24 horas empiezan de nuevo.</li>
          </ol>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Si el cliente no responde la plantilla, la ventana no se abre y no puedes mandarle mensajes normales. Puedes
            enviarle otra plantilla más adelante, pero sin insistir: si la gente te bloquea o te reporta, Meta baja la calidad
            de tu número (mira <a href="/docs/whatsapp-templates#limits" style={{ color: "#d1345b" }}>Límites de mensajes de Meta</a>).
          </p>

          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Qué ves en pantalla</h3>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Ventana abierta:</strong> la barra de mensaje funciona normal.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Ventana cerrada:</strong> el texto y los adjuntos quedan deshabilitados con el aviso <em>&quot;La ventana de 24 h está cerrada: envía una plantilla&quot;</em>. Pulsa el botón <strong style={{ color: "var(--foreground)" }}>Plantillas</strong> de la barra de mensaje y elige una.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Cliente nuevo que nunca te ha escrito:</strong> pulsa <strong style={{ color: "var(--foreground)" }}>Nuevo Chat</strong>, busca el contacto y envíale una plantilla.</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Preguntas frecuentes</h3>
          <ul className="space-y-3 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li><strong style={{ color: "var(--foreground)" }}>&quot;¿Por qué no me deja escribirle?&quot;</strong> Porque pasaron más de 24 horas desde el último mensaje del cliente, o porque nunca te ha escrito. Envíale una plantilla.</li>
            <li><strong style={{ color: "var(--foreground)" }}>&quot;No tengo plantillas, ¿qué hago?&quot;</strong> Crea una en <a href="/docs/whatsapp-templates#create" style={{ color: "#d1345b" }}>Plantillas de WhatsApp</a>. Meta la revisa, normalmente en minutos (a veces hasta 24 horas). Mientras no tengas al menos una aprobada, solo puedes responder a quien te escriba primero. Te conviene dejar lista desde el primer día una plantilla corta para retomar conversaciones.</li>
            <li><strong style={{ color: "var(--foreground)" }}>&quot;¿Cuesta algo?&quot;</strong> Responder dentro de las 24 horas no tiene costo de Meta. Las plantillas sí pueden tener un cobro de Meta según su categoría (marketing, utilidad o autenticación) y el país del cliente. Consulta las tarifas vigentes en Meta.</li>
            <li><strong style={{ color: "var(--foreground)" }}>&quot;¿Puedo mandarle una plantilla a alguien que ya me está escribiendo?&quot;</strong> Sí, pero no hace falta: con la ventana abierta escribe normal.</li>
            <li><strong style={{ color: "var(--foreground)" }}>&quot;¿Y para escribirle a muchos a la vez?&quot;</strong> Usa <a href="/docs/mass-campaigns#whatsapp" style={{ color: "#d1345b" }}>WhatsApp masivo</a>. Funciona con las mismas plantillas.</li>
          </ul>
          <Callout type="tip">
            Para que los clientes te escriban primero (y así abrir la ventana sin plantilla), pon el enlace de tu WhatsApp en tu
            web, tus redes y tus <a href="/docs/landing-pages" style={{ color: "#d1345b" }}>landing pages</a>.
          </Callout>
        </section>

        <section id="whatsapp" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>WhatsApp</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            FusionCRM se integra con <strong style={{ color: "var(--foreground)" }}>WhatsApp Business API</strong>,
            lo que permite recibir y enviar mensajes de WhatsApp directamente desde el CRM.
          </p>
          <Callout type="warning">
            La API de WhatsApp Business tiene una ventana de 24 horas. Puedes responder libremente
            dentro de las primeras 24h desde el último mensaje del cliente. Pasado ese tiempo,
            debes usar una plantilla (template) aprobada para iniciar o continuar la conversación.
          </Callout>
          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--foreground)" }}>Iniciar conversación proactiva</h3>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Para enviar el primer mensaje a un contacto o retomar una conversación pasada las 24h:
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Si ya existe el chat, ábrelo y pulsa el botón <strong style={{ color: "var(--foreground)" }}>"Plantillas"</strong> de la barra de mensaje.</li>
            <li>2. Si es alguien nuevo, pulsa <strong style={{ color: "var(--foreground)" }}>"Nuevo Chat"</strong>, busca el contacto (mínimo 3 letras) y, si tienes varios números, elige desde cuál sale en "Enviar desde".</li>
            <li>3. Elige la plantilla aprobada.</li>
            <li>4. Completa sus variables: {"{{1}}"} se llena con el nombre del contacto y las demás las escribes tú.</li>
            <li>5. Envía el mensaje.</li>
          </ol>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Con la ventana cerrada, los botones de texto y adjuntos del chat quedan deshabilitados con el
            aviso "La ventana de 24 h está cerrada: envía una plantilla". En la barra de mensaje, Enter
            envía y Shift + Enter hace un salto de línea.
          </p>
        </section>

        <section id="message-types" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Tipos de mensajes</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Desde la barra de mensaje tienes los botones Biblioteca, Adjuntos, Respuestas predefinidas,
            Plantillas, Crear actividad, Botones y Nota de voz. Estos son los tipos que puedes enviar:
          </p>
          <div className="space-y-3 mb-4">
            {[
              { type: "Texto", icon: "💬", desc: "Mensajes de texto con emojis. Máximo 4096 caracteres. Puedes responder citando un mensaje.", usage: "Conversaciones generales, respuestas rápidas." },
              { type: "Imagen", icon: "🖼️", desc: "JPG, PNG o WEBP de hasta 5 MB, con texto opcional.", usage: "Catálogos, comprobantes, fotos de producto." },
              { type: "Documento", icon: "📄", desc: "PDF, Word, Excel, PowerPoint, TXT, CSV o ZIP, de hasta 50 MB.", usage: "Contratos, cotizaciones, facturas, manuales." },
              { type: "Video", icon: "🎥", desc: "MP4 o 3GP de hasta 16 MB.", usage: "Demostraciones de producto, tutoriales." },
              { type: "Audio y nota de voz", icon: "🎤", desc: "Graba una nota de voz con el botón \"Nota de voz\" o adjunta un audio MP3 u OGG.", usage: "Mensajes de voz personalizados." },
              { type: "Plantilla", icon: "📋", desc: "Plantilla aprobada por Meta, la única opción con la ventana de 24 h cerrada.", usage: "Mensajes proactivos, recordatorios, notificaciones." },
              { type: "Botones y listas", icon: "🔘", desc: "Con la ventana de 24 h abierta, el botón \"Botones\" manda hasta 3 botones o una lista de hasta 10 opciones, sin plantilla. Las plantillas pueden llevar hasta 10 botones.", usage: "Encuestas, confirmaciones, menús de opciones." },
            ].map((m) => (
              <div key={m.type} className="flex gap-4 p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <span className="text-2xl flex-shrink-0">{m.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--foreground)" }}>{m.type}</p>
                  <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>{m.desc}</p>
                  <p className="text-xs" style={{ color: "#d1345b" }}>Uso: {m.usage}</p>
                </div>
              </div>
            ))}
          </div>
          <Callout type="note">
            Si un cliente te manda una ubicación o una tarjeta de contacto, la ves en el chat, pero
            desde el CRM no puedes enviar ninguna de las dos.
          </Callout>
        </section>

        <section id="quick-replies" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Respuestas rápidas</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las respuestas rápidas (fragmentos) son textos predefinidos que tu equipo inserta para
            responder más rápido. Se crean en <strong style={{ color: "var(--foreground)" }}>Comunicación → Fragmentos</strong> y
            pueden incluir una imagen.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Usar respuestas rápidas</h3>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Escribe <code style={{ color: "#d1345b" }}>#</code> seguido del atajo (por ejemplo <code style={{ color: "#d1345b" }}>#precios</code>); mientras escribes aparecen los que coinciden. Pulsa <strong style={{ color: "var(--foreground)" }}>Tab</strong> para insertarlo.</li>
            <li>• También puedes abrir la lista con el botón <strong style={{ color: "var(--foreground)" }}>"Respuestas predefinidas"</strong> de la barra de mensaje.</li>
            <li>• Edita el texto antes de enviar si es necesario.</li>
          </ul>
          <Callout type="tip">
            Crea respuestas rápidas para: saludos, preguntas frecuentes, confirmaciones de citas,
            información de precios y horarios de atención. Esto reduce el tiempo de respuesta
            promedio significativamente.
          </Callout>
        </section>

        <section id="assignment" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Asignación de chats</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada conversación puede quedar a cargo de una persona del equipo o de un agente IA.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Manual:</strong> en la barra de arriba del chat, usa <strong style={{ color: "var(--foreground)" }}>"Asignado a:"</strong> y elige un asesor o un agente IA.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por número de WhatsApp:</strong> en Ajustes → WhatsApp → editar línea → <strong style={{ color: "var(--foreground)" }}>"Asignar a"</strong>, cada chat nuevo de ese número llega a quien elijas.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por columna:</strong> en Ajustes → Conversaciones → editar columna → <strong style={{ color: "var(--foreground)" }}>"Asignación automática"</strong>, los chats que entran a esa columna se asignan a un usuario.</li>
          </ul>
        </section>

        <section id="search" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Búsqueda en conversaciones</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Pulsa <strong style={{ color: "var(--foreground)" }}>"Buscar"</strong> en la barra del tablero y escribe un solo término. Encuentra:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Palabras dentro de los mensajes (sin importar tildes ni mayúsculas)</li>
            <li>• Un número de teléfono o parte de él</li>
            <li>• El nombre de usuario que el cliente tiene en WhatsApp</li>
          </ul>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La búsqueda no filtra por fecha ni por asesor. Para ver solo los chats de una persona, usa el
            filtro "Asesor:" del tablero.
          </p>
        </section>

        <section id="status" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Estados de conversación</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las conversaciones no tienen un estado fijo tipo "abierto" o "resuelto": su estado es la
            columna en la que están, y las columnas las decides tú. Además, en la barra de arriba de
            cada chat puedes ajustar:
          </p>
          <div className="space-y-3 mb-4">
            {[
              { status: "Etapa", color: "#3b82f6", desc: "La columna del pipeline donde está el chat." },
              { status: "Prioridad", color: "#f59e0b", desc: "Alta, Media o Baja." },
              { status: "Puntuación", color: "#22c55e", desc: "Qué tan caliente está el lead, de 0 a 100." },
              { status: "Asignado a", color: "#6b7280", desc: "La persona o el agente IA a cargo. Sin nadie, el chat queda sin asignar." },
            ].map((s) => (
              <div key={s.status} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <div>
                  <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{s.status}:</span>
                  <span className="text-sm ml-2" style={{ color: "var(--muted-foreground)" }}>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <Callout type="tip">
            En <strong>Ajustes → Conversaciones</strong> también configuras los números bloqueados y el
            autorespondedor fuera de horario laboral: eliges días, horas y el mensaje, que se envía una
            sola vez por conversación.
          </Callout>
        </section>

        <section id="kanban" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Kanban, líneas y pipelines</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Con un solo número de WhatsApp y un solo pipeline el inbox se ve como siempre. Cuando la
            organización crece, aparecen dos selectores en la barra superior del tablero:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Línea:", href: "/docs/whatsapp-lines", items: ["Aparece con dos o más números de WhatsApp conectados", "Filtra el tablero a los chats de ese número", "Cada tarjeta lleva el punto de color y el nombre de su línea", "Un cliente que escribe a dos números tiene dos chats"] },
              { title: "Pipeline:", href: "/docs/conversation-pipelines", items: ["Aparece con dos o más pipelines de conversación", "Cambia las columnas y los chats que ves", "Se administran en Ajustes → Conversaciones", "Cada línea de WhatsApp puede nacer en su propio pipeline"] },
            ].map((p) => (
              <div key={p.title} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>
                  Selector <code style={{ color: "#d1345b" }}>{p.title}</code>{" "}
                  <a href={p.href} className="text-xs font-normal" style={{ color: "#d1345b" }}>(guía completa →)</a>
                </p>
                <ul className="space-y-1">
                  {p.items.map((i) => (
                    <li key={i} className="text-sm flex gap-2" style={{ color: "var(--muted-foreground)" }}>
                      <span style={{ color: "#d1345b" }}>•</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Mover una conversación</h3>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Arrastrar la tarjeta</strong> a otra columna, o menú ⋯ → <strong style={{ color: "var(--foreground)" }}>Mover a columna</strong>.</li>
            <li>• Menú ⋯ → <strong style={{ color: "var(--foreground)" }}>Mover a pipeline</strong>: eliges el pipeline destino y, sobre él, la columna donde quedará. Solo aparece con más de un pipeline.</li>
            <li>• Desde el chat abierto, en la barra de arriba (junto a "Etapa:"), el botón <strong style={{ color: "var(--foreground)" }}>"Mover a otro pipeline"</strong>.</li>
          </ul>
          <Callout type="note">
            Todo chat nuevo nace en el pipeline de la línea de WhatsApp por la que entra o sale (entrante,
            plantilla o campaña). Si la línea no tiene pipeline, nace en el predeterminado de la organización.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/pipelines", title: "Pipelines de negocios" }}
          next={{ href: "/docs/conversation-pipelines", title: "Pipelines de conversación" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
