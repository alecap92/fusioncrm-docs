import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Formularios web" };

const toc = [
  { id: "overview", label: "Para qué sirven" },
  { id: "create", label: "Crear un formulario" },
  { id: "share", label: "Tres formas de publicarlo" },
  { id: "link", label: "Link público", depth: 3 },
  { id: "embed", label: "Insertar en tu sitio", depth: 3 },
  { id: "webhook", label: "Conectar un formulario que ya tienes", depth: 3 },
  { id: "submit", label: "Qué pasa con cada envío" },
  { id: "after", label: "Después del envío" },
  { id: "spam", label: "Anti-spam y datos personales" },
];

const codeBox = { backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" } as const;

export default function FormsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Formularios web</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Captura leads desde tu sitio, una landing o un formulario que ya tengas. Cada envío crea o
          actualiza el contacto sin duplicados, registra de qué campaña vino y puede abrir un
          negocio, avisar al equipo y disparar automatizaciones.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Para qué sirven</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Formulario de contacto o cotización en tu web, sin depender de correos que se pierden.</li>
            <li>• Landing de una campaña: el lead llega con <code>utm_source</code>, <code>utm_campaign</code> y la página desde la que envió.</li>
            <li>• Suscripción a boletín con consentimiento de datos registrado.</li>
            <li>• Reemplazo de flujos de Zapier/n8n «formulario → CRM»: el receptor ya deduplica y enruta.</li>
          </ul>
          <p style={{ color: "var(--muted-foreground)" }}>
            Los formularios viven en el menú <strong style={{ color: "var(--foreground)" }}>Formularios</strong> de la app
            y son ilimitados en todos los planes.
          </p>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear un formulario</h2>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Formularios → <em>Nuevo formulario</em>. Nombre y slug (la parte de la URL).</li>
            <li>2. Agrega campos: cada campo se mapea a una propiedad del contacto (nombre, correo, celular, empresa o cualquier campo personalizado). Marca los obligatorios.</li>
            <li>3. Campos ocultos: valores fijos que viajan con cada envío (ej. <code>source</code>), sin que el visitante los vea.</li>
            <li>4. Apariencia: colores, texto del botón y mensaje o redirección al terminar.</li>
            <li>5. Guarda. En la pestaña <em>Compartir</em> tienes el link, el snippet y la URL de webhook.</li>
          </ol>
        </section>

        <section id="share" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Tres formas de publicarlo</h2>

          <h3 id="link" className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>Link público</h3>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Cada formulario tiene una página propia en <code>forms.fusioncol.com/f/&lt;slug&gt;</code>.
            Sirve para compartir por WhatsApp, redes o un código QR. Los parámetros{" "}
            <code>utm_*</code>, <code>gclid</code> y <code>fbclid</code> de la URL se conservan aunque el
            visitante navegue por varias páginas antes de enviar.
          </p>

          <h3 id="embed" className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>Insertar en tu sitio</h3>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Pega el snippet donde quieras que aparezca; carga el formulario en un iframe que ajusta
            su altura solo y funciona con WordPress, Webflow, Next.js o Google Tag Manager.
          </p>
          <div className="rounded-lg p-4 mb-4" style={codeBox}>
            <pre className="text-sm overflow-x-auto" style={{ color: "var(--foreground)" }}>{`<script src="https://forms.fusioncol.com/embed.js" data-form="contacto-web"></script>`}</pre>
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Al enviarse, el snippet publica el evento <code>fusioncol_form_submitted</code> en el{" "}
            <code>dataLayer</code>, listo para medir conversiones en Google Analytics o Ads.
          </p>

          <h3 id="webhook" className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>Conectar un formulario que ya tienes</h3>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Si tu sitio ya tiene un formulario (Elementor, Contact Form 7, un formulario propio en
            React), apúntalo a la URL de webhook del formulario. Lleva una clave pública que puedes
            regenerar cuando quieras:
          </p>
          <div className="rounded-lg p-4 mb-4" style={codeBox}>
            <pre className="text-sm overflow-x-auto" style={{ color: "var(--foreground)" }}>{`POST https://forms.fusioncol.com/api/v1/forms/submit/<formId>?key=fk_xxxxxxxx
Content-Type: application/json

{
  "nombre": "Ana Ejemplo",
  "email": "ana@example.com",
  "celular": "3000000000",
  "mensaje": "Necesito 500 manillas para el 20 de octubre",
  "utm_source": "google",
  "utm_campaign": "manillas-septiembre",
  "page_url": "https://tusitio.com/contacto"
}`}</pre>
          </div>
          <p style={{ color: "var(--muted-foreground)" }}>
            Las claves del JSON son las claves de los campos del formulario. Desde un servidor
            también puedes usar la <Link href="/docs/api" style={{ color: "#d1345b" }}>API</Link> con un
            token (<code>POST /forms/&#123;id&#125;/submit</code>) o el tool <code>submit_form</code> del{" "}
            <Link href="/docs/mcp" style={{ color: "#d1345b" }}>MCP</Link>.
          </p>
        </section>

        <section id="submit" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Qué pasa con cada envío</h2>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Se busca un contacto con el mismo correo o celular. Si existe, se completan <strong style={{ color: "var(--foreground)" }}>solo los campos vacíos</strong>: lo que un vendedor corrigió a mano nunca se pisa. Si no existe, se crea.</li>
            <li>2. Se guarda el origen: <code>source</code> (del <code>utm_source</code> o el que definas por defecto) y la atribución completa de primer contacto (campaña, medio, página). La atribución se escribe una sola vez.</li>
            <li>3. Se aplican las etiquetas y la lista de contactos que hayas configurado, y el dueño del contacto.</li>
            <li>4. Queda la respuesta completa en el historial del formulario y como evento «Formulario» en la línea de tiempo del contacto.</li>
          </ol>
        </section>

        <section id="after" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Después del envío</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Crear negocio:</strong> en el pipeline y etapa que elijas, con un título armado con los campos (<code>{"{{nombre}}"}</code>, <code>{"{{quantity}}"}</code>…) y el mismo dueño del contacto.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Avisar:</strong> notificación en la app y correo a las direcciones que definas.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Automatizar:</strong> el disparador <em>Formulario enviado</em> permite responderle al lead por correo o WhatsApp, crear una tarea o llamar a tu sistema por HTTP. Puede filtrarse por formulario y solo para contactos nuevos.</li>
          </ul>
          <Callout type="tip">
            Un flujo típico: formulario de cotización → negocio en «Lead» → correo automático al
            cliente con los próximos pasos → tarea para el asesor a las 2 horas si nadie respondió.
          </Callout>
        </section>

        <section id="spam" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Anti-spam y datos personales</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Sin CAPTCHA: un campo trampa invisible y el tiempo de llenado detectan bots. Los envíos sospechosos se aceptan (para no delatar el filtro) pero no crean contacto y se borran a los 30 días.</li>
            <li>• Puedes restringir desde qué dominios se acepta el formulario; un envío desde otro sitio queda marcado.</li>
            <li>• Casilla de consentimiento de tratamiento de datos con el texto que definas; la fecha, el texto y el formulario quedan registrados en el contacto (Ley 1581).</li>
            <li>• La IP del visitante nunca se guarda en claro.</li>
            <li>• Si borras un formulario se borran también sus respuestas; los contactos no.</li>
          </ul>
        </section>

        <DocNav
          prev={{ href: "/docs/companies", title: "Empresas" }}
          next={{ href: "/docs/landing-pages", title: "Páginas de aterrizaje" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
