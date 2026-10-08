import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useApp } from '../context/AppContext';
import { mockProducts, mockCondiciones, Product } from '../mock/data';
import MessageBubble from '../components/chat/MessageBubble';
import ChatInput from '../components/chat/ChatInput';
import QuickActions from '../components/chat/QuickActions';
import ProductRecommendationCard from '../components/chat/ProductRecommendationCard';
import LeadCaptureForm from '../components/chat/LeadCaptureForm';

type AIResult =
  | { type: 'text'; content: string }
  | { type: 'products'; content: string; products: Product[] }
  | { type: 'conditions'; content: string }
  | { type: 'lead_form'; content: string };

function simulateAI(input: string): AIResult {
  const lower = input.toLowerCase();
  if (lower.includes('contacto') || lower.includes('datos') || lower.includes('contacten') || lower.includes('dejar')) {
    return { type: 'lead_form', content: '¡Claro! Completá este formulario y te contactamos a la brevedad:' };
  }
  if (lower.includes('condicion') || lower.includes('mayorista') || lower.includes('minorista') || lower.includes('descuento') || lower.includes('plazo') || lower.includes('compra minima')) {
    const text = mockCondiciones.map(c =>
      `${c.tipo_cliente}: compra mínima $${c.compra_minima.toLocaleString()}, ${c.descuento_porcentaje}% dto., ${c.medio_pago}, plazo ${c.plazo_pago}.`
    ).join('\n');
    return { type: 'conditions', content: `Condiciones comerciales disponibles:\n\n${text}\n\n¿Querés dejar tus datos para que te contactemos?` };
  }
  if (lower.includes('precio') || lower.includes('cuanto') || lower.includes('vale') || lower.includes('cuesta')) {
    const found = mockProducts.filter(p => lower.includes(p.nombre.split(' ')[0].toLowerCase()));
    const products = found.length > 0 ? found.slice(0, 3) : mockProducts.slice(0, 3);
    return { type: 'products', content: found.length > 0 ? 'Encontré estos productos:' : 'Algunos productos con sus precios:', products };
  }
  if (lower.includes('recomendar') || lower.includes('kiosco') || lower.includes('almacen') || lower.includes('negocio') || lower.includes('producto') || lower.includes('quiero')) {
    const products = mockProducts.filter(p => p.stock > 200).slice(0, 3);
    return { type: 'products', content: 'Te recomiendo estos productos con alta rotación y buen margen:', products };
  }
  return { type: 'text', content: 'Puedo ayudarte con precios, recomendaciones y condiciones comerciales. ¿Qué necesitás?' };
}

export default function ChatView() {
  const { messages, addMessage, pendingChatQuery, setPendingChatQuery } = useApp();
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, showLeadForm, loading]);

  const handleSend = useCallback((text: string) => {
    addMessage({ role: 'user', content: text, type: 'text' });
    setLoading(true);
    setTimeout(() => {
      const res = simulateAI(text);
      setLoading(false);
      if (res.type === 'lead_form') {
        addMessage({ role: 'assistant', content: res.content, type: 'text' });
        setShowLeadForm(true);
      } else if (res.type === 'products') {
        addMessage({ role: 'assistant', content: res.content, type: 'products', payload: res.products });
      } else {
        addMessage({ role: 'assistant', content: res.content, type: 'text' });
      }
    }, 1200);
  }, [addMessage]);

  useEffect(() => {
    if (!pendingChatQuery) return;
    const q = pendingChatQuery;
    setPendingChatQuery(null);
    handleSend(q);
  }, [pendingChatQuery, setPendingChatQuery, handleSend]);

  return (
    <Box sx={{ height: 'calc(100vh - 48px)', display: 'flex', flexDirection: 'column', bgcolor: 'white', borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
      <Box sx={{ p: 2, bgcolor: '#5e35b1', color: 'white' }}>
        <Typography variant="subtitle1" fontWeight="bold">Asistente Comercial</Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>Consultá productos, precios y condiciones comerciales</Typography>
      </Box>
      <QuickActions onAction={handleSend} />
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: '#fafafa' }}>
        {messages.map(msg =>
          msg.type === 'products' && msg.payload ? (
            <Box key={msg.id}>
              <MessageBubble message={msg} />
              <ProductRecommendationCard products={msg.payload as Product[]} />
            </Box>
          ) : (
            <MessageBubble key={msg.id} message={msg} />
          )
        )}
        {showLeadForm && <LeadCaptureForm onClose={() => setShowLeadForm(false)} />}
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CircularProgress size={16} />
            <Typography variant="caption" color="text.secondary">El asistente está escribiendo...</Typography>
          </Box>
        )}
        <div ref={endRef} />
      </Box>
      <ChatInput onSend={handleSend} disabled={loading} />
    </Box>
  );
}
