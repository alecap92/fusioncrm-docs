import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Pipelines de ventas con etapas a tu medida",
  description:
    "Diseña el pipeline de ventas de tu empresa: crea embudos, configura sus etapas, edítalos o elimínalos y aplica buenas prácticas para no perder negocios.",
  keywords: ["pipeline de ventas", "embudo de ventas", "etapas de venta", "proceso comercial", "buenas prácticas"],
  alternates: { canonical: "/docs/pipelines" },
  openGraph: {
    title: "Pipelines de ventas con etapas a tu medida",
    description:
      "Diseña el pipeline de ventas de tu empresa: crea embudos, configura sus etapas, edítalos o elimínalos y aplica buenas prácticas para no perder negocios.",
    url: "/docs/pipelines",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "¿Qué es un pipeline?" },
  { id: "create", label: "Crear pipeline" },
  { id: "stages", label: "Configurar etapas" },
  { id: "edit", label: "Editar pipeline" },
  { id: "delete", label: "Eliminar pipeline" },
  { id: "best-practices", label: "Buenas prácticas" },
];

export default function PipelinesPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Pipelines</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Los pipelines definen el proceso de ventas de tu organización. Cada pipeline tiene etapas
          personalizables que representan las fases por las que pasa una oportunidad de venta.
        </p>

        <Callout type="note">
          Esta página es sobre los pipelines de <strong>negocios</strong> (deals). Las conversaciones
          tienen sus propios tableros: ver{" "}
          <a href="/docs/conversation-pipelines" style={{ color: "#d1345b" }}>Pipelines de conversación</a>.
        </Callout>

        <section id="overview" className="mb-10 mt-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>¿Qué es un pipeline?</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Un <strong style={{ color: "var(--foreground)" }}>pipeline</strong> es un proceso de ventas
            compuesto por etapas secuenciales. Puedes tener múltiples pipelines para diferentes
            tipos de venta o productos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { title: "Pipeline de ventas directas", stages: "Prospección → Calificación → Propuesta → Cierre" },
              { title: "Pipeline de renovaciones", stages: "Revisión → Oferta → Negociación → Renovado" },
              { title: "Pipeline de canal indirecto", stages: "Lead → Partner → Demo → Firma" },
            ].map((p) => (
              <div key={p.title} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold text-sm mb-2" style={{ color: "var(--foreground)" }}>{p.title}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.stages}</p>
              </div>
            ))}
          </div>
          <Callout type="note">
            Tu organización arranca sin pipelines de negocios: mientras no crees uno, Oportunidades
            muestra «No hay pipelines configurados». Crea el primero en Configuración → Módulos del
            CRM → Negocios.
          </Callout>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear pipeline</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>Para crear un nuevo pipeline:</p>
          <ol className="space-y-3 mb-4">
            {[
              { n: "1", t: "Ve a Configuración → Módulos del CRM → Negocios", d: "Ahí está la gestión de pipelines de negocios." },
              { n: "2", t: "Pulsa «Nuevo Pipeline»", d: "Se abre la configuración del pipeline nuevo." },
              { n: "3", t: "Asigna un nombre y, si quieres, una descripción", d: "Elige un nombre que identifique el tipo de proceso de ventas." },
              { n: "4", t: "Ajusta las etapas", d: "El pipeline nuevo trae tres etapas de ejemplo (Nuevo, En Progreso, Cerrado) que puedes renombrar, borrar o ampliar. Necesita al menos una etapa." },
              { n: "5", t: "Guarda", d: "Pulsa «Guardar pipeline» y luego «Guardar Cambios». El pipeline queda disponible en Negocio → Oportunidades." },
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
        </section>

        <section id="stages" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Configurar etapas</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada etapa de un pipeline tiene las siguientes propiedades configurables:
          </p>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Propiedades de etapa</div>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Propiedad</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Nombre", "Título descriptivo de la etapa (ej. \"Propuesta enviada\")"],
                  ["Color", "Color visual de la tarjeta en el Kanban"],
                  ["Probabilidad %", "Porcentaje de éxito estimado para los negocios en esta etapa (en las etapas cerradas queda fija)"],
                  ["Tipo", "Abierta (en curso), Ganada o Perdida (las dos últimas son etapas de cierre)"],
                  ["Días máximos en esta etapa", "Opcional: pasado ese tope, el negocio se marca como estancado"],
                  ["Orden", "Posición de la etapa en el pipeline; se cambia con las flechas de subir y bajar"],
                ].map(([p, d]) => (
                  <tr key={p}>
                    <td className="p-3 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{p}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout type="tip">
            Configura la probabilidad de cada etapa de manera realista basándote en tus datos
            históricos. Esto mejora la precisión del pronóstico de ventas en los reportes.
          </Callout>
        </section>

        <section id="edit" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Editar pipeline</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para editar un pipeline existente, ve a <strong style={{ color: "var(--foreground)" }}>
            Configuración → Módulos del CRM → Negocios</strong> y pulsa el ícono «Configurar pipeline».
            Puedes:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Renombrar el pipeline</li>
            <li>• Agregar nuevas etapas</li>
            <li>• Reordenar etapas con las flechas</li>
            <li>• Editar el nombre, color, tipo, probabilidad y tope de días de cada etapa</li>
            <li>• Definir los campos personalizados de los negocios de ese pipeline</li>
            <li>• Configurar los <a href="/docs/deals#requirements" style={{ color: "#d1345b" }}>requisitos por etapa</a> y el checklist de cierre</li>
            <li>• Eliminar etapas que no tengan negocios</li>
          </ul>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los cambios se aplican al pulsar «Guardar pipeline» y luego «Guardar Cambios».
          </p>
          <Callout type="warning">
            No puedes eliminar una etapa que tenga negocios, aunque estén ganados o perdidos.
            Muévelos primero a otra etapa.
          </Callout>
        </section>

        <section id="delete" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Eliminar pipeline</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Desde Configuración puedes eliminar cualquier pipeline, incluso si tiene negocios. Se
            borran el pipeline y sus etapas, y no hay opción de archivarlo.
          </p>
          <Callout type="danger">
            Si el pipeline tiene negocios, esos negocios dejan de verse en el tablero. Antes de
            eliminarlo, revisa que no tenga negocios que necesites (puedes exportarlos desde
            Oportunidades). La eliminación no se puede deshacer.
          </Callout>
        </section>

        <section id="best-practices" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Buenas prácticas</h2>
          <div className="space-y-4">
            {[
              { tip: "Mantén 5-7 etapas por pipeline", detail: "Los pipelines con demasiadas etapas son difíciles de gestionar. Consolida etapas similares." },
              { tip: "Usa nombres de acción en las etapas", detail: "Ej. \"Propuesta enviada\" en lugar de solo \"Propuesta\". Esto aclara qué ha pasado." },
              { tip: "Crea pipelines separados por producto o mercado", detail: "Si vendes productos muy diferentes o atiendes mercados distintos, usa pipelines separados para mejor visibilidad." },
              { tip: "Revisa el pipeline semanalmente", detail: "Dedica tiempo semanal a revisar los deals de cada etapa y actualizar los que han avanzado." },
            ].map((b) => (
              <div key={b.tip} className="flex gap-3 p-4 rounded-lg" style={{ backgroundColor: "var(--muted)", border: "1px solid var(--border)" }}>
                <span style={{ color: "#22c55e", fontSize: "1.1rem" }}>✓</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{b.tip}</p>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{b.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <DocNav
          prev={{ href: "/docs/deals", title: "Deals" }}
          next={{ href: "/docs/conversations", title: "Conversaciones" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
