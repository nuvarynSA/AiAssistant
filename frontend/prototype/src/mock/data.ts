export interface Product {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio_unitario: number;
  precio_mayorista: number;
  stock: number;
  unidad: string;
  activo: boolean;
}

export interface Condicion {
  id: number;
  tipo_cliente: string;
  compra_minima: number;
  descuento_porcentaje: number;
  medio_pago: string;
  plazo_pago: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Interested' | 'Closed' | 'Lost';

export interface Lead {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  tipo_cliente: string;
  rubro: string;
  ciudad: string;
  interes_producto: string;
  estado_lead: LeadStatus;
  fecha_contacto: string;
  resumen_ia: string;
}

export const mockProducts: Product[] = [
  { id: 1, nombre: 'Trail Mix x 1lb', categoria: 'Snacks', descripcion: 'Premium mixed nuts and dried fruit ideal for convenience stores', precio_unitario: 4.99, precio_mayorista: 3.99, stock: 250, unidad: 'bag', activo: true },
  { id: 2, nombre: 'Kettle Chips x 1oz', categoria: 'Snacks', descripcion: 'Individual kettle-cooked chips high-turnover snack', precio_unitario: 1.49, precio_mayorista: 1.19, stock: 500, unidad: 'unit', activo: true },
  { id: 3, nombre: 'Granola Bars x 12pk', categoria: 'Cereals', descripcion: 'Variety pack granola bars popular at grocery checkout', precio_unitario: 5.49, precio_mayorista: 4.39, stock: 180, unidad: 'box', activo: true },
  { id: 4, nombre: 'Peanut Butter Crackers x 1oz', categoria: 'Snacks', descripcion: 'Single-serve peanut butter cracker pack for convenience stores', precio_unitario: 1.29, precio_mayorista: 1.03, stock: 450, unidad: 'unit', activo: true },
  { id: 5, nombre: 'Sparkling Water x 16.9oz', categoria: 'Beverages', descripcion: 'Unsweetened sparkling water ideal for stores and kiosks', precio_unitario: 1.29, precio_mayorista: 1.03, stock: 400, unidad: 'bottle', activo: true },
  { id: 6, nombre: 'Orange Juice x 52oz', categoria: 'Beverages', descripcion: '100% orange juice variety of flavors', precio_unitario: 3.99, precio_mayorista: 3.19, stock: 150, unidad: 'bottle', activo: true },
  { id: 7, nombre: 'Whole Milk x 1gal', categoria: 'Dairy', descripcion: 'Whole milk gallon standard retail size', precio_unitario: 4.29, precio_mayorista: 3.43, stock: 200, unidad: 'jug', activo: true },
  { id: 8, nombre: 'Greek Yogurt x 5.3oz', categoria: 'Dairy', descripcion: 'Creamy Greek yogurt with fruit high-margin product', precio_unitario: 1.99, precio_mayorista: 1.59, stock: 280, unidad: 'cup', activo: true },
  { id: 9, nombre: 'Pretzels x 16oz', categoria: 'Snacks', descripcion: 'Salted pretzel twists snack format', precio_unitario: 3.49, precio_mayorista: 2.79, stock: 380, unidad: 'bag', activo: true },
  { id: 10, nombre: 'Assorted Cookies x 13oz', categoria: 'Cereals', descripcion: 'Variety cookie pack for resale', precio_unitario: 3.99, precio_mayorista: 3.19, stock: 290, unidad: 'pack', activo: true },
];

export const mockCondiciones: Condicion[] = [
  { id: 1, tipo_cliente: 'Retailer', compra_minima: 200, descuento_porcentaje: 5, medio_pago: 'Credit Card / ACH', plazo_pago: 'Immediate' },
  { id: 2, tipo_cliente: 'Wholesaler', compra_minima: 600, descuento_porcentaje: 15, medio_pago: 'ACH / Check', plazo_pago: 'Net 30' },
  { id: 3, tipo_cliente: 'Distributor', compra_minima: 2000, descuento_porcentaje: 25, medio_pago: 'ACH / Wire Transfer', plazo_pago: 'Net 60' },
];

export const mockLeads: Lead[] = [
  { id: 1, nombre: 'James Carter', email: 'james@cornermart.com', telefono: '212-555-0101', empresa: 'Corner Mart LLC', tipo_cliente: 'Retailer', rubro: 'Convenience Store', ciudad: 'New York', interes_producto: 'Trail mix and snack bars', estado_lead: 'Interested', fecha_contacto: '2026-05-20', resumen_ia: 'Small convenience store owner. Looking for high-turnover snacks with low minimum order.' },
  { id: 2, nombre: 'Sarah Mitchell', email: 'sarah@sunshinegrocer.com', telefono: '323-555-0202', empresa: 'Sunshine Grocery', tipo_cliente: 'Retailer', rubro: 'Grocery Store', ciudad: 'Los Angeles', interes_producto: 'Single-serve snacks and beverages', estado_lead: 'New', fecha_contacto: '2026-05-25', resumen_ia: 'Urban grocery with high foot traffic. Interested in single-serve and grab-and-go formats.' },
  { id: 3, nombre: 'Michael Torres', email: 'michael@northdist.com', telefono: '312-555-0303', empresa: 'North Distribution Co', tipo_cliente: 'Wholesaler', rubro: 'Distribution', ciudad: 'Chicago', interes_producto: 'Bulk cereals and snacks', estado_lead: 'Contacted', fecha_contacto: '2026-05-18', resumen_ia: 'Regional distributor with high purchasing capacity. Negotiates volume discounts and extended payment terms.' },
  { id: 4, nombre: 'Emily Johnson', email: 'emily@familymarket.com', telefono: '602-555-0404', empresa: 'Family Market Inc', tipo_cliente: 'Wholesaler', rubro: 'Supermarket', ciudad: 'Phoenix', interes_producto: 'Dairy and cereal mix', estado_lead: 'Interested', fecha_contacto: '2026-05-22', resumen_ia: 'Mid-size supermarket. Seeking product variety and competitive wholesale pricing.' },
  { id: 5, nombre: 'Robert Davis', email: 'robert@quickstop.com', telefono: '713-555-0505', empresa: 'Quick Stop Stores', tipo_cliente: 'Retailer', rubro: 'Convenience Store', ciudad: 'Houston', interes_producto: 'Beverages and snacks', estado_lead: 'Closed', fecha_contacto: '2026-05-10', resumen_ia: 'Traditional convenience store. Completed initial order of beverages and snacks. High repeat potential.' },
];
