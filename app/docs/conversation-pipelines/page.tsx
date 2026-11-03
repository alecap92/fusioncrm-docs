import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Pipelines de conversación" };

const toc = [
  { id: "overview", label: "Qué es un pipeline de conversación" },
  { id: "manage", label: "Crear y administrar pipelines" },
  { id: "columns", label: "Columnas de cada pipeline" },
  { id: "inbox", label: "Ver un pipeline en el inbox" },
  { id: "birth", label: "En qué pipeline nace cada chat" },
  { id: "move", label: "Mover conversaciones" },
  { id: "delete", label: "Eliminar un pipeline" },
  { id: "automations", label: "Automatizaciones por pipeline" },
  { id: "api", label: "API y MCP" },
];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--foreground)" }}>{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>{children}</p>
);
const B = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: "var(--foreground)" }}>{children}</strong>
);
const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ color: "#d1345b" }}>{children}</code>
);

const Steps = ({ items, color = "#d1345b" }: { items: { t: string; d: string }[]; color?: string }) => (
  <ol className="space-y-3 mb-6">
    {items.map((s, i) => (
      <li key={s.t} className="flex gap-3">
        <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color }}>{i + 1}</span>
        <div>
          <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{s.t}</p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.d}</p>
        </div>
      </li>
    ))}
  </ol>
);

export default function ConversationPipelinesPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Pipelines de conversación</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          El inbox de conversaciones es un tablero kanban. Un <B>pipeline de conversación</B> es un
          tablero con sus propias columnas. Una organización puede tener varios: uno por negocio,
          por equipo o por <Link href="/docs/whatsapp-lines" style={{ color: "#d1345b" }}>línea de WhatsApp</Link>.
        </p>

        <Callout type="note">
          Esta página es sobre los pipelines de <strong>conversaciones</strong> (chats). Los pipelines de{" "}
          <strong>negocios</strong> (deals) se administran aparte: ver{" "}
          <Link href="/docs/pipelines" style={{ color: "#d1345b" }}>Pipelines de negocios</Link>.
        </Callout>

        <section id="overview" className="mb-10 mt-8">
          <H2>Qué es un pipeline de conversación</H2>
          <P>
            Cada organización nace con un pipeline <B>predeterminado</B>, con columnas como
            "Sin leer", "En proceso" o "Cerrado". Toda conversación pertenece a exactamente un pipeline
            y está en exactamente una de sus columnas. Mientras tengas un solo pipeline, el inbox se ve
            igual que siempre; los selectores aparecen cuando creas el segundo.
          </P>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[
              { title: "Dos negocios, un CRM", stages: "Cada línea de WhatsApp cae en su propio tablero, con columnas distintas." },
              { title: "Ventas y soporte", stages: "Un tablero comercial (Nuevo → Cotizado → Cerrado) y otro de posventa (Reclamo → En revisión → Resuelto)." },
              { title: "Campañas", stages: "Un tablero solo para las respuestas de una campaña masiva, sin mezclarlas con la operación diaria." },
            ].map((e) => (
              <div key={e.title} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{e.title}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{e.stages}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="manage" className="mb-10">
          <H2>Crear y administrar pipelines</H2>
          <P>
            En <B>Ajustes → Conversaciones</B>, bloque "Pipelines de conversaciones". Ahí ves la lista
            con el predeterminado marcado y puedes:
          </P>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <B>Crear</B> un pipeline nuevo con su nombre. Nace con columnas básicas que luego editas.</li>
            <li>• <B>Renombrar</B> uno existente.</li>
            <li>• <B>Marcar como predeterminado.</B> Siempre hay exactamente uno: para cambiarlo se marca otro, nunca se "desmarca" el actual.</li>
            <li>• <B>Eliminar</B> (ver <a href="#delete" style={{ color: "#d1345b" }}>más abajo</a>).</li>
          </ul>
          <Callout type="tip">
            El pipeline predeterminado es donde caen los chats que no tienen otro destino: los de
            Messenger e Instagram, los de líneas de WhatsApp sin pipeline propio y los que crea la
            API sin indicar pipeline.
          </Callout>
        </section>

        <section id="columns" className="mb-10">
          <H2>Columnas de cada pipeline</H2>
          <P>
            En el mismo bloque, elige el pipeline a editar y entra a <B>Administrar columnas</B>. Cada
            columna (etapa) tiene:
          </P>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Nombre y color", "Cómo se ve en el tablero. Arrastra para cambiar el orden."],
                  ["Usuario asignado", "Al entrar a esta columna, la conversación se asigna automáticamente a ese asesor (opcional)."],
                  ["Reabrir al recibir mensaje", "Si un cliente escribe a una conversación que está en esta columna, vuelve a la primera columna (útil en \"Cerrado\")."],
                  ["URL del webhook", "Cada vez que una conversación entra a esta columna, FusionCRM hace un POST a esa URL (ver Webhooks salientes en la API)."],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="p-3 border-b font-medium whitespace-nowrap" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{k}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout type="warning">
            Al borrar una columna, sus conversaciones pasan a otra y las automatizaciones que la
            usaban como disparador o destino dejan de aplicar. Revisa primero qué automatizaciones
            dependen de esa columna.
          </Callout>
        </section>

        <section id="inbox" className="mb-10">
          <H2>Ver un pipeline en el inbox</H2>
          <P>
            Con dos o más pipelines, en la barra superior de Conversaciones aparece el selector
            <B> "Pipeline:"</B>, al lado del de "Línea:". El inbox muestra solo las conversaciones y las
            columnas del pipeline elegido, y recuerda tu elección en ese navegador. Si una conversación
            cambia de pipeline mientras lo miras, desaparece del tablero en tiempo real; si llega a
            tu pipeline, aparece.
          </P>
          <P>
            En la <B>app móvil</B> el selector de pipeline está en la pantalla de chats y funciona igual.
          </P>
        </section>

        <section id="birth" className="mb-10">
          <H2>En qué pipeline nace cada chat</H2>
          <Steps color="#25D366" items={[
            { t: "El pipeline de la línea de WhatsApp", d: "Si la línea por la que entra o sale el chat tiene pipeline asignado (Ajustes → WhatsApp → editar línea), el chat nace ahí, en la primera columna. Aplica a mensajes entrantes, a plantillas que inicia un asesor y a campañas masivas." },
            { t: "El pipeline indicado por la API o el MCP", d: "Al crear la conversación se puede pasar pipeline y etapa (de la misma organización; si no, error)." },
            { t: "El pipeline predeterminado", d: "Para todo lo demás: Messenger, Instagram y líneas sin pipeline propio." },
          ]} />
          <Callout type="note">
            Si el contacto ya tiene un chat abierto en esa línea, no nace uno nuevo: el mensaje entra
            al hilo existente, que se queda donde está. Cambiar el pipeline de una línea tampoco mueve
            los chats que ya existen.
          </Callout>
        </section>

        <section id="move" className="mb-10">
          <H2>Mover conversaciones</H2>
          <H3>Desde la tarjeta del kanban</H3>
          <P>
            Abre el menú <B>⋯</B> de la tarjeta. Tiene dos opciones separadas para que no se confundan:
          </P>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <B>Mover a columna:</B> cambia de columna dentro del mismo pipeline (lo mismo que arrastrar la tarjeta).</li>
            <li>• <B>Mover a pipeline:</B> al pasar el mouse se despliegan los otros pipelines y, sobre cada uno, sus columnas. Eliges el pipeline y la columna destino en un solo gesto. Solo aparece cuando hay más de un pipeline.</li>
          </ul>
          <H3>Desde el chat abierto</H3>
          <P>
            En el panel de información del chat, junto a la etapa, está el chip <B>"Mover a otro pipeline"</B>:
            abre un modal para elegir pipeline y columna destino.
          </P>
          <P>
            Al mover, la tarjeta desaparece del tablero actual y un aviso ofrece <B>"Ver en [pipeline]"</B>
            para saltar al destino. El cambio queda en el historial de etapas de la conversación y
            dispara las automatizaciones y webhooks de la columna de llegada, igual que cualquier otro
            movimiento.
          </P>
        </section>

        <section id="delete" className="mb-10">
          <H2>Eliminar un pipeline</H2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <B>El último pipeline no se puede eliminar.</B> El botón queda deshabilitado.</li>
            <li>• <B>Si tiene conversaciones</B>, el CRM no las borra: abre el modal "Mover conversaciones antes de eliminar", eliges pipeline y columna destino, y con "Mover y eliminar" las mueve todas y luego elimina el pipeline.</li>
            <li>• <B>Si era el predeterminado</B>, el más antiguo de los que quedan pasa a ser el nuevo predeterminado.</li>
          </ul>
          <Callout type="warning">
            Las líneas de WhatsApp que apuntaban al pipeline eliminado vuelven a usar el predeterminado.
            Revísalas en Ajustes → WhatsApp si querías otro destino.
          </Callout>
        </section>

        <section id="automations" className="mb-10">
          <H2>Automatizaciones por pipeline</H2>
          <P>
            Los disparadores de conversación ("entró a la columna X", "salió de la columna Y") pueden
            filtrar por pipeline. Un disparador <B>sin pipeline</B> aplica a todos los pipelines; con
            pipeline, solo a ese. Al guardar, el CRM valida que las columnas elegidas pertenezcan al
            pipeline indicado.
          </P>
          <Callout type="tip">
            Si una automatización tiene la acción "Mover conversación de etapa" a una columna del
            pipeline A, ponle el filtro de pipeline A en el disparador: una conversación del pipeline B
            no tiene esa columna y la acción fallaría.
          </Callout>
        </section>

        <section id="api" className="mb-10">
          <H2>API y MCP</H2>
          <P>
            Permisos <Code>pipelines:read</Code> y <Code>pipelines:write</Code>. Un pipeline o etapa de
            otra organización responde <Code>404</Code>, nunca se filtra en silencio.
          </P>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Qué</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>API REST</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>MCP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Listar, crear, editar y eliminar pipelines", "GET/POST /api/conversation-pipelines · GET/PUT/DELETE /api/conversation-pipelines/{id}", "list_conversation_pipelines · get/create/update/delete_conversation_pipeline"],
                  ["Columnas de un pipeline", "GET/POST …/{id}/stages · PUT/DELETE …/{id}/stages/{stageId} · PUT …/{id}/stages/order", "list_pipeline_stages · create/update/delete_conversation_stage · reorder_conversation_stages"],
                  ["Mover una conversación de columna", "PUT /api/conversations/{id}/stage", "move_conversation_stage"],
                  ["Mover una conversación a otro pipeline", "PUT /api/conversations/{id}/pipeline con pipelineId e initialStageId", "change_conversation_pipeline"],
                  ["Mover todas las conversaciones de un pipeline a otro", "POST /api/conversation-pipelines/{id}/move-all con targetPipelineId y targetStageId; responde { moved }", "move_all_conversations_pipeline"],
                  ["Listar conversaciones de un pipeline", "?pipeline= en GET /api/conversations", "list_conversations"],
                  ["Crear una conversación en un pipeline", "pipeline y stage en POST /api/conversations (opcionales)", "create_conversation"],
                ].map(([k, a, m]) => (
                  <tr key={k}>
                    <td className="p-3 border-b align-top" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{k}</td>
                    <td className="p-3 border-b align-top font-mono text-xs" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{a}</td>
                    <td className="p-3 border-b align-top font-mono text-xs" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>
            Códigos de error al eliminar: <Code>LAST_PIPELINE</Code> (es el único) y{" "}
            <Code>PIPELINE_HAS_CONVERSATIONS</Code> (trae <Code>conversations</Code> con la cantidad; usa
            move-all primero). Al editar, <Code>DEFAULT_REQUIRED</Code> si intentas desmarcar el
            predeterminado. Al mover, <Code>SAME_PIPELINE</Code> si ya está ahí.
          </P>
        </section>

        <DocNav
          prev={{ href: "/docs/conversations", title: "Conversaciones" }}
          next={{ href: "/docs/whatsapp-lines", title: "Líneas de WhatsApp" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
