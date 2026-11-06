import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Lead scoring: prioriza a tus mejores prospectos",
  description:
    "Configura lead scoring en FusionCRM: crea reglas que suman o restan puntos a cada contacto, mira los puntajes y entiende cuándo se recalculan.",
  keywords: ["lead scoring", "puntaje de leads", "calificar prospectos", "reglas de puntuación", "priorizar ventas"],
  alternates: { canonical: "/docs/lead-scoring" },
  openGraph: {
    title: "Lead scoring: prioriza a tus mejores prospectos",
    description:
      "Configura lead scoring en FusionCRM: crea reglas que suman o restan puntos a cada contacto, mira los puntajes y entiende cuándo se recalculan.",
    url: "/docs/lead-scoring",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "¿Qué es Lead Scoring?" },
  { id: "rules", label: "Reglas de puntuación" },
  { id: "create-rule", label: "Crear regla" },
  { id: "score-view", label: "Ver puntajes" },
  { id: "ai-scoring", label: "Cuándo se actualiza" },
];

export default function LeadScoringPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Lead Scoring</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El Lead Scoring le pone un puntaje a cada contacto según reglas que tú defines, para que
          tu equipo sepa a quién darle prioridad.
        </p>

        <Callout type="note" title="Plan">
          Lead Scoring viene en los planes Pro y Empresarial. Si bajas a Básico, tus reglas y los puntajes que ya tienen tus contactos se conservan, pero no puedes crear ni editar reglas ni recalcular.
        </Callout>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>¿Qué es Lead Scoring?</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada regla suma o resta puntos cuando un contacto cumple sus condiciones. El puntaje del
            contacto es la suma de todas las condiciones que cumple en las reglas activas. Las
            condiciones pueden mirar dos tipos de datos:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
              <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>Datos del contacto</p>
              <ul className="space-y-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <li>• Cualquier campo de la ficha: ciudad, tipo de empresa, origen, campos personalizados…</li>
                <li>• Condiciones: Existe, Igual a, No igual a, Contiene, Mayor que, Menor que, En la lista</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
              <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>Historial de compras</p>
              <ul className="space-y-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <li>• Antigüedad del último negocio, monto, estado y pipeline</li>
                <li>• Cantidad y valor total de negocios</li>
                <li>• Si compró un producto, frecuencia de compra y campos personalizados del negocio</li>
              </ul>
            </div>
          </div>
          <Callout type="note">
            Las reglas no miran aperturas de correo, respuestas de WhatsApp ni actividad reciente:
            solo los datos del contacto y sus negocios.
          </Callout>
        </section>

        <section id="rules" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Reglas de puntuación</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las reglas se configuran en{" "}
            <strong style={{ color: "var(--foreground)" }}>Configuración → Módulos del CRM → Lead Scoring</strong>.
            Cada regla tiene nombre, descripción, un interruptor para activarla o desactivarla sin
            borrarla, y una o varias condiciones con sus propios puntos.
          </p>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Ejemplos de condiciones</div>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Condición</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Puntos</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Email existe", "+5"],
                  ["Teléfono existe", "+5"],
                  ["Tipo de empresa igual a \"Hoteles\"", "+20"],
                  ["Ciudad en la lista \"Medellín, Bogotá, Cali\"", "+10"],
                  ["Valor total de negocios mayor que 5.000.000", "+30"],
                  ["Ha comprado el producto X", "+15"],
                  ["Último negocio más antiguo que 180 días", "-10"],
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
              { n: "1", t: "Ve a Configuración → Módulos del CRM → Lead Scoring", d: "Ahí ves tus reglas y si están activas." },
              { n: "2", t: "Haz clic en \"Nueva regla\"", d: "Ponle un nombre y, si quieres, una descripción." },
              { n: "3", t: "Agrega las condiciones", d: "Para cada una eliges el campo, la condición, el valor y los puntos. Usa puntos negativos para restar." },
              { n: "4", t: "Revisa la vista previa (opcional)", d: "Te muestra el impacto de la regla antes de guardarla." },
              { n: "5", t: "Haz clic en \"Crear regla\"", d: "Deja la regla activa para que cuente en el puntaje." },
              { n: "6", t: "Haz clic en \"Recalcular\"", d: "Crear, editar o activar una regla no cambia los puntajes que ya existen. \"Recalcular\" actualiza los de todos tus contactos en segundo plano; puede tardar unos minutos." },
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
            El puntaje de cada contacto se ve en:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Ficha del contacto:</strong> tarjeta &quot;Puntaje del lead&quot; (el número total).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Ficha de la empresa:</strong> &quot;Score de cuenta&quot;, que es el puntaje más alto entre sus contactos.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Conversación de WhatsApp:</strong> junto al chat, con un color según el número.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Automatizaciones:</strong> como la variable &quot;Puntaje del contacto&quot;.</li>
          </ul>
          <Callout type="note">
            FusionCRM no clasifica los contactos en caliente, tibio o frío ni pone un tope al
            puntaje: el número depende de los puntos que pongas en tus reglas. Si quieres rangos,
            defínelos tú (por ejemplo, &quot;más de 50 = prioridad&quot;) y úsalos en tus listas o
            automatizaciones.
          </Callout>
        </section>

        <section id="ai-scoring" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Cuándo se actualiza el puntaje</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El puntaje de un contacto se recalcula solo cuando:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Uno de sus negocios cambia de etapa (desde el kanban, el modal, la API o el MCP).</li>
            <li>• Creas o importas el contacto.</li>
            <li>• Editas el contacto en la app.</li>
          </ul>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los mensajes, los formularios, mover una conversación de etapa o lo que guarde un{" "}
            <a href="/docs/agentes-ia" style={{ color: "#d1345b" }}>agente IA</a> no recalculan el
            puntaje por sí solos. Para todo lo demás (por ejemplo, después de cambiar tus reglas),
            usa el botón &quot;Recalcular&quot;.
          </p>
          <Callout type="tip">
            Las reglas y el recálculo también se manejan por API y MCP (<code>list_scoring_rules</code>,{" "}
            <code>create_scoring_rule</code>, <code>recalculate_scoring_rules</code>).
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
