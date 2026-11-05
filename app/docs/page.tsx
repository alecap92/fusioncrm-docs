import type { Metadata } from "next";
import Link from "next/link";
import {
  Users, Briefcase, GitBranch, MessageSquare, Mail, FileText,
  BarChart2, Settings, Code2, Puzzle, Zap, Star, Package, CreditCard,
  ArrowRight, BookOpen, Send, Calendar, FolderKanban, TrendingUp, LayoutTemplate, Activity, Phone, Columns3, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "CRM para WhatsApp: guía de inicio y módulos",
  description:
    "Guía de FusionCRM, el CRM para WhatsApp de emprendedores en Colombia: contactos, embudo de ventas, cotizaciones, factura electrónica DIAN y automatizaciones.",
  keywords: ["CRM para WhatsApp", "CRM Colombia", "documentación FusionCRM", "embudo de ventas", "factura electrónica DIAN", "automatizaciones"],
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "CRM para WhatsApp: guía de inicio y módulos",
    description:
      "Guía de FusionCRM, el CRM para WhatsApp de emprendedores en Colombia: contactos, embudo de ventas, cotizaciones, factura electrónica DIAN y automatizaciones.",
    url: "/docs",
    siteName: "FusionCRM Docs",
    type: "website",
  },
};

const cards = [
  { icon: <Users size={20} />, title: "Contactos", desc: "Gestiona tu base de clientes, importa contactos y crea segmentos.", href: "/docs/contacts", color: "#3b82f6" },
  { icon: <Briefcase size={20} />, title: "Negocios", desc: "Tablero de ventas donde arrastras cada negocio de etapa en etapa.", href: "/docs/deals", color: "#8b5cf6" },
  { icon: <GitBranch size={20} />, title: "Pipelines", desc: "Crea y personaliza pipelines con etapas a medida.", href: "/docs/pipelines", color: "#06b6d4" },
  { icon: <MessageSquare size={20} />, title: "Conversaciones", desc: "WhatsApp, Messenger e Instagram en una sola bandeja.", href: "/docs/conversations", color: "#10b981" },
  { icon: <Phone size={20} />, title: "Líneas de WhatsApp", desc: "Conecta varios números, con su color, su pipeline y su perfil de negocio.", href: "/docs/whatsapp-lines", color: "#22c55e" },
  { icon: <Columns3 size={20} />, title: "Pipelines de conversación", desc: "Organiza tus chats en columnas, con asignación automática por etapa.", href: "/docs/conversation-pipelines", color: "#059669" },
  { icon: <BookOpen size={20} />, title: "Templates WhatsApp", desc: "Plantillas aprobadas para mensajes masivos y automatizados.", href: "/docs/whatsapp-templates", color: "#f59e0b" },
  { icon: <Mail size={20} />, title: "Correo", desc: "Bandeja de entrada, redacción y automatización de emails.", href: "/docs/email", color: "#ec4899" },
  { icon: <Send size={20} />, title: "Campañas Masivas", desc: "Email y WhatsApp marketing a segmentos de contactos.", href: "/docs/mass-campaigns", color: "#d1345b" },
  { icon: <FileText size={20} />, title: "Cotizaciones", desc: "Genera, envía y da seguimiento a presupuestos.", href: "/docs/quotes", color: "#6366f1" },
  { icon: <CreditCard size={20} />, title: "Facturación", desc: "Facturas electrónicas DIAN Colombia (módulo adicional).", href: "/docs/invoices", color: "#14b8a6" },
  { icon: <Truck size={20} />, title: "Envíos", desc: "Cotiza, genera y rastrea guías con Envia.com (módulo adicional).", href: "/docs/shipments", color: "#ea580c" },
  { icon: <Package size={20} />, title: "Productos", desc: "Catálogo de productos y servicios con precios.", href: "/docs/products", color: "#f97316" },
  { icon: <BarChart2 size={20} />, title: "Reportes", desc: "Analytics, reportes de ventas y dashboards personalizados.", href: "/docs/reports", color: "#84cc16" },
  { icon: <TrendingUp size={20} />, title: "Lead Scoring", desc: "Calificación automática de leads con las reglas que tú defines.", href: "/docs/lead-scoring", color: "#a855f7" },
  { icon: <Zap size={20} />, title: "Automatizaciones", desc: "Editor visual de workflows con triggers y acciones.", href: "/docs/workflows", color: "#eab308" },
  { icon: <Calendar size={20} />, title: "Calendario", desc: "Gestión de citas, eventos y actividades.", href: "/docs/calendar", color: "#0ea5e9" },
  { icon: <FolderKanban size={20} />, title: "Proyectos", desc: "Gestión de proyectos y equipos de trabajo.", href: "/docs/projects", color: "#64748b" },
  { icon: <Settings size={20} />, title: "Configuración", desc: "Organización, usuarios, integraciones y seguridad.", href: "/docs/settings", color: "#6b7280" },
  { icon: <Code2 size={20} />, title: "API REST", desc: "Más de 200 operaciones documentadas, tokens por permiso y webhooks salientes.", href: "/docs/api", color: "#1f2a48" },
  { icon: <Star size={20} />, title: "MCP (IA)", desc: "Usa el CRM desde Claude o Cursor con más de 200 herramientas.", href: "/docs/mcp", color: "#d1345b" },
  { icon: <Puzzle size={20} />, title: "Integraciones", desc: "WhatsApp Business, n8n, Messenger, Instagram y correo.", href: "/docs/integrations", color: "#0f766e" },
  { icon: <Briefcase size={20} />, title: "Empresas", desc: "Agrupa los contactos, negocios y facturas de cada empresa cliente.", href: "/docs/companies", color: "#0ea5e9" },
  { icon: <Send size={20} />, title: "Formularios web", desc: "Leads desde tu sitio sin duplicados y con su campaña de origen.", href: "/docs/forms", color: "#16a34a" },
  { icon: <LayoutTemplate size={20} />, title: "Páginas de aterrizaje", desc: "Landing pages para tus anuncios que convierten a WhatsApp o formulario, con analítica propia.", href: "/docs/landing-pages", color: "#c2185b" },
  { icon: <Zap size={20} />, title: "Agentes IA", desc: "Un asistente que atiende WhatsApp con el contexto del cliente.", href: "/docs/agentes-ia", color: "#7c3aed" },
  { icon: <Activity size={20} />, title: "Actividad del equipo", desc: "Revisa qué hacen tus empleados: mensajes, negocios y cotizaciones por persona, con informe diario a tu correo.", href: "/docs/team-activity", color: "#0f766e" },
];

export default function DocsIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="mb-12">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ backgroundColor: "rgba(209,52,91,0.1)", color: "#d1345b" }}
        >
          <Star size={12} /> Documentación oficial
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          Bienvenido a{" "}
          <span style={{ background: "linear-gradient(135deg, #d1345b, #1f2a48)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            FusionCRM
          </span>
        </h1>
        <p className="text-lg max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
          El CRM para negocios que venden por WhatsApp. Atiende a tus clientes con todo tu equipo desde un
          mismo número, lleva cada venta de principio a fin, cotiza, factura y despacha sin salir de un solo lugar.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#d1345b" }}
          >
            Comenzar ahora <ArrowRight size={15} />
          </Link>
          <Link
            href="/docs/api"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
            style={{ backgroundColor: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }}
          >
            Ver API <Code2 size={15} />
          </Link>
        </div>
      </div>

      {/* Qué es */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>¿Qué es FusionCRM?</h2>
        <div className="flex flex-col gap-4 max-w-3xl text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          <p className="m-0">
            Si tu negocio vende por WhatsApp, seguramente conoces el desorden: chats repartidos en varios celulares,
            clientes que se quedan sin respuesta, cotizaciones en Word, pedidos anotados en un cuaderno o en Excel y
            nadie sabe con certeza cuánto se vendió este mes ni qué cliente hay que llamar hoy.
          </p>
          <p className="m-0">
            FusionCRM junta todo eso en una sola herramienta. Tus conversaciones de WhatsApp, Instagram y Messenger
            llegan a una bandeja que todo tu equipo atiende al mismo tiempo; cada cliente tiene su ficha con el historial
            completo; cada oportunidad avanza por un tablero de ventas hasta que se cierra; y desde ahí mismo envías la
            cotización, emites la factura electrónica y generas la guía de envío.
          </p>
          <p className="m-0">
            Está pensado para emprendedores y pequeñas y medianas empresas de Colombia y Latinoamérica: en español, con
            la conexión oficial de WhatsApp, facturación electrónica ante la DIAN, ciudades del DANE y envíos con las
            transportadoras del país.
          </p>
          <p className="m-0">
            ¿Nunca has usado un CRM? Empieza por{" "}
            <a href="/docs/que-es-un-crm" style={{ color: "#d1345b" }}>¿Qué es un CRM?</a>: en cinco minutos entiendes
            para qué sirve y por qué vale la pena.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { t: "Atiende", d: "Un solo número de WhatsApp para todo el equipo, chats organizados por etapas, respuestas rápidas con # y un agente de IA que contesta por ti cuando quieras." },
            { t: "Vende", d: "Tablero de negocios, cotizaciones en PDF listas para enviar por WhatsApp, puntaje de cada lead y campañas masivas a tus listas." },
            { t: "Factura y despacha", d: "Factura electrónica DIAN, cuentas por cobrar y guías de envío con Envia.com, todo desde la ficha del cliente." },
            { t: "Automatiza y mide", d: "Automatizaciones que trabajan solas, reportes de ventas, la actividad de cada empleado y conexión con IA por MCP o API." },
          ].map((p) => (
            <div key={p.t} className="p-4 rounded-xl border" style={{ backgroundColor: "var(--card)", borderColor: "var(--card-border)" }}>
              <h3 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>{p.t}</h3>
              <p className="m-0 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{p.d}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-10 mb-3" style={{ color: "var(--foreground)" }}>Por qué la gente lo usa</h3>
        <ul className="space-y-2 pl-4 max-w-3xl" style={{ color: "var(--muted-foreground)" }}>
          <li>• <strong style={{ color: "var(--foreground)" }}>No se pierde ningún cliente:</strong> cada mensaje queda asignado a alguien y puedes ver qué está pendiente.</li>
          <li>• <strong style={{ color: "var(--foreground)" }}>Tu equipo trabaja junto:</strong> varias personas atienden el mismo WhatsApp sin pasarse el celular.</li>
          <li>• <strong style={{ color: "var(--foreground)" }}>Sabes cómo va el negocio:</strong> cuánto vendiste, qué negocios están por cerrar y quién de tu equipo está respondiendo.</li>
          <li>• <strong style={{ color: "var(--foreground)" }}>Menos tareas repetitivas:</strong> seguimientos, mensajes de bienvenida y recordatorios salen solos.</li>
          <li>• <strong style={{ color: "var(--foreground)" }}>Todo en un lugar:</strong> del primer &quot;hola&quot; al pago y al despacho, sin saltar entre cinco herramientas.</li>
        </ul>
      </section>

      {/* Quick start */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Inicio rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "1", title: "Crea tu cuenta", desc: "Regístrate gratis y completa los datos de tu organización.", href: "/docs/getting-started" },
            { step: "2", title: "Importa contactos", desc: "Sube tu base de clientes en CSV o Excel.", href: "/docs/contacts#import" },
            { step: "3", title: "Conecta WhatsApp", desc: "Conecta tu número en Configuración → WhatsApp → Conectar línea para empezar a chatear.", href: "/docs/whatsapp-lines" },
          ].map((s) => (
            <Link
              key={s.step}
              href={s.href}
              className="p-5 rounded-xl border transition-all hover:shadow-md group"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--card-border)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3"
                style={{ backgroundColor: "#1f2a48" }}
              >
                {s.step}
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-[#d1345b] transition-colors" style={{ color: "var(--foreground)" }}>
                {s.title}
              </h3>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Module grid */}
      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Explorar módulos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-md group"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--card-border)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                style={{ backgroundColor: card.color }}
              >
                {card.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm group-hover:text-[#d1345b] transition-colors" style={{ color: "var(--foreground)" }}>
                  {card.title}
                </h3>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {card.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div
        className="mt-12 p-6 rounded-xl border text-center"
        style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
      >
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          ¿Tienes preguntas? Contacta al equipo de soporte en{" "}
          <span className="font-semibold" style={{ color: "#d1345b" }}>comercial@fusioncol.com</span>
        </p>
      </div>
    </div>
  );
}
