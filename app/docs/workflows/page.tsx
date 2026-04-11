import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Automatizaciones" };

const toc = [
  { id: "overview", label: "¿Qué son los workflows?" },
  { id: "editor", label: "Editor visual" },
  { id: "triggers", label: "Tipos de trigger" },
  { id: "actions", label: "Acciones disponibles" },
  { id: "create", label: "Crear un workflow" },
  { id: "history", label: "Historial de ejecución" },
  { id: "examples", label: "Ejemplos prácticos" },
];

export default function WorkflowsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Automatizaciones</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El editor de workflows te permite automatizar tareas repetitivas mediante flujos
          visuales con triggers (disparadores) y acciones, sin necesidad de código.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>¿Qué son los workflows?</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Un workflow (flujo de trabajo o automatización) es una secuencia de acciones que se
            ejecutan automáticamente cuando ocurre un evento específico (trigger).
          </p>
          <div className="p-4 rounded-lg border mb-6" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Estructura básica de un workflow:</p>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { label: "TRIGGER", color: "#8b5cf6", desc: "¿Cuándo?" },
                { label: "→", color: "var(--muted-foreground)" },
                { label: "CONDICIÓN", color: "#3b82f6", desc: "¿Si...?" },
                { label: "→", color: "var(--muted-foreground)" },
                { label: "ACCIÓN", color: "#22c55e", desc: "¿Qué hacer?" },
              ].map((n, i) => (
                n.label === "→"
                  ? <span key={i} className="text-lg font-bold" style={{ color: n.color }}>→</span>
                  : (
                    <div key={i} className="text-center">
                      <div className="px-3 py-2 rounded font-bold text-xs text-white" style={{ backgroundColor: n.color }}>{n.label}</div>
                      <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>{n.desc}</div>
                    </div>
                  )
              ))}
            </div>
          </div>
        </section>

        <section id="editor" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Editor visual</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            FusionCRM usa un editor visual basado en nodos (similar a N8N o Zapier) donde puedes:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Arrastrar y conectar nodos para crear el flujo</li>
            <li>• Configurar cada nodo con un panel de propiedades</li>
            <li>• Agregar ramas condicionales (if/else)</li>
            <li>• Usar el modo de prueba para ejecutar el workflow manualmente</li>
            <li>• Ver el historial de ejecuciones con estado de cada nodo</li>
          </ul>
        </section>

        <section id="triggers" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Tipos de trigger</h2>
          <div className="space-y-3 mb-4">
            {[
              { type: "Contacto creado", icon: "👤", desc: "Se dispara cuando se crea un nuevo contacto en el CRM.", example: "Enviar email de bienvenida automáticamente." },
              { type: "Deal cambia de etapa", icon: "📊", desc: "Se dispara cuando un deal se mueve a una etapa específica.", example: "Notificar al gerente cuando un deal llega a Negociación." },
              { type: "Tarea completada", icon: "✅", desc: "Se dispara cuando se marca una tarea como completada.", example: "Crear la siguiente tarea en el proceso de ventas." },
              { type: "Webhook recibido", icon: "🔗", desc: "Se dispara cuando llega una petición HTTP al webhook del workflow.", example: "Procesar leads de un formulario externo." },
              { type: "Fecha programada", icon: "📅", desc: "Se dispara en una fecha y hora específica.", example: "Enviar recordatorio 24h antes de una reunión." },
              { type: "Manual", icon: "▶️", desc: "Se dispara manualmente desde el CRM o vía API.", example: "Ejecutar un flujo de onboarding para un cliente específico." },
              { type: "Email recibido", icon: "📧", desc: "Se dispara cuando llega un nuevo email a una cuenta conectada.", example: "Crear contacto automáticamente desde emails entrantes." },
            ].map((t) => (
              <div key={t.type} className="flex gap-4 p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{t.type}</p>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{t.desc}</p>
                  <p className="text-xs mt-1" style={{ color: "#d1345b" }}>Ej: {t.example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="actions" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Acciones disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {[
              { action: "Enviar email", desc: "Envía un email usando una plantilla." },
              { action: "Enviar WhatsApp", desc: "Envía un template de WhatsApp al contacto." },
              { action: "Crear tarea", desc: "Crea una tarea asignada a un agente." },
              { action: "Actualizar contacto", desc: "Modifica campos del contacto." },
              { action: "Crear deal", desc: "Abre un nuevo deal en un pipeline." },
              { action: "Mover deal de etapa", desc: "Avanza o regresa un deal." },
              { action: "Agregar a lista", desc: "Añade el contacto a una lista." },
              { action: "Asignar propietario", desc: "Cambia el agente asignado." },
              { action: "Notificación interna", desc: "Alerta a un usuario en el CRM." },
              { action: "Llamar webhook", desc: "Hace POST a una URL externa." },
              { action: "Esperar X tiempo", desc: "Pausa el flujo por tiempo definido." },
              { action: "Condición if/else", desc: "Bifurca el flujo según criterios." },
            ].map((a) => (
              <div key={a.action} className="flex gap-2 p-3 rounded border text-sm" style={{ borderColor: "var(--border)" }}>
                <span style={{ color: "#22c55e" }}>▸</span>
                <div>
                  <span className="font-medium" style={{ color: "var(--foreground)" }}>{a.action}:</span>
                  <span className="ml-1" style={{ color: "var(--muted-foreground)" }}>{a.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear un workflow</h2>
          <ol className="space-y-3 mb-4">
            {[
              { n: "1", t: "Ve a Automatizaciones → Nuevo workflow", d: "Desde la barra lateral." },
              { n: "2", t: "Selecciona el trigger", d: "Elige el evento que inicia el workflow." },
              { n: "3", t: "Agrega condiciones (opcional)", d: "Define criterios para que el workflow solo se ejecute en ciertos casos." },
              { n: "4", t: "Agrega acciones", d: "Arrastra nodos de acción y configura cada uno." },
              { n: "5", t: "Prueba el workflow", d: "Usa el botón de prueba para ejecutarlo manualmente y verificar que funciona." },
              { n: "6", t: "Activa el workflow", d: "Activa el toggle. El workflow comenzará a ejecutarse automáticamente." },
            ].map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#d1345b" }}>{s.n}</span>
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{s.t}</p>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <Callout type="warning">
            Prueba siempre un workflow antes de activarlo en producción. Un workflow mal configurado
            puede enviar mensajes no deseados o crear registros duplicados.
          </Callout>
        </section>

        <section id="history" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Historial de ejecución</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada ejecución de un workflow queda registrada con:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Fecha y hora de ejecución</li>
            <li>• Trigger que lo activó</li>
            <li>• Contacto o entidad involucrada</li>
            <li>• Estado de cada nodo (exitoso, fallido)</li>
            <li>• Mensajes de error si los hay</li>
          </ul>
          <Callout type="tip">
            Revisa el historial de ejecución después de las primeras activaciones para asegurarte
            de que el workflow funciona como esperabas y no hay errores silenciosos.
          </Callout>
        </section>

        <section id="examples" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Ejemplos prácticos</h2>
          <div className="space-y-4">
            {[
              {
                title: "Bienvenida a nuevo lead",
                trigger: "Contacto creado",
                actions: "Esperar 5 min → Enviar email de bienvenida → Crear tarea \"Llamar al lead\" para el vendedor",
              },
              {
                title: "Seguimiento post-propuesta",
                trigger: "Deal cambia a etapa \"Propuesta enviada\"",
                actions: "Esperar 3 días → Si deal sigue en misma etapa → Enviar email de seguimiento al cliente",
              },
              {
                title: "Alerta de deal en riesgo",
                trigger: "Deal sin actividad por 7 días",
                actions: "Notificación interna al propietario del deal → Crear tarea urgente de seguimiento",
              },
              {
                title: "Recordatorio de cita",
                trigger: "24h antes de una actividad/cita",
                actions: "Enviar WhatsApp de recordatorio al contacto con template aprobado",
              },
            ].map((ex) => (
              <div key={ex.title} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-bold mb-2" style={{ color: "var(--foreground)" }}>{ex.title}</p>
                <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>
                  <span style={{ color: "#8b5cf6" }}>TRIGGER:</span> {ex.trigger}
                </p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <span style={{ color: "#22c55e" }}>ACCIONES:</span> {ex.actions}
                </p>
              </div>
            ))}
          </div>
        </section>

        <DocNav
          prev={{ href: "/docs/lead-scoring", title: "Lead Scoring" }}
          next={{ href: "/docs/calendar", title: "Calendario" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
