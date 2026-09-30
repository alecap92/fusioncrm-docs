import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Envíos (Envia.com)" };

const API_BASE = "https://api.fusioncol.com/api";

const toc = [
  { id: "overview", label: "Qué es" },
  { id: "setup", label: "Requisitos" },
  { id: "endpoints", label: "Endpoints y permisos" },
  { id: "flow", label: "Cotizar y generar" },
  { id: "idempotency", label: "Idempotencia y cobro de saldo" },
  { id: "city", label: "Ciudad del destino: 422 INVALID_CITY" },
  { id: "errors", label: "Otros errores" },
];

const endpoints = [
  ["GET", "/shipments", "shipments:read", "Lista los envíos (filtros contactId y status; limit por defecto 20, máximo 100)."],
  ["POST", "/shipments/rates", "shipments:read", "Cotiza en todas las transportadoras de tu cuenta. No escribe ni cobra."],
  ["POST", "/shipments", "shipments:write", "Genera la guía. Cobra saldo de tu cuenta de Envia."],
  ["GET", "/shipments/{id}", "shipments:read", "Consulta un envío con su estado y eventos."],
  ["POST", "/shipments/{id}/track", "shipments:write", "Refresca el rastreo contra Envia."],
  ["POST", "/shipments/{id}/cancel", "shipments:write", "Cancela una guía en estado created y devuelve el saldo si Envia lo informa."],
];

const errors = [
  ["409", "SHIPMENT_IN_PROGRESS", "Otro POST con la misma idempotencyKey (o del mismo contacto sin clave) está generando la guía. Espera unos segundos y reintenta con la misma clave."],
  ["409", "SHIPMENT_NEEDS_REVIEW", "No se sabe si Envia generó la guía (timeout, red). Pudo cobrarse: revisa el panel de Envia y, si hace falta, reintenta con una clave nueva."],
  ["400", "IDEMPOTENCY_KEY_REUSED", "Esa idempotencyKey ya se usó con otro contacto."],
  ["422", "ENVIA_GENERATE_FAILED", "Envia rechazó la guía (saldo insuficiente, transportadora caída…). Queda un borrador (shipmentId) que puedes reintentar con la misma clave."],
  ["422", "ENVIA_NOT_CONFIGURED / ORIGIN_NOT_CONFIGURED", "Falta la API key de Envia (Integraciones) o la dirección de origen (Ajustes → Envíos)."],
  ["409", "SHIPMENT_NOT_CANCELABLE / SHIPMENT_NOT_TRACKABLE", "Solo se cancela un envío en created; un draft no tiene guía que rastrear."],
  ["403", "PLAN_MODULE_REQUIRED", "El plan de la organización no tiene el módulo Envíos."],
];

const codeBox = { backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" } as const;
const muted = { color: "var(--muted-foreground)" } as const;
const strong = { color: "var(--foreground)" } as const;

function Code({ title, children }: { title: string; children: string }) {
  return (
    <div className="rounded-lg p-4 mb-4" style={codeBox}>
      <p className="text-xs font-semibold mb-2" style={muted}>{title}</p>
      <pre className="text-sm overflow-x-auto" style={strong}>{children}</pre>
    </div>
  );
}

export default function EnviosPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={strong}>Envíos (Envia.com)</h1>
        <p className="text-lg mb-8" style={muted}>
          Cotiza y genera guías de Coordinadora, Servientrega, TCC, Inter Rapidísimo y otras
          transportadoras desde un contacto, a través de tu cuenta de Envia.com. Esta página resume
          la API; el detalle de cada campo está en la{" "}
          <Link href="/docs/api#reference" style={{ color: "#d1345b" }}>referencia</Link> (sección Shipments).
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Qué es</h2>
          <p className="mb-4" style={muted}>
            Un envío siempre sale de un contacto: el destino se toma de su dirección y ciudad, y lo
            que mandes en <code>destination</code> lo reemplaza. El origen es el que la organización
            configuró en la app (Ajustes → Envíos); no se envía por API. Estados:{" "}
            <code>draft</code> (se intentó generar y falló), <code>created</code> (guía generada, el
            único cancelable), <code>picked_up</code>, <code>in_transit</code>,{" "}
            <code>out_for_delivery</code>, <code>delivered</code> y los de excepción. El rastreo se
            actualiza solo por webhook y por una revisión periódica.
          </p>
        </section>

        <section id="setup" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Requisitos</h2>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• El <strong style={strong}>módulo Envíos</strong> activo en el plan (sin él, 403 <code>PLAN_MODULE_REQUIRED</code>).</li>
            <li>• La <strong style={strong}>API key de Envia.com</strong> en Configuración → Integraciones, con saldo en esa cuenta.</li>
            <li>• La <strong style={strong}>dirección de origen</strong> en Ajustes → Envíos.</li>
            <li>• Un token con <code>shipments:read</code> para cotizar y consultar, y <code>shipments:write</code> para generar, rastrear y cancelar.</li>
          </ul>
        </section>

        <section id="endpoints" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Endpoints y permisos</h2>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Operación</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Permiso</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Qué hace</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map(([method, path, perm, desc]) => (
                  <tr key={`${method} ${path}`}>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{method} {path}</td>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{perm}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-4" style={muted}>
            No hay borrado de envíos ni programación de recogidas por separado: la recogida se pide
            al generar (<code>pickup</code>).
          </p>
        </section>

        <section id="flow" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Cotizar y generar</h2>
          <p className="mb-4" style={muted}>
            Primero cotiza: la respuesta trae <code>rates</code> ordenadas por precio y{" "}
            <code>failed</code> con las transportadoras que no respondieron (una caída no tumba la
            cotización). De la tarifa elegida tomas <code>carrier</code> y <code>service</code>.
          </p>
          <Code title="1. Cotizar al contacto">{`curl -X POST "${API_BASE}/shipments/rates" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contactId": "66c74b4f66baaf700d2f13e4",
    "packages": [{ "content": "manillas", "weight": 1,
      "dimensions": { "length": 20, "width": 15, "height": 10 }, "declaredValue": 50000 }]
  }'`}</Code>
          <Code title="2. Generar la guía (cobra saldo)">{`curl -X POST "${API_BASE}/shipments" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contactId": "66c74b4f66baaf700d2f13e4",
    "carrier": "serviEntrega",
    "service": "premier",
    "packages": [{ "content": "manillas", "weight": 1,
      "dimensions": { "length": 20, "width": 15, "height": 10 }, "declaredValue": 50000 }],
    "idempotencyKey": "pedido-4521-1"
  }'`}</Code>
          <p className="mb-4" style={muted}>
            Opcionales: <code>destination</code> (pisa lo del contacto), <code>insurance</code>,{" "}
            <code>cod</code> (contra entrega, si el servicio lo soporta), <code>pickup</code> y{" "}
            <code>dealId</code>/<code>quotationId</code>/<code>invoiceId</code> para vincular el envío.
            Pesos en kg y medidas en cm.
          </p>
        </section>

        <section id="idempotency" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Idempotencia y cobro de saldo</h2>
          <p className="mb-4" style={muted}>
            Generar una guía <strong style={strong}>cobra saldo</strong> de tu cuenta de Envia, y FusionCRM
            llama a Envia <strong style={strong}>una sola vez</strong> por intento: nunca reintenta un
            generate por su cuenta. Para que tus reintentos no cobren dos veces, manda siempre{" "}
            <code>idempotencyKey</code> (1-100 caracteres, única en la organización):
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• <strong style={strong}>Misma clave y el envío ya tiene guía</strong> → 200 con <code>reused: true</code>, sin llamar a Envia (el body se ignora).</li>
            <li>• <strong style={strong}>Misma clave y el intento anterior falló</strong> (Envia rechazó la guía) → se vuelve a intentar sobre el mismo envío: 201 o de nuevo 422.</li>
            <li>• <strong style={strong}>Misma clave con un generate en curso</strong> → 409 <code>SHIPMENT_IN_PROGRESS</code>.</li>
            <li>• <strong style={strong}>Resultado desconocido</strong> (timeout de 25 s, red, 5xx) → 409 <code>SHIPMENT_NEEDS_REVIEW</code>. La guía pudo cobrarse; ese envío nunca se regenera solo. Revisa el panel de Envia y usa una clave nueva solo si no se creó.</li>
          </ul>
          <Callout type="warning">
            Usa una clave por <em>intento de envío</em> (<code>pedido-4521-1</code>), no por pedido: para
            generar otra guía después de cancelar la anterior necesitas una clave nueva. Sin clave, la
            protección es solo best-effort (una ventana de 30 segundos por contacto).
          </Callout>
        </section>

        <section id="city" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Ciudad del destino: 422 INVALID_CITY</h2>
          <p className="mb-4" style={muted}>
            La ciudad del destino se resuelve contra el{" "}
            <Link href="/docs/ciudades" style={{ color: "#d1345b" }}>catálogo DANE</Link>. Si el contacto ya
            tiene <code>cityCode</code>, se usa ese. Si no, o si mandas <code>destination.city</code>, tiene
            que ser inequívoca. Manda <code>destination.cityCode</code> (5 dígitos) para evitar dudas.
          </p>
          <p className="mb-4" style={muted}>
            El error de Envíos <strong style={strong}>no es el mismo</strong> que el{" "}
            <code>CITY_UNRESOLVED</code> de contactos: usa <code>code: INVALID_CITY</code>,{" "}
            <code>reason</code> (<code>ambiguous</code>, <code>fuzzy</code>, <code>none</code> o{" "}
            <code>unsupported_country</code>), <code>input</code> como objeto y candidatos con{" "}
            <code>name</code>, <code>dane8</code> y la sigla de departamento de Envia (<code>stateIso</code>).
            Reenvía con el <code>code</code> del candidato como <code>destination.cityCode</code>.
          </p>
          <Code title="422 INVALID_CITY">{`{
  "success": false,
  "code": "INVALID_CITY",
  "message": "La ciudad \\"Armenia\\" es ambigua; indica el departamento o el cityCode.",
  "reason": "ambiguous",
  "input": { "city": "Armenia" },
  "candidates": [
    { "code": "63001", "dane8": "63001000", "name": "Armenia", "stateCode": "63", "stateName": "Quindío" },
    { "code": "05059", "dane8": "05059000", "name": "Armenia", "stateCode": "05", "stateName": "Antioquia" }
  ]
}`}</Code>
          <p className="mb-4" style={muted}>
            Solo se envía dentro de Colombia: un destino con otro país responde 422{" "}
            <code>INVALID_CITY</code> con <code>reason: unsupported_country</code>.
          </p>
        </section>

        <section id="errors" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Otros errores</h2>
          <p className="mb-4" style={muted}>
            Todos llevan <code>success: false</code>, <code>code</code> y <code>message</code>; los de
            Envia agregan <code>error</code> normalizado (nunca la respuesta cruda del proveedor).
          </p>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>HTTP</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>code</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Cuándo</th>
                </tr>
              </thead>
              <tbody>
                {errors.map(([http, code, when]) => (
                  <tr key={code}>
                    <td className="p-3 border-b font-mono text-xs font-bold" style={{ borderColor: "var(--border)", color: "#ef4444" }}>{http}</td>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{code}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout type="tip">
            Desde una IA, el <Link href="/docs/mcp" style={{ color: "#d1345b" }}>MCP</Link> expone lo
            mismo con <code>quote_shipment</code>, <code>create_shipment</code>,{" "}
            <code>track_shipment</code> y <code>list_contact_shipments</code>.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/ciudades", title: "Ciudades: catálogo DANE" }}
          next={{ href: "/docs/mcp", title: "MCP: el CRM desde tu IA" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
