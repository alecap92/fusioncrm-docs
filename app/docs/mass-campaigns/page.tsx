import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Campañas masivas de WhatsApp y email",
  description:
    "Envía campañas masivas de WhatsApp con plantillas aprobadas y de email a segmentos de contactos, mide aperturas, clics y respuestas, y aplica buenas prácticas.",
  keywords: ["campañas masivas", "WhatsApp masivo", "email marketing", "plantillas de WhatsApp", "segmentación", "métricas de campaña"],
  alternates: { canonical: "/docs/mass-campaigns" },
  openGraph: {
    title: "Campañas masivas de WhatsApp y email",
    description:
      "Envía campañas masivas de WhatsApp con plantillas aprobadas y de email a segmentos de contactos, mide aperturas, clics y respuestas, y aplica buenas prácticas.",
    url: "/docs/mass-campaigns",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

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
                <li>• Editor visual de bloques</li>
                <li>• Seguimiento de aperturas y clics</li>
                <li>• Enlace de baja automático</li>
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
          <Callout type="note" title="Qué incluye cada plan">
            Las campañas masivas de WhatsApp vienen en los planes Pro y Empresarial, sin cupo mensual del
            plan (los topes de envío los pone Meta según la calidad de tu número). El plan Básico no puede
            crear, programar ni enviar campañas de WhatsApp; si bajas a Básico, tus campañas anteriores y
            sus resultados se siguen viendo. Correo masivo: 1.000 al mes en Básico, 10.000 en Pro y 50.000
            en Empresarial; si se agota, el envío se bloquea hasta el siguiente mes o hasta que subas de
            plan. Los correos de cotizaciones y las invitaciones del calendario no gastan ese cupo.
          </Callout>
        </section>

        <section id="email-campaign" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Campaña de email masivo</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para crear y enviar una campaña de email masivo:
          </p>
          <ol className="space-y-3 mb-6">
            {[
              { n: "1", t: "Ve a Comunicación → Email Marketing", d: "En el menú superior." },
              { n: "2", t: "Crea nueva campaña", d: "Pulsa \"Nueva Campaña\" y asigna un nombre interno." },
              { n: "3", t: "Escribe el asunto y el texto de vista previa", d: "El asunto es lo que verá el destinatario. El remitente no se elige aquí: se configura una sola vez en Ajustes → Envío masivo." },
              { n: "4", t: "Diseña el contenido", d: "Arma el correo con el editor de bloques que arrastras: Logo, Encabezado, Texto, 2 Columnas, Imagen, Separador, Botón, Espacio, Redes Sociales y Footer." },
              { n: "5", t: "Selecciona la lista de contactos", d: "Las campañas siempre van a una lista (ver Segmentación)." },
              { n: "6", t: "Programa y guarda", d: "Elige fecha y hora y pulsa \"Guardar Campaña\". Para enviarla ya, usa \"Enviar ahora\" en la lista de campañas." },
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
          <Callout type="warning">
            Por ahora los correos masivos no se personalizan por contacto: si escribes{" "}
            <code style={{ color: "#d1345b" }}>{"{{nombre}}"}</code> u otra variable, llegará tal cual.
            Tampoco hay envío de prueba; revisa bien la vista previa antes de enviar.
          </Callout>
          <Callout type="note">
            FusionCRM agrega solo el enlace para darse de baja. Los contactos que se dan de baja dejan
            de recibir campañas de correo, y lo verás en el perfil de cada uno.
          </Callout>
        </section>

        <section id="whatsapp" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Campaña WhatsApp masivo</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El envío masivo de WhatsApp usa templates aprobados para contactar múltiples personas.
          </p>
          <ol className="space-y-3 mb-6">
            {[
              { n: "1", t: "Ve a Comunicación → WhatsApp Masivo", d: "En el menú superior." },
              { n: "2", t: "Pulsa \"Nueva Campaña\"", d: "Ponle nombre y, si quieres, una descripción." },
              { n: "3", t: "Elige \"Enviar desde\" y la plantilla", d: "Si tienes varias líneas de WhatsApp, escoge por cuál número sale la campaña; se guarda con ella. Solo aparecen las plantillas aprobadas en esa línea. Si no tienes una, créala ahí mismo con \"Nueva plantilla\"." },
              { n: "4", t: "Define las variables", d: "Para cada variable, elige un campo del contacto o un texto fijo, y un valor por si el contacto no tiene ese dato." },
              { n: "5", t: "Elige la lista de contactos", d: "Una lista estática o dinámica. No le llega a quien no tiene celular, tiene un número fijo o inválido, pidió no ser contactado por WhatsApp o está marcado como número sin WhatsApp." },
              { n: "6", t: "Guarda o programa", d: "Al final elige \"Guardar como borrador\" o \"Programar envío\" (con la hora de tu navegador). Para enviarla ya, pulsa \"Enviar ahora\" en la lista de campañas: antes de confirmar verás a cuántos les llegará y por qué se excluye a los demás." },
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
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Una campaña programada se puede devolver a borrador con "Quitar programación". Una campaña
            ya enviada no se vuelve a enviar: para otro envío, crea una nueva.
          </p>
          <Callout type="note" title="Dónde caen las respuestas">
            Cada contacto sin chat abierto en esa línea recibe una conversación nueva, que nace en el
            pipeline de la línea (o en el predeterminado) en su primera columna. Si ya tenía un chat en
            esa línea, el mensaje entra ahí y el chat se queda en su columna. Ver{" "}
            <a href="/docs/conversation-pipelines" style={{ color: "#d1345b" }}>Pipelines de conversación</a>.
            Por API o MCP, el borrador acepta <code style={{ color: "#d1345b" }}>lineId</code> y el preflight
            dice si la plantilla existe y está aprobada en esa línea.
          </Callout>
          <Callout type="warning">
            Los mensajes masivos de WhatsApp pueden afectar la calificación de calidad de tu número
            si los destinatarios los reportan como spam. Asegúrate de enviar solo a contactos que
            hayan dado su consentimiento.
          </Callout>
        </section>

        <section id="segmentation" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Segmentación de audiencia</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las campañas de correo y de WhatsApp siempre se envían a una lista de contactos: en la
            campaña no hay filtros ni opción de "todos los contactos". Las listas se crean en{" "}
            <strong style={{ color: "var(--foreground)" }}>Contactos → Grupos y Listas</strong> y pueden ser:
          </p>
          <div className="space-y-3 mb-4">
            {[
              { method: "Listas estáticas", desc: "Eliges los contactos a mano. Ideal para audiencias definidas y estables." },
              { method: "Listas dinámicas", desc: "Se actualizan solas según los filtros que definas (ciudad, empresa, campos personalizados, puntuación…)." },
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
            En las campañas de correo, la lista muestra enviados, aperturas y clics. En las de WhatsApp,
            abre <strong style={{ color: "var(--foreground)" }}>"Resultados"</strong> de la campaña para ver, contacto por contacto:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {[
              { metric: "Aceptados", desc: "Meta recibió el mensaje para enviarlo" },
              { metric: "Entregados", desc: "Llegaron al teléfono" },
              { metric: "Leídos", desc: "El contacto abrió el mensaje" },
              { metric: "Respondieron", desc: "El contacto contestó" },
              { metric: "Fallidos", desc: "Meta no pudo entregarlo" },
              { metric: "Omitidos", desc: "Sin celular, número fijo o pidió no ser contactado" },
            ].map((m) => (
              <div key={m.metric} className="p-3 rounded-lg border text-center" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{m.metric}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Desde la tabla de Resultados puedes usar "Marcar como número sin WhatsApp" en los números que
            fallan, para que las próximas campañas no los intenten.
          </p>
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
