'use client'

import { useTransition } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { updateLeadStatus } from '@/backend/actions/leads'
import { LeadStatus } from '@prisma/client'

const STATUS_COLORS: Record<LeadStatus, string> = {
  New: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  Contacted: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
  Interested: 'bg-green-100 text-green-700 hover:bg-green-100',
  Closed: 'bg-slate-100 text-slate-700 hover:bg-slate-100',
  Lost: 'bg-red-100 text-red-700 hover:bg-red-100',
}

const STATUSES = Object.values(LeadStatus)

interface Props { leadId: number; currentStatus: LeadStatus }

export default function LeadStatusSelect({ leadId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition()

  return (
    <Select
      value={currentStatus}
      onValueChange={v => startTransition(() => { updateLeadStatus(leadId, v as LeadStatus) })}
      disabled={isPending}
    >
      <SelectTrigger className="w-36 border-none shadow-none p-0 h-auto focus:ring-0">
        <SelectValue>
          <Badge className={STATUS_COLORS[currentStatus]}>{currentStatus}</Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}
