import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = {
  title: "¿Qué es un CRM y para qué sirve?",
  description:
    "Qué es un CRM, cómo se ve un negocio que vende por WhatsApp sin uno, por qué importa y los conceptos clave: contactos, embudo de ventas, negocios y seguimiento.",
  keywords: ["qué es un CRM", "para qué sirve un CRM", "CRM para WhatsApp", "embudo de ventas", "CRM para emprendedores"],
  alternates: { canonical: "/docs/que-es-un-crm" },
  openGraph: {
    title: "¿Qué es un CRM y para qué sirve?",
    description:
      "Qué es un CRM, cómo se ve un negocio que vende por WhatsApp sin uno, por qué importa y los conceptos clave: contactos, embudo de ventas, negocios y seguimiento.",
    url: "/docs/que-es-un-crm",
    siteName: "FusionCRM Docs",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FusionCRM Docs: el CRM para negocios que venden por WhatsApp" }],
    type: "website",
  },
};

const toc = [
  { id: "definicion", label: "¿Qué es un CRM?" },
  { id: "sin-crm", label: "Cómo se ve un negocio sin CRM" },
  { id: "por-que", label: "Por qué es importante" },
  { id: "conceptos", label: "Conceptos básicos" },
  { id: "fusioncrm", label: "Cómo lo resuelve FusionCRM" },
];

const fg = { color: "var(--foreground)" };
const muted = { color: "var(--muted-foreground)" };

const concepts = [
  { t: "Contacto", d: "Una persona con la que tu negocio tiene relación: un cliente, un prospecto o un proveedor. Tiene su ficha con datos, historial y conversaciones.", href: "/docs/contacts" },
  { t: "Empresa", d: "La organización a la que pertenecen uno o varios contactos. Útil cuando le vendes a otras empresas.", href: "/docs/companies" },
  { t: "Lead o prospecto", d: "Alguien que mostró interés (te escribió, llenó un formulario) pero todavía no te ha comprado.", href: "/docs/lead-scoring" },
  { t: "Negocio u oportunidad", d: "Una venta posible con un valor y una fecha estimada de cierre. Un mismo cliente puede tener varios negocios.", href: "/docs/deals" },
  { t: "Embudo o pipeline", d: "Las etapas por las que pasa una venta, por ejemplo: Nuevo → Cotizado → Negociación → Ganado o Perdido.", href: "/docs/pipelines" },
  { t: "Actividad", d: "Todo lo que pasa con un cliente: una llamada, una reunión, una nota, un correo o un mensaje. Queda guardado en su ficha.", href: "/docs/contacts#detail-tabs" },
  { t: "Automatización", d: "Una regla que hace algo sola cuando pasa otra cosa: por ejemplo, enviar un mensaje de bienvenida cuando entra un lead nuevo.", href: "/docs/workflows" },
];

export default function WhatIsCrmPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={fg}>¿Qué es un CRM?</h1>
        <p className="text-lg mb-8" style={muted}>
          Si nunca has usado uno, empieza aquí. En cinco minutos entiendes qué es, para qué sirve y por qué tantos
          negocios no vuelven a trabajar sin él.
        </p>

        <section id="definicion" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>¿Qué es un CRM?</h2>
          <p className="mb-4" style={muted}>
            CRM viene del inglés <em>Customer Relationship Management</em>: gestión de la relación con los clientes. Es
            una herramienta donde guardas, en un solo lugar, todo lo que tiene que ver con tus clientes: quiénes son,
            qué te han preguntado, qué les cotizaste, qué te compraron y qué falta por hacer con cada uno.
          </p>
          <p className="mb-4" style={muted}>
            Piénsalo como la memoria de tu negocio. En vez de que esa información viva en la cabeza de cada vendedor,
            en chats sueltos o en hojas de Excel, queda organizada y disponible para todo tu equipo.
          </p>
        </section>

        <section id="sin-crm" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Cómo se ve un negocio sin CRM</h2>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• Los chats de clientes están repartidos en varios celulares y, si alguien se va, se lleva sus clientes.</li>
            <li>• Nadie sabe si a ese cliente ya le respondieron, quién lo atendió o qué se le prometió.</li>
            <li>• Las cotizaciones se hacen a mano cada vez y no se sabe cuáles se ganaron.</li>
            <li>• Se olvidan los seguimientos: el cliente que dijo &quot;te confirmo la otra semana&quot; nunca volvió a recibir un mensaje.</li>
            <li>• Para saber cuánto se vendió en el mes hay que sumar a mano.</li>
          </ul>
          <Callout type="note">
            Ninguno de esos problemas es por falta de ganas: es por falta de un sistema. Con pocos clientes se puede
            manejar de memoria; cuando el negocio crece, se empieza a perder plata sin darse cuenta.
          </Callout>
        </section>

        <section id="por-que" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Por qué es importante usar un CRM</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              { t: "Vendes más", d: "Ningún cliente interesado se queda sin respuesta ni sin seguimiento, y sabes en qué etapa va cada venta." },
              { t: "Atiendes mejor", d: "Cualquier persona del equipo ve el historial completo del cliente y responde sin hacerle repetir todo." },
              { t: "Ahorras tiempo", d: "Cotizaciones, mensajes de seguimiento y recordatorios salen con un clic o solos." },
              { t: "Decides con datos", d: "Ves cuánto vendes, de dónde llegan tus clientes, qué se pierde y por qué, y quién de tu equipo rinde más." },
              { t: "Tu información es del negocio", d: "Los clientes y las conversaciones quedan en la empresa, no en el celular de una persona." },
              { t: "Creces con orden", d: "Puedes sumar vendedores y canales sin que el caos crezca al mismo ritmo." },
            ].map((b) => (
              <div key={b.t} className="p-4 rounded-xl border" style={{ backgroundColor: "var(--card)", borderColor: "var(--card-border)" }}>
                <h3 className="font-semibold mb-1" style={fg}>{b.t}</h3>
                <p className="m-0 text-sm leading-relaxed" style={muted}>{b.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="conceptos" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Conceptos básicos</h2>
          <p className="mb-4" style={muted}>Estas palabras aparecen en toda la documentación. Así se usan en FusionCRM:</p>
          <div className="flex flex-col gap-3 mb-4">
            {concepts.map((c) => (
              <div key={c.t} className="p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                <p className="m-0 font-semibold" style={fg}>
                  {c.t} <a href={c.href} className="text-xs font-normal ml-1" style={{ color: "#d1345b" }}>Ver más →</a>
                </p>
                <p className="m-0 mt-1 text-sm leading-relaxed" style={muted}>{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="fusioncrm" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Cómo lo resuelve FusionCRM</h2>
          <p className="mb-4" style={muted}>
            La mayoría de CRM nacieron para vender por correo y teléfono. FusionCRM nació para negocios que venden
            por WhatsApp: los chats llegan directo al CRM, se convierten en contactos y negocios, y desde ahí mismo
            cotizas, facturas y despachas.
          </p>
          <p className="mb-4" style={muted}>
            Conoce todo lo que incluye en <a href="/docs" style={{ color: "#d1345b" }}>¿Qué es FusionCRM?</a>, o pasa
            directo a la <a href="/docs/getting-started" style={{ color: "#d1345b" }}>ruta para empezar</a>.
          </p>
        </section>

        <DocNav
          prev={{ href: "/docs", title: "¿Qué es FusionCRM?" }}
          next={{ href: "/docs/getting-started", title: "Primeros pasos" }}
        />
      </article>
      <TableOfContents items={toc} />
    </div>
  );
}
