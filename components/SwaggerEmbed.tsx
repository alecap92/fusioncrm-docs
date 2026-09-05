"use client";
import { useEffect, useRef } from "react";

/**
 * Swagger UI cargado desde CDN sobre el spec público del backend
 * (`/api/openapi.json` sale con `Access-Control-Allow-Origin: *`).
 * No se usa un iframe de `/api/docs`: helmet manda `X-Frame-Options`
 * y el navegador lo bloquearía desde docs.fusioncol.com.
 *
 * Sin estado de React a propósito: Swagger toma el control del nodo y el
 * mensaje de carga/error se escribe directo en el DOM.
 */
const SWAGGER_VERSION = "5.17.14";
const CDN = `https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/${SWAGGER_VERSION}`;

declare global {
  interface Window {
    SwaggerUIBundle?: (options: Record<string, unknown>) => unknown;
  }
}

interface SwaggerEmbedProps {
  specUrl: string;
}

const ERROR_HTML =
  'No se pudo cargar el visor. Abre la referencia directamente en ' +
  '<a href="https://api.fusioncol.com/api/docs" target="_blank" rel="noopener noreferrer" style="color:#d1345b">api.fusioncol.com/api/docs</a>.';

export default function SwaggerEmbed({ specUrl }: SwaggerEmbedProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const node = container.current;
    if (!node) return;

    const ensureCss = () => {
      if (document.getElementById("swagger-ui-css")) return;
      const link = document.createElement("link");
      link.id = "swagger-ui-css";
      link.rel = "stylesheet";
      link.href = `${CDN}/swagger-ui.min.css`;
      document.head.appendChild(link);
    };

    const ensureScript = () =>
      new Promise<void>((resolve, reject) => {
        if (window.SwaggerUIBundle) return resolve();
        const existing = document.getElementById("swagger-ui-js") as HTMLScriptElement | null;
        if (existing) {
          existing.addEventListener("load", () => resolve());
          existing.addEventListener("error", () => reject(new Error("swagger-ui")));
          return;
        }
        const script = document.createElement("script");
        script.id = "swagger-ui-js";
        script.src = `${CDN}/swagger-ui-bundle.min.js`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("swagger-ui"));
        document.body.appendChild(script);
      });

    ensureCss();
    ensureScript()
      .then(() => {
        if (cancelled || !window.SwaggerUIBundle) return;
        node.textContent = "";
        node.style.minHeight = "400px";
        window.SwaggerUIBundle({
          url: specUrl,
          domNode: node,
          deepLinking: false,
          docExpansion: "list",
          defaultModelsExpandDepth: 0,
          displayRequestDuration: true,
          tryItOutEnabled: false,
          persistAuthorization: false,
        });
      })
      .catch(() => {
        if (!cancelled) node.innerHTML = `<p style="padding:1rem;font-size:0.875rem">${ERROR_HTML}</p>`;
      });

    return () => {
      cancelled = true;
    };
  }, [specUrl]);

  return (
    <div
      ref={container}
      className="swagger-embed rounded-lg border overflow-hidden"
      style={{ borderColor: "var(--border)", backgroundColor: "#ffffff" }}
    >
      <p style={{ padding: "1rem", fontSize: "0.875rem", color: "#6b7280" }}>Cargando la referencia de la API…</p>
    </div>
  );
}
