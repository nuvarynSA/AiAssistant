import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Product {
  id: number
  nombre: string
  categoria: string
  descripcion: string
  precio_unitario: number
  precio_mayorista: number
  stock: number
  unidad: string
}

export default function ToolResultCard({ products }: { products: Product[] }) {
  return (
    <div className="ml-10 mb-4 flex flex-col gap-2">
      {products.map(p => (
        <div key={p.id} className="bg-white border border-l-4 border-l-violet-500 rounded-lg p-3 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-sm">{p.nombre}</span>
            <Badge variant="secondary">{p.categoria}</Badge>
          </div>
          <p className="text-xs text-slate-500 mb-2">{p.descripcion}</p>
          <Separator className="mb-2" />
          <div className="flex gap-4 text-xs">
            <span><b>Unit:</b> ${p.precio_unitario.toLocaleString('en-US')}</span>
            <span><b>Wholesale:</b> ${p.precio_mayorista.toLocaleString('en-US')}</span>
            <span><b>Stock:</b> {p.stock} {p.unidad}s</span>
          </div>
        </div>
      ))}
    </div>
  )
}
