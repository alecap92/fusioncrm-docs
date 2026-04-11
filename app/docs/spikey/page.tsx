import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Spikey AI" };

const toc = [
  { id: "overview", label: "¿Qué es Spikey?" },
  { id: "floating-chat", label: "Chat flotante" },
  { id: "capabilities", label: "Capacidades" },
  { id: "comments", label: "AI Comments" },
  { id: "scoring", label: "Lead Scoring AI" },
  { id: "conversation-analysis", label: "Análisis de conversaciones" },
  { id: "tips", label: "Cómo aprovechar Spikey" },
];

export default function SpikeyPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>Spikey AI</h1>
          <span className="text-xs px-2 py-1 rounded font-bold" style={{ backgroundColor: "#d1345b", color: "white" }}>IA</span>
        </div>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Spikey es el asistente de inteligencia artificial nativo de FusionCRM. Está integrado
          en toda la plataforma para ayudar al equipo a ser más productivo, tomar mejores
          decisiones y automatizar tareas cognitivas.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>¿Qué es Spikey?</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Spikey es un asistente conversacional potenciado por modelos de lenguaje de última
            generación (como GPT-4 o Claude) que tiene acceso al contexto de tu CRM: contactos,
            deals, conversaciones y datos históricos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "No es un chatbot genérico", desc: "Spikey conoce tu negocio: clientes, deals activos, historial de conversaciones.", icon: "🎯" },
              { title: "Accede a tus datos del CRM", desc: "Puede consultar información en tiempo real sin que salgas de la plataforma.", icon: "🔍" },
              { title: "Toma acciones", desc: "Puede crear tareas, buscar contactos, resumir conversaciones y más.", icon: "⚡" },
              { title: "Aprende del contexto", desc: "Mantiene el hilo de la conversación para respuestas más precisas.", icon: "🧠" },
            ].map((f) => (
              <div key={f.title} className="flex gap-3 p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{f.title}</p>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="floating-chat" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Chat flotante</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El chat flotante de Spikey está disponible en toda la aplicación como un botón en la
            esquina inferior derecha. Haz clic para abrir la ventana de chat y comenzar a
            interactuar con el asistente.
          </p>
          <div className="rounded-lg border p-4 mb-4" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Ejemplos de preguntas que puedes hacerle a Spikey:</p>
            <div className="space-y-2">
              {[
                "¿Cuántos deals tengo en etapa de Propuesta?",
                "Muéstrame los contactos de Bogotá sin actividad en los últimos 30 días",
                "¿Cuál fue el valor total de ventas cerradas este mes?",
                "Crea una tarea para llamar a Juan García mañana a las 10am",
                "Resume la última conversación con el cliente ABC S.A.S.",
                "¿Qué deals están próximos a vencer esta semana?",
                "¿Cuántos emails sin responder tengo en mi bandeja?",
                "Ayúdame a redactar un email de seguimiento para el deal con Empresa XYZ",
              ].map((q) => (
                <div key={q} className="flex gap-2 p-2 rounded text-sm" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
                  <span style={{ color: "#d1345b" }}>💬</span>
                  <em style={{ color: "var(--muted-foreground)" }}>&quot;{q}&quot;</em>
                </div>
              ))}
            </div>
          </div>
          <Callout type="tip">
            Spikey detecta palabras clave en tu texto para ofrecer sugerencias inteligentes.
            Por ejemplo, al escribir el nombre de un contacto, puede sugerir acciones relevantes
            para ese cliente.
          </Callout>
        </section>

        <section id="capabilities" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Capacidades</h2>
          <div className="space-y-4">
            {[
              {
                cat: "Consultas de datos",
                items: [
                  "Buscar contactos, deals, conversaciones",
                  "Generar resúmenes de actividad",
                  "Mostrar estadísticas y métricas",
                  "Comparar períodos de ventas",
                ],
              },
              {
                cat: "Acciones en el CRM",
                items: [
                  "Crear contactos y tareas",
                  "Actualizar campos de deals",
                  "Agregar notas a contactos",
                  "Programar actividades",
                ],
              },
              {
                cat: "Generación de contenido",
                items: [
                  "Redactar emails de ventas",
                  "Crear plantillas de mensajes",
                  "Resumir conversaciones largas",
                  "Traducir mensajes",
                ],
              },
              {
                cat: "Análisis e insights",
                items: [
                  "Identificar deals en riesgo",
                  "Sugerir próximas acciones",
                  "Analizar patrones de respuesta",
                  "Calificar leads con IA",
                ],
              },
            ].map((cat) => (
              <div key={cat.cat} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>{cat.cat}</p>
                <ul className="grid grid-cols-2 gap-1">
                  {cat.items.map((item) => (
                    <li key={item} className="text-sm flex gap-1" style={{ color: "var(--muted-foreground)" }}>
                      <span style={{ color: "#22c55e" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="comments" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>AI Comments</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los AI Comments son sugerencias inteligentes que Spikey genera automáticamente
            en el contexto de un deal o contacto. Aparecen como notas en el panel de actividades.
          </p>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>Ejemplos de AI Comments:</p>
          <div className="space-y-3 mb-4">
            {[
              { comment: "⚠️ Este deal lleva 8 días sin movimiento. Considera programar un follow-up.", context: "Deal en etapa Propuesta" },
              { comment: "💡 El cliente respondió positivamente a la demostración. Buen momento para hacer una propuesta de precio.", context: "Después de reunión registrada" },
              { comment: "📊 Este contacto tiene un lead score de 85/100. Prioridad alta para ventas.", context: "Perfil de contacto" },
            ].map((c) => (
              <div key={c.comment} className="p-4 rounded-lg border-l-4" style={{ backgroundColor: "rgba(209,52,91,0.06)", borderColor: "#d1345b" }}>
                <p className="text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>{c.comment}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Contexto: {c.context}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="scoring" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Lead Scoring AI</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Spikey complementa el sistema de Lead Scoring basado en reglas con un scoring
            adicional generado por IA que analiza patrones más complejos:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Análisis de sentimiento en conversaciones de WhatsApp y email</li>
            <li>• Detección de señales de compra en el lenguaje del cliente</li>
            <li>• Comparación con el perfil de clientes que han comprado anteriormente</li>
            <li>• Predicción de probabilidad de cierre basada en patrones históricos</li>
          </ul>
        </section>

        <section id="conversation-analysis" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Análisis de conversaciones</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Spikey puede analizar conversaciones largas de WhatsApp o email y:
          </p>
          <ul className="space-y-1 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Generar un resumen ejecutivo de la conversación</li>
            <li>• Extraer compromisos y próximas acciones mencionadas</li>
            <li>• Identificar objeciones o preocupaciones del cliente</li>
            <li>• Sugerir cómo responder a las objeciones</li>
            <li>• Detectar el tono emocional del cliente (satisfecho, frustrado, interesado)</li>
          </ul>
          <Callout type="tip">
            Para analizar una conversación específica, abre el chat y usa el botón "Analizar con
            Spikey" que aparece en el panel derecho, o pregúntale directamente al chat flotante:
            "Resume mi última conversación con [nombre del cliente]".
          </Callout>
        </section>

        <section id="tips" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Cómo aprovechar Spikey</h2>
          <div className="space-y-4">
            {[
              {
                tip: "Úsalo para empezar el día",
                detail: "Pregúntale: \"¿Cuáles son mis tareas pendientes hoy?\" o \"¿Qué deals necesitan atención urgente?\" para orientar tu jornada.",
              },
              {
                tip: "Delega la redacción de mensajes",
                detail: "Pídele que redacte el primer borrador de emails de seguimiento. Revisa y personaliza antes de enviar.",
              },
              {
                tip: "Prepárate para reuniones",
                detail: "Antes de una llamada con un cliente, pregunta: \"¿Qué sé sobre el cliente X y su historial con nosotros?\".",
              },
              {
                tip: "Úsalo para análisis rápidos",
                detail: "\"¿Cuáles fueron nuestros 5 productos más vendidos este trimestre?\" — obtén respuestas sin abrir reportes.",
              },
              {
                tip: "Combínalo con automatizaciones",
                detail: "Usa el análisis de Spikey para definir reglas de lead scoring o triggers de workflows más precisos.",
              },
            ].map((t) => (
              <div key={t.tip} className="flex gap-3 p-4 rounded-lg" style={{ backgroundColor: "var(--muted)", border: "1px solid var(--border)" }}>
                <span className="text-lg">🤖</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{t.tip}</p>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <Callout type="note">
            Las capacidades de Spikey dependen del plan contratado. Los planes superiores
            tienen mayor cuota de consultas mensuales y acceso a modelos de IA más potentes.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/integrations", title: "Integraciones" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
