import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ChatView from './views/ChatView';
import CatalogView from './views/CatalogView';
import LeadsView from './views/LeadsView';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="/chat" element={<ChatView />} />
        <Route path="/catalogo" element={<CatalogView />} />
        <Route path="/leads" element={<LeadsView />} />
      </Routes>
    </AppLayout>
  );
}
