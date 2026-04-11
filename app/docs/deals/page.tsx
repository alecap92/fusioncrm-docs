import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Deals" };

const toc = [
  { id: "overview", label: "Vista general" },
  { id: "kanban", label: "Vista Kanban" },
  { id: "crud", label: "CRUD de deals" },
  { id: "create", label: "Crear deal", depth: 3 },
  { id: "edit", label: "Editar deal", depth: 3 },
  { id: "stages", label: "Mover entre etapas" },
  { id: "filters", label: "Filtros y búsqueda" },
  { id: "products", label: "Productos en deals" },
  { id: "activities", label: "Actividades y notas" },
];

export default function DealsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Deals / Negocios</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El módulo de Deals gestiona tus oportunidades de venta a través de pipelines visuales
          con vista Kanban y seguimiento completo del ciclo de ventas.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Vista general</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Un <strong style={{ color: "var(--foreground)" }}>Deal</strong> (negocio u oportunidad) representa
            una venta potencial con un contacto o empresa. Cada deal tiene:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {[
              { label: "Nombre del deal", desc: "Identificador del negocio" },
              { label: "Valor", desc: "Monto estimado de la venta" },
              { label: "Contacto asociado", desc: "Cliente o prospecto" },
              { label: "Etapa del pipeline", desc: "Fase actual del negocio" },
              { label: "Propietario", desc: "Vendedor responsable" },
              { label: "Fecha de cierre", desc: "Fecha estimada de cierre" },
              { label: "Probabilidad", desc: "% de éxito estimado" },
              { label: "Productos", desc: "Ítems del negocio" },
              { label: "Actividades", desc: "Llamadas, emails, reuniones" },
            ].map((f) => (
              <div key={f.label} className="p-3 rounded-lg border text-sm" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>{f.label}</p>
                <p style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="kanban" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Vista Kanban</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La vista principal de Deals es un tablero Kanban donde cada columna representa una
            etapa del pipeline. Puedes mover deals entre etapas arrastrando las tarjetas.
          </p>
          <div
            className="rounded-lg p-4 border mb-4"
            style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
          >
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Ejemplo de pipeline estándar:</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {["Prospección", "Contactado", "Propuesta", "Negociación", "Cerrado Ganado", "Cerrado Perdido"].map((stage, i) => (
                <div
                  key={stage}
                  className="flex-shrink-0 w-32 p-2 rounded text-xs text-center font-medium"
                  style={{
                    backgroundColor: i === 4 ? "#22c55e" : i === 5 ? "#ef4444" : "#1f2a48",
                    color: "white",
                    opacity: 0.85 + i * 0.03,
                  }}
                >
                  {stage}
                </div>
              ))}
            </div>
          </div>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            En la parte superior del Kanban puedes:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Seleccionar el pipeline a visualizar</li>
            <li>• Filtrar deals por propietario, valor, fecha de cierre</li>
            <li>• Buscar deals por nombre</li>
            <li>• Ver el valor total por etapa</li>
          </ul>
          <Callout type="tip">
            El número en el encabezado de cada columna muestra la cantidad de deals y el valor
            total acumulado en esa etapa. Útil para saber dónde está "atascado" tu pipeline.
          </Callout>
        </section>

        <section id="crud" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>CRUD de deals</h2>

          <div id="create" className="mb-8">
            <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--foreground)" }}>Crear deal</h3>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>Puedes crear un deal de tres formas:</p>
            <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
              <li>• <strong style={{ color: "var(--foreground)" }}>Botón "+" en el Kanban:</strong> Crea un deal directamente en una etapa específica.</li>
              <li>• <strong style={{ color: "var(--foreground)" }}>Botón "Nuevo deal":</strong> Disponible en la barra superior del módulo.</li>
              <li>• <strong style={{ color: "var(--foreground)" }}>Desde el perfil de contacto:</strong> En la sección "Deals" del contacto.</li>
            </ul>
            <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
              <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Campos del formulario de deal</div>
              <table className="w-full text-sm">
                <thead style={{ backgroundColor: "var(--muted)" }}>
                  <tr>
                    <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Campo</th>
                    <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Descripción</th>
                    <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Requerido</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Nombre", "Título descriptivo del negocio", "Sí"],
                    ["Pipeline", "Pipeline al que pertenece", "Sí"],
                    ["Etapa", "Fase inicial del deal", "Sí"],
                    ["Contacto", "Cliente asociado", "No"],
                    ["Valor", "Monto estimado en COP/USD", "No"],
                    ["Fecha de cierre", "Estimado de cierre", "No"],
                    ["Propietario", "Vendedor asignado", "Auto"],
                    ["Probabilidad", "% estimado de ganar", "No"],
                    ["Descripción", "Notas adicionales", "No"],
                  ].map(([c, d, r]) => (
                    <tr key={c}>
                      <td className="p-3 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{c}</td>
                      <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{d}</td>
                      <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: r === "Sí" ? "#d1345b" : "var(--muted-foreground)" }}>{r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div id="edit" className="mb-8">
            <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--foreground)" }}>Editar deal</h3>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
              Haz clic en cualquier tarjeta del Kanban para abrir el panel de detalles del deal.
              Desde ahí puedes editar todos los campos, agregar actividades, ver el historial y
              gestionar los productos asociados.
            </p>
            <Callout type="note">
              Los cambios en el valor y etapa del deal se registran automáticamente en el historial
              de actividades para trazabilidad completa.
            </Callout>
          </div>
        </section>

        <section id="stages" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Mover entre etapas</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Puedes mover un deal de etapa de dos formas:
          </p>
          <ul className="space-y-3 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>
              <strong style={{ color: "var(--foreground)" }}>Arrastrar y soltar:</strong>{" "}
              En el Kanban, arrastra la tarjeta del deal a la columna destino.
            </li>
            <li>
              <strong style={{ color: "var(--foreground)" }}>Selector de etapa:</strong>{" "}
              En el panel de detalles del deal, usa el selector "Etapa" en la parte superior.
            </li>
          </ul>
          <Callout type="tip">
            Cuando muevas un deal a "Cerrado Ganado" o "Cerrado Perdido", el sistema te pedirá
            confirmar y opcionalmente registrar un motivo de pérdida. Esta información es valiosa
            para los reportes de conversión.
          </Callout>
        </section>

        <section id="filters" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Filtros y búsqueda</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Usa los filtros del Kanban para enfocar la vista en un subconjunto de deals:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por pipeline:</strong> Selector en la barra superior</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por propietario:</strong> Filtra los deals de un vendedor específico</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por fecha de cierre:</strong> Rango de fechas estimadas</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por valor:</strong> Rango de monto mínimo y máximo</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Búsqueda por nombre:</strong> Texto libre en el campo de búsqueda</li>
          </ul>
        </section>

        <section id="products" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Productos en deals</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Puedes asociar productos del catálogo a un deal para detallar qué está vendiendo
            y calcular automáticamente el valor total.
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Abre el panel de detalles del deal</li>
            <li>2. Ve a la sección "Productos"</li>
            <li>3. Haz clic en "Agregar producto"</li>
            <li>4. Busca y selecciona el producto del catálogo</li>
            <li>5. Ajusta la cantidad y el precio si es necesario</li>
            <li>6. El valor del deal se actualiza automáticamente</li>
          </ol>
          <Callout type="note">
            Los productos en deals se transfieren automáticamente cuando generas una cotización
            o factura desde el panel de detalles del deal.
          </Callout>
        </section>

        <section id="activities" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Actividades y notas</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El panel de detalles del deal incluye una línea de tiempo de actividades donde puedes:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Registrar notas internas</li>
            <li>• Programar llamadas, reuniones y tareas</li>
            <li>• Ver el historial completo de cambios en el deal</li>
            <li>• Ver conversaciones de WhatsApp/email relacionadas</li>
            <li>• Adjuntar documentos y archivos</li>
          </ul>
        </section>

        <DocNav
          prev={{ href: "/docs/contacts", title: "Contactos" }}
          next={{ href: "/docs/pipelines", title: "Pipelines" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
