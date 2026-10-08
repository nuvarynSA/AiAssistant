import { Box, Card, CardContent, Typography, Chip, Divider } from '@mui/material';
import { Product } from '../../mock/data';

interface Props { products: Product[]; }

export default function ProductRecommendationCard({ products }: Props) {
  return (
    <Box sx={{ ml: 5, mb: 2 }}>
      {products.map(p => (
        <Card key={p.id} variant="outlined" sx={{ mb: 1, borderLeft: '4px solid #5e35b1' }}>
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="subtitle2" fontWeight="bold">{p.nombre}</Typography>
              <Chip label={p.categoria} size="small" color="secondary" />
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>{p.descripcion}</Typography>
            <Divider sx={{ my: 0.5 }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="caption"><b>Unit:</b> ${p.precio_unitario.toLocaleString()}</Typography>
              <Typography variant="caption"><b>Wholesale:</b> ${p.precio_mayorista.toLocaleString()}</Typography>
              <Typography variant="caption"><b>Stock:</b> {p.stock} {p.unidad}s</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
