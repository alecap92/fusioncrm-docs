"use client";
import { useState, useEffect } from "react";

export interface TocItem {
  id: string;
  label: string;
  depth?: number;
}

interface TocProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TocProps) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-20 text-sm">
      <p
        className="text-xs font-semibold uppercase tracking-wider mb-3"
        style={{ color: "var(--muted-foreground)" }}
      >
        En esta página
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block py-1 transition-colors leading-snug"
              style={{
                paddingLeft: `${((item.depth ?? 2) - 2) * 12}px`,
                color: active === item.id ? "#d1345b" : "var(--muted-foreground)",
                borderLeft: active === item.id ? "2px solid #d1345b" : "2px solid transparent",
                fontWeight: active === item.id ? 600 : 400,
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
