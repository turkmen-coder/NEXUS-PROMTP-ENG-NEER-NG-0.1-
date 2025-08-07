# 🚀 NEXUS AI Assistant

<div align="center">
  <img src="https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge&logo=openai" alt="AI Powered">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
</div>

<div align="center">
  <h3>🤖 Advanced AI Prompt Engineering & Template Management System</h3>
  <p>Built with modern web technologies and powered by Google Gemini AI</p>
</div>

---

## ✨ Features

🎯 **Smart AI Integration**
- Google Gemini 2.0 Flash Experimental support
- Advanced prompt engineering capabilities
- Real-time AI-powered conversations

🎨 **Modern User Interface**  
- Responsive Material-UI design
- Dark/Light theme support
- Turkish localization
- Mobile-friendly layout

⚡ **Developer Experience**
- TypeScript for type safety
- Hot reload development
- ESLint integration
- Automated build system

🖥️ **Desktop Applications**
- Python-based desktop launcher
- Console management tools
- Cross-platform support

---

## 🚀 Quick Start

### 🛠️ Installation

**1. Prerequisites**
```bash
Node.js 16+ ✓
Python 3.7+ ✓ (optional)
Gemini API Key ✓
```

**2. Clone & Install**
```bash
git clone https://github.com/your-username/nexus-ai-assistant.git
cd nexus-ai-assistant
npm install
```

**3. Configuration**
```bash
# Create .env file
cp .env.example .env
# Add your Gemini API key
GEMINI_API_KEY=your_actual_api_key_here
```

**4. Development**
```bash
# Frontend (Vite) - Port 5178
npm run dev:client

# Backend (API) - Port 3002  
PORT=3002 npm run dev:server
```

**5. Production**
```bash
npm run build
npm start
```

---

## 🌐 Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Main App** | http://localhost:5178 | Frontend (Vite Dev) |
| **API Server** | http://localhost:3002 | Backend API |
| **Health Check** | http://localhost:3002/health | Server Status |
| **Gemini API** | http://localhost:3002/api/gemini | AI Endpoint |

---

## 📁 Project Structure

```
nexus-ai-assistant/
├── 📂 src/
│   ├── 📂 components/        # React components
│   ├── 🖥️ server.ts          # Express server
│   ├── 🛠️ router.ts          # API routes
│   └── ⚙️ config.ts          # Configuration
├── 📂 public/               # Static assets  
├── 📂 dist/                 # Build output
├── 🔧 package.json          # Dependencies
└── 📝 README.md            # This file
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# 🤖 AI Configuration
GEMINI_API_KEY=your_actual_gemini_api_key_here

# 🌐 Server Configuration  
PORT=3002
NODE_ENV=production

# Frontend Configuration
VITE_API_BASE_URL=http://localhost:3002
```

---

## 🛠️ Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start both frontend and backend |
| **Frontend Only** | `npm run dev:client` | Vite dev server (5178) |
| **Backend Only** | `npm run dev:server` | Express API server (3002) |
| **Build** | `npm run build` | Production build |
| **Start** | `npm start` | Run production server |
| **Lint** | `npm run lint` | Code quality check |

---

## 🔧 API Documentation

### Gemini AI Endpoint

**POST** `/api/gemini`

```json
{
  "prompt": "Your prompt here",
  "model": "gemini-2.0-flash-exp",
  "apiKey": "optional_api_key"
}
```

**Response:**
```json
{
  "response": "AI generated response",
  "model": "gemini-2.0-flash-exp", 
  "timestamp": "2024-01-01T00:00:00.000Z",
  "cost": 0.0
}
```

---

## 🚨 Troubleshooting

### Common Issues

❌ **Port in use**
```bash
# Kill existing processes
taskkill /F /IM node.exe
# Or use different port
PORT=3003 npm run dev:server
```

❌ **MIME type errors**
```bash
# Rebuild project
npm run build
npm start
```

❌ **API key issues**
```bash
# Check .env file
cat .env
# Verify key at: https://makersuite.google.com/app/apikey
```

### Performance Tips

🚀 **For best performance:**
- Use production build: `npm run build && npm start`
- Configure API key in `.env` 
- Use Vite dev server for development: `npm run dev:client`

---

## 📊 Technology Stack

**Frontend:**
- ⚛️ React 18
- 🎨 Material-UI (MUI)
- ⚡ Vite
- 📝 TypeScript

**Backend:**
- 🟢 Node.js
- 🚀 Express.js
- 📝 TypeScript
- 🤖 Google Gemini AI

---

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create feature branch (`git checkout -b feature/amazing-feature`)
3. 💻 Make your changes
4. ✅ Test thoroughly  
5. 📝 Commit (`git commit -m 'Add amazing feature'`)
6. 🚀 Push to branch (`git push origin feature/amazing-feature`)
7. 🔄 Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💡 Support & Updates

- 🐛 **Issues**: [Report bugs here](https://github.com/your-username/nexus-ai-assistant/issues)
- 📧 **Contact**: Create an issue for support
- 📚 **Documentation**: Check this README for detailed guides

---

<div align="center">
  <p>Made with ❤️ for the AI community</p>
  <p>⭐ Star this repo if it helped you!</p>
</div>