'use client'

import { useState, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

interface Props {
  onSend: (msg: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')

  const handle = () => {
    if (!value.trim() || disabled) return
    onSend(value.trim())
    setValue('')
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); handle() }
  }

  return (
    <div className="flex gap-2 p-4 border-t bg-white">
      <Input
        className="flex-1"
        placeholder="Escribí tu consulta..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={onKey}
        disabled={disabled}
      />
      <Button
        onClick={handle}
        disabled={disabled || !value.trim()}
        className="bg-violet-600 hover:bg-violet-700"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  )
}
