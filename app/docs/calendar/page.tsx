import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Calendario, tareas y seguimientos",
  description:
    "Usa el calendario del CRM para agendar reuniones, tareas y recordatorios, y ver en una sola vista los seguimientos programados de tus contactos y empresas.",
  keywords: ["calendario CRM", "agendar reuniones", "tareas", "recordatorios", "seguimientos de clientes"],
  alternates: { canonical: "/docs/calendar" },
  openGraph: {
    title: "Calendario, tareas y seguimientos",
    description:
      "Usa el calendario del CRM para agendar reuniones, tareas y recordatorios, y ver en una sola vista los seguimientos programados de tus contactos y empresas.",
    url: "/docs/calendar",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "Vista de calendario" },
  { id: "events", label: "Crear eventos" },
  { id: "tasks", label: "Seguimientos y tareas" },
  { id: "views", label: "Vistas y atajos" },
];

export default function CalendarPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Calendario</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El Calendario reúne tus reuniones, tareas y recordatorios, junto con los seguimientos que
          programas en tus contactos y empresas. Lo encuentras en{" "}
          <strong style={{ color: "var(--foreground)" }}>Planeación → Calendario</strong>.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Vista de calendario</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El calendario muestra <strong style={{ color: "var(--foreground)" }}>tu agenda</strong>: los
            eventos que te asignaron y los que tú creaste. Puedes filtrar por tipo de evento y por
            etiqueta, y moverte rápido entre fechas con el mini calendario lateral.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { type: "Reunión", color: "#2563EB" },
              { type: "Tarea", color: "#7C3AED" },
              { type: "Recordatorio", color: "#D97706" },
              { type: "Seguimiento", color: "#059669" },
            ].map((t) => (
              <div key={t.type} className="flex items-center gap-2 p-2 rounded border text-sm" style={{ borderColor: "var(--border)" }}>
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                <span style={{ color: "var(--foreground)" }}>{t.type}</span>
              </div>
            ))}
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Reunión, Tarea y Recordatorio son los tipos que creas desde el calendario. Los
            Seguimientos vienen de las actividades que programas en contactos y empresas. Si le pones
            una etiqueta a un evento, el evento toma el color de la etiqueta.
          </p>
        </section>

        <section id="events" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear eventos</h2>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Tienes tres formas de crear un evento:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• El botón <strong style={{ color: "var(--foreground)" }}>Agregar evento</strong>.</li>
            <li>• Haz clic sobre un día u hora del calendario. En la creación rápida puedes escribir la fecha en el título, por ejemplo «reunión mañana 3pm», y el calendario la entiende.</li>
            <li>• Pulsa la tecla <strong style={{ color: "var(--foreground)" }}>C</strong>.</li>
          </ul>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            En el formulario completo defines:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Título</strong>, <strong style={{ color: "var(--foreground)" }}>Tipo</strong>, <strong style={{ color: "var(--foreground)" }}>Inicio</strong> y <strong style={{ color: "var(--foreground)" }}>Fin</strong>, y la <strong style={{ color: "var(--foreground)" }}>Zona horaria</strong>.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Repetir</strong>: todos los días, lunes a viernes, cada semana, cada 2 semanas, cada mes, cada año o una regla personalizada. Al editar un evento repetido puedes cambiar solo esa ocurrencia.</li>
            <li>• Un recordatorio para el asesor, con la antelación que elijas.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Contacto</strong>: vincula el evento a un contacto del CRM; su correo se agrega solo a los invitados.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Asesor</strong> responsable y <strong style={{ color: "var(--foreground)" }}>Ubicación o link</strong> (oficina, Google Meet, Zoom…).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Invitados</strong>: reciben una invitación por correo que se agrega a su calendario y se actualiza si reprogramas o cancelas.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Descripción</strong> y <strong style={{ color: "var(--foreground)" }}>Etiqueta</strong>.</li>
          </ul>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para reprogramar, arrastra el evento a otro día u hora.
          </p>
          <Callout type="tip">
            Cuando vinculas un evento a un contacto, aparece en la actividad de ese contacto como
            «Cita». Y con el disparador <strong>Cita próxima</strong> de{" "}
            <Link href="/docs/workflows" style={{ color: "#d1345b" }}>Automatizaciones</Link> puedes
            escribirle al contacto un tiempo antes de la cita para recordársela.
          </Callout>
          <Callout type="note">
            Hoy los eventos se vinculan a contactos, no a negocios.
          </Callout>
        </section>

        <section id="tasks" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Seguimientos y tareas</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los seguimientos que programas en tus contactos y empresas aparecen en el calendario, y
            puedes marcarlos como completados desde ahí con <strong style={{ color: "var(--foreground)" }}>Completar</strong>.
          </p>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            «Tarea» en el calendario es solo un tipo de evento. Las tareas de proyectos (incluidas las
            que crean las automatizaciones) no se muestran en el calendario: se gestionan en{" "}
            <Link href="/docs/projects" style={{ color: "#d1345b" }}>Planeación → Proyectos y tareas</Link>.
          </p>
        </section>

        <section id="views" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Vistas y atajos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { view: "Mes", desc: "Visión general del mes. Ideal para planear y ver tu disponibilidad." },
              { view: "Semana", desc: "La semana con horarios, para organizar el día a día." },
              { view: "Día", desc: "El detalle del día con bloques por hora." },
              { view: "Agenda", desc: "Tus próximos eventos en forma de lista." },
            ].map((v) => (
              <div key={v.view} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>{v.view}</p>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { key: "T", desc: "Ir a hoy" },
              { key: "← / →", desc: "Periodo anterior / siguiente" },
              { key: "M · W · D · A", desc: "Mes, Semana, Día, Agenda" },
              { key: "C", desc: "Crear evento" },
            ].map((s) => (
              <div key={s.key} className="p-2 rounded border text-sm text-center" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-mono font-medium" style={{ color: "var(--foreground)" }}>{s.key}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <DocNav
          prev={{ href: "/docs/agentes-ia", title: "Agentes IA" }}
          next={{ href: "/docs/projects", title: "Proyectos" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
