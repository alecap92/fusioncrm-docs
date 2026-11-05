import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Callout from "@/components/Callout";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Estrategia" };

const toc = [
  { id: "overview", label: "Para qué sirve" },
  { id: "funnel", label: "Funnel de Marketing" },
  { id: "audience", label: "Audiencia y buyer persona" },
  { id: "keywords", label: "Palabras Claves" },
];

const fg = { color: "var(--foreground)" };
const muted = { color: "var(--muted-foreground)" };

const stages = [
  { name: "Conciencia", side: "Adquisición", desc: "Que te conozcan: SEO, redes sociales, contenido, publicidad digital, prensa, eventos, correo y WhatsApp en frío." },
  { name: "Consideración", side: "Adquisición", desc: "Que te comparen y te prefieran: nurturing por correo, retargeting, webinars, casos de éxito, ebooks, comunidades, social selling y prospección." },
  { name: "Conversión", side: "El nudo", desc: "Que te compren: sales enablement, llamadas de cierre, lead scoring, landing pages, email directo, pruebas, incentivos de cierre y chat." },
  { name: "Adopción", side: "Expansión del valor", desc: "Que el cliente nuevo aproveche lo que compró: onboarding, tutoriales, acompañamiento y soporte proactivo." },
  { name: "Retención", side: "Expansión del valor", desc: "Que siga comprándote: fidelización, renovaciones, encuestas de satisfacción, mensajes de retención y postventa." },
  { name: "Expansión", side: "Expansión del valor", desc: "Que te compre más: up-selling, cross-selling, cuentas estratégicas y ofertas de expansión." },
  { name: "Evangelización", side: "Expansión del valor", desc: "Que te recomiende: referidos, reseñas, casos de éxito, embajadores y comunidad de clientes." },
];

export default function StrategyPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <nav className="flex items-center gap-1 text-sm mb-6" aria-label="Breadcrumb">
          <Link href="/docs" className="hover:underline transition-colors" style={muted}>Docs</Link>
          <ChevronRight size={13} style={muted} />
          <span style={fg} className="font-medium">Estrategia</span>
        </nav>
        <h1 className="text-3xl font-bold mb-2" style={fg}>Estrategia</h1>
        <p className="text-lg mb-8" style={muted}>
          Estrategia es tu cuaderno de marketing dentro del CRM: una guía de qué hacer en cada etapa
          del cliente, la descripción de a quién le vendes y tu lista de palabras clave. La
          encuentras en <strong style={fg}>Planeación → Estrategia</strong>.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Para qué sirve</h2>
          <p className="mb-4" style={muted}>
            La pantalla tiene tres pestañas: <strong style={fg}>Funnel de Marketing</strong>,{" "}
            <strong style={fg}>Audiencia</strong> y <strong style={fg}>Palabras Claves</strong>. Lo que
            llenes es de tu organización: todo tu equipo ve y edita la misma estrategia.
          </p>
          <Callout type="note">
            Para usarla, tu organización debe tener su nombre guardado. Si no lo tiene, verás el aviso
            «Configuración Requerida» con el botón <strong>Ir a Configuración</strong> (Configuración →
            General → Organización).
          </Callout>
        </section>

        <section id="funnel" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Funnel de Marketing</h2>
          <p className="mb-4" style={muted}>
            Es un embudo en forma de corbatín (bowtie). El lado izquierdo,{" "}
            <strong style={fg}>Adquisición · atraer y convertir</strong>, lleva a la venta. El lado derecho,{" "}
            <strong style={fg}>Expansión del valor · retener y crecer</strong>, empieza después de la venta,
            porque conseguir un cliente nuevo cuesta mucho más que conservar a uno. Trae siete etapas:
          </p>
          <div className="rounded-lg overflow-hidden border mb-6" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Etapa</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Lado</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Qué buscas</th>
                </tr>
              </thead>
              <tbody>
                {stages.map((s) => (
                  <tr key={s.name}>
                    <td className="p-3 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{s.name}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{s.side}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{s.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold mb-3" style={fg}>Cómo usarlo</h3>
          <ol className="space-y-2 pl-4 mb-4" style={muted}>
            <li>1. Haz clic en una etapa del corbatín. Abajo aparecen sus canales (por ejemplo SEO, Social Media o WhatsApp Marketing) y el <strong style={fg}>Objetivo de la etapa</strong>.</li>
            <li>2. Elige un canal para ver su lista de actividades clave.</li>
            <li>3. Marca cada actividad a medida que la haces. El porcentaje del canal y el de la etapa suben solos: es tu avance de optimización.</li>
            <li>4. Si un canal no aplica para tu negocio, toca <strong style={fg}>Esta estrategia no es para mí</strong>. Queda como «No aplica» y cuenta como resuelto para el avance de la etapa. Para volver a usarlo, toca <strong style={fg}>Habilitar estrategia</strong>.</li>
          </ol>
          <p className="mb-4" style={muted}>Los cambios se guardan solos.</p>
        </section>

        <section id="audience" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Audiencia y buyer persona</h2>
          <p className="mb-4" style={muted}>
            Aquí describes a tus clientes ideales. Puedes tener varias audiencias (por ejemplo, una
            para empresas y otra para personas). Cada una se llena por secciones:{" "}
            <strong style={fg}>Demografía</strong>, <strong style={fg}>Psicografía</strong>,{" "}
            <strong style={fg}>Comportamiento</strong>, <strong style={fg}>Necesidades y Puntos de Dolor</strong> y{" "}
            <strong style={fg}>Canales y Preferencias de Comunicación</strong>.
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={muted}>
            <li>1. Toca <strong style={fg}>Crear Nueva Audiencia</strong>, escribe el <strong style={fg}>Nombre de la Audiencia</strong> (ej. «Tomadores de Decisión Empresarial») y una descripción, y toca <strong style={fg}>Crear Audiencia</strong>.</li>
            <li>2. Elige la audiencia en «Tus Audiencias» y luego una sección. Cada sección muestra su avance en porcentaje según cuántas preguntas respondiste. El ícono de información abre consejos para llenarla.</li>
            <li>3. Responde cada pregunta tocando las opciones que aplican. Si ninguna sirve, toca <strong style={fg}>Otro</strong>, escribe tu respuesta y presiona Enter.</li>
            <li>4. Para cambiar el nombre de una audiencia, haz doble clic sobre ella en la lista.</li>
          </ol>
          <p className="mb-4" style={muted}>
            Cuando tengas las respuestas, toca <strong style={fg}>Generar Buyer</strong>: FusionCRM arma un
            documento de buyer persona con todo lo que llenaste. Con{" "}
            <strong style={fg}>Imprimir / Guardar PDF</strong> lo imprimes o lo guardas como PDF para
            compartirlo con tu equipo, tu diseñador o tu agencia.
          </p>
        </section>

        <section id="keywords" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Palabras Claves</h2>
          <p className="mb-4" style={muted}>
            Una lista ordenada de las búsquedas con las que tus clientes te encuentran en Google, útil
            para tus anuncios, tu sitio web y tus contenidos. Se organiza en grupos (por ejemplo, uno
            por tipo de cliente o por producto).
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={muted}>
            <li>1. Toca <strong style={fg}>Crear grupo</strong> y ponle nombre (ej. «Hoteles»).</li>
            <li>2. Con <strong style={fg}>Agregar fila</strong> sumas palabras clave. En cada fila escribes la <strong style={fg}>Palabra clave</strong>, su <strong style={fg}>Prioridad</strong> (un número) y su <strong style={fg}>Vol. busqueda</strong> (cuántas búsquedas tiene al mes, si lo sabes).</li>
            <li>3. Toca <strong style={fg}>Guardar</strong>. A diferencia de las otras pestañas, aquí los cambios no se guardan solos.</li>
            <li>4. Con <strong style={fg}>Descargar</strong> bajas todos los grupos en un archivo CSV (se abre en Excel) con las columnas Grupo, Palabra clave, Prioridad y Volumen de búsqueda.</li>
          </ol>
          <Callout type="tip">
            FusionCRM no calcula el volumen de búsqueda: lo escribes tú. Puedes sacarlo de
            herramientas como el Planificador de palabras clave de Google Ads.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/biblioteca", title: "Biblioteca" }}
          next={{ href: "/docs/settings", title: "Configuración" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
