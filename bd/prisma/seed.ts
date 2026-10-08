import { PrismaClient, LeadStatus } from '@prisma/client'
import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

async function getEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: text,
  })
  return embedding
}

function parseCSV(filePath: string): Record<string, string>[] {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim())
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim())
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']))
  })
}

const SEEDS_DIR = join(__dirname, '../seeds')

const MOCK_PRODUCTS = [
  { nombre: 'Trail Mix x 1lb', categoria: 'Snacks', descripcion: 'Premium mixed nuts and dried fruit ideal for convenience stores', precio_unitario: '4.99', precio_mayorista: '3.99', stock: '250', unidad: 'bag' },
  { nombre: 'Kettle Chips x 1oz', categoria: 'Snacks', descripcion: 'Individual kettle-cooked chips high-turnover snack', precio_unitario: '1.49', precio_mayorista: '1.19', stock: '500', unidad: 'unit' },
  { nombre: 'Granola Bars x 12pk', categoria: 'Cereals', descripcion: 'Variety pack granola bars popular at grocery checkout', precio_unitario: '5.49', precio_mayorista: '4.39', stock: '180', unidad: 'box' },
  { nombre: 'Peanut Butter Crackers x 1oz', categoria: 'Snacks', descripcion: 'Single-serve peanut butter cracker pack for convenience stores', precio_unitario: '1.29', precio_mayorista: '1.03', stock: '450', unidad: 'unit' },
  { nombre: 'Sparkling Water x 16.9oz', categoria: 'Beverages', descripcion: 'Unsweetened sparkling water ideal for stores and kiosks', precio_unitario: '1.29', precio_mayorista: '1.03', stock: '400', unidad: 'bottle' },
  { nombre: 'Orange Juice x 52oz', categoria: 'Beverages', descripcion: '100% orange juice variety of flavors', precio_unitario: '3.99', precio_mayorista: '3.19', stock: '150', unidad: 'bottle' },
  { nombre: 'Whole Milk x 1gal', categoria: 'Dairy', descripcion: 'Whole milk gallon standard retail size', precio_unitario: '4.29', precio_mayorista: '3.43', stock: '200', unidad: 'jug' },
  { nombre: 'Greek Yogurt x 5.3oz', categoria: 'Dairy', descripcion: 'Creamy Greek yogurt with fruit high-margin product', precio_unitario: '1.99', precio_mayorista: '1.59', stock: '280', unidad: 'cup' },
  { nombre: 'Pretzels x 16oz', categoria: 'Snacks', descripcion: 'Salted pretzel twists snack format', precio_unitario: '3.49', precio_mayorista: '2.79', stock: '380', unidad: 'bag' },
  { nombre: 'Assorted Cookies x 13oz', categoria: 'Cereals', descripcion: 'Variety cookie pack for resale', precio_unitario: '3.99', precio_mayorista: '3.19', stock: '290', unidad: 'pack' },
]

const MOCK_CONDICIONES = [
  { tipo_cliente: 'Retailer', compra_minima: '200', descuento_porcentaje: '5', medio_pago: 'Credit Card / ACH', plazo_pago: 'Immediate', observaciones: 'Minimum order $200' },
  { tipo_cliente: 'Wholesaler', compra_minima: '600', descuento_porcentaje: '15', medio_pago: 'ACH / Check', plazo_pago: 'Net 30', observaciones: 'Requires business license' },
  { tipo_cliente: 'Distributor', compra_minima: '2000', descuento_porcentaje: '25', medio_pago: 'ACH / Wire Transfer', plazo_pago: 'Net 60', observaciones: 'Prior agreement with sales team required' },
]

const MOCK_LEADS = [
  { nombre: 'James Carter', email: 'james@cornermart.com', telefono: '212-555-0101', empresa: 'Corner Mart LLC', tipo_cliente: 'Retailer', rubro: 'Convenience Store', ciudad: 'New York', interes_producto: 'Trail mix and snack bars', estado_lead: 'Interested' },
  { nombre: 'Sarah Mitchell', email: 'sarah@sunshinegrocer.com', telefono: '323-555-0202', empresa: 'Sunshine Grocery', tipo_cliente: 'Retailer', rubro: 'Grocery Store', ciudad: 'Los Angeles', interes_producto: 'Single-serve snacks and beverages', estado_lead: 'New' },
  { nombre: 'Michael Torres', email: 'michael@northdist.com', telefono: '312-555-0303', empresa: 'North Distribution Co', tipo_cliente: 'Wholesaler', rubro: 'Distribution', ciudad: 'Chicago', interes_producto: 'Bulk cereals and snacks', estado_lead: 'Contacted' },
  { nombre: 'Emily Johnson', email: 'emily@familymarket.com', telefono: '602-555-0404', empresa: 'Family Market Inc', tipo_cliente: 'Wholesaler', rubro: 'Supermarket', ciudad: 'Phoenix', interes_producto: 'Dairy and cereal mix', estado_lead: 'Interested' },
  { nombre: 'Robert Davis', email: 'robert@quickstop.com', telefono: '713-555-0505', empresa: 'Quick Stop Stores', tipo_cliente: 'Retailer', rubro: 'Convenience Store', ciudad: 'Houston', interes_producto: 'Beverages and snacks', estado_lead: 'Closed' },
]

async function main() {
  console.log('Seeding database...')

  const productFile = join(SEEDS_DIR, 'productos.csv')
  const products = existsSync(productFile) ? parseCSV(productFile) : MOCK_PRODUCTS

  for (const p of products) {
    const text = `${p.nombre} ${p.categoria} ${p.descripcion}`
    const embedding = await getEmbedding(text)
    const vectorStr = `[${embedding.join(',')}]`
    await prisma.$executeRawUnsafe(
      `INSERT INTO products (nombre, categoria, descripcion, precio_unitario, precio_mayorista, stock, unidad, activo, embedding)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true, $8::vector)
       ON CONFLICT DO NOTHING`,
      p.nombre, p.categoria, p.descripcion,
      parseFloat(p.precio_unitario), parseFloat(p.precio_mayorista),
      parseInt(p.stock), p.unidad, vectorStr
    )
  }
  console.log(`✓ ${products.length} productos`)

  const condFile = join(SEEDS_DIR, 'condiciones_comerciales.csv')
  const condiciones = existsSync(condFile) ? parseCSV(condFile) : MOCK_CONDICIONES

  for (const c of condiciones) {
    const text = `${c.tipo_cliente} minimum order ${c.compra_minima} discount ${c.descuento_porcentaje}% ${c.observaciones ?? ''}`
    const embedding = await getEmbedding(text)
    const vectorStr = `[${embedding.join(',')}]`
    await prisma.$executeRawUnsafe(
      `INSERT INTO condiciones_comerciales (tipo_cliente, compra_minima, descuento_porcentaje, medio_pago, plazo_pago, observaciones, embedding)
       VALUES ($1, $2, $3, $4, $5, $6, $7::vector)
       ON CONFLICT DO NOTHING`,
      c.tipo_cliente, parseFloat(c.compra_minima), parseFloat(c.descuento_porcentaje),
      c.medio_pago, c.plazo_pago, c.observaciones ?? '', vectorStr
    )
  }
  console.log(`✓ ${condiciones.length} condiciones`)

  const clientesFile = join(SEEDS_DIR, 'clientes.csv')
  const clientes = existsSync(clientesFile) ? parseCSV(clientesFile) : MOCK_LEADS

  await prisma.lead.createMany({
    data: clientes.map(c => ({
      nombre: c.nombre,
      email: c.email || null,
      telefono: c.telefono,
      empresa: c.empresa || null,
      tipo_cliente: c.tipo_cliente || null,
      rubro: c.rubro || null,
      ciudad: c.ciudad || null,
      interes_producto: c.interes_producto || null,
      estado_lead: (c.estado_lead as LeadStatus) || LeadStatus.New,
    })),
    skipDuplicates: true,
  })
  console.log(`✓ ${clientes.length} leads`)

  console.log('Seed completo!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
