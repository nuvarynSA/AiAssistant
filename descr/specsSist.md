AI Sales Assistant con Vercel AI SDK

Descripción:
Aplicación web de asistente comercial con IA para responder consultas de clientes, recomendar productos usando datos reales del negocio y guardar leads simples en Google Sheets. El sistema usa chat con streaming, búsqueda inteligente sobre catálogo/precios/condiciones comerciales y herramientas del agente para ejecutar acciones concretas.


Funcionalidades del MVP
Chat comercial con IA
El usuario conversa con un asistente de ventas que responde en tiempo real usando streaming.
Recomendación de productos con RAG
El asistente busca en catálogo, precios y condiciones comerciales para sugerir productos adecuados según la necesidad del cliente.
Registro simple de leads
Cuando detecta un posible cliente, guarda nombre, contacto, necesidad y resumen de la conversación en Google Sheets.

Data seed: generate random data to analyze  in :
clientes.csv
productos.csv
condiciones_comerciales.csv
clientes.csv:
id, nombre, email, telefono, empresa, tipo_cliente, rubro, ciudad, interes_producto, estado_lead

productos.csv:
id, nombre, categoria, descripcion, precio_unitario, precio_mayorista, stock, unidad

condiciones_comerciales.csv:
id, tipo_cliente, compra_minima, descuento_porcentaje, medio_pago, plazo_pago, observaciones

Con estos 3 archivos, el asistente puede:
Recomendar productos según tipo de cliente.
Consultar precios y stock.
Explicar condiciones comerciales.
Registrar leads nuevos con datos básicos.

