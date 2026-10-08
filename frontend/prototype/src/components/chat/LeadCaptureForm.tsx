import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useApp } from '../../context/AppContext';

export default function LeadCaptureForm({ onClose }: { onClose: () => void }) {
  const { addLead, addMessage } = useApp();
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', empresa: '', tipo_cliente: 'Retailer', rubro: '', ciudad: '', interes_producto: '' });
  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [f]: e.target.value }));

  const submit = () => {
    addLead({ ...form, estado_lead: 'New', resumen_ia: `${form.tipo_cliente} client in ${form.rubro || 'unspecified'} sector. Interest: ${form.interes_producto || 'to be defined'}.` });
    addMessage({ role: 'assistant', content: `¡Perfecto, ${form.nombre}! Tus datos quedaron registrados. Un vendedor te contactará a la brevedad. ¡Gracias por tu interés!`, type: 'text' });
    onClose();
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2, ml: 5, borderLeft: '4px solid #00acc1' }}>
      <Typography variant="subtitle2" fontWeight="bold" mb={1.5}>Dejanos tus datos de contacto</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField label="Nombre *" size="small" fullWidth value={form.nombre} onChange={set('nombre')} />
          <TextField label="Teléfono *" size="small" fullWidth value={form.telefono} onChange={set('telefono')} />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField label="Email" size="small" fullWidth value={form.email} onChange={set('email')} />
          <TextField label="Empresa" size="small" fullWidth value={form.empresa} onChange={set('empresa')} />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>Tipo cliente</InputLabel>
            <Select value={form.tipo_cliente} label="Tipo cliente" onChange={(e: SelectChangeEvent) => setForm(p => ({ ...p, tipo_cliente: e.target.value }))}>
              {['Retailer', 'Wholesaler', 'Distributor'].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField label="Ciudad" size="small" fullWidth value={form.ciudad} onChange={set('ciudad')} />
        </Box>
        <TextField label="¿Qué producto te interesa?" size="small" fullWidth value={form.interes_producto} onChange={set('interes_producto')} />
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button size="small" onClick={onClose}>Cancelar</Button>
          <Button size="small" variant="contained" onClick={submit} disabled={!form.nombre || !form.telefono}>Registrar</Button>
        </Box>
      </Box>
    </Paper>
  );
}
