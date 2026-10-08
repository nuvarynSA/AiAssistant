# Instrucciones de trabajo para Claude

## Proyecto

Desarrollar una aplicación llamada **AI Sales Assistant**.

La app debe permitir que un usuario consulte productos, reciba recomendaciones comerciales con IA y registre leads simples.

## Estructura obligatoria del proyecto

Claude debe trabajar respetando esta estructura base:

```txt
PrAiSalesAssistant/
├── frontend/
├── backend/
├── bd/
├── descr/
└── sessions/
```

## Uso de carpetas

### `frontend/`

Debe contener la aplicación visual.

Responsabilidades:

* Interfaz del chat con IA.
* Catálogo de productos.
* Vista de leads registrados.
* Componentes reutilizables.
* Formularios y validaciones visuales.

### `backend/`

Debe contener la lógica del servidor.

Responsabilidades:

* API Routes o Route Handlers.
* Server Actions si aplica.
* Integración con Vercel AI SDK.
* Tool Calling.
* Validaciones con Zod.
* Conexión con base de datos.
* Integración con Google Sheets API.

### `bd/`

Debe contener todo lo relacionado con datos.

Responsabilidades:

* Modelo de base de datos.
* Seeds.
* CSV iniciales.
* Scripts SQL si aplica.
* Prisma schema.
* Migraciones o scripts de carga.

### `descr/`

Debe contener documentación funcional y técnica.

Responsabilidades:

* Requisitos de la app.
* Reglas de negocio.
* Stack.
* Casos de uso.
* Decisiones técnicas.
* Alcance del MVP.
* Documentación actualizada del proyecto.

### `sessions/`

Debe contener resúmenes de sesiones de trabajo.

Cuando el usuario indique por lenguaje natural:

```txt
resumi sesion en dir: sessions
```

Claude debe crear un archivo `.md` dentro de `sessions/` con fecha y hora.

Formato sugerido:

```txt
sessions/YYYY-MM-DD_HH-mm_resumen-sesion.md
```

Ejemplo:

```txt
sessions/2026-05-28_15-40_resumen-sesion.md
```

## Conducta obligatoria de Claude

Claude debe trabajar con enfoque **SDD — Spec Driven Development**.

Antes de implementar funcionalidades importantes debe:

* Definir requisitos.
* Identificar reglas de negocio.
* Registrar decisiones técnicas.
* Actualizar documentación.
* Mantener trazabilidad entre specs e implementación.

## Memoria del proyecto

Claude debe mantener memoria escrita del proyecto en archivos `.md`.

Debe registrar:

* Requisitos funcionales.
* Requisitos no funcionales.
* Reglas de negocio.
* Decisiones técnicas.
* Casos de uso.
* Cambios relevantes.
* Pendientes.
* Riesgos o dudas.

La documentación debe guardarse principalmente en `descr/`.

## Actualización obligatoria de documentación

Claude siempre debe actualizar la documentación cuando:

* Agregue una funcionalidad.
* Cambie una regla de negocio.
* Cambie el modelo de datos.
* Cambie la estructura de carpetas.
* Tome una decisión técnica relevante.
* Detecte un pendiente o riesgo.

La documentación dentro de `descr/` debe mantenerse alineada con el código.

## Límite obligatorio de archivos `.md`

Ningún archivo `.md` debe superar las **200 líneas**.

Si un archivo necesita más contenido:

* Claude debe dividirlo en nuevos archivos.
* Debe redefinir títulos claros.
* Debe separar specs, reglas, decisiones y pendientes.
* Debe evitar documentación extensa innecesaria.

Más de 200 líneas en un `.md` se considera exceso de información.

## Libertad de configuración

Claude puede crear archivos propios de configuración si son necesarios.

Puede crear, por ejemplo:

* Configs de frontend.
* Configs de backend.
* Configs de Prisma.
* Configs de TypeScript.
* Configs de Tailwind.
* Configs de linting.
* Scripts de seed.
* Scripts auxiliares.

Debe aprovechar la estructura ya seteada y no reemplazarla sin motivo.

## Stack del proyecto

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Hook Form
* Zod

### IA

* Vercel AI SDK
* OpenAI GPT-4.1 / GPT-4o / GPT-4o-mini
* Alternativa: Anthropic Claude
* AI SDK UI para chat con streaming
* AI SDK Core para lógica del agente

### Backend

* Next.js API Routes / Route Handlers
* Server Actions
* Prisma ORM
* PostgreSQL
* Zod
* Tool Calling del Vercel AI SDK

### Base de datos

* PostgreSQL
* Prisma
* pgvector
* Embeddings de OpenAI

### Integraciones

* Google Sheets API para guardar leads simples.

### Auth

* Sin autenticación en el MVP.

### Deploy

* Railway.

## Vistas principales

La app debe tener 3 vistas principales:

1. Chat con IA.
2. Catálogo de productos.
3. Leads registrados.

## Funcionalidades principales

El MVP debe incluir como máximo 3 funcionalidades centrales:

1. Chat comercial con IA y streaming.
2. Recomendación de productos usando datos del negocio.
3. Registro y visualización de leads.

## Datos iniciales

Claude debe preparar seeds usando estos archivos:

```txt
clientes.csv
productos.csv
condiciones_comerciales.csv
```

Estos archivos deben poder cargarse en PostgreSQL mediante Prisma o script de seed.

## Regla final

Claude debe priorizar claridad, trazabilidad y avance incremental.

No debe implementar funcionalidades fuera del MVP sin documentar primero el motivo en `descr/`.
