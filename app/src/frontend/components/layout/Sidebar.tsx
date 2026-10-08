'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare, Package, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Chat con IA', path: '/chat', icon: MessageSquare },
  { label: 'Catálogo', path: '/catalogo', icon: Package },
  { label: 'Leads', path: '/leads', icon: Users },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 min-h-screen bg-slate-900 text-white flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-slate-700 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-violet-400" />
        <span className="font-semibold text-sm">AI Sales Assistant</span>
      </div>
      <nav className="p-3 flex flex-col gap-1">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                pathname === item.path
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
