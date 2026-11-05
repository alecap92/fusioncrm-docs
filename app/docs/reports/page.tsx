import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Reportes de ventas y previsión",
  description:
    "Mira tus ventas del mes, la previsión de ventas, las compras y los informes de facturación en reportes del CRM que armas a tu medida y exportas a Excel.",
  keywords: ["reportes de ventas", "previsión de ventas", "dashboard", "informes de facturación", "exportar a Excel"],
  alternates: { canonical: "/docs/reports" },
  openGraph: {
    title: "Reportes de ventas y previsión",
    description:
      "Mira tus ventas del mes, la previsión de ventas, las compras y los informes de facturación en reportes del CRM que armas a tu medida y exportas a Excel.",
    url: "/docs/reports",
    siteName: "FusionCRM Docs",
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "Mis Reportes" },
  { id: "sales", label: "Ventas de un mes" },
  { id: "forecast", label: "Previsión de ventas" },
  { id: "purchases-report", label: "Compras e informes de facturación" },
  { id: "custom", label: "Crear tus propios reportes" },
  { id: "export", label: "Exportar reportes" },
];

export default function ReportsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Reportes y Analytics</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Mira cómo van tus ventas, tus clientes y tus conversaciones en una cuadrícula de reportes
          que puedes armar a tu medida. Lo encuentras en{" "}
          <strong style={{ color: "var(--foreground)" }}>Negocio → Informes</strong>.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Mis Reportes</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La pantalla <strong style={{ color: "var(--foreground)" }}>Mis Reportes</strong> arranca con
            siete reportes listos:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              "Ventas por mes", "Número de conversaciones", "Ticket promedio", "Ventas totales",
              "Nuevos clientes", "Mejores clientes", "Productos vendidos",
            ].map((r) => (
              <div key={r} className="p-2 rounded border text-sm text-center" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)" }}>
                {r}
              </div>
            ))}
          </div>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Puedes editar cualquiera, eliminarlo o arrastrarlo para cambiarlo de lugar.</li>
            <li>• Si cambiaste uno de los reportes que vienen por defecto, puedes restaurarlo a como venía.</li>
            <li>• Cada reporte puede compararse con el periodo anterior y mostrar la variación.</li>
            <li>• Los reportes son de la organización: todo el equipo ve la misma cuadrícula.</li>
          </ul>
        </section>

        <section id="sales" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Ventas de un mes</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para ver el detalle de un mes, haz clic en su barra en el reporte{" "}
            <strong style={{ color: "var(--foreground)" }}>Ventas por mes</strong>. Se abre la lista de
            los negocios ganados de ese mes, con un buscador.
          </p>
          <Callout type="tip">
            Desde esa lista, el botón <strong>Crear Lista de difusión</strong> arma una lista con los
            clientes que te compraron ese mes, lista para enviarles una campaña de recompra.
          </Callout>
        </section>

        <section id="forecast" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Previsión de ventas</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Debajo de los reportes está la <strong style={{ color: "var(--foreground)" }}>Previsión de ventas</strong>:
            suma tus negocios abiertos ponderados por la probabilidad de cada etapa del pipeline, mes a
            mes, para este mes o los próximos 3 o 6 meses.
          </p>
          <Callout type="note">
            Para que la previsión sea útil, configura la probabilidad de cada etapa en tu{" "}
            <Link href="/docs/pipelines" style={{ color: "#d1345b" }}>pipeline</Link> y pon fecha de cierre
            a tus negocios. Las etapas sin probabilidad quedan fuera del ponderado y los negocios sin
            fecha de cierre se muestran aparte.
          </Callout>
        </section>

        <section id="purchases-report" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Compras e informes de facturación</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los reportes de compras y el cierre contable hacen parte del módulo adicional de{" "}
            <Link href="/docs/invoices" style={{ color: "#d1345b" }}>Facturación</Link>:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• La vista de compras de un mes lista las órdenes con proveedor, estado, fecha, monto, retenciones y neto.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Facturación → Informes</strong> es el cierre del periodo para tu contador: ventas, compras, IVA y documentos emitidos, descargable en Excel. Solo lo ven el propietario y el contador.</li>
          </ul>
        </section>

        <section id="custom" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear tus propios reportes</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para agregar un reporte, toca una celda vacía de la cuadrícula y sigue el asistente de tres pasos:
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Elige el tipo: <strong style={{ color: "var(--foreground)" }}>Gráfico de barras</strong>, <strong style={{ color: "var(--foreground)" }}>Gráfico de torta</strong>, <strong style={{ color: "var(--foreground)" }}>Gráfico de línea</strong> o <strong style={{ color: "var(--foreground)" }}>Métrica / Texto</strong>.</li>
            <li>2. Arrastra los datos que quieres medir y configura las fechas (y la comparación con el periodo anterior, si la quieres).</li>
            <li>3. Revisa la vista previa y guarda.</li>
          </ol>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              { entity: "Negocios", fields: "Conteo de negocios, monto, productos vendidos, cliente y fechas (creación, cierre, ganado el, perdido el)" },
              { entity: "Contactos", fields: "Conteo de contactos, fecha de creación y propiedades del contacto" },
              { entity: "Conversaciones", fields: "Conteo de conversaciones y fecha de primer contacto" },
              { entity: "Google Analytics", fields: "Usuarios, sesiones, vistas de página, fuente de tráfico, país y dispositivo, si conectaste Google Analytics en Integraciones (no se mezcla con datos del CRM en el mismo reporte)" },
            ].map((e) => (
              <div key={e.entity} className="p-3 rounded-lg border text-sm" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>{e.entity}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{e.fields}</p>
              </div>
            ))}
          </div>
          <Callout type="tip">
            Los reportes no se programan ni se envían por correo. Si quieres un resumen automático en
            tu correo, usa la acción <strong>Informe de equipo</strong> en{" "}
            <Link href="/docs/workflows" style={{ color: "#d1345b" }}>Automatizaciones</Link>{" "}
            (ver <Link href="/docs/team-activity#report" style={{ color: "#d1345b" }}>Informe automático</Link>).
          </Callout>
        </section>

        <section id="export" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Exportar reportes</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Hoy los reportes de <strong style={{ color: "var(--foreground)" }}>Mis Reportes</strong> no se
            pueden descargar. El único informe descargable (en Excel) es el de{" "}
            <strong style={{ color: "var(--foreground)" }}>Facturación → Informes</strong>.
          </p>
        </section>

        <DocNav
          prev={{ href: "/docs/shipments", title: "Envíos" }}
          next={{ href: "/docs/lead-scoring", title: "Lead Scoring" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
