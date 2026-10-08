import { Card, CardContent, CardActions, Typography, Chip, Box, Button, Divider } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Product } from '../../mock/data';

interface Props { product: Product; onAskAI: (p: Product) => void; }

export default function ProductCard({ product, onAskAI }: Props) {
  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Chip label={product.categoria} size="small" color="primary" variant="outlined" />
          <Chip label={product.activo ? 'Activo' : 'Inactivo'} size="small" color={product.activo ? 'success' : 'default'} />
        </Box>
        <Typography variant="subtitle2" fontWeight="bold" mb={0.5}>{product.nombre}</Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={1}>{product.descripcion}</Typography>
        <Divider sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">Unit</Typography>
            <Typography variant="caption" fontWeight="bold">${product.precio_unitario.toLocaleString()}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">Wholesale</Typography>
            <Typography variant="caption" fontWeight="bold" color="primary">${product.precio_mayorista.toLocaleString()}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">Stock</Typography>
            <Typography variant="caption">{product.stock} {product.unidad}s</Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<SmartToyIcon />} onClick={() => onAskAI(product)} fullWidth variant="outlined" color="secondary">
          Consultar con IA
        </Button>
      </CardActions>
    </Card>
  );
}
