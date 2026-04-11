import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Contactos" };

const toc = [
  { id: "overview", label: "Vista general" },
  { id: "crud", label: "CRUD de contactos" },
  { id: "create", label: "Crear contacto", depth: 3 },
  { id: "edit", label: "Editar contacto", depth: 3 },
  { id: "delete", label: "Eliminar contacto", depth: 3 },
  { id: "custom-fields", label: "Campos personalizados" },
  { id: "lists", label: "Listas y segmentos" },
  { id: "import", label: "Importar contactos" },
  { id: "filters", label: "Filtros avanzados" },
  { id: "kpis", label: "KPIs de contacto" },
];

export default function ContactsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Contactos</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El módulo de Contactos es el núcleo de FusionCRM. Aquí gestionas toda tu base de clientes,
          prospectos y leads con campos estándar y personalizados.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Vista general</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El directorio de contactos muestra una tabla paginada con todos tus contactos. Puedes:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Buscar contactos por nombre, email, teléfono o empresa</li>
            <li>• Ordenar columnas haciendo clic en los encabezados</li>
            <li>• Filtrar por campos estándar y personalizados</li>
            <li>• Ver el puntaje de lead scoring de cada contacto</li>
            <li>• Acceder al perfil completo de cualquier contacto</li>
            <li>• Exportar la lista a CSV (solo propietarios de la organización)</li>
          </ul>
          <Callout type="note">
            Los contactos son visibles por todos los usuarios de la organización por defecto.
            El administrador puede configurar permisos granulares desde Configuración → Usuarios.
          </Callout>
        </section>

        <section id="crud" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>CRUD de contactos</h2>

          <div id="create" className="mb-8">
            <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--foreground)" }}>Crear contacto</h3>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
              Para crear un contacto nuevo:
            </p>
            <ol className="space-y-3 mb-4">
              {[
                { n: "1", t: "Haz clic en \"+ Nuevo contacto\"", d: "Botón en la esquina superior derecha del directorio." },
                { n: "2", t: "Completa los campos básicos", d: "Nombre (requerido), apellido, correo electrónico, teléfono, empresa y cargo." },
                { n: "3", t: "Agrega campos personalizados", d: "Si tu organización tiene campos adicionales configurados, aparecerán en el formulario." },
                { n: "4", t: "Guarda el contacto", d: "Haz clic en \"Guardar\" para crear el contacto en el directorio." },
              ].map((s) => (
                <li key={s.n} className="flex gap-3">
                  <span
                    className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#d1345b" }}
                  >{s.n}</span>
                  <div>
                    <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{s.t}</p>
                    <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
              <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>
                Campos estándar disponibles
              </div>
              <table className="w-full text-sm">
                <thead style={{ backgroundColor: "var(--muted)" }}>
                  <tr>
                    <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Campo</th>
                    <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Tipo</th>
                    <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Requerido</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Nombre", "Texto", "Sí"],
                    ["Apellido", "Texto", "No"],
                    ["Email", "Email", "No"],
                    ["Teléfono", "Teléfono", "No"],
                    ["Empresa", "Texto", "No"],
                    ["Cargo", "Texto", "No"],
                    ["Ciudad", "Texto", "No"],
                    ["País", "Selección", "No"],
                    ["Notas", "Texto largo", "No"],
                    ["Propietario", "Usuario", "Auto-asignado"],
                  ].map(([campo, tipo, req]) => (
                    <tr key={campo}>
                      <td className="p-3 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{campo}</td>
                      <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{tipo}</td>
                      <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: req === "Sí" ? "#d1345b" : "var(--muted-foreground)" }}>{req}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Callout type="tip">
              Puedes crear contactos directamente desde una conversación de WhatsApp o email. Al
              recibir un mensaje de un número desconocido, aparece el botón "Crear contacto".
            </Callout>
          </div>

          <div id="edit" className="mb-8">
            <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--foreground)" }}>Editar contacto</h3>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
              Para editar un contacto existente:
            </p>
            <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
              <li>1. Haz clic en el nombre del contacto en el directorio</li>
              <li>2. En el perfil del contacto, haz clic en el ícono de lápiz (✏️) junto a cualquier campo</li>
              <li>3. Edita el campo directamente (edición inline) o usa el botón "Editar perfil"</li>
              <li>4. Los cambios se guardan automáticamente al salir del campo</li>
            </ul>
            <Callout type="note">
              El perfil de contacto también muestra el historial de deals, facturas, cotizaciones,
              conversaciones y actividades asociadas a ese contacto.
            </Callout>
          </div>

          <div id="delete" className="mb-8">
            <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--foreground)" }}>Eliminar contacto</h3>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
              Para eliminar un contacto:
            </p>
            <ul className="space-y-2 pl-4 mb-3" style={{ color: "var(--muted-foreground)" }}>
              <li>1. Abre el perfil del contacto</li>
              <li>2. Haz clic en el menú de opciones (⋮) en la esquina superior derecha</li>
              <li>3. Selecciona "Eliminar contacto"</li>
              <li>4. Confirma la acción en el diálogo de confirmación</li>
            </ul>
            <Callout type="danger">
              Eliminar un contacto es una acción <strong>irreversible</strong>. Se eliminará el
              contacto y todas sus relaciones (deals, notas, actividades). Las conversaciones y
              facturas asociadas <strong>no</strong> se eliminan.
            </Callout>
          </div>
        </section>

        <section id="custom-fields" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Campos personalizados</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los campos personalizados permiten almacenar información específica de tu negocio que no
            está en los campos estándar.
          </p>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            <strong style={{ color: "var(--foreground)" }}>Tipos de campos disponibles:</strong>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {[
              { type: "Texto", desc: "Cadena de texto libre" },
              { type: "Número", desc: "Valores numéricos" },
              { type: "Fecha", desc: "Selector de fecha" },
              { type: "Booleano", desc: "Sí / No" },
              { type: "Selección", desc: "Lista desplegable" },
              { type: "Multi-selección", desc: "Múltiples opciones" },
              { type: "Email", desc: "Dirección de email" },
              { type: "Teléfono", desc: "Número de teléfono" },
              { type: "URL", desc: "Dirección web" },
            ].map((f) => (
              <div
                key={f.type}
                className="p-3 rounded-lg border text-sm"
                style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
              >
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>{f.type}</p>
                <p style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Para crear un campo personalizado, ve a <strong style={{ color: "var(--foreground)" }}>
            Configuración → Campos de contacto → Nuevo campo</strong>.
          </p>
          <Callout type="tip">
            Los campos personalizados también se pueden usar como criterios de filtro en el
            directorio de contactos y para segmentar listas para campañas masivas.
          </Callout>
        </section>

        <section id="lists" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Listas y segmentos</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las listas de contactos te permiten agrupar contactos según criterios específicos para
            enviarles campañas masivas o gestionar segmentos de clientes.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Crear una lista</h3>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a <strong style={{ color: "var(--foreground)" }}>Contactos → Listas</strong></li>
            <li>2. Haz clic en <strong style={{ color: "var(--foreground)" }}>"+ Nueva lista"</strong></li>
            <li>3. Asigna un nombre descriptivo a la lista</li>
            <li>4. Agrega contactos manualmente o filtra por criterios</li>
            <li>5. Guarda la lista</li>
          </ol>
          <Callout type="note">
            Las listas son <strong>estáticas</strong> por defecto: no se actualizan automáticamente
            cuando nuevos contactos cumplen los criterios. Para segmentación dinámica, usa los
            filtros avanzados al momento de crear campañas.
          </Callout>
        </section>

        <section id="import" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Importar contactos</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Puedes importar contactos masivamente desde un archivo CSV. Esto es ideal para migrar
            desde otro CRM o cargar una base de datos existente.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Proceso de importación</h3>
          <ol className="space-y-3 mb-4">
            {[
              { n: "1", t: "Prepara el archivo CSV", d: "El archivo debe tener encabezados en la primera fila. Descarga la plantilla de ejemplo desde el módulo de importación." },
              { n: "2", t: "Ve a Contactos → Importar", d: "Haz clic en el botón de importación en el directorio de contactos." },
              { n: "3", t: "Sube el archivo", d: "Arrastra el archivo CSV al área de carga o haz clic para seleccionarlo." },
              { n: "4", t: "Mapea los campos", d: "Asocia las columnas de tu CSV con los campos de FusionCRM. Los campos estándar se detectan automáticamente." },
              { n: "5", t: "Revisa y confirma", d: "FusionCRM mostrará una vista previa de los primeros registros. Confirma para iniciar la importación." },
            ].map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#1f2a48" }}>{s.n}</span>
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{s.t}</p>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="rounded-lg p-4 border mb-4" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>Formato CSV recomendado:</p>
            <pre className="text-xs" style={{ color: "var(--muted-foreground)" }}>
{`nombre,apellido,email,telefono,empresa,ciudad
Juan,García,juan@empresa.com,3001234567,Mi Empresa,Bogotá
María,López,maria@empresa.com,3109876543,Otra Empresa,Medellín`}
            </pre>
          </div>
          <Callout type="warning">
            Los contactos con el mismo email que ya existen en el sistema serán
            <strong> actualizados</strong>, no duplicados. Verifica tu CSV antes de importar para
            evitar sobreescribir datos existentes.
          </Callout>
        </section>

        <section id="filters" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Filtros avanzados</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los filtros avanzados permiten segmentar la vista del directorio según múltiples criterios
            combinados con operadores lógicos (AND/OR).
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Campos filtrables</h3>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Todos los campos estándar (nombre, email, empresa, ciudad, país)</li>
            <li>• Todos los campos personalizados</li>
            <li>• Fecha de creación y última actualización</li>
            <li>• Propietario asignado</li>
            <li>• Puntaje de lead scoring</li>
            <li>• Lista de contactos a la que pertenece</li>
            <li>• Tiene deals activos</li>
            <li>• Última actividad</li>
          </ul>
          <Callout type="tip">
            Guarda los filtros frecuentes como "vistas" haciendo clic en "Guardar vista" después
            de configurar tus filtros. Esto te permitirá acceder rápidamente a segmentos de
            contactos que revisas regularmente.
          </Callout>
        </section>

        <section id="kpis" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>KPIs de contacto</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El perfil de cada contacto incluye indicadores clave de desempeño (KPIs) que muestran
            el historial y valor de ese contacto para el negocio:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { metric: "Deals activos", desc: "Negocios en proceso" },
              { metric: "Valor total", desc: "Suma de deals ganados" },
              { metric: "Facturas", desc: "Total facturado" },
              { metric: "Último contacto", desc: "Fecha de última interacción" },
            ].map((k) => (
              <div
                key={k.metric}
                className="p-3 rounded-lg border text-center"
                style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
              >
                <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{k.metric}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{k.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <DocNav
          prev={{ href: "/docs/getting-started", title: "Primeros Pasos" }}
          next={{ href: "/docs/deals", title: "Deals" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
