import type { Metadata } from "next";
import { MessageSquare, Mail, LifeBuoy } from "lucide-react";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Soporte" };

const toc = [
  { id: "contact", label: "Contactar a soporte" },
  { id: "in-app", label: "Desde la app" },
  { id: "before", label: "Antes de escribirnos" },
];

const fg = { color: "var(--foreground)" };
const muted = { color: "var(--muted-foreground)" };

export default function SupportPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={fg}>Soporte</h1>
        <p className="text-lg mb-8" style={muted}>
          ¿Algo no funciona como esperabas o tienes una duda que la documentación no resuelve? Escríbenos y te
          ayudamos.
        </p>

        <section id="contact" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Contactar a soporte</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <a
              href="https://wa.me/573024003914"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 rounded-xl border transition-all hover:shadow-md"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--card-border)", textDecoration: "none" }}
            >
              <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: "#22c55e" }}>
                <MessageSquare size={20} />
              </span>
              <span>
                <span className="block font-semibold" style={fg}>WhatsApp</span>
                <span className="block text-sm" style={muted}>+57 302 400 3914</span>
                <span className="block text-xs mt-1" style={muted}>La forma más rápida de recibir ayuda.</span>
              </span>
            </a>
            <a
              href="mailto:comercial@fusioncol.com"
              className="flex items-start gap-4 p-5 rounded-xl border transition-all hover:shadow-md"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--card-border)", textDecoration: "none" }}
            >
              <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: "#d1345b" }}>
                <Mail size={20} />
              </span>
              <span>
                <span className="block font-semibold" style={fg}>Correo</span>
                <span className="block text-sm" style={muted}>comercial@fusioncol.com</span>
                <span className="block text-xs mt-1" style={muted}>Para temas de planes, módulos, facturación de tu suscripción o casos que necesiten adjuntos.</span>
              </span>
            </a>
          </div>
        </section>

        <section id="in-app" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Desde la app</h2>
          <p className="mb-4" style={muted}>
            Dentro de FusionCRM, abre el menú de tu usuario (arriba a la derecha) y elige{" "}
            <strong style={fg}><LifeBuoy size={14} className="inline -mt-0.5" /> Soporte</strong>: ahí tienes los mismos
            datos de contacto a un clic. En ese menú también está <strong style={fg}>Ayuda y primeros pasos</strong>, que
            te vuelve a mostrar la guía inicial.
          </p>
        </section>

        <section id="before" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={fg}>Antes de escribirnos</h2>
          <p className="mb-4" style={muted}>Para resolverlo más rápido, cuéntanos:</p>
          <ul className="space-y-2 pl-4 mb-4" style={muted}>
            <li>• El nombre de tu organización y el correo con el que entras.</li>
            <li>• Qué estabas haciendo, qué esperabas que pasara y qué pasó.</li>
            <li>• Una captura de pantalla o un video corto del problema, si puedes.</li>
            <li>• Si es con un cliente o un chat concreto, su nombre o su número.</li>
          </ul>
          <Callout type="tip">
            Muchas dudas ya están resueltas aquí: prueba el buscador de arriba (o <strong>⌘K</strong> / <strong>Ctrl K</strong>).
            Si vienes del WhatsApp del celular, empieza por{" "}
            <a href="/docs/conversations#iniciar-whatsapp" style={{ color: "#d1345b" }}>Cómo escribirle a un cliente por WhatsApp</a>.
          </Callout>
          <Callout type="note">
            Nunca te pediremos tu contraseña. Si alguien la pide a nombre de FusionCRM, no la compartas.
          </Callout>
        </section>

        <DocNav prev={{ href: "/docs/mcp", title: "MCP (IA)" }} />
      </article>
      <TableOfContents items={toc} />
    </div>
  );
}
