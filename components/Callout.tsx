import { Info, AlertTriangle, XCircle, Lightbulb } from "lucide-react";

type CalloutType = "note" | "warning" | "danger" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, {
  icon: React.ReactNode;
  label: string;
  bg: string;
  border: string;
  titleColor: string;
}> = {
  note: {
    icon: <Info size={15} />,
    label: "Nota",
    bg: "var(--callout-note)",
    border: "var(--callout-note-border)",
    titleColor: "#2563eb",
  },
  warning: {
    icon: <AlertTriangle size={15} />,
    label: "Advertencia",
    bg: "var(--callout-warning)",
    border: "var(--callout-warning-border)",
    titleColor: "#d97706",
  },
  danger: {
    icon: <XCircle size={15} />,
    label: "Importante",
    bg: "var(--callout-danger)",
    border: "var(--callout-danger-border)",
    titleColor: "#dc2626",
  },
  tip: {
    icon: <Lightbulb size={15} />,
    label: "Consejo",
    bg: "var(--callout-tip)",
    border: "var(--callout-tip-border)",
    titleColor: "#16a34a",
  },
};

export default function Callout({ type = "note", title, children }: CalloutProps) {
  const c = config[type];
  return (
    <div
      className="rounded-lg p-4 my-5 text-sm leading-relaxed"
      style={{
        backgroundColor: c.bg,
        borderLeft: `3px solid ${c.border}`,
      }}
    >
      <div className="flex items-center gap-2 font-semibold mb-1" style={{ color: c.border }}>
        {c.icon}
        <span>{title ?? c.label}</span>
      </div>
      <div style={{ color: "var(--foreground)" }}>{children}</div>
    </div>
  );
}
