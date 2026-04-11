import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Conversaciones" };

const toc = [
  { id: "overview", label: "Vista general" },
  { id: "inbox", label: "Bandeja unificada" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "message-types", label: "Tipos de mensajes" },
  { id: "quick-replies", label: "Respuestas rápidas" },
  { id: "assignment", label: "Asignación de chats" },
  { id: "search", label: "Búsqueda en conversaciones" },
  { id: "status", label: "Estados de conversación" },
];

export default function ConversationsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Conversaciones</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El módulo de Conversaciones centraliza todos los canales de comunicación — WhatsApp,
          email y chat — en una sola bandeja unificada para que tu equipo no pierda ningún mensaje.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Vista general</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La bandeja de conversaciones es similar a una aplicación de mensajería empresarial.
            A la izquierda ves la lista de conversaciones y a la derecha el hilo de mensajes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Lista de conversaciones", items: ["Ordenadas por último mensaje", "Indica canal (WA, Email)", "Muestra si está asignada", "Filtra por estado"] },
              { title: "Panel de mensajes", items: ["Historial completo del hilo", "Envío de mensajes y archivos", "Info del contacto a la derecha", "Acceso al perfil del contacto"] },
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
            La bandeja unificada muestra todas las conversaciones de todos los canales en una sola
            vista. Puedes filtrar por:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { filter: "Todas", desc: "Sin filtro" },
              { filter: "Sin asignar", desc: "Esperan atención" },
              { filter: "Mis chats", desc: "Asignados a ti" },
              { filter: "WhatsApp", desc: "Solo WA" },
              { filter: "Email", desc: "Solo email" },
              { filter: "Abiertos", desc: "En curso" },
              { filter: "Resueltos", desc: "Cerrados" },
              { filter: "Pendientes", desc: "En espera" },
            ].map((f) => (
              <div key={f.filter} className="p-2 rounded border text-center text-sm" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-medium" style={{ color: "var(--foreground)" }}>{f.filter}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <Callout type="tip">
            Usa el filtro "Sin asignar" al inicio del día para ver los mensajes que llegaron fuera
            del horario laboral y asignarlos al agente correspondiente.
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
            <li>1. Abre la conversación del contacto o crea una nueva</li>
            <li>2. Haz clic en el ícono de plantilla (📋) en el campo de mensaje</li>
            <li>3. Selecciona la plantilla aprobada que deseas enviar</li>
            <li>4. Completa las variables de la plantilla (nombre, fecha, etc.)</li>
            <li>5. Envía el mensaje</li>
          </ol>
        </section>

        <section id="message-types" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Tipos de mensajes</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            FusionCRM soporta todos los tipos de mensajes de WhatsApp Business API:
          </p>
          <div className="space-y-3 mb-4">
            {[
              { type: "Texto", icon: "💬", desc: "Mensajes de texto plano. Soporte para emojis. Máximo 4096 caracteres.", usage: "Conversaciones generales, respuestas rápidas." },
              { type: "Imagen", icon: "🖼️", desc: "Imágenes en formato JPG, PNG, WEBP. Tamaño máximo 5MB. Puedes agregar caption.", usage: "Enviar catálogos, comprobantes visuales, fotos de producto." },
              { type: "Documento", icon: "📄", desc: "Archivos PDF, DOC, XLS, PPT y más. Tamaño máximo 100MB.", usage: "Contratos, cotizaciones, facturas, manuales." },
              { type: "Video", icon: "🎥", desc: "Videos MP4, 3GP. Tamaño máximo 16MB.", usage: "Demostraciones de producto, tutoriales." },
              { type: "Audio", icon: "🎤", desc: "Notas de voz o archivos de audio MP3, OGG.", usage: "Mensajes de voz personalizados." },
              { type: "Ubicación", icon: "📍", desc: "Coordenadas GPS con nombre y dirección opcionales.", usage: "Indicar dirección de reuniones, tiendas, eventos." },
              { type: "Contacto", icon: "👤", desc: "Tarjeta de contacto vCard con nombre, teléfono y email.", usage: "Compartir datos de contacto de vendedores o soporte." },
              { type: "Template", icon: "📋", desc: "Plantilla aprobada por Meta para envío fuera de ventana 24h.", usage: "Mensajes proactivos, recordatorios, notificaciones." },
              { type: "Botones", icon: "🔘", desc: "Hasta 3 botones de respuesta rápida en templates.", usage: "Encuestas, confirmaciones, menús de opciones." },
              { type: "Lista", icon: "📝", desc: "Lista de opciones interactivas (hasta 10 ítems).", usage: "Menús de servicio, selección de productos." },
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
        </section>

        <section id="quick-replies" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Respuestas rápidas</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las respuestas rápidas son fragmentos de texto predefinidos que los agentes pueden
            insertar rápidamente para agilizar la atención al cliente.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Usar respuestas rápidas</h3>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Escribe <code style={{ color: "#d1345b" }}>/</code> en el campo de mensaje para abrir el menú de respuestas rápidas</li>
            <li>• Busca por nombre o contenido de la respuesta</li>
            <li>• Selecciona la respuesta para insertarla en el mensaje</li>
            <li>• Edita el texto antes de enviar si es necesario</li>
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
            Cada conversación puede ser asignada a un agente específico del equipo.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Manual:</strong> Usa el selector de agente en el panel derecho de la conversación</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Auto-asignación:</strong> Configurable en las reglas de automatización</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Reasignación:</strong> Cualquier agente con permisos puede reasignar</li>
          </ul>
        </section>

        <section id="search" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Búsqueda en conversaciones</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Usa la búsqueda para encontrar conversaciones o mensajes específicos:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Busca por nombre del contacto</li>
            <li>• Busca por contenido del mensaje (texto)</li>
            <li>• Filtra por fecha de la conversación</li>
            <li>• Filtra por agente asignado</li>
          </ul>
        </section>

        <section id="status" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Estados de conversación</h2>
          <div className="space-y-3">
            {[
              { status: "Abierto", color: "#3b82f6", desc: "Conversación activa que requiere atención." },
              { status: "Pendiente", color: "#f59e0b", desc: "En espera de respuesta del cliente o de una acción interna." },
              { status: "Resuelto", color: "#22c55e", desc: "Conversación finalizada satisfactoriamente." },
              { status: "Sin asignar", color: "#6b7280", desc: "Llegó un mensaje nuevo sin agente asignado." },
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
        </section>

        <DocNav
          prev={{ href: "/docs/pipelines", title: "Pipelines" }}
          next={{ href: "/docs/whatsapp-templates", title: "Templates WhatsApp" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
