import { create } from 'zustand'

interface ChatStore {
  pendingQuery: string | null
  setPendingQuery: (q: string | null) => void
}

export const useChatStore = create<ChatStore>(set => ({
  pendingQuery: null,
  setPendingQuery: q => set({ pendingQuery: q }),
}))
