import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Negocios y embudo de ventas",
  description:
    "Gestiona tus oportunidades en un embudo de ventas kanban: crea negocios, muévelos entre etapas, agrega productos, fecha de cierre, próximo paso y previsión.",
  keywords: ["embudo de ventas", "negocios", "oportunidades de venta", "kanban de ventas", "previsión de ventas", "pipeline"],
  alternates: { canonical: "/docs/deals" },
  openGraph: {
    title: "Negocios y embudo de ventas",
    description:
      "Gestiona tus oportunidades en un embudo de ventas kanban: crea negocios, muévelos entre etapas, agrega productos, fecha de cierre, próximo paso y previsión.",
    url: "/docs/deals",
    siteName: "FusionCRM Docs",
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "Vista general" },
  { id: "kanban", label: "Vista Kanban" },
  { id: "crud", label: "Crear y editar" },
  { id: "create", label: "Crear negocio", depth: 3 },
  { id: "edit", label: "Ver y editar", depth: 3 },
  { id: "stages", label: "Mover entre etapas" },
  { id: "close-dates", label: "Fecha de cierre" },
  { id: "filters", label: "Filtros y búsqueda" },
  { id: "products", label: "Productos en negocios" },
  { id: "activities", label: "Actividades y próximo paso" },
  { id: "requirements", label: "Requisitos por etapa" },
  { id: "owner", label: "Dueño y previsión" },
];

export default function DealsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Deals / Negocios</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El módulo de negocios gestiona tus oportunidades de venta en pipelines visuales con
          vista Kanban, desde el primer contacto hasta el cierre.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Vista general</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Un <strong style={{ color: "var(--foreground)" }}>negocio</strong> (deal u oportunidad) representa
            una venta potencial. En el menú lo encuentras en <strong style={{ color: "var(--foreground)" }}>Negocio → Oportunidades</strong>.
            Cada negocio tiene:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {[
              { label: "Nombre del negocio", desc: "Identificador del negocio" },
              { label: "Valor", desc: "Monto estimado de la venta" },
              { label: "Contactos", desc: "Uno o varios clientes o prospectos" },
              { label: "Empresa", desc: "Opcional: la empresa a la que le vendes" },
              { label: "Etapa del pipeline", desc: "Fase actual del negocio" },
              { label: "Dueño", desc: "Vendedor responsable" },
              { label: "Fecha de cierre", desc: "Estimada mientras está abierto; real al ganar o perder" },
              { label: "Ganado / Perdido el", desc: "Sello con la fecha y hora del cierre" },
              { label: "Probabilidad", desc: "La toma de la etapa en la que está (se configura en el pipeline)" },
              { label: "Actividades", desc: "Llamadas, mensajes, reuniones, notas" },
              { label: "Checklist de cierre", desc: "Pasos para cerrar, con % de avance" },
              { label: "Campos personalizados", desc: "Los que definas en el pipeline" },
            ].map((f) => (
              <div key={f.label} className="p-3 rounded-lg border text-sm" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>{f.label}</p>
                <p style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <Callout type="note">
            Antes de crear negocios necesitas al menos un pipeline. Si el tablero dice «No hay pipelines
            configurados», créalo en Configuración → Módulos del CRM → Negocios (ver{" "}
            <a href="/docs/pipelines" style={{ color: "#d1345b" }}>Pipelines</a>).
          </Callout>
        </section>

        <section id="kanban" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Vista Kanban</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La vista principal es un tablero Kanban donde cada columna representa una etapa del
            pipeline. Puedes mover negocios entre etapas arrastrando las tarjetas.
          </p>
          <div
            className="rounded-lg p-4 border mb-4"
            style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
          >
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Ejemplo de pipeline:</p>
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
            En la barra superior del tablero tienes:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• El selector de pipeline</li>
            <li>• Los filtros por rango de fechas, empresa y dueño (ver <a href="#filters" style={{ color: "#d1345b" }}>Filtros y búsqueda</a>)</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Buscar</strong>: abre un buscador de negocios por nombre</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Exportar</strong>: descarga los negocios</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Importar</strong>: carga negocios desde un archivo</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Nuevo Negocio</strong></li>
          </ul>
          <Callout type="tip">
            El encabezado de cada columna muestra la cantidad de negocios y el valor total acumulado
            en esa etapa. Útil para saber dónde está &ldquo;atascado&rdquo; tu pipeline.
          </Callout>
        </section>

        <section id="crud" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear y editar negocios</h2>

          <div id="create" className="mb-8">
            <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--foreground)" }}>Crear negocio</h3>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>Puedes crear un negocio desde:</p>
            <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
              <li>• <strong style={{ color: "var(--foreground)" }}>El botón «Nuevo Negocio»</strong> en la barra superior de Oportunidades.</li>
              <li>• <strong style={{ color: "var(--foreground)" }}>La ficha del contacto</strong>, en la pestaña «Negocios».</li>
              <li>• <strong style={{ color: "var(--foreground)" }}>El panel lateral del chat</strong>, mientras atiendes una conversación.</li>
            </ul>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
              Desde el tablero, el negocio se crea en el pipeline que tengas abierto; el formulario no tiene selector de pipeline.
            </p>
            <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
              <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Campos del formulario</div>
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
                    ["Contacto", "Cliente asociado; puedes agregar varios", "Sí"],
                    ["Empresa", "Empresa a la que le vendes", "No"],
                    ["Nombre del negocio", "Título descriptivo del negocio", "Sí"],
                    ["Valor", "Monto estimado de la venta", "Sí"],
                    ["Fecha de cierre", "Estimada; al ganar o perder se guarda la real", "No"],
                    ["Etapa", "Fase del pipeline en la que arranca", "Sí"],
                    ["Dueño", "Si lo dejas en «Heredar del contacto», toma el dueño del contacto", "No"],
                    ["Campos personalizados", "Los que definiste en el pipeline (algunos pueden ser obligatorios)", "Según el campo"],
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
            <Callout type="note">
              El botón para crear no se activa hasta que eliges al menos un contacto y escribes el valor.
            </Callout>
          </div>

          <div id="edit" className="mb-8">
            <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--foreground)" }}>Ver y editar un negocio</h3>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
              Haz clic en una tarjeta del tablero para abrir el detalle del negocio. Ahí ves sus
              actividades, el checklist de cierre, los contactos, la empresa (con «Asociar» o
              «Cambiar») y los campos personalizados. Para cambiar el nombre, el valor, la etapa, el
              dueño u otros datos, pulsa <strong style={{ color: "var(--foreground)" }}>«Editar negocio»</strong>.
            </p>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
              El negocio también tiene su página completa, donde además ves los productos que tenga
              asociados y los otros negocios del mismo contacto.
            </p>
            <Callout type="note">
              Los cambios de etapa quedan registrados en la{" "}
              <a href="/docs/team-activity" style={{ color: "#d1345b" }}>actividad del equipo</a>, no en la
              lista de actividades del negocio (esa lista muestra solo lo que tu equipo registra).
            </Callout>
          </div>
        </section>

        <section id="stages" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Mover entre etapas</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Puedes mover un negocio de etapa de dos formas:
          </p>
          <ul className="space-y-3 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>
              <strong style={{ color: "var(--foreground)" }}>Arrastrar y soltar:</strong>{" "}
              En el tablero, arrastra la tarjeta a la columna destino.
            </li>
            <li>
              <strong style={{ color: "var(--foreground)" }}>Desde el detalle:</strong>{" "}
              Abre el negocio, pulsa «Editar negocio» y cambia la «Etapa».
            </li>
          </ul>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Si la etapa destino tiene <a href="#requirements" style={{ color: "#d1345b" }}>requisitos</a> sin
            cumplir, la app te muestra qué falta. Si una etapa tiene un tope de días configurado,
            el negocio que lleve más tiempo ahí se marca como estancado.
          </p>
          <Callout type="tip">
            Al mover un negocio a ganado o perdido no se pide confirmación ni motivo. Si quieres
            registrar por qué se perdió, crea un campo personalizado (por ejemplo «Motivo de pérdida»)
            y hazlo obligatorio para llegar a la etapa de perdido.
          </Callout>
        </section>

        <section id="close-dates" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Fecha de cierre: estimada vs real</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Mientras un negocio está en una etapa abierta, su fecha de cierre es una <strong style={{ color: "var(--foreground)" }}>estimación</strong> del
            vendedor (la previsión de ventas la usa para proyectar el mes). Al entrar a una etapa
            ganada o perdida pasa a ser la <strong style={{ color: "var(--foreground)" }}>fecha real</strong> de cierre, y es la que cuentan los
            informes de ventas.
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Al mover desde el tablero</strong> a ganado o perdido, la fecha de cierre pasa a hoy (en la zona horaria de la organización).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Desde el modal</strong>, al elegir una etapa cerrada el campo se precarga con hoy; si el negocio cerró otro día, cámbiala antes de guardar y esa fecha manda. Así se registran ventas atrasadas con su fecha real.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>La estimada no se pierde:</strong> queda como &ldquo;Estimada original&rdquo; en el detalle, para comparar proyección contra realidad.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Ganado el / Perdido el:</strong> el detalle y la página del negocio muestran el momento exacto del cierre. Reabrir un negocio limpia el sello y devuelve la estimada.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Informes personalizados:</strong> &ldquo;Fecha de venta (ganado el)&rdquo;, &ldquo;Fecha de pérdida&rdquo; y &ldquo;Cierre estimado original&rdquo; están disponibles como campos del negocio. Para agrupar por mes calendario usa &ldquo;Fecha de cierre&rdquo; con el filtro de ganados.</li>
          </ul>
          <div className="p-4 rounded-lg border mb-4" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              <strong style={{ color: "var(--foreground)" }}>API y MCP:</strong> cada negocio expone <code>closingDate</code>, <code>wonAt</code>, <code>lostAt</code> y <code>expectedCloseDate</code>.
              <code>GET /api/deals</code> y la tool <code>list_deals</code> filtran por <code>closingFrom/closingTo</code> (fecha de cierre),
              <code>wonFrom/wonTo</code> (instante en que se ganó) y <code>lostFrom/lostTo</code>. Si envías <code>closingDate</code> junto con un cambio de
              etapa, esa es la fecha que queda. Ver la referencia en <a href="/docs/api" style={{ color: "#d1345b" }}>API</a> y <a href="/docs/mcp" style={{ color: "#d1345b" }}>MCP</a>.
            </p>
          </div>
        </section>

        <section id="filters" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Filtros y búsqueda</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Usa los filtros de la barra superior para enfocar el tablero:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por pipeline:</strong> selector en la barra superior</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por fecha de cierre:</strong> rango de fechas (estimadas en abiertos, reales en cerrados)</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por empresa:</strong> «Filtrar por empresa...»</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por dueño:</strong> «Todos los dueños», «Sin dueño» o un vendedor específico</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Búsqueda por nombre:</strong> botón «Buscar», que abre un buscador con los resultados</li>
          </ul>
          <Callout type="warning">
            Por defecto el tablero muestra los negocios cuya fecha de cierre cae en el mes actual. Si
            no ves un negocio, amplía el rango de fechas.
          </Callout>
        </section>

        <section id="products" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Productos en negocios</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Si un negocio tiene productos asociados (por ejemplo, porque llegó desde tu tienda en línea,
            una integración o la API), los verás en la página completa del negocio. Por ahora no se
            agregan productos a mano desde la web, y el valor del negocio no se calcula a partir de ellos.
          </p>
          <Callout type="note">
            Las cotizaciones no se generan desde el negocio: créalas desde{" "}
            <a href="/docs/quotes" style={{ color: "#d1345b" }}>Cotizaciones</a>, la ficha del contacto, la
            ficha de la empresa o el chat.
          </Callout>
        </section>

        <section id="activities" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Actividades y próximo paso</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En el detalle del negocio puedes registrar actividades de tipo Llamada, Mensaje, Reunión,
            Visita, Correo, WhatsApp o Nota, y verlas en orden.
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Si le pones un <strong style={{ color: "var(--foreground)" }}>recordatorio</strong> a la actividad, se convierte en el <strong style={{ color: "var(--foreground)" }}>próximo paso</strong> del negocio.</li>
            <li>• Registrar ciertos tipos de actividad puede marcar solo ítems del <strong style={{ color: "var(--foreground)" }}>checklist de cierre</strong>, según lo configures en el pipeline.</li>
          </ul>
        </section>

        <section id="requirements" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Requisitos por etapa</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada pipeline puede exigir que ciertos campos o ítems del checklist estén completos
            antes de <strong style={{ color: "var(--foreground)" }}>llegar</strong> a una etapa. Se configuran en
            Configuración → Módulos del CRM → Negocios: en cada campo personalizado y en cada ítem
            del checklist eliges «obligatorio para llegar a…» y si <em>bloquea</em> o solo{" "}
            <em>avisa</em>.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Los requisitos son acumulativos hacia adelante: para pasar a «Negociación» deben cumplirse también los de las etapas anteriores (se puede desactivar por pipeline).</li>
            <li>• Retroceder de etapa nunca valida; la etapa de «perdido» solo exige lo suyo.</li>
            <li>• Aplica igual al arrastrar en el kanban, al editar en el modal, por API y por MCP: la app te muestra qué falta antes de intentar mover.</li>
          </ul>
          <Callout type="note">
            El checklist de cierre y la probabilidad de la etapa son dos cosas distintas: el
            checklist mide avance (y ahora puede bloquear), la probabilidad alimenta la previsión de
            ventas. Ninguno mueve el negocio de etapa por sí solo.
          </Callout>
        </section>

        <section id="owner" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Dueño y previsión</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada negocio tiene un asesor responsable (se hereda del dueño del contacto al crearlo y
            se puede cambiar). Con eso y la probabilidad de cada etapa, la página de Informes
            muestra la <strong style={{ color: "var(--foreground)" }}>previsión ponderada</strong> por mes, etapa y
            vendedor. Marca cada etapa como abierta, ganada o perdida en la configuración del
            pipeline: es lo que decide qué cuenta como venta cerrada en todos los informes.
          </p>
        </section>

        <DocNav
          prev={{ href: "/docs/forms", title: "Formularios web" }}
          next={{ href: "/docs/pipelines", title: "Pipelines" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
