'use client'

import { Button } from '@/components/ui/button'

const ACTIONS = [
  { label: 'Recomendar productos', query: 'Quiero que me recomiendes productos para mi negocio' },
  { label: 'Consultar precios', query: '¿Cuáles son los precios de los productos?' },
  { label: 'Condiciones comerciales', query: '¿Cuáles son las condiciones comerciales?' },
  { label: 'Quiero que me contacten', query: 'Quiero dejar mis datos de contacto' },
]

export default function QuickActions({ onAction }: { onAction: (q: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 p-3 border-b bg-slate-50">
      {ACTIONS.map(a => (
        <Button
          key={a.label}
          variant="outline"
          size="sm"
          onClick={() => onAction(a.query)}
          className="text-xs rounded-full"
        >
          {a.label}
        </Button>
      ))}
    </div>
  )
}
