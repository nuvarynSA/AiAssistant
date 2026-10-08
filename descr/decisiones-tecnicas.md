# Decisiones técnicas — AI Sales Assistant

## Arquitectura general

- **App location**: Next.js 14 en `app/` (subdirectorio del repo). `bd/` al mismo nivel para Prisma/seeds. `frontend/prototype/` intacto.
- **App Router pattern**: Hybrid — Server Components + Server Actions + 1 Route Handler (`/api/chat` para streaming).
- **Sin autenticación** en MVP.

## Stack confirmado

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 App Router |
| UI | Tailwind CSS + shadcn/ui |
| Estado cliente | Zustand (solo chat); leads/productos = server state |
| IA | Vercel AI SDK + GPT-4o-mini |
| ORM | Prisma con schema en `bd/prisma/schema.prisma` |
| DB local | Docker pgvector/pgvector:pg16 |
| RAG | pgvector cosine similarity + text-embedding-3-small |
| Google Sheets | googleapis + Service Account |
| Deploy | Railway (PostgreSQL plugin + Web service) |

## Decisiones de datos

- `app/package.json` apunta a schema externo: `"prisma": { "schema": "../bd/prisma/schema.prisma" }`.
- Modelos: `Product`, `Condicion`, `Lead` con enum `LeadStatus`.
- `Product` y `Condicion` tienen campo `embedding vector(1536)` para RAG.
- Seed genera embeddings en insert. Si no hay CSVs, usa datos sintéticos coherentes.

## Decisiones de IA

- Modelo: `gpt-4o-mini` para chat y tools. `text-embedding-3-small` para embeddings.
- 3 tools: `searchProducts` (RAG), `getConditions` (Prisma), `createLead` (INSERT + resumen IA).
- System prompt: vendedor comercial, responde en español, usa tools antes de responder.

## Variables de entorno

Archivo: `app/.env` (Next.js lo lee desde su directorio).

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/salesassistant"
OPENAI_API_KEY=""
GOOGLE_APPLICATION_CREDENTIALS="../praisalesassistant-c303616afca6.json"
GOOGLE_SHEETS_ID=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Google Sheets

- Credenciales: `praisalesassistant-c303616afca6.json` (raíz del repo, gitignoreado).
- Auth via `GOOGLE_APPLICATION_CREDENTIALS` → `../praisalesassistant-c303616afca6.json` (relativo a `app/`).
- `GOOGLE_SHEETS_ID` a completar con ID de la planilla destino.

## Flujo de datos por vista

- **Chat**: Client Component → `useChat` → POST `/api/chat` → `streamText` → tools → DB
- **Catálogo**: Server Component → `getProducts()` → renderiza. Filtros en cliente (local).
- **Leads**: Server Component → `getLeads()` → renderiza. Mutaciones via Server Actions.

## Pendientes

- Completar `descr/reglasNegocio.md` antes de implementar F2 (triggers de lead, criterios de recomendación).
- Completar `OPENAI_API_KEY` y `GOOGLE_SHEETS_ID` en `app/.env`.
- Spec completo local en `docs/superpowers/specs/2026-05-28-sistema-completo-design.md`.
