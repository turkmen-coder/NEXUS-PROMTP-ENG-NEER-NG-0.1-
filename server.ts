import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { router } from './router.js';
import { telemetry } from './telemetry.js';

dotenv.config();

const app = express();

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

app.use(express.json({ limit: '1mb' }));
// CORS headers for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// API routes
app.use('/api', router);

// Serve built static files from dist directory
app.use(express.static('dist'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'NEXUS Backend' });
});

// Serve main HTML file for all routes (SPA)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.resolve('dist/index.html'));
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  telemetry.startup();
  console.log(`🚀 NEXUS 0.1 LLM server started at http://localhost:${port}`);
});