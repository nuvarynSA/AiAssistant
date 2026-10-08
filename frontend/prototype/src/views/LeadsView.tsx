import { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Select, MenuItem, FormControl, InputLabel, Button, SelectChangeEvent, Snackbar, Alert } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import { useApp } from '../context/AppContext';
import { Lead } from '../mock/data';

const STATUS_COLORS: Record<Lead['estado_lead'], 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
  New: 'primary', Contacted: 'warning', Interested: 'success', Closed: 'default', Lost: 'error',
};
const STATUSES: Lead['estado_lead'][] = ['New', 'Contacted', 'Interested', 'Closed', 'Lost'];

export default function LeadsView() {
  const { leads, updateLeadStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState('');
  const [toast, setToast] = useState(false);

  const filtered = filterStatus ? leads.filter(l => l.estado_lead === filterStatus) : leads;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">Leads registrados</Typography>
        <Button variant="contained" color="success" startIcon={<GridOnIcon />} size="small" onClick={() => setToast(true)}>
          Guardar en Google Sheets
        </Button>
      </Box>

      <FormControl size="small" sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel>Filtrar por estado</InputLabel>
        <Select value={filterStatus} label="Filtrar por estado" onChange={(e: SelectChangeEvent) => setFilterStatus(e.target.value)}>
          <MenuItem value="">Todos</MenuItem>
          {STATUSES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </Select>
      </FormControl>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              {['Nombre', 'Empresa', 'Ciudad', 'Tipo', 'Interés', 'Resumen IA', 'Estado', 'Fecha'].map(h => (
                <TableCell key={h}><b>{h}</b></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(lead => (
              <TableRow key={lead.id} hover>
                <TableCell>
                  <Typography variant="caption" fontWeight="bold" display="block">{lead.nombre}</Typography>
                  <Typography variant="caption" color="text.secondary">{lead.telefono}</Typography>
                </TableCell>
                <TableCell><Typography variant="caption">{lead.empresa}</Typography></TableCell>
                <TableCell><Typography variant="caption">{lead.ciudad}</Typography></TableCell>
                <TableCell><Typography variant="caption">{lead.tipo_cliente}</Typography></TableCell>
                <TableCell><Typography variant="caption">{lead.interes_producto}</Typography></TableCell>
                <TableCell sx={{ maxWidth: 180 }}><Typography variant="caption" color="text.secondary">{lead.resumen_ia}</Typography></TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={lead.estado_lead}
                    variant="standard"
                    onChange={(e: SelectChangeEvent) => updateLeadStatus(lead.id, e.target.value as Lead['estado_lead'])}
                    renderValue={v => <Chip label={v} size="small" color={STATUS_COLORS[v as Lead['estado_lead']]} />}
                    sx={{ fontSize: '0.75rem' }}
                  >
                    {STATUSES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </Select>
                </TableCell>
                <TableCell><Typography variant="caption">{lead.fecha_contacto}</Typography></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={toast} autoHideDuration={3000} onClose={() => setToast(false)}>
        <Alert severity="success" onClose={() => setToast(false)}>
          {filtered.length} leads exportados a Google Sheets (simulado) ✓
        </Alert>
      </Snackbar>
    </Box>
  );
}
