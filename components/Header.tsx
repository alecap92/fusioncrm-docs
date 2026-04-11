"use client";
import { useState, useEffect } from "react";
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
        className="sticky top-0 z-30 h-14 flex items-center px-4 lg:px-6 gap-4 border-b backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(var(--background-rgb, 255,255,255), 0.9)",
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--background) 90%, transparent)",
        }}
      >
        <MobileMenuButton onClick={onMobileMenuOpen} />

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
            Ir a FusionCRM →
          </a>
          <ThemeToggle />
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
