import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Container,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

interface Model {
  id: string;
  name: string;
  provider: string;
  tags: string[];
  poeBot: string;
  cost: number;
}

// interface TemplateData {
//   role: string;
//   taskType: string;
//   task: string;
//   context: string;
//   format: string;
//   tone: string;
//   constraints: string;
// }

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  initialPrompt?: string;
  models: Model[];
  onSendMessage: (prompt: string, model: string) => Promise<string>;
  onBack?: () => void;
}

const ChatContainer = styled(Paper)(() => ({
  height: '600px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

const MessageBubble = styled(Paper)<{ isUser?: boolean }>(({ theme, isUser }) => ({
  padding: theme.spacing(2),
  maxWidth: '80%',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  backgroundColor: isUser 
    ? theme.palette.primary.main 
    : theme.palette.background.paper,
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  borderRadius: theme.spacing(2),
  borderBottomRightRadius: isUser ? theme.spacing(0.5) : theme.spacing(2),
  borderBottomLeftRadius: isUser ? theme.spacing(2) : theme.spacing(0.5)
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default
}));

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  // initialPrompt,
  models,
  onSendMessage,
  // onBack
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState(models[0]?.id || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customRole, setCustomRole] = useState('');
  const [useCustomRole, setUseCustomRole] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Create enhanced prompt with custom role or template
      let enhancedPrompt = inputValue;
      
      if (useCustomRole && customRole.trim()) {
        enhancedPrompt = `Sen bir ${customRole}sın. 

Kullanıcı sorusu: ${inputValue}`;
      } else if (template) {
        enhancedPrompt = `Sen bir ${template.role}sın. 
Görevin: ${template.task}
Bağlam: ${template.context}
Format: ${template.format}
Ton: ${template.tone}
Kısıtlamalar: ${template.constraints}

Kullanıcı sorusu: ${inputValue}`;
      }

      const response = await onSendMessage(enhancedPrompt, selectedModel);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const selectedModelData = models.find(m => m.id === selectedModel);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
        AI Sohbet Arayüzü
      </Typography>

      {/* Role Selection */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          AI Rol Ayarları
        </Typography>
        
        <Stack spacing={2}>
          <FormControl component="fieldset">
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant={!useCustomRole ? "contained" : "outlined"}
                onClick={() => setUseCustomRole(false)}
                size="small"
              >
                Şablon Kullan
              </Button>
              <Button
                variant={useCustomRole ? "contained" : "outlined"}
                onClick={() => setUseCustomRole(true)}
                size="small"
              >
                Özel Rol
              </Button>
            </Stack>
          </FormControl>

          {useCustomRole ? (
            <TextField
              fullWidth
              label="AI'nın Rolünü Belirleyin"
              placeholder="örn: Yazılım Geliştirici, Pazarlama Uzmanı, Öğretmen, Doktor..."
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              helperText="AI bu rolle davranacak ve size bu perspektiften yardım edecek"
              variant="outlined"
            />
          ) : (
            template && (
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Aktif Şablon: {template.role}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1, mb: 2 }}>
                  <Chip label={template.taskType} color="primary" size="small" />
                  <Chip label={template.tone} color="secondary" size="small" />
                  <Chip label={template.format} variant="outlined" size="small" />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {template.task}
                </Typography>
              </Box>
            )
          )}
        </Stack>
      </Paper>

      {/* Model Selection */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>AI Model</InputLabel>
            <Select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              label="AI Model"
            >
              {models.map(model => (
                <MenuItem key={model.id} value={model.id}>
                  {model.name} ({model.provider})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {selectedModelData && (
            <Stack direction="row" spacing={1}>
              {selectedModelData.tags.map(tag => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
              <Chip 
                label={`$${selectedModelData.cost}`} 
                size="small" 
                color="info" 
              />
            </Stack>
          )}
        </Stack>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Chat Container */}
      <ChatContainer elevation={2}>
        <MessagesContainer>
          {messages.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <SmartToyIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Sohbete başlamak için bir mesaj yazın
              </Typography>
              {template && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {template.role} rolünde size yardımcı olmaya hazırım
                </Typography>
              )}
            </Box>
          )}

          {messages.map((message) => (
            <Stack
              key={message.id}
              direction="row"
              spacing={1}
              alignItems="flex-start"
              sx={{ alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start' }}
            >
              {message.role === 'assistant' && (
                <SmartToyIcon sx={{ color: 'primary.main', mt: 1 }} />
              )}
              
              <MessageBubble isUser={message.role === 'user'}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {message.content}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block', 
                    mt: 1, 
                    opacity: 0.7,
                    textAlign: message.role === 'user' ? 'right' : 'left'
                  }}
                >
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </MessageBubble>

              {message.role === 'user' && (
                <PersonIcon sx={{ color: 'text.secondary', mt: 1 }} />
              )}
            </Stack>
          ))}

          {isLoading && (
            <Stack direction="row" spacing={1} alignItems="center">
              <SmartToyIcon sx={{ color: 'primary.main' }} />
              <Paper sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularProgress size={16} />
                  <Typography variant="body2">Yanıt yazılıyor...</Typography>
                </Stack>
              </Paper>
            </Stack>
          )}
        </MessagesContainer>

        <InputContainer>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder={template ? `${template.role} olarak bir soru sorun...` : "Mesajınızı yazın..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              sx={{ minWidth: 'auto', px: 2 }}
            >
              <SendIcon />
            </Button>
          </Stack>
        </InputContainer>
      </ChatContainer>
    </Container>
  );
};

export default ChatInterface;