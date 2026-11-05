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
          Organiza el trabajo del equipo en proyectos y tareas, con responsables, fechas límite y
          comentarios. Lo encuentras en{" "}
          <strong style={{ color: "var(--foreground)" }}>Planeación → Proyectos y tareas</strong>.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Gestión de proyectos</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Un proyecto agrupa tareas relacionadas; cada tarea tiene su propio responsable y su fecha
            límite. Son útiles para:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Entregas o implementaciones para clientes</li>
            <li>• Proyectos internos del equipo</li>
            <li>• Iniciativas de ventas o marketing</li>
            <li>• Onboarding de clientes nuevos</li>
          </ul>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las tareas se ven en <strong style={{ color: "var(--foreground)" }}>vista Tablero</strong>{" "}
            (columnas por estado, para arrastrar el trabajo de una etapa a otra) o en <strong style={{ color: "var(--foreground)" }}>vista Lista</strong>.
          </p>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear proyecto</h2>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a <strong style={{ color: "var(--foreground)" }}>Planeación → Proyectos y tareas</strong></li>
            <li>2. Toca <strong style={{ color: "var(--foreground)" }}>Nuevo Proyecto</strong></li>
            <li>3. Escribe el <strong style={{ color: "var(--foreground)" }}>Nombre</strong>, una <strong style={{ color: "var(--foreground)" }}>Descripción</strong> (opcional) y elige un <strong style={{ color: "var(--foreground)" }}>Color</strong></li>
            <li>4. Crea las tareas del proyecto con <strong style={{ color: "var(--foreground)" }}>Nueva Tarea</strong></li>
          </ol>
        </section>

        <section id="tasks" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Tareas de proyecto</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada tarea tiene:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {[
              "Título", "Descripción", "Proyecto",
              "Estado: No Iniciado, En Progreso, Revisión o Completado", "Prioridad: Alta, Media o Baja", "Fecha límite",
              "Responsable", "Etiquetas", "Comentarios con @menciones",
            ].map((f) => (
              <div key={f} className="p-2 rounded border text-sm text-center" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)" }}>
                {f}
              </div>
            ))}
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En los comentarios puedes mencionar a un compañero con <code style={{ color: "#d1345b" }}>@</code>{" "}
            para avisarle, y cada tarea guarda el historial de sus cambios. Cuando una tarea está por
            vencer, su responsable recibe un aviso.
          </p>
          <Callout type="note">
            Las tareas no tienen archivos adjuntos ni subtareas. Si necesitas dividir un trabajo,
            crea varias tareas en el mismo proyecto.
          </Callout>
          <Callout type="tip">
            Las automatizaciones también pueden crear tareas, por ejemplo cuando llega un formulario o
            un negocio cambia de etapa.
          </Callout>
        </section>

        <section id="team" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Equipo y asignaciones</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Todo el equipo de tu organización ve todos los proyectos y sus tareas: no hay proyectos
            privados ni lista de miembros por proyecto. Para repartir el trabajo, asigna un{" "}
            <strong style={{ color: "var(--foreground)" }}>Responsable</strong> a cada tarea.
          </p>
          <Callout type="note">
            Hoy los proyectos no se vinculan a contactos ni a negocios, así que no aparecen en la ficha
            del cliente.
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
