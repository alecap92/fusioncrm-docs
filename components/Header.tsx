"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SearchModal from "./SearchModal";
import { MobileMenuButton } from "./Sidebar";

interface HeaderProps {
  onMobileMenuOpen: () => void;
}

export default function Header({ onMobileMenuOpen }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-30 flex items-center px-6 gap-4 border-b backdrop-blur-sm"
        style={{
          minHeight: "64px",
          backgroundColor: "color-mix(in srgb, var(--background) 90%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <MobileMenuButton onClick={onMobileMenuOpen} />

        {/* Logo: solo cuando el sidebar está oculto (en escritorio ya lo muestra el sidebar).
            Isotipo de la app (cuadrado con fondo navy) para que se lea en tema claro y oscuro. */}
        <Link href="/docs" className="lg:hidden flex items-center gap-2 flex-shrink-0" aria-label="FusionCRM Docs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-fusion-icon.png"
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg"
          />
          <span className="hidden sm:inline font-bold text-sm" style={{ color: "var(--foreground)" }}>
            FusionCRM <span style={{ color: "var(--muted-foreground)" }} className="font-medium">Docs</span>
          </span>
        </Link>

        {/* Search button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors flex-1 max-w-sm"
          style={{
            backgroundColor: "var(--muted)",
            border: "1px solid var(--border)",
            color: "var(--muted-foreground)",
          }}
        >
          <Search size={14} />
          <span>Buscar en la documentación...</span>
          <span
            className="ml-auto hidden sm:flex items-center gap-1 text-xs px-1.5 py-0.5 rounded"
            style={{ backgroundColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            <span>⌘K</span>
          </span>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <a
            href="https://fusioncol.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors font-medium"
            style={{ color: "var(--foreground)", border: "1px solid var(--border)" }}
          >
            Sitio web
          </a>
          <a
            href="https://app.fusioncol.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors font-medium text-white"
            style={{ backgroundColor: "#d1345b" }}
          >
            Abrir la app →
          </a>
          <ThemeToggle />
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
