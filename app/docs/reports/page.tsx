import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Reportes y Analytics" };

const toc = [
  { id: "overview", label: "Dashboard de analytics" },
  { id: "sales", label: "Reportes de ventas" },
  { id: "purchases-report", label: "Reportes de compras" },
  { id: "custom", label: "Reportes personalizados" },
  { id: "export", label: "Exportar reportes" },
];

export default function ReportsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Reportes y Analytics</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          FusionCRM proporciona dashboards y reportes detallados sobre ventas, actividad del equipo,
          campañas y rendimiento del pipeline para tomar decisiones basadas en datos.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Dashboard de analytics</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El dashboard principal de analytics muestra un resumen visual del estado actual del negocio.
            Puedes configurar el rango de fechas para ver datos históricos o comparar períodos.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {[
              { metric: "Deals ganados", color: "#22c55e", desc: "Negocios cerrados en el período" },
              { metric: "Valor de ventas", color: "#3b82f6", desc: "Ingresos del período" },
              { metric: "Deals en pipeline", color: "#8b5cf6", desc: "Oportunidades activas" },
              { metric: "Tasa de conversión", color: "#f59e0b", desc: "% deals ganados vs total" },
              { metric: "Contactos nuevos", color: "#14b8a6", desc: "Nuevos en el período" },
              { metric: "Actividades", color: "#d1345b", desc: "Llamadas, emails, reuniones" },
            ].map((m) => (
              <div
                key={m.metric}
                className="p-4 rounded-lg border"
                style={{ borderColor: m.color, backgroundColor: `${m.color}10` }}
              >
                <p className="font-bold text-sm" style={{ color: m.color }}>{m.metric}</p>
                <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los gráficos disponibles en el dashboard incluyen:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Línea de tendencia de ventas por día/semana/mes</li>
            <li>• Embudo de conversión del pipeline (deals por etapa)</li>
            <li>• Actividades por tipo (llamadas, emails, reuniones)</li>
            <li>• Top vendedores por valor cerrado</li>
            <li>• Distribución geográfica de clientes (si tienen ciudad registrada)</li>
          </ul>
        </section>

        <section id="sales" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Reportes de ventas</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los reportes de ventas permiten analizar el rendimiento comercial en profundidad.
            Accede desde <strong style={{ color: "var(--foreground)" }}>Reportes → Ventas</strong>.
          </p>
          <div className="space-y-4 mb-6">
            {[
              {
                title: "Reporte por período",
                desc: "Selecciona una fecha o rango de fechas para ver las ventas del período. Muestra: facturas emitidas, valores, clientes, vendedores y promedios.",
                url: "/reports/sales/:startDate/:endDate",
              },
              {
                title: "Reporte de deals",
                desc: "Análisis del pipeline: deals creados, avanzados, ganados y perdidos. Incluye tiempo promedio en cada etapa.",
                url: "/reports/deals",
              },
              {
                title: "Reporte por vendedor",
                desc: "Comparativa del rendimiento del equipo de ventas: deals, valor, actividades.",
                url: "/reports/team",
              },
            ].map((r) => (
              <div key={r.title} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>{r.title}</p>
                <p className="text-sm mb-2" style={{ color: "var(--muted-foreground)" }}>{r.desc}</p>
                <code className="text-xs" style={{ color: "#d1345b" }}>{r.url}</code>
              </div>
            ))}
          </div>
        </section>

        <section id="purchases-report" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Reportes de compras</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El reporte de compras muestra el historial de facturas de proveedores registradas:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Compras por proveedor y período</li>
            <li>• Facturas pendientes de pago</li>
            <li>• Total de compras por categoría o producto</li>
            <li>• Comparativa con períodos anteriores</li>
          </ul>
        </section>

        <section id="custom" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Reportes personalizados</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El constructor de reportes personalizados permite crear informes a medida combinando
            cualquier campo de la base de datos de FusionCRM.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Crear un reporte personalizado</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a Reportes → Reportes personalizados</li>
            <li>2. Haz clic en "Nuevo reporte"</li>
            <li>3. Selecciona la entidad principal (Contactos, Deals, Facturas, Actividades)</li>
            <li>4. Elige las columnas a mostrar</li>
            <li>5. Configura los filtros y criterios</li>
            <li>6. Define el agrupamiento y ordenamiento</li>
            <li>7. Guarda el reporte con un nombre</li>
          </ol>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              { entity: "Contactos", fields: "Nombre, empresa, ciudad, creado, propietario, score, listas" },
              { entity: "Deals", fields: "Nombre, valor, etapa, pipeline, propietario, fecha cierre, contacto" },
              { entity: "Facturas", fields: "Número, cliente, valor, fecha, vendedor, estado, productos" },
              { entity: "Actividades", fields: "Tipo, fecha, duración, agente, contacto, resultado" },
            ].map((e) => (
              <div key={e.entity} className="p-3 rounded-lg border text-sm" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>{e.entity}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{e.fields}</p>
              </div>
            ))}
          </div>
          <Callout type="tip">
            Los reportes personalizados guardados aparecen en el sidebar de Reportes para acceso
            rápido. Compártelos con tu equipo o programa envíos automáticos por email.
          </Callout>
        </section>

        <section id="export" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Exportar reportes</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Todos los reportes pueden exportarse en los siguientes formatos:
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { fmt: "CSV", desc: "Para análisis en Excel o Google Sheets" },
              { fmt: "PDF", desc: "Para presentaciones y archivos" },
              { fmt: "Excel (.xlsx)", desc: "Formato nativo de Excel" },
            ].map((f) => (
              <div key={f.fmt} className="p-3 rounded-lg border text-center" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-bold" style={{ color: "var(--foreground)" }}>{f.fmt}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <Callout type="note">
            La exportación de datos está restringida a usuarios con rol de Administrador o
            Propietario de la organización, por razones de seguridad y privacidad.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/products", title: "Productos" }}
          next={{ href: "/docs/lead-scoring", title: "Lead Scoring" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
