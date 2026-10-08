import { getLeads } from '@/backend/actions/leads'
import LeadsClient from '@/frontend/components/leads/LeadsClient'

export default async function LeadsPage() {
  const leads = await getLeads()
  const serialized = leads.map(l => ({ ...l, fecha_contacto: l.fecha_contacto.toISOString() }))
  return <LeadsClient leads={serialized} />
}
