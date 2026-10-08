'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LeadStatus } from '@prisma/client'
import LeadStatusSelect from './LeadStatusSelect'
import ExportToSheetsButton from './ExportToSheetsButton'

interface Lead {
  id: number
  nombre: string
  telefono: string
  empresa: string | null
  tipo_cliente: string | null
  ciudad: string | null
  interes_producto: string | null
  estado_lead: LeadStatus
  fecha_contacto: string
  resumen_ia: string | null
}

const STATUSES = ['Todos', ...Object.values(LeadStatus)]

export default function LeadsClient({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState('Todos')

  const filtered = filter === 'Todos' ? leads : leads.filter(l => l.estado_lead === filter)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leads registrados</h1>
        <ExportToSheetsButton />
      </div>
      <div className="mb-4">
        <Select value={filter} onValueChange={v => { if (v) setFilter(v) }}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Nombre</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Interés</TableHead>
              <TableHead>Resumen IA</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(lead => (
              <TableRow key={lead.id}>
                <TableCell>
                  <p className="font-medium text-sm">{lead.nombre}</p>
                  <p className="text-xs text-slate-400">{lead.telefono}</p>
                </TableCell>
                <TableCell className="text-sm">{lead.empresa ?? '—'}</TableCell>
                <TableCell className="text-sm">{lead.ciudad ?? '—'}</TableCell>
                <TableCell className="text-sm">{lead.tipo_cliente ?? '—'}</TableCell>
                <TableCell className="text-sm max-w-[140px] truncate">{lead.interes_producto ?? '—'}</TableCell>
                <TableCell className="text-xs text-slate-500 max-w-[180px]">{lead.resumen_ia ?? '—'}</TableCell>
                <TableCell><LeadStatusSelect leadId={lead.id} currentStatus={lead.estado_lead} /></TableCell>
                <TableCell className="text-xs text-slate-400">
                  {new Date(lead.fecha_contacto).toLocaleDateString('en-US')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <p className="text-center text-slate-400 py-8">No hay leads con ese filtro</p>
        )}
      </div>
    </div>
  )
}
