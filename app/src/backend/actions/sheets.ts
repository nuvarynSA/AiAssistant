'use server'

import { google } from 'googleapis'
import { prisma } from '../db/prisma'

async function getAuthClient() {
  const jsonCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS

  const auth = jsonCredentials
    ? new google.auth.GoogleAuth({
        credentials: JSON.parse(jsonCredentials),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })
    : new google.auth.GoogleAuth({
        keyFile,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })

  return auth.getClient()
}

export async function exportLeadsToSheets(leadIds?: number[]) {
  const leads = await prisma.lead.findMany({
    where: leadIds ? { id: { in: leadIds } } : undefined,
    orderBy: { fecha_contacto: 'desc' },
  })

  const authClient = await getAuthClient()
  const sheets = google.sheets({ version: 'v4', auth: authClient as never })

  const spreadsheetId = process.env.GOOGLE_SHEETS_ID
  if (!spreadsheetId) throw new Error('GOOGLE_SHEETS_ID no configurado en .env')

  const rows = leads.map(l => [
    l.nombre,
    l.telefono,
    l.email ?? '',
    l.empresa ?? '',
    l.tipo_cliente ?? '',
    l.ciudad ?? '',
    l.interes_producto ?? '',
    l.estado_lead,
    l.fecha_contacto.toISOString().split('T')[0],
    l.resumen_ia ?? '',
  ])

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Leads!A:J',
    valueInputOption: 'RAW',
    requestBody: { values: rows },
  })

  return { exported: leads.length }
}
