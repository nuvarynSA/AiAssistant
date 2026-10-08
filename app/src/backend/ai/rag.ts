import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import { prisma } from '../db/prisma'

export interface ProductResult {
  id: number
  nombre: string
  categoria: string
  descripcion: string
  precio_unitario: number
  precio_mayorista: number
  stock: number
  unidad: string
  similarity: number
}

export async function searchByEmbedding(query: string, limit = 5): Promise<ProductResult[]> {
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: query,
  })

  const vectorStr = `[${embedding.join(',')}]`

  const results = await prisma.$queryRawUnsafe<ProductResult[]>(
    `SELECT
       id, nombre, categoria, descripcion,
       precio_unitario, precio_mayorista, stock, unidad,
       1 - (embedding <=> $1::vector) AS similarity
     FROM products
     WHERE activo = true AND embedding IS NOT NULL
     ORDER BY embedding <=> $1::vector
     LIMIT $2`,
    vectorStr,
    limit
  )

  return results
}
