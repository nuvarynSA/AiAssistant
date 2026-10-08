'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from 'ai/react'
import { useChatStore } from '@/frontend/store/chat-store'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import QuickActions from './QuickActions'
import ToolResultCard from './ToolResultCard'
import LeadCaptureForm, { LeadData } from './LeadCaptureForm'
import { Bot } from 'lucide-react'

export default function ChatContainer() {
  const { messages, append, isLoading } = useChat({ api: '/api/chat' })
  const { pendingQuery, setPendingQuery } = useChatStore()
  const [showLeadForm, setShowLeadForm] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading, showLeadForm])

  useEffect(() => {
    if (!pendingQuery) return
    const q = pendingQuery
    setPendingQuery(null)
    append({ role: 'user', content: q })
  }, [pendingQuery, setPendingQuery, append])

  const handleSend = (text: string) => {
    const lower = text.toLowerCase()
    if (lower.includes('datos') || lower.includes('contacten') || lower.includes('contacto')) {
      setShowLeadForm(true)
    }
    append({ role: 'user', content: text })
  }

  const handleLeadSubmit = (data: LeadData) => {
    setShowLeadForm(false)
    append({
      role: 'user',
      content: `Mis datos son: Nombre: ${data.nombre}, Teléfono: ${data.telefono}${data.empresa ? `, Empresa: ${data.empresa}` : ''}${data.tipo_cliente ? `, Tipo: ${data.tipo_cliente}` : ''}${data.ciudad ? `, Ciudad: ${data.ciudad}` : ''}${data.interes_producto ? `, Interés: ${data.interes_producto}` : ''}.`,
    })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-96px)] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
      <div className="bg-violet-600 text-white p-4">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <div>
            <p className="font-semibold text-sm">Asistente Comercial</p>
            <p className="text-xs opacity-75">Consultá productos, precios y condiciones comerciales</p>
          </div>
        </div>
      </div>
      <QuickActions onAction={handleSend} />
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
        {messages.length === 0 && (
          <MessageBubble role="assistant" content="¡Hola! Soy tu asistente comercial. Puedo recomendarte productos, consultarte precios y condiciones comerciales. ¿En qué te puedo ayudar?" />
        )}
        {messages.map(m => {
          if (m.role === 'assistant' && m.parts) {
            const productTool = m.parts.find(
              (p): p is Extract<typeof p, { type: 'tool-invocation' }> =>
                p.type === 'tool-invocation' &&
                p.toolInvocation.toolName === 'searchProducts' &&
                p.toolInvocation.state === 'result'
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const toolResult = productTool && (productTool.toolInvocation as any).result
            if (toolResult?.products?.length > 0) {
              return (
                <div key={m.id}>
                  {m.content && <MessageBubble role="assistant" content={m.content} />}
                  <ToolResultCard products={toolResult.products} />
                </div>
              )
            }
          }
          if (!m.content) return null
          return <MessageBubble key={m.id} role={m.role as 'user' | 'assistant'} content={m.content} />
        })}
        {showLeadForm && <LeadCaptureForm onSubmit={handleLeadSubmit} onCancel={() => setShowLeadForm(false)} />}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
            El asistente está escribiendo...
          </div>
        )}
        <div ref={endRef} />
      </div>
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  )
}
