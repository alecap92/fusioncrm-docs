import type { Metadata } from "next";
import type { ReactNode } from "react";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Contabilidad: comprobantes, conciliación bancaria, estados financieros y cierre del año",
  description:
    "Lleva la contabilidad de tu empresa en el CRM: comprobantes automáticos, recibos de caja y egresos, conciliación bancaria, inventario con costo promedio, libros, estados financieros, revisión del período y cierre del año.",
  keywords: ["contabilidad", "catálogo de cuentas", "PUC", "comprobantes contables", "recibo de caja", "comprobante de egreso", "balance de prueba", "auxiliar por tercero", "saldos iniciales", "importar desde Siigo", "conciliación bancaria", "extracto bancario", "transferencias entre cuentas", "balance general", "estado de resultados", "libro diario", "mayor y balances", "cierre del año", "inventario", "kardex", "costo promedio", "revisión contable", "registro de cambios"],
  alternates: { canonical: "/docs/contabilidad" },
  openGraph: {
    title: "Contabilidad: comprobantes, conciliación bancaria, estados financieros y cierre del año",
    description:
      "Lleva la contabilidad de tu empresa en el CRM: comprobantes automáticos, recibos de caja y egresos, conciliación bancaria, inventario con costo promedio, libros, estados financieros, revisión del período y cierre del año.",
    url: "/docs/contabilidad",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "Qué es" },
  { id: "menu", label: "Dónde está cada cosa" },
  { id: "activar", label: "Cómo se activa" },
  { id: "configurar", label: "Configura tu contabilidad" },
  { id: "ajustes-contabilidad", label: "Ajustes → Contabilidad" },
  { id: "documento-interno", label: "Documento interno de venta" },
  { id: "comprobantes", label: "Comprobantes" },
  { id: "documento-panel", label: "Contabilidad de un documento" },
  { id: "bancos-y-caja", label: "Bancos y caja" },
  { id: "transferencias", label: "Transferencias entre cuentas" },
  { id: "recibos-y-egresos", label: "Recibos de caja y egresos" },
  { id: "egreso-iva-y-compras", label: "Gasto con IVA en un egreso" },
  { id: "pdf-contables", label: "PDF de los comprobantes" },
  { id: "registrar-pago", label: "«Registrar pago» y compras" },
  { id: "gasto-sin-documento", label: "Gasto sin documento" },
  { id: "api-y-mcp", label: "Cobros por API y asistente" },
  { id: "conciliacion", label: "Conciliación bancaria" },
  { id: "inventario", label: "Inventario" },
  { id: "importar", label: "Importar desde otro software" },
  { id: "libros", label: "Libros" },
  { id: "diario-y-mayor", label: "Libro diario y mayor" },
  { id: "estados-financieros", label: "Estados financieros" },
  { id: "revision", label: "Revisión" },
  { id: "registro-de-cambios", label: "Registro de cambios" },
  { id: "impuestos", label: "Impuestos" },
  { id: "cierre-anual", label: "Cierre del año" },
  { id: "roles", label: "Quién puede hacer qué" },
  { id: "pendiente", label: "Lo que todavía no hay" },
];

const fg = { color: "var(--foreground)" };
const muted = { color: "var(--muted-foreground)" };
const link = { color: "#d1345b" };

function B({ children }: { children: ReactNode }) {
  return <strong style={fg}>{children}</strong>;
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-bold mb-4" style={fg}>{children}</h2>;
}

function H3({ id, children }: { id?: string; children: ReactNode }) {
  return <h3 id={id} className="text-lg font-semibold mb-3 mt-6" style={fg}>{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mb-4" style={muted}>{children}</p>;
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-4 mb-4" style={muted}>
      {items.map((item, i) => (
        <li key={i}>• {item}</li>
      ))}
    </ul>
  );
}

function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-2 pl-4 mb-4" style={muted}>
      {items.map((item, i) => (
        <li key={i}>{i + 1}. {item}</li>
      ))}
    </ol>
  );
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="rounded-lg overflow-x-auto border mb-4" style={{ borderColor: "var(--border)" }}>
      <table className="w-full text-sm">
        <thead style={{ backgroundColor: "var(--muted)" }}>
          <tr>
            {head.map((h) => (
              <th key={h} className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)", ...fg }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="p-3 border-b align-top"
                  style={{ borderColor: "var(--border)", color: j === 0 ? "var(--foreground)" : "var(--muted-foreground)" }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ContabilidadPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={fg}>Contabilidad</h1>
        <p className="text-lg mb-8" style={muted}>
          La contabilidad de FusionCRM convierte lo que ya haces (facturar, registrar compras, cobrar y pagar) en
          comprobantes contables y libros, sin digitar nada dos veces. Está pensada para que el dueño del negocio la
          entienda y su contador la pueda revisar.
        </p>

        <section id="overview" className="mb-10">
          <H2>Qué es</H2>
          <P>
            Cada factura, nota, compra, abono, recibo de caja y comprobante de egreso genera solo su comprobante
            contable. Con esos comprobantes se arman los libros (balance de prueba, auxiliares, libro diario y mayor
            y balances) y los estados financieros: el balance general y el estado de resultados. Tú y tu contador ven
            los mismos datos de dos maneras:
          </P>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Lenguaje llano", desc: "Para el dueño del negocio: cada movimiento con su fecha, de qué se trata, con quién fue, cuánto, y si la cuenta subió o bajó. Sin códigos ni columnas de débito y crédito.", color: "#14b8a6" },
              { title: "Débitos y créditos", desc: "Para el contador: tipo y número de cada comprobante, código de la cuenta, débito, crédito y saldo después de cada movimiento.", color: "#6366f1" },
            ].map((t) => (
              <div key={t.title} className="p-4 rounded-lg border" style={{ borderColor: t.color, backgroundColor: `${t.color}10` }}>
                <p className="font-bold" style={{ color: t.color }}>{t.title}</p>
                <p className="text-sm mt-1" style={muted}>{t.desc}</p>
              </div>
            ))}
          </div>
          <H3 id="menu">Dónde está cada cosa</H3>
          <P>
            El menú está organizado por tareas. Lo del día a día (cobrar, pagar y llevar el inventario) está en{" "}
            <B>Facturación</B>, junto a tus facturas y tus compras. Lo de quien lleva los libros está en{" "}
            <B>Contabilidad</B>.
          </P>
          <Table
            head={["Menú", "Grupo", "Qué encuentras"]}
            rows={[
              [<B key="b">Facturación</B>, "Cobros y pagos", "Recibos de caja, Egresos, Transferencias y Conciliación bancaria."],
              [<B key="b">Facturación</B>, "Inventario", <>Existencias y Ajustes de inventario. Aparece solo si tu empresa tiene el <a href="#inventario" style={link}>inventario</a> encendido.</>],
              [<B key="b">Contabilidad</B>, "Libros", "Comprobantes, Balance de prueba, Libro diario y Mayor y balances."],
              [<B key="b">Contabilidad</B>, "Estados y cierre", "Estados financieros, Revisión y Cierre del año."],
              [<B key="b">Contabilidad</B>, "Configuración", <>Catálogo de cuentas, Saldos iniciales y Ajustes de contabilidad, que te lleva a <a href="#ajustes-contabilidad" style={link}>Ajustes → Contabilidad</a>.</>],
            ]}
          />
          <Bullets
            items={[
              "Los demás grupos de Facturación (Ventas, Compras y gastos, Informes y Herramientas) siguen como siempre.",
              <>Con la vista en lenguaje llano, <B>Comprobantes</B> se llama <B>Movimientos</B> en el menú y en el título de la página. Es la misma pantalla.</>,
              <>Cada persona ve solo las entradas que su rol puede abrir: mira <a href="#roles" style={link}>quién puede hacer qué</a>.</>,
            ]}
          />
          <Callout type="note" title="No es lo mismo que el plan Contabilidad">
            El plan que se llama <strong>Contabilidad</strong> es el de{" "}
            <a href="/docs/invoices" style={link}>facturación electrónica</a>. Lo que explica esta página (comprobantes,
            recibos, egresos, conciliación, libros, estados financieros y cierre del año) funciona encima de esa
            facturación y se activa aparte, como se cuenta abajo.
          </Callout>
        </section>

        <section id="activar" className="mb-10">
          <H2>Cómo se activa</H2>
          <P>
            La contabilidad se enciende <B>empresa por empresa y a pedido</B>: no hay un botón para activarla desde tu
            cuenta. Escríbele a <a href="/docs/soporte" style={link}>soporte</a> y pide que la activen para tu empresa.
          </P>
          <P>
            Hay un requisito: tus <B>ventas y tus compras</B> deben estar en la facturación nueva de FusionCRM. Si tu
            empresa todavía usa la versión anterior, soporte programa primero ese cambio. Mientras tanto, todo lo
            demás sigue funcionando igual.
          </P>
          <P>Si entras a una pantalla de contabilidad antes de que esté lista, verás uno de estos mensajes:</P>
          <Table
            head={["Mensaje", "Qué significa"]}
            rows={[
              ["La contabilidad aún no está activada", "Todavía no se ha encendido para tu empresa. Pídeselo a soporte."],
              ["La contabilidad necesita la facturación nueva", "Tu empresa factura con la versión anterior. Soporte programa el cambio."],
              ["La contabilidad necesita también tus compras en la facturación nueva", "Tus ventas ya están en la facturación nueva, pero tus compras no. Sin ellas los libros quedarían sin gastos ni proveedores."],
              ["Contabilidad en preparación", "Ya puedes revisar el catálogo y las cuentas; los comprobantes y los libros se muestran cuando termine la validación."],
            ]}
          />
        </section>

        <section id="configurar" className="mb-10">
          <H2>Configura tu contabilidad</H2>
          <P>
            La contabilidad <B>funciona sin configurar</B>: las cuentas por defecto ya vienen puestas. Al activarla, al
            propietario y al contador les aparece la lista <B>«Configura tu contabilidad»</B>, con tres pasos que son
            de revisar, no de crear:
          </P>
          <Steps
            items={[
              "Revisa tu catálogo de cuentas.",
              "Revisa las cuentas por defecto.",
              "Asigna cuentas a tus conceptos.",
            ]}
          />
          <P>Todo lo que sigue lo configuran el propietario de la cuenta y el contador.</P>

          <H3 id="ajustes-contabilidad">Ajustes → Contabilidad, sección por sección</H3>
          <Table
            head={["Sección", "Qué tiene"]}
            rows={[
              [<B key="b">Resumen</B>, "Cómo está tu contabilidad, qué falta dejar listo y a dónde ir para hacerlo."],
              [<B key="b">Cuentas</B>, "Tres pestañas: Catálogo, Cuentas por defecto y Conceptos e ingresos."],
              [<B key="b">Bancos y caja</B>, "Tus cuentas de dinero, y el banco y la caja por defecto."],
              [<B key="b">Períodos y cierre</B>, "La fecha de cierre y «Saldos iniciales hasta»."],
              [<B key="b">Documentos y numeración</B>, "Dos pestañas: Documento interno (si tu empresa lo tiene activado) y Firmantes de los estados."],
              [<B key="b">Retenciones</B>, "La misma sección de retenciones que sin la contabilidad está en Ajustes → Facturación."],
              [<B key="b">Preferencias</B>, "La vista (tuya), el IVA de terceros y el tamaño del PDF de recibos y egresos."],
              [<B key="b">Importar desde otro software</B>, "El catálogo y los saldos iniciales desde Excel."],
            ]}
          />
          <P>
            Si tenías guardado un enlace a una sección con su nombre anterior (por ejemplo «Vista», «Opciones» o
            «Firmantes de los estados»), sigue funcionando: te lleva a su lugar nuevo.
          </P>

          <H3 id="resumen">Resumen</H3>
          <P>
            <B>Ajustes → Contabilidad → Resumen</B> es el punto de partida. También llegas desde el menú, con{" "}
            <B>Contabilidad → Ajustes de contabilidad</B>. Tiene tres bloques:
          </P>
          <Table
            head={["Bloque", "Qué muestra"]}
            rows={[
              [<B key="b">Estado</B>, "Tres datos: Contabilidad (Encendida, En preparación o Apagada), Libros (Activos o Todavía no) e Inventario (Encendido o Apagado), cada uno con una línea que lo explica."],
              [<B key="b">Qué falta configurar</B>, "Una lista con lo hecho y lo que falta: los tres pasos de «Configura tu contabilidad», «Crea tus bancos y cajas», «Elige el banco y la caja por defecto» y «Di hasta qué fecha van tus saldos iniciales». Cada renglón tiene su enlace «Ir» (si falta) o «Ver» (si ya está)."],
              [<B key="b">También aquí</B>, "Enlaces al Catálogo de cuentas, los Saldos iniciales, la Revisión del período, el Cierre del año e Importar desde otro software."],
            ]}
          />
          <P>
            El Resumen solo informa: ahí nada se enciende ni se apaga. La contabilidad funciona aunque la lista tenga
            pendientes; es para dejarla a tu medida.
          </P>

          <H3 id="catalogo">Catálogo de cuentas</H3>
          <P>
            Está en <B>Contabilidad → Catálogo de cuentas</B> y también en <B>Ajustes → Contabilidad → Cuentas</B>,
            pestaña <B>Catálogo</B>. El catálogo oficial tiene miles de cuentas; para no abrumarte, la lista tiene
            tres vistas:
          </P>
          <Table
            head={["Vista", "Qué muestra"]}
            rows={[
              ["De uso común", "Las que usa casi cualquier negocio, más las tuyas. Es la vista con la que abre."],
              ["Donde puedes registrar", "Las cuentas activas que reciben movimientos."],
              ["Todas", "El catálogo completo, incluidas las desactivadas."],
            ]}
          />
          <Bullets
            items={[
              <><B>Buscar las demás:</B> escribe el código o el nombre en «Buscar por código o nombre…». Si no aparece, prueba en la vista «Todas».</>,
              <><B>Activar o desactivar:</B> cada cuenta tiene su interruptor. Una cuenta desactivada no recibe movimientos.</>,
              <><B>Crear una cuenta propia:</B> usa <B>Nueva cuenta</B> (o «Crear una cuenta debajo» en la fila de otra). Una cuenta propia cuelga de una que ya existe: su código es el de esa cuenta más dos dígitos tuyos, de 6, 8, 10 o 12 dígitos en total. Por ejemplo, 11100501 cuelga de 111005.</>,
              <><B>Cambiar el nombre o eliminar:</B> solo en tus cuentas propias (llevan la etiqueta «Propia»). Se puede eliminar una cuenta que no se ha usado y no tiene cuentas debajo.</>,
              <>Las cuentas del catálogo oficial no se renombran ni se eliminan. Si no usas una, desactívala; si necesitas otro nombre, crea una cuenta propia debajo.</>,
              <>Solo se registran movimientos en subcuentas o auxiliares (6 dígitos o más). Las que dicen «Agrupa otras cuentas» sirven para sumar, no para registrar.</>,
            ]}
          />

          <H3 id="cuentas-por-defecto">Cuentas por defecto</H3>
          <P>
            En <B>Ajustes → Contabilidad → Cuentas</B>, pestaña <B>Cuentas por defecto</B>, ves la cuenta que se usa
            para cada cosa. Ya vienen puestas; cambia solo las que tu contador te pida. Están agrupadas así: dónde
            está la plata (caja y bancos), ventas, compras y gastos, inventario (lo que vale tu mercancía, lo que
            cuesta lo que vendes y los ajustes), IVA, retenciones que te hacen tus clientes, retenciones que les haces
            a tus proveedores y saldos iniciales.
          </P>
          <P>
            Cada fila dice si usa la cuenta «Por defecto» o una que tú cambiaste, y tiene la opción «Volver a la cuenta
            por defecto».
          </P>

          <H3 id="conceptos">Conceptos e ingresos</H3>
          <P>
            En <B>Ajustes → Contabilidad → Cuentas</B>, pestaña <B>Conceptos e ingresos</B>, decides a qué cuenta va
            lo que vendes y cada concepto de gasto (fletes, arriendo, honorarios…):
          </P>
          <Bullets
            items={[
              <><B>Ingresos:</B> a dónde va lo que vendes y lo que recibes por otros motivos.</>,
              <><B>Costos y gastos:</B> cada compra o gasto lleva un concepto; aquí eliges la cuenta de cada uno. Si no eliges, el concepto usa la cuenta de su grupo («La de su grupo»).</>,
              <>Los conceptos de gasto se crean al registrar tu primera compra o gasto; antes de eso la lista está vacía.</>,
            ]}
          />

          <H3 id="vista">Vista: «Ver débitos y créditos»</H3>
          <P>
            El interruptor <B>Ver débitos y créditos</B> está en <B>Ajustes → Contabilidad → Preferencias</B>, en el
            bloque <B>Vista</B>, y también en las pantallas de Comprobantes y del balance de prueba.
          </P>
          <Table
            head={["Interruptor", "Qué ves"]}
            rows={[
              ["Apagado (lenguaje llano)", "Cada movimiento con su fecha, de qué se trata, con quién fue y cuánto, y si aumenta o disminuye la cuenta. Sin códigos de cuenta ni columnas de débito y crédito."],
              ["Encendido (débitos y créditos)", "Además ves el tipo y el número de cada comprobante, el código de la cuenta, el débito, el crédito y el saldo después de cada movimiento."],
            ]}
          />
          <P>
            Los datos son los mismos en las dos vistas. La preferencia es <B>de cada usuario</B> y queda guardada con
            tu usuario: la encuentras igual en otro navegador o en otro computador, y no cambia lo que ven las demás
            personas de tu empresa.
          </P>

          <H3 id="periodos">Períodos y cierre (fecha de cierre)</H3>
          <P>
            En <B>Ajustes → Contabilidad → Períodos y cierre</B> cierras un período para que sus comprobantes ya no
            cambien. Lo usual es cerrar cuando tu contador ya presentó las declaraciones de ese período.
          </P>
          <Steps
            items={[
              <>En <B>Cerrar hasta el día</B>, elige la fecha. Puede ser cualquier día hasta ayer.</>,
              <>Haz clic en <B>Cerrar el período</B> (o <B>Cambiar la fecha de cierre</B> si ya había una).</>,
            ]}
          />
          <Callout type="tip" title="Antes de cerrar: la revisión del período">
            Cuando subes la fecha de cierre, encima del botón aparece el recuadro <strong>Revisión del período</strong>:
            el resultado de la <a href="#revision" style={link}>Revisión</a> para los días que vas a cerrar, con un
            renglón por control y el enlace «Ver la revisión completa». Es un aviso y no impide cerrar: la pantalla
            misma dice «puedes cerrarlo igual». Lo sano es resolver lo que esté «Para revisar» antes de cerrar.
          </Callout>
          <P>
            Cerrar un mes es eso: poner la fecha de cierre en el último día de ese mes. Para subir la fecha, los
            libros deben cuadrar hasta ese día. Si no cuadran, la pantalla te muestra los débitos y los créditos y un
            enlace al balance de prueba para que lo revises.
          </P>
          <P>Qué pasa al cerrar:</P>
          <Bullets
            items={[
              "Los comprobantes de esa fecha y de antes quedan como están: no se cambian ni se borran.",
              "Si después corriges o anulas una factura o una compra de esos días, la diferencia se registra con un ajuste nuevo, con fecha posterior al cierre.",
              "No se pueden registrar ni anular comprobantes manuales con esa fecha o una anterior.",
            ]}
          />
          <P>
            Con <B>Quitar la fecha de cierre</B>, los comprobantes de esos días vuelven a actualizarse solos y los
            ajustes que se hicieron por el cierre se deshacen.
          </P>
          <Bullets
            items={[
              <><B>Bajar la fecha o quitarla pide el motivo.</B> Aparece el campo <B>Motivo</B>, que queda guardado en el historial de la contabilidad. Subirla no lo pide.</>,
              <><B>Un año cerrado es el piso.</B> La fecha de cierre no puede quedar dentro de un año cerrado ni quitarse: primero hay que reabrir ese año en <a href="#cierre-anual" style={link}>Cierre del año</a>.</>,
              <>Un período cerrado y un año cerrado no son lo mismo: <a href="#fecha-de-cierre" style={link}>mira la diferencia</a>.</>,
            ]}
          />

          <H3 id="saldos-iniciales-hasta">«Saldos iniciales hasta»</H3>
          <P>
            En la misma sección está el bloque <B>Saldos iniciales hasta</B>. Úsalo si empezaste con saldos traídos de
            otro programa: dices hasta qué día van esos saldos, para que lo anterior no se contabilice otra vez.
          </P>
          <Bullets
            items={[
              "Lo de esa fecha y de antes no genera comprobante, porque ya está en tus saldos iniciales. Lo que tenga fecha posterior, sí.",
              "Normalmente es el día de corte de los saldos que importaste. Puede ser cualquier día hasta ayer.",
              "Sin esa fecha, todos los documentos y pagos generan comprobante.",
              <>Después de <a href="#importar" style={link}>importar los saldos iniciales</a>, la pantalla te ofrece el botón «Usar esta fecha como “saldos iniciales hasta”». Nunca se pone sola.</>,
            ]}
          />

          <H3 id="opciones">Preferencias: IVA de terceros y tamaño del PDF</H3>
          <P>
            En <B>Ajustes → Contabilidad → Preferencias</B>, el bloque <B>IVA de terceros</B> decide cómo se registran
            las ventas que haces por cuenta de otra persona o empresa (las líneas que marcas como «Ingreso para un
            tercero» al facturar): ¿de quién es el IVA de esa venta?
          </P>
          <Table
            head={["Opción", "Ejemplo: cobras $119.000 ($100.000 más $19.000 de IVA)"]}
            rows={[
              ["El IVA queda como IVA de tu empresa (viene así)", "$100.000 quedan como dinero del tercero y $19.000 como IVA que tu empresa le debe a la DIAN."],
              ["Todo queda como dinero del tercero", "Los $119.000 quedan como dinero del tercero. Tu empresa no lo declara como IVA propio."],
            ]}
          />
          <P>
            Si no estás seguro, pregúntale a tu contador. Al cambiarla, la contabilidad vuelve a revisar tus documentos
            en unos minutos; lo que esté en un período cerrado no cambia y la diferencia queda como un ajuste.
          </P>
          <P>
            En la misma sección, el bloque <B>Tamaño del PDF de recibos y egresos</B> decide en qué tamaño de hoja
            salen los recibos de caja y los comprobantes de egreso. Vale para toda la empresa y se confirma con{" "}
            <B>Guardar</B>.
          </P>
          <Table
            head={["Opción", "Cómo sale"]}
            rows={[
              ["Carta (viene así)", "Una hoja completa por recibo o egreso."],
              ["Media carta (vertical)", "La mitad de una hoja carta, con el mismo contenido: logo, saldos, valor en letras y firmas."],
            ]}
          />
          <P>
            Las facturas electrónicas, los estados financieros y los comprobantes contables siguen saliendo en carta.
          </P>

          <H3 id="firmantes">Firmantes de los estados</H3>
          <P>
            En <B>Ajustes → Contabilidad → Documentos y numeración</B>, pestaña <B>Firmantes de los estados</B>,
            escribes quién firma el balance general y el estado de resultados:
          </P>
          <Table
            head={["Firmante", "Datos"]}
            rows={[
              ["Representante legal", "Nombre completo y número de cédula."],
              ["Contador", "Nombre completo y número de tarjeta profesional."],
            ]}
          />
          <P>
            Todos los datos son opcionales. Los nombres salen al pie de los dos{" "}
            <a href="#estados-financieros" style={link}>estados financieros</a> en PDF, sobre la línea de cada firma.
            Si dejas un dato vacío, ese espacio sale en blanco para llenarlo a mano. Escribe solo los números: el PDF
            ya pone «C.C.» y «T.P.» delante.
          </P>
        </section>

        <section id="documento-interno" className="mb-10">
          <H2>Documento interno de venta</H2>
          <P>
            Un documento interno es una <B>venta que registras sin factura electrónica</B>: no se envía a la DIAN.
            Sirve para que esa venta también quede en tu cartera, en tus informes y en tu contabilidad.
          </P>
          <Callout type="warning" title="No reemplaza la factura electrónica">
            El documento interno no es una factura electrónica y no reemplaza la obligación de facturar
            electrónicamente. Úsalo solo para las ventas que no estás obligado a facturar de esa forma; si tienes dudas,
            pregúntale a tu contador.
          </Callout>
          <P>
            Se activa a pedido, igual que la contabilidad: si no ves la opción, pídele a soporte que la active para tu
            empresa.
          </P>
          <H3>Crear un documento interno</H3>
          <Steps
            items={[
              <>Ve a <B>Facturación → Facturas → «Nueva Factura»</B>.</>,
              <>Arriba, en el tipo de documento, elige <B>Documento interno</B> («Registro propio, no va a la DIAN») en lugar de «Factura electrónica» («Se envía a la DIAN»).</>,
              "Elige el cliente y agrega los ítems, igual que en una factura.",
              "Guarda. El documento recibe su número y queda en la lista de facturas.",
            ]}
          />
          <Bullets
            items={[
              <><B>En la lista:</B> usa el filtro de tipo («Todos los documentos», «Facturas electrónicas», «Documentos internos») para verlos aparte.</>,
              <><B>PDF:</B> «Descargar PDF» en el menú del documento. El PDF dice que es un documento interno y no una factura electrónica.</>,
              <><B>Cobro:</B> entra a <a href="/docs/invoices#receivables" style={link}>Cuentas por cobrar</a> como cualquier factura y se cobra con «Registrar pago» o con un recibo de caja.</>,
              <><B>Informes:</B> sale en una línea aparte, «Ventas no electrónicas».</>,
            ]}
          />
          <H3>Numeración</H3>
          <P>
            En <B>Ajustes → Contabilidad → Documentos y numeración</B>, pestaña <B>Documento interno</B>, el
            propietario o el contador definen el <B>Prefijo</B> (por ejemplo VT- o REM-) y el{" "}
            <B>Siguiente número</B>. El número solo puede subir: uno que ya se usó no se repite.
          </P>
          <P>
            Si tu empresa usa el documento interno sin la contabilidad activada, la misma sección está en{" "}
            <B>Ajustes → Facturación → Documento interno</B>.
          </P>
          <H3>Anular</H3>
          <P>
            En el menú del documento elige <B>Anular</B>, escribe el motivo y confirma con <B>Anular documento</B>. El
            documento queda anulado con su motivo, sale de las cuentas por cobrar y de los informes, y su número no se
            vuelve a usar. No se puede deshacer.
          </P>
        </section>

        <section id="comprobantes" className="mb-10">
          <H2>Comprobantes</H2>
          <P>
            En <B>Contabilidad → Comprobantes</B> (o <B>Movimientos</B>, si usas la vista en lenguaje llano) están
            todos los movimientos de tu contabilidad. La mayoría aparecen solos; unos pocos los registras tú.
          </P>

          <H3>Comprobantes automáticos</H3>
          <P>
            Cada documento genera su comprobante sin que hagas nada. Si el documento cambia (por ejemplo, se anula un
            documento interno), el comprobante se actualiza solo, siempre que su fecha esté en un período abierto.
          </P>
          <Table
            head={["Documento", "Qué registra su comprobante"]}
            rows={[
              ["Factura de venta, documento interno y nota débito", "Lo que te queda debiendo el cliente, tu ingreso y el IVA de la venta."],
              ["Nota crédito", "Lo contrario de la factura: baja lo que te debe el cliente, el ingreso y el IVA."],
              ["Abono a una factura", "La plata que entró y lo que deja de deberte el cliente."],
              ["Retenciones que te practicó el cliente", "Las retenciones a tu favor y lo que deja de deberte el cliente."],
              ["Compra, documento soporte y gasto sin documento", "El costo o gasto según su concepto, el IVA de la compra, las retenciones que practicaste y lo que le quedas debiendo al proveedor."],
              ["Recibo de caja", "La plata que entró al banco o la caja, y las facturas o conceptos que cubre."],
              ["Comprobante de egreso", "La plata que salió del banco o la caja, y las compras o conceptos que paga."],
              ["Transferencia entre cuentas", "La plata que salió de un banco o caja y entró a otro."],
              ["Venta de un producto que maneja inventario", "Además del comprobante de la venta, uno aparte con el costo de lo vendido: baja el inventario y sube el costo de ventas."],
              ["Ajuste de inventario", "Lo que entró o salió del inventario a mano, contra la cuenta de su motivo."],
              ["Cierre del año", "Deja en cero los ingresos, costos y gastos del año y lleva el resultado al patrimonio."],
            ]}
          />
          <Bullets
            items={[
              "Una factura electrónica, nota o documento soporte entra a la contabilidad cuando la DIAN lo acepta. Los rechazados, pendientes o en borrador no generan nada.",
              "Un documento interno cuenta mientras esté vigente; anulado, deja de contar.",
              "Una compra cuenta mientras no esté cancelada. Las órdenes de compra no se contabilizan.",
              <>Arriba de la lista puede aparecer un aviso de que hay documentos que cambiaron y todavía no están en la contabilidad. Se ponen al día solos en unos minutos, o al instante con <B>Sincronizar ahora</B>.</>,
            ]}
          />
          <Callout type="note" title="Los automáticos no se anulan aquí">
            Un comprobante que salió de un documento se corrige en su origen: corrige o anula la factura, la compra, el
            recibo, el egreso, la transferencia o el ajuste de inventario, y el comprobante se actualiza solo. El
            comprobante de cierre se deshace reabriendo el año.
          </Callout>

          <H3>Las dos vistas</H3>
          <P>
            Con <B>Ver débitos y créditos</B> apagado, la lista muestra Fecha, Concepto, Tercero, De dónde salió y
            Valor; al abrir un movimiento ves «Lo que subió» y «Lo que bajó». Con el interruptor encendido, la lista
            muestra Tipo, Número, Débito y Crédito, y el detalle trae las líneas del comprobante con Cuenta, Tercero,
            Descripción, Débito y Crédito.
          </P>
          <P>
            Los filtros de la lista: rango de fechas (con atajos «Este mes», «Mes pasado» y «Este año»), Tipo, Cuenta,
            Tercero (NIT o documento, solo números), Buscar (concepto o número) e «Incluir anulados». Desde el detalle,
            «De dónde salió» te lleva al documento de origen, y <B>Descargar PDF</B> baja el{" "}
            <a href="#pdf-contables" style={link}>comprobante contable en PDF</a>.
          </P>
          <P>Con la vista de débitos y créditos, cada comprobante muestra su tipo:</P>
          <Table
            head={["Código", "Tipo"]}
            rows={[
              ["CC", "Comprobante contable (manual)"],
              ["AP", "Comprobante de apertura (saldos iniciales)"],
              ["FV", "Factura de venta"],
              ["VI", "Documento interno de venta"],
              ["NC", "Nota crédito"],
              ["ND", "Nota débito"],
              ["FC", "Factura de compra"],
              ["RC", "Recibo de caja"],
              ["CE", "Comprobante de egreso"],
              ["TR", "Transferencia entre cuentas"],
              ["CV", "Costo de la venta (inventario)"],
              ["AI", "Ajuste de inventario"],
              ["CI", "Comprobante de cierre del año"],
            ]}
          />

          <H3 id="comprobante-manual">Comprobante manual</H3>
          <P>
            Úsalo para lo que no sale de una factura, una compra o un abono: un ajuste, una corrección, la nómina, una
            depreciación. Para pasar plata de un banco o caja a otro no hace falta: usa una{" "}
            <a href="#transferencias" style={link}>transferencia</a>.
          </P>
          <Steps
            items={[
              <>En Comprobantes, haz clic en <B>Nuevo comprobante</B>.</>,
              <>Escribe la <B>Fecha</B> (no puede ser futura ni caer en un período o en un año cerrado) y el concepto: de qué trata, entre 3 y 300 caracteres.</>,
              <>Agrega las líneas con <B>Agregar línea</B> (de 2 a 500). Cada una lleva la <B>Cuenta</B> y el valor en <B>Débito</B> o en <B>Crédito</B>, y si quieres el tercero (NIT o documento y nombre) y una descripción.</>,
              <>Haz clic en <B>Guardar comprobante</B>. Los débitos y los créditos deben sumar lo mismo; si no, no se guarda. El número se asigna al guardar.</>,
            ]}
          />

          <H3 id="saldos-iniciales">Saldos iniciales</H3>
          <P>
            Con el botón <B>Saldos iniciales</B> escribes con cuánto arranca cada cuenta el día en que empiezas a
            llevar la contabilidad aquí: lo que tienes en caja y bancos, lo que te deben tus clientes, lo que les debes
            a tus proveedores.
          </P>
          <Bullets
            items={[
              <>Un saldo por cuenta, con <B>Agregar saldo</B>. Lo que tienes o te deben va en débito; lo que debes, en crédito.</>,
              "No hace falta que cuadre: la diferencia la pone el sistema en la cuenta de saldos iniciales de tu configuración.",
              "Si ya registraste saldos iniciales y guardas otros, se suman a los que ya están. La pantalla te avisa y te deja verlos.",
              <>Si vienes de otro software, es más rápido <a href="#importar" style={link}>importarlos desde Excel</a>.</>,
            ]}
          />

          <H3>Anular un comprobante</H3>
          <P>
            Solo se anulan los <B>comprobantes manuales</B> y los de saldos iniciales. Abre el comprobante, haz clic
            en <B>Anular</B>, escribe el motivo (entre 3 y 300 caracteres) y confirma con <B>Anular comprobante</B>.
            Conserva su número, deja de contar en todos los libros y no se puede deshacer. Queda guardado quién lo
            anuló y por qué.
          </P>
          <P>
            Si la fecha del comprobante está en un período cerrado o en un año cerrado, no se anula: la pantalla te
            dice cuál de los dos es y <a href="#fecha-de-cierre" style={link}>qué hacer en cada caso</a>.
          </P>

          <H3 id="documento-panel">«Contabilidad de este documento»: de la factura o la compra a sus libros</H3>
          <P>
            Para ir en la otra dirección (de un documento a su contabilidad), abre el menú de la fila en{" "}
            <B>Facturas</B> o en <B>Compras</B> y elige <B>Contabilidad de este documento</B>. Se abre un panel a la
            derecha (en el celular, a pantalla completa) con todo lo contable de esa factura, ese documento interno o
            esa compra. El panel solo muestra: desde ahí no se cambia nada.
          </P>
          <Table
            head={["Sección del panel", "Qué muestra"]}
            rows={[
              ["Pagos y recibos (en una venta) o Pagos y egresos (en una compra)", "Cada abono con su recibo de caja, o cada pago con su egreso, con el enlace para abrirlo."],
              ["Comprobantes contables", "Los comprobantes que generó el documento: el de la venta o la compra, el de cada abono o pago y los ajustes, cada uno con «Ver el comprobante». La ve quien puede ver los libros."],
              ["Inventario", "Los productos que movió el documento, cada uno con «Ver movimientos», que abre su kardex. Solo con el inventario encendido."],
              ["Notas", "En una venta, sus notas crédito, con enlace."],
            ]}
          />
          <Bullets
            items={[
              "El panel existe con la contabilidad activada y los libros en uso.",
              "Un documento de hoy puede tardar unos minutos en mostrar sus comprobantes. Uno con fecha dentro de los saldos iniciales no genera comprobante.",
              "Cada sección carga por separado: si una no se puede leer, las demás se ven igual.",
            ]}
          />
        </section>

        <section id="bancos-y-caja" className="mb-10">
          <H2>Bancos y caja</H2>
          <P>
            Cada recibo de caja y cada egreso dice a qué banco o caja entró la plata o de cuál salió. Por eso, antes de
            registrar el primero, el propietario o el contador crean las cuentas de dinero en{" "}
            <B>Ajustes → Contabilidad → Bancos y caja</B>.
          </P>
          <Steps
            items={[
              <>Haz clic en <B>Agregar banco o caja</B>.</>,
              <>En <B>Qué es</B>, elige Banco o Caja, y ponle un <B>Nombre</B> con el que la reconozcas (por ejemplo «Banco de ejemplo ahorros 4521» o «Caja del local»).</>,
              <>Elige su <B>Cuenta contable</B>: dónde se registra su plata en la contabilidad. Cada banco o caja lleva la suya y después de crearla no se cambia.</>,
              <>Si es un banco, puedes anotar el tipo y el número de cuenta. Haz clic en <B>Crear</B>.</>,
            ]}
          />
          <P>
            Crea una por cada cuenta bancaria y por cada caja que manejes. No se borran: si dejas de usar una,
            desactívala.
          </P>

          <H3 id="banco-por-defecto">Banco y caja por defecto</H3>
          <P>
            En la misma sección está el bloque <B>Banco y caja por defecto</B>, con un selector para cada uno. Elegir
            guarda de una vez.
          </P>
          <Table
            head={["Selector", "Cuándo se usa"]}
            rows={[
              [<B key="b">Banco por defecto</B>, "Cuando el pago no es en efectivo: transferencia, tarjeta o cheque."],
              [<B key="b">Caja por defecto</B>, "Cuando el pago es en efectivo."],
            ]}
          />
          <Bullets
            items={[
              "Son los que se proponen al registrar un recibo, un egreso o un pago. En cada uno los puedes cambiar.",
              <>Son los que se usan cuando un cobro llega sin decir a dónde entró, por ejemplo <a href="#api-y-mcp" style={link}>desde una integración o un asistente</a>.</>,
              "Cada selector aparece solo si tienes al menos una cuenta activa de ese tipo. Para dejarlo sin elegir, usa «Sin banco por defecto» o «Sin caja por defecto».",
              "Si desactivas la cuenta que era el defecto, deja de serlo: elige otra.",
            ]}
          />
        </section>

        <section id="transferencias" className="mb-10">
          <H2>Transferencias entre cuentas de dinero</H2>
          <P>
            Una transferencia es pasar plata entre dos de tus <a href="#bancos-y-caja" style={link}>bancos o cajas</a>:
            consignar en el banco el efectivo de la caja, o mover plata de un banco a otro. No es un ingreso ni un
            gasto: la plata solo cambia de lugar. Están en <B>Facturación → Transferencias</B>, en el grupo «Cobros y
            pagos».
          </P>
          <Steps
            items={[
              <>Haz clic en <B>Nueva transferencia</B>.</>,
              <>Elige <B>Sale de</B> (la cuenta de origen) y <B>Entra a</B> (la cuenta de destino), y escribe la <B>Fecha</B> y el <B>Valor</B>. Si quieres, también la <B>Referencia</B> y una <B>Nota</B>.</>,
              <>Haz clic en <B>Revisar</B>. Todavía no se guarda nada: «Así queda la transferencia» te muestra de qué cuenta sale la plata y a cuál entra.</>,
              <>Si está bien, haz clic en <B>Guardar</B>. Si cambias algo después de revisar, hay que revisar de nuevo.</>,
            ]}
          />
          <Bullets
            items={[
              "Necesitas dos bancos o cajas activos y distintos. Si solo tienes uno, la pantalla te pide crear el otro en Ajustes.",
              "Dos cuentas de dinero que usan la misma cuenta contable no se pueden transferir entre sí.",
              "La fecha no puede ser futura ni caer en un período cerrado o en un año cerrado.",
              <>Cada transferencia queda con su propio comprobante, <B>Transferencia entre cuentas (TR)</B>, con numeración propia. Aparece en los libros de las dos cuentas y en la <a href="#conciliacion" style={link}>conciliación</a> de cada una.</>,
              <><B>La lista</B> muestra fecha, número, de dónde salió, a dónde entró, valor y estado, y se filtra por <B>Cuenta de dinero</B>, <B>Desde</B> y <B>Hasta</B>. Las anuladas van aparte: marca «Ver también las anuladas».</>,
              "A quien puede ver los libros (propietario, contador y usuario de solo lectura), el número lo lleva al comprobante contable, que se descarga en PDF. A los demás usuarios les abre una ficha con los datos de la transferencia.",
              "Si al guardar no hay respuesta, no la registres otra vez: «Reintentar» la envía de nuevo tal cual, sin duplicarla.",
            ]}
          />
          <H3>Anular una transferencia</H3>
          <P>
            Haz clic en <B>Anular</B>, escribe el motivo y confirma con <B>Anular transferencia</B>. Conserva su número
            y deja de contar en tus libros: el saldo de las dos cuentas vuelve a como estaba. Si estaba cruzada en una
            conciliación, ese cruce queda roto. No se puede deshacer.
          </P>
          <P>
            Una transferencia con fecha en un período cerrado o en un año cerrado no se anula. Para corregirla,
            registra otra en el período abierto, o mira <a href="#fecha-de-cierre" style={link}>qué hacer en cada caso</a>.
          </P>
        </section>

        <section id="recibos-y-egresos" className="mb-10">
          <H2>Recibos de caja y comprobantes de egreso</H2>
          <Table
            head={["Documento", "Dónde", "Para qué"]}
            rows={[
              ["Recibo de caja", <>Facturación → <B>Recibos de caja</B></>, "La plata que te entra: pagos de tus clientes, anticipos y otros ingresos."],
              ["Comprobante de egreso", <>Facturación → <B>Egresos</B></>, "La plata que sale: pagos a tus proveedores, anticipos y gastos."],
            ]}
          />
          <P>
            Los dos están en el grupo «Cobros y pagos» del menú Facturación. En pantalla el egreso se llama «Egreso»;
            «Comprobante de egreso» es el nombre que lleva su PDF.
          </P>
          <P>
            Un solo recibo puede cobrar <B>varias facturas o documentos internos del mismo cliente</B>, y un solo
            egreso puede pagar <B>varias compras del mismo proveedor</B>. Los dos pueden llevar además conceptos que no
            son de un documento.
          </P>

          <H3>Crear un recibo o un egreso</H3>
          <Steps
            items={[
              <>Haz clic en <B>Nuevo recibo de caja</B> o <B>Nuevo egreso</B>.</>,
              <>Elige el cliente o el proveedor de tus contactos. También puedes escribir su NIT y tocar <B>Ver facturas</B> (en un recibo) o <B>Ver compras</B> (en un egreso).</>,
              "Aparecen sus facturas con saldo (o sus compras por pagar). Marca las que te están pagando (o las que estás pagando) y escribe cuánto a cada una. Se propone lo que debe.",
              <>Si hace falta, agrega <B>Conceptos sin documento</B> con <B>Agregar concepto</B> (ver la tabla de abajo).</>,
              <>En <B>Cómo te pagaron</B> (o <B>Cómo pagaste</B>), elige el <B>Banco o caja</B>, la <B>Fecha</B>, la <B>Forma de pago</B> y, si quieres, la <B>Referencia</B> (el número de la transferencia o de la consignación) y una <B>Nota</B>. El banco o la caja viene propuesto con el <a href="#banco-por-defecto" style={link}>defecto de tu empresa</a>: la caja si es efectivo, el banco si no.</>,
              <>Haz clic en <B>Revisar</B>. Todavía no se guarda nada: ves cómo queda cada documento («Debe hoy» y «Queda debiendo») y el total.</>,
              <>Si está bien, haz clic en <B>Guardar</B>. El número se asigna al guardar y no se reusa aunque después se anule.</>,
            ]}
          />
          <Callout type="tip" title="Primero «Revisar», después «Guardar»">
            El total que ves mientras llenas el formulario es la suma de lo que escribiste y dice «por confirmar»: el
            que vale es el que sale al revisar. Si cambias algo después de revisar, hay que revisar de nuevo antes de
            guardar.
          </Callout>
          <Table
            head={["Concepto sin documento", "En un recibo de caja", "En un egreso"]}
            rows={[
              ["Anticipo", "Anticipo del cliente: plata que te entregan antes de facturar.", "Anticipo al proveedor: plata que entregas antes de la compra."],
              ["Otro ingreso", "Un ingreso que no es de una factura.", "No aplica."],
              ["Gasto", "No aplica.", <>Un gasto que no es de una compra registrada ni de un <a key="ds" href="#pagar-documento-soporte" style={link}>documento soporte</a>, con su concepto del gasto. Si el valor trae IVA que puedes descontar, <a key="a" href="#egreso-iva-y-compras" style={link}>dilo en el mismo gasto</a>.</>],
              ["Otra cuenta", "Una cuenta contable que eliges. Sirve para cobrar un saldo que venía de antes.", "Una cuenta contable que eliges. Sirve para pagar un saldo que venía de antes."],
            ]}
          />
          <Bullets
            items={[
              "«Otra cuenta» solo la pueden usar el propietario y el contador.",
              "Un comprobante lleva máximo 50 documentos y 20 conceptos. Si son más, regístralo en dos.",
              "Un pago mayor que lo que se debe se rechaza.",
              "Un recibo no aplica retenciones: cobra contra el saldo que la factura tenga en ese momento.",
              <>Si todavía no hay bancos ni cajas, la pantalla te pide crear uno primero en <a href="#bancos-y-caja" style={link}>Bancos y caja</a>.</>,
            ]}
          />

          <H3 id="pagar-documento-soporte">Pagar un documento soporte</H3>
          <P>
            Un <a href="/docs/invoices#support-documents" style={link}>documento soporte</a> y un egreso son dos
            cosas distintas, y hacen falta las dos:
          </P>
          <Table
            head={["Documento", "Qué registra", "¿Va a la DIAN?"]}
            rows={[
              [<B key="b">Documento soporte</B>, "La compra: el gasto, y que le quedas debiendo al proveedor.", "Sí. La DIAN lo valida."],
              [<B key="b">Comprobante de egreso</B>, "El pago: la plata que salió del banco o la caja, y que ya no le debes.", "No. Es un documento interno de tu contabilidad."],
            ]}
          />
          <P>
            Cuando la DIAN valida un documento soporte, queda registrado solo como una compra de ese proveedor. Por
            eso se paga igual que una factura de proveedor:
          </P>
          <Steps
            items={[
              <>Entra a Facturación → <B>Egresos</B> y haz clic en <B>Nuevo egreso</B>.</>,
              "Elige al proveedor. Entre sus compras por pagar aparece el documento soporte, con su número.",
              "Márcalo y escribe cuánto le pagas.",
              <>En <B>Cómo pagaste</B>, elige el banco o la caja y pon la <B>Fecha</B> en que salió la plata, que puede ser distinta a la del documento.</>,
              <>Haz clic en <B>Revisar</B> y después en <B>Guardar</B>.</>,
            ]}
          />
          <P>
            También puedes llegar desde Facturación → <B>Documentos Soporte</B>: la columna <B>Pago</B> muestra
            «Falta el egreso» en los que no has pagado, y al hacer clic se abre «Pagos y saldo» de su compra.
          </P>
          <Bullets
            items={[
              "Si no registras el egreso, el documento sigue siendo válido ante la DIAN, pero tus libros dicen que le debes al proveedor y que esa plata sigue en el banco. La conciliación bancaria no va a cuadrar.",
              "El método de pago que elegiste al emitir el documento soporte no mueve ningún banco: el que saca la plata es el egreso.",
              "Si le retienes al proveedor, pon las retenciones en la compra antes de pagarla. El egreso paga lo que queda después de ellas.",
              "Un documento soporte emitido antes de este cambio no tiene compra todavía: créala con «Registrar pago» en el menú del documento.",
            ]}
          />
          <Callout type="warning" title="No uses el concepto «Gasto» para pagar un documento soporte">
            El documento soporte ya registró el gasto. Si además lo pagas con un egreso al concepto «Gasto», el gasto
            queda dos veces y la deuda con el proveedor nunca se cancela. El concepto «Gasto» es para lo que no tiene
            ni factura ni documento soporte.
          </Callout>

          <H3 id="egreso-iva-y-compras">Un gasto con IVA en el egreso</H3>
          <P>
            Cuando pagas un gasto que no tiene una compra registrada y el valor ya trae IVA, no hace falta crear la
            compra. En el concepto <B>Gasto</B> del egreso, además del concepto del gasto, está el campo opcional{" "}
            <B>IVA incluido (descontable)</B>:
          </P>
          <Bullets
            items={[
              "En el valor escribes todo lo que salió del banco o la caja. En «IVA incluido (descontable)», cuánto de ese valor es IVA.",
              "El IVA debe ser mayor que cero y menor que el valor. Solo existe en el concepto Gasto.",
              "El gasto queda registrado sin el IVA, y el IVA queda aparte como IVA descontable.",
              "Ejemplo: pagas $119.000 por papelería y escribes $19.000 de IVA. Quedan $100.000 como gasto y $19.000 como IVA descontable.",
              "Al revisar y en el detalle del egreso, el concepto dice «Incluye IVA descontable» con su valor.",
            ]}
          />
          <P>
            Si ese IVA se puede descontar o no depende de tu caso: pregúntale a tu contador.
          </P>

          <H3>El detalle: PDF y anular</H3>
          <P>
            Al abrir un recibo o un egreso ves la fecha, el tercero, el banco o caja, la forma de pago, el total y el
            valor en letras; los documentos que abona o paga (cada uno con su enlace «Ver la factura» o «Ver la
            compra»), los conceptos y qué ha pasado con el comprobante. Quien puede ver los libros (propietario,
            contador y usuario de solo lectura) ve además el enlace a su comprobante contable.
          </P>
          <Bullets
            items={[
              <><B>Saldo anterior y Nuevo saldo:</B> en los recibos y egresos nuevos, cada documento muestra cuánto debía antes de este pago y cuánto quedó debiendo. Los que se registraron antes de que existiera este dato no traen esas dos columnas.</>,
              <><B>PDF:</B> hay dos, <a href="#pdf-contables" style={link}>uno para entregar y otro con cuentas contables</a>.</>,
              <><B>Anular:</B> escribe el motivo y confirma con «Anular recibo» o «Anular egreso». Sus abonos o pagos se retiran de cada factura o compra, que vuelve a deber ese valor. Conserva su número y no se puede deshacer.</>,
              <>Un recibo o un egreso con fecha en un período cerrado o en un año cerrado no se anula: la pantalla te dice <a href="#fecha-de-cierre" style={link}>cuál de los dos es y qué hacer</a>.</>,
            ]}
          />

          <H3 id="pdf-contables">Los PDF: para entregar y con cuentas contables</H3>
          <Table
            head={["Botón", "Dónde", "Qué trae", "Quién lo ve"]}
            rows={[
              [<><B key="b">PDF para el cliente</B> / <B>PDF para el proveedor</B></>, "Detalle del recibo o del egreso", "El papel que se entrega, sin cuentas contables.", "Todo el que puede ver el recibo o el egreso."],
              [<B key="b">PDF con cuentas contables</B>, "Detalle del recibo o del egreso", "Lo mismo, con las cuentas contables. Es el que va al archivo de tu contador.", "Propietario, contador y usuario de solo lectura."],
              [<B key="b">Descargar PDF</B>, <>Detalle de un <a key="a" href="#comprobantes" style={link}>comprobante</a></>, "El comprobante contable: tipo y número, fecha, concepto y sus líneas con cuenta, tercero, débito y crédito. Sirve para cualquier tipo de comprobante, también los automáticos, las transferencias y el de cierre.", "Propietario, contador y usuario de solo lectura."],
            ]}
          />
          <P>
            Si el egreso lleva IVA descontable, el PDF lo dice.
          </P>
          <Bullets
            items={[
              <><B>Logo:</B> los recibos, los egresos, los comprobantes contables y los estados financieros llevan el mismo logo de tus facturas. Es el que subes en Ajustes, en «Logo de la factura».</>,
              <><B>Tamaño:</B> el recibo y el egreso salen en carta o en media carta, según lo que elijas en <a href="#opciones" style={link}>Preferencias</a>. Lo demás sale en carta.</>,
            ]}
          />

          <H3 id="estados">Estados</H3>
          <Table
            head={["Estado", "Qué significa", "Qué hacer"]}
            rows={[
              ["Aplicado", "Quedó registrado en cada documento.", "Nada."],
              ["Anulado", "Conserva su número y ya no cuenta: sus abonos se retiraron.", "Nada."],
              ["En proceso", "Se está registrando o se está anulando.", "Esperar: se termina solo en unos minutos. No lo registres otra vez. Con «Actualizar» o «Comprobar de nuevo» ves si ya terminó, sin duplicarlo."],
              ["Atascado", "No se pudo terminar solo, por ejemplo porque un documento cambió mientras se guardaba. La pantalla muestra el motivo.", "Anúlalo y regístralo de nuevo con los saldos de hoy. Si lo que quedó atascado fue una anulación, vuelve a anularlo para terminarla."],
            ]}
          />
          <P>
            La lista se filtra por Estado, fechas (Desde y Hasta), tercero y Buscar (número, nombre o referencia).
          </P>
        </section>

        <section id="registrar-pago" className="mb-10">
          <H2>«Registrar pago» y las compras, con la contabilidad activada</H2>

          <H3>«Registrar pago» en una factura crea un recibo de caja</H3>
          <P>
            El botón <a href="/docs/invoices#receivables" style={link}>Registrar pago</a> de una factura sigue donde
            siempre, con dos cambios:
          </P>
          <Bullets
            items={[
              <>Pide el <B>Banco o caja</B>: a dónde entró el dinero. Viene propuesto el <a href="#banco-por-defecto" style={link}>defecto de tu empresa</a> o el último que elegiste, y lo puedes cambiar.</>,
              <>Al guardar, el pago queda registrado con un <B>recibo de caja</B>. La ventana te muestra su número, con «Ver el recibo» y <B>Descargar recibo</B>.</>,
              <>En <B>Abonos registrados</B>, un abono que nació de un recibo muestra su recibo y no trae el botón de eliminar: <B>para quitarlo, anula el recibo</B> y el abono se retira con él.</>,
              <>Las retenciones del cliente no van en esta ventana: se anotan como siempre, con <a href="/docs/invoices#customer-withholdings" style={link}>Aplicar retenciones</a>.</>,
              "Si el pago queda «en proceso», no lo registres otra vez: usa «Comprobar de nuevo».",
              "Un usuario de solo lectura ve el saldo y los abonos, pero no puede registrar el pago.",
            ]}
          />
          <P>
            Para cobrar varias facturas del mismo cliente con un solo pago, o para recibir un anticipo, crea el recibo
            desde <a href="#recibos-y-egresos" style={link}>Facturación → Recibos de caja</a>. En{" "}
            <a href="/docs/invoices#receivables" style={link}>Cuentas por cobrar</a>, el botón <B>Cobrar varias</B> abre
            ese recibo con el cliente ya puesto.
          </P>

          <H3>Una compra se paga con un comprobante de egreso</H3>
          <Steps
            items={[
              <>En <a href="/docs/invoices#purchases" style={link}>Compras</a>, abre el menú de la compra y elige <B>Pagos y saldo</B>.</>,
              "Ves cuánto hay que pagar, lo pagado y el saldo. «A pagar» ya descuenta las retenciones y las notas del proveedor.",
              <>Haz clic en <B>Pagar</B>: se abre un egreso nuevo con el proveedor y la compra ya puestos.</>,
            ]}
          />
          <Bullets
            items={[
              "El proveedor de la compra debe tener NIT. Si no lo tiene, edita la compra y ponlo primero.",
              "Cada pago de la lista enlaza a su comprobante de egreso.",
              "Una compra marcada como pagada a mano dice «Marcada como pagada sin comprobante de egreso». Para pagarla con un egreso, devuélvela antes a «Pendiente» desde «Cambiar estado».",
              <>Una compra con pagos no se puede eliminar ni cambiar de estado a mano: su estado lo fijan sus pagos. Para corregirla, <a href="#compra-con-pagos" style={link}>anula primero su egreso</a>.</>,
              "Mientras haya compras marcadas como pagadas sin egreso, el balance de prueba avisa que el saldo de proveedores las incluye, con un enlace a Egresos.",
            ]}
          />

          <H3 id="compra-pagada">«Pagada» ya no se marca a mano: «Registrar el pago»</H3>
          <P>
            Con la contabilidad activada, una compra queda pagada cuando registras su egreso: así el pago sale del
            banco o la caja correcta y queda en tus libros. Por eso, en <B>Cambiar estado</B> ya no aparece la opción
            «Pagada». En su lugar está el recuadro <B>«¿Ya la pagaste?»</B>, con el botón <B>Registrar el pago</B>, que
            abre un egreso nuevo con el proveedor y la compra ya puestos.
          </P>
          <Bullets
            items={[
              "Es el mismo egreso que sale de «Pagos y saldo» con «Pagar»: usa el camino que te quede más a la mano.",
              <>Una compra con fecha dentro de tus <a href="#saldos-iniciales-hasta" style={link}>saldos iniciales</a> conserva la opción «Pagada»: su pago ya viene contado en esos saldos.</>,
              "Una compra que ya estaba marcada como pagada a mano conserva su estado: no se le cambia a la fuerza.",
              <>La regla es la misma por la <a href="#api-y-mcp" style={link}>API y por un asistente</a>: marcar una compra como pagada sin egreso se rechaza, con un mensaje que lo explica.</>,
            ]}
          />

          <H3 id="compra-con-pagos">Corregir una compra que ya tiene pagos</H3>
          <P>
            Si intentas cambiar una compra pagada con un comprobante de egreso, aparece el aviso{" "}
            <B>«Esta compra tiene pagos registrados»</B>, que nombra los egresos. Mientras los tenga no cambian su
            valor, su IVA, sus retenciones, su proveedor ni su estado, y no se elimina. El texto y el concepto del
            gasto sí se pueden cambiar.
          </P>
          <Steps
            items={[
              <>En el aviso, haz clic en <B>Ver pagos y saldo</B>: cada pago lleva a su egreso.</>,
              "Anula ese egreso (o esos egresos).",
              "Corrige la compra y vuelve a pagarla.",
            ]}
          />

          <H3 id="compra-repetida">Aviso de compra repetida</H3>
          <P>
            Al guardar una compra, si ya hay otra del mismo proveedor con el mismo número de documento, no se guarda
            de una. Aparece el aviso <B>«Esta compra parece repetida»</B>, con el número de la otra y el enlace{" "}
            <B>Ver la otra compra</B>.
          </P>
          <Bullets
            items={[
              <>Si es la misma factura, no la guardes otra vez: quedaría contada dos veces. Usa <B>Volver a revisarla</B>.</>,
              <>Si de verdad es otra compra, haz clic en <B>Guardar de todos modos</B>.</>,
              "Al comparar el número no cuentan los espacios, los guiones ni las mayúsculas: «FV-900» y «fv 900» son el mismo.",
              "No se revisan las compras sin número de documento, las canceladas ni las órdenes de compra.",
              "El aviso funciona con la contabilidad activada.",
            ]}
          />

          <H3 id="gasto-sin-documento">Gasto sin documento: nace pagado, con su egreso</H3>
          <P>
            El <B>Gasto sin documento</B> de Compras (un gasto que no tiene factura ni documento soporte) cambia con la
            contabilidad activada. Como esa plata ya salió, al guardarlo se crea también su egreso. El formulario pide
            dos datos más:
          </P>
          <Table
            head={["Campo", "Qué escribes"]}
            rows={[
              [<B key="b">NIT o cédula</B>, <>Solo números, sin dígito de verificación. La contabilidad necesita saber a quién se le pagó. Para gastos pequeños sin tercero identificado, usa el botón <B>Tercero genérico</B>: pone el número 222222222222 y, si no habías escrito un nombre, «Cuantías menores».</>],
              [<B key="b">Banco o caja</B>, <>De dónde salió la plata. Viene propuesto el <a href="#banco-por-defecto" style={link}>defecto de tu empresa</a>.</>],
            ]}
          />
          <Bullets
            items={[
              "Al guardar, el gasto queda registrado y pagado, con su comprobante de egreso. Lo encuentras en Egresos y en «Pagos y saldo» de ese gasto.",
              "Si el gasto se guardó pero su egreso no se pudo crear, queda como pendiente de pago y la pantalla te dice por qué. Corrige y vuelve a guardar (no se registra dos veces), o págalo después desde «Pagos y saldo».",
              "Si el egreso queda «en proceso», se termina solo en unos minutos: no registres el gasto otra vez.",
              "Editar un gasto que ya existe no lo vuelve a pagar.",
              <>Un gasto con fecha dentro de tus <a href="#saldos-iniciales-hasta" style={link}>saldos iniciales</a> se registra como pagado sin egreso, igual que antes.</>,
              "Sin la contabilidad activada, el formulario queda como siempre: no pide la identificación ni el banco.",
            ]}
          />

          <H3 id="api-y-mcp">Cobros por la API y por un asistente (MCP)</H3>
          <P>
            Si otro sistema registra los pagos de tus facturas por la <a href="/docs/api" style={link}>API</a>, o se lo
            pides a un asistente de IA conectado por <a href="/docs/mcp" style={link}>MCP</a>, con la contabilidad
            activada pasa lo mismo que en pantalla: <B>cada pago crea un recibo de caja</B>, uno por factura.
          </P>
          <Table
            head={["Situación", "Qué pasa"]}
            rows={[
              ["El pago dice a qué banco o caja entró", "El recibo queda en esa cuenta."],
              ["El pago no lo dice", <>Se usa el <a key="a" href="#banco-por-defecto" style={link}>banco por defecto</a>, o la caja por defecto si la forma de pago es efectivo.</>],
              ["El pago no lo dice y no hay defecto", "El pago se rechaza con un mensaje que lo explica y no queda registrado. Elige el banco y la caja por defecto en Ajustes → Contabilidad → Bancos y caja, o haz que la integración diga la cuenta."],
            ]}
          />
          <Bullets
            items={[
              "Un asistente puede consultar tus bancos y cajas para preguntarte a cuál entró la plata.",
              "Repetir el mismo pago no crea dos recibos: la respuesta dice que ya estaba registrado.",
              "Si el pago trae retenciones del cliente, se aplican primero y el recibo va por el valor neto.",
              "Si un pago queda «en proceso», se termina solo. Repetir la misma solicitud no lo duplica.",
              "Un abono que nació así se quita anulando su recibo, desde la web. Ni la API ni un asistente anulan recibos.",
              <>En el <a href="#registro-de-cambios" style={link}>Registro de cambios</a>, lo que entró por estos caminos dice «por la API» o «por un asistente (MCP)».</>,
              "Sin la contabilidad activada, los pagos por la API y por un asistente siguen registrándose como abonos, igual que antes.",
            ]}
          />
        </section>

        <section id="conciliacion" className="mb-10">
          <H2>Conciliación bancaria</H2>
          <P>
            Conciliar es comparar el extracto del banco con lo que tienes registrado en esa cuenta, movimiento por
            movimiento. Está en <B>Facturación → Conciliación bancaria</B> (grupo «Cobros y pagos»), donde ves los
            extractos que has subido, por cuenta de dinero y por estado.
          </P>
          <Callout type="note" title="Tú subes el extracto y tú confirmas cada cruce">
            FusionCRM no se conecta con tu banco: el extracto lo descargas tú y lo subes. Y la conciliación no es
            automática: la pantalla sugiere, pero <strong>nada queda cruzado hasta que una persona lo confirma</strong>.
            Cruzar no mueve plata ni cambia ningún comprobante: solo deja dicho qué línea del extracto corresponde a
            qué movimiento de tus libros.
          </Callout>

          <H3 id="subir-extracto">Subir un extracto</H3>
          <Steps
            items={[
              <>Haz clic en <B>Subir extracto</B>.</>,
              <>En <B>1. El extracto</B>, elige la <B>Cuenta de dinero</B> (el banco o la caja) y, con <B>Elegir archivo</B>, el archivo que descargaste del banco.</>,
              <>En <B>Cómo leerlo</B>, deja <B>Detectar columnas</B>, que sirve para casi cualquier banco: busca la fecha, el valor y el saldo por el nombre de cada columna. Si tu archivo es la plantilla de Bancolombia (FECHA, DESCRIPCIÓN, SUCURSAL, DCTO., VALOR y SALDO), elige <B>Bancolombia</B>.</>,
              <>En <B>2. Los saldos del extracto</B>, escribe el <B>Saldo inicial</B> y el <B>Saldo final</B> si los necesitas (los dos son opcionales; mira la nota de abajo).</>,
              <>Haz clic en <B>Revisar</B>. Lee el archivo y te muestra lo que entendió, sin guardar nada.</>,
              <>Compara la vista previa con tu extracto. Si coincide, haz clic en <B>Guardar extracto</B>: se abre la conciliación.</>,
            ]}
          />
          <Table
            head={["Límite", "Valor"]}
            rows={[
              ["Formato", "Excel .xlsx o CSV .csv, tal como lo descargas del banco. Un .xls antiguo hay que guardarlo como «Libro de Excel (.xlsx)» o como CSV. Un PDF no se puede leer."],
              ["Tamaño", "Máximo 600 KB. Si pesa más, deja solo la hoja con los movimientos o sube el mes en dos partes."],
              ["Movimientos", "Máximo 2.000 líneas por extracto."],
              ["Período", "Máximo 366 días. Va de la primera a la última fecha del archivo. Si es más largo, súbelo por partes (por ejemplo, mes por mes)."],
            ]}
          />
          <Callout type="warning" title="El saldo inicial solo se puede escribir al subir">
            Si es el primer extracto de la cuenta y el banco ya traía un saldo, escribe el <strong>Saldo inicial</strong>{" "}
            en este paso. Sin él no se podrá cruzar el saldo inicial contra tus libros, y no se puede poner después:
            habría que descartar el extracto y subirlo de nuevo. El <strong>Saldo final</strong> hace falta si el
            archivo no trae columna de saldo.
          </Callout>

          <H3>La vista previa</H3>
          <P>Después de «Revisar» ves, antes de guardar:</P>
          <Table
            head={["Bloque", "Qué muestra"]}
            rows={[
              ["Totales del extracto", "Lo que entra, lo que sale y el neto, el período y el saldo final que trae el archivo."],
              ["Lo detectado en el archivo", "La fila de encabezados, qué columna se tomó para cada dato, el formato de las fechas y de los valores, el orden y las filas que se saltaron (vacías, títulos o totales)."],
              ["Primeras líneas del extracto", "Las primeras líneas tal como se leyeron, para compararlas con tu extracto."],
              ["Filas con problemas", "Las filas que no se pudieron leer, una por una."],
            ]}
          />
          <Bullets
            items={[
              <><B>Con filas que no se pudieron leer, el extracto no se guarda.</B> Corrige esas filas en el archivo, o dile a la pantalla qué columna es cada cosa, y vuelve a revisar.</>,
              "Los avisos no impiden guardar, pero conviene leerlos: «Ya hay un extracto de esas fechas», «Los saldos no coinciden con los movimientos», «Revisa que los valores se hayan leído bien», «No se sabe el saldo final del banco» y «El saldo de alguna fila no sale de la anterior».",
              "Si cambias algo después de revisar, hay que revisar de nuevo antes de guardar.",
              "El archivo se lee en tu navegador y no se guarda en él.",
            ]}
          />

          <H3 id="columnas-a-mano">Si no reconoce las columnas</H3>
          <P>
            Debajo de la vista previa está el bloque <B>«¿No quedó bien? Dinos qué columna es cada cosa»</B>. Se abre
            solo cuando no se reconocieron las columnas o hay filas con problemas, y lo puedes abrir tú cuando tu banco
            usa otros nombres. Para cada dato dices en qué columna de tu archivo viene:
          </P>
          <Table
            head={["Dato", "Qué es"]}
            rows={[
              ["Fecha", "El día de cada movimiento."],
              ["Descripción", "El texto que pone el banco."],
              ["Referencia o documento", "El número con que el banco identifica el movimiento."],
              ["Valor", "Una sola columna: lo que entra, positivo; lo que sale, negativo."],
              ["Salidas y Entradas", "Si el banco separa lo que sale y lo que entra en dos columnas. Se usa esta forma o la de una sola columna de valor, no las dos."],
              ["Saldo", "El saldo después de cada movimiento. Opcional."],
            ]}
          />
          <Bullets
            items={[
              "Con un archivo CSV, eliges cada encabezado de una lista. Con uno de Excel, lo escribes tal como aparece en tu archivo (por ejemplo «Fecha movimiento»).",
              "Deja en «Detectar sola» (o vacío) lo que no quieras cambiar.",
              <>Después de cambiar las columnas, vuelve a <B>Revisar</B>.</>,
            ]}
          />
          <P>Con «Detectar columnas», estos son los títulos que se reconocen solos, sin importar tildes ni mayúsculas:</P>
          <Table
            head={["Dato", "Títulos que se reconocen", "¿Obligatorio?"]}
            rows={[
              ["Fecha", "Fecha, Fecha movimiento, Date", "Sí"],
              ["Descripción", "Descripción, Concepto, Detalle", "No"],
              ["Referencia", "Referencia, Documento, Ref", "No"],
              ["Valor", "Una columna con signo (Valor, Monto, Importe), o dos columnas: Débito y Crédito, Egresos e Ingresos, o Retiros y Depósitos", "Sí"],
              ["Saldo", "Saldo", "No, pero ayuda a revisar el archivo"],
            ]}
          />
          <Bullets
            items={[
              <><B>Fechas que se leen:</B> 2025-06-30, 30/06/2025, 30-06-2025, 2025/06/30, 20250630 y las fechas propias de Excel.</>,
              <><B>Valores que se leen:</B> 1.234.567,89 · 1,234,567.89 · -1234567.89 · (1.234,56) como negativo, con o sin el signo $. La vista previa te dice cómo se tomaron los puntos y las comas.</>,
              "Una fecha o un valor que se pueda leer de dos maneras no se adivina: esa fila se marca como problema.",
            ]}
          />

          <H3 id="cruzar">Conciliar: cruzar el banco con tus libros</H3>
          <P>
            La conciliación tiene dos columnas: <B>En el banco</B>, con las líneas del extracto, y <B>En tus libros</B>,
            con los movimientos de esa cuenta: recibos, egresos, transferencias y comprobantes manuales. En el celular
            son dos pestañas. Arriba está siempre el resumen.
          </P>
          <Table
            head={["Qué quieres hacer", "Cómo"]}
            rows={[
              ["Confirmar una sugerencia", <>Cada línea del banco muestra el movimiento de tus libros que le corresponde, por ejemplo «Mismo valor y fecha cercana» o «El banco nombra ese comprobante». Si es ese, haz clic en <B key="b">Confirmar</B>. Si hay varias opciones o no es ese, usa <B>Elegir otro</B>.</>],
              ["Confirmar varias de una vez", <>Cuando hay líneas del banco con una sola coincidencia clara en tus libros, arriba aparece <B key="b">Confirmar las N sugerencias seguras</B> (dice cuántas son). Las confirma todas juntas.</>],
              ["Cruzar a mano", <>En la línea del banco, haz clic en <B key="b">Cruzar a mano</B> y marca en tus libros uno o varios movimientos. La pantalla te muestra cuánto suman y si es igual a lo que dice el banco. Termina con <B>Confirmar el cruce</B>.</>],
              ["Deshacer un cruce", <>Con <B key="b">Deshacer el cruce</B>, mientras la conciliación esté abierta.</>],
            ]}
          />
          <Bullets
            items={[
              "Una línea del banco se puede cruzar con uno o con varios movimientos de tus libros, siempre que sumen exactamente su valor. Si no suman, el cruce no se guarda.",
              "Un movimiento de tus libros solo puede estar en un cruce, aquí o en otro extracto de la cuenta.",
              <><B>Cruce roto:</B> si después anulas un comprobante que ya estaba cruzado, o le cambias el valor o la fecha, ese cruce queda marcado como roto y cuenta como pendiente. Deshazlo y crúzalo de nuevo.</>,
              "Con «Qué líneas ver» y «Qué movimientos ver» dejas a la vista solo lo que está sin cruzar.",
              "Si otra persona cambia la conciliación mientras trabajas, la pantalla la vuelve a cargar y te avisa para que repitas lo que ibas a hacer.",
            ]}
          />

          <H3 id="saldo-inicial-extracto">El saldo inicial del extracto</H3>
          <P>
            La primera vez que concilias una cuenta, el banco ya traía un saldo de antes. La tarjeta{" "}
            <B>Saldo inicial del extracto</B> te dice qué hacer en cada caso:
          </P>
          <Table
            head={["Lo que dice la tarjeta", "Qué hacer"]}
            rows={[
              ["Cruza el saldo inicial", <>Es el primer extracto de la cuenta. Haz clic en <B key="b">Cruzar el saldo inicial</B> y marca en tus libros los movimientos anteriores al período que suman ese saldo: por lo general, tus <a href="#saldos-iniciales" style={link}>saldos iniciales</a>.</>],
              ["Falta explicar el saldo inicial", "En tus libros no hay movimientos de esa cuenta anteriores al período. Registra primero los saldos iniciales de la cuenta y vuelve."],
              ["Este extracto se subió sin saldo inicial", "No se puede poner después. Si lo necesitas, descarta el extracto y súbelo de nuevo escribiendo el saldo inicial."],
              ["El saldo inicial ya viene conciliado", "No es el primer extracto de la cuenta: su saldo inicial es lo que ya conciliaron los extractos anteriores. No hay nada que cruzar."],
            ]}
          />

          <H3 id="registrar-en-libros">Lo que está en el banco y falta en tus libros</H3>
          <P>
            El banco cobra cosas que tú no registraste, como la comisión o el 4×1000, o te abona intereses. En una
            línea del banco sin cruzar, el botón <B>Registrar en libros</B> crea el comprobante que falta sin salir de
            la conciliación:
          </P>
          <Bullets
            items={[
              "Si la línea es plata que sale del banco, se registra un egreso. Si es plata que entra, un recibo de caja.",
              "La fecha, el valor y la cuenta de dinero ya vienen puestos con los del extracto.",
              "Tú escribes el tercero (su NIT o documento y su nombre; en una comisión o en el 4×1000, el banco) y qué es: en un egreso, el concepto del gasto.",
              "La pantalla te da una pista cuando la reconoce: «Parece una comisión del banco», «Parece el 4×1000» o «Parecen intereses».",
              <>Guarda con <B>Guardar egreso</B> o <B>Guardar recibo</B>. El comprobante queda en tus libros y la línea queda lista para que confirmes su cruce.</>,
              "Si queda «en proceso», no lo registres otra vez por otro lado: «Comprobar de nuevo» lo vuelve a enviar tal cual, sin duplicarlo.",
            ]}
          />
          <P>
            Si la fecha de esa línea cae en un período cerrado, regístralo con otra fecha desde{" "}
            <a href="#recibos-y-egresos" style={link}>Egresos o Recibos de caja</a> y crúzalo a mano. Se puede cruzar
            con el extracto si su fecha es hasta 31 días después del final del período, y el resumen lo muestra aparte.
          </P>

          <H3 id="conciliado">El resumen y qué significa «Conciliado»</H3>
          <Table
            head={["Renglón", "Qué es"]}
            rows={[
              ["Saldo en tus libros", "Lo que dice tu contabilidad para esa cuenta al final del período."],
              ["En tus libros y no en el banco", "Lo que registraste y el banco todavía no muestra. Por ejemplo, un cheque sin cobrar o una consignación en camino."],
              ["En el banco y no en tus libros", "Líneas del extracto sin cruzar: falta registrarlas o cruzarlas."],
              ["Registrado después y ya en el banco", "Comprobantes con fecha posterior al período que el banco ya tenía."],
              ["Saldo en el banco", "El saldo final que trae el archivo, o el que escribiste al subir el extracto."],
              ["Diferencia", "Lo que falta por explicar entre tus libros y el banco. Debe quedar en cero."],
            ]}
          />
          <P>
            La conciliación dice <B>«Conciliado»</B> solo cuando se cumplen las dos cosas: la diferencia es cero y no
            queda ninguna línea del extracto sin cruzar (un cruce roto cuenta como sin cruzar). Si la diferencia está
            en cero pero quedan líneas pendientes, sigue en «Sin conciliar» y la pantalla te dice cuántas faltan.
          </P>
          <P>
            Lo que está en tus libros y no en el banco <B>no</B> impide que quede conciliado: un cheque sin cobrar es
            normal en una conciliación terminada.
          </P>

          <H3 id="cerrar-conciliacion">Cerrar, reabrir, descartar y PDF</H3>
          <Table
            head={["Acción", "Qué pasa", "Quién"]}
            rows={[
              [<B key="b">Cerrar la conciliación</B>, "Cerrada ya no se cruza, no se deshace ni se descarta. Si queda una diferencia o líneas pendientes, la pantalla te dice qué queda y te pide confirmar con «Cerrar de todos modos»: queda como «Cerrada con pendientes».", "Propietario y contador."],
              [<B key="b">Reabrir</B>, "Pide escribir el motivo. Vuelve a quedar abierta para cruzar y deshacer, y queda guardado quién la reabrió y por qué.", "Propietario y contador."],
              [<B key="b">Descartar el extracto</B>, "Solo mientras esté abierta. Se quita el extracto con todos sus cruces. Tus libros no cambian: los recibos, egresos y comprobantes siguen como están. Para conciliar ese período hay que subir el archivo de nuevo.", "Quien lleva la conciliación."],
              [<B key="b">Descargar PDF</B>, "El informe de la conciliación: la cuenta, el período, el resumen y lo que quedó pendiente de cada lado. Si se cerró con pendientes, lo dice.", "Quien lleva la conciliación."],
            ]}
          />
        </section>

        <section id="inventario" className="mb-10">
          <H2>Inventario</H2>
          <P>
            El inventario lleva la cuenta de cuánto tienes de cada producto y cuánto te costó: las compras suman, las
            ventas restan, y cada movimiento queda en tu contabilidad. Es un inventario sencillo:{" "}
            <B>una sola bodega</B> y <B>costo promedio</B>.
          </P>
          <Callout type="note" title="Se enciende a pedido, empresa por empresa">
            El inventario es opcional. Si vendes productos y quieres llevar existencias, escríbele a{" "}
            <a href="/docs/soporte" style={link}>soporte</a> y pide que lo enciendan para tu empresa. Necesita la
            contabilidad activada y con los libros en uso. En <strong>Ajustes → Contabilidad → Resumen</strong> ves si
            está «Encendido» o «Apagado». Mientras esté apagado, ninguna pantalla cambia.
          </Callout>

          <H3 id="inventario-producto">Marca qué productos manejan inventario</H3>
          <Steps
            items={[
              <>Abre el producto en <a href="/docs/products" style={link}>Productos</a>. En la sección <B>Inventario</B>, marca <B>Maneja inventario</B>.</>,
              <>Escribe la <B>Unidad</B> (cómo lo cuentas: und, caja, kg…) y, si quieres, la <B>Existencia mínima</B>, para que la pantalla te avise cuando haya menos.</>,
              "Guarda el producto.",
            ]}
          />
          <Bullets
            items={[
              "La marca viene apagada. Un producto sin marca (un servicio, por ejemplo) no mueve inventario.",
              "En un producto con variantes, el inventario se lleva por variante. La unidad y la existencia mínima se aplican a todas al guardar, y después puedes cambiarlas una por una.",
              "Con la marca puesta, la ficha del producto muestra sus Existencias y su Costo promedio, con el enlace «Ver movimientos».",
              "Las existencias de un producto marcado ya no se escriben a mano: las lleva el inventario. Para corregirlas, registra un ajuste.",
              "Mientras un producto tenga existencias no se puede eliminar, quitarle la marca ni pasarlo a «con variantes». Déjalo primero en cero con un ajuste.",
              <>Para cargar con cuánto arrancas de cada producto, usa un <a href="#ajustes-inventario" style={link}>saldo inicial</a>.</>,
            ]}
          />

          <H3 id="inventario-compras">Entradas: la compra con renglones de producto</H3>
          <P>
            Con el inventario encendido, el formulario de <a href="/docs/invoices#purchases" style={link}>Compras</a>{" "}
            tiene el bloque <B>Productos para el inventario</B>. Con <B>Agregar un producto del inventario</B> eliges
            un producto de tu catálogo y escribes la cantidad, el costo de cada uno sin IVA y el IVA del renglón.
          </P>
          <Bullets
            items={[
              "Lo que lleva producto entra al inventario con su cantidad y su costo, y actualiza el costo promedio.",
              "Lo demás de la factura (fletes, servicios, papelería) lo escribes abajo, como siempre: va al concepto de gasto.",
              "Lo que entra al inventario no puede valer más que la compra sin IVA. La pantalla lo dice antes de guardar.",
              "En una orden de compra los renglones quedan guardados y entran al inventario cuando registras la factura de esa orden.",
              "El selector muestra los productos que manejan inventario. Búscalos por nombre o por código.",
              "Una nota crédito del proveedor no lleva renglones de producto: una devolución al proveedor se registra con un ajuste.",
            ]}
          />

          <H3 id="inventario-ventas">Salidas: la venta y su costo</H3>
          <P>
            Al hacer una factura o un documento interno, elige el producto de tu catálogo en cada línea. Si maneja
            inventario, junto a la cantidad ves sus existencias.
          </P>
          <Bullets
            items={[
              <>La venta descuenta las unidades y genera, aparte del comprobante de la venta, un comprobante <B>Costo de la venta (CV)</B>: lo que te costó lo que vendiste, al costo promedio de ese momento.</>,
              <><B>Vender sin existencias se permite, con aviso.</B> Si pides más de lo que hay, la línea lo dice (por ejemplo, «Quedan 3; la venta dejará el inventario en negativo»), pero la venta no se bloquea.</>,
              "Un producto vendido de más queda «En negativo», y esa salida, con «Costo provisional»: el costo se corrige solo cuando entre la compra que falta.",
              "Una factura que nace de una cotización trae el producto de cada ítem. Si el producto tiene variantes y la cotización no dice cuál, la factura te la pide.",
              "Si anulas un documento que sacó productos, las unidades vuelven al costo con que salieron. Si después hubo otros movimientos, o su período ya estaba cerrado, puede quedar un comprobante de costo por la diferencia: no es un error y no hay que corregirlo a mano.",
              "Las notas crédito no mueven el inventario. La devolución de un cliente se registra con un ajuste, con el motivo «Devolución de un cliente».",
            ]}
          />

          <H3 id="inventario-existencias">Existencias</H3>
          <P>
            <B>Facturación → Existencias</B> (grupo «Inventario») muestra cuánto tienes de cada producto, cuánto te
            costó y cuánto vale.
          </P>
          <Bullets
            items={[
              <><B>Columnas:</B> Producto, Existencias, Costo promedio y Valor.</>,
              <><B>Buscar:</B> por nombre o por código.</>,
              <><B>Filtros:</B> «Todos», «Con existencias», «Bajo el mínimo» y «En negativo».</>,
              "Un producto en negativo o por debajo de su existencia mínima lleva su etiqueta.",
              <><B>Ver movimientos</B> abre el kardex del producto.</>,
            ]}
          />

          <H3 id="inventario-contra-libros">El control «Inventario contra libros»</H3>
          <P>
            Arriba de Existencias, la tarjeta <B>Inventario contra libros</B> compara el <B>Valor de tus
            existencias</B> con lo que dice la cuenta de inventario <B>En tus libros</B>, y muestra la{" "}
            <B>Diferencia</B>. La ven el propietario, el contador y el usuario de solo lectura.
          </P>
          <Table
            head={["Lo que dice", "Qué significa"]}
            rows={[
              ["Tu inventario coincide con tus libros", "Lo que valen tus existencias es lo mismo que dice la cuenta de inventario en tu contabilidad."],
              ["Tu inventario no coincide con tus libros", "No es un error del sistema. Suele pasar por un comprobante hecho a mano en la cuenta de inventario, o por un documento que todavía no se ha contabilizado. Revisa los movimientos de la cuenta."],
            ]}
          />
          <P>
            El mismo control sale en la <a href="#revision" style={link}>Revisión</a> del período.
          </P>

          <H3 id="kardex">Kardex: los movimientos de un producto</H3>
          <P>
            El kardex es la historia de un producto. Arriba dice cómo está hoy (Existencias, Costo promedio, Valor y
            Existencia mínima) y abajo, cada movimiento.
          </P>
          <Bullets
            items={[
              <><B>Columnas:</B> Fecha, Documento, Entró, Salió, Costo y Saldo.</>,
              "El documento enlaza a la venta, la compra o el ajuste de donde salió el movimiento. A quien puede ver los libros, cada movimiento le muestra además el enlace a su comprobante.",
              <><B>Filtros:</B> fechas (Desde y Hasta) y orden: «Lo último primero» o «Lo más antiguo primero».</>,
              <><B>Exportar a Excel</B> descarga los movimientos con las fechas elegidas.</>,
              "Etiquetas que puedes ver: «Costo provisional» (salió sin existencias suficientes o sin un costo conocido), «Reversa» (deshace un movimiento anterior porque el documento cambió, se anuló o se eliminó) y «Revertido» (otro movimiento lo deshizo y ya no cuenta).",
            ]}
          />

          <H3 id="ajustes-inventario">Ajustes de inventario y saldo inicial</H3>
          <P>
            En <B>Facturación → Ajustes de inventario</B> registras lo que entra o sale sin una compra ni una venta.
            Los ajustes los registran y los anulan el propietario y el contador; los demás usuarios los pueden ver.
          </P>
          <Table
            head={["Tipo", "Para qué"]}
            rows={[
              [<B key="b">Ajuste</B>, "Corrige las existencias: un conteo, un daño, una pérdida, una devolución."],
              [<B key="b">Saldo inicial</B>, "Carga con cuánto arrancas de cada producto y cuánto te costó."],
            ]}
          />
          <Steps
            items={[
              <>Haz clic en <B>Nuevo ajuste</B> y elige el tipo.</>,
              <>En un ajuste, elige el <B>Motivo</B>: Ajuste por conteo, Daño, Pérdida o faltante, Sobrante, Muestra o regalo, Consumo interno, Devolución de un cliente, Devolución a un proveedor u Otro. Con «Otro» hay que escribir la <B>Nota</B> contando qué pasó.</>,
              <>Escribe la <B>Fecha</B> (no puede ser futura). En un saldo inicial es el día desde el que cuentas con esas existencias.</>,
              <>En <B>Productos</B>, elige cada producto, di si <B>entra</B> (suma existencias) o <B>sale</B> (las resta), y escribe la cantidad. Si entra, escribe también el <B>Costo por unidad</B>, sin IVA. Lo que sale, sale al costo promedio del producto: no hay que escribirlo.</>,
              <>La <B>Cuenta de contrapartida</B> déjala vacía: se usa la que corresponde al motivo. Cámbiala solo si tu contador te lo pide.</>,
              <>Haz clic en <B>Revisar</B>. Todavía no se guarda nada: «Así queda» te muestra, por producto, cuánto había y cuánto queda, el cambio en el valor de tu inventario y cómo queda en tus libros.</>,
              <>Si está bien, haz clic en <B>Guardar</B>. Si cambias algo después de revisar, hay que revisar de nuevo.</>,
            ]}
          />
          <Bullets
            items={[
              "En un saldo inicial todo entra: escribes cuánto tienes de cada producto y cuánto te costó cada unidad.",
              "Las cantidades y los costos se escriben con coma decimal y punto de miles: «18.500» es dieciocho mil quinientos y «1,5» es uno y medio.",
              "Un ajuste lleva máximo 200 productos, y cada producto va una sola vez. Si son más, repártelos en otro ajuste.",
              <>Cada ajuste genera su comprobante, <B>Ajuste de inventario (AI)</B>. No lo genera cuando el valor del inventario no cambia, ni cuando su fecha está cubierta por los saldos iniciales de tu contabilidad, que ya traen ese valor.</>,
              "Estados: «Registrado» (ya cuenta en tus existencias), «En proceso» y «Anulando» (terminan solos en unos momentos) y «Anulado» (conserva su número y ya no cuenta).",
              "Si un ajuste queda en proceso, no lo registres otra vez: «Comprobar de nuevo» pregunta por ese mismo ajuste, sin duplicarlo.",
              "La lista se filtra por «Todos», «Ajustes» y «Saldos iniciales».",
            ]}
          />
          <P>
            <B>Anular un ajuste:</B> en su detalle, haz clic en <B>Anular</B>, escribe el motivo (entre 5 y 300
            caracteres) y confirma con <B>Anular ajuste</B>. Se deshacen sus movimientos y su comprobante sale de tus
            libros. Conserva su número y no se puede deshacer. Si el producto tuvo compras, ventas u otros ajustes
            después, las cantidades vuelven a su sitio pero el costo promedio puede no quedar igual que antes: esa
            diferencia no se pierde, queda en el comprobante del ajuste.
          </P>

          <H3 id="inventario-limites">Lo que el inventario no hace</H3>
          <Bullets
            items={[
              <><B>Varias bodegas o sedes.</B> Hay una sola bodega por empresa.</>,
              <><B>Lotes, fechas de vencimiento y números de serie.</B></>,
              <><B>PEPS u otros métodos de costo.</B> Solo costo promedio.</>,
              <><B>Producción, ensambles o kits.</B> No convierte materias primas en producto terminado.</>,
              <><B>Notas crédito que muevan el inventario.</B> Una devolución se registra con un ajuste.</>,
              <><B>Bloquear la venta sin existencias.</B> Avisa, pero deja vender.</>,
            ]}
          />
        </section>

        <section id="importar" className="mb-10">
          <H2>Importar desde otro software (Siigo)</H2>
          <P>
            Si vienes de otro software contable, en <B>Ajustes → Contabilidad → Importar desde otro software</B> traes
            tu catálogo de cuentas y tus saldos iniciales desde Excel. Hoy el asistente lee los archivos que exporta
            Siigo Nube. Son dos pasos y van en orden: <B>primero el catálogo, después los saldos</B>, porque un saldo
            solo se puede registrar en una cuenta que ya existe.
          </P>
          <Table
            head={["Límite", "Valor"]}
            rows={[
              ["Formato", "Excel .xlsx. Un archivo .xls antiguo hay que abrirlo en Excel y guardarlo como «Libro de Excel (.xlsx)»."],
              ["Tamaño", "Máximo 600 KB. Si pesa más, deja solo la hoja con los datos, sin imágenes ni formatos."],
              ["Contenido", "Máximo 5.000 filas con contenido y 30 columnas."],
              ["Columnas", "Sube el archivo tal como sale, sin cambiarle los títulos de las columnas."],
            ]}
          />
          <P>
            En los dos pasos, primero se <B>revisa</B> (una simulación que no cambia nada) y solo después se importa. El
            archivo se lee en tu navegador y no se guarda en él.
          </P>

          <H3>Paso 1: catálogo de cuentas</H3>
          <Steps
            items={[
              "En Siigo Nube, entra al catálogo de cuentas contables y expórtalo a Excel.",
              <>Elige el archivo y haz clic en <B>Revisar el archivo</B>.</>,
              "Mira el resultado de la simulación (tabla de abajo).",
              <>Haz clic en <B>Importar el catálogo</B> y luego en <B>Seguir con los saldos iniciales</B>.</>,
            ]}
          />
          <Table
            head={["Resultado", "Qué significa"]}
            rows={[
              ["Ya existen", "Cuentas que ya están en tu catálogo. No se tocan."],
              ["Se crean", "Cuentas que faltan. Se crean debajo de la cuenta que corresponde, con el nombre del archivo."],
              ["Se activan", "Cuentas que estaban apagadas en tu catálogo y se encienden."],
              ["Con errores", "Filas que no se pueden importar, por ejemplo porque falta en el archivo la cuenta de la que cuelgan. Puedes corregir el archivo, o importar las demás y repetir después."],
              ["Mismo código, otro nombre", "La cuenta ya existe con otro nombre. No se renombra: se queda con el nombre que tiene hoy."],
            ]}
          />
          <P>
            Puedes repetir la importación del catálogo las veces que quieras: no duplica. Si tu empresa ya tiene su
            catálogo completo aquí, salta este paso con «Ya tengo mi catálogo, ir a los saldos».
          </P>

          <H3>Paso 2: saldos iniciales</H3>
          <Steps
            items={[
              "En Siigo Nube, genera el balance de prueba por tercero hasta la fecha de corte y expórtalo a Excel.",
              <>Elige el archivo y la <B>Fecha de corte</B>: el último día que llevaste en tu otro software. No puede ser futura ni caer en un período cerrado.</>,
              <>En <B>Columna que se toma</B>, deja «Saldo final» (lo usual). Elige «Saldo inicial» solo si tu archivo trae en esa columna los saldos con los que quieres empezar.</>,
              <>Haz clic en <B>Revisar el archivo</B> y mira el resultado.</>,
              <>Si no hay errores, haz clic en <B>Importar los saldos iniciales</B>.</>,
            ]}
          />
          <Table
            head={["Resultado", "Qué significa"]}
            rows={[
              ["Saldos leídos", "Cuántos saldos trae el archivo."],
              ["Débitos", "Lo que tienes o te deben (saldos positivos)."],
              ["Créditos", "Lo que debes (saldos negativos)."],
              ["Diferencia", "Si el archivo no cuadra solo, la diferencia se registra en la cuenta de apertura. Revisa con tu contador si es lo esperado."],
              ["Cuentas que faltan", "Cuentas del archivo que no están en tu catálogo. Vuelve al paso 1 e importa primero el catálogo."],
              ["Filas con errores", "Dice la fila, la cuenta y el problema. Corrige el archivo y elígelo de nuevo."],
              ["Avisos", "Observaciones sobre el archivo (por ejemplo, subtotales que no coinciden). No impiden importar."],
            ]}
          />
          <Bullets
            items={[
              "Los saldos solo se registran si todo el archivo está bien: con una fila mala o una cuenta que falta no se importa nada.",
              "Cada saldo queda en su cuenta y su tercero, en uno o varios comprobantes de apertura. Al terminar, la pantalla te da el enlace a cada uno y al balance de prueba.",
              "La cartera y las cuentas por pagar que venían de antes entran como saldo por tercero, no factura por factura. Se cobran o se pagan después con un recibo o un egreso, usando el concepto «Otra cuenta».",
              "Si intentas importar otra vez el mismo archivo con la misma fecha, la pantalla te avisa antes para que no queden duplicados.",
            ]}
          />
        </section>

        <section id="libros" className="mb-10">
          <H2>Libros</H2>
          <P>
            <B>Contabilidad → Balance de prueba</B> muestra cuánto hay en cada cuenta en el período que elijas. Desde
            ahí llegas a los auxiliares. El <a href="#diario-y-mayor" style={link}>libro diario y el mayor y
            balances</a> tienen su propia entrada en el menú. Los libros los ven el propietario, el contador y el
            usuario de solo lectura.
          </P>
          <H3>Balance de prueba</H3>
          <Bullets
            items={[
              <><B>Fechas:</B> Desde y Hasta, o los atajos «Este mes», «Mes pasado» y «Este año».</>,
              <><B>Qué tanto detalle:</B> desde «Solo lo general» (activo, pasivo, patrimonio, ingresos, gastos) hasta «Todo el detalle», pasando por grupos, cuentas, subcuentas y auxiliares.</>,
              <><B>Ver por tercero:</B> abre cada cuenta por cliente o proveedor.</>,
              <><B>Columnas:</B> Código, Cuenta, Saldo inicial, Débitos, Créditos y Saldo final, con los totales al final.</>,
              "Abajo dice si cuadra. Si no cuadra, muestra la diferencia para que revises los comprobantes del período con tu contador.",
            ]}
          />
          <H3>Auxiliares por cuenta y por tercero</H3>
          <P>
            El <B>auxiliar por cuenta</B> muestra todos los movimientos de una cuenta, con el saldo al empezar y al
            terminar el período. El <B>auxiliar por tercero</B> muestra todos los movimientos de un cliente o
            proveedor, cuenta por cuenta. Un auxiliar consulta máximo 366 días seguidos; para más, consulta el período
            por partes.
          </P>
          <H3>De cada cifra a su origen</H3>
          <Steps
            items={[
              "En el balance de prueba, toca una cuenta: se abre su auxiliar.",
              "En el auxiliar, toca un tercero para ver solo sus movimientos, o un movimiento («Ver comprobante») para abrir su comprobante.",
              "En el comprobante, «De dónde salió» te lleva a la factura, el documento interno, la nota, la compra, el recibo de caja, el egreso, la transferencia o el ajuste de inventario.",
            ]}
          />
          <H3>Exportar a Excel</H3>
          <P>
            El balance de prueba y los dos auxiliares tienen el botón <B>Exportar a Excel</B>, que descarga lo que
            estás viendo con las fechas y los filtros elegidos.
          </P>

          <H3 id="diario-y-mayor">Libro diario y mayor y balances</H3>
          <P>
            Son dos libros más, cada uno con su entrada en el menú Contabilidad. Los ven el propietario, el contador
            y el usuario de solo lectura.
          </P>
          <Table
            head={["Libro", "Dónde", "Qué muestra"]}
            rows={[
              ["Libro diario", <>Contabilidad → <B key="b">Libro diario</B></>, "Todos los comprobantes del período, día por día, cada uno con sus líneas (cuenta, tercero, descripción, débito y crédito). Trae el subtotal de cada día y el total de débitos y de créditos del período."],
              ["Mayor y balances", <>Contabilidad → <B key="b">Mayor y balances</B></>, "Cada cuenta, agrupada por clase, con tres datos: el saldo anterior, el movimiento del período y el saldo nuevo."],
            ]}
          />
          <Bullets
            items={[
              "El libro diario consulta máximo 366 días seguidos. Si eliges un rango más largo, la pantalla te propone las partes para verlo.",
              <>En el libro diario puedes ver un solo tipo de comprobante (viene en «Todos los tipos»). Cada comprobante lleva a su detalle, y <B>Cargar más</B> trae los siguientes.</>,
              "En mayor y balances, toca una cuenta para ver sus movimientos del período en su auxiliar.",
              <>Los dos tienen <B>Exportar a Excel</B>. El Excel del libro diario trae el período completo, no solo lo que alcanzaste a cargar en pantalla.</>,
            ]}
          />
        </section>

        <section id="estados-financieros" className="mb-10">
          <H2>Estados financieros: balance general y estado de resultados</H2>
          <P>
            Están en <B>Contabilidad → Estados financieros</B>. Abre el <B>Balance general</B>, y con las pestañas de
            arriba pasas al <B>Estado de resultados</B>. Los ven el propietario, el contador y el usuario de solo
            lectura. Salen de los mismos
            comprobantes que el balance de prueba: no se digitan ni se guardan, se arman cada vez que los consultas.
          </P>
          <Callout type="note" title="No son los informes de Facturación">
            Los estados financieros <strong>salen de la contabilidad</strong> (los comprobantes). Los informes de{" "}
            <a href="/docs/invoices#reports" style={link}>Facturación → Informes de gestión</a> son gerenciales: salen
            de tus documentos y sirven para el día a día. Las cifras de unos y otros{" "}
            <a href="#por-que-difieren" style={link}>pueden diferir, y es normal</a>. En Informes de gestión, quien
            puede ver los estados encuentra el enlace «Ver los estados financieros».
          </Callout>

          <H3 id="balance-general">Balance general</H3>
          <Bullets
            items={[
              <>Elige la <B>Fecha de corte</B>. Muestra el activo, el pasivo y el patrimonio a ese día, con sus cuentas y totales.</>,
              <><B>Comparar con otra fecha:</B> márcalo y elige la fecha. Cada cifra muestra el valor de las dos fechas y el cambio.</>,
              <><B>Nivel de detalle:</B> de «Grupos (2 dígitos)» a los auxiliares. Abre en «Cuentas (4 dígitos)».</>,
              <>Mientras el año no esté cerrado, el patrimonio trae la fila <B>«Resultado del ejercicio»</B>: los ingresos menos los costos y gastos del año, que todavía no se han llevado al patrimonio. Cuando <a href="#cierre-anual" style={link}>cierras el año</a>, ese resultado pasa a la cuenta de utilidad o de pérdida y la fila queda en cero. El total es el mismo.</>,
              "Si hay años anteriores sin cerrar, su resultado sale en otra fila aparte, que se va cuando cierras esos años.",
              <>Si el activo no es igual al pasivo más el patrimonio, un aviso rojo muestra la diferencia, con el enlace <B>Revisar el balance de prueba</B>.</>,
            ]}
          />

          <H3 id="estado-de-resultados">Estado de resultados</H3>
          <P>Elige el período (desde y hasta). Muestra, en este orden:</P>
          <Table
            head={["Renglón", "Qué es"]}
            rows={[
              ["Ingresos operacionales", "Lo que vendiste."],
              ["Devoluciones en ventas", "Se restan de los ingresos."],
              [<B key="b">Ingresos netos</B>, "Ingresos menos devoluciones."],
              ["Costo de ventas", "Lo que costó lo que vendiste."],
              [<B key="b">Utilidad bruta</B>, "Ingresos netos menos costo de ventas."],
              ["Gastos de administración y gastos de ventas", "Los gastos de operar el negocio."],
              [<B key="b">Utilidad operacional</B>, "Utilidad bruta menos esos gastos."],
              ["Ingresos y gastos no operacionales", "Lo que no es del negocio principal. Por ejemplo, intereses o gastos bancarios."],
              [<B key="b">Utilidad antes de impuestos</B>, "Utilidad operacional más los ingresos y menos los gastos no operacionales."],
              ["Impuesto de renta", "Lo que esté registrado en su cuenta. No se calcula solo."],
              [<B key="b">Utilidad neta</B>, "El resultado del período."],
            ]}
          />
          <Bullets
            items={[
              <><B>Comparar con:</B> viene en «El período anterior» (el inmediatamente anterior, del mismo largo). Puedes elegir «Otro período» y escribir sus fechas, o «No comparar».</>,
              "Los renglones que restan dicen «Menos:».",
              "Cerrar el año no cambia el estado de resultados de ese año: el comprobante de cierre no se cuenta.",
              "La utilidad neta del año es la misma cifra que el «Resultado del ejercicio» del balance al 31 de diciembre y la que el cierre lleva al patrimonio.",
            ]}
          />

          <H3 id="estados-detalle">De cada cifra a su auxiliar, Excel y PDF</H3>
          <Bullets
            items={[
              <><B>Cada cifra abre su auxiliar:</B> toca una cuenta o su valor y se abre el <a href="#libros" style={link}>auxiliar de esa cuenta</a> con las mismas fechas. Desde ahí llegas al comprobante y al documento de origen.</>,
              "Las filas calculadas (los totales, el «Resultado del ejercicio») no son cuentas: no abren un auxiliar y llevan su explicación.",
              "Los valores negativos van entre paréntesis.",
              <><B>Excel</B> y <B>PDF:</B> los dos botones descargan lo mismo que estás viendo, con las fechas, la comparación y el nivel de detalle elegidos.</>,
              <><B>Firmas en el PDF:</B> al pie salen el representante legal y el contador que escribiste en <a href="#firmantes" style={link}>Ajustes → Contabilidad → Documentos y numeración</a>. Lo que dejes vacío sale en blanco para firmar a mano.</>,
            ]}
          />

          <H3 id="por-que-difieren">Por qué pueden diferir de los informes de Facturación</H3>
          <P>
            Son dos familias distintas y las dos siguen existiendo. Los estados financieros son para tu contador, el
            banco o tus socios. Los informes de gestión de Facturación son para ti, para ver cómo va el negocio.
          </P>
          <Table
            head={["", "Estados financieros (Contabilidad)", "Informes de gestión (Facturación)"]}
            rows={[
              ["De dónde salen", "De los comprobantes de la contabilidad.", "De tus facturas, notas y compras."],
              ["El gasto", "Va sin IVA: el IVA que puedes descontar no es gasto, es un saldo a tu favor.", "Va con IVA."],
              ["Comprobantes manuales (nómina, depreciación, ajustes) y saldos iniciales", "Entran.", "No existen para el informe."],
              ["Retenciones que te hizo el cliente", "Van en el día en que las registraste.", "Van en el mes de la factura."],
              ["Lo que cobras para un tercero", "No cuenta como ingreso tuyo.", "Depende del informe."],
              ["Cartera", "Incluye las notas débito.", "No las incluye."],
              ["Bancos y recaudo", "Solo cuentan los pagos de documentos que fueron venta y siguen vigentes.", "Cuenta también abonos de documentos anulados o que no llegaron a ser venta."],
              ["Balance general", "Sí.", "No tiene."],
              ["Necesita la contabilidad activada", "Sí.", "No."],
            ]}
          />
          <P>
            Por todo eso, la «utilidad» de un informe gerencial y la de los estados financieros pueden no ser la misma
            cifra. La que vale para entregarle a un tercero es la de los estados financieros. En un mes en que tus
            documentos solo llevan IVA y no hay nada de lo anterior, las dos coinciden.
          </P>
        </section>

        <section id="revision" className="mb-10">
          <H2>Revisión</H2>
          <P>
            <B>Contabilidad → Revisión</B> reúne los controles para saber si tus libros están bien antes de cerrar un
            período. Eliges las fechas (abre con el mes en curso; máximo 366 días) y la pantalla corre ocho controles.
            Arriba los resume en una frase, por ejemplo «2 para revisar · 6 sin novedades». La ven el propietario, el
            contador y el usuario de solo lectura.
          </P>
          <Callout type="note" title="La revisión avisa, no cambia nada">
            Revisar un período no modifica ningún comprobante ni impide cerrar. Cada control te dice qué encontró y te
            da el enlace para ir a mirarlo: la corrección la decides tú con tu contador.
          </Callout>
          <P>Cada control sale con uno de estos resultados:</P>
          <Table
            head={["Resultado", "Qué significa"]}
            rows={[
              ["Sin novedades", "El control no encontró nada."],
              ["Para revisar", "Encontró algo que conviene mirar. No siempre es un error."],
              ["Informativo", "Solo te cuenta algo, sin pedirte nada."],
              ["No aplica", "El control no corre en tu empresa. Por ejemplo, el de inventario si no lo tienes encendido."],
              ["No se pudo calcular", "Ese control falló esta vez; los demás sí se calcularon. Intenta de nuevo en un momento."],
            ]}
          />

          <H3 id="controles">Los ocho controles</H3>
          <Table
            head={["Control", "Qué mira", "Qué hacer si avisa"]}
            rows={[
              [<B key="b">Documentos en los libros</B>, "Si todas tus ventas, compras y pagos ya tienen su comprobante.", <>Te lista lo que falta, con el enlace a cada documento. Entra con «Ir a Comprobantes» y usa <B>Sincronizar ahora</B>. Si un documento no se pudo contabilizar, ábrelo y corrige lo que dice el aviso.</>],
              [<B key="b">Saldos al revés</B>, "Si alguna cuenta quedó con el saldo contrario al que debería tener. Por ejemplo, un banco con saldo negativo.", "Abre «Ver sus movimientos» y busca con tu contador el movimiento que la dejó así: suele ser algo registrado en la cuenta equivocada, o un ingreso que falta registrar."],
              [<B key="b">Lo que te deben</B>, "Si la cartera, factura por factura, coincide con la cuenta de clientes en los libros.", "Te muestra las dos cifras, la diferencia y los clientes donde está, cada uno con «Ver su auxiliar». Lee las notas del control: los saldos iniciales, los comprobantes hechos a mano y los anticipos explican diferencias que no son errores."],
              [<B key="b">Lo que debes</B>, "Lo mismo con tus proveedores: lo que debes, compra por compra, contra la cuenta de proveedores.", "Igual que el anterior. Además avisa si hay compras marcadas como pagadas sin un egreso: su pago no está en los libros. Págalas con un egreso desde «Ir a Egresos»."],
              [<B key="b">Saltos de numeración</B>, "Si falta algún número en tus comprobantes, recibos o egresos.", "Te dice qué números faltan de cada tipo. Con «Ver los de este tipo» abres la lista, incluidos los anulados, para revisarla con tu contador."],
              [<B key="b">Posibles repetidos</B>, "Comprobantes hechos a mano con las mismas líneas y la misma fecha, recibos o egresos con el mismo tercero, fecha, valor y cuenta, y compras con el mismo proveedor y el mismo número.", "Abre cada uno y compáralos. Puede que estén bien: míralos antes de anular algo."],
              [<B key="b">Comprobantes hechos a mano</B>, "Qué se registró a mano en el período, por tipo y uno por uno.", "Nada, si los reconoces. Es la lista que tu contador querrá ver antes de cerrar."],
              [<B key="b">Inventario contra libros</B>, "Si el valor de tu inventario coincide con su cuenta en los libros.", <>Mira <a key="a" href="#inventario-contra-libros" style={link}>qué significa la diferencia</a>. Tiene los enlaces «Ir a Existencias» y «Ver la cuenta en los libros».</>],
            ]}
          />
          <Bullets
            items={[
              "Cuando una lista es muy larga, el control muestra los primeros y avisa que hay más.",
              <>El mismo resultado, resumido, aparece en <a href="#periodos" style={link}>Ajustes → Contabilidad → Períodos y cierre</a> cuando vas a subir la fecha de cierre.</>,
            ]}
          />

          <H3 id="registro-de-cambios">Registro de cambios: quién hizo qué</H3>
          <P>
            En la misma pantalla, la pestaña <B>Registro de cambios</B> muestra lo que se ha hecho en tu contabilidad
            y quién lo hizo. La ven solo el propietario y el contador.
          </P>
          <Bullets
            items={[
              <><B>Columnas:</B> Fecha, Persona, Acción, Documento y Detalle. Cuando hay un documento, su número lleva a él.</>,
              <><B>Qué queda registrado:</B> crear y anular comprobantes, recibos, egresos, transferencias y ajustes de inventario; los saldos iniciales; cerrar y reabrir el año; los cambios en la configuración, las cuentas, los bancos y cajas y los conceptos; las importaciones; y lo que pasa en una conciliación (subir un extracto, cruzar, deshacer, cerrar, reabrir y descartar).</>,
              <><B>Detalle:</B> en una anulación trae el motivo, y en un cambio de configuración, el valor de antes y el de ahora.</>,
              <><B>Persona:</B> el nombre de quien lo hizo. Si entró por una integración, dice «por la API» o «por un asistente (MCP)».</>,
              <><B>Filtros:</B> Desde, Hasta, Acción y Persona. <B>Cargar más</B> trae los siguientes.</>,
              <><B>Exportar a Excel</B> descarga el registro con los filtros elegidos.</>,
              "Cada cambio queda guardado y no se puede editar ni borrar.",
            ]}
          />
        </section>

        <section id="impuestos" className="mb-10">
          <H2>Impuestos: los borradores para tu contador</H2>
          <P>
            <B>Contabilidad → Impuestos</B> arma, con tus ventas y tus compras, el borrador de tres declaraciones: el{" "}
            <B>IVA</B> (formulario 300), la <B>retención en la fuente</B> (formulario 350) y, si tu empresa está en el
            Régimen Simple, el <B>anticipo bimestral del Simple</B>. Los ven el propietario, el contador y el usuario de
            solo lectura.
          </P>
          <Callout type="note" title="Es un borrador: FusionCRM no presenta la declaración">
            Las cifras son para que tu contador las revise y diligencie el formulario en el portal de la DIAN. Nada de
            esta pantalla se envía a la DIAN ni genera comprobantes.
          </Callout>
          <H3 id="impuestos-borrador">Cómo leer un borrador</H3>
          <Table
            head={["Parte", "Qué muestra"]}
            rows={[
              ["Fechas", "Eliges el rango que quieras. Hay atajos: bimestres, cuatrimestres y año para el IVA; meses para la retención; bimestres para el Simple."],
              ["Renglones", "El número de renglón del formulario, el valor exacto y el valor del formulario, aproximado al múltiplo de mil más cercano."],
              ["Documentos", "Un renglón con movimientos dice cuántos documentos lo forman. Al abrirlo ves cada factura o compra con su base, su tarifa y su impuesto, y el enlace al documento y a su comprobante."],
              ["Cruce contra tus libros", "Compara el borrador con lo registrado en cada cuenta de impuestos. Si coinciden lo dice; si no, te muestra la diferencia y el enlace al auxiliar."],
              ["Avisos", "Arriba, en lenguaje llano: compras con la tarifa de IVA sin confirmar, documentos que todavía no están en la contabilidad o movimientos manuales que están en los libros y no en el borrador."],
              ["Excel y PDF", "Los dos botones de arriba descargan el borrador para enviárselo a tu contador."],
            ]}
          />
          <H3 id="impuestos-presentada">Marcar como presentada y saldo a favor</H3>
          <P>
            Cuando tu contador presente la declaración, pulsa <B>Marcar como presentada</B> (el número del formulario y
            la fecha son opcionales). Guardamos una copia de esas cifras. Si después cambia algún documento del período,
            la pantalla te avisa renglón por renglón qué cambió frente a lo presentado. En el IVA, el saldo a favor de un
            período presentado pasa solo al período siguiente. Marcar no cambia tus libros y se puede <B>Deshacer</B>{" "}
            escribiendo el motivo, que queda en el registro de cambios. Solo marcan y deshacen el propietario y el
            contador.
          </P>
          <H3 id="impuestos-compras">La tarifa de IVA de cada compra</H3>
          <P>
            Para armar el borrador de IVA, cada compra lleva renglones con su tarifa: 19 %, 5 %, exento, excluido u
            otra. El IVA de cada renglón se calcula solo y el total de la compra es la suma. Una compra que nace de una
            factura recibida trae los renglones y las tarifas de la factura. Una compra anterior, guardada sin tarifa,
            abre con la tarifa que dedujimos de sus valores y la marca <B>«Tarifa sin confirmar»</B>: revísala y
            confírmala. Esto aplica a las empresas con la contabilidad encendida; en las demás, el formulario de compra
            no cambia.
          </P>
          <H3 id="impuestos-ajustes">Lo que se configura</H3>
          <Bullets
            items={[
              <><B>Ajustes → Contabilidad → Impuestos:</B> si tu empresa está en el Régimen Simple (se detecta de tu facturación electrónica o lo eliges tú), tu grupo de actividad, la tarifa de ICA por mil y, si empezaste con un saldo a favor de IVA, su valor y su fecha.</>,
              <><B>Ajustes → Retenciones:</B> a qué concepto del formulario 350 corresponde cada concepto de retención y, si quieres, la cuenta contable de cada uno.</>,
              <><B>Conceptos de gasto:</B> si cada concepto es de bienes o de servicios, porque el formulario de IVA los separa.</>,
            ]}
          />
          <H3 id="impuestos-limites">Lo que los borradores no calculan</H3>
          <Bullets
            items={[
              <>Importaciones, AIU, IVA no descontable, retenciones asumidas y sanciones, en el IVA.</>,
              <>Autorretenciones y retenciones de nómina, en la retención en la fuente.</>,
              <>La tabla de tarifas del Simple es la general por grupo y tramo: tu contador debe validarla para tu actividad antes de pagar.</>,
              <>El ICA de varios municipios, el calendario tributario y la información exógena.</>,
            ]}
          />
        </section>

        <section id="cierre-anual" className="mb-10">
          <H2>Cierre del año</H2>
          <P>
            El año contable es el año calendario. Cerrarlo es dejar en cero las cuentas de ingresos, costos y gastos
            y llevar el resultado del año al patrimonio, para que el año siguiente empiece limpio. Está en{" "}
            <B>Contabilidad → Cierre del año</B>, y lo hacen el propietario y el contador. El usuario de solo lectura
            puede ver la pantalla, sin cerrar ni reabrir. Antes de cerrar, pasa por la{" "}
            <a href="#revision" style={link}>Revisión</a> del año.
          </P>

          <H3>Qué hace el cierre</H3>
          <Bullets
            items={[
              <>Genera un <B>comprobante de cierre (CI)</B> con fecha 31 de diciembre, que cancela el saldo de cada cuenta de ingresos, costos y gastos.</>,
              <>Si el año dio <B>utilidad</B>, la lleva a la cuenta <B>360505</B> (utilidad del ejercicio). Si dio <B>pérdida</B>, a la <B>361005</B> (pérdida del ejercicio).</>,
              "Deja la fecha de cierre en el 31 de diciembre de ese año, si estaba antes.",
              "No genera un comprobante de apertura: las cuentas de balance (activo, pasivo y patrimonio) siguen con su saldo, y los ingresos, costos y gastos arrancan en cero el 1 de enero.",
              "Si el año no tuvo ingresos, costos ni gastos, se cierra sin comprobante.",
            ]}
          />

          <H3 id="cerrar-el-anio">Cerrar un año, paso a paso</H3>
          <Steps
            items={[
              <>Entra a <B>Contabilidad → Cierre del año</B>. Arriba ves el <B>año por cerrar</B>.</>,
              <>Si falta algo, aparece la lista <B>Lo que falta para poder cerrarlo</B>, cada punto con el enlace a donde se arregla (tabla de abajo).</>,
              <>Haz clic en <B>Simular el cierre</B>. No se guarda nada: ves si el año deja utilidad o pérdida y de cuánto, a qué cuenta va, el comprobante de cierre línea por línea y cómo queda la fecha de cierre.</>,
              <>Si está bien, haz clic en <B>Cerrar el año</B> (el botón dice el año, por ejemplo «Cerrar el año 2025»). Para confirmar hay que <B>escribir el año</B>.</>,
              "El año queda en la lista de cierres, con su comprobante de cierre enlazado, quién lo cerró y cuándo.",
            ]}
          />
          <Table
            head={["Lo que falta", "Dónde se arregla"]}
            rows={[
              ["El año todavía no ha terminado", "Se puede cerrar desde el 1 de enero siguiente."],
              ["Hay un año anterior con movimientos que sigue abierto", "Ciérralo primero: los años se cierran en orden."],
              ["Hay documentos que todavía no están en la contabilidad", <>Con el enlace <B key="b">Ir a Libros y sincronizar</B>.</>],
              ["Hay documentos que no se pudieron contabilizar", <>Con el enlace <B key="b">Ver las alertas en Libros</B>: revisa por qué y corrígelos.</>],
              ["Los libros no cuadran al 31 de diciembre", <>Con el enlace <B key="b">Revisar el balance de prueba</B>.</>],
            ]}
          />
          <Bullets
            items={[
              "El botón de cerrar solo aparece con una simulación a la vista. Si algo cambió desde que simulaste, la pantalla te pide simular de nuevo.",
              <><B>Si el cierre «quedó a medias»</B> (por ejemplo, se cayó la conexión), no lo repitas por tu cuenta. La pantalla te da dos salidas: <B>Comprobar de nuevo</B>, que envía exactamente lo mismo y lo termina o lo confirma, o <B>Reabrir el año</B>, que descarta lo que alcanzó a quedar.</>,
              "Si dice «Intenta de nuevo en un momento», la contabilidad se está poniendo al día: no se escribió nada y basta con volver a intentarlo.",
            ]}
          />

          <H3>Qué queda bloqueado</H3>
          <P>En un año cerrado:</P>
          <Bullets
            items={[
              "No se registran comprobantes manuales, recibos de caja, egresos ni transferencias con fecha en ese año.",
              "No se anulan los recibos, egresos, transferencias ni comprobantes manuales de ese año.",
              "El comprobante de cierre no se anula por separado: solo se deshace reabriendo el año.",
              "La fecha de cierre no se puede bajar del 31 de diciembre de ese año, ni quitar.",
              "Si después corriges o anulas una factura o una compra de ese año, la diferencia se registra con un ajuste en el primer día abierto. Ese ajuste cuenta para el año siguiente; el año cerrado no se mueve.",
            ]}
          />

          <H3 id="reabrir-el-anio">Reabrir un año</H3>
          <Bullets
            items={[
              <><B>Solo se reabre el último año cerrado.</B></>,
              <>En la lista de cierres, usa <B>Reabrir el año</B> y escribe el <B>Motivo</B> (entre 3 y 300 caracteres). Queda guardado quién lo reabrió, cuándo y por qué.</>,
              "Al reabrir se anula el comprobante de cierre (conserva su número y sale de los libros) y la fecha de cierre vuelve a donde estaba antes de cerrar. La pantalla te dice qué se anuló y a dónde volvió la fecha.",
              "El año queda abierto para corregirlo y volver a cerrarlo. Al cerrarlo otra vez se genera un comprobante de cierre nuevo, con número nuevo.",
            ]}
          />

          <H3 id="fecha-de-cierre">Período cerrado y año cerrado no son lo mismo</H3>
          <P>
            Los dos impiden registrar o anular con esa fecha, pero se destraban distinto. Cuando algo no se puede
            guardar o anular por la fecha, la pantalla te dice cuál de los dos es:
          </P>
          <Table
            head={["", "Período cerrado", "Año cerrado"]}
            rows={[
              ["Qué es", <>La <a key="a" href="#periodos" style={link}>fecha de cierre</a>: todo lo de ese día y de antes queda quieto. Es como se cierra un mes.</>, "El cierre del año, con su comprobante de cierre."],
              ["Dónde se hace", <><B key="b">Ajustes → Contabilidad → Períodos y cierre</B></>, <><B key="b">Contabilidad → Cierre del año</B></>],
              ["Cómo se destraba", "Cambiando la fecha de cierre. Para bajarla o quitarla hay que escribir el motivo.", "Reabriendo el año, con motivo. Solo el último año cerrado."],
              ["Qué dice la pantalla", "«El período está cerrado hasta el…», con el enlace «Ir a Períodos».", "«El año … está cerrado», con el enlace «Ir a Cierre del año»."],
            ]}
          />
          <P>
            Las dos cosas las hacen el propietario y el contador. A los demás usuarios la pantalla les dice que se lo
            pidan a uno de ellos. Si no hace falta esa fecha exacta, lo más simple es registrar con una fecha
            posterior al cierre.
          </P>
        </section>

        <section id="roles" className="mb-10">
          <H2>Quién puede hacer qué</H2>
          <P>
            La regla general: el <B>propietario</B> y el <B>contador</B> llevan los libros; el <B>empleado</B> cobra,
            paga y concilia, pero no ve los libros; y el <B>usuario de solo lectura</B> (el rol Lector) consulta y
            descarga todo lo contable, sin crear, cambiar ni anular nada.
          </P>
          <Table
            head={["Qué", "Propietario y contador", "Empleado", "Usuario de solo lectura"]}
            rows={[
              ["Configurar la contabilidad en Ajustes (cuentas, bancos y caja, períodos, documentos y numeración, preferencias, importar)", "Sí", "No", "No"],
              ["Ver comprobantes, catálogo, balance de prueba, auxiliares, libro diario y mayor y balances, y descargar su Excel y su PDF", "Sí", "No", "Sí"],
              ["Ver los estados financieros, la Revisión y el Cierre del año", "Sí", "No", "Sí"],
              ["Ver el Registro de cambios", "Sí", "No", "No"],
              ["Registrar y anular comprobantes manuales y saldos iniciales", "Sí", "No", "No"],
              ["Cerrar períodos, y simular, cerrar y reabrir el año", "Sí", "No", "No"],
              ["Ver recibos, egresos, transferencias y conciliaciones, y descargar sus PDF", "Sí", "Sí", "Sí"],
              ["Registrar y anular recibos de caja, egresos y transferencias", "Sí", "Sí", "No"],
              ["Ver el comprobante contable de un recibo, un egreso o una transferencia, y el «PDF con cuentas contables»", "Sí", "No", "Sí"],
              ["Conciliación bancaria: subir extractos, cruzar, deshacer y «Registrar en libros»", "Sí", "Sí", "No"],
              ["Cerrar y reabrir una conciliación", "Sí", "No", "No"],
              ["«Registrar pago» en una factura y «Registrar el pago» de una compra", "Sí", "Sí", "No"],
              ["Abrir «Contabilidad de este documento» en una factura o una compra", "Sí", "Sí, sin la sección de comprobantes", "Sí"],
              ["Inventario: ver existencias, kardex y ajustes, y descargar el Excel del kardex", "Sí", "Sí", "Sí"],
              ["Ver la tarjeta «Inventario contra libros»", "Sí", "No", "Sí"],
              ["Marcar «Maneja inventario» en un producto, con su unidad y su existencia mínima", "Sí", "Sí", "No"],
              ["Registrar y anular ajustes de inventario y saldos iniciales de inventario", "Sí", "No", "No"],
              ["Cambiar la numeración del documento interno", "Sí", "No", "No"],
            ]}
          />
          <P>Lo que ve cada uno en el menú:</P>
          <Bullets
            items={[
              <><B>Empleado:</B> en Facturación ve «Cobros y pagos» (Recibos de caja, Egresos, Transferencias y Conciliación bancaria) e «Inventario». No ve el menú Contabilidad.</>,
              <><B>Usuario de solo lectura:</B> ve lo mismo y, además, el menú Contabilidad, menos «Saldos iniciales» y «Ajustes de contabilidad». No le aparecen los botones de crear, guardar, anular, cerrar, «Registrar en libros» ni «Sincronizar ahora». Si abre un formulario por un enlace, la pantalla le dice «No disponible para tu rol».</>,
              <><B>Contador:</B> además de la contabilidad, entra a <B>Productos</B> para marcar «Maneja inventario» (edita productos, pero no los crea ni los elimina), configura <B>Retenciones</B> en Ajustes → Contabilidad y ve <B>Facturación electrónica</B> en solo lectura: puede consultar la resolución y la numeración, pero las cambia el propietario.</>,
            ]}
          />
          <P>
            Los roles se explican en <a href="/docs/settings#users" style={link}>Configuración → Usuarios</a>.
          </P>
        </section>

        <section id="pendiente" className="mb-10">
          <H2>Lo que todavía no hay</H2>
          <P>
            Para que no lo busques, esto todavía no existe en la contabilidad de FusionCRM:
          </P>
          <Bullets
            items={[
              <><B>Retenciones dentro del recibo de caja.</B> Las retenciones del cliente se anotan en la factura con «Aplicar retenciones», no en el recibo.</>,
              <><B>Cruzar un anticipo contra una factura posterior.</B> El anticipo queda registrado, pero todavía no se puede aplicar después a una factura desde el recibo.</>,
              <><B>Conexión directa con el banco.</B> Los movimientos del banco no se traen solos: el extracto lo descargas y lo subes tú.</>,
              <><B>Conciliación automática.</B> La pantalla sugiere los cruces, pero cada uno lo confirma una persona.</>,
              <><B>Inventario con varias bodegas, lotes, series o producción.</B> El inventario es de una sola bodega y costo promedio: mira <a href="#inventario-limites" style={link}>lo que no hace</a>.</>,
              <><B>Un rol de auxiliar contable.</B> No hay un rol intermedio que registre comprobantes sin ser propietario ni contador. Hoy los libros los escriben solo ellos dos.</>,
              <><B>Anular un recibo por la API o por un asistente.</B> Un recibo se anula desde la web.</>,
              <><B>Presentar impuestos.</B> Los <a href="#impuestos" style={link}>borradores de IVA, retención y Simple</a> son para tu contador: FusionCRM no presenta declaraciones ante la DIAN ni arma la de renta.</>,
              <><B>Nómina.</B> No se liquida ni se contabiliza sola.</>,
            ]}
          />
          <P>
            Si necesitas alguno, cuéntale a <a href="/docs/soporte" style={link}>soporte</a>.
          </P>
        </section>

        <DocNav
          prev={{ href: "/docs/alta-dian", title: "Alta en la DIAN y documento soporte" }}
          next={{ href: "/docs/products", title: "Productos" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
