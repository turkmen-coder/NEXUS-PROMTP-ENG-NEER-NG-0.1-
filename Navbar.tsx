import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';

const StyledAppBar = styled(AppBar)(() => ({
  background: 'rgba(93, 92, 222, 0.55)',
  backdropFilter: 'blur(12px) saturate(140%)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
  boxShadow: 'none'
}));

const BrandText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1)
}));

interface NavbarProps {
  darkMode?: boolean;
  onThemeToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onThemeToggle }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('nexus_poe_api_key') || '');
  const [geminiApiKey, setGeminiApiKey] = useState(localStorage.getItem('nexus_gemini_api_key') || '');

  const handleThemeToggle = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    onThemeToggle?.();
  };

  const handleSaveSettings = () => {
    localStorage.setItem('nexus_poe_api_key', apiKey);
    localStorage.setItem('nexus_gemini_api_key', geminiApiKey);
    if (window.NEXUS) {
      window.NEXUS.POE_API_KEY = apiKey;
      window.NEXUS.GEMINI_API_KEY = geminiApiKey;
    }
    setSettingsOpen(false);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <BrandText variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <FlashOnIcon />
          Prompt Mühendisliği Asistanı
        </BrandText>
        
        <Box>
          <IconButton
            color="inherit"
            onClick={() => setSettingsOpen(true)}
            sx={{ color: 'white' }}
          >
            <SettingsIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleThemeToggle}
            sx={{ color: 'white' }}
          >
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>API Ayarları</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Gemini API Key"
            type="password"
            value={geminiApiKey}
            onChange={(e) => setGeminiApiKey(e.target.value)}
            margin="normal"
            helperText="Google Gemini API kullanmak için API anahtarınızı girin (Ücretsiz!)"
          />
          <TextField
            fullWidth
            label="POE API Key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            margin="normal"
            helperText="Diğer AI modelleri için POE API anahtarınızı girin"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>İptal</Button>
          <Button onClick={handleSaveSettings} variant="contained">Kaydet</Button>
        </DialogActions>
      </Dialog>
    </StyledAppBar>
  );
};

export default Navbar;