import { useState, KeyboardEvent } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Props { onSend: (msg: string) => void; disabled?: boolean; }

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const handle = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handle(); }
  };
  return (
    <Box sx={{ display: 'flex', gap: 1, p: 2, bgcolor: 'white', borderTop: '1px solid #e0e0e0' }}>
      <TextField fullWidth size="small" placeholder="Escribí tu consulta..." value={value} onChange={e => setValue(e.target.value)} onKeyDown={onKey} disabled={disabled} multiline maxRows={3} />
      <IconButton onClick={handle} disabled={disabled || !value.trim()} sx={{ bgcolor: '#5e35b1', color: 'white', '&:hover': { bgcolor: '#4527a0' }, '&.Mui-disabled': { bgcolor: '#e0e0e0' } }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}
