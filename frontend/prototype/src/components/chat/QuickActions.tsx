import { Box, Button } from '@mui/material';

const ACTIONS = [
  { label: 'Recomendar productos', query: 'Quiero que me recomiendes productos para mi negocio' },
  { label: 'Consultar precios', query: '¿Cuáles son los precios de los productos?' },
  { label: 'Condiciones comerciales', query: '¿Cuáles son las condiciones comerciales?' },
  { label: 'Quiero que me contacten', query: 'Quiero dejar mis datos de contacto' },
];

export default function QuickActions({ onAction }: { onAction: (q: string) => void }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 2, bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
      {ACTIONS.map(a => (
        <Button key={a.label} variant="outlined" size="small" onClick={() => onAction(a.query)} sx={{ borderRadius: 4, fontSize: '0.75rem', textTransform: 'none' }}>
          {a.label}
        </Button>
      ))}
    </Box>
  );
}
