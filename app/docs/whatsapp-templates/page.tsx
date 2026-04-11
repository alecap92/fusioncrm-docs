import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Templates WhatsApp" };

const toc = [
  { id: "overview", label: "¿Qué son los templates?" },
  { id: "create", label: "Crear template" },
  { id: "variables", label: "Variables y parámetros" },
  { id: "categories", label: "Categorías de templates" },
  { id: "approval", label: "Proceso de aprobación" },
  { id: "mass-send", label: "Envío masivo" },
  { id: "tips", label: "Consejos de redacción" },
];

export default function WhatsAppTemplatesPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Templates WhatsApp</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Los templates (plantillas) de WhatsApp son mensajes preaprobados por Meta que permiten
          iniciar conversaciones proactivas o enviar mensajes masivos a contactos.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>¿Qué son los templates?</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Según las políticas de WhatsApp Business API, solo puedes enviar mensajes libres a
            un contacto dentro de las primeras 24 horas después de su último mensaje. Para
            contactarlos fuera de esta ventana, debes usar un template aprobado por Meta.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg border" style={{ backgroundColor: "rgba(34,197,94,0.08)", borderColor: "#22c55e" }}>
              <p className="font-semibold text-sm mb-2" style={{ color: "#16a34a" }}>✓ Templates permiten:</p>
              <ul className="space-y-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <li>• Iniciar conversaciones (outbound)</li>
                <li>• Envíos masivos a listas</li>
                <li>• Recordatorios y notificaciones</li>
                <li>• Retomar conversaciones cerradas</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border" style={{ backgroundColor: "rgba(239,68,68,0.08)", borderColor: "#ef4444" }}>
              <p className="font-semibold text-sm mb-2" style={{ color: "#dc2626" }}>✗ Templates NO son para:</p>
              <ul className="space-y-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <li>• Publicidad engañosa</li>
                <li>• Mensajes spam o no solicitados</li>
                <li>• Contenido prohibido por Meta</li>
                <li>• Mensajes dentro de la ventana 24h</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear template</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para crear un template en FusionCRM:
          </p>
          <ol className="space-y-3 mb-6">
            {[
              { n: "1", t: "Ve a Templates WhatsApp", d: "En la barra lateral, haz clic en el módulo de Templates." },
              { n: "2", t: "Clic en \"+ Nuevo template\"", d: "Botón en la esquina superior derecha." },
              { n: "3", t: "Elige la categoría", d: "Selecciona entre Marketing, Utilidad o Autenticación." },
              { n: "4", t: "Selecciona el idioma", d: "Español (es), Inglés (en) u otro. Puedes tener el mismo template en varios idiomas." },
              { n: "5", t: "Escribe el contenido", d: "Redacta el cuerpo del mensaje. Usa {{1}}, {{2}} para variables dinámicas." },
              { n: "6", t: "Agrega header y footer (opcional)", d: "El header puede ser texto, imagen o documento. El footer es texto pequeño." },
              { n: "7", t: "Envía para aprobación", d: "Meta revisará el template en 24-72 horas." },
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
          <div className="rounded-lg p-4 border mb-4" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>Ejemplo de template:</p>
            <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: "var(--code-bg)", borderLeft: "3px solid #25D366" }}>
              <p style={{ color: "var(--foreground)" }}>
                Hola <span style={{ color: "#d1345b" }}>{"{{1}}"}</span>, te escribimos de{" "}
                <span style={{ color: "#d1345b" }}>{"{{2}}"}</span> para recordarte tu cita del día{" "}
                <span style={{ color: "#d1345b" }}>{"{{3}}"}</span> a las{" "}
                <span style={{ color: "#d1345b" }}>{"{{4}}"}</span>. ¿Confirmas tu asistencia?
              </p>
            </div>
          </div>
        </section>

        <section id="variables" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Variables y parámetros</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Las variables se definen con la notación <code style={{ color: "#d1345b" }}>{"{{número}}"}</code> y
            se reemplazan con valores reales al enviar el mensaje.
          </p>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#1f2a48", color: "white" }}>Variables disponibles en FusionCRM</div>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Variable template</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Valor automático</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Ejemplo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["{{1}} – Nombre", "Nombre del contacto", "Juan"],
                  ["{{2}} – Empresa", "Empresa del contacto", "Mi Empresa S.A."],
                  ["{{3}} – Fecha", "Fecha actual o especificada", "15 de enero de 2025"],
                  ["{{4}} – Hora", "Hora especificada", "2:00 PM"],
                  ["{{n}} – Personalizado", "Valor ingresado manualmente", "cualquier texto"],
                ].map(([v, a, e]) => (
                  <tr key={v}>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{v}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{a}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="categories" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Categorías de templates</h2>
          <div className="space-y-4">
            {[
              { cat: "Marketing", color: "#f59e0b", desc: "Promociones, ofertas, anuncios de nuevos productos, contenido de valor.", examples: "\"¡Nueva colección disponible! Descuento del 20% hasta el viernes.\"" },
              { cat: "Utilidad", color: "#3b82f6", desc: "Confirmaciones, actualizaciones de estado, recordatorios, información transaccional.", examples: "\"Tu pedido #1234 ha sido despachado. Seguimiento: ...\"" },
              { cat: "Autenticación", color: "#8b5cf6", desc: "Códigos de verificación, contraseñas temporales, confirmación de identidad.", examples: "\"Tu código de verificación es 847291. Válido por 10 minutos.\"" },
            ].map((c) => (
              <div key={c.cat} className="p-4 rounded-lg border" style={{ borderColor: c.color, backgroundColor: `${c.color}10` }}>
                <p className="font-bold mb-1" style={{ color: c.color }}>{c.cat}</p>
                <p className="text-sm mb-2" style={{ color: "var(--muted-foreground)" }}>{c.desc}</p>
                <p className="text-xs italic" style={{ color: "var(--foreground)" }}>Ejemplo: {c.examples}</p>
              </div>
            ))}
          </div>
          <Callout type="warning">
            Categorizar incorrectamente el template puede resultar en rechazo por parte de Meta.
            Los templates de Marketing tienen mayor costo por mensaje enviado que los de Utilidad.
          </Callout>
        </section>

        <section id="approval" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Proceso de aprobación</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Meta revisa todos los templates antes de aprobarlos. Los posibles estados son:
          </p>
          <div className="space-y-2 mb-4">
            {[
              { status: "PENDING", color: "#f59e0b", desc: "En revisión por Meta (24-72h normalmente)" },
              { status: "APPROVED", color: "#22c55e", desc: "Aprobado y listo para usar" },
              { status: "REJECTED", color: "#ef4444", desc: "Rechazado. Revisa el motivo y corrige el contenido." },
              { status: "PAUSED", color: "#6b7280", desc: "Pausado temporalmente por Meta por baja calidad." },
            ].map((s) => (
              <div key={s.status} className="flex items-center gap-3 p-3 rounded border" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs font-bold px-2 py-1 rounded font-mono" style={{ backgroundColor: s.color, color: "white" }}>{s.status}</span>
                <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.desc}</span>
              </div>
            ))}
          </div>
          <Callout type="tip">
            Si tu template es rechazado, puedes editarlo y volver a enviarlo para aprobación.
            Lee cuidadosamente el motivo del rechazo — generalmente indica qué parte del texto
            no cumple las políticas de Meta.
          </Callout>
        </section>

        <section id="mass-send" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Envío masivo</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para enviar un template a múltiples contactos simultáneamente, usa el módulo de
            <strong style={{ color: "var(--foreground)" }}> Campañas → WhatsApp masivo</strong>.
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Ve a Campañas → WhatsApp masivo</li>
            <li>2. Crea una nueva campaña y asigna un nombre</li>
            <li>3. Selecciona el template aprobado a enviar</li>
            <li>4. Escoge el segmento o lista de contactos destinatarios</li>
            <li>5. Completa las variables del template para los contactos</li>
            <li>6. Programa la campaña o envía inmediatamente</li>
          </ol>
          <Callout type="warning">
            WhatsApp tiene límites de envío según el nivel de calificación de tu número.
            Comienza con volúmenes bajos (menos de 1,000 mensajes/día) y aumenta gradualmente
            para mantener una buena calificación de calidad.
          </Callout>
        </section>

        <section id="tips" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Consejos de redacción</h2>
          <div className="space-y-3">
            {[
              "Sé conciso: Los mejores templates tienen 2-3 oraciones. El usuario no leerá textos largos.",
              "Personaliza con variables: Usar el nombre del destinatario aumenta las tasas de respuesta.",
              "Un CTA claro: Termina siempre con una acción específica (\"Responde SÍ para confirmar\").",
              "Evita mayúsculas excesivas y signos de exclamación repetidos: Meta los considera spam.",
              "No incluyas URLs acortadas ni números de teléfono externos: Son causas comunes de rechazo.",
              "Prueba antes de enviar masivo: Envíate el template a ti mismo para verificar que las variables se ven bien.",
            ].map((tip, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg" style={{ backgroundColor: "var(--muted)", border: "1px solid var(--border)" }}>
                <span className="text-lg">💡</span>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <DocNav
          prev={{ href: "/docs/conversations", title: "Conversaciones" }}
          next={{ href: "/docs/email", title: "Correo" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
