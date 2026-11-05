import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Agentes IA para atender WhatsApp",
  description:
    "Crea un agente de IA que responde por WhatsApp con el contexto del cliente, califica leads, usa tu base de conocimiento y pasa el chat a un asesor cuando toca.",
  keywords: ["agente IA WhatsApp", "chatbot WhatsApp", "inteligencia artificial CRM", "calificar leads", "base de conocimiento", "traspaso a asesor"],
  alternates: { canonical: "/docs/agentes-ia" },
  openGraph: {
    title: "Agentes IA para atender WhatsApp",
    description:
      "Crea un agente de IA que responde por WhatsApp con el contexto del cliente, califica leads, usa tu base de conocimiento y pasa el chat a un asesor cuando toca.",
    url: "/docs/agentes-ia",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

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
            corresponde se responde con el proveedor de IA que elijas (OpenAI o Claude de Anthropic)
            usando tu propia clave, y con el
            contexto real del cliente: sus datos de contacto, la etapa de la conversación, los
            últimos mensajes y sus negocios.
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Vive en <strong style={{ color: "var(--foreground)" }}>Configuración → Automatización → Agentes IA</strong>.</li>
            <li>• Tiene tres estados: <em>borrador</em>, <em>activo</em> y <em>pausado</em>. Solo el activo responde a clientes.</li>
            <li>• Para que tome las conversaciones nuevas, ve a <strong style={{ color: "var(--foreground)" }}>Configuración → WhatsApp</strong>, abre la línea (número) que debe atender y elige el agente. También puedes asignarle conversaciones a mano desde la bandeja.</li>
            <li>• Si el cliente manda varios mensajes seguidos, el agente espera unos segundos (8 por defecto) y los responde todos de una vez.</li>
            <li>• Una conversación la atiende el agente <em>o</em> una persona, nunca los dos a la vez.</li>
          </ul>
        </section>

        <section id="setup" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear un agente</h2>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Conecta tu clave de <strong>OpenAI</strong> o de <strong>Claude AI</strong> en Configuración → Desarrollador → Integraciones (se guarda cifrada).</li>
            <li>2. En Agentes IA pulsa <em>Nuevo agente</em>: nombre, estado, descripción y las instrucciones (prompt del sistema).</li>
            <li>3. Elige el <strong>Proveedor</strong> y el <strong>Modelo</strong> (por defecto gpt-4o-mini), la <strong>Temperatura</strong> (0,4 por defecto; 0 es más preciso, 1 o más es más creativo) y el <strong>Max tokens respuesta</strong> (largo máximo de cada respuesta, 400 por defecto).</li>
            <li>4. Escribe las <strong>Palabras clave de derivación a humano</strong>, separadas por coma (por defecto: hablar con humano, asesor, persona real, agente humano), y el <strong>Mensaje al derivar</strong>.</li>
            <li>5. Si quieres que use tus documentos, marca <strong>🧠 Habilitar uso de RAG (base de conocimiento)</strong>.</li>
            <li>6. Marca las <strong>Habilidades del agente</strong>. Si no marcas ninguna, solo responde texto sin tocar nada en el CRM.</li>
            <li>7. Pulsa <em>Crear agente</em>, pruébalo con <em>Probar agente con un contacto real</em> y actívalo cuando responda como esperas.</li>
          </ol>
          <Callout type="note">
            Cuántos mensajes recientes lee el agente (20 por defecto) y qué datos del lead debe ir
            recogiendo no se configuran desde la pantalla: se ajustan por{" "}
            <Link href="/docs/api" style={{ color: "#d1345b" }}>API</Link> o{" "}
            <Link href="/docs/mcp" style={{ color: "#d1345b" }}>MCP</Link>.
          </Callout>
        </section>

        <section id="prompt" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>El prompt y sus variables</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El prompt del sistema es el corazón del agente: quién es, cómo habla, qué puede
            prometer y qué no. A ese texto FusionCRM le agrega el contexto del cliente en cada
            turno, así que no hace falta pedirle que «pregunte el nombre». Puedes usar variables
            de fecha y hora dentro del prompt. Siempre se calculan con la hora de Colombia
            (America/Bogota), sin importar la zona horaria de tu cuenta:
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
                  ["{{ZONA_HORARIA}}", "Colombia (America/Bogota)"],
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
            agente; en pantalla la verás con su nombre técnico (entre paréntesis abajo) y su
            descripción:
          </p>
          <div className="space-y-2 mb-4">
            {[
              ["Crear contacto (create_contact)", "Registra al cliente nuevo con los datos que dio en el chat."],
              ["Mover de etapa (move_conversation_stage)", "Lleva la conversación a la columna del pipeline que corresponda (ej. Oportunidad)."],
              ["Etiquetar (add_conversation_tags)", "Agrega etiquetas a la conversación para segmentar después."],
              ["Agregar nota (add_conversation_note)", "Deja una nota interna, visible para tu equipo y no para el cliente."],
              ["Estado del lead (update_lead_state)", "Guarda los datos del lead (cantidad, fecha, ciudad…) a medida que los obtiene."],
              ["Consultar precio (get_price)", "Da el precio exacto de un producto para una cantidad, según las escalas de precio que configuraste. Así el agente no inventa ni calcula precios."],
              ["Asignar a un asesor (assign_to_advisor)", "Asigna la conversación a una persona concreta de tu equipo y deja de responder."],
              ["Pasar a humano (handoff_to_human)", "Deja la conversación al equipo sin elegir a nadie en particular y deja de responder."],
            ].map(([name, desc]) => (
              <div key={name} className="p-3 rounded-lg border" style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
                <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{name}</p>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
              </div>
            ))}
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La búsqueda en la base de conocimiento no está en esta lista: se activa con la casilla{" "}
            <strong>🧠 Habilitar uso de RAG</strong> (ver <a href="#knowledge" className="underline">Base de conocimiento</a>).
            Por defecto el agente hace hasta 5 acciones por respuesta; puedes subirlo hasta 15 en{" "}
            <em>Máx. llamadas a tools por respuesta</em>.
          </p>
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
            Sube catálogos, listas de precios, políticas o preguntas frecuentes en la{" "}
            <Link href="/docs/biblioteca" style={{ color: "#d1345b" }}><strong>Biblioteca</strong></Link>, marcando la casilla <strong>«Utilizar para modelos de IA (RAG)»</strong>,
            y activa <strong>🧠 Habilitar uso de RAG</strong> en el agente. (Subir el contenido como
            texto solo se puede por API o MCP.) El agente busca en ellos por
            significado, no por palabra exacta, y responde citando lo que encontró. El mismo buscador
            está disponible por <Link href="/docs/api" style={{ color: "#d1345b" }}>API</Link> y{" "}
            <Link href="/docs/mcp" style={{ color: "#d1345b" }}>MCP</Link>.
          </p>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada plan tiene un tope de documentos: Free 10 documentos (20 MB), Pro 100 documentos
            (200 MB) y Unlimited sin límite.
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
            <li>• Un agente en <em>borrador</em> o <em>pausado</em> no les responde a tus clientes.</li>
            <li>• Para ver cómo respondería, abre el agente y ve a <strong>Probar agente con un contacto real</strong>: escribe el teléfono de un contacto existente y un mensaje de ejemplo, y pulsa <em>Probar respuesta</em>. Verás la respuesta del agente, el contacto, la etapa, los tokens usados y el tiempo. No se le envía nada al cliente.</li>
            <li>• Revisa las primeras conversaciones reales en la bandeja: las respuestas del agente aparecen como salientes normales.</li>
          </ul>
        </section>

        <section id="limits" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Costos y límites</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Cada respuesta consume créditos de <strong style={{ color: "var(--foreground)" }}>tu</strong> cuenta del proveedor de IA que elegiste (OpenAI o Anthropic); FusionCRM no cobra por mensaje del agente.</li>
            <li>• El prompt del sistema tiene un máximo de 30.000 caracteres.</li>
            <li>• Cada respuesta mide hasta 400 tokens por defecto (máximo 12.000) y usa hasta 5 habilidades (máximo 15).</li>
            <li>• Puedes poner hasta 30 palabras de traspaso, y el mensaje al derivar tiene máximo 400 caracteres.</li>
            <li>• Para que el agente entienda las notas de voz, conecta <strong style={{ color: "var(--foreground)" }}>ElevenLabs</strong> con tu API key en Configuración → Desarrollador → Integraciones: los audios se transcriben antes de llegar al agente.</li>
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
