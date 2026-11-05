import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Callout from "@/components/Callout";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Biblioteca de archivos para el equipo y la IA",
  description:
    "Guarda catálogos, listas de precios y fichas técnicas en la Biblioteca del CRM, ordénalos con tags, envíalos por WhatsApp y úsalos como base de la IA.",
  keywords: ["biblioteca de archivos", "catálogos", "listas de precios", "base de conocimiento", "RAG", "enviar archivos por WhatsApp"],
  alternates: { canonical: "/docs/biblioteca" },
  openGraph: {
    title: "Biblioteca de archivos para el equipo y la IA",
    description:
      "Guarda catálogos, listas de precios y fichas técnicas en la Biblioteca del CRM, ordénalos con tags, envíalos por WhatsApp y úsalos como base de la IA.",
    url: "/docs/biblioteca",
    siteName: "FusionCRM Docs",
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "Para qué sirve" },
  { id: "upload", label: "Subir archivos" },
  { id: "organize", label: "Buscar y organizar" },
  { id: "ai", label: "Usar archivos en la IA" },
  { id: "delete", label: "Eliminar archivos" },
];

const fg = { color: "var(--foreground)" };
const muted = { color: "var(--muted-foreground)" };

export default function LibraryPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <nav className="flex items-center gap-1 text-sm mb-6" aria-label="Breadcrumb">
          <Link href="/docs" className="hover:underline transition-colors" style={muted}>Docs</Link>
          <ChevronRight size={13} style={muted} />
          <span style={fg} className="font-medium">Biblioteca</span>
        </nav>
        <h1 className="text-3xl font-bold mb-2" style={fg}>Biblioteca</h1>
        <p className="text-lg mb-8" style={muted}>
          La Biblioteca es el archivo central de tu organización: catálogos, listas de precios, fotos
          de producto, fichas técnicas y cualquier documento que tu equipo comparte con los clientes
          o que quieres que use tu agente de IA. La encuentras en{" "}
          <strong style={fg}>Comunicación → Biblioteca</strong>.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Para qué sirve</h2>
          <p className="mb-4" style={muted}>
            Subes un archivo una vez y lo usa todo el equipo, sin buscarlo en el computador de cada
            persona:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• <strong style={fg}>En el chat:</strong> desde la barra de mensaje de una conversación, el botón <strong style={fg}>Biblioteca</strong> te deja enviar al cliente un archivo que ya está guardado aquí (ver <Link href="/docs/conversations" style={{ color: "#d1345b" }}>Conversaciones</Link>).</li>
            <li>• <strong style={fg}>En los fragmentos:</strong> las imágenes de la Biblioteca se pueden usar en tus fragmentos (respuestas guardadas).</li>
            <li>• <strong style={fg}>Para tu agente de IA:</strong> los documentos que marques para la IA forman su base de conocimiento (ver <a href="#ai" style={{ color: "#d1345b" }}>Usar archivos en la IA</a>).</li>
          </ul>
          <p className="mb-4" style={muted}>
            La lista muestra cada archivo con su <strong style={fg}>Tipo</strong>, sus{" "}
            <strong style={fg}>Tags</strong> y la fecha en que se <strong style={fg}>Creó</strong>. En cada fila tienes
            los botones para <strong style={fg}>editar</strong>, <strong style={fg}>ver</strong>,{" "}
            <strong style={fg}>descargar</strong> y <strong style={fg}>eliminar</strong> el archivo.
          </p>
        </section>

        <section id="upload" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Subir archivos</h2>
          <ol className="space-y-2 pl-4 mb-4" style={muted}>
            <li>1. En la Biblioteca, haz clic en <strong style={fg}>Subir Archivo</strong>.</li>
            <li>2. Arrastra el archivo a la ventana o haz clic para buscarlo en tu computador. Cada archivo puede pesar hasta 50 MB.</li>
            <li>3. Agrega uno o varios <strong style={fg}>tags</strong> (escribe en «Añadir tag...»). Te sirven después para filtrar, por ejemplo «catálogo», «precios» o «hoteles».</li>
            <li>4. Si quieres que tu agente de IA aprenda de ese documento, marca <strong style={fg}>Utilizar para modelos de IA (RAG)</strong>.</li>
            <li>5. Confirma la subida y el archivo queda en la lista, disponible para todo tu equipo.</li>
          </ol>
        </section>

        <section id="organize" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Buscar y organizar</h2>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• <strong style={fg}>Buscar:</strong> escribe en «Buscar archivos por nombre...».</li>
            <li>• <strong style={fg}>Filtrar por tag:</strong> arriba de la lista aparecen los tags que ya usas; toca uno para ver solo esos archivos, o <strong style={fg}>Todos</strong> para quitar el filtro.</li>
            <li>• <strong style={fg}>Editar:</strong> con el botón «Editar archivo» cambias el nombre, los tags y si el documento se usa en la IA. Guarda con <strong style={fg}>Guardar</strong>.</li>
          </ul>
        </section>

        <section id="ai" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Usar archivos en la IA</h2>
          <p className="mb-4" style={muted}>
            Al marcar <strong style={fg}>Utilizar para modelos de IA (RAG)</strong>, FusionCRM lee el documento y lo
            guarda en la base de conocimiento de tu organización. Tus agentes de IA lo consultan para
            responder a los clientes con información real de tu negocio: precios, políticas,
            preguntas frecuentes.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• Solo sirven documentos <strong style={fg}>PDF, DOCX, XLSX, TXT o CSV</strong>. Las imágenes no se indexan.</li>
            <li>• Mientras se procesa, el archivo muestra el aviso «Procesando para IA…». Cuando termina, aparece el ícono «Indexado en IA (RAG)».</li>
            <li>• Si desmarcas la casilla (desde «Editar archivo»), el documento sale de la base de conocimiento, pero sigue en la Biblioteca.</li>
          </ul>
          <Callout type="note">
            Para que un agente use estos documentos también debes activar el uso de la base de
            conocimiento en el agente. Mira cómo en{" "}
            <Link href="/docs/agentes-ia#knowledge" style={{ color: "#d1345b" }}>Agentes IA → Base de conocimiento</Link>,
            donde también están los topes de documentos de cada plan.
          </Callout>
        </section>

        <section id="delete" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Eliminar archivos</h2>
          <p className="mb-4" style={muted}>
            Usa el botón de la papelera en la fila del archivo, o selecciona varios con las casillas y
            haz clic en <strong style={fg}>Eliminar</strong> en la barra que aparece arriba.
          </p>
          <Callout type="warning">
            Eliminar un archivo no se puede deshacer. Si la imagen la usa algún fragmento, el aviso de
            confirmación te dice cuál: después de borrarla, ese fragmento se enviará solo con el texto
            hasta que le pongas otra imagen.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/projects", title: "Proyectos" }}
          next={{ href: "/docs/estrategia", title: "Estrategia" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
