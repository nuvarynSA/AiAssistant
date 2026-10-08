import type { Metadata } from 'next'
import './globals.css'
import AppShell from '@/frontend/components/layout/AppShell'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'AI Sales Assistant',
  description: 'Asistente comercial con IA',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-50">
        <AppShell>{children}</AppShell>
        <Toaster />
      </body>
    </html>
  )
}
