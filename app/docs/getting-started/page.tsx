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
  { id: "sidebar", label: "Barra lateral" },
  { id: "topbar", label: "Barra superior" },
  { id: "perfil", label: "Perfil y organización" },
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
              "Comunicarte con clientes por WhatsApp, email y chat desde una sola bandeja",
              "Automatizar tareas repetitivas con workflows sin código",
              "Generar cotizaciones, facturas electrónicas y reportes de ventas",
              "Integrar con herramientas externas como N8N, WhatsApp Business y más",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span style={{ color: "#d1345b" }}>✓</span> {item}
              </li>
            ))}
          </ul>
          <Callout type="tip">
            FusionCRM está optimizado para el mercado latinoamericano, con soporte para facturación
            electrónica según normativa DIAN Colombia y WhatsApp como canal principal de comunicación.
          </Callout>
        </section>

        <section id="acceder" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Cómo acceder</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            FusionCRM es una aplicación web. Puedes acceder desde cualquier navegador moderno
            (Chrome, Firefox, Safari, Edge) en la URL proporcionada por tu administrador.
          </p>
          <div
            className="rounded-lg p-4 mb-4 font-mono text-sm"
            style={{ backgroundColor: "var(--code-bg)", border: "1px solid var(--border)" }}
          >
            <span style={{ color: "var(--muted-foreground)" }}>URL de acceso:</span>{" "}
            <span style={{ color: "#d1345b" }}>https://app.fusioncol.com</span>
          </div>
          <Callout type="note">
            Para acceder necesitas una cuenta activa. Solicita tus credenciales al administrador de tu
            organización o regístrate directamente en la plataforma.
          </Callout>
        </section>

        <section id="registro" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Registro de cuenta</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para crear una cuenta nueva, sigue estos pasos:
          </p>
          <ol className="space-y-4 mb-6">
            {[
              { n: "1", title: "Visita la página de registro", desc: 'Ve a la URL de FusionCRM y haz clic en "Crear cuenta" o "Registrarse".' },
              { n: "2", title: "Ingresa tus datos", desc: "Completa el formulario con tu nombre, correo electrónico y contraseña segura. La contraseña debe tener al menos 8 caracteres." },
              { n: "3", title: "Configura tu organización", desc: "Ingresa el nombre de tu empresa y selecciona tu industria. Esto personaliza la experiencia en el CRM." },
              { n: "4", title: "Verifica tu correo", desc: "Recibirás un email de verificación. Haz clic en el enlace para activar tu cuenta." },
              { n: "5", title: "Inicia sesión", desc: "Con tu cuenta verificada, ingresa tus credenciales en la pantalla de login." },
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
            Si tu organización ya tiene una cuenta, NO crees una cuenta nueva. Pide a tu administrador
            que te invite desde <strong>Configuración → Usuarios → Invitar usuario</strong>.
          </Callout>
        </section>

        <section id="navegacion" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Navegación general</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La interfaz de FusionCRM está compuesta por tres zonas principales:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { title: "Barra lateral izquierda", desc: "Navegación principal entre módulos (Contactos, Deals, Conversaciones, etc.)" },
              { title: "Barra superior", desc: "Acceso rápido a búsqueda, notificaciones y perfil de usuario." },
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

        <section id="sidebar" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Barra lateral</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La barra lateral izquierda es tu punto de navegación principal. Contiene accesos directos
            a todos los módulos del CRM organizados por categoría.
          </p>
          <table className="w-full text-sm border-collapse mb-4">
            <thead>
              <tr style={{ backgroundColor: "var(--muted)" }}>
                <th className="text-left p-3 border font-semibold" style={{ borderColor: "var(--border)" }}>Ícono / Sección</th>
                <th className="text-left p-3 border font-semibold" style={{ borderColor: "var(--border)" }}>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Deals", "Vista Kanban del pipeline de ventas"],
                ["Contactos", "Directorio de clientes y prospectos"],
                ["Conversaciones", "Bandeja unificada de WhatsApp y email"],
                ["Email", "Gestión de correos electrónicos"],
                ["Calendario", "Vista de citas y eventos"],
                ["Cotizaciones", "Presupuestos y propuestas comerciales"],
                ["Facturas", "Facturación electrónica DIAN"],
                ["Reportes", "Analytics y reportes de negocio"],
                ["Automatizaciones", "Editor de workflows"],
                ["Configuración", "Ajustes de organización y sistema"],
              ].map(([icon, desc]) => (
                <tr key={icon}>
                  <td className="p-3 border font-medium" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>{icon}</td>
                  <td className="p-3 border" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="topbar" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Barra superior</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            La barra superior contiene:
          </p>
          <ul className="space-y-2 pl-4" style={{ color: "var(--muted-foreground)" }}>
            <li><strong style={{ color: "var(--foreground)" }}>Búsqueda global:</strong> Busca contactos, deals o conversaciones desde cualquier pantalla.</li>
            <li><strong style={{ color: "var(--foreground)" }}>Notificaciones:</strong> Alertas de actividad, menciones y recordatorios.</li>
            <li><strong style={{ color: "var(--foreground)" }}>Perfil de usuario:</strong> Acceso a tu perfil, cambio de contraseña y cierre de sesión.</li>
            <li><strong style={{ color: "var(--foreground)" }}>Spikey AI:</strong> Botón para abrir el asistente de inteligencia artificial.</li>
          </ul>
        </section>

        <section id="perfil" className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Perfil y organización</h2>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            Para editar tu perfil, haz clic en tu avatar en la esquina superior derecha y selecciona
            <strong> "Mi perfil"</strong>. Desde allí puedes:
          </p>
          <ul className="space-y-1 pl-4" style={{ color: "var(--muted-foreground)" }}>
            <li>• Actualizar tu nombre y foto de perfil</li>
            <li>• Cambiar tu contraseña</li>
            <li>• Configurar notificaciones personales</li>
            <li>• Cerrar sesión</li>
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
