import { Box, Paper, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { Message } from '../../context/AppContext';

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <Box sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', mb: 2, gap: 1, alignItems: 'flex-start' }}>
      {!isUser && (
        <Box sx={{ bgcolor: '#5e35b1', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <SmartToyIcon sx={{ fontSize: 18, color: 'white' }} />
        </Box>
      )}
      <Paper elevation={0} sx={{ px: 2, py: 1.5, maxWidth: '75%', bgcolor: isUser ? '#5e35b1' : 'white', color: isUser ? 'white' : 'text.primary', borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px' }}>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{message.content}</Typography>
      </Paper>
      {isUser && (
        <Box sx={{ bgcolor: '#e0e0e0', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <PersonIcon sx={{ fontSize: 18 }} />
        </Box>
      )}
    </Box>
  );
}
