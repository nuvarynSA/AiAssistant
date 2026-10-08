import { getProducts, getCategories } from '@/backend/actions/products'
import CatalogGrid from '@/frontend/components/catalog/CatalogGrid'

export default async function CatalogoPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Catálogo de productos</h1>
      <CatalogGrid products={products} categories={categories} />
    </div>
  )
}
