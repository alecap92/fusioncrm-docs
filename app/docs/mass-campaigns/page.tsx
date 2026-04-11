import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Campañas Masivas" };

const toc = [
  { id: "overview", label: "¿Qué son las campañas?" },
  { id: "email-campaign", label: "Campaña de email masivo" },
  { id: "whatsapp", label: "Campaña WhatsApp masivo" },
  { id: "segmentation", label: "Segmentación de audiencia" },
  { id: "metrics", label: "Métricas de campaña" },
  { id: "best-practices", label: "Buenas prácticas" },
];

export default function MassCampaignsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Campañas Masivas</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          FusionCRM permite enviar campañas de email y WhatsApp masivos a segmentos de contactos,
          con seguimiento de métricas de apertura, clics y respuestas.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>¿Qué son las campañas?</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las campañas masivas son envíos de mensajes a múltiples contactos simultáneamente.
            FusionCRM ofrece dos tipos:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg border" style={{ borderColor: "#3b82f6", backgroundColor: "rgba(59,130,246,0.06)" }}>
              <p className="font-bold mb-2" style={{ color: "#2563eb" }}>📧 Email Masivo</p>
              <ul className="text-sm space-y-1" style={{ color: "var(--muted-foreground)" }}>
                <li>• HTML o texto plano</li>
                <li>• Personalización con variables</li>
                <li>• Seguimiento de aperturas y clics</li>
                <li>• Gestión de bajas (unsubscribe)</li>
                <li>• Programación de envío</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border" style={{ borderColor: "#25D366", backgroundColor: "rgba(37,211,102,0.06)" }}>
              <p className="font-bold mb-2" style={{ color: "#16a34a" }}>💬 WhatsApp Masivo</p>
              <ul className="text-sm space-y-1" style={{ color: "var(--muted-foreground)" }}>
                <li>• Solo templates aprobados</li>
                <li>• Variables personalizadas por contacto</li>
                <li>• Respuestas gestionadas en conversaciones</li>
                <li>• Límites según calidad del número</li>
                <li>• Envío programado</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="email-campaign" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Campaña de email masivo</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para crear y enviar una campaña de email masivo:
          </p>
          <ol className="space-y-3 mb-6">
            {[
              { n: "1", t: "Ve a Campañas → Email masivo", d: "Accede desde la barra lateral." },
              { n: "2", t: "Crea nueva campaña", d: "Haz clic en \"+ Nueva campaña\" y asigna un nombre interno." },
              { n: "3", t: "Define el asunto y el remitente", d: "El asunto es lo que verá el destinatario. Elige la cuenta de email remitente." },
              { n: "4", t: "Diseña el contenido", d: "Usa el editor visual HTML o pega tu HTML directamente. Incluye variables como {{nombre}}." },
              { n: "5", t: "Selecciona la audiencia", d: "Elige una lista de contactos o define filtros de segmentación." },
              { n: "6", t: "Prueba de envío", d: "Envíate una prueba a tu email personal para verificar el diseño." },
              { n: "7", t: "Programa o envía", d: "Envía inmediatamente o programa para una fecha y hora específica." },
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
          <Callout type="note">
            FusionCRM maneja automáticamente las solicitudes de baja (unsubscribe). Los contactos
            que se den de baja no recibirán futuras campañas de email. Puedes ver la lista de bajas
            en Campañas → Bajas.
          </Callout>
        </section>

        <section id="whatsapp" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Campaña WhatsApp masivo</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El envío masivo de WhatsApp usa templates aprobados para contactar múltiples personas.
          </p>
          <ol className="space-y-3 mb-6">
            {[
              { n: "1", t: "Ve a Campañas → WhatsApp masivo", d: "Desde la barra lateral." },
              { n: "2", t: "Crea nueva campaña", d: "Nombre interno para identificar la campaña." },
              { n: "3", t: "Selecciona el template", d: "Solo templates con estado APPROVED están disponibles." },
              { n: "4", t: "Define las variables", d: "Para cada variable del template, indica si se tomará del campo del contacto o es un valor fijo." },
              { n: "5", t: "Selecciona los contactos", d: "Lista de contactos o filtros. Solo se envía a contactos con número de WhatsApp." },
              { n: "6", t: "Envía o programa", d: "Inicia el envío inmediatamente o en un horario específico." },
            ].map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#25D366" }}>{s.n}</span>
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{s.t}</p>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <Callout type="warning">
            Los mensajes masivos de WhatsApp pueden afectar la calificación de calidad de tu número
            si los destinatarios los reportan como spam. Asegúrate de enviar solo a contactos que
            hayan dado su consentimiento.
          </Callout>
        </section>

        <section id="segmentation" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Segmentación de audiencia</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La segmentación correcta es clave para el éxito de las campañas. FusionCRM ofrece:
          </p>
          <div className="space-y-3 mb-4">
            {[
              { method: "Listas estáticas", desc: "Grupos de contactos creados manualmente. Ideal para audiencias definidas y estables." },
              { method: "Filtros dinámicos", desc: "Segmenta al momento del envío basándote en criterios como ciudad, empresa, campo personalizado, lead score." },
              { method: "Todos los contactos", desc: "Envía a toda la base de datos. Úsalo con precaución." },
            ].map((m) => (
              <div key={m.method} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{m.method}</p>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="metrics" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Métricas de campaña</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Después de enviar una campaña, puedes ver las siguientes métricas:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {[
              { metric: "Enviados", desc: "Total de mensajes enviados" },
              { metric: "Entregados", desc: "Llegaron al destinatario" },
              { metric: "Abiertos", desc: "Email: píxel de seguimiento. WhatsApp: ticks azules" },
              { metric: "Clics", desc: "Clicks en enlaces (solo email)" },
              { metric: "Respuestas", desc: "Destinatarios que respondieron" },
              { metric: "Bajas", desc: "Desuscripciones (solo email)" },
            ].map((m) => (
              <div key={m.metric} className="p-3 rounded-lg border text-center" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{m.metric}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="best-practices" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Buenas prácticas</h2>
          <div className="space-y-3">
            {[
              { tip: "Segmenta antes de enviar", detail: "Un mensaje relevante para un segmento pequeño tiene mejor rendimiento que un mensaje genérico para toda la base." },
              { tip: "Prueba el asunto", detail: "El asunto determina si el email se abre. Prueba diferentes versiones antes del envío masivo." },
              { tip: "Horario óptimo de envío", detail: "Martes a jueves, entre 9am-11am y 2pm-4pm tienen las mayores tasas de apertura." },
              { tip: "Frecuencia moderada", detail: "Envíos muy frecuentes aumentan las bajas y pueden dañar tu reputación de envío." },
              { tip: "Siempre incluye un CTA claro", detail: "¿Qué quieres que haga el destinatario? Un botón o enlace claro mejora la conversión." },
            ].map((b, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-lg" style={{ backgroundColor: "var(--muted)", border: "1px solid var(--border)" }}>
                <span style={{ color: "#22c55e" }}>✓</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{b.tip}</p>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{b.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <DocNav
          prev={{ href: "/docs/email", title: "Correo" }}
          next={{ href: "/docs/quotes", title: "Cotizaciones" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
