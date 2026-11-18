import type { Metadata } from "next";
import type { ReactNode } from "react";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "Contabilidad: comprobantes, recibos de caja, egresos y libros",
  description:
    "Lleva la contabilidad de tu empresa en el CRM: catálogo de cuentas, comprobantes automáticos, recibos de caja, comprobantes de egreso, importación desde Siigo y libros con balance de prueba.",
  keywords: ["contabilidad", "catálogo de cuentas", "PUC", "comprobantes contables", "recibo de caja", "comprobante de egreso", "balance de prueba", "auxiliar por tercero", "saldos iniciales", "importar desde Siigo"],
  alternates: { canonical: "/docs/contabilidad" },
  openGraph: {
    title: "Contabilidad: comprobantes, recibos de caja, egresos y libros",
    description:
      "Lleva la contabilidad de tu empresa en el CRM: catálogo de cuentas, comprobantes automáticos, recibos de caja, comprobantes de egreso, importación desde Siigo y libros con balance de prueba.",
    url: "/docs/contabilidad",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

const toc = [
  { id: "overview", label: "Qué es" },
  { id: "activar", label: "Cómo se activa" },
  { id: "configurar", label: "Configura tu contabilidad" },
  { id: "documento-interno", label: "Documento interno de venta" },
  { id: "comprobantes", label: "Comprobantes" },
  { id: "bancos-y-caja", label: "Bancos y caja" },
  { id: "recibos-y-egresos", label: "Recibos de caja y egresos" },
  { id: "registrar-pago", label: "«Registrar pago» y compras" },
  { id: "importar", label: "Importar desde otro software" },
  { id: "libros", label: "Libros" },
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
            contable. Con esos comprobantes se arman los libros: el balance de prueba y los auxiliares por cuenta y
            por tercero. Tú y tu contador ven los mismos datos de dos maneras:
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
          <P>Con la contabilidad activada aparecen dos lugares nuevos:</P>
          <Table
            head={["Dónde", "Qué encuentras"]}
            rows={[
              [<>Menú <B>Contabilidad</B></>, "Comprobantes, Libros, Catálogo de cuentas, Recibos de caja y Egresos."],
              [<><B>Ajustes → Contabilidad</B></>, "Catálogo de cuentas, Cuentas por defecto, Conceptos e ingresos, Vista, Períodos, Opciones, Bancos y caja, e Importar desde otro software."],
            ]}
          />
          <Callout type="note" title="No es lo mismo que el plan Contabilidad">
            El plan que se llama <strong>Contabilidad</strong> es el de{" "}
            <a href="/docs/invoices" style={link}>facturación electrónica</a>. Lo que explica esta página (comprobantes,
            recibos, egresos y libros) funciona encima de esa facturación y se activa aparte, como se cuenta abajo.
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

          <H3 id="catalogo">Catálogo de cuentas</H3>
          <P>
            Está en <B>Contabilidad → Catálogo de cuentas</B> y también en <B>Ajustes → Contabilidad → Catálogo de
            cuentas</B>. El catálogo oficial tiene miles de cuentas; para no abrumarte, la lista tiene tres vistas:
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
            En <B>Ajustes → Contabilidad → Cuentas por defecto</B> ves la cuenta que se usa para cada cosa. Ya vienen
            puestas; cambia solo las que tu contador te pida. Están agrupadas así: dónde está la plata (caja y
            bancos), ventas, compras y gastos, IVA, retenciones que te hacen tus clientes, retenciones que les haces a
            tus proveedores y saldos iniciales.
          </P>
          <P>
            Cada fila dice si usa la cuenta «Por defecto» o una que tú cambiaste, y tiene la opción «Volver a la cuenta
            por defecto».
          </P>

          <H3 id="conceptos">Conceptos e ingresos</H3>
          <P>
            En <B>Ajustes → Contabilidad → Conceptos e ingresos</B> decides a qué cuenta va lo que vendes y cada
            concepto de gasto (fletes, arriendo, honorarios…):
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
            El interruptor <B>Ver débitos y créditos</B> está en <B>Ajustes → Contabilidad → Vista</B> y también en
            las pantallas de Comprobantes y Libros.
          </P>
          <Table
            head={["Interruptor", "Qué ves"]}
            rows={[
              ["Apagado (lenguaje llano)", "Cada movimiento con su fecha, de qué se trata, con quién fue y cuánto, y si aumenta o disminuye la cuenta. Sin códigos de cuenta ni columnas de débito y crédito."],
              ["Encendido (débitos y créditos)", "Además ves el tipo y el número de cada comprobante, el código de la cuenta, el débito, el crédito y el saldo después de cada movimiento."],
            ]}
          />
          <P>
            Los datos son los mismos en las dos vistas. La preferencia es <B>de cada usuario</B> y queda guardada en su
            navegador: no cambia lo que ven las demás personas de tu empresa.
          </P>

          <H3 id="periodos">Períodos (fecha de cierre)</H3>
          <P>
            En <B>Ajustes → Contabilidad → Períodos</B> cierras un período para que sus comprobantes ya no cambien. Lo
            usual es cerrar cuando tu contador ya presentó las declaraciones de ese período.
          </P>
          <Steps
            items={[
              <>En <B>Cerrar hasta el día</B>, elige la fecha. Puede ser cualquier día hasta ayer.</>,
              <>Haz clic en <B>Cerrar el período</B> (o <B>Cambiar la fecha de cierre</B> si ya había una).</>,
            ]}
          />
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

          <H3 id="opciones">Opciones</H3>
          <P>
            En <B>Ajustes → Contabilidad → Opciones</B> hay una decisión sobre cómo se registran las ventas que haces
            por cuenta de otra persona o empresa (las líneas que marcas como «Ingreso para un tercero» al facturar):
            ¿de quién es el IVA de esa venta?
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
            En <B>Ajustes → Facturación → Documento interno</B> el propietario o el contador definen el{" "}
            <B>Prefijo</B> (por ejemplo VT- o REM-) y el <B>Siguiente número</B>. El número solo puede subir: uno que
            ya se usó no se repite.
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
            En <B>Contabilidad → Comprobantes</B> están todos los movimientos de tu contabilidad. La mayoría aparecen
            solos; unos pocos los registras tú.
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
            recibo o el egreso, y el comprobante se actualiza solo.
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
            «De dónde salió» te lleva al documento de origen.
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
            ]}
          />

          <H3 id="comprobante-manual">Comprobante manual</H3>
          <P>
            Úsalo para lo que no sale de una factura, una compra o un abono: un ajuste, una corrección, un movimiento
            entre cuentas.
          </P>
          <Steps
            items={[
              <>En Comprobantes, haz clic en <B>Nuevo comprobante</B>.</>,
              <>Escribe la <B>Fecha</B> (no puede ser futura ni caer en un período cerrado) y el concepto: de qué trata, entre 3 y 300 caracteres.</>,
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
        </section>

        <section id="recibos-y-egresos" className="mb-10">
          <H2>Recibos de caja y comprobantes de egreso</H2>
          <Table
            head={["Documento", "Dónde", "Para qué"]}
            rows={[
              ["Recibo de caja", <>Contabilidad → <B>Recibos de caja</B></>, "La plata que te entra: pagos de tus clientes, anticipos y otros ingresos."],
              ["Comprobante de egreso", <>Contabilidad → <B>Egresos</B></>, "La plata que sale: pagos a tus proveedores, anticipos y gastos."],
            ]}
          />
          <P>
            Un solo recibo puede cobrar <B>varias facturas o documentos internos del mismo cliente</B>, y un solo
            egreso puede pagar <B>varias compras del mismo proveedor</B>. Los dos pueden llevar además conceptos que no
            son de un documento.
          </P>

          <H3>Crear un recibo o un egreso</H3>
          <Steps
            items={[
              <>Haz clic en <B>Nuevo recibo</B> o <B>Nuevo egreso</B>.</>,
              <>Elige el cliente o el proveedor de tus contactos. En un egreso también puedes escribir el NIT del proveedor y tocar <B>Ver compras</B>.</>,
              "Aparecen sus facturas con saldo (o sus compras por pagar). Marca las que te están pagando (o las que estás pagando) y escribe cuánto a cada una. Se propone lo que debe.",
              <>Si hace falta, agrega <B>Conceptos sin documento</B> con <B>Agregar concepto</B> (ver la tabla de abajo).</>,
              <>En <B>Cómo te pagaron</B> (o <B>Cómo pagaste</B>), elige el <B>Banco o caja</B>, la <B>Fecha</B>, la <B>Forma de pago</B> y, si quieres, la <B>Referencia</B> (el número de la transferencia o de la consignación) y una <B>Nota</B>.</>,
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
              ["Gasto", "No aplica.", "Un gasto que no es de una compra registrada, con su concepto del gasto. Si el gasto lleva IVA, regístralo como compra."],
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

          <H3>El detalle: PDF y anular</H3>
          <P>
            Al abrir un recibo o un egreso ves la fecha, el tercero, el banco o caja, la forma de pago, el total y el
            valor en letras; los documentos que abona o paga (cada uno con su enlace «Ver la factura» o «Ver la
            compra»), los conceptos y qué ha pasado con el comprobante. El propietario y el contador ven además el
            enlace a su comprobante contable.
          </P>
          <Bullets
            items={[
              <><B>Descargar PDF:</B> el recibo o el egreso listo para entregar o archivar.</>,
              <><B>Anular:</B> escribe el motivo y confirma con «Anular recibo» o «Anular egreso». Sus abonos o pagos se retiran de cada factura o compra, que vuelve a deber ese valor. Conserva su número y no se puede deshacer.</>,
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
              <>Pide el <B>Banco o caja</B>: a dónde entró el dinero. Recuerda el último que elegiste.</>,
              <>Al guardar, el pago queda registrado con un <B>recibo de caja</B>. La ventana te muestra su número, con «Ver el recibo» y <B>Descargar recibo</B>.</>,
              <>En <B>Abonos registrados</B>, un abono que nació de un recibo muestra su recibo y no trae el botón de eliminar: <B>para quitarlo, anula el recibo</B> y el abono se retira con él.</>,
              <>Las retenciones del cliente no van en esta ventana: se anotan como siempre, con <a href="/docs/invoices#customer-withholdings" style={link}>Aplicar retenciones</a>.</>,
              "Si el pago queda «en proceso», no lo registres otra vez: usa «Comprobar de nuevo».",
              "Un usuario de solo lectura ve el saldo y los abonos, pero no puede registrar el pago.",
            ]}
          />
          <P>
            Para cobrar varias facturas del mismo cliente con un solo pago, o para recibir un anticipo, crea el recibo
            desde <a href="#recibos-y-egresos" style={link}>Contabilidad → Recibos de caja</a>.
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
              "Una compra con pagos no se puede eliminar ni cambiar de estado a mano: su estado lo fijan sus pagos. Tampoco se le cambia el total ni las retenciones. Si hay que corregirla, anula primero el egreso.",
              "Mientras haya compras marcadas como pagadas sin egreso, el balance de prueba avisa que el saldo de proveedores las incluye, con un enlace a Egresos.",
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
            <B>Contabilidad → Libros</B> abre el <B>balance de prueba</B>: cuánto hay en cada cuenta en el período que
            elijas.
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
              "En el comprobante, «De dónde salió» te lleva a la factura, el documento interno, la compra, el recibo de caja o el egreso.",
            ]}
          />
          <H3>Exportar a Excel</H3>
          <P>
            El balance de prueba y los dos auxiliares tienen el botón <B>Exportar a Excel</B>, que descarga lo que
            estás viendo con las fechas y los filtros elegidos.
          </P>
        </section>

        <section id="roles" className="mb-10">
          <H2>Quién puede hacer qué</H2>
          <Table
            head={["Qué", "Propietario y contador", "Demás usuarios del equipo", "Usuario de solo lectura"]}
            rows={[
              ["Configurar la contabilidad (catálogo, cuentas por defecto, conceptos, períodos, opciones)", "Sí", "No", "No"],
              ["Crear y editar bancos y cajas", "Sí", "No", "No"],
              ["Importar desde otro software", "Sí", "No", "No"],
              ["Ver comprobantes y libros, y exportarlos", "Sí", "No", "No"],
              ["Registrar y anular comprobantes manuales y saldos iniciales", "Sí", "No", "No"],
              ["Registrar y anular recibos de caja y comprobantes de egreso", "Sí", "Sí", "No"],
              ["«Registrar pago» en una factura", "Sí", "Sí", "No"],
              ["Cambiar la numeración del documento interno", "Sí", "No", "No"],
            ]}
          />
          <P>
            Un usuario que no es propietario ni contador ve en el menú Contabilidad solo <B>Recibos de caja</B> y{" "}
            <B>Egresos</B>. Los roles se explican en{" "}
            <a href="/docs/settings#users" style={link}>Configuración → Usuarios</a>.
          </P>
        </section>

        <section id="pendiente" className="mb-10">
          <H2>Lo que todavía no hay</H2>
          <P>Para que no lo busques, esto todavía no existe en la contabilidad de FusionCRM:</P>
          <Bullets
            items={[
              <><B>Conciliación con el extracto del banco.</B> No se cruza el extracto contra los recibos y egresos.</>,
              <><B>Cierre anual.</B> Hay fecha de cierre de período, pero no el cierre contable de fin de año.</>,
              <><B>Balance general y estado de resultados contables.</B> Los libros que hay son el balance de prueba y los auxiliares. El estado de resultados de <a href="/docs/invoices#reports" style={link}>Informes</a> es un informe de gestión, no sale de los libros.</>,
              <><B>Retenciones dentro del recibo de caja.</B> Las retenciones del cliente se anotan en la factura con «Aplicar retenciones», no en el recibo.</>,
              <><B>Cruzar un anticipo contra una factura posterior.</B> El anticipo queda registrado, pero todavía no se puede aplicar después a una factura desde el recibo.</>,
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
