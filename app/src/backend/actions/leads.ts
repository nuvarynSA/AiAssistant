'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../db/prisma'
import { LeadStatus } from '@prisma/client'

export async function getLeads(status?: LeadStatus) {
  return prisma.lead.findMany({
    where: status ? { estado_lead: status } : undefined,
    orderBy: { fecha_contacto: 'desc' },
  })
}

export async function updateLeadStatus(id: number, status: LeadStatus) {
  await prisma.lead.update({
    where: { id },
    data: { estado_lead: status },
  })
  revalidatePath('/leads')
}
