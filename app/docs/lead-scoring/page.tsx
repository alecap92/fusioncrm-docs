import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Lead Scoring" };

const toc = [
  { id: "overview", label: "¿Qué es Lead Scoring?" },
  { id: "rules", label: "Reglas de puntuación" },
  { id: "create-rule", label: "Crear regla" },
  { id: "score-view", label: "Ver puntajes" },
  { id: "ai-scoring", label: "Scoring con IA" },
];

export default function LeadScoringPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Lead Scoring</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El Lead Scoring califica automáticamente a tus contactos según su probabilidad de
          convertirse en clientes, ayudando al equipo de ventas a priorizar esfuerzos.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>¿Qué es Lead Scoring?</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El Lead Scoring es un sistema que asigna puntos a cada contacto en función de sus
            características (perfil) y comportamiento (actividad). Los contactos con mayor puntaje
            tienen mayor probabilidad de comprar y deben recibir mayor atención del equipo de ventas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
              <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>Scoring demográfico (perfil)</p>
              <ul className="space-y-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <li>• Empresa: ¿es del tamaño objetivo?</li>
                <li>• Cargo: ¿es tomador de decisiones?</li>
                <li>• Industria: ¿es tu segmento target?</li>
                <li>• Ciudad/País: ¿zona de cobertura?</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
              <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>Scoring conductual (actividad)</p>
              <ul className="space-y-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <li>• Abrió email de campaña</li>
                <li>• Respondió mensaje de WhatsApp</li>
                <li>• Tiene deal activo</li>
                <li>• Última actividad reciente</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="rules" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Reglas de puntuación</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las reglas definen cuántos puntos suma o resta cada condición. Puedes configurarlas
            desde <strong style={{ color: "var(--foreground)" }}>Configuración → Lead Scoring → Reglas</strong>.
          </p>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Ejemplos de reglas</div>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Condición</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Puntos</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Tiene email registrado", "+5"],
                  ["Tiene teléfono registrado", "+5"],
                  ["Tiene empresa registrada", "+10"],
                  ["Cargo contiene \"Gerente\" o \"Director\"", "+20"],
                  ["Abrió email de campaña", "+15"],
                  ["Tiene deal activo", "+30"],
                  ["Respondió WhatsApp en últimos 7 días", "+20"],
                  ["Sin actividad en más de 90 días", "-10"],
                  ["Email rebotó (inválido)", "-20"],
                ].map(([cond, pts]) => (
                  <tr key={cond}>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{cond}</td>
                    <td className="p-3 border-b font-bold font-mono" style={{ borderColor: "var(--border)", color: pts.startsWith("+") ? "#22c55e" : "#ef4444" }}>{pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="create-rule" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear regla de scoring</h2>
          <ol className="space-y-3 mb-4">
            {[
              { n: "1", t: "Ve a Configuración → Lead Scoring", d: "Sección de configuración de reglas." },
              { n: "2", t: "Clic en \"+ Nueva regla\"", d: "Abre el formulario de configuración de regla." },
              { n: "3", t: "Define la condición", d: "Selecciona el campo a evaluar (ej. Cargo), el operador (contiene, es igual a, etc.) y el valor." },
              { n: "4", t: "Asigna los puntos", d: "Número positivo para sumar, negativo para restar." },
              { n: "5", t: "Activa la regla", d: "Guarda y activa. Los puntajes se recalculan automáticamente." },
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
          <Callout type="tip">
            Empieza con pocas reglas claras y bien calibradas. Es mejor tener 5 reglas precisas
            que 30 reglas que se solapan o que producen puntajes poco informativos.
          </Callout>
        </section>

        <section id="score-view" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Ver puntajes</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El puntaje de cada contacto es visible en:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Directorio de contactos:</strong> Columna de puntaje, filtrable y ordenable</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Perfil del contacto:</strong> Indicador visual de puntaje con desglose por regla</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Reportes de Lead Scoring:</strong> Distribución de puntajes, top leads</li>
          </ul>
          <div className="space-y-2 mb-4">
            {[
              { range: "80-100", label: "Lead caliente 🔥", color: "#ef4444", desc: "Prioridad máxima, contactar hoy." },
              { range: "50-79", label: "Lead tibio 🌡️", color: "#f59e0b", desc: "Seguimiento en los próximos días." },
              { range: "20-49", label: "Lead frío ❄️", color: "#3b82f6", desc: "Nutrir con contenido relevante." },
              { range: "0-19", label: "Lead inactivo 😴", color: "#6b7280", desc: "Re-calificar o archivar." },
            ].map((l) => (
              <div key={l.range} className="flex items-center gap-3 p-3 rounded border" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs font-bold px-2 py-1 rounded font-mono text-white" style={{ backgroundColor: l.color }}>{l.range}</span>
                <div>
                  <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{l.label}:</span>
                  <span className="text-sm ml-1" style={{ color: "var(--muted-foreground)" }}>{l.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="ai-scoring" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Scoring con IA (Spikey)</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Además del scoring basado en reglas, FusionCRM incluye scoring asistido por IA
            a través de Spikey. La IA analiza patrones en conversaciones, actividad histórica
            y datos del contacto para sugerir una calificación adicional.
          </p>
          <Callout type="tip">
            El scoring de IA complementa (no reemplaza) las reglas manuales. Úsalo para
            descubrir patrones que no habías considerado en tus reglas.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/reports", title: "Reportes" }}
          next={{ href: "/docs/workflows", title: "Automatizaciones" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
