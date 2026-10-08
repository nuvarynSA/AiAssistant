'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Props {
  onSubmit: (data: LeadData) => void
  onCancel: () => void
}

export interface LeadData {
  nombre: string
  telefono: string
  empresa: string
  tipo_cliente: string
  ciudad: string
  interes_producto: string
}

export default function LeadCaptureForm({ onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<LeadData>({
    nombre: '', telefono: '', empresa: '', tipo_cliente: 'Retailer', ciudad: '', interes_producto: '',
  })

  const set = (f: keyof LeadData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }))

  return (
    <div className="ml-10 mb-4 bg-white border border-l-4 border-l-cyan-500 rounded-lg p-4 shadow-sm">
      <p className="font-semibold text-sm mb-3">Dejanos tus datos de contacto</p>
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="Nombre *" value={form.nombre} onChange={set('nombre')} className="text-sm" />
        <Input placeholder="Teléfono *" value={form.telefono} onChange={set('telefono')} className="text-sm" />
        <Input placeholder="Empresa" value={form.empresa} onChange={set('empresa')} className="text-sm" />
        <Input placeholder="Ciudad" value={form.ciudad} onChange={set('ciudad')} className="text-sm" />
        <Select value={form.tipo_cliente} onValueChange={v => setForm(p => ({ ...p, tipo_cliente: v ?? 'Retailer' }))}>
          <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            {['Retailer', 'Wholesaler', 'Distributor'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Input placeholder="Producto de interés" value={form.interes_producto} onChange={set('interes_producto')} className="text-sm" />
      </div>
      <div className="flex gap-2 justify-end mt-3">
        <Button variant="ghost" size="sm" onClick={onCancel}>Cancelar</Button>
        <Button size="sm" disabled={!form.nombre || !form.telefono} onClick={() => onSubmit(form)} className="bg-violet-600 hover:bg-violet-700">
          Registrar
        </Button>
      </div>
    </div>
  )
}
