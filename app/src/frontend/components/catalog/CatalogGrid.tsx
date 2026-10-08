'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import ProductCard from './ProductCard'

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

interface Props {
  products: Product[]
  categories: string[]
}

export default function CatalogGrid({ products, categories }: Props) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = products.filter(p =>
    (p.nombre.toLowerCase().includes(search.toLowerCase()) ||
     p.descripcion.toLowerCase().includes(search.toLowerCase())) &&
    (category === 'all' || p.categoria === category)
  )

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input className="pl-9" placeholder="Buscar producto..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={category} onValueChange={v => { if (v) setCategory(v) }}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-slate-400 mt-12">No se encontraron productos</p>
      )}
    </div>
  )
}
