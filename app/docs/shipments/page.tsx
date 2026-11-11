import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Envíos y guías con Envia.com",
  description:
    "Despacha pedidos desde el CRM con tu cuenta de Envia.com: compara tarifas de varias transportadoras, genera la guía, imprime la etiqueta y rastrea cada envío.",
  keywords: ["envíos", "guías de envío", "Envia.com", "transportadoras", "rastreo de envíos", "etiquetas"],
  alternates: { canonical: "/docs/shipments" },
  openGraph: {
    title: "Envíos y guías con Envia.com",
    description:
      "Despacha pedidos desde el CRM con tu cuenta de Envia.com: compara tarifas de varias transportadoras, genera la guía, imprime la etiqueta y rastrea cada envío.",
    url: "/docs/shipments",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "Qué puedes hacer" },
  { id: "setup", label: "Antes de empezar" },
  { id: "quote", label: "Cotizar y generar una guía" },
  { id: "statuses", label: "Estados del envío" },
  { id: "actions", label: "Rastrear, etiqueta y cancelar" },
  { id: "settings", label: "Configuración → Envíos" },
  { id: "labels", label: "Etiquetas y rótulos" },
  { id: "errors", label: "Errores comunes" },
  { id: "api", label: "Por API" },
];

const fg = { color: "var(--foreground)" };
const muted = { color: "var(--muted-foreground)" };
const link = { color: "#d1345b" };
const border = { borderColor: "var(--border)" };

const statuses: [string, string][] = [
  ["Borrador", "Se intentó generar la guía y no salió (por ejemplo, por falta de saldo). No tiene número de guía ni se cobró."],
  ["Guía creada", "La guía existe y ya se cobró. La transportadora todavía no ha recogido el paquete. Es el único estado en el que puedes cancelar."],
  ["Recogido", "La transportadora ya tiene el paquete."],
  ["En tránsito", "El paquete va en camino a la ciudad de destino."],
  ["En reparto", "Salió a entregarse al cliente."],
  ["Entregado", "El cliente lo recibió. Estado final."],
  ["Entrega fallida", "La transportadora intentó entregar y no pudo. Puede volver a intentarlo."],
  ["Reclamar en oficina", "El paquete espera al cliente en una oficina de la transportadora."],
  ["Error de dirección", "La transportadora reporta un problema con la dirección. Llama al cliente y confírmala."],
  ["Novedad", "La transportadora reportó un problema que hay que revisar."],
  ["Devuelto", "El paquete volvió a ti. Estado final."],
  ["Extraviado", "La transportadora lo reporta como perdido. Estado final."],
  ["Cancelado", "Cancelaste la guía antes de que la recogieran. Estado final."],
];

const commonErrors: [string, string, string][] = [
  [
    "Saldo insuficiente en Envia.com",
    "Tu cuenta de Envia no tiene saldo para pagar la guía. No se generó nada.",
    "Recarga saldo en Envia.com y pulsa Reintentar. Lo que llenaste se conserva, no tienes que empezar de nuevo.",
  ],
  [
    "Falta la dirección de origen",
    "No has guardado desde dónde despachas.",
    "Ve a Configuración → Envíos, llena la Dirección de origen y pulsa Guardar origen.",
  ],
  [
    "Envia.com no está conectado",
    "No hay API key de Envia.com en Integraciones.",
    "Pégala en Configuración → Desarrollador → Integraciones (proveedor Envia.com).",
  ],
  [
    "Revisa la ciudad del destino",
    "La ciudad del cliente no coincide con un municipio o hay varios con ese nombre.",
    "El asistente te devuelve al paso Destino con sugerencias: elige el municipio correcto y sigue. Si quieres que no vuelva a pasar, corrige la ciudad en la ficha del contacto.",
  ],
  [
    "Transportadoras sin cobertura o que no respondieron",
    "Al cotizar, algunas transportadoras no cubren esa ruta o no contestaron a tiempo. Las demás tarifas sí aparecen.",
    "Elige entre las que sí cotizaron. Si ninguna aparece («Ninguna transportadora cotizó esta ruta con estas medidas»), revisa peso, medidas y ciudad, y pulsa Volver a cotizar.",
  ],
  [
    "Envia.com no generó la guía",
    "La transportadora o Envia rechazaron la guía en ese momento.",
    "Lee el mensaje y pulsa Reintentar. Reintentar no cobra dos veces la misma guía.",
  ],
  [
    "Faltan datos fiscales del destinatario",
    "El contacto no tiene completos los datos fiscales que se exigen para despachar.",
    "Pulsa Completar datos en el aviso rojo del asistente, llénalos y vuelve a Generar. Cotizar sí funciona sin ellos.",
  ],
];

export default function ShipmentsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={fg}>Envíos</h1>
        <p className="text-lg mb-8" style={muted}>
          Despacha tus pedidos sin salir del CRM: desde la ficha de un cliente comparas las tarifas de
          varias transportadoras, generas la guía, abres la etiqueta para pegarla en la caja y sigues
          el paquete hasta que llega. Todo funciona con tu propia cuenta de{" "}
          <strong style={fg}>Envia.com</strong>, que es quien conecta con las transportadoras.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Qué puedes hacer</h2>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• <strong style={fg}>Cotizar:</strong> ves el precio total y el tiempo de entrega de cada transportadora para ese destino y ese paquete, ordenados por <strong style={fg}>Más barata</strong> o <strong style={fg}>Más rápida</strong>.</li>
            <li>• <strong style={fg}>Generar la guía:</strong> con un clic queda creada en la transportadora y el valor se descuenta de tu saldo de Envia.com.</li>
            <li>• <strong style={fg}>Agregar extras:</strong> seguro, contra entrega (si el servicio lo permite) y recogida en tu dirección.</li>
            <li>• <strong style={fg}>Imprimir la etiqueta</strong> oficial de la transportadora, en PDF o para impresora térmica.</li>
            <li>• <strong style={fg}>Rastrear</strong> el paquete y avisarle al cliente con el número de guía.</li>
            <li>• <strong style={fg}>Tener el historial</strong> de envíos de cada cliente en su ficha, y verlos también en su pestaña <strong style={fg}>Actividad</strong>.</li>
          </ul>
          <Callout type="note" title="Incluido en Pro y Empresarial">
            Envíos viene incluido, sin costo aparte, en los planes Pro y Empresarial. Las guías se pagan
            con el saldo de tu propia cuenta de Envia.com. Con el plan Básico no verás la pestaña Envíos
            en los contactos ni la sección Configuración → Envíos. Compara los planes en{" "}
            <Link href="/docs/settings#plan" style={link}>Plan y facturación</Link>. El rol
            Contador no ve Envíos.
          </Callout>
        </section>

        <section id="setup" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Antes de empezar</h2>
          <p className="mb-4" style={muted}>Necesitas tres cosas, en este orden:</p>
          <ol className="space-y-2 pl-4 mb-4" style={muted}>
            <li>1. <strong style={fg}>Una cuenta en Envia.com con saldo.</strong> Cada guía se paga con ese saldo, así que recárgalo antes de despachar.</li>
            <li>2. <strong style={fg}>Conectar la cuenta.</strong> En <strong style={fg}>Configuración → Desarrollador → Integraciones</strong> busca <strong style={fg}>Envia.com</strong> y pega tu <strong style={fg}>API Key (token de Envia.com)</strong>. Se guarda cifrada.</li>
            <li>3. <strong style={fg}>La dirección de origen.</strong> En <strong style={fg}>Configuración → Envíos</strong>, en la tarjeta <strong style={fg}>Dirección de origen</strong>, escribe desde dónde despachas: nombre de quien envía, teléfono, dirección y ciudad son obligatorios. El botón <strong style={fg}>Copiar de la organización</strong> te la llena con los datos de tu empresa; revísala y pulsa <strong style={fg}>Guardar origen</strong>.</li>
          </ol>
          <p className="mb-4" style={muted}>
            Mientras falte la API key o el origen, la pestaña Envíos te muestra un aviso con el botón
            para ir a configurarlo, y no aparece <strong style={fg}>Cotizar envío</strong>. Con el botón{" "}
            <strong style={fg}>Probar conexión</strong> de Configuración → Envíos verificas que la API key
            funciona.
          </p>
          <Callout type="tip">
            Antes del primer envío real, revisa el <strong>Entorno</strong> en Configuración → Envíos.
            En <strong>Sandbox (pruebas)</strong> las tarifas son simuladas y las guías no son reales; en{" "}
            <strong>Producción</strong> cada guía cobra saldo de verdad (ver{" "}
            <a href="#settings" style={link}>Configuración → Envíos</a>).
          </Callout>
        </section>

        <section id="quote" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Cotizar y generar una guía</h2>
          <p className="mb-4" style={muted}>
            Abre el contacto, ve a la pestaña <strong style={fg}>Envíos</strong> y pulsa{" "}
            <strong style={fg}>Cotizar envío</strong>. Se abre un asistente de cinco pasos:{" "}
            <strong style={fg}>Destino → Paquete → Cotizar → Extras → Generar</strong>. Avanzas con{" "}
            <strong style={fg}>Siguiente</strong> y regresas con <strong style={fg}>Atrás</strong> o tocando un
            paso ya completado.
          </p>

          <h3 className="text-lg font-semibold mb-3" style={fg}>1. Destino</h3>
          <p className="mb-4" style={muted}>
            Llega lleno con los datos del contacto. En <strong style={fg}>Quién recibe</strong> revisa{" "}
            <strong style={fg}>Nombre</strong> y <strong style={fg}>Teléfono</strong> (obligatorios) y el correo;
            en <strong style={fg}>Dónde entregar</strong>, la <strong style={fg}>Dirección</strong>, la{" "}
            <strong style={fg}>Ciudad</strong> y una <strong style={fg}>Referencia</strong> opcional (barrio, punto
            de referencia, horario de entrega).
          </p>
          <p className="mb-2" style={muted}>
            La ciudad tiene que quedar <strong style={fg}>confirmada</strong> contra la lista oficial de
            municipios de Colombia (DANE) para poder seguir. FusionCRM nunca elige un municipio
            «por parecido»:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• Si el contacto ya tiene la ciudad elegida de la lista, aparece confirmada («Tomada del contacto»).</li>
            <li>• Si la ciudad está escrita a mano, el sistema la busca. Si coincide con un solo municipio, queda confirmada; si se parece a uno, te pregunta «¿Te refieres a…?» con los botones <strong style={fg}>Sí, es esa</strong> y <strong style={fg}>No, buscar otra</strong>.</li>
            <li>• Si hay varios municipios con ese nombre (por ejemplo, Rionegro en Antioquia y en Santander) o no la reconoce, te muestra sugerencias y un buscador («Busca el municipio…») para que elijas.</li>
          </ul>
          <p className="mb-4" style={muted}>
            Para evitar este paso en el futuro, guarda la ciudad de tus clientes eligiéndola de la lista
            (ver <Link href="/docs/contacts#city" style={link}>Ciudad y departamento</Link>).
          </p>

          <h3 className="text-lg font-semibold mb-3" style={fg}>2. Paquete</h3>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• <strong style={fg}>Paquete predefinido:</strong> elige uno de los que guardaste en Configuración → Envíos, o <strong style={fg}>Medidas a mano</strong>. Si marcaste uno como predeterminado, viene seleccionado.</li>
            <li>• <strong style={fg}>Contenido</strong> (qué va en la caja) y <strong style={fg}>Cantidad</strong> de cajas iguales.</li>
            <li>• <strong style={fg}>Peso</strong> en kg y <strong style={fg}>Largo</strong>, <strong style={fg}>Ancho</strong> y <strong style={fg}>Alto</strong> en cm, por caja.</li>
            <li>• <strong style={fg}>Valor declarado</strong> (opcional), en pesos. Es la base del seguro si lo activas sin poner otro monto.</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3" style={fg}>3. Cotizar</h3>
          <p className="mb-4" style={muted}>
            FusionCRM consulta las transportadoras de tu cuenta de Envia.com y te muestra una tarjeta
            por cada servicio con el <strong style={fg}>precio total con impuestos</strong> y el tiempo
            estimado de entrega. Las etiquetas <strong style={fg}>Más barata</strong> y{" "}
            <strong style={fg}>Más rápida</strong> te ayudan a decidir, y puedes ordenar la lista por
            cualquiera de las dos. Elige una tarjeta y pulsa <strong style={fg}>Siguiente</strong>.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• Si un servicio dice <strong style={fg}>El cliente reclama en oficina</strong>, al elegirlo escoges en qué oficina recoge el cliente (la más cercana aparece primero). Esa oficina queda escrita en la guía.</li>
            <li>• Las transportadoras que no cubren la ruta o no respondieron aparecen plegadas al final de la lista; no impiden elegir entre las demás.</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3" style={fg}>4. Extras</h3>
          <p className="mb-4" style={muted}>
            Arriba ves la tarifa elegida. Cada extra que activas vuelve a cotizar, y si el precio cambia
            te muestra cuánto costaba antes.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• <strong style={fg}>Seguro:</strong> actívalo y escribe el <strong style={fg}>Monto a asegurar</strong>; si lo dejas vacío, se asegura el valor declarado del paquete. Si la transportadora no cobró seguro en esa tarifa, te avisa: puede que ese servicio no lo aplique.</li>
            <li>• <strong style={fg}>Contraentrega:</strong> la transportadora le cobra al cliente al entregar. Solo aparece si el servicio elegido la admite; escribe el <strong style={fg}>Monto a cobrar</strong>.</li>
            <li>• <strong style={fg}>Recogida:</strong> si la transportadora publica su horario de recogida, puedes pedir que pase por tu dirección de origen eligiendo <strong style={fg}>Fecha</strong>, <strong style={fg}>Desde</strong>, <strong style={fg}>Hasta</strong> e <strong style={fg}>Instrucciones</strong> (portería, por quién preguntar). Si no la publica, llevas el paquete a un punto de la transportadora.</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3" style={fg}>5. Generar</h3>
          <p className="mb-4" style={muted}>
            Ves un <strong style={fg}>Resumen</strong> con destino, paquete, servicio, extras, total y tu
            último saldo conocido de Envia. Para generar:
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={muted}>
            <li>1. Revisa bien el destino y el paquete: <strong style={fg}>la guía no se puede editar después</strong>.</li>
            <li>2. Marca la casilla <strong style={fg}>Esto cobra $… de tu saldo de Envia</strong>.</li>
            <li>3. Pulsa <strong style={fg}>Generar guía · $…</strong>.</li>
          </ol>
          <p className="mb-4" style={muted}>
            Al terminar aparece <strong style={fg}>Guía generada</strong> con el número de guía (y el botón{" "}
            <strong style={fg}>Copiar</strong>), el enlace <strong style={fg}>Abrir rastreo</strong>, lo{" "}
            <strong style={fg}>Cobrado</strong>, el <strong style={fg}>Saldo restante</strong> y el botón para abrir
            la etiqueta. El envío queda de primero en la pestaña Envíos del contacto.
          </p>
          <Callout type="warning">
            Una tarifa vale 10 minutos. Si te demoras más, el asistente la vuelve a consultar antes de
            dejarte confirmar, y el precio puede cambiar. Si se cae la conexión mientras generas,
            pulsa <strong>Reintentar</strong>: el sistema reconoce que es el mismo envío y no te cobra
            dos veces.
          </Callout>
        </section>

        <section id="statuses" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Estados del envío</h2>
          <p className="mb-4" style={muted}>
            La pestaña Envíos muestra cada envío con su transportadora, número de guía, estado, fecha y
            total. El estado se actualiza solo: con el webhook activo, Envia avisa cada cambio al
            momento; sin él, FusionCRM lo consulta cada 30 minutos.
          </p>
          <div className="rounded-lg overflow-hidden border mb-4" style={border}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ ...border, ...fg }}>Estado</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ ...border, ...fg }}>Qué significa</th>
                </tr>
              </thead>
              <tbody>
                {statuses.map(([label, desc]) => (
                  <tr key={label}>
                    <td className="p-3 border-b font-medium whitespace-nowrap" style={{ ...border, ...fg }}>{label}</td>
                    <td className="p-3 border-b" style={{ ...border, ...muted }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="actions" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Rastrear, etiqueta y cancelar</h2>
          <p className="mb-4" style={muted}>
            Cada envío tiene un menú <strong style={fg}>⋮</strong> con estas opciones. El número de guía de
            la lista también es un enlace a la página de rastreo de la transportadora.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• <strong style={fg}>Rastrear:</strong> abre el <strong style={fg}>Rastreo del envío</strong> con todos los movimientos, el más reciente arriba. El botón <strong style={fg}>Actualizar</strong> le pregunta a la transportadora el estado de ese momento (no está disponible en estados finales).</li>
            <li>• <strong style={fg}>Etiqueta:</strong> abre o descarga la etiqueta de la transportadora para imprimirla y pegarla en la caja (ver <a href="#labels" style={link}>Etiquetas y rótulos</a>).</li>
            <li>• <strong style={fg}>Copiar número de guía:</strong> copia un mensaje listo para pegar en el chat del cliente: «🚚 ¡Hemos realizado el envío de tu paquete! Puedes consultarlo en la transportadora … con el número de guía: …».</li>
            <li>• <strong style={fg}>Cancelar guía:</strong> solo aparece mientras el envío está en <strong style={fg}>Guía creada</strong>, es decir, antes de que la transportadora lo recoja. Te pide confirmar, porque no se puede deshacer.</li>
          </ul>
          <Callout type="note" title="¿Me devuelven el saldo si cancelo?">
            La devolución la hace Envia.com según sus condiciones. Si Envia informa el valor devuelto,
            el CRM te lo muestra al cancelar («Se devolvieron $… a tu saldo de Envia»). Si el envío
            cambió de estado mientras tanto, la cancelación no se hace y la lista se actualiza.
          </Callout>
        </section>

        <section id="settings" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Configuración → Envíos</h2>
          <p className="mb-4" style={muted}>
            Aquí defines cómo despachas. Para guardar cambios necesitas tener la cuenta de Envia.com
            conectada; un usuario de solo lectura puede ver esta pantalla pero no cambiarla.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={fg}>Cuenta y etiqueta</h3>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• <strong style={fg}>Conexión</strong> y <strong style={fg}>Saldo en Envia:</strong> el saldo aparece después de generar la primera guía, con la fecha de la última consulta.</li>
            <li>• <strong style={fg}>Entorno:</strong> <strong style={fg}>Sandbox (pruebas)</strong> usa tarifas simuladas y genera guías que no son reales, ideal para practicar. <strong style={fg}>Producción</strong> genera guías reales que <strong style={fg}>cobran saldo real</strong>.</li>
            <li>• <strong style={fg}>Formato de etiqueta:</strong> <strong style={fg}>PDF</strong> para una impresora normal o <strong style={fg}>ZPL (térmica)</strong> para impresoras térmicas Zebra. El tamaño es 4×6 pulgadas.</li>
            <li>• <strong style={fg}>Contenido por defecto:</strong> el texto que se propone como contenido del paquete al cotizar (por ejemplo, «Manillas de identificación»).</li>
          </ul>
          <p className="mb-4" style={muted}>Guarda estos tres con <strong style={fg}>Guardar preferencias</strong>.</p>
          <h3 className="text-lg font-semibold mb-3" style={fg}>Dirección de origen</h3>
          <p className="mb-4" style={muted}>
            Desde donde recoge la transportadora. Ver el paso 3 de{" "}
            <a href="#setup" style={link}>Antes de empezar</a>. Además de los obligatorios puedes poner
            empresa, correo, barrio, número o complemento, código postal, NIT o cédula (Envia lo
            recomienda para Colombia) y referencia.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={fg}>Paquetes predefinidos</h3>
          <p className="mb-4" style={muted}>
            Guarda las cajas que usas siempre («Caja mediana 30×20×10, 1 kg») para no escribir medidas
            en cada cotización. Créalas con <strong style={fg}>Nuevo paquete</strong>; con la estrella
            marcas la que se usa <strong style={fg}>Por defecto</strong>, y con el lápiz y la papelera la
            editas o eliminas. Eliminar un paquete no cambia los envíos ya generados.
          </p>
          <h3 className="text-lg font-semibold mb-3" style={fg}>Actualizaciones automáticas (webhook)</h3>
          <p className="mb-4" style={muted}>
            Pulsa <strong style={fg}>Registrar webhook</strong> para que Envia le avise al CRM cada cambio de
            estado de tus guías apenas ocurre. Sin él, el CRM igual las consulta cada 30 minutos. Si
            después de registrarlo aparece un aviso amarillo sobre el <strong style={fg}>secreto de firma</strong>,
            cópialo del panel de Envia (Desarrolladores → Webhooks), pégalo y pulsa{" "}
            <strong style={fg}>Guardar secreto</strong>: hasta entonces las actualizaciones automáticas no
            entran.
          </p>
        </section>

        <section id="labels" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Etiquetas y rótulos</h2>
          <p className="mb-4" style={muted}>Hay dos caminos, y sirven para cosas distintas:</p>
          <div className="grid gap-4 md:grid-cols-2 mb-4">
            <div className="rounded-lg border p-4" style={border}>
              <h3 className="font-semibold mb-2" style={fg}>Etiqueta de la transportadora</h3>
              <p className="text-sm" style={muted}>
                Sale sola al generar la guía con Envia.com. Lleva el código de barras y el número de
                guía que la transportadora necesita para mover el paquete: es la que va pegada en la
                caja. La abres con <strong style={fg}>Abrir etiqueta PDF</strong> (o{" "}
                <strong style={fg}>Descargar etiqueta (ZPL)</strong> si elegiste térmica) al terminar, o
                después desde <strong style={fg}>⋮ → Etiqueta</strong> en la pestaña Envíos. Requiere
                el módulo Envíos y cuesta lo que cobre la transportadora.
              </p>
            </div>
            <div className="rounded-lg border p-4" style={border}>
              <h3 className="font-semibold mb-2" style={fg}>Rótulo propio con plantilla PDF</h3>
              <p className="text-sm" style={muted}>
                Un rótulo con tu diseño (logo, remitente, destinatario, dirección, teléfono) que se
                llena con los datos del contacto. Lo imprimes desde la pestaña{" "}
                <strong style={fg}>Imprimir</strong> de la ficha. Sirve cuando despachas por tu cuenta
                (mensajero propio, transportadora en mostrador) o como rótulo adicional. No genera guía
                ni cobra nada. Mira cómo crear la plantilla en{" "}
                <Link href="/docs/settings#plantillas-pdf" style={link}>Plantillas PDF</Link>.
              </p>
            </div>
          </div>
          <Callout type="tip">
            Si la transportadora va a recoger o rastrear el paquete, usa siempre la etiqueta oficial.
            El rótulo propio no reemplaza la guía.
          </Callout>
        </section>

        <section id="errors" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Errores comunes</h2>
          <div className="rounded-lg overflow-hidden border mb-4" style={border}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ ...border, ...fg }}>Lo que ves</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ ...border, ...fg }}>Por qué pasa</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ ...border, ...fg }}>Qué hacer</th>
                </tr>
              </thead>
              <tbody>
                {commonErrors.map(([what, why, todo]) => (
                  <tr key={what}>
                    <td className="p-3 border-b font-medium align-top" style={{ ...border, ...fg }}>{what}</td>
                    <td className="p-3 border-b align-top" style={{ ...border, ...muted }}>{why}</td>
                    <td className="p-3 border-b align-top" style={{ ...border, ...muted }}>{todo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout type="warning" title="«Hay que revisar si la guía se generó»">
            Aparece cuando Envia no respondió a tiempo y no se sabe si alcanzó a crear la guía. Antes de
            volver a intentar, revisa la pestaña Envíos del contacto y tu panel de Envia.com: si la guía
            no está, marca <strong>Revisé el panel de Envia y no hay guía duplicada</strong> y pulsa{" "}
            <strong>Generar con una clave nueva</strong>. Si la guía sí está, cierra el asistente: no
            generes otra.
          </Callout>
        </section>

        <section id="api" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Por API</h2>
          <p className="mb-4" style={muted}>
            Si quieres cotizar y generar guías desde tu tienda, n8n o tu propio sistema, mira{" "}
            <Link href="/docs/envios" style={link}>Envíos por API (Envia.com)</Link>: endpoints, permisos,
            cómo evitar cobros dobles y la lista de errores. También puedes hacerlo desde una IA con el{" "}
            <Link href="/docs/mcp" style={link}>MCP</Link>.
          </p>
        </section>

        <DocNav
          prev={{ href: "/docs/products", title: "Productos" }}
          next={{ href: "/docs/reports", title: "Reportes" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
