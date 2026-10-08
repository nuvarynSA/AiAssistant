'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Sheet } from 'lucide-react'
import { exportLeadsToSheets } from '@/backend/actions/sheets'

export default function ExportToSheetsButton() {
  const [loading, setLoading] = useState(false)

  const handle = async () => {
    setLoading(true)
    try {
      const { exported } = await exportLeadsToSheets()
      toast.success(`${exported} leads exportados a Google Sheets`)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error desconocido'
      toast.error(`Error al exportar: ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handle} disabled={loading} className="bg-green-600 hover:bg-green-700 gap-2">
      <Sheet className="w-4 h-4" />
      {loading ? 'Exportando...' : 'Guardar en Google Sheets'}
    </Button>
  )
}
