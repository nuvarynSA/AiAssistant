'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Bot } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useChatStore } from '@/frontend/store/chat-store'

interface Product {
  id: number
  nombre: string
  categoria: string
  descripcion: string
  precio_unitario: number
  precio_mayorista: number
  stock: number
  unidad: string
  activo: boolean
}

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter()
  const { setPendingQuery } = useChatStore()

  const handleAskAI = () => {
    setPendingQuery(`Quiero información comercial sobre ${product.nombre}.`)
    router.push('/chat')
  }

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-1 pt-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline">{product.categoria}</Badge>
          <Badge className={product.activo ? 'bg-green-500 text-white' : ''} variant={product.activo ? 'default' : 'secondary'}>
            {product.activo ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
        <p className="font-semibold text-sm mb-1">{product.nombre}</p>
        <p className="text-xs text-slate-500 mb-3 line-clamp-2">{product.descripcion}</p>
        <Separator className="mb-3" />
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Unit</span>
            <span className="font-semibold">${product.precio_unitario.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Wholesale</span>
            <span className="font-semibold text-violet-600">${product.precio_mayorista.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Stock</span>
            <span>{product.stock} {product.unidad}s</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full" onClick={handleAskAI}>
          <Bot className="w-3 h-3 mr-1" /> Consultar con IA
        </Button>
      </CardFooter>
    </Card>
  )
}
