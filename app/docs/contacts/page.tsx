import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Contactos: base de clientes, listas e importación",
  description:
    "Administra tu base de clientes en el CRM: crea y edita contactos, usa campos personalizados, arma listas y segmentos, importa desde Excel o CSV y filtra.",
  keywords: ["base de clientes", "contactos CRM", "importar contactos Excel", "segmentos", "campos personalizados", "filtros avanzados"],
  alternates: { canonical: "/docs/contacts" },
  openGraph: {
    title: "Contactos: base de clientes, listas e importación",
    description:
      "Administra tu base de clientes en el CRM: crea y edita contactos, usa campos personalizados, arma listas y segmentos, importa desde Excel o CSV y filtra.",
    url: "/docs/contacts",
    siteName: "FusionCRM Docs",
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "Vista general" },
  { id: "crud", label: "CRUD de contactos" },
  { id: "create", label: "Crear contacto", depth: 3 },
  { id: "edit", label: "Editar contacto", depth: 3 },
  { id: "delete", label: "Eliminar contacto", depth: 3 },
  { id: "detail-tabs", label: "Pestañas de la ficha" },
  { id: "city", label: "Ciudad y departamento" },
  { id: "custom-fields", label: "Campos personalizados" },
  { id: "lists", label: "Listas y segmentos" },
  { id: "import", label: "Importar contactos" },
  { id: "filters", label: "Filtros avanzados" },
  { id: "kpis", label: "Indicadores del contacto" },
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
            El directorio de contactos (menú Contactos → Directorio de Contactos) muestra todos tus
            contactos, del más reciente al más antiguo, en vista de cuadrícula o de lista. Puedes:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Buscar contactos por nombre, email, teléfono o empresa (mínimo 3 caracteres; los espacios de más no afectan: &quot;Juan Acosta&quot; encuentra &quot;Juan  Acosta&quot;)</li>
            <li>• Filtrar por campos estándar y personalizados, y por datos de compra (ver <a href="#filters" style={{ color: "#d1345b" }}>Filtros avanzados</a>)</li>
            <li>• Ver en la lista su empresa, email, teléfono, ciudad, ingresos y etiquetas</li>
            <li>• Abrir la ficha de cada contacto, donde ves su puntaje de lead scoring y su historial</li>
            <li>• Seleccionar varios contactos para eliminarlos juntos o agregarlos a una lista</li>
            <li>• Exportar la lista a Excel (.xlsx) con el botón <strong style={{ color: "var(--foreground)" }}>Exportar</strong> (solo propietarios de la organización)</li>
          </ul>
          <Callout type="note">
            Todos los usuarios de tu organización ven todos los contactos. Lo que cada persona puede
            hacer depende de su rol (propietario, empleado, lector o contador), que asignas en
            Configuración → Usuarios. El número de contactos que puedes tener depende de tu plan.
          </Callout>
          <Callout type="note">
            Al guardar un contacto (a mano, por importación, formulario o API) los valores se
            guardan sin espacios al inicio ni al final.
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
                { n: "1", t: "Haz clic en \"Nuevo Contacto\"", d: "Botón en la esquina superior derecha del directorio." },
                { n: "2", t: "Completa los campos", d: "Solo el nombre es obligatorio, salvo que tu organización haya marcado otros campos como obligatorios." },
                { n: "3", t: "Agrega campos personalizados", d: "Si tu organización tiene campos adicionales configurados, aparecerán en el formulario." },
                { n: "4", t: "Guarda el contacto", d: "Haz clic en \"Crear contacto\". Si ya existe un contacto con ese correo o celular, no se crea otro: FusionCRM te avisa que el contacto ya existía." },
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
                Campos que trae una cuenta nueva
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
                    ["Teléfono y Móvil", "Número", "No"],
                    ["Empresa", "Texto", "No"],
                    ["Tipo de empresa", "Selección", "No"],
                    ["Dirección", "Texto", "No"],
                    ["Ciudad", "Municipio del catálogo DANE", "No"],
                    ["Departamento", "Se completa solo con la ciudad", "No"],
                    ["País", "Texto", "No"],
                    ["Origen", "Texto", "No"],
                    ["Notas", "Área de texto", "No"],
                    ["Tipo de documento, número y dígito de verificación", "Texto", "No"],
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
            <p className="mb-4 text-sm" style={{ color: "var(--muted-foreground)" }}>
              El formulario muestra los campos que tu organización tenga configurados en
              Configuración → Módulos del CRM → Contactos, así que puede verse distinto en tu cuenta.
            </p>
            <Callout type="tip">
              Cuando te escribe por WhatsApp un número que no tienes guardado, usa el botón
              &quot;Crear Contacto&quot; del panel lateral del chat: el contacto queda ligado a esa conversación.
            </Callout>
          </div>

          <div id="edit" className="mb-8">
            <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--foreground)" }}>Editar contacto</h3>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
              Para editar un contacto existente:
            </p>
            <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
              <li>1. Haz clic en el nombre del contacto en el directorio</li>
              <li>2. En su ficha, haz clic en &quot;Editar Contacto&quot; (arriba a la derecha)</li>
              <li>3. Cambia lo que necesites en el formulario</li>
              <li>4. Haz clic en &quot;Guardar cambios&quot;</li>
            </ul>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
              En la ficha del contacto tienes las pestañas Actividad, Negocios, Cotizaciones, Archivos,
              Notas e Imprimir, y también Facturas y Envíos si tienes esos módulos activos. El botón de
              WhatsApp te lleva a su conversación.
            </p>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
              En la pestaña <strong style={{ color: "var(--foreground)" }}>Imprimir</strong> generas documentos en PDF
              (rótulos de envío, contratos, formatos) rellenados con los datos del contacto. Las plantillas se crean en
              Configuración → Documentos → Plantillas PDF; mira{" "}
              <a href="/docs/settings#plantillas-pdf" style={{ color: "#d1345b" }}>cómo crear una plantilla</a>.
            </p>
            <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
              <li>• <strong style={{ color: "var(--foreground)" }}>Origen:</strong> la tarjeta del contacto muestra de dónde llegó (por ejemplo, un formulario, una landing o un anuncio, con sus datos de campaña cuando existen).</li>
              <li>• <strong style={{ color: "var(--foreground)" }}>No contactar por WhatsApp:</strong> si el contacto lo pide, desactívalo en su ficha. Deja de recibir automatizaciones, campañas, plantillas y mensajes del agente IA; tú puedes seguir respondiéndole desde la bandeja.</li>
              <li>• <strong style={{ color: "var(--foreground)" }}>Exportar datos:</strong> el propietario puede descargar en un archivo todo lo que FusionCRM tiene de ese contacto, útil si te lo pide por Habeas Data.</li>
            </ul>
          </div>

          <div id="delete" className="mb-8">
            <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--foreground)" }}>Eliminar contacto</h3>
            <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
              Para eliminar un contacto:
            </p>
            <ul className="space-y-2 pl-4 mb-3" style={{ color: "var(--muted-foreground)" }}>
              <li>• En el directorio, abre el menú ⋮ del contacto y elige &quot;Eliminar&quot;, o</li>
              <li>• Desde su ficha, entra a &quot;Editar Contacto&quot; y usa el botón &quot;Eliminar&quot;.</li>
              <li>• Para borrar varios, selecciónalos en el directorio y haz clic en &quot;Eliminar&quot;.</li>
            </ul>
            <Callout type="danger">
              Eliminar un contacto <strong>no se puede deshacer</strong>. Se borra la ficha del
              contacto, pero sus negocios, cotizaciones, facturas y conversaciones{" "}
              <strong>no</strong> se eliminan: siguen en el sistema sin ese contacto asociado.
            </Callout>
          </div>
        </section>

        <section id="detail-tabs" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Pestañas de la ficha</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Actividad:</strong> la historia completa del contacto en orden: negocios, cotizaciones, facturas, envíos de paquetes, actividades, conversaciones, citas del calendario, campañas y correos o WhatsApp enviados. Puedes buscar dentro de ella («Buscar en actividad...») y filtrar por tipo. Con <strong style={{ color: "var(--foreground)" }}>Nueva actividad</strong> registras a mano una Reunión, Llamada, Correo, Nota o WhatsApp.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Negocios</strong> y <strong style={{ color: "var(--foreground)" }}>Cotizaciones:</strong> los del contacto.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Archivos:</strong> documentos propios del contacto (un contrato firmado, el RUT, una foto). Súbelos con el botón <strong style={{ color: "var(--foreground)" }}>+</strong>; haz clic en el nombre para verlos y en la X para borrarlos.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Notas:</strong> un espacio de texto libre sobre el contacto. Escribe y toca <strong style={{ color: "var(--foreground)" }}>Guardar</strong>; si tienes cambios sin guardar, la pestaña te avisa.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Imprimir:</strong> documentos PDF rellenados con sus datos, como contratos, formatos o rótulos de envío con tu propio diseño (ver <a href="/docs/settings#plantillas-pdf" style={{ color: "#d1345b" }}>Plantillas PDF</a>). Si lo que necesitas es la guía de una transportadora, usa la pestaña Envíos (ver <a href="/docs/shipments#labels" style={{ color: "#d1345b" }}>Etiquetas y rótulos</a>).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Facturas:</strong> solo si tienes el módulo de facturación (ver <a href="/docs/invoices" style={{ color: "#d1345b" }}>Facturación</a>).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Envíos:</strong> solo si tienes el módulo Envíos. Con <strong style={{ color: "var(--foreground)" }}>Cotizar envío</strong> comparas transportadoras y generas la guía con Envia.com, y aquí queda el historial de envíos del contacto con su estado (ver <a href="/docs/shipments" style={{ color: "#d1345b" }}>Envíos</a>).</li>
          </ul>
        </section>

        <section id="city" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Ciudad y departamento</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La ciudad se elige de la lista oficial de municipios de Colombia (DANE). Al escribir
            aparecen sugerencias como &quot;Medellín — Antioquia&quot;; al elegir una, el departamento se
            completa solo. Así no hay &quot;BOGOTA&quot; y &quot;Bogotá D.C.&quot; como si fueran dos ciudades,
            y los filtros por ciudad o por departamento traen a todos.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Si escribes una ciudad sin elegirla de la lista, FusionCRM intenta reconocerla. Si corresponde a un solo municipio, queda confirmada; si no puede (está mal escrita, no existe o es ambigua), se guarda igual como <strong style={{ color: "var(--foreground)" }}>&quot;sin confirmar&quot;</strong> (por ejemplo, &quot;Rionegro · sin confirmar&quot;, porque hay un Rionegro en Antioquia y otro en Santander).</li>
            <li>• La lista dinámica <strong style={{ color: "var(--foreground)" }}>&quot;Ciudades sin confirmar&quot;</strong> reúne esos contactos para corregirlos cuando quieras.</li>
            <li>• Para contactos de otro país la ciudad es texto libre.</li>
          </ul>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>
              Por API: city, cityCode, state y stateCode
            </div>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["cityCode", "Código DANE del municipio, 5 dígitos (05001 = Medellín). Es la fuente de verdad: si lo envías, se derivan los otros tres."],
                  ["city", "Nombre de la ciudad. Enviado solo, debe corresponder sin ambigüedad a un municipio."],
                  ["state", "Departamento en texto. Lo deriva el servidor; enviado sirve de pista para desambiguar city."],
                  ["stateCode", "Código DANE del departamento (05 = Antioquia). Siempre lo calcula el servidor; el valor enviado se ignora."],
                ].map(([field, desc]) => (
                  <tr key={field}>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{field}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            En la API la ciudad es estricta: si <code>city</code> es ambigua, está mal escrita o no
            existe, la respuesta es <strong style={{ color: "var(--foreground)" }}>422 CITY_UNRESOLVED</strong>{" "}
            con los <code>candidates</code> posibles y no se guarda nada; reenvía con el{" "}
            <code>cityCode</code> que corresponda. Un <code>cityCode</code> inexistente responde 400{" "}
            <code>INVALID_CITY_CODE</code>. Busca el código con{" "}
            <code>GET /api/catalogs/municipalities?q=medellin</code>.
          </p>
          <Callout type="tip">
            Ejemplos, caché del catálogo y el comportamiento de formularios e importación en{" "}
            <Link href="/docs/ciudades" style={{ color: "#d1345b" }}>Ciudades: catálogo DANE</Link>.
          </Callout>
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
              { type: "Texto", desc: "Una línea de texto libre" },
              { type: "Área de texto", desc: "Texto largo, varias líneas" },
              { type: "Número", desc: "Valores numéricos" },
              { type: "Fecha", desc: "Selector de fecha" },
              { type: "Selección", desc: "Lista desplegable" },
              { type: "Email", desc: "Dirección de email" },
              { type: "Teléfono", desc: "Número de teléfono" },
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
            Configuración → Módulos del CRM → Contactos</strong> y haz clic en{" "}
            <strong style={{ color: "var(--foreground)" }}>Nuevo campo</strong>. Ahí también organizas
            los campos en grupos y marcas cuáles son obligatorios.
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
            <li>1. Ve a <strong style={{ color: "var(--foreground)" }}>Contactos → Grupos y Listas</strong></li>
            <li>2. Haz clic en <strong style={{ color: "var(--foreground)" }}>Nueva Lista</strong></li>
            <li>3. Asigna un nombre descriptivo y elige el tipo</li>
            <li>4. Define los filtros o agrega los contactos</li>
            <li>5. Guarda la lista</li>
          </ol>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Dinámica:</strong> defines filtros y la lista se actualiza sola cuando un contacto los cumple.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Estática:</strong> agregas los contactos a mano o por filtro, y la lista no cambia sola.</li>
          </ul>
          <Callout type="tip">
            También puedes seleccionar contactos en el directorio y agregarlos a una lista.
          </Callout>
        </section>

        <section id="import" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Importar contactos</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Puedes importar contactos masivamente desde Excel (.xlsx, .xls) o CSV, hasta 10 MB por
            archivo. Esto es ideal para migrar desde otro CRM o cargar una base de datos existente.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Proceso de importación</h3>
          <ol className="space-y-3 mb-4">
            {[
              { n: "1", t: "Haz clic en \"Importar\"", d: "Botón en la parte superior del directorio de contactos." },
              { n: "2", t: "Sube el archivo", d: "El archivo debe tener encabezados en la primera fila. Si no tienes uno, usa \"Descargar plantilla\". Si quieres, activa \"Crear las empresas que no existan\"." },
              { n: "3", t: "Asigna las columnas", d: "Asocia cada columna de tu archivo con un campo de FusionCRM." },
              { n: "4", t: "Revisa la vista previa y confirma", d: "FusionCRM te muestra cómo quedarán los registros antes de importar." },
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
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>Ejemplo de archivo:</p>
            <pre className="text-xs" style={{ color: "var(--muted-foreground)" }}>
{`nombre,apellido,email,telefono,empresa,ciudad
Juan,García,juan@empresa.com,3001234567,Mi Empresa,Bogotá
María,López,maria@empresa.com,3109876543,Otra Empresa,Medellín`}
            </pre>
          </div>
          <Callout type="warning">
            Si un contacto ya existe con el mismo correo o celular, se <strong>actualiza</strong> en
            vez de duplicarse, pero solo con las columnas que trae tu archivo; los demás datos no se
            tocan. Si llegas al límite de contactos de tu plan, la importación te avisa.
          </Callout>
          <Callout type="tip">
            ¿Te equivocaste? Puedes revertir una importación desde{" "}
            <strong>Configuración → Historial</strong>.
          </Callout>
        </section>

        <section id="filters" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Filtros avanzados</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Con el botón <strong style={{ color: "var(--foreground)" }}>Filtros</strong> del directorio
            combinas varias condiciones; un contacto aparece solo si las cumple todas.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>Campos filtrables</h3>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Cualquier campo de contacto, estándar o personalizado</li>
            <li>• Datos de compra: Última compra, Total de compras, Negocio ganado, Cliente activo, N° negocios ganados y Tiene negocios</li>
          </ul>
          <Callout type="tip">
            Para tener a mano un segmento que revisas seguido, crea una lista dinámica con esos
            filtros en Contactos → Grupos y Listas.
          </Callout>
        </section>

        <section id="kpis" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Indicadores del contacto</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Si tu organización usa el módulo de negocios, la ficha de cada contacto muestra tres
            indicadores:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { metric: "Ingresos totales", desc: "Lo que te ha comprado" },
              { metric: "Último pedido", desc: "Fecha de su negocio más reciente" },
              { metric: "Puntaje del lead", desc: "Según tus reglas de lead scoring" },
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
          next={{ href: "/docs/companies", title: "Empresas" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
