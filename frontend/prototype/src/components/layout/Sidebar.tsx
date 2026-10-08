import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Toolbar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const NAV_ITEMS = [
  { label: 'Chat con IA', path: '/chat', icon: <ChatIcon /> },
  { label: 'Catálogo', path: '/catalogo', icon: <InventoryIcon /> },
  { label: 'Leads', path: '/leads', icon: <PeopleIcon /> },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: '#1a1a2e',
          color: 'white',
        },
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
          <ChatIcon sx={{ color: '#7c4dff' }} />
          <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'white' }}>
            AI Sales Assistant
          </Typography>
        </Box>
      </Toolbar>
      <List>
        {NAV_ITEMS.map(item => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                borderRadius: 1,
                color: 'white',
                '&.Mui-selected': { bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6c3fe0' } },
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
