import { cn } from '@/lib/utils'
import { Bot, User } from 'lucide-react'

interface Props {
  role: 'user' | 'assistant'
  content: string
}

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === 'user'
  return (
    <div className={cn('flex gap-2 mb-4', isUser ? 'flex-row-reverse' : 'flex-row')}>
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
        isUser ? 'bg-slate-200' : 'bg-violet-600'
      )}>
        {isUser ? <User className="w-4 h-4 text-slate-600" /> : <Bot className="w-4 h-4 text-white" />}
      </div>
      <div className={cn(
        'max-w-[75%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line',
        isUser
          ? 'bg-violet-600 text-white rounded-tr-sm'
          : 'bg-white text-slate-800 rounded-tl-sm shadow-sm border border-slate-100'
      )}>
        {content}
      </div>
    </div>
  )
}
