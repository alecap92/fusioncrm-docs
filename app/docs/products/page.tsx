import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Productos" };

const toc = [
  { id: "overview", label: "Catálogo de productos" },
  { id: "create", label: "Crear producto" },
  { id: "fields", label: "Campos del producto" },
  { id: "usage", label: "Uso en cotizaciones y deals" },
];

export default function ProductsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Productos</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El catálogo de productos centraliza todos los bienes y servicios que comercializas,
          con sus precios, impuestos y descripciones para usar en cotizaciones, deals y facturas.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Catálogo de productos</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El catálogo es la base de datos de todos tus productos y servicios. Desde aquí puedes
            ver, crear, editar y eliminar productos. El catálogo se usa en:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Cotizaciones (al agregar ítems)</li>
            <li>• Facturas de venta</li>
            <li>• Deals (para calcular el valor del negocio)</li>
            <li>• Compras (como ítems comprados)</li>
          </ul>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear producto</h2>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>Para agregar un producto al catálogo:</p>
          <ol className="space-y-3 mb-6">
            {[
              { n: "1", t: "Ve a Productos → Nuevo producto", d: "Botón en la esquina superior derecha del catálogo." },
              { n: "2", t: "Completa el formulario", d: "Nombre, descripción, código, precio y configuración de impuestos." },
              { n: "3", t: "Configura el IVA", d: "Selecciona el porcentaje de IVA que aplica a este producto: 0%, 5% o 19%." },
              { n: "4", t: "Guarda", d: "El producto estará disponible inmediatamente en cotizaciones y facturas." },
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

        <section id="fields" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Campos del producto</h2>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
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
                  ["Nombre", "Nombre del producto o servicio", "Sí"],
                  ["Código", "Código interno o SKU", "No"],
                  ["Descripción", "Descripción detallada", "No"],
                  ["Precio unitario", "Precio de venta sin impuestos", "Sí"],
                  ["IVA", "Porcentaje de IVA aplicable", "Sí"],
                  ["Unidad de medida", "UND, KG, HR, etc.", "No"],
                  ["Categoría", "Agrupación del producto", "No"],
                  ["Activo", "Si aparece en búsquedas", "Sí"],
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
          <Callout type="tip">
            Si tienes muchos productos, usa las categorías para organizarlos. Al agregar ítems en
            una cotización, puedes filtrar por categoría para encontrarlos más rápido.
          </Callout>
        </section>

        <section id="usage" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Uso en cotizaciones y deals</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cuando agregas un producto en una cotización o deal, FusionCRM:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Autocompleta el nombre, descripción y precio</li>
            <li>• Aplica el IVA configurado en el producto automáticamente</li>
            <li>• Permite modificar el precio para esa transacción específica sin afectar el catálogo</li>
            <li>• Calcula el subtotal y total en tiempo real</li>
          </ul>
          <Callout type="note">
            Modificar el precio de un producto en el catálogo NO afecta cotizaciones o facturas
            ya creadas. Solo afecta los nuevos documentos creados a partir de ese momento.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/invoices", title: "Facturación" }}
          next={{ href: "/docs/reports", title: "Reportes" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
