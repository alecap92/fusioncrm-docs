"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Users, Briefcase, GitBranch, MessageSquare, Mail, FileText,
  BarChart2, Settings, Code2, Puzzle, Zap, Star, Package, ShoppingCart,
  FileBarChart, Calendar, FolderKanban, ChevronDown, ChevronRight, X, Menu,
  BookOpen, Send, CreditCard, TrendingUp
} from "lucide-react";

interface NavItem {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  badge?: string;
}

const navigation: NavItem[] = [
  {
    title: "Primeros Pasos",
    icon: <Home size={16} />,
    children: [
      { title: "¿Qué es FusionCRM?", href: "/docs" },
      { title: "Cómo acceder", href: "/docs/getting-started" },
      { title: "Navegación general", href: "/docs/getting-started#navegacion" },
    ],
  },
  {
    title: "Contactos",
    icon: <Users size={16} />,
    children: [
      { title: "Directorio de contactos", href: "/docs/contacts" },
      { title: "Crear y editar contactos", href: "/docs/contacts#crud" },
      { title: "Campos personalizados", href: "/docs/contacts#custom-fields" },
      { title: "Listas y segmentos", href: "/docs/contacts#lists" },
      { title: "Importar contactos", href: "/docs/contacts#import" },
      { title: "Filtros avanzados", href: "/docs/contacts#filters" },
    ],
  },
  {
    title: "Deals / Negocios",
    icon: <Briefcase size={16} />,
    children: [
      { title: "Vista Kanban", href: "/docs/deals" },
      { title: "Crear y gestionar deals", href: "/docs/deals#crud" },
      { title: "Etapas y movimiento", href: "/docs/deals#stages" },
      { title: "Filtros y búsqueda", href: "/docs/deals#filters" },
      { title: "Productos en deals", href: "/docs/deals#products" },
    ],
  },
  {
    title: "Pipelines",
    icon: <GitBranch size={16} />,
    children: [
      { title: "Gestión de pipelines", href: "/docs/pipelines" },
      { title: "Crear pipeline", href: "/docs/pipelines#create" },
      { title: "Configurar etapas", href: "/docs/pipelines#stages" },
    ],
  },
  {
    title: "Conversaciones",
    icon: <MessageSquare size={16} />,
    children: [
      { title: "Vista general", href: "/docs/conversations" },
      { title: "Tipos de mensajes", href: "/docs/conversations#message-types" },
      { title: "WhatsApp", href: "/docs/conversations#whatsapp" },
      { title: "Respuestas rápidas", href: "/docs/conversations#quick-replies" },
      { title: "Asignación de chats", href: "/docs/conversations#assignment" },
    ],
  },
  {
    title: "Templates WhatsApp",
    icon: <BookOpen size={16} />,
    children: [
      { title: "Gestión de plantillas", href: "/docs/whatsapp-templates" },
      { title: "Crear template", href: "/docs/whatsapp-templates#create" },
      { title: "Variables y parámetros", href: "/docs/whatsapp-templates#variables" },
      { title: "Envío masivo", href: "/docs/whatsapp-templates#mass-send" },
    ],
  },
  {
    title: "Correo / Email",
    icon: <Mail size={16} />,
    children: [
      { title: "Bandeja de entrada", href: "/docs/email" },
      { title: "Redactar correo", href: "/docs/email#compose" },
      { title: "Respuestas programadas", href: "/docs/email#scheduled" },
      { title: "Fragmentos / Snippets", href: "/docs/email#snippets" },
    ],
  },
  {
    title: "Campañas Masivas",
    icon: <Send size={16} />,
    children: [
      { title: "Email masivo", href: "/docs/mass-campaigns" },
      { title: "WhatsApp masivo", href: "/docs/mass-campaigns#whatsapp" },
      { title: "Segmentación", href: "/docs/mass-campaigns#segmentation" },
    ],
  },
  {
    title: "Cotizaciones",
    icon: <FileText size={16} />,
    children: [
      { title: "Gestión de cotizaciones", href: "/docs/quotes" },
      { title: "Crear cotización", href: "/docs/quotes#create" },
      { title: "Productos y precios", href: "/docs/quotes#products" },
    ],
  },
  {
    title: "Facturación",
    icon: <CreditCard size={16} />,
    children: [
      { title: "Facturas electrónicas", href: "/docs/invoices" },
      { title: "Crear factura", href: "/docs/invoices#create" },
      { title: "Facturas de compra", href: "/docs/invoices#incoming" },
      { title: "Notas crédito", href: "/docs/invoices#credit-notes" },
      { title: "Configuración DIAN", href: "/docs/invoices#config" },
    ],
  },
  {
    title: "Productos",
    icon: <Package size={16} />,
    children: [
      { title: "Catálogo de productos", href: "/docs/products" },
      { title: "Crear producto", href: "/docs/products#create" },
    ],
  },
  {
    title: "Reportes y Analytics",
    icon: <BarChart2 size={16} />,
    children: [
      { title: "Dashboard analytics", href: "/docs/reports" },
      { title: "Reportes de ventas", href: "/docs/reports#sales" },
      { title: "Reportes personalizados", href: "/docs/reports#custom" },
      { title: "Lead Scoring", href: "/docs/lead-scoring" },
    ],
  },
  {
    title: "Automatizaciones",
    icon: <Zap size={16} />,
    children: [
      { title: "Editor de workflows", href: "/docs/workflows" },
      { title: "Tipos de trigger", href: "/docs/workflows#triggers" },
      { title: "Acciones disponibles", href: "/docs/workflows#actions" },
      { title: "Historial de ejecución", href: "/docs/workflows#history" },
    ],
  },
  {
    title: "Calendario",
    icon: <Calendar size={16} />,
    children: [
      { title: "Vista de calendario", href: "/docs/calendar" },
      { title: "Eventos y tareas", href: "/docs/calendar#events" },
    ],
  },
  {
    title: "Proyectos",
    icon: <FolderKanban size={16} />,
    children: [
      { title: "Gestión de proyectos", href: "/docs/projects" },
    ],
  },
  {
    title: "Configuración",
    icon: <Settings size={16} />,
    children: [
      { title: "Organización", href: "/docs/settings" },
      { title: "Usuarios y permisos", href: "/docs/settings#users" },
      { title: "Integraciones", href: "/docs/settings#integrations" },
      { title: "Campos personalizados", href: "/docs/settings#fields" },
      { title: "Lead Scoring config", href: "/docs/settings#lead-scoring" },
      { title: "MCP Connectors", href: "/docs/settings#mcp" },
      { title: "API Keys", href: "/docs/settings#api-keys" },
      { title: "Plan y facturación", href: "/docs/settings#plan" },
    ],
  },
  {
    title: "API Externa",
    icon: <Code2 size={16} />,
    badge: "REST",
    children: [
      { title: "Autenticación", href: "/docs/api" },
      { title: "Contactos API", href: "/docs/api#contacts" },
      { title: "Deals API", href: "/docs/api#deals" },
      { title: "Conversaciones API", href: "/docs/api#conversations" },
      { title: "Webhooks", href: "/docs/api#webhooks" },
    ],
  },
  {
    title: "Integraciones",
    icon: <Puzzle size={16} />,
    children: [
      { title: "WhatsApp Business", href: "/docs/integrations" },
      { title: "N8N", href: "/docs/integrations#n8n" },
      { title: "Webhooks entrantes", href: "/docs/integrations#webhooks" },
      { title: "Social Media", href: "/docs/integrations#social" },
    ],
  },
  {
    title: "Spikey AI",
    icon: <Star size={16} />,
    badge: "AI",
    children: [
      { title: "¿Qué es Spikey?", href: "/docs/spikey" },
      { title: "Chat flotante", href: "/docs/spikey#floating-chat" },
      { title: "AI Comments", href: "/docs/spikey#comments" },
      { title: "Lead Scoring AI", href: "/docs/spikey#scoring" },
    ],
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Auto-open section that matches current path
    const newOpen: Record<string, boolean> = {};
    navigation.forEach((item) => {
      if (item.children?.some((child) => child.href && pathname.startsWith(child.href))) {
        newOpen[item.title] = true;
      }
    });
    setOpenSections(newOpen);
  }, [pathname]);

  const toggle = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (href: string) => pathname === href || (href !== "/docs" && pathname.startsWith(href));

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{ backgroundColor: "var(--sidebar-bg)" }}
        className={`
          fixed top-0 left-0 z-50 h-screen w-72 flex flex-col
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:h-full
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <Link href="/docs" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #d1345b, #1f2a48)" }}
            >
              F
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">FusionCRM</div>
              <div className="text-white/50 text-xs">Documentación</div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-white/50 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navigation.map((section) => {
            const isOpen = openSections[section.title] ?? false;
            const hasActive = section.children?.some(
              (child) => child.href && isActive(child.href)
            );

            return (
              <div key={section.title} className="mb-1">
                <button
                  onClick={() => toggle(section.title)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
                    hasActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                  style={hasActive ? { backgroundColor: "var(--sidebar-hover)" } : {}}
                >
                  <span className="flex items-center gap-2">
                    <span className={hasActive ? "text-[#d1345b]" : "text-white/40"}>
                      {section.icon}
                    </span>
                    {section.title}
                    {section.badge && (
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: "#d1345b", color: "white" }}
                      >
                        {section.badge}
                      </span>
                    )}
                  </span>
                  <span className="text-white/30">
                    {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                  </span>
                </button>

                {isOpen && section.children && (
                  <div className="mt-0.5 ml-5 border-l border-white/10 pl-3 space-y-0.5">
                    {section.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href!}
                        onClick={onClose}
                        className={`block py-1.5 px-2 text-sm rounded-md transition-colors ${
                          child.href && isActive(child.href)
                            ? "text-white font-medium"
                            : "text-white/55 hover:text-white/90"
                        }`}
                        style={
                          child.href && isActive(child.href)
                            ? { backgroundColor: "var(--sidebar-active)" }
                            : {}
                        }
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 flex-shrink-0">
          <p className="text-white/30 text-xs">v1.0 · docs.fusioncol.com</p>
        </div>
      </aside>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-md transition-colors"
      style={{ color: "var(--foreground)" }}
    >
      <Menu size={20} />
    </button>
  );
}
