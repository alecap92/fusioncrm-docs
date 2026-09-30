import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Ciudades: catálogo DANE" };

const API_BASE = "https://api.fusioncol.com/api";

const toc = [
  { id: "overview", label: "Cómo se guarda una ciudad" },
  { id: "fields", label: "Los cuatro campos" },
  { id: "catalog", label: "Catálogo: municipios y departamentos" },
  { id: "cache", label: "Caché y ETag", depth: 3 },
  { id: "write", label: "Crear y actualizar con ciudad" },
  { id: "errors", label: "Errores de ciudad" },
  { id: "other-paths", label: "Formularios, importación y filtros" },
];

const fields = [
  ["cityCode", "Código DANE del municipio, 5 dígitos (05001 = Medellín, 76001 = Cali, 11001 = Bogotá).", "Es la fuente de verdad. Lo envías tú."],
  ["city", "Nombre corto del municipio (\"Medellín\").", "Se deriva de cityCode. Si solo mandas city, el servidor busca el código."],
  ["state", "Departamento en texto (\"Antioquia\").", "Se deriva de cityCode. Enviado solo sirve de pista para desambiguar city."],
  ["stateCode", "Código DANE del departamento, 2 dígitos (05 = Antioquia).", "Siempre lo calcula el servidor: el valor que envíes se ignora."],
];

const cityErrors = [
  ["422", "CITY_UNRESOLVED", "city es ambigua (Rionegro existe en Antioquia y en Santander), está mal escrita (Medelin) o no existe. No se guarda nada; candidates trae los municipios posibles."],
  ["400", "INVALID_CITY_CODE", "El cityCode no existe en el catálogo. candidates llega vacío."],
  ["400", "STATE_UNKNOWN / LIMIT_INVALID", "Solo en /catalogs/municipalities: state no es un departamento o limit está fuera de 1-1200."],
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

export default function CiudadesPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={strong}>Ciudades: catálogo DANE</h1>
        <p className="text-lg mb-8" style={muted}>
          La ciudad de contactos, empresas y de la organización se guarda con el código oficial
          DANE/DIVIPOLA del municipio. Así &quot;BOGOTA&quot;, &quot;Bogotá D.C.&quot; y &quot;bogota&quot; son
          el mismo lugar, los filtros por ciudad o departamento funcionan y el dato sirve tal cual
          para facturación electrónica y envíos.
        </p>

        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Cómo se guarda una ciudad</h2>
          <p className="mb-4" style={muted}>
            El catálogo tiene los <strong style={strong}>1.122 municipios</strong> y los{" "}
            <strong style={strong}>33 departamentos</strong> de Colombia (Bogotá D.C. cuenta como
            departamento, código 11). Cuando envías un <code>cityCode</code> válido, FusionCRM escribe
            por ti el nombre de la ciudad, el departamento y el código del departamento.
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• <strong style={strong}>Por API, formularios públicos y MCP la ciudad es estricta:</strong> o se resuelve sin dudas contra el catálogo, o la petición falla con los candidatos para que elijas.</li>
            <li>• <strong style={strong}>En la app y en el importador de Excel es flexible:</strong> un texto que no se reconoce se guarda igual como ciudad <em>sin confirmar</em> (<code>city</code> con valor y <code>cityCode</code> vacío) y aparece en la lista dinámica &quot;Ciudades sin confirmar&quot;.</li>
            <li>• <strong style={strong}>Solo Colombia:</strong> si el contacto tiene un <code>country</code> distinto de Colombia, <code>city</code> se guarda como texto libre sin código ni validación.</li>
            <li>• FusionCRM nunca elige un &quot;mejor candidato&quot; por ti: 66 municipios comparten nombre (La Unión, Rionegro, Armenia, Villanueva…).</li>
          </ul>
        </section>

        <section id="fields" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Los cuatro campos</h2>
          <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--muted)" }}>
                <tr>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Campo</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Qué es</th>
                  <th className="text-left p-3 border-b font-semibold" style={{ borderColor: "var(--border)" }}>Quién lo escribe</th>
                </tr>
              </thead>
              <tbody>
                {fields.map(([field, what, who]) => (
                  <tr key={field}>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{field}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{what}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-4" style={muted}>
            Los cuatro llegan en la respuesta de contactos y empresas. Para buscar o filtrar usa
            siempre los códigos: el texto puede venir con otra grafía en datos antiguos.
          </p>
        </section>

        <section id="catalog" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Catálogo: municipios y departamentos</h2>
          <p className="mb-4" style={muted}>
            Dos endpoints de solo lectura que acepta <strong style={strong}>cualquier token válido</strong>,
            sin permiso especial:
          </p>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• <code style={{ color: "#d1345b" }}>GET /catalogs/municipalities</code> — sin parámetros devuelve el catálogo completo. Con <code>q</code> busca por nombre (sin tildes ni mayúsculas, capitales primero, 20 resultados por defecto); <code>state</code> acota a un departamento (&quot;05&quot;) y <code>limit</code> va de 1 a 1200.</li>
            <li>• <code style={{ color: "#d1345b" }}>GET /catalogs/states</code> — los 33 departamentos con código, nombre oficial, nombre corto e ISO 3166-2.</li>
          </ul>
          <Code title="Buscar el código de una ciudad">{`curl "${API_BASE}/catalogs/municipalities?q=rionegro" \\
  -H "Authorization: Bearer <token>"`}</Code>
          <Code title="Respuesta: dos municipios con el mismo nombre; mira stateName antes de elegir">{`{
  "success": true,
  "version": "divipola-2024-12-30.b17287ee",
  "count": 2,
  "data": [
    { "code": "05615", "name": "Rionegro", "shortName": "Rionegro",
      "stateCode": "05", "stateName": "Antioquia", "stateIso2": "ANT", "dane8": "05615000" },
    { "code": "68615", "name": "Rionegro", "shortName": "Rionegro",
      "stateCode": "68", "stateName": "Santander", "stateIso2": "SAN", "dane8": "68615000" }
  ]
}`}</Code>
          <p className="mb-4" style={muted}>
            <code>code</code> es el valor que va en <code>cityCode</code>. <code>shortName</code> es lo
            que el CRM muestra y guarda en <code>city</code>. <code>dane8</code> es el código de la
            cabecera municipal (<code>code</code> + &quot;000&quot;), el que piden algunas transportadoras.
          </p>
          <Code title="Todos los municipios de un departamento">{`curl "${API_BASE}/catalogs/municipalities?state=05" \\
  -H "Authorization: Bearer <token>"`}</Code>

          <div id="cache" className="mt-6">
            <h3 className="text-xl font-semibold mb-3" style={strong}>Caché y ETag</h3>
            <p className="mb-4" style={muted}>
              El catálogo cambia muy poco (se regenera cuando el DANE publica un corte nuevo). Las
              respuestas traen <code>Cache-Control: public, max-age=86400</code> y un{" "}
              <code>ETag</code> con la versión del catálogo. Descárgalo una vez, búscalo en local y
              revalida con <code>If-None-Match</code>: mientras no cambie recibes{" "}
              <strong style={strong}>304</strong> sin cuerpo.
            </p>
            <Code title="Revalidar la copia local">{`curl -i "${API_BASE}/catalogs/municipalities" \\
  -H "Authorization: Bearer <token>" \\
  -H 'If-None-Match: "<etag de la respuesta anterior>"'
# HTTP/1.1 304 Not Modified`}</Code>
          </div>
        </section>

        <section id="write" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Crear y actualizar con ciudad</h2>
          <p className="mb-4" style={muted}>
            En <code>POST</code> y <code>PUT</code> de <code>/contacts</code> y <code>/companies</code> tienes
            tres formas de indicar la ciudad, de mejor a peor:
          </p>
          <ol className="space-y-2 pl-4 mb-4" style={muted}>
            <li>1. <strong style={strong}><code>cityCode</code></strong>: gana sobre cualquier texto y deriva todo lo demás.</li>
            <li>2. <strong style={strong}><code>city</code> + <code>state</code></strong>: el departamento desambigua homónimos (Rionegro + Santander → 68615).</li>
            <li>3. <strong style={strong}>Solo <code>city</code></strong>: funciona si el nombre es único y está bien escrito; si no, 422.</li>
          </ol>
          <Code title="Crear un contacto con el código DANE">{`curl -X POST "${API_BASE}/contacts" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "Ana",
    "email": "ana@example.com",
    "cityCode": "76001"
  }'
# Guarda city "Cali", state "Valle del Cauca" y stateCode "76"`}</Code>
          <p className="mb-4" style={muted}>
            Si el body no trae <code>city</code>, <code>cityCode</code> ni <code>state</code>, la
            ubicación guardada no se toca. En <code>PUT /contacts/&#123;id&#125;</code>, un <code>city</code> vacío (<code>&quot;&quot;</code>)
            limpia la ciudad, el código y el departamento derivado.
          </p>
        </section>

        <section id="errors" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Errores de ciudad</h2>
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
                {cityErrors.map(([http, code, when]) => (
                  <tr key={code}>
                    <td className="p-3 border-b font-mono text-xs font-bold" style={{ borderColor: "var(--border)", color: "#ef4444" }}>{http}</td>
                    <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--border)", color: "#d1345b" }}>{code}</td>
                    <td className="p-3 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Code title="422 CITY_UNRESOLVED: reenvía con uno de los candidates como cityCode">{`{
  "success": false,
  "error": "CITY_UNRESOLVED",
  "code": "CITY_UNRESOLVED",
  "message": "La ciudad \\"Rionegro\\" corresponde a varios municipios; indique cityCode o el departamento",
  "input": "Rionegro",
  "status": "ambiguous",
  "candidates": [
    { "code": "05615", "shortName": "Rionegro", "stateName": "Antioquia", "stateCode": "05" },
    { "code": "68615", "shortName": "Rionegro", "stateName": "Santander", "stateCode": "68" }
  ]
}`}</Code>
          <p className="mb-4" style={muted}>
            <code>status</code> dice por qué falló: <code>ambiguous</code> (varios municipios),{" "}
            <code>fuzzy</code> (parecido pero no exacto, como &quot;Medelin&quot;), <code>none</code> (nada
            parecido; <code>candidates</code> vacío) o <code>invalid_code</code> (el 400 de un{" "}
            <code>cityCode</code> inexistente).
          </p>
          <Callout type="note">
            El módulo de <Link href="/docs/envios" style={{ color: "#d1345b" }}>Envíos</Link> usa su propio
            error de ciudad, <code>422 INVALID_CITY</code>, con otra forma de cuerpo (<code>reason</code>,{" "}
            <code>input</code> como objeto y candidatos con <code>dane8</code>). Está explicado en su página.
          </Callout>
        </section>

        <section id="other-paths" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={strong}>Formularios, importación y filtros</h2>
          <ul className="space-y-3 pl-4 mb-4" style={muted}>
            <li>
              • <strong style={strong}>Formularios web</strong> (<code>POST /forms/&#123;id&#125;/submit</code> y el
              formulario público): la ciudad es estricta. Una ciudad no resuelta responde{" "}
              <strong style={strong}>400</strong> (no 422) con <code>code: CITY_UNRESOLVED</code>, un mensaje
              para mostrarle al visitante y los <code>candidates</code>; el contacto no se crea. Un campo{" "}
              <code>departamento</code>, <code>depto</code>, <code>dpto</code> o <code>estado</code> se toma como{" "}
              <code>state</code> y ayuda con los homónimos.
            </li>
            <li>
              • <strong style={strong}>Importación por API</strong> (<code>POST /import/contacts</code>):{" "}
              <code>locationMode: &quot;lenient&quot;</code> (por defecto, igual que el Excel de la app) guarda las
              ciudades no reconocidas como <em>sin confirmar</em> y las resume en <code>warnings</code>;{" "}
              <code>&quot;strict&quot;</code> rechaza esas filas en <code>rejectedRows</code> con los candidatos
              en <code>reason</code>. Prueba primero con <code>dryRun: true</code>.
            </li>
            <li>
              • <strong style={strong}>Filtrar contactos o empresas</strong>: por municipio{" "}
              <code>?cityCode=05001&amp;matchMode=exact</code>; por departamento entero{" "}
              <code>?stateCode=05&amp;matchMode=exact</code>. Repetir la clave hace un OR
              (<code>?cityCode=05001&amp;cityCode=76001</code>).
            </li>
            <li>
              • <strong style={strong}>MCP</strong>: los tools de contactos y empresas aceptan{" "}
              <code>cityCode</code> y devuelven los mismos candidatos; ver{" "}
              <Link href="/docs/mcp" style={{ color: "#d1345b" }}>MCP</Link>.
            </li>
          </ul>
          <Callout type="tip">
            Para limpiar una base vieja: filtra los contactos con <code>city</code> con valor y{" "}
            <code>cityCode</code> vacío (la lista &quot;Ciudades sin confirmar&quot; ya lo hace en la app),
            resuelve cada ciudad con <code>/catalogs/municipalities?q=</code> y actualiza con{" "}
            <code>PUT /contacts/&#123;id&#125;</code> mandando solo <code>cityCode</code>.
          </Callout>
        </section>

        <DocNav
          prev={{ href: "/docs/api", title: "API REST" }}
          next={{ href: "/docs/envios", title: "Envíos (Envia.com)" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
