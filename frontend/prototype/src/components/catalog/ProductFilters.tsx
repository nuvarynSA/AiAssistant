import { Box, TextField, Select, MenuItem, FormControl, InputLabel, InputAdornment, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  search: string; category: string; categories: string[];
  onSearchChange: (v: string) => void; onCategoryChange: (v: string) => void;
}

export default function ProductFilters({ search, category, categories, onSearchChange, onCategoryChange }: Props) {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <TextField size="small" placeholder="Buscar producto..." value={search} onChange={e => onSearchChange(e.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }} sx={{ minWidth: 250 }} />
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Categoría</InputLabel>
        <Select value={category} label="Categoría" onChange={(e: SelectChangeEvent) => onCategoryChange(e.target.value)}>
          <MenuItem value="">Todas</MenuItem>
          {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
