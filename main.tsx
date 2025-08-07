import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.nexusai';

// Wait for NEXUS system to be ready
const waitForNEXUS = () => {
  return new Promise<void>((resolve) => {
    const checkNEXUS = () => {
      if (window.NEXUS) {
        resolve();
      } else {
        setTimeout(checkNEXUS, 100);
      }
    };
    checkNEXUS();
  });
};

// Mount React App
const mountApp = async () => {
  await waitForNEXUS();
  
  const container = document.getElementById('root');
  if (!container) {
    console.error('Root container not found');
    return;
  }

  // Remove loading content
  container.innerHTML = '';
  
  const root = createRoot(container);
  root.render(<App />);
  
  console.log('NEXUS React App mounted successfully');
};

mountApp().catch(console.error);