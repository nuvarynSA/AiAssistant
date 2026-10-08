import { tool } from 'ai'
import { z } from 'zod'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { prisma } from '../db/prisma'
import { searchByEmbedding } from './rag'

export const searchProducts = tool({
  description: 'Busca productos en el catálogo usando búsqueda semántica. Usá esta tool antes de recomendar cualquier producto.',
  parameters: z.object({
    query: z.string().describe('Descripción de lo que busca el cliente, ej: "snacks baratos para kiosco"'),
  }),
  execute: async ({ query }) => {
    const products = await searchByEmbedding(query, 5)
    if (products.length === 0) return { message: 'No se encontraron productos relevantes.', products: [] }
    return { products }
  },
})

export const getConditions = tool({
  description: 'Obtiene las condiciones comerciales: compra mínima, descuentos y plazos de pago.',
  parameters: z.object({
    tipoCliente: z.enum(['Retailer', 'Wholesaler', 'Distributor']).optional()
      .describe('Tipo de cliente para filtrar condiciones. Si no se especifica, devuelve todas.'),
  }),
  execute: async ({ tipoCliente }) => {
    const condiciones = await prisma.condicion.findMany({
      where: tipoCliente ? { tipo_cliente: tipoCliente } : undefined,
      select: {
        tipo_cliente: true,
        compra_minima: true,
        descuento_porcentaje: true,
        medio_pago: true,
        plazo_pago: true,
        observaciones: true,
      },
    })
    return { condiciones }
  },
})

export const createLead = tool({
  description: 'Registra los datos de un cliente interesado. Usá cuando el usuario quiera ser contactado o muestre intención de compra.',
  parameters: z.object({
    nombre: z.string().describe('Nombre completo del cliente'),
    telefono: z.string().describe('Teléfono de contacto'),
    empresa: z.string().optional().describe('Nombre del negocio o empresa'),
    tipo_cliente: z.enum(['Retailer', 'Wholesaler', 'Distributor']).optional(),
    interes_producto: z.string().optional().describe('Productos o categorías de interés'),
    ciudad: z.string().optional(),
  }),
  execute: async ({ nombre, telefono, empresa, tipo_cliente, interes_producto, ciudad }) => {
    const { text: resumen_ia } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generá un resumen comercial breve (1-2 oraciones) sobre este cliente potencial:
Nombre: ${nombre}
Empresa: ${empresa ?? 'no especificada'}
Tipo: ${tipo_cliente ?? 'no especificado'}
Ciudad: ${ciudad ?? 'no especificada'}
Interés: ${interes_producto ?? 'no especificado'}

El resumen debe destacar el perfil del cliente y su potencial comercial.`,
    })

    const lead = await prisma.lead.create({
      data: {
        nombre,
        telefono,
        empresa: empresa ?? null,
        tipo_cliente: tipo_cliente ?? null,
        interes_producto: interes_producto ?? null,
        ciudad: ciudad ?? null,
        estado_lead: 'New',
        resumen_ia,
      },
    })

    return { leadId: lead.id, message: `Lead registrado correctamente. El equipo de ventas contactará a ${nombre} a la brevedad.` }
  },
})
