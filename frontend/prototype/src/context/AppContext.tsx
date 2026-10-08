import { createContext, useContext, useState, ReactNode } from 'react';
import { Lead, Product, mockLeads } from '../mock/data';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'products' | 'conditions' | 'lead_form';
  payload?: Product[];
  timestamp: Date;
}

interface AppContextType {
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'fecha_contacto'>) => void;
  updateLeadStatus: (id: number, status: Lead['estado_lead']) => void;
  pendingChatQuery: string | null;
  setPendingChatQuery: (q: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const INITIAL_MESSAGE: Message = {
  id: '0',
  role: 'assistant',
  content: '¡Hola! Soy tu asistente comercial. Puedo recomendarte productos, consultarte precios y condiciones comerciales. ¿En qué te puedo ayudar?',
  type: 'text',
  timestamp: new Date(),
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [pendingChatQuery, setPendingChatQuery] = useState<string | null>(null);

  const addMessage = (msg: Omit<Message, 'id' | 'timestamp'>) => {
    setMessages(prev => [...prev, { ...msg, id: Date.now().toString(), timestamp: new Date() }]);
  };

  const addLead = (lead: Omit<Lead, 'id' | 'fecha_contacto'>) => {
    setLeads(prev => [...prev, {
      ...lead,
      id: Date.now(),
      fecha_contacto: new Date().toISOString().split('T')[0],
    }]);
  };

  const updateLeadStatus = (id: number, status: Lead['estado_lead']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, estado_lead: status } : l));
  };

  return (
    <AppContext.Provider value={{ messages, addMessage, leads, addLead, updateLeadStatus, pendingChatQuery, setPendingChatQuery }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
