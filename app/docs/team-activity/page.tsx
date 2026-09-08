import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Actividad del equipo: revisa qué hacen tus empleados" };

const toc = [
  { id: "overview", label: "Para qué sirve" },
  { id: "what-counts", label: "Qué se registra (y qué no)" },
  { id: "where", label: "Dónde se ve" },
  { id: "tabs", label: "Resumen, Rendimiento y Log" },
  { id: "report", label: "Informe automático por correo o WhatsApp" },
  { id: "privacy", label: "Privacidad y límites" },
];

export default function TeamActivityPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Actividad del equipo</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          «¿Qué está haciendo mi vendedor si el chat está vacío?» Esta vista responde eso con datos, no
          con suposiciones: cuántos mensajes envió cada persona, qué negocios movió, qué cotizaciones
          hizo y cuándo fue su última conexión. Y si prefieres no entrar a mirar, el CRM te manda el
          informe cada mañana a tu correo.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Para qué sirve</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Saber si el equipo está trabajando aunque no veas actividad en el chat: mucho del trabajo pasa en negocios, cotizaciones y contactos.</li>
            <li>• Comparar semanas: ¿esta semana se movió más o menos que la anterior? ¿Qué día rinde más?</li>
            <li>• Detectar silencios: un vendedor con cero acciones un martes es una conversación que hay que tener.</li>
            <li>• Tener el dato listo para la reunión semanal sin armar hojas de cálculo.</li>
          </ul>
          <Callout type="note">
            Los conteos son <strong>acciones registradas en el CRM</strong>, no ventas. Sirven para ver ritmo
            y constancia; el resultado comercial se mira en{" "}
            <Link href="/docs/deals" style={{ color: "var(--primary)" }}>Negocios</Link> e{" "}
            <Link href="/docs/products" style={{ color: "var(--primary)" }}>Informes</Link>.
          </Callout>
        </section>

        <section id="what-counts" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Qué se registra (y qué no)</h2>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>Cuenta lo que hace <strong style={{ color: "var(--foreground)" }}>una persona</strong> desde el CRM:</p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• <strong style={{ color: "var(--foreground)" }}>Mensajes enviados:</strong> WhatsApp (texto y plantillas) y correos escritos desde el CRM.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Negocios:</strong> creados, editados, movidos de etapa y eliminados.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Cotizaciones:</strong> creadas, editadas, enviadas y eliminadas.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Contactos y empresas:</strong> creados y editados.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Conversaciones:</strong> cambios de etapa o de pipeline hechos a mano.</li>
            <li>• <strong style={{ color: "var(--foreground)" }}>Accesos:</strong> inicios de sesión.</li>
          </ul>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}><strong style={{ color: "var(--foreground)" }}>No cuenta</strong>, a propósito:</p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Lo que hace el <Link href="/docs/agentes-ia" style={{ color: "var(--primary)" }}>agente de IA</Link> o una <Link href="/docs/workflows" style={{ color: "var(--primary)" }}>automatización</Link>: no es trabajo de nadie.</li>
            <li>• Los mensajes que <em>reciben</em>: solo se mide lo que la persona hace.</li>
            <li>• Las importaciones masivas de contactos: 3.000 filas no son 3.000 acciones.</li>
            <li>• Lo que entra por la API o los conectores de IA.</li>
          </ul>
          <Callout type="warning">
            Mensajes, negocios y cotizaciones se registran desde el <strong>8 de septiembre de 2026</strong>. Los días
            anteriores a esa fecha muestran cero en esas columnas aunque el trabajo haya existido; contactos,
            conversaciones y accesos sí tienen historial previo.
          </Callout>
        </section>

        <section id="where" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Dónde se ve</h2>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            En <strong style={{ color: "var(--foreground)" }}>Configuración → Usuarios</strong>, solo para el <strong style={{ color: "var(--foreground)" }}>propietario</strong> de la organización (los empleados no ven la actividad de sus compañeros):
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• La columna <strong style={{ color: "var(--foreground)" }}>Última actividad</strong> de cada usuario. El punto verde significa que usó el CRM hace menos de 10 minutos; al pasar el mouse ves la fecha exacta y cuántos dispositivos tienen sesión abierta.</li>
            <li>• El icono de <strong style={{ color: "var(--foreground)" }}>historial</strong> al final de cada fila abre la actividad de esa persona.</li>
            <li>• El botón <strong style={{ color: "var(--foreground)" }}>Actividad del equipo</strong> abre la vista de todo el equipo. Arriba puedes cambiar de usuario y de periodo (hoy, 7 días, 30 días o un rango a mano, hasta 92 días).</li>
          </ul>
        </section>

        <section id="tabs" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Resumen, Rendimiento y Log</h2>
          <ul className="space-y-3 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>
              • <strong style={{ color: "var(--foreground)" }}>Resumen:</strong> si está en línea, su última conexión, y una tarjeta por categoría
              (mensajes, negocios, cotizaciones, contactos, conversaciones, accesos). Debajo, las acciones por
              día del periodo, con los días en cero incluidos: el ritmo se ve en los huecos. Un clic en una
              tarjeta abre el Log ya filtrado.
            </li>
            <li>
              • <strong style={{ color: "var(--foreground)" }}>Rendimiento:</strong> la comparación. Por día o por semana, con el total, el promedio,
              el mejor día y los mensajes, cada uno con el cambio frente al periodo inmediatamente anterior de la
              misma duración (<em>+18 %</em>, <em>−15 %</em>). La tabla desglosa cada día o semana por categoría; la
              mejor fila queda resaltada. Para comparar semanas, usa el periodo de 30 días.
            </li>
            <li>
              • <strong style={{ color: "var(--foreground)" }}>Log:</strong> la lista acción por acción — fecha y hora, quién, qué hizo y el detalle
              («Envió un mensaje · Carlos Ruiz · “Claro, te envío la cotización”», «Movió un negocio de etapa ·
              Festival 2026 · Cotizado → Negociación · $ 3.400.000»). Filtra por categoría con los chips y carga
              más hacia atrás.
            </li>
          </ul>
        </section>

        <section id="report" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Informe automático por correo o WhatsApp</h2>
          <p className="mb-3" style={{ color: "var(--muted-foreground)" }}>
            No hace falta entrar a mirar. En <Link href="/docs/workflows" style={{ color: "var(--primary)" }}>Automatizaciones</Link> hay
            una acción <strong style={{ color: "var(--foreground)" }}>Informe de equipo</strong> que arma este mismo resumen y te lo envía:
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>1. Automatizaciones → <em>Nueva</em>. Disparador <strong style={{ color: "var(--foreground)" }}>Programado</strong>; para el informe diario, <code>0 7 * * *</code> (todos los días a las 7:00 a. m.); para el semanal, <code>0 7 * * 1</code> (lunes a las 7:00).</li>
            <li>2. Añade el paso <strong style={{ color: "var(--foreground)" }}>Informe de equipo</strong> (categoría CRM).</li>
            <li>3. Elige <em>Equipo completo</em> (totales y desglose por vendedor) o <em>Un vendedor</em>; el periodo (<em>Ayer</em> para el diario, <em>Últimos 7 días</em> para el semanal); el canal, y el destino. Opcionalmente un título.</li>
            <li>4. Publica. Con <em>Probar ahora</em> en el disparador lo recibes en el acto para ver cómo llega.</li>
          </ol>
          <Callout type="tip">
            Por <strong>correo</strong> llega la tabla completa, con el cambio frente al periodo anterior y una fila por
            vendedor con su última conexión. Es el canal recomendado.
          </Callout>
          <Callout type="warning">
            Por <strong>WhatsApp</strong> llega un texto resumido, pero Meta solo permite enviar texto libre a un número
            que le haya escrito al WhatsApp del negocio en las últimas 24 horas. Para un informe automático a tu
            celular eso rara vez se cumple: si no llega, usa correo.
          </Callout>
        </section>

        <section id="privacy" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Privacidad y límites</h2>
          <ul className="space-y-2 pl-4 mb-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Solo el propietario ve esta información. Un empleado ve la columna vacía y no tiene el botón.</li>
            <li>• Aquí no se muestran la IP ni el dispositivo de cada acceso; eso vive en <Link href="/docs/settings#security" style={{ color: "var(--primary)" }}>Seguridad</Link>.</li>
            <li>• «Última actividad» mide la última vez que su navegador o app habló con el CRM (una pestaña abierta cuenta), no si estaba escribiendo. Para saber qué hizo, mira el Log.</li>
            <li>• No hay presencia en tiempo real ni «está escribiendo», a propósito: el objetivo es ver el trabajo hecho, no vigilar la pantalla.</li>
            <li>• Si eliminas a un usuario, su historial se conserva a su nombre: puedes seguir viendo qué hizo antes de irse.</li>
            <li>• El rango máximo de consulta es de 92 días. El detalle de mensajes enviados se conserva 180 días; el mensaje completo sigue en la conversación.</li>
          </ul>
        </section>

        <DocNav
          prev={{ href: "/docs/settings", title: "Configuración" }}
          next={{ href: "/docs/api", title: "API REST" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
