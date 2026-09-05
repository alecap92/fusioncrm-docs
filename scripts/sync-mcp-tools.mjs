#!/usr/bin/env node
/**
 * Refresca data/mcp-tools.json desde el catálogo que publica el backend en
 * producción (se genera en cada build del API desde los schemas Zod del MCP).
 * Correrlo cuando cambien los tools y hacer commit del JSON: la página
 * /docs/mcp lo lee en build (el sitio es standalone, no consulta el API en runtime).
 *
 *   node scripts/sync-mcp-tools.mjs [url]
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const url = process.argv[2] || "https://api.fusioncol.com/api/mcp-tools.json";
const target = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../data/mcp-tools.json");

const response = await fetch(url);
if (!response.ok) {
  console.error(`No se pudo descargar ${url}: HTTP ${response.status}`);
  process.exit(1);
}
const catalog = await response.json();
if (!Array.isArray(catalog.tools) || catalog.tools.length === 0) {
  console.error("El catálogo no trae tools; no se escribe nada.");
  process.exit(1);
}
await writeFile(target, JSON.stringify(catalog, null, 2) + "\n");
console.log(`data/mcp-tools.json actualizado: ${catalog.tools.length} tools.`);
