import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Agentes IA" };

const toc = [
  { id: "overview", label: "¿Qué es un agente IA?" },
  { id: "setup", label: "Crear un agente" },
  { id: "prompt", label: "El prompt y sus variables" },
  { id: "tools", label: "Habilidades (tools)" },
  { id: "handoff", label: "Traspaso a un asesor" },
  { id: "knowledge", label: "Base de conocimiento" },
  { id: "testing", label: "Probar antes de activar" },
  { id: "limits", label: "Costos y límites" },
];

export default function AgentesIaPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>Agentes IA</h1>
          <span className="text-xs px-2 py-1 rounded font-bold" style={{ backgroundColor: "#d1345b", color: "white" }}>IA</span>
        </div>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Un agente IA atiende las conversaciones de WhatsApp en nombre de tu empresa: responde
          con el contexto del cliente, califica el lead, mueve la conversación de etapa y, cuando
          hace falta, se la pasa a una persona.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>¿Qué es un agente IA?</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Es un asistente conversacional configurado por ti (nombre, instrucciones, modelo,
            habilidades) que se conecta a la bandeja de WhatsApp. Cada mensaje entrante que le
            corresponde se responde con un modelo de OpenAI usando tu propia clave, y con el
            contexto real del cliente: sus datos de contacto, la etapa de la conversación, los
            últimos mensajes y sus negocios.
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Vive en <strong style={{ color: "var(--foreground)" }}>Configuración → Automatización → Agentes IA</strong>.</li>
            <li>• Tiene tres estados: <em>borrador</em>, <em>activo</em> y <em>pausado</em>. Solo el activo responde a clientes.</li>
            <li>• Puede tomar automáticamente las conversaciones nuevas de WhatsApp o solo las que se le asignen.</li>
            <li>• Una conversación la atiende el agente <em>o</em> una persona, nunca los dos a la vez.</li>
          </ul>
        </section>

        <section id="setup" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear un agente</h2>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Conecta tu clave de OpenAI en Configuración → Desarrollador → Integraciones (se guarda cifrada).</li>
            <li>2. En Agentes IA pulsa <em>Nuevo agente</em>: nombre, descripción y el prompt del sistema (instrucciones).</li>
            <li>3. Elige el modelo y ajusta el contexto: cuántos mensajes recientes ve y qué tan atrás mira para detectar patrones.</li>
            <li>4. Activa las habilidades que puede usar y, si quieres, el esquema de datos del lead que debe capturar.</li>
            <li>5. Define las palabras de traspaso (ej. «hablar con un asesor») y el mensaje que envía al pasar la conversación.</li>
            <li>6. Pruébalo en borrador y actívalo cuando responda como esperas.</li>
          </ol>
        </section>

        <section id="prompt" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>El prompt y sus variables</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El prompt del sistema es el corazón del agente: quién es, cómo habla, qué puede
            prometer y qué no. A ese texto FusionCRM le agrega el contexto del cliente en cada
            turno, así que no hace falta pedirle que «pregunte el nombre». Puedes usar variables
            de fecha y hora dentro del prompt:
          </p>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["{{FECHA_ACTUAL}}", "lunes 11 de mayo de 2026"],
                  ["{{FECHA_CORTA}}", "2026-05-11"],
                  ["{{HORA_ACTUAL}}", "14:35"],
                  ["{{HORA_AM_PM}}", "2:35 p.m."],
                  ["{{DIA_SEMANA}}", "lunes"],
                  ["{{ES_LABORAL}}", "«sí» de lunes a viernes entre 8am y 5pm (Colombia)"],
                  ["{{ES_FIN_DE_SEMANA}}", "«sí» en sábado o domingo"],
                ].map(([v, d]) => (
                  <tr key={v}>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{v}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout type="tip">
            Dile explícitamente qué hacer cuando no sabe algo («ofrece pasar con un asesor») y
            prohíbele inventar precios o plazos. Es la diferencia entre un agente útil y uno que
            hay que apagar a la semana.
          </Callout>
        </section>

        <section id="tools" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Habilidades (tools)</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Además de responder, el agente puede actuar sobre el CRM. Cada habilidad se activa por
            agente:
          </p>
          <div className="space-y-2 mb-4">
            {[
              ["Crear contacto", "Registra al cliente nuevo con los datos que dio en el chat."],
              ["Mover de etapa", "Lleva la conversación a la columna del pipeline que corresponda (ej. Oportunidad)."],
              ["Etiquetar", "Agrega etiquetas a la conversación para segmentar después."],
              ["Agregar nota", "Deja una nota interna con lo relevante de la charla."],
              ["Estado del lead", "Guarda los campos del esquema del lead (cantidad, fecha, ciudad…) a medida que los obtiene."],
              ["Pasar a un asesor", "Pausa al agente y asigna la conversación a una persona, con un mensaje de transición."],
              ["Buscar en la base de conocimiento", "Consulta tus documentos indexados para responder con información propia."],
            ].map(([name, desc]) => (
              <div key={name} className="p-3 rounded-lg border" style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
                <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{name}</p>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="handoff" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Traspaso a un asesor</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El agente se retira cuando el cliente usa una palabra de traspaso, cuando su propio
            criterio dice que hace falta una persona, o cuando un asesor toma la conversación desde
            la bandeja. Al pasar, la conversación queda asignada al asesor y el agente no vuelve a
            responder en ella; si más tarde la reasignas al agente, retoma. Los seguimientos
            automáticos (automatizaciones) no se ven afectados por esta pausa.
          </p>
        </section>

        <section id="knowledge" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Base de conocimiento</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Sube catálogos, listas de precios, políticas o preguntas frecuentes (desde la Biblioteca
            o como texto) y quedan indexados por organización. El agente busca en ellos por
            significado, no por palabra exacta, y responde citando lo que encontró. El mismo buscador
            está disponible por <Link href="/docs/api" style={{ color: "#d1345b" }}>API</Link> y{" "}
            <Link href="/docs/mcp" style={{ color: "#d1345b" }}>MCP</Link>.
          </p>
          <Callout type="warning">
            Un documento partido a la mitad (por ejemplo una tabla de precios muy larga) puede
            hacer que el agente cite un valor de la fila equivocada. Sube tablas cortas y con
            encabezados claros, y prueba preguntas de precio antes de activar.
          </Callout>
        </section>

        <section id="testing" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Probar antes de activar</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Un agente en <em>borrador</em> o <em>pausado</em> solo conversa con los números de prueba que la organización tenga autorizados; un cliente real nunca lo ve.</li>
            <li>• Desde la ficha del agente puedes simular una respuesta contra un contacto existente y ver el prompt completo que recibió el modelo, los tokens y el tiempo.</li>
            <li>• Revisa las primeras conversaciones reales en la bandeja: las respuestas del agente aparecen como salientes normales.</li>
          </ul>
        </section>

        <section id="limits" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Costos y límites</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Cada respuesta consume créditos de <strong style={{ color: "var(--foreground)" }}>tu</strong> cuenta de OpenAI; FusionCRM no cobra por mensaje del agente.</li>
            <li>• El prompt del sistema tiene un máximo de 30.000 caracteres.</li>
            <li>• Los mensajes de voz entrantes se transcriben antes de llegar al agente si tienes la integración de transcripción activa.</li>
            <li>• El agente respeta la ventana de 24 horas de WhatsApp: solo responde a conversaciones con un mensaje reciente del cliente.</li>
          </ul>
        </section>

        <DocNav
          prev={{ href: "/docs/workflows", title: "Automatizaciones" }}
          next={{ href: "/docs/calendar", title: "Calendario" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
