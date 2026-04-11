import type { Metadata } from "next";
import Link from "next/link";
import {
  Users, Briefcase, GitBranch, MessageSquare, Mail, FileText,
  BarChart2, Settings, Code2, Puzzle, Zap, Star, Package, CreditCard,
  ArrowRight, BookOpen, Send, Calendar, FolderKanban, TrendingUp
} from "lucide-react";

export const metadata: Metadata = { title: "Introducción" };

const cards = [
  { icon: <Users size={20} />, title: "Contactos", desc: "Gestiona tu base de clientes, importa contactos y crea segmentos.", href: "/docs/contacts", color: "#3b82f6" },
  { icon: <Briefcase size={20} />, title: "Deals", desc: "Pipeline de ventas en vista Kanban con arrastrar y soltar.", href: "/docs/deals", color: "#8b5cf6" },
  { icon: <GitBranch size={20} />, title: "Pipelines", desc: "Crea y personaliza pipelines con etapas a medida.", href: "/docs/pipelines", color: "#06b6d4" },
  { icon: <MessageSquare size={20} />, title: "Conversaciones", desc: "WhatsApp, email y chat en una sola bandeja unificada.", href: "/docs/conversations", color: "#10b981" },
  { icon: <BookOpen size={20} />, title: "Templates WhatsApp", desc: "Plantillas aprobadas para mensajes masivos y automatizados.", href: "/docs/whatsapp-templates", color: "#f59e0b" },
  { icon: <Mail size={20} />, title: "Correo", desc: "Bandeja de entrada, redacción y automatización de emails.", href: "/docs/email", color: "#ec4899" },
  { icon: <Send size={20} />, title: "Campañas Masivas", desc: "Email y WhatsApp marketing a segmentos de contactos.", href: "/docs/mass-campaigns", color: "#d1345b" },
  { icon: <FileText size={20} />, title: "Cotizaciones", desc: "Genera, envía y da seguimiento a presupuestos.", href: "/docs/quotes", color: "#6366f1" },
  { icon: <CreditCard size={20} />, title: "Facturación", desc: "Facturas electrónicas con integración DIAN Colombia.", href: "/docs/invoices", color: "#14b8a6" },
  { icon: <Package size={20} />, title: "Productos", desc: "Catálogo de productos y servicios con precios.", href: "/docs/products", color: "#f97316" },
  { icon: <BarChart2 size={20} />, title: "Reportes", desc: "Analytics, reportes de ventas y dashboards personalizados.", href: "/docs/reports", color: "#84cc16" },
  { icon: <TrendingUp size={20} />, title: "Lead Scoring", desc: "Calificación automática de leads con reglas y IA.", href: "/docs/lead-scoring", color: "#a855f7" },
  { icon: <Zap size={20} />, title: "Automatizaciones", desc: "Editor visual de workflows con triggers y acciones.", href: "/docs/workflows", color: "#eab308" },
  { icon: <Calendar size={20} />, title: "Calendario", desc: "Gestión de citas, eventos y actividades.", href: "/docs/calendar", color: "#0ea5e9" },
  { icon: <FolderKanban size={20} />, title: "Proyectos", desc: "Gestión de proyectos y equipos de trabajo.", href: "/docs/projects", color: "#64748b" },
  { icon: <Settings size={20} />, title: "Configuración", desc: "Organización, usuarios, integraciones y seguridad.", href: "/docs/settings", color: "#6b7280" },
  { icon: <Code2 size={20} />, title: "API Externa", desc: "Endpoints REST, autenticación y ejemplos de integración.", href: "/docs/api", color: "#1f2a48" },
  { icon: <Puzzle size={20} />, title: "Integraciones", desc: "WhatsApp Business, N8N, webhooks y redes sociales.", href: "/docs/integrations", color: "#0f766e" },
  { icon: <Star size={20} />, title: "Spikey AI", desc: "Asistente de IA integrado en todo el CRM.", href: "/docs/spikey", color: "#d1345b" },
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
          FusionCRM es una plataforma CRM todo en uno diseñada para equipos de ventas, soporte y marketing.
          Centraliza tus contactos, conversaciones, negocios y automatizaciones en un solo lugar.
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

      {/* Quick start */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Inicio rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "1", title: "Crea tu cuenta", desc: "Regístrate en FusionCRM y configura tu organización.", href: "/docs/getting-started" },
            { step: "2", title: "Importa contactos", desc: "Sube tu base de datos de clientes en formato CSV.", href: "/docs/contacts#import" },
            { step: "3", title: "Conecta WhatsApp", desc: "Vincula tu número de WhatsApp Business para empezar a chatear.", href: "/docs/integrations" },
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
          <span className="font-semibold" style={{ color: "#d1345b" }}>soporte@fusioncol.com</span>
        </p>
      </div>
    </div>
  );
}
