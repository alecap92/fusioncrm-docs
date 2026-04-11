import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DocNavProps {
  prev?: { href: string; title: string };
  next?: { href: string; title: string };
}

export default function DocNav({ prev, next }: DocNavProps) {
  return (
    <div className="flex justify-between items-center mt-12 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
      {prev ? (
        <Link
          href={prev.href}
          className="flex items-center gap-2 group text-sm transition-colors"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <div>
            <div className="text-xs uppercase tracking-wide mb-0.5">Anterior</div>
            <div className="font-medium group-hover:text-[#d1345b] transition-colors" style={{ color: "var(--foreground)" }}>
              {prev.title}
            </div>
          </div>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          href={next.href}
          className="flex items-center gap-2 text-right group text-sm transition-colors ml-auto"
          style={{ color: "var(--muted-foreground)" }}
        >
          <div>
            <div className="text-xs uppercase tracking-wide mb-0.5">Siguiente</div>
            <div className="font-medium group-hover:text-[#d1345b] transition-colors" style={{ color: "var(--foreground)" }}>
              {next.title}
            </div>
          </div>
          <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      ) : null}
    </div>
  );
}
