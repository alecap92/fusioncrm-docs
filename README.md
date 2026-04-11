# FusionCRM Docs

Documentación oficial de FusionCRM — desplegada en [docs.fusioncol.com](https://docs.fusioncol.com).

Construida con **Next.js 16 (App Router)**, Tailwind CSS y componentes propios.

## Desarrollo local

```bash
npm install
npm run dev
# Abre http://localhost:3000
```

## Build de producción

```bash
npm run build
npm start
```

## Deploy en Vercel

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Directorio raíz: `documentacion_web/`
3. Framework: **Next.js** (auto-detectado)
4. Vercel despliega automáticamente en cada push a `main`

## Deploy en VPS (Docker / standalone)

El proyecto está configurado con `output: "standalone"`. Después de `npm run build`:

```bash
# Copiar los archivos necesarios
cp -r .next/standalone ./deploy
cp -r .next/static ./deploy/.next/static
cp -r public ./deploy/public

# Ejecutar
node deploy/server.js
```

O con Docker:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
```

## Estructura del proyecto

```
app/
├── docs/
│   ├── page.tsx              # Landing de la documentación
│   ├── getting-started/      # Primeros pasos
│   ├── contacts/             # Módulo de contactos
│   ├── deals/                # Deals y oportunidades
│   ├── pipelines/            # Gestión de pipelines
│   ├── conversations/        # WhatsApp y email unificados
│   ├── whatsapp-templates/   # Templates de WhatsApp
│   ├── email/                # Módulo de correo
│   ├── mass-campaigns/       # Campañas masivas
│   ├── quotes/               # Cotizaciones
│   ├── invoices/             # Facturación electrónica DIAN
│   ├── products/             # Catálogo de productos
│   ├── reports/              # Reportes y analytics
│   ├── lead-scoring/         # Lead Scoring
│   ├── workflows/            # Automatizaciones
│   ├── calendar/             # Calendario
│   ├── projects/             # Proyectos
│   ├── settings/             # Configuración
│   ├── api/                  # API REST
│   ├── integrations/         # Integraciones externas
│   └── spikey/               # Spikey AI
components/
├── Sidebar.tsx
├── Header.tsx
├── Breadcrumbs.tsx
├── Callout.tsx
├── TableOfContents.tsx
├── SearchModal.tsx
├── ThemeToggle.tsx
└── DocNav.tsx
```

## Colores del tema (FusionCRM)

| Variable | Valor | Uso |
|----------|-------|-----|
| `--primary` | `#1f2a48` | Navy/azul oscuro principal |
| `--action` | `#d1345b` | Rosa/rojo de acción, CTAs |
| Gradiente | `#d1345b → #1f2a48 → #6366f1` | Headers, bordes animados |
