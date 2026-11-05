#!/usr/bin/env node
/**
 * doc:coverage — cruza la documentación pública con el código de la app usando
 * el mapa doc↔código (docs/auditoria-docs/mapa.json del repo paraguas).
 *
 * Hace dos cosas:
 *   a) Cobertura: rutas de src/App.tsx, entradas del TopBar y secciones del
 *      registry de Configuración que no aparecen en ningún `sources` del mapa
 *      (posibles huecos de documentación). También avisa de sources que ya no
 *      existen en el código (archivo renombrado o borrado).
 *   b) Cambios: archivos tocados en origin/main desde --since (por defecto la
 *      fecha `verified` más antigua del mapa) y qué páginas los tienen en sources.
 *
 * Uso (desde la raíz de documentacion/):
 *   npm run doc:coverage -- --map ../docs/auditoria-docs/mapa.json \
 *     --frontend ../frontend --backend ../backend [--since 2026-11-05] [--fetch]
 *
 * Variables de entorno equivalentes: DOC_MAP, FRONTEND_REPO, BACKEND_REPO, DOC_SINCE.
 * Sin argumentos asume el layout del repo paraguas (../docs, ../frontend, ../backend).
 * Node puro, sin dependencias. Siempre sale con 0 salvo que falte el mapa.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

// ─── Argumentos ──────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const arg = (name) => {
  const i = argv.indexOf(`--${name}`);
  if (i !== -1 && argv[i + 1] && !argv[i + 1].startsWith("--")) return argv[i + 1];
  const eq = argv.find((a) => a.startsWith(`--${name}=`));
  return eq ? eq.slice(name.length + 3) : undefined;
};
const flag = (name) => argv.includes(`--${name}`);

if (flag("help") || flag("h")) {
  console.log(fs.readFileSync(new URL(import.meta.url), "utf8").split("*/")[0]);
  process.exit(0);
}

const mapPath = path.resolve(arg("map") || process.env.DOC_MAP || "../docs/auditoria-docs/mapa.json");
const repos = {
  frontend: path.resolve(arg("frontend") || process.env.FRONTEND_REPO || "../frontend"),
  backend: path.resolve(arg("backend") || process.env.BACKEND_REPO || "../backend"),
};
const doFetch = flag("fetch");

if (!fs.existsSync(mapPath)) {
  console.error(`No encuentro el mapa en ${mapPath}. Pásalo con --map o DOC_MAP.`);
  process.exit(1);
}
const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));
const pages = map.pages || [];
const oldestVerified = pages.map((p) => p.verified).filter(Boolean).sort()[0];
const since = arg("since") || process.env.DOC_SINCE || oldestVerified;

// ─── Utilidades ──────────────────────────────────────────────────────────────
const out = [];
const log = (s = "") => out.push(s);
const read = (repo, rel) => {
  const f = path.join(repos[repo], rel);
  return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null;
};
const normRoute = (r) => r.replace(/:[A-Za-z0-9_]+/g, ":p").replace(/\/+$/, "") || "/";
const isFileSource = (s) => /^(frontend|backend)\//.test(s);
const lineOf = (src, idx) => src.slice(0, idx).split("\n").length;

// Todos los sources del mapa, por tipo.
const routeSources = new Set();
const settingsHashes = new Set();
for (const p of pages) {
  for (const s of p.sources || []) {
    if (isFileSource(s)) continue;
    const [route, hash] = s.split("#");
    routeSources.add(normRoute(route));
    if (route === "/settings" && hash) settingsHashes.add(hash);
  }
}
const routeSourceList = [...routeSources];

const IGNORED = [/^\/login$/, /^\/register$/, /^\/logout$/, /^\/forgot-password$/, /^\/reset-password/, /^\/unsubscribe/];
const isIgnored = (r) => r.includes("*") || IGNORED.some((re) => re.test(r));

// Una ruta queda cubierta si está tal cual (ignorando el nombre de los parámetros)
// o, si tiene parámetros, cuando su padre (lo que va antes del primer :param)
// está cubierto o hay otra ruta hermana con parámetros cubierta.
function isRouteCovered(route) {
  const n = normRoute(route);
  if (routeSources.has(n)) return true;
  const segs = n.split("/");
  const firstParam = segs.findIndex((s) => s.startsWith(":"));
  if (firstParam === -1) return false;
  const parent = segs.slice(0, firstParam).join("/") || "/";
  return routeSources.has(parent) || routeSourceList.some((r) => r.startsWith(parent + "/:"));
}

// ─── a) Cobertura ────────────────────────────────────────────────────────────
log(`# doc:coverage — ${new Date().toISOString().slice(0, 10)}`);
log(`Mapa: ${mapPath} (${pages.length} páginas)`);
log(`Frontend: ${repos.frontend}`);
log(`Backend:  ${repos.backend}`);
log();
log("## a) Cobertura: lo que la app tiene y el mapa no nombra");

let gaps = 0;

const appSrc = read("frontend", "src/App.tsx");
if (!appSrc) {
  log("  (no encontré src/App.tsx en el frontend)");
} else {
  const routes = [];
  for (const m of appSrc.matchAll(/path=\s*["']([^"']+)["']/g)) routes.push({ route: m[1], line: lineOf(appSrc, m.index) });
  const missing = routes.filter((r) => !isIgnored(r.route) && !isRouteCovered(r.route));
  log();
  log(`### Rutas de src/App.tsx sin página (${missing.length} de ${routes.length})`);
  for (const r of missing) log(`  - ${r.route}  (App.tsx:${r.line})`);
  if (!missing.length) log("  ninguna");
  gaps += missing.length;
}

const topSrc = read("frontend", "src/components/TopBar.tsx");
if (!topSrc) {
  log("  (no encontré src/components/TopBar.tsx)");
} else {
  const entries = [];
  for (const m of topSrc.matchAll(/href:\s*["'](\/[^"']*)["']/g)) {
    const before = topSrc.slice(0, m.index);
    const labels = [...before.matchAll(/label:\s*["']([^"']+)["']/g)];
    entries.push({ href: m[1], label: labels.length ? labels[labels.length - 1][1] : "?", line: lineOf(topSrc, m.index) });
  }
  const missing = entries.filter((e) => !isIgnored(e.href) && !isRouteCovered(e.href.split("#")[0]));
  log();
  log(`### Entradas del TopBar sin página (${missing.length} de ${entries.length})`);
  for (const e of missing) log(`  - ${e.label} → ${e.href}  (TopBar.tsx:${e.line})`);
  if (!missing.length) log("  ninguna");
  gaps += missing.length;
}

const regSrc = read("frontend", "src/components/settings/registry.ts");
if (!regSrc) {
  log("  (no encontré src/components/settings/registry.ts)");
} else {
  const items = [];
  for (const m of regSrc.matchAll(/hash:\s*["']([^"']+)["']/g)) {
    const before = regSrc.slice(0, m.index);
    const labels = [...before.matchAll(/label:\s*["']([^"']+)["']/g)];
    const after = regSrc.slice(m.index, m.index + 300);
    const aliases = (after.match(/aliases:\s*\[([^\]]*)\]/)?.[1] || "").match(/["'][^"']+["']/g)?.map((a) => a.slice(1, -1)) || [];
    items.push({ hash: m[1], aliases, label: labels.length ? labels[labels.length - 1][1] : "?", line: lineOf(regSrc, m.index) });
  }
  const missing = items.filter((i) => ![i.hash, ...i.aliases].some((h) => settingsHashes.has(h)));
  log();
  log(`### Secciones de Configuración sin página (${missing.length} de ${items.length})`);
  for (const i of missing) log(`  - ${i.label} → /settings#${i.hash}  (registry.ts:${i.line})`);
  if (!missing.length) log("  ninguna");
  gaps += missing.length;
}

const broken = [];
for (const p of pages) {
  for (const s of p.sources || []) {
    if (!isFileSource(s)) continue;
    const [repo, ...rest] = s.split("/");
    if (!fs.existsSync(path.join(repos[repo], rest.join("/")))) broken.push({ page: p.slug || "(inicio)", source: s });
  }
}
log();
log(`### Sources del mapa que ya no existen en el código (${broken.length})`);
for (const b of broken) log(`  - ${b.source}  ← página ${b.page}`);
if (!broken.length) log("  ninguno");

// ─── b) Cambios ──────────────────────────────────────────────────────────────
log();
log(`## b) Cambios en origin/main desde ${since || "(sin fecha)"}`);

const changed = new Map(); // "frontend/src/x.tsx" -> número de commits
let gitOk = true;
for (const [repo, dir] of Object.entries(repos)) {
  try {
    if (doFetch) execFileSync("git", ["-C", dir, "fetch", "--quiet", "origin", "main"], { stdio: "ignore" });
    // Una fecha sola es "a esta hora" para git: se fija a medianoche.
    const sinceArg = /^\d{4}-\d{2}-\d{2}$/.test(since) ? `${since} 00:00` : since;
    const raw = execFileSync("git", ["-C", dir, "log", `--since=${sinceArg}`, "--name-only", "--pretty=format:", "origin/main"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    for (const f of raw.split("\n").map((l) => l.trim()).filter(Boolean)) {
      const key = `${repo}/${f}`;
      changed.set(key, (changed.get(key) || 0) + 1);
    }
  } catch (e) {
    gitOk = false;
    log(`  (git log falló en ${repo}: ${String(e.message).split("\n")[0]})`);
  }
}

const touchedPages = [];
const matchedFiles = new Set();
for (const p of pages) {
  const hits = [];
  for (const s of (p.sources || []).filter(isFileSource)) {
    for (const [file, n] of changed) {
      if (file === s || file.startsWith(s.replace(/\/$/, "") + "/")) {
        hits.push(`${file}${n > 1 ? ` (${n} commits)` : ""}`);
        matchedFiles.add(file);
      }
    }
  }
  // Si cambia el árbol de rutas o el registry, la cobertura (a) ya lo refleja.
  if (hits.length) touchedPages.push({ p, hits: [...new Set(hits)] });
}

log(`Archivos distintos cambiados: ${changed.size} (frontend ${[...changed.keys()].filter((k) => k.startsWith("frontend/")).length}, backend ${[...changed.keys()].filter((k) => k.startsWith("backend/")).length})`);
log();
log(`### Páginas a revisar (${touchedPages.length})`);
for (const { p, hits } of touchedPages) {
  log(`  - /docs/${p.slug}  ${p.title}  [verified ${p.verified}]`);
  for (const h of hits) log(`      · ${h}`);
}
if (!touchedPages.length) log(gitOk ? "  ninguna: ningún source cambió" : "  (sin datos de git)");

const isAppCode = (f) =>
  /^(frontend\/src\/(pages|components|plugins)|backend\/src\/(controllers|routes|plugins|mcp))\//.test(f) && !/__tests__|\.test\.|\.spec\./.test(f);
const unmapped = [...changed.keys()].filter((f) => !matchedFiles.has(f) && isAppCode(f)).sort();
log();
log(`### Código de pantallas/rutas que cambió y no está en ningún source (${unmapped.length})`);
log("  (puede ser un detalle interno o algo que conviene sumar al mapa)");
const LIMIT = 40;
for (const f of unmapped.slice(0, LIMIT)) log(`  - ${f}`);
if (unmapped.length > LIMIT) log(`  … y ${unmapped.length - LIMIT} más`);
if (!unmapped.length) log("  ninguno");

log();
log(`Resumen: ${gaps} posibles huecos, ${broken.length} sources rotos, ${touchedPages.length} páginas con código cambiado desde ${since}.`);
log("Al terminar la revisión de una página, actualiza su `verified` en el mapa.");

console.log(out.join("\n"));
process.exit(0);
