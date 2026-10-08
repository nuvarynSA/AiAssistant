'use server'

import { prisma } from '../db/prisma'

export async function getProducts(search?: string, category?: string) {
  return prisma.product.findMany({
    where: {
      activo: true,
      ...(search && {
        OR: [
          { nombre: { contains: search, mode: 'insensitive' } },
          { descripcion: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(category && { categoria: category }),
    },
    orderBy: { nombre: 'asc' },
  })
}

export async function getCategories(): Promise<string[]> {
  const result = await prisma.product.groupBy({
    by: ['categoria'],
    where: { activo: true },
    orderBy: { categoria: 'asc' },
  })
  return result.map(r => r.categoria)
}
