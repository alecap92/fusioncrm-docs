import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Empresas" };

const toc = [
  { id: "overview", label: "Personas y cuentas" },
  { id: "create", label: "Crear y vincular" },
  { id: "detail", label: "La ficha de la empresa" },
  { id: "deals", label: "Negocios de la empresa" },
  { id: "fields", label: "Campos personalizados e importación" },
  { id: "api", label: "Por API y MCP" },
];

export default function CompaniesPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Empresas</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Para vender a empresas: la cuenta agrupa a sus contactos, negocios, cotizaciones y
          facturas, y el historial comercial sobrevive aunque cambie la persona que te atiende.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Personas y cuentas</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Un <strong style={{ color: "var(--foreground)" }}>contacto</strong> es una persona; una{" "}
            <strong style={{ color: "var(--foreground)" }}>empresa</strong> es la cuenta a la que pertenece.
            Usar empresas es opcional: si vendes a personas, el flujo no cambia. Cuando las usas:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Cada contacto puede pertenecer a una empresa (el campo de texto «empresa» del contacto se mantiene sincronizado con el nombre de la cuenta).</li>
            <li>• Un negocio lleva contacto <em>y</em> empresa a la vez: aparece en la ficha de ambos.</li>
            <li>• Borrar una empresa nunca borra contactos ni negocios; solo los desvincula.</li>
          </ul>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear y vincular</h2>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Menú <strong style={{ color: "var(--foreground)" }}>Contactos → Empresas</strong> → <em>Nueva Empresa</em>: nombre, industria, NIT (el dígito de verificación se calcula solo), email, teléfono, sitio web, dirección, ciudad, tamaño y notas. Los campos que ves dependen de cómo tu organización configure las empresas.</li>
            <li>2. Si ya existe una empresa con el mismo NIT o nombre, FusionCRM no crea otra y conserva la que ya tenías: búscala en el directorio.</li>
            <li>3. Desde la ficha del contacto, elige su empresa en el campo correspondiente. Desde la ficha de la empresa, usa <em>Vincular contacto</em> para agregar contactos existentes (uno a la vez) o <em>Crear contacto</em> para crear uno que quede vinculado de una vez (si ya existía, te avisa).</li>
          </ol>
          <Callout type="note">
            Las empresas se crean a medida que trabajas cada cuenta; no hay una conversión
            automática de la columna «empresa» de todos los contactos, porque ese texto libre suele
            venir sucio y conviene depurarlo caso por caso.
          </Callout>
        </section>

        <section id="detail" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>La ficha de la empresa</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Indicadores</strong> arriba: Ingresos totales, Último negocio, Contactos, Negocios y Score de cuenta.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Contactos:</strong> las personas vinculadas a la empresa. Desde ahí puedes vincular, crear o desvincular contactos.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Negocios</strong>, <strong style={{ color: "var(--foreground)" }}>cotizaciones</strong> y <strong style={{ color: "var(--foreground)" }}>facturas</strong> de la cuenta (las cotizaciones y facturas se agrupan a través de sus contactos).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Línea de tiempo</strong> unificada: actividades de la empresa y de cada uno de sus contactos, marcadas con quién las generó.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Puntaje de cuenta:</strong> el lead score más alto entre sus contactos.</li>
            <li>• Pestañas de <strong style={{ color: "var(--foreground)" }}>Archivos</strong> y <strong style={{ color: "var(--foreground)" }}>Notas</strong> propias de la cuenta.</li>
          </ul>
        </section>

        <section id="deals" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Negocios de la empresa</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Al crear un negocio desde un contacto que tiene empresa, el negocio hereda la empresa
            automáticamente. Puedes cambiarla en el modal de edición. Los negocios anteriores no se
            reasignan si el contacto cambia de empresa: son historial.
          </p>
          <p style={{ color: "var(--muted-foreground)" }}>
            Las cotizaciones también pueden llevar empresa; en el PDF sale la razón social y el NIT
            de la cuenta en vez del texto libre del contacto.
          </p>
        </section>

        <section id="fields" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Campos personalizados e importación</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Las empresas tienen sus propios campos personalizados en Configuración → Módulos del CRM → Empresas, con los mismos tipos que los de contactos.</li>
            <li>• Importa empresas desde el botón <em>Importar</em> del directorio de Empresas (Excel o CSV) con vista previa; se deduplica por NIT y luego por nombre. Si algo sale mal, puedes revertir la importación desde Configuración → Historial.</li>
            <li>• Exporta el directorio completo a Excel (solo propietarios).</li>
            <li>• En el directorio puedes usar filtros avanzados y seleccionar varias empresas para eliminarlas juntas.</li>
            <li>• El disparador <em>Empresa creada</em> de automatizaciones permite avisar o enriquecer la cuenta nueva.</li>
          </ul>
        </section>

        <section id="api" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Por API y MCP</h2>
          <p style={{ color: "var(--muted-foreground)" }}>
            El módulo <code>/companies</code> de la <Link href="/docs/api" style={{ color: "#d1345b" }}>API</Link>{" "}
            crea, actualiza, lista y vincula contactos con permisos <code>companies:*</code>; crear una
            que ya existe por NIT o nombre responde 200 con la existente. En{" "}
            <Link href="/docs/mcp" style={{ color: "#d1345b" }}>MCP</Link> tienes <code>list_companies</code>,{" "}
            <code>get_company</code>, <code>create_company</code>, <code>update_company</code>,{" "}
            <code>delete_company</code>, <code>link_contact_to_company</code> y{" "}
            <code>list_company_contacts</code>. Por API también puedes vincular varios contactos a la vez
            con <code>POST /api/companies/:id/contacts</code>.
          </p>
        </section>

        <DocNav
          prev={{ href: "/docs/contacts", title: "Contactos" }}
          next={{ href: "/docs/forms", title: "Formularios web" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
