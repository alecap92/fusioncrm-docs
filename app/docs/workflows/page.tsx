import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Automatizaciones sin código",
  description:
    "Automatiza tareas repetitivas del CRM sin código: disparadores como un mensaje de WhatsApp o una factura vencida, acciones, historial de ejecución y ejemplos.",
  keywords: ["automatizaciones", "workflows", "automatizar WhatsApp", "disparadores", "sin código"],
  alternates: { canonical: "/docs/workflows" },
  openGraph: {
    title: "Automatizaciones sin código",
    description:
      "Automatiza tareas repetitivas del CRM sin código: disparadores como un mensaje de WhatsApp o una factura vencida, acciones, historial de ejecución y ejemplos.",
    url: "/docs/workflows",
    siteName: "FusionCRM Docs",
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "¿Qué es una automatización?" },
  { id: "editor", label: "El editor" },
  { id: "triggers", label: "Disparadores" },
  { id: "actions", label: "Acciones disponibles" },
  { id: "create", label: "Crear una automatización" },
  { id: "history", label: "Historial de ejecución" },
  { id: "examples", label: "Ejemplos prácticos" },
];

const muted = { color: "var(--muted-foreground)" };
const fg = { color: "var(--foreground)" };

export default function WorkflowsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={fg}>Automatizaciones</h1>
        <p className="text-lg mb-8" style={muted}>
          Las automatizaciones hacen solas las tareas repetitivas: cuando pasa algo en el CRM
          (un cliente escribe, se crea un contacto, vence una factura…) se ejecutan los pasos
          que tú definas, sin escribir código.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>¿Qué es una automatización?</h2>
          <p className="mb-4" style={muted}>
            Una automatización es una lista de pasos que corre sola cuando ocurre un evento (el
            <strong> disparador</strong>). Puedes poner condiciones para que siga un camino u otro.
            Las encuentras en el menú de arriba, en <strong>Planeación → Automatizaciones</strong>.
          </p>
          <div className="p-4 rounded-lg border mb-6" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm font-semibold mb-3" style={fg}>Estructura básica:</p>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { label: "DISPARADOR", color: "#8b5cf6", desc: "¿Cuándo?" },
                { label: "→", color: "var(--muted-foreground)" },
                { label: "CONDICIÓN", color: "#3b82f6", desc: "¿Si...?" },
                { label: "→", color: "var(--muted-foreground)" },
                { label: "ACCIÓN", color: "#22c55e", desc: "¿Qué hacer?" },
              ].map((n, i) => (
                n.label === "→"
                  ? <span key={i} className="text-lg font-bold" style={{ color: n.color }}>→</span>
                  : (
                    <div key={i} className="text-center">
                      <div className="px-3 py-2 rounded font-bold text-xs text-white" style={{ backgroundColor: n.color }}>{n.label}</div>
                      <div className="text-xs mt-1" style={muted}>{n.desc}</div>
                    </div>
                  )
              ))}
            </div>
          </div>
          <p className="mb-4" style={muted}>
            En la pantalla de Automatizaciones también tienes:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={muted}>
            <li>• <strong>Plantillas</strong>: automatizaciones listas para usar que adaptas a tu negocio.</li>
            <li>• <strong>Crear con IA</strong>: describes en palabras lo que quieres y el sistema arma el borrador para que lo revises.</li>
            <li>• <strong>Horario de envío</strong>: los días y horas en que las automatizaciones pueden escribirles a tus clientes por WhatsApp o correo, en la zona horaria de tu cuenta. Así no le llega un mensaje a nadie un domingo en la madrugada.</li>
            <li>• <strong>Ejecuciones</strong>: todas las ejecuciones de la cuenta, con filtros (ver <a href="#history" className="underline">Historial</a>).</li>
          </ul>
        </section>

        <section id="editor" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>El editor</h2>
          <p className="mb-4" style={muted}>
            El editor es una lista vertical de pasos, de arriba hacia abajo. No hay que conectar
            nodos con flechas: agregas cada paso desde el catálogo y lo ubicas donde quieras.
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={muted}>
            <li>• Agrega pasos desde el catálogo y reordénalos arrastrándolos.</li>
            <li>• Haz clic en un paso para configurarlo en el panel lateral.</li>
            <li>• Usa <strong>Condición Si/No</strong> para dividir el flujo en dos ramas.</li>
            <li>• Una misma automatización puede tener <strong>varios disparadores</strong>.</li>
            <li>
              • En los campos de texto puedes insertar variables con datos del contacto, del
              disparador o de pasos anteriores, por ejemplo <code>{"{{contact.phone}}"}</code> o{" "}
              <code>{"{{message.text}}"}</code>, e incluso un valor por defecto si el dato viene vacío:{" "}
              <code>{'{{contact.firstName | default:"amigo"}}'}</code>.
            </li>
          </ul>
          <p className="mb-2" style={muted}>Arriba del editor tienes estos botones:</p>
          <ul className="space-y-1 pl-4 mb-4" style={muted}>
            <li>• <strong>Ajustes</strong>: decide si un mismo contacto puede entrar varias veces. Por defecto hay solo una ejecución activa por contacto, y puedes fijar un tiempo de espera entre entradas.</li>
            <li>• <strong>Rendimiento</strong>: muestra sobre el flujo las métricas de ejecución: contactos que entraron, completados, fallidos, en espera, tasa de éxito y duración media.</li>
            <li>• <strong>Probar</strong>: simula la automatización (ver <a href="#create" className="underline">Crear una automatización</a>).</li>
            <li>• <strong>Historial</strong>: las ejecuciones de esta automatización.</li>
            <li>• <strong>Guardar borrador</strong> y <strong>Publicar</strong>.</li>
            <li>• Menú <strong>⋮</strong>: Pausar / Reanudar, Versiones (historial de versiones publicadas) y Guardar como plantilla.</li>
          </ul>
        </section>

        <section id="triggers" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Disparadores</h2>
          <p className="mb-4" style={muted}>
            El disparador es lo que pone a correr la automatización. Estos son los que puedes elegir:
          </p>
          <div className="space-y-3 mb-4">
            {[
              { type: "Mensaje entrante", icon: "📩", desc: "Cuando un cliente escribe por WhatsApp, Messenger o Instagram. Puedes filtrar por palabras clave.", example: "Responder con la lista de precios cuando alguien escribe \"precio\"." },
              { type: "Formulario enviado", icon: "📋", desc: "Cuando alguien envía uno de tus formularios de captación. Trae el contacto y sus respuestas.", example: "Crear un negocio y una tarea para el vendedor." },
              { type: "Webhook entrante", icon: "🔗", desc: "Cuando un sistema externo (tu tienda, una pasarela de pago, una agenda…) envía datos a la URL de la automatización. Puedes filtrar por un valor del contenido recibido.", example: "Crear el contacto cuando entra un pedido de tu tienda online." },
              { type: "Contacto creado", icon: "👤", desc: "Cuando se crea un contacto nuevo en el CRM.", example: "Enviar un correo de bienvenida." },
              { type: "Empresa creada", icon: "🏢", desc: "Cuando se crea una empresa nueva en el CRM.", example: "Crear una tarea para completar sus datos." },
              { type: "Cambio de estado de negocio", icon: "📊", desc: "Cuando un negocio cambia de etapa en el pipeline.", example: "Avisar al equipo cuando un negocio llega a Negociación." },
              { type: "Negocio estancado", icon: "🧊", desc: "Cuando un negocio abierto lleva varios días sin actividad. Se revisa una vez al día.", example: "Crear una tarea al dueño del negocio." },
              { type: "Le toca recomprar", icon: "🔁", desc: "Cuando a un cliente le toca volver a comprar según el ritmo de sus negocios ganados. Avisa unos días antes.", example: "Escribirle al cliente con una plantilla de WhatsApp." },
              { type: "Cotización creada / Cotización vista / Cotización cambia de estado", icon: "🧾", desc: "Cuando se crea una cotización, cuando el cliente la abre o cuando pasa a otro estado (enviada, aceptada, rechazada…).", example: "Llamar al cliente apenas abre la cotización." },
              { type: "Factura emitida / Factura vencida", icon: "💵", desc: "Cuando se emite una factura de venta, o cuando una factura a crédito pasa su vencimiento con saldo pendiente (se revisa una vez al día).", example: "Recordarle el pago al cliente." },
              { type: "Cambio de etapa de conversación", icon: "💬", desc: "Cuando una conversación pasa a otra etapa de su pipeline.", example: "Enviar el catálogo cuando la conversación llega a \"Cotizando\"." },
              { type: "Conversación estancada", icon: "⏳", desc: "Cuando una conversación lleva cierto número de horas en una etapa sin respuesta del cliente.", example: "Hacer seguimiento a las 24 horas." },
              { type: "Cita próxima", icon: "📅", desc: "Cuando falta cierto tiempo (minutos, horas o días, tú eliges) para una cita del calendario con un contacto.", example: "Enviar un recordatorio 24 horas antes." },
              { type: "Programado", icon: "⏰", desc: "A una hora fija o cada cierto tiempo: cada X minutos u horas, diario, semanal, mensual o con una expresión avanzada. Es recurrente: no hay opción de una sola fecha.", example: "Recibir cada lunes a las 8 a. m. el informe del equipo." },
              { type: "Una automatización falló", icon: "🚨", desc: "Cuando otra automatización de tu cuenta falla.", example: "Avisar al administrador por WhatsApp." },
            ].map((t) => (
              <div key={t.type} className="flex gap-4 p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <p className="font-semibold text-sm" style={fg}>{t.type}</p>
                  <p className="text-sm" style={muted}>{t.desc}</p>
                  <p className="text-xs mt-1" style={{ color: "#d1345b" }}>Ej: {t.example}</p>
                </div>
              </div>
            ))}
          </div>
          <Callout type="note">
            Las automatizaciones no se pueden ejecutar a mano: siempre arrancan por un disparador.
            Para ver qué haría con un contacto concreto usa <strong>Probar</strong>.
          </Callout>
          <p className="mt-4" style={muted}>
            Atajo: en el tablero de conversaciones, cada columna tiene un botón ⚡ que muestra las
            automatizaciones de esa etapa y te deja crear una nueva con el disparador ya configurado.
          </p>
        </section>

        <section id="actions" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Acciones disponibles</h2>
          {[
            {
              group: "Mensajería",
              items: [
                { action: "Responder al chat", desc: "Responde por el mismo canal del mensaje que disparó la automatización (WhatsApp, Instagram o Facebook)." },
                { action: "Enviar WhatsApp", desc: "Mensaje de texto libre. Solo llega si el cliente te escribió en las últimas 24 horas." },
                { action: "Enviar plantilla WhatsApp", desc: "Envía una plantilla aprobada por Meta. Úsala para escribir primero o pasadas las 24 horas." },
                { action: "Enviar botones de WhatsApp", desc: "Botones de respuesta rápida o una lista de opciones (dentro de las 24 horas)." },
                { action: "Enviar correo", desc: "Escribes el destinatario, el asunto y el contenido del correo." },
              ],
            },
            {
              group: "CRM",
              items: [
                { action: "Agregar etiqueta", desc: "Etiqueta la conversación." },
                { action: "Crear contacto", desc: "Crea el contacto con los datos del disparador. Si ya existe (mismo correo o celular), solo completa los campos vacíos." },
                { action: "Crear negocio", desc: "Crea un negocio en un pipeline, asociado al contacto." },
                { action: "Crear tarea", desc: "Crea una tarea para un asesor." },
                { action: "Informe de equipo", desc: "Envía por correo o WhatsApp el resumen de actividad del equipo o de un vendedor. Ideal con el disparador Programado." },
                { action: "Mover etapa de conversación", desc: "Mueve la conversación a otra etapa de su pipeline." },
              ],
            },
            {
              group: "Avanzado",
              items: [
                { action: "Condición Si/No", desc: "Divide el flujo en dos ramas según reglas." },
                { action: "Para cada elemento", desc: "Repite pasos por cada contacto de una lista o cada elemento de un dato (máximo 100)." },
                { action: "Esperar", desc: "Pausa el flujo un tiempo o hasta un momento." },
                { action: "Petición HTTP", desc: "Llama a cualquier API o webhook (GET, POST, PUT, PATCH o DELETE). Puede usar credenciales guardadas, que administra el propietario de la cuenta." },
              ],
            },
          ].map((g) => (
            <div key={g.group} className="mb-4">
              <p className="text-sm font-semibold mb-2" style={fg}>{g.group}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {g.items.map((a) => (
                  <div key={a.action} className="flex gap-2 p-3 rounded border text-sm" style={{ borderColor: "var(--border)" }}>
                    <span style={{ color: "#22c55e" }}>▸</span>
                    <div>
                      <span className="font-medium" style={fg}>{a.action}:</span>
                      <span className="ml-1" style={muted}>{a.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Crear una automatización</h2>
          <ol className="space-y-3 mb-4">
            {[
              { n: "1", t: "Ve a Planeación → Automatizaciones → Nueva Automatización", d: "También puedes partir de una plantilla (botón Plantillas) o usar Crear con IA." },
              { n: "2", t: "Elige el disparador", d: "El evento que pone a correr la automatización. Puedes agregar más de uno." },
              { n: "3", t: "Agrega los pasos", d: "Acciones, condiciones y esperas desde el catálogo. Configura cada uno en el panel lateral." },
              { n: "4", t: "Pruébala", d: "Pulsa Probar: eliges un contacto de prueba y puedes editar los datos del disparador. Por defecto todo se simula y nadie recibe nada; verás qué entra y qué sale en cada paso. Si activas \"Enviar de verdad\", solo salen los mensajes y correos dirigidos a tu propio número y correo, nunca al cliente. También puedes empezar la prueba desde un paso concreto." },
              { n: "5", t: "Publícala", d: "Pulsa Publicar: desde ahí empieza a correr. Si después haces cambios, quedan como borrador (Guardar borrador) hasta que vuelvas a publicar." },
              { n: "6", t: "Pausa cuando lo necesites", d: "Desde el menú ⋮ → Pausar. Con Reanudar vuelve a correr." },
            ].map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#d1345b" }}>{s.n}</span>
                <div>
                  <p className="font-medium text-sm" style={fg}>{s.t}</p>
                  <p className="text-sm" style={muted}>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <Callout type="warning">
            Publicar, pausar, reanudar, eliminar y guardar como plantilla solo lo puede hacer el
            propietario de la cuenta. Los demás usuarios pueden editar y guardar borradores.
          </Callout>
          <Callout type="tip">
            Si una automatización falla varias veces seguidas con el mismo error, se pausa sola y
            el editor te muestra el motivo. Corrige el paso en el historial y pulsa Reanudar.
          </Callout>
        </section>

        <section id="history" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Historial de ejecución</h2>
          <p className="mb-4" style={muted}>
            Cada vez que la automatización corre queda registrada. En <strong>Historial</strong> (dentro
            del editor) ves:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={muted}>
            <li>• Fecha y hora, disparador y contacto de cada ejecución.</li>
            <li>• El estado: En cola, En ejecución, Esperando, Exitosa, Con pasos fallidos, Fallida o Cancelada.</li>
            <li>• El detalle de cada paso y el mensaje de error si lo hubo.</li>
            <li>• <strong>Cancelar ejecución</strong> para detener una que está corriendo o esperando.</li>
            <li>• <strong>Reintentar desde el paso fallido</strong>, sin repetir lo que ya salió bien.</li>
          </ul>
          <p className="mb-4" style={muted}>
            Cancelar y reintentar también son exclusivos del propietario de la cuenta.
          </p>
          <p className="mb-4" style={muted}>
            En <strong>Automatizaciones → Ejecuciones</strong> ves las de toda la cuenta, con filtros por
            estado, automatización y fecha. Las pruebas no aparecen, a menos que marques{" "}
            <strong>Incluir pruebas</strong>.
          </p>
          <Callout type="tip">
            Revisa el historial después de las primeras ejecuciones para confirmar que la
            automatización hace lo que esperabas.
          </Callout>
        </section>

        <section id="examples" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Ejemplos prácticos</h2>
          <div className="space-y-4">
            {[
              {
                title: "Bienvenida a nuevo lead",
                trigger: "Contacto creado",
                actions: "Esperar 5 min → Enviar correo de bienvenida → Crear tarea \"Llamar al lead\" para el vendedor",
              },
              {
                title: "Seguimiento de cotización",
                trigger: "Cotización cambia de estado (a enviada)",
                actions: "Esperar 3 días → Condición Si/No: ¿sigue en el mismo estado? → Enviar plantilla WhatsApp de seguimiento",
              },
              {
                title: "Alerta de negocio en riesgo",
                trigger: "Negocio estancado (7 días sin actividad)",
                actions: "Crear tarea urgente de seguimiento para el vendedor → Enviar correo de aviso",
              },
              {
                title: "Recordatorio de cita",
                trigger: "Cita próxima (1 día antes)",
                actions: "Enviar plantilla WhatsApp de recordatorio al contacto",
              },
            ].map((ex) => (
              <div key={ex.title} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-bold mb-2" style={fg}>{ex.title}</p>
                <p className="text-xs mb-1" style={muted}>
                  <span style={{ color: "#8b5cf6" }}>DISPARADOR:</span> {ex.trigger}
                </p>
                <p className="text-xs" style={muted}>
                  <span style={{ color: "#22c55e" }}>ACCIONES:</span> {ex.actions}
                </p>
              </div>
            ))}
          </div>
        </section>

        <DocNav
          prev={{ href: "/docs/lead-scoring", title: "Lead Scoring" }}
          next={{ href: "/docs/agentes-ia", title: "Agentes IA" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
