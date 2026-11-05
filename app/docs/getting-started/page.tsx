import type { Metadata } from "next";
import Callout from "@/components/Callout";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import DocNav from "@/components/DocNav";

export const metadata: Metadata = { title: "Primeros Pasos" };

const toc = [
  { id: "que-es", label: "¿Qué es FusionCRM?" },
  { id: "acceder", label: "Cómo acceder" },
  { id: "registro", label: "Registro de cuenta" },
  { id: "navegacion", label: "Navegación general" },
  { id: "menus", label: "Menús de módulos" },
  { id: "topbar", label: "Barra superior" },
  { id: "perfil", label: "Tu cuenta y tu organización" },
];

export default function GettingStartedPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      <article className="flex-1 min-w-0">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Primeros Pasos</h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Todo lo que necesitas saber para comenzar a usar FusionCRM desde cero.
        </p>

        <section id="que-es" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>¿Qué es FusionCRM?</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            FusionCRM es una plataforma de gestión de relaciones con clientes (CRM) todo en uno, diseñada
            para empresas que buscan centralizar sus operaciones de ventas, comunicación y marketing.
          </p>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Con FusionCRM puedes:
          </p>
          <ul className="space-y-2 mb-4 pl-4" style={{ color: "var(--muted-foreground)" }}>
            {[
              "Gestionar contactos y clientes en un directorio unificado",
              "Llevar el seguimiento de oportunidades de venta (deals) en pipelines visuales",
              "Atender WhatsApp, Messenger e Instagram desde una sola bandeja, y tu correo en el mismo CRM",
              "Automatizar tareas repetitivas con workflows sin código",
              "Generar cotizaciones e informes de ventas, y facturas electrónicas DIAN con el módulo adicional",
              "Integrar con herramientas externas como N8N, WhatsApp Business y más",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span style={{ color: "#d1345b" }}>✓</span> {item}
              </li>
            ))}
          </ul>
          <Callout type="tip">
            FusionCRM está pensado para el mercado latinoamericano, con WhatsApp como canal principal de
            comunicación. La facturación electrónica según la normativa DIAN de Colombia es un módulo
            adicional que se activa aparte.
          </Callout>
        </section>

        <section id="acceder" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Cómo acceder</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            FusionCRM es una aplicación web. Entras desde cualquier navegador moderno (Chrome, Firefox,
            Safari, Edge) en la misma dirección para todos:
          </p>
          <div
            className="rounded-lg p-4 mb-4 font-mono text-sm"
            style={{ backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" }}
          >
            <span style={{ color: "var(--muted-foreground)" }}>URL de acceso:</span>{" "}
            <span style={{ color: "#d1345b" }}>https://app.fusioncol.com</span>
          </div>
          <Callout type="note">
            Para entrar necesitas una cuenta activa: regístrate tú mismo o pídele al propietario de tu
            empresa que te cree un usuario. Puedes entrar con correo y contraseña o con{" "}
            <strong>Continuar con Google</strong>. Si olvidaste tu contraseña, usa{" "}
            <strong>¿Olvidaste la contraseña?</strong> en la pantalla de inicio de sesión. Si tienes activada la
            verificación en dos pasos (o tu empresa la exige), después de la contraseña te pedirá el código
            de tu app de autenticación.
          </Callout>
        </section>

        <section id="registro" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Registro de cuenta</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para crear una cuenta nueva, sigue estos pasos:
          </p>
          <ol className="space-y-4 mb-6">
            {[
              { n: "1", title: "Abre la página de registro", desc: 'Entra a app.fusioncol.com y toca "Crear cuenta gratis".' },
              { n: "2", title: "Ingresa tus datos", desc: 'Escribe tu nombre, apellido, correo, teléfono y una contraseña de al menos 8 caracteres con una mayúscula y un número. También puedes usar "Continuar con Google".' },
              { n: "3", title: "Acepta los términos", desc: 'Marca la casilla de Términos y Condiciones, Política de Privacidad y Política de Garantía y SLA, y toca "Crear cuenta". Entras al CRM de una vez, sin correo de verificación.' },
              { n: "4", title: "Completa los datos de tu empresa", desc: "Ve a Configuración → Organización y llena el nombre, NIT, logo y dirección de tu empresa." },
            ].map((step) => (
              <li key={step.n} className="flex gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: "#1f2a48" }}
                >
                  {step.n}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: "var(--foreground)" }}>{step.title}</p>
                  <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <Callout type="warning">
            Si tu empresa ya usa FusionCRM, NO crees una cuenta nueva. Pídele al propietario que te cree un
            usuario en <strong>Configuración → Usuarios → Crear Usuario</strong>; él te dará una contraseña
            temporal que luego cambias en Configuración → Seguridad.
          </Callout>
        </section>

        <section id="navegacion" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Navegación general</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La pantalla de FusionCRM tiene dos zonas. En el celular, los menús quedan dentro del botón ☰.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Barra superior", desc: "Los menús de los módulos, la búsqueda, las notificaciones y el menú de tu organización." },
              { title: "Área de contenido", desc: "Panel central donde se muestra la información y herramientas de cada módulo." },
            ].map((z) => (
              <div
                key={z.title}
                className="p-4 rounded-lg border"
                style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
              >
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{z.title}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{z.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="menus" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Menús de módulos</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Los módulos del CRM están en cinco menús desplegables de la barra superior:
          </p>
          <table className="w-full text-sm border-collapse mb-4">
            <thead>
              <tr style={{ backgroundColor: "var(--muted)" }}>
                <th className="text-left p-3 border font-semibold" style={{ borderColor: "var(--border)" }}>Menú</th>
                <th className="text-left p-3 border font-semibold" style={{ borderColor: "var(--border)" }}>Qué encuentras</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Contactos", "Directorio de Contactos, Empresas, Grupos y Listas"],
                ["Negocio", "Oportunidades (tu pipeline de ventas), Cotizaciones, Productos e Informes"],
                ["Facturación", "Facturas, Notas crédito y débito, Cuentas por cobrar, Compras, Documentos Soporte e Informes. Solo aparece si tienes el módulo de Facturación electrónica."],
                ["Comunicación", "WhatsApp (la bandeja de WhatsApp, Messenger e Instagram), Correo, Email Marketing, WhatsApp Masivo, Formularios, Páginas, Plantillas de WhatsApp, Fragmentos y Biblioteca"],
                ["Planeación", "Calendario, Proyectos y tareas, Estrategia y Automatizaciones"],
              ].map(([menu, desc]) => (
                <tr key={menu}>
                  <td className="p-3 border font-medium" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{menu}</td>
                  <td className="p-3 border" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ color: "var(--muted-foreground)" }}>
            Configuración no está en estos menús: la abres desde el ícono de tu organización, arriba a la derecha.
          </p>
        </section>

        <section id="topbar" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Barra superior</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La barra superior contiene:
          </p>
          <ul className="space-y-2 pl-4" style={{ color: "var(--muted-foreground)" }}>
            <li><strong style={{ color: "var(--foreground)" }}>Búsqueda global (⌘K en Mac, Ctrl+K en Windows):</strong> encuentra contactos, empresas, negocios y conversaciones desde cualquier pantalla.</li>
            <li><strong style={{ color: "var(--foreground)" }}>Notificaciones:</strong> alertas de actividad, menciones y recordatorios.</li>
            <li><strong style={{ color: "var(--foreground)" }}>Menú de tu organización</strong> (el ícono de la derecha): Configuración, Ayuda y primeros pasos (la guía de bienvenida), Soporte y Cerrar Sesión.</li>
          </ul>
        </section>

        <section id="perfil" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Perfil y organización</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            No hay una pantalla de "perfil": lo de tu cuenta vive en Configuración.
          </p>
          <ul className="space-y-1 pl-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Cambia tu contraseña y activa la verificación en dos pasos en <strong style={{ color: "var(--foreground)" }}>Configuración → Seguridad</strong>.</li>
            <li>• Elige qué avisos recibir (Campana, Celular o Correo) en <strong style={{ color: "var(--foreground)" }}>Configuración → Notificaciones</strong>.</li>
            <li>• Cierra sesión desde el menú de tu organización → Cerrar Sesión.</li>
            <li>• ¿Necesitas ayuda? En ese mismo menú, <strong style={{ color: "var(--foreground)" }}>Soporte</strong> te lleva al WhatsApp +57 302 400 3914 y al correo comercial@fusioncol.com.</li>
          </ul>
          <Callout type="tip">
            Para configurar los datos de tu organización (logo, nombre, dirección), ve a
            <strong> Configuración → Organización</strong>.
          </Callout>
        </section>

        <DocNav
          next={{ href: "/docs/contacts", title: "Contactos" }}
        />
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
