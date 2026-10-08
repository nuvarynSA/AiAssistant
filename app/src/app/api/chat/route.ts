import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { searchProducts, getConditions, createLead } from '@/backend/ai/tools'
import { SYSTEM_PROMPT } from '@/backend/ai/system-prompt'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: SYSTEM_PROMPT,
    messages,
    tools: { searchProducts, getConditions, createLead },
    maxSteps: 5,
  })

  return result.toDataStreamResponse()
}
