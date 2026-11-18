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
  { id: "en-construccion", label: "En construcción: lo que viene" },
  { id: "conciliacion", label: "Conciliación bancaria" },
  { id: "transferencias", label: "Transferencias entre cuentas" },
  { id: "cierre-anual", label: "Cierre del año" },
  { id: "estados-financieros", label: "Balance y estado de resultados" },
  { id: "diario-y-mayor", label: "Libro diario y mayor" },
  { id: "pdf-contables", label: "PDF de los comprobantes" },
  { id: "egreso-iva-y-compras", label: "Egreso con IVA y compras" },
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

function EnConstruccion() {
  return (
    <Callout type="warning" title="En construcción">
      Esto <strong>todavía no está disponible en la app</strong>. El motor ya está construido y probado; faltan las
      pantallas, que llegan en la siguiente entrega. Lo que sigue explica qué hace y cómo se va a usar.
    </Callout>
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
          <P>
            Está en construcción el <a href="#cierre-anual" style={link}>cierre del año</a>, y con él la fecha de
            cierre gana más controles.
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

        <section id="en-construccion" className="mb-10">
          <H2>En construcción: lo que viene</H2>
          <Callout type="warning" title="Todavía no está disponible en la app">
            Lo que sigue, hasta el final de esta parte, <strong>ya está construido y probado por dentro, pero aún no
            tiene pantallas</strong>: hoy no lo vas a encontrar en ningún menú. Las pantallas llegan en la siguiente
            entrega. Aquí se explica qué hace cada cosa y cómo se va a usar, para que tú y tu contador sepan qué
            esperar. Los detalles de cada pantalla se documentarán cuando existan.
          </Callout>
          <Table
            head={["Qué viene", "Para qué sirve"]}
            rows={[
              [<a key="a" href="#conciliacion" style={link}>Conciliación bancaria con extracto</a>, "Cruzar el extracto del banco contra lo que tienes registrado en esa cuenta."],
              [<a key="a" href="#transferencias" style={link}>Transferencias entre cuentas de dinero</a>, "Pasar plata de la caja al banco, o de un banco a otro, con su propio comprobante."],
              [<a key="a" href="#cierre-anual" style={link}>Cierre del año y fecha de cierre</a>, "Cerrar el año contable y llevar el resultado al patrimonio; cerrar cada mes con más controles."],
              [<a key="a" href="#estados-financieros" style={link}>Balance general y estado de resultados</a>, "Los dos estados financieros, sacados de los libros, con comparativo, Excel y PDF."],
              [<a key="a" href="#diario-y-mayor" style={link}>Libro diario y mayor y balances</a>, "Los dos libros que faltaban junto al balance de prueba y los auxiliares."],
              [<a key="a" href="#pdf-contables" style={link}>PDF de los comprobantes</a>, "El comprobante contable en PDF, y el recibo y el egreso en versión para el cliente o con cuentas."],
              [<a key="a" href="#egreso-iva-y-compras" style={link}>Egreso con IVA y controles en compras</a>, "IVA descontable en un gasto sin factura de compra, aviso de compra repetida y más protección a las compras pagadas."],
            ]}
          />
          <P>
            Todo esto usa la misma contabilidad que ya se explica arriba y se activa igual:{" "}
            <a href="#activar" style={link}>empresa por empresa y a pedido</a>.
          </P>
        </section>

        <section id="conciliacion" className="mb-10">
          <H2>Conciliación bancaria con extracto</H2>
          <EnConstruccion />
          <P>
            Conciliar es comparar el extracto del banco con lo que tienes registrado en esa cuenta, movimiento por
            movimiento. La conciliación <B>no mueve plata ni cambia ningún comprobante</B>: solo deja dicho qué línea
            del extracto corresponde a qué movimiento de tus libros, y qué quedó sin pareja.
          </P>

          <H3>El archivo del extracto</H3>
          <P>
            Se sube el archivo que descargas del banco, para uno de tus <a href="#bancos-y-caja" style={link}>bancos</a>{" "}
            y un período.
          </P>
          <Table
            head={["Límite", "Valor"]}
            rows={[
              ["Formato", "Excel .xlsx o CSV (separado por coma, punto y coma o tabulador)."],
              ["Tamaño", "Máximo 600 KB."],
              ["Movimientos", "Máximo 2.000 por extracto."],
              ["Período", "Máximo 366 días. Si no lo indicas, va de la primera a la última fecha del archivo."],
            ]}
          />
          <P>
            Con el <B>formato genérico</B> sirve el archivo de cualquier banco: las columnas se reconocen por su
            título, sin importar tildes ni mayúsculas. La fila de títulos debe estar entre las primeras 20 filas.
          </P>
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
              <><B>Signo del valor:</B> positivo es plata que entra al banco; negativo, plata que sale.</>,
              <><B>Fechas que se leen:</B> 2025-06-30, 30/06/2025, 30-06-2025, 2025/06/30, 20250630 y las fechas propias de Excel.</>,
              <><B>Valores que se leen:</B> 1.234.567,89 · 1,234,567.89 · -1234567.89 · (1.234,56) como negativo, con o sin el signo $.</>,
              "Una fecha o un valor que se pueda leer de dos maneras no se adivina: esa fila se marca como error.",
              "Si las columnas de tu banco tienen otros títulos, se puede indicar cuál columna es cada dato.",
              <><B>Plantilla de Bancolombia:</B> para el archivo de movimientos con las columnas FECHA, DESCRIPCIÓN, SUCURSAL, DCTO., VALOR y SALDO. Si tu archivo viene con otra forma, sirve el formato genérico.</>,
            ]}
          />
          <P>
            Primero se <B>revisa</B> el archivo, sin guardar nada: ves cuántos movimientos trae, cuánto entró, cuánto
            salió y el saldo final. Si una sola fila está mala, el extracto no se guarda y recibes el informe fila por
            fila para corregirlo. También puede haber avisos que no impiden seguir, por ejemplo que el período se
            cruza con otro extracto de la misma cuenta o que el saldo de una fila no cuadra con la anterior.
          </P>

          <H3>Cruzar los movimientos</H3>
          <Bullets
            items={[
              "Al abrir el extracto ves, de un lado, las líneas del banco y, del otro, los movimientos de tus libros en esa cuenta: recibos, egresos, transferencias y comprobantes manuales.",
              <><B>Sugerencias:</B> para cada línea del banco se propone el movimiento que tiene el mismo valor y una fecha cercana (hasta tres días antes o después).</>,
              <><B>Nada se concilia solo.</B> Una sugerencia es solo eso: el cruce queda hecho cuando una persona lo confirma.</>,
              "Una línea del banco se puede cruzar con uno o con varios movimientos de libros, siempre que sumen exactamente su valor.",
              "Un movimiento de libros solo puede estar en un cruce. Un cruce se puede deshacer mientras la conciliación esté abierta.",
              "Si después anulas o cambias un comprobante que ya estaba cruzado, ese cruce queda marcado como roto para que lo revises.",
            ]}
          />

          <H3>El saldo inicial, en la primera conciliación</H3>
          <P>
            La primera vez que concilias una cuenta, el banco ya traía un saldo de antes. Para que la conciliación
            llegue a cero:
          </P>
          <Steps
            items={[
              "Al subir el extracto, indica el saldo inicial que dice el banco. Va desde el comienzo: si se te olvida, hay que descartar el extracto y subirlo otra vez.",
              <>Cruza ese saldo contra lo que tenías registrado en esa cuenta antes del período: normalmente, tus <a href="#saldos-iniciales" style={link}>saldos iniciales</a>. Debe sumar exactamente lo mismo.</>,
            ]}
          />
          <P>
            En las conciliaciones siguientes no hace falta: el saldo inicial es lo que ya quedó conciliado en las
            anteriores.
          </P>

          <H3>Lo que está en el banco y falta en tus libros</H3>
          <P>
            El banco cobra cosas que tú no registraste: la comisión, el 4×1000, o te abona intereses. La conciliación
            te da una pista de qué puede ser cada línea, pero no registra nada por ti. Lo que falta se registra con un{" "}
            <a href="#recibos-y-egresos" style={link}>comprobante de egreso</a> (lo que te cobraron) o con un recibo de
            caja (lo que te abonaron), y después se cruza como cualquier otro movimiento.
          </P>
          <P>
            Si el mes ya está cerrado, ese egreso se registra con fecha del período abierto. Se puede cruzar con el
            extracto si su fecha es hasta 31 días después del final del período, y el informe lo muestra aparte.
          </P>

          <H3>Qué significa «conciliado»</H3>
          <P>El resumen de la conciliación muestra:</P>
          <Table
            head={["Renglón", "Qué es"]}
            rows={[
              ["Saldo en libros", "Lo que dice tu contabilidad para esa cuenta al final del período."],
              ["En libros y no en banco", "Lo que registraste y el banco todavía no muestra. Por ejemplo, un cheque que no han cobrado."],
              ["En banco y no en libros", "Líneas del extracto sin cruzar, o con el cruce roto."],
              ["Saldo en banco", "El saldo final del extracto."],
              ["Diferencia", "Lo que queda sin explicar. Debe ser cero."],
            ]}
          />
          <P>Una conciliación está <B>conciliada</B> cuando se cumplen las tres cosas:</P>
          <Bullets
            items={[
              "La diferencia es cero.",
              "No queda ninguna línea del extracto sin cruzar.",
              "Ningún cruce está roto.",
            ]}
          />
          <P>
            Lo que está en libros y no en banco <B>no</B> impide que esté conciliada: un cheque sin cobrar es normal en
            una conciliación terminada, y queda en su lista.
          </P>

          <H3>Cerrar, reabrir e informe en PDF</H3>
          <Bullets
            items={[
              <><B>Cerrar:</B> al terminar se cierra la conciliación y ya no se le cambian los cruces. Se puede cerrar con diferencia o con líneas pendientes, pero queda dicho con todas las letras.</>,
              <><B>Reabrir:</B> pide escribir el motivo, que queda guardado.</>,
              "Cerrar y reabrir es del propietario y del contador.",
              "Un extracto que subiste por error se puede descartar mientras esté abierto.",
              <><B>Informe en PDF:</B> trae la cuenta, el período, el resumen renglón por renglón, el saldo inicial, la lista de lo que está en libros y no en banco, la de lo que está en banco y no en libros, y los espacios de firma «Elaboró» y «Revisó». Si se cerró con diferencia o con pendientes, el informe lo dice en una banda visible.</>,
            ]}
          />
        </section>

        <section id="transferencias" className="mb-10">
          <H2>Transferencias entre cuentas de dinero</H2>
          <EnConstruccion />
          <P>
            Una transferencia es pasar plata entre dos de tus <a href="#bancos-y-caja" style={link}>bancos o cajas</a>:
            consignar en el banco el efectivo de la caja, o mover plata de un banco a otro. No es un ingreso ni un
            gasto: la plata solo cambia de lugar.
          </P>
          <Bullets
            items={[
              "Se indica de qué cuenta sale, a cuál entra, la fecha y el valor. Si quieres, también la referencia y una nota.",
              "Las dos cuentas deben estar activas y ser distintas. La fecha no puede ser futura ni caer en un período cerrado.",
              <>Queda con su propio comprobante, <B>Transferencia entre cuentas (TR)</B>, con numeración propia. Aparece en los libros de las dos cuentas y en la conciliación de cada una.</>,
              "Se anula escribiendo el motivo. Conserva su número.",
              "Una transferencia con fecha en un período cerrado o en un año cerrado no se anula. Para corregirla se registra otra en el período abierto, o se cambia antes la fecha de cierre.",
              "Si anulas una transferencia que ya estaba cruzada en una conciliación, ese cruce queda marcado como roto.",
            ]}
          />
          <P>
            Mientras llegan las pantallas, un movimiento entre cuentas se registra con un{" "}
            <a href="#comprobante-manual" style={link}>comprobante manual</a>.
          </P>
        </section>

        <section id="cierre-anual" className="mb-10">
          <H2>Cierre del año y fecha de cierre</H2>
          <EnConstruccion />
          <P>
            El año contable es el año calendario. Cerrarlo es dejar en cero las cuentas de ingresos, costos y gastos
            y llevar el resultado del año al patrimonio, para que el año siguiente empiece limpio.
          </P>

          <H3>Qué hace el cierre</H3>
          <Bullets
            items={[
              <>Genera un <B>comprobante de cierre (CI)</B> con fecha 31 de diciembre, que cancela el saldo de cada cuenta de ingresos, costos y gastos, cuenta por cuenta y tercero por tercero.</>,
              <>Si el año dio <B>utilidad</B>, la lleva a la cuenta <B>360505</B> (utilidad del ejercicio). Si dio <B>pérdida</B>, a la <B>361005</B> (pérdida del ejercicio).</>,
              "Deja la fecha de cierre en el 31 de diciembre de ese año, si estaba antes.",
              "No genera un comprobante de apertura: las cuentas de balance (activo, pasivo y patrimonio) siguen con su saldo, y los ingresos, costos y gastos arrancan en cero el 1 de enero.",
              "Si el año no tuvo ingresos, costos ni gastos, se cierra sin comprobante.",
            ]}
          />

          <H3>Primero la simulación</H3>
          <P>
            Antes de cerrar se hace una <B>simulación</B>, que no cambia nada. Muestra si el año dio utilidad o pérdida
            y de cuánto, y el comprobante de cierre tal como va a quedar, línea por línea. El cierre de verdad solo se
            hace al confirmarlo después de revisar.
          </P>
          <P>Para poder cerrar un año:</P>
          <Bullets
            items={[
              "El año ya terminó.",
              "Los años anteriores que tengan movimientos ya están cerrados.",
              "No hay documentos pendientes de entrar a la contabilidad ni con alertas.",
              "El balance de prueba cuadra.",
            ]}
          />
          <P>Si falta algo, el cierre no se hace y te dice qué falta.</P>

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

          <H3>Reabrir un año</H3>
          <Bullets
            items={[
              "Solo se reabre el último año cerrado.",
              <>Pide escribir el <B>motivo</B>. Queda guardado quién lo reabrió, cuándo y por qué.</>,
              "Al reabrir se anula el comprobante de cierre y la fecha de cierre vuelve a donde estaba antes del cierre.",
              "Al cerrarlo otra vez se genera un comprobante de cierre nuevo, con número nuevo: el anterior no se reusa.",
              "Cerrar y reabrir un año es del propietario y del contador.",
            ]}
          />

          <H3 id="fecha-de-cierre">La fecha de cierre: cerrar un mes</H3>
          <P>
            Cerrar un mes es mover la <a href="#periodos" style={link}>fecha de cierre</a> al último día de ese mes. La
            fecha de cierre ya existe hoy; con esta entrega gana tres controles:
          </P>
          <Bullets
            items={[
              <><B>No deja cerrar con el balance descuadrado:</B> para subir la fecha, el balance de prueba debe cuadrar hasta ese día. Si no cuadra, te muestra los totales para que lo revises.</>,
              <><B>Pide el motivo al bajarla:</B> para mover la fecha hacia atrás o quitarla hay que escribir por qué. El motivo queda en el historial.</>,
              <><B>Respeta los años cerrados:</B> la fecha no baja más allá del último año cerrado. Para eso, primero se reabre el año.</>,
            ]}
          />
        </section>

        <section id="estados-financieros" className="mb-10">
          <H2>Balance general y estado de resultados</H2>
          <EnConstruccion />
          <P>
            Son los dos estados financieros, calculados de los mismos comprobantes que el balance de prueba. No se
            digitan ni se guardan: se arman cada vez que los consultas, con lo que haya en los libros.
          </P>

          <H3>Balance general</H3>
          <Bullets
            items={[
              "Muestra, a la fecha que elijas, el activo, el pasivo y el patrimonio, con sus grupos y cuentas.",
              <>Mientras el año no esté cerrado, el patrimonio trae la fila <B>«Resultado del ejercicio»</B>: lo que llevan los ingresos menos los costos y gastos del año. Después del cierre, ese valor ya está dentro de la cuenta de utilidad o de pérdida. El total es el mismo.</>,
              "Dice si cuadra: activo igual a pasivo más patrimonio. Si no cuadra, muestra la diferencia.",
              <><B>Comparativo:</B> puedes compararlo con otra fecha. Cada cifra muestra el valor de las dos fechas y el cambio.</>,
            ]}
          />

          <H3>Estado de resultados</H3>
          <P>Muestra el período que elijas, en este orden:</P>
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
              <><B>Comparativo:</B> si no eliges otra cosa, se compara con el período inmediatamente anterior del mismo largo. Puedes elegir otro período o quitar la comparación.</>,
              "Cerrar el año no cambia el estado de resultados de ese año: el comprobante de cierre no se cuenta.",
              "La utilidad neta del año es la misma cifra que el «Resultado del ejercicio» del balance al 31 de diciembre y la que el cierre lleva al patrimonio.",
            ]}
          />

          <H3>Detalle, Excel y PDF</H3>
          <Bullets
            items={[
              "Los dos se pueden ver más resumidos o más detallados, y cada cuenta lleva a su auxiliar.",
              <><B>Excel:</B> los dos se descargan con el nombre y el NIT de la empresa, el período y la fecha en que se generaron.</>,
              <><B>PDF con firmas:</B> los dos traen al final los espacios para la firma del <B>Representante legal</B> y del <B>Contador público</B>. Los nombres no se imprimen: los espacios van en blanco para firmar. Los valores negativos van entre paréntesis.</>,
              "Si el balance no cuadra, el PDF lo dice en una banda visible, con la diferencia.",
            ]}
          />

          <H3>En qué se diferencian de los informes de siempre</H3>
          <Table
            head={["", "Informes de facturación (los de hoy)", "Estados financieros contables (lo que viene)"]}
            rows={[
              ["Dónde", <><a key="a" href="/docs/invoices#reports" style={link}>Facturación → Informes</a></>, "Con los libros de contabilidad."],
              ["De dónde salen", "De tus facturas, notas y compras del período.", "De los libros: todos los comprobantes, incluidos los manuales, los saldos iniciales, los recibos y los egresos."],
              ["Para qué", "Ver cómo va el negocio y entregarle el período a tu contador.", "Tener el balance general y el estado de resultados de la contabilidad."],
              ["Balance general", "No tiene.", "Sí."],
              ["Necesita la contabilidad activada", "No.", "Sí."],
            ]}
          />
          <P>
            Las cifras de los dos pueden no coincidir, y es normal: el informe de gestión no ve los comprobantes
            manuales ni los saldos iniciales. Los informes de siempre no cambian ni desaparecen.
          </P>
        </section>

        <section id="diario-y-mayor" className="mb-10">
          <H2>Libro diario y mayor y balances</H2>
          <EnConstruccion />
          <P>
            Se suman a los <a href="#libros" style={link}>libros que ya hay</a> (el balance de prueba y los auxiliares).
          </P>
          <Table
            head={["Libro", "Qué muestra"]}
            rows={[
              ["Libro diario", "Todos los comprobantes del período, en orden, cada uno con sus líneas (cuenta, tercero, descripción, débito y crédito). Trae el subtotal de cada día y el total del período, y dice si cuadra. Se puede ver un solo tipo de comprobante."],
              ["Mayor y balances", "Cada cuenta mayor (cuatro dígitos), agrupada por clase, con tres datos: el saldo anterior, el movimiento del período y el saldo nuevo. Trae totales por clase y el total general."],
            ]}
          />
          <Bullets
            items={[
              "Los dos se descargan en Excel.",
              "El libro diario consulta máximo 366 días seguidos, como los auxiliares.",
              "Los comprobantes anulados no salen.",
            ]}
          />
        </section>

        <section id="pdf-contables" className="mb-10">
          <H2>PDF de los comprobantes</H2>
          <EnConstruccion />
          <H3>Comprobante contable</H3>
          <P>
            Cualquier comprobante se podrá descargar en PDF: los manuales, los de saldos iniciales, las
            transferencias, el de cierre y los automáticos. Trae el tipo y el número, la fecha, el concepto, de dónde
            salió, las líneas con cuenta, tercero, descripción, débito y crédito, las sumas iguales y los espacios de
            firma «Elaboró», «Revisó» y «Aprobó». Si está anulado, lo dice en una banda, con el motivo.
          </P>
          <H3>Recibo de caja y comprobante de egreso: dos versiones</H3>
          <P>
            El recibo y el egreso <a href="#recibos-y-egresos" style={link}>ya se descargan en PDF</a>. Con esta entrega
            tendrán dos versiones:
          </P>
          <Table
            head={["Versión", "Qué trae", "Para quién"]}
            rows={[
              ["Para el cliente o el proveedor", "Sin cuentas contables: quién paga o recibe, los documentos, los conceptos, la forma de pago, el total y el valor en letras.", "Para entregar."],
              ["Con cuentas contables", "Lo mismo, más la cuenta contable del banco o la caja, la de cada concepto y la del IVA descontable.", "Para el archivo de tu contador."],
            ]}
          />
          <Bullets
            items={[
              "El NIT del tercero sale con su dígito de verificación.",
              "El valor en letras sale más limpio: «SON: … PESOS M/CTE».",
              "Si el egreso lleva IVA descontable, las dos versiones lo dicen.",
            ]}
          />
        </section>

        <section id="egreso-iva-y-compras" className="mb-10">
          <H2>Egreso con IVA y controles en las compras</H2>
          <EnConstruccion />
          <H3>IVA descontable en un gasto sin factura de compra</H3>
          <P>
            Hoy, un gasto que lleva IVA hay que registrarlo como compra. Con esta entrega, el concepto{" "}
            <B>Gasto</B> de un egreso podrá llevar su IVA:
          </P>
          <Bullets
            items={[
              "Escribes el valor total que salió del banco o la caja y, aparte, cuánto de ese valor es IVA.",
              "El gasto se registra por el valor sin IVA, y el IVA va a la cuenta de IVA descontable, los dos a nombre del proveedor.",
              "El IVA debe ser mayor que cero y menor que el total. Solo aplica al concepto Gasto.",
              "Ejemplo: pagas $119.000 por papelería. $100.000 quedan como gasto y $19.000 como IVA descontable.",
            ]}
          />
          <P>
            Si ese IVA se puede descontar o no depende de tu caso: pregúntale a tu contador.
          </P>

          <H3>Aviso de compra duplicada</H3>
          <Bullets
            items={[
              "Al registrar o editar una compra, si ya hay otra del mismo proveedor (mismo NIT) con el mismo número de documento, la compra no se guarda de una: te avisa y te muestra cuál es la otra.",
              "Al comparar el número no cuentan los espacios, los guiones ni las mayúsculas: «FV-900» y «fv 900» son el mismo.",
              "Si de verdad es otra compra, se puede guardar de todos modos, y queda anotado.",
              "No se revisan las compras sin número de documento, las canceladas ni las órdenes de compra.",
              "El aviso funciona con la contabilidad activada.",
            ]}
          />

          <H3>Una compra con pagos no se edita</H3>
          <P>
            Ya hoy, a una compra pagada con un comprobante de egreso{" "}
            <a href="#registrar-pago" style={link}>no se le cambia el total ni las retenciones</a>. Con esta entrega
            tampoco se le cambia el <B>IVA</B> ni el valor de sus líneas, y el mensaje te dice qué egresos hay que
            anular antes. Para corregirla: anula primero el egreso, corrige la compra y vuelve a pagarla. Sí se le
            pueden cambiar la descripción y el concepto del gasto.
          </P>
        </section>

        <section id="pendiente" className="mb-10">
          <H2>Lo que todavía no hay</H2>
          <P>
            Para que no lo busques, esto todavía no existe en la contabilidad de FusionCRM, ni está en la entrega que
            viene:
          </P>
          <Bullets
            items={[
              <><B>Retenciones dentro del recibo de caja.</B> Las retenciones del cliente se anotan en la factura con «Aplicar retenciones», no en el recibo.</>,
              <><B>Cruzar un anticipo contra una factura posterior.</B> El anticipo queda registrado, pero todavía no se puede aplicar después a una factura desde el recibo.</>,
              <><B>Inventario.</B> La contabilidad no lleva existencias ni calcula el costo de lo vendido.</>,
              <><B>Formularios de impuestos.</B> No se generan las declaraciones de IVA, retención ni renta. Los libros le dan los datos a tu contador.</>,
              <><B>Nómina.</B> No se liquida ni se contabiliza sola.</>,
            ]}
          />
          <P>
            La conciliación bancaria, el cierre del año y el balance general y el estado de resultados contables ya no
            están en esta lista: están <a href="#en-construccion" style={link}>en construcción</a>, con el motor listo y
            las pantallas en la siguiente entrega.
          </P>
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
