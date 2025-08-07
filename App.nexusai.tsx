import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import baseTheme from './theme';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PromptBuilder from './components/PromptBuilder';
import ChatInterface from './components/ChatInterface';
import { QualityMetrics } from './qualityAssessment';

// Import NEXUS functionality
declare global {
  interface Window {
    NEXUS: {
      TemplateManager: {
        getAllTemplates: () => Record<string, any>;
        getTemplatesByCategory: (category: string) => Record<string, any>;
        getTemplate: (id: string) => any;
      };
      TemplateCategories: Record<string, Record<string, any>>;
      APIConfig: {
        models: Array<{
          id: string;
          name: string;
          provider: string;
          tags: string[];
          poeBot: string;
          cost: number;
        }>;
        runPoe: (prompt: string, key: string, model?: string) => Promise<string>;
      };
      POE_API_KEY?: string;
      POE_MODEL?: string;
      GEMINI_API_KEY?: string;
    };
  }
}

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [, setPromptQuality] = useState<QualityMetrics | null>(null);
  const [, setTemplates] = useState<Record<string, any>>({});
  const [, setCategories] = useState<Record<string, Record<string, any>>>({});
  const [models, setModels] = useState<any[]>([]);
  const [showChat, setShowChat] = useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          ...baseTheme.palette,
          mode: darkMode ? 'dark' : 'light',
          background: {
            default: darkMode ? '#0a0a0a' : '#f8f9fa',
            paper: darkMode ? '#1a1a1a' : '#ffffff',
          },
        },
      }),
    [darkMode]
  );

  useEffect(() => {
    // Wait for NEXUS to be available
    const checkNexus = () => {
      if (window.NEXUS) {
        setTemplates(window.NEXUS.TemplateManager.getAllTemplates());
        setCategories(window.NEXUS.TemplateCategories);
        // Add Gemini to models
        const allModels = [
          ...window.NEXUS.APIConfig.models,
          {
            id: 'gemini-2.0-flash',
            name: 'Gemini 2.0 Flash',
            provider: 'Google',
            tags: ['Hızlı', 'Ücretsiz', 'Multimodal'],
            poeBot: 'Gemini-2.0-Flash',
            cost: 0.0
          }
        ];
        setModels(allModels);
      } else {
        setTimeout(checkNexus, 100);
      }
    };
    checkNexus();
  }, []);

  const handlePromptGenerated = (prompt: string, quality: QualityMetrics) => {
    setCurrentPrompt(prompt);
    setPromptQuality(quality);
  };

  const handleTestPrompt = (prompt: string, _model: string) => {
    setCurrentPrompt(prompt);
    setShowChat(true);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = async (prompt: string, modelId: string): Promise<string> => {
    try {
      if (modelId === 'gemini-2.0-flash') {
        // Use Gemini API with stored API key
        const geminiApiKey = localStorage.getItem('nexus_gemini_api_key') || window.NEXUS?.GEMINI_API_KEY;
        
        const response = await fetch('http://localhost:3001/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            prompt, 
            model: modelId,
            apiKey: geminiApiKey 
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Gemini API call failed');
        }
        const data = await response.json();
        return data.response;
      } else {
        // Use existing POE API
        if (!window.NEXUS?.POE_API_KEY) {
          throw new Error('API anahtarı ayarlanmamış. Lütfen ayarlar menüsünden API anahtarınızı girin.');
        }

        const selectedModel = models.find(m => m.id === modelId);
        const poeModel = selectedModel?.poeBot || 'Claude-3-Sonnet';

        const response = await window.NEXUS.APIConfig.runPoe(
          prompt,
          window.NEXUS.POE_API_KEY,
          poeModel
        );
        return response;
      }
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const backgroundStyle = {
    background: darkMode 
      ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)'
      : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f1f3f4 100%)',
    minHeight: '100vh'
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={backgroundStyle}>
        <Navbar darkMode={darkMode} onThemeToggle={handleThemeToggle} />
        
        {!showChat ? (
          <>
            <HeroSection />
            <PromptBuilder
              onPromptGenerated={handlePromptGenerated}
              onTestPrompt={handleTestPrompt}
              models={models}
            />
          </>
        ) : (
          <ChatInterface
            initialPrompt={currentPrompt}
            models={models}
            onSendMessage={handleSendMessage}
            onBack={() => setShowChat(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;