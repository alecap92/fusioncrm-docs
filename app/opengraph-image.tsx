import { ImageResponse } from "next/og";

export const alt = "FusionCRM Docs: el CRM para negocios que venden por WhatsApp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #1f2a48 0%, #0f1629 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#d1345b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 800 }}>F</div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>FusionCRM</div>
          <div style={{ fontSize: 26, opacity: 0.6, marginLeft: 8 }}>Documentación</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>
            El CRM para negocios que venden por WhatsApp
          </div>
          <div style={{ fontSize: 30, opacity: 0.75, maxWidth: 980 }}>
            Conversaciones, embudo de ventas, cotizaciones, factura electrónica DIAN y envíos en un solo lugar.
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#ff6b8d" }}>docs.fusioncol.com</div>
      </div>
    ),
    size,
  );
}
