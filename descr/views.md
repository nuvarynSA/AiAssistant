1. Vista: Chat con IA
Objetivo

Permitir que el usuario consulte al asistente comercial y reciba recomendaciones usando los datos del negocio.

Qué muestra
Header con nombre del sistema: AI Sales Assistant
Mensaje inicial del asistente
Área de conversación
Input para escribir consultas
Botón para enviar mensaje
Botones rápidos de consulta
Botones rápidos
Recomendar productos
Consultar precios
Ver condiciones comerciales
Quiero que me contacten
Qué puede hacer el usuario
Preguntar por productos
Pedir recomendaciones
Consultar precios
Consultar condiciones de compra
Dejar sus datos para ser contactado
Ejemplo de uso

El usuario escribe:

Tengo un kiosco y quiero productos económicos para revender.

El asistente responde:

productos recomendados
precio minorista y mayorista
condición comercial sugerida
motivo de la recomendación
pregunta si desea dejar sus datos
Datos que usa
productos.csv
condiciones_comerciales.csv
clientes.csv si querés tomar ejemplos de perfiles
Componentes UI
ChatContainer
MessageBubble
ChatInput
QuickActions
ProductRecommendationCard
LeadCaptureForm
2. Vista: Catálogo de productos
Objetivo

Mostrar los productos disponibles y permitir que el usuario los consulte con IA.

Qué muestra
Título: Catálogo de productos
Buscador por nombre
Filtro por categoría
Lista de productos en cards o tabla simple
Botón “Consultar con IA”
Estado de stock
Card de producto

Cada producto debería mostrar:

Nombre del producto
Categoría
Descripción breve
Precio unitario
Precio mayorista
Stock
Unidad
Estado: activo / inactivo
Ejemplo visual
Tutuca dulce x 1kg

Categoría: Cereales
Precio unitario: $1.800
Precio mayorista: $1.450
Stock: 250 bolsas
Unidad: bolsa

[Consultar con IA]
Qué puede hacer el usuario
Buscar productos
Filtrar por categoría
Ver precios
Ver stock disponible
Enviar un producto al chat para consultar más detalles
Acción importante

Cuando el usuario toca Consultar con IA, se abre o redirige al chat con una consulta prearmada:

Quiero información comercial sobre Tutuca dulce x 1kg.
Componentes UI
ProductSearch
ProductFilters
ProductCard
ProductList
ProductStatusBadge
AskAIButton
3. Vista: Leads registrados
Objetivo

Mostrar los clientes interesados detectados o registrados por el asistente.

Qué muestra
Título: Leads registrados
Tabla o cards de leads
Filtro por estado
Botón para exportar o sincronizar con Google Sheets
Resumen generado por IA
Datos de cada lead
Nombre
Email
Teléfono
Empresa
Tipo de cliente
Rubro
Ciudad
Producto de interés
Presupuesto estimado
Estado del lead
Fecha de contacto
Resumen IA
Estados posibles
Nuevo
Contactado
Interesado
Cerrado
Perdido
Ejemplo de lead
Juan Pérez
Empresa: Almacén Centro
Tipo: Minorista
Ciudad: Córdoba
Interés: Tutucas dulces para reventa
Estado: Interesado

Resumen IA:
Cliente con comercio chico. Busca productos económicos, buena rotación y compra inicial baja.
Qué puede hacer el usuario
Ver leads registrados
Filtrar por estado
Ver resumen de necesidad del cliente
Cambiar estado del lead
Enviar datos a Google Sheets
Volver al chat con contexto del lead
Acción importante

Botón:

Guardar en Google Sheets

Sirve para enviar el lead a una planilla externa simple.

Componentes UI
LeadTable
LeadCard
LeadStatusBadge
LeadSummary
LeadFilters
ExportToSheetsButton
Flujo completo recomendado
1. Usuario entra al chat
2. Consulta por productos
3. IA recomienda productos usando catálogo y condiciones comerciales
4. Usuario deja datos de contacto
5. Sistema crea un lead
6. Lead aparece en la vista "Leads registrados"
7. Usuario puede guardarlo en Google Sheets