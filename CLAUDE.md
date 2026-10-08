# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

**AI Sales Assistant** — app web con asistente comercial IA que responde consultas, recomienda productos con RAG sobre catálogo/precios/condiciones comerciales, y registra leads simples en Google Sheets. MVP sin autenticación.

## Estructura obligatoria (no reemplazar)

```
PrAiSalesAssistant/
├── frontend/   # UI: chat, catálogo, leads. Componentes, formularios, validaciones visuales.
├── backend/    # API Routes / Route Handlers, Server Actions, AI SDK, Tool Calling, Prisma, Sheets API.
├── bd/         # Prisma schema, migraciones, seeds, CSVs (clientes, productos, condiciones_comerciales).
├── descr/      # Specs funcionales/técnicas. Fuente de verdad antes de codear.
└── sessions/   # Resúmenes de sesión cuando el user diga "resumi sesion en dir: sessions".
```

Nota actual: `frontend/`, `backend/` y `bd/` están **vacíos**. Las specs viven en `descr/`. No hay package.json, lockfile, ni código aún. Cualquier scaffold lo definís vos siguiendo el stack indicado.

## Stack obligatorio

- **Frontend**: Next.js + React + TypeScript + Tailwind + shadcn/ui + React Hook Form + Zod.
- **IA**: Vercel AI SDK (UI para chat streaming, Core para lógica del agente). OpenAI GPT-4.1/4o/4o-mini (alt: Anthropic Claude). Tool Calling para acciones.
- **Backend**: Next.js Route Handlers + Server Actions + Prisma + Zod.
- **DB**: PostgreSQL + Prisma + **pgvector** + embeddings de OpenAI para RAG.
- **Integración**: Google Sheets API (leads).
- **Deploy**: Railway.

Una sola app Next.js conviene; respetar la separación lógica `frontend/` vs `backend/` dentro de la convención de carpetas del repo aunque Next mezcle ambos en `app/`.

## Vistas y funcionalidades (alcance MVP — no expandir sin documentar primero en `descr/`)

Vistas: **Chat con IA**, **Catálogo de productos**, **Leads registrados**.
Features: **chat streaming**, **recomendación con RAG**, **registro/visualización de leads**.

Detalle de componentes UI y datos por vista: `descr/views.md`.
Casos de uso (flujos felices): `descr/CasUs.md`.

## Conducta de trabajo — Spec Driven Development

Antes de implementar funcionalidades importantes:

1. Definir requisitos y reglas de negocio en `descr/`.
2. Registrar decisiones técnicas (en `descr/`, no en comentarios).
3. Mantener trazabilidad spec ↔ código.
4. Actualizar `descr/` **siempre** que cambie: funcionalidad, regla de negocio, modelo de datos, estructura de carpetas, decisión técnica relevante, o se detecte pendiente/riesgo.

## Límite duro de archivos `.md`

**Ningún `.md` debe superar 200 líneas.** Si se queda corto: dividir en archivos nuevos con títulos claros, separando specs / reglas / decisiones / pendientes. Este archivo también respeta esa regla.

## Seeds y datos iniciales

Cargar en Postgres desde `bd/`:

- `clientes.csv` → `id, nombre, email, telefono, empresa, tipo_cliente, rubro, ciudad, interes_producto, estado_lead`
- `productos.csv` → `id, nombre, categoria, descripcion, precio_unitario, precio_mayorista, stock, unidad`
- `condiciones_comerciales.csv` → `id, tipo_cliente, compra_minima, descuento_porcentaje, medio_pago, plazo_pago, observaciones`

Vía Prisma seed script. Si los CSV no existen, generar datos sintéticos coherentes (ver `descr/specsSist.md`).

## Comandos

Aún no hay `package.json`. Cuando se scaffoldee Next.js, los comandos esperados serán:

- `npm run dev` — dev server.
- `npm run build` — build producción.
- `npm run lint` — linter.
- `npx prisma migrate dev` — migraciones.
- `npx prisma db seed` — cargar CSVs.

Documentar comandos reales en `descr/` apenas existan.

## Reglas operativas locales

- **Idioma**: documentación y comentarios en español; código (identificadores) en inglés.
- **Resumen de sesión**: cuando el user pida "resumi sesion en dir: sessions", crear `sessions/YYYY-MM-DD_HH-mm_resumen-sesion.md`.
- **No expandir scope**: nada fuera de las 3 funcionalidades MVP sin antes documentar el motivo en `descr/`.
- **Configs**: se pueden crear libremente (tsconfig, tailwind, prisma, eslint, scripts) si son necesarios.

## Referencias rápidas

- Specs sistema: `descr/specsSist.md`
- Casos de uso: `descr/CasUs.md`
- Vistas y componentes UI: `descr/views.md`
- Stack: `descr/stack.md`
- Reglas de negocio: `descr/reglasNegocio.md` (a completar)
- Conducta del modelo: `descr/conductaModelo.md`
