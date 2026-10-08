import { Box } from '@mui/material';
import { ReactNode } from 'react';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        {children}
      </Box>
    </Box>
  );
}
