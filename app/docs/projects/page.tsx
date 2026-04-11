import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Proyectos" };

const toc = [
  { id: "overview", label: "Gestión de proyectos" },
  { id: "create", label: "Crear proyecto" },
  { id: "tasks", label: "Tareas de proyecto" },
  { id: "team", label: "Equipo y asignaciones" },
];

export default function ProjectsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Proyectos</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El módulo de Proyectos permite gestionar trabajos internos y entregas a clientes
          con tareas, asignaciones y seguimiento de progreso.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Gestión de proyectos</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los proyectos en FusionCRM son contenedores de tareas relacionadas que tienen
            un objetivo común, una fecha límite y un equipo asignado. Son útiles para:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Implementaciones o entregas a clientes</li>
            <li>• Proyectos internos del equipo</li>
            <li>• Seguimiento de iniciativas de ventas o marketing</li>
            <li>• Onboarding de nuevos clientes</li>
          </ul>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear proyecto</h2>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a la sección Proyectos desde la barra lateral</li>
            <li>2. Haz clic en "+ Nuevo proyecto"</li>
            <li>3. Asigna nombre, descripción y fecha límite</li>
            <li>4. Asocia el proyecto a un contacto o cliente (opcional)</li>
            <li>5. Agrega miembros del equipo al proyecto</li>
            <li>6. Comienza a crear tareas dentro del proyecto</li>
          </ol>
        </section>

        <section id="tasks" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Tareas de proyecto</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada tarea dentro de un proyecto tiene:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {[
              "Título descriptivo", "Descripción detallada", "Asignado a (miembro)",
              "Fecha de vencimiento", "Prioridad (alta/media/baja)", "Estado (pendiente/en progreso/hecho)",
              "Archivos adjuntos", "Comentarios del equipo", "Subtareas",
            ].map((f) => (
              <div key={f} className="p-2 rounded border text-sm text-center" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)" }}>
                {f}
              </div>
            ))}
          </div>
        </section>

        <section id="team" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Equipo y asignaciones</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los proyectos tienen un equipo asignado. Solo los miembros del equipo pueden ver
            y editar las tareas del proyecto, a menos que sea un proyecto público.
          </p>
          <Callout type="tip">
            Para proyectos de entrega a cliente, asocia el proyecto al contacto del cliente.
            Esto permite ver el proyecto directamente desde el perfil del cliente.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/calendar", title: "Calendario" }}
          next={{ href: "/docs/settings", title: "Configuración" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
