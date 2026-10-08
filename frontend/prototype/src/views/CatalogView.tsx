import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { mockProducts, Product } from '../mock/data';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/catalog/ProductCard';
import ProductFilters from '../components/catalog/ProductFilters';

const CATEGORIES = [...new Set(mockProducts.map(p => p.categoria))];

export default function CatalogView() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { setPendingChatQuery } = useApp();
  const navigate = useNavigate();

  const filtered = mockProducts.filter(p =>
    (p.nombre.toLowerCase().includes(search.toLowerCase()) || p.descripcion.toLowerCase().includes(search.toLowerCase())) &&
    (!category || p.categoria === category)
  );

  const handleAskAI = (product: Product) => {
    setPendingChatQuery(`Quiero información comercial sobre ${product.nombre}.`);
    navigate('/chat');
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>Catálogo de productos</Typography>
      <ProductFilters search={search} category={category} categories={CATEGORIES} onSearchChange={setSearch} onCategoryChange={setCategory} />
      <Grid container spacing={2}>
        {filtered.map(p => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
            <ProductCard product={p} onAskAI={handleAskAI} />
          </Grid>
        ))}
      </Grid>
      {filtered.length === 0 && <Typography color="text.secondary" textAlign="center" mt={4}>No se encontraron productos</Typography>}
    </Box>
  );
}
