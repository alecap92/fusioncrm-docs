import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Páginas de aterrizaje (landing pages)" };

const toc = [
  { id: "overview", label: "Para qué sirven" },
  { id: "create", label: "Crear una página en 10 minutos" },
  { id: "blocks", label: "Los 8 bloques" },
  { id: "whatsapp", label: "WhatsApp y formulario" },
  { id: "publish", label: "Publicar y compartir" },
  { id: "stats", label: "Estadísticas" },
  { id: "tracking", label: "Pixel de Meta y GA4", depth: 3 },
  { id: "plans", label: "Planes, dominio y datos personales" },
];

const codeBox = { backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" } as const;

export default function LandingPagesPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Páginas de aterrizaje</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Arma una página pública para tus anuncios sin diseñador ni WordPress: eliges una plantilla,
          pones tu logo, tu color y tus textos, y la publicas en un link listo para Meta Ads, Google Ads o
          la bio de Instagram. Convierte a <strong style={{ color: "var(--foreground)" }}>WhatsApp</strong> o a un{" "}
          <Link href="/docs/forms" style={{ color: "var(--primary)" }}>formulario</Link>, y el CRM te dice
          cuánta gente la vio, cuántos escribieron y cuántos compraron.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Para qué sirven</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Página de un producto o servicio para una campaña puntual («Manillas para eventos», «Promo de septiembre»).</li>
            <li>• Registro a un evento o lanzamiento con fecha, lugar y preguntas frecuentes.</li>
            <li>• Recurso descargable (catálogo, lista de precios) a cambio de los datos del visitante.</li>
            <li>• Reemplazo del link a WhatsApp «pelado» en los anuncios: la página explica, genera confianza y mide.</li>
          </ul>
          <p style={{ color: "var(--muted-foreground)" }}>
            Viven en <strong style={{ color: "var(--foreground)" }}>Comunicación → Páginas</strong>. No es un
            constructor libre: es una lista ordenada de bloques con textos editables, para que cualquiera la
            arme en minutos y siempre se vea bien en celular.
          </p>
        </section>

        <section id="create" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Crear una página en 10 minutos</h2>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Páginas → <em>Nueva página</em>. Elige una plantilla: <strong style={{ color: "var(--foreground)" }}>Captación</strong>, <strong style={{ color: "var(--foreground)" }}>Cotización de producto</strong>, <strong style={{ color: "var(--foreground)" }}>Evento</strong>, <strong style={{ color: "var(--foreground)" }}>Recurso descargable</strong> o <strong style={{ color: "var(--foreground)" }}>En blanco</strong>. Todas traen textos de ejemplo en español.</li>
            <li>2. Ponle nombre (define el link, que puedes cambiar después) y elige el formulario que irá dentro: uno que ya tengas o uno rápido con nombre, correo y celular.</li>
            <li>3. En <em>Contenido</em>, activa, ordena y edita cada bloque. A la derecha ves la página real tal como la verá el cliente, en escritorio o celular; se actualiza sola con cada cambio (se guarda cada 2 segundos).</li>
            <li>4. En <em>Diseño</em>, color principal, acento, tipografía y logo. En <em>SEO y seguimiento</em>, título y descripción para Google y WhatsApp, número de WhatsApp y, si quieres, tu Pixel de Meta o GA4.</li>
            <li>5. En <em>Compartir</em>, <em>Publicar</em>. Copia el link, descarga el QR o prueba el envío del formulario sin ensuciar tus estadísticas.</li>
          </ol>
          <Callout type="tip">
            Sube las fotos desde el editor: se redimensionan a 1600 px y se convierten a WebP solas. El
            indicador de «peso de la página» te avisa si pasas de 1,5 MB, el límite a partir del cual la página
            carga lento en un celular con datos.
          </Callout>
        </section>

        <section id="blocks" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Los 8 bloques</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Portada:</strong> título, promesa principal, imagen (al lado o de fondo) y el botón que más importa (WhatsApp, formulario o un link).</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Por qué comprarte a ti:</strong> hasta 6 razones con ícono, título y una frase.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Cuéntalo con tus palabras:</strong> párrafos libres; solo texto y <code>**negrita**</code>, a propósito.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Muestra tu producto:</strong> hasta 8 fotos con pie y precio opcional.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Lo que dicen tus clientes:</strong> hasta 6 testimonios con nombre y cargo.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Preguntas frecuentes:</strong> hasta 10, desplegables.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Háblame por WhatsApp:</strong> una franja con el botón al chat.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Déjame tus datos:</strong> tu formulario de captación, dentro de la página (uno por página).</li>
          </ul>
          <p style={{ color: "var(--muted-foreground)" }}>
            Puedes apagar un bloque sin borrarlo y volver a la versión publicada si te arrepientes de un
            cambio. Todo lo que escribes se muestra como texto: no hay forma de meter HTML ni scripts, así
            nadie rompe la página.
          </p>
        </section>

        <section id="whatsapp" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>WhatsApp y formulario</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Todos los botones de WhatsApp abren el chat con tu número (el de la página o, si no lo defines,
            el de tu organización) y un mensaje prellenado con el nombre de la página, para que sepas de
            dónde viene cada conversación. Hay un botón flotante siempre visible, como en las tiendas
            online; se puede apagar.
          </p>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            El formulario se pinta dentro de la página y llega al mismo receptor de{" "}
            <Link href="/docs/forms#submit" style={{ color: "var(--primary)" }}>Formularios</Link>: el contacto
            se crea o actualiza sin duplicarlo, con la campaña de origen y el nombre de la página en su
            ficha; si el formulario crea negocio, avisa o dispara automatizaciones, todo eso también aplica.
            Tras enviar, el visitante ve un mensaje de gracias con la opción de seguir por WhatsApp.
          </p>
        </section>

        <section id="publish" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Publicar y compartir</h2>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            Cada página tiene su link en <code>forms.fusioncol.com/p/&lt;slug&gt;</code>. Mientras es
            borrador, el link responde «no publicada»; puedes mostrársela a un colega con el link de vista
            previa privada. Al publicar:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Agrega <code>?utm_source=meta_ads&amp;utm_campaign=…</code> al link que pegas en cada anuncio para ver en Estadísticas qué fuente convierte.</li>
            <li>• El <strong style={{ color: "var(--foreground)" }}>código QR</strong> ya trae <code>utm_source=qr</code>: sirve para empaques, volantes y el mostrador.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Probar mi página</strong> abre la versión de prueba: el formulario envía de verdad (crea el contacto) pero no suma a las estadísticas.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Exportar HTML</strong> descarga la página completa para alojarla donde quieras; el formulario sigue funcionando.</li>
            <li>• Cambiar el slug rompe el link anterior; hazlo antes de lanzar la campaña.</li>
          </ul>
          <div className="rounded-lg p-4 mb-4" style={codeBox}>
            <pre className="text-sm overflow-x-auto" style={{ color: "var(--foreground)" }}>{`https://forms.fusioncol.com/p/manillas-para-eventos?utm_source=meta_ads&utm_campaign=eventos-sep`}</pre>
          </div>
        </section>

        <section id="stats" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Estadísticas</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La medición es propia del CRM, no depende de Google Analytics ni del pixel. En la pestaña
            <em> Estadísticas</em> ves, por día y por rango:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Vistas, visitantes únicos y sesiones.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Dos conversiones</strong>: envíos del formulario ÷ únicos y clics a WhatsApp ÷ únicos.</li>
            <li>• Embudo por sesión: vieron la página → leyeron la mitad → tocaron un botón → enviaron o abrieron WhatsApp → <strong style={{ color: "var(--foreground)" }}>compraron</strong> (un negocio atribuido a la página que pasa a ganado, con su monto).</li>
            <li>• De dónde llegan (<code>utm_source</code>), en qué dispositivo, y qué botón tocan más (portada, franja de WhatsApp, botón flotante, gracias).</li>
            <li>• Últimas respuestas del formulario con link al contacto, y la tabla de eventos recientes con exportación a CSV. El CSV y el dashboard salen de la misma tabla, así que siempre cuadran.</li>
          </ul>
          <Callout type="note">
            Las vistas previas del editor, el modo prueba y los bots (Google, el rastreador de WhatsApp
            al generar la miniatura del link) no cuentan.
          </Callout>

          <h3 id="tracking" className="text-lg font-semibold mb-2 mt-6" style={{ color: "var(--foreground)" }}>Pixel de Meta y GA4</h3>
          <p style={{ color: "var(--muted-foreground)" }}>
            Opcional. Pega el ID de tu Pixel (15 o 16 dígitos) o de tu propiedad de GA4 (<code>G-…</code>) en
            «SEO y seguimiento». La página dispara <code>PageView</code> al cargar, <code>Lead</code> al enviar
            el formulario y <code>Contact</code> al tocar WhatsApp, así Meta y Google optimizan tus anuncios con
            conversiones reales. Es tu pixel en tu página; nosotros nunca inyectamos scripts propios.
          </p>
        </section>

        <section id="plans" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Planes, dominio y datos personales</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Free:</strong> 1 página, con el crédito «Página creada con FusionCRM» en el pie. <strong style={{ color: "var(--foreground)" }}>Pro:</strong> 5 páginas y el crédito se puede quitar. <strong style={{ color: "var(--foreground)" }}>Unlimited:</strong> sin tope.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Dominio propio</strong> (<code>promos.tuempresa.com</code>): próximamente. En Compartir hay un botón «Avísenme» para que sepamos a quién le urge.</li>
            <li>• Toda página lleva en el pie un enlace a la política de tratamiento de datos: la tuya si la configuras, o la de FusionCRM señalándote como Responsable si no. También un enlace para reportar la página.</li>
            <li>• La IP del visitante nunca se guarda en claro; el log de eventos se borra a los 90 días, el resumen diario se conserva.</li>
          </ul>
        </section>

        <DocNav
          prev={{ href: "/docs/forms", title: "Formularios web" }}
          next={{ href: "/docs/deals", title: "Deals" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
