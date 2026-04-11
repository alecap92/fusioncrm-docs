import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Calendario" };

const toc = [
  { id: "overview", label: "Vista de calendario" },
  { id: "events", label: "Crear eventos" },
  { id: "tasks", label: "Tareas y actividades" },
  { id: "views", label: "Vistas disponibles" },
];

export default function CalendarPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Calendario</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El módulo de Calendario centraliza todas las actividades, citas y tareas del equipo
          en una vista temporal para facilitar la planificación y el seguimiento.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Vista de calendario</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El calendario muestra todos los eventos y actividades del CRM en vistas mensual, semanal
            y diaria. Puedes filtrar por tipo de actividad o por miembro del equipo.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { type: "Llamadas", color: "#3b82f6" },
              { type: "Reuniones", color: "#8b5cf6" },
              { type: "Emails", color: "#22c55e" },
              { type: "Tareas", color: "#f59e0b" },
              { type: "Demos", color: "#d1345b" },
              { type: "Citas", color: "#14b8a6" },
              { type: "Seguimientos", color: "#f97316" },
              { type: "Otros", color: "#6b7280" },
            ].map((t) => (
              <div key={t.type} className="flex items-center gap-2 p-2 rounded border text-sm" style={{ borderColor: "var(--border)" }}>
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                <span style={{ color: "var(--foreground)" }}>{t.type}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="events" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear eventos</h2>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Para crear un nuevo evento en el calendario:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Haz clic en cualquier fecha/hora del calendario para crear un evento</li>
            <li>• O usa el botón "+ Nuevo evento" en la barra superior</li>
            <li>• Completa: título, tipo, fecha/hora de inicio y fin</li>
            <li>• Asocia el evento a un contacto y/o deal</li>
            <li>• Asigna el evento a un miembro del equipo</li>
            <li>• Agrega notas o descripción</li>
          </ul>
          <Callout type="tip">
            Cuando creas un evento asociado a un deal, aparece automáticamente en el historial
            de actividades de ese deal. Mantén el registro de todas las interacciones aquí.
          </Callout>
        </section>

        <section id="tasks" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Tareas y actividades</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las tareas son actividades con fecha de vencimiento asignadas a un agente. Aparecen
            en el calendario y también en el panel de actividades del deal o contacto relacionado.
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Las tareas vencidas aparecen marcadas en rojo</li>
            <li>• Puedes marcar tareas como completadas directamente desde el calendario</li>
            <li>• Las automatizaciones pueden crear tareas automáticamente</li>
          </ul>
        </section>

        <section id="views" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Vistas disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { view: "Vista mensual", desc: "Visión general del mes. Ideal para planificación macro y verificar disponibilidad." },
              { view: "Vista semanal", desc: "Detalle de la semana con horarios. Mejor para gestión diaria del equipo." },
              { view: "Vista diaria", desc: "Detalle completo del día actual con bloques de tiempo por hora." },
            ].map((v) => (
              <div key={v.view} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>{v.view}</p>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <DocNav
          prev={{ href: "/docs/workflows", title: "Automatizaciones" }}
          next={{ href: "/docs/projects", title: "Proyectos" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
