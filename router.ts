import { Router } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config.js';
import { telemetry } from './telemetry.js';

export const router = Router();


// Gemini API endpoint
router.post('/gemini', async (req, res) => {
  try {
    const { prompt, model = config.gemini.model, apiKey } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt gerekli' });
    }

    // Use provided API key or config API key
    const useApiKey = apiKey || config.gemini.apiKey;
    
    if (!useApiKey) {
      return res.status(400).json({ error: 'Gemini API anahtarı gerekli' });
    }

    const start = Date.now();
    
    try {
      // Initialize Gemini client with the API key
      const genAI = new GoogleGenerativeAI(useApiKey);
      const geminiModel = genAI.getGenerativeModel({ model: model });
      
      // Generate content using Gemini API
      const result = await geminiModel.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      telemetry.record({
        model: model,
        tokens_in: prompt.length / 4, // Approximate token count
        tokens_out: text.length / 4,
        latency_ms: Date.now() - start
      });

      return res.json({ 
        response: text,
        model,
        timestamp: new Date().toISOString(),
        cost: 0.0 // Gemini is free/very low cost
      });
      
    } catch (apiError: any) {
      // If real API fails, fallback to enhanced mock response
      console.log('Gemini API error, using fallback:', apiError.message);
      
      const generateGeminiResponse = (userPrompt: string) => {
        const isCreativeTask = userPrompt.toLowerCase().includes('yaratıcı') || 
                             userPrompt.toLowerCase().includes('içerik') || 
                             userPrompt.toLowerCase().includes('hikaye');
        const isTechnicalTask = userPrompt.toLowerCase().includes('analiz') || 
                               userPrompt.toLowerCase().includes('kod') || 
                               userPrompt.toLowerCase().includes('teknoloji');
        const isBusinessTask = userPrompt.toLowerCase().includes('strateji') || 
                              userPrompt.toLowerCase().includes('plan') || 
                              userPrompt.toLowerCase().includes('iş');

        let response = `[Gemini ${model} - Demo Mode] `;

        if (isCreativeTask) {
          response += `🎨 **Yaratıcı Yaklaşım:**

Merhaba! Yaratıcı içerik üretimi konusunda size yardımcı olmaya hazırım.

**🚀 İçerik Stratejim:**
1. **Hedef Kitle Analizi**: İçeriğinizin kimler tarafından tüketileceğini analiz ederim
2. **Trend Analizi**: Güncel trendleri takip ederek zeitgeist'ı yakalarım  
3. **Duygu Haritası**: İçeriğin hangi duygusal yolculuğu çizdiğini planlarım
4. **Viral Potansiyel**: Paylaşılabilirlik faktörlerini optimize ederim

**💡 Önerilerim:**
• Hikaye anlatımında "show, don't tell" prensibini uygulayın
• Görsel metaforlar ve analojiler kullanın
• Etkileşim yaratacak sorular sorun
• Kişisel deneyimleri hikayenize dahil edin

Hangi platform için içerik üretmeyi planlıyorsunuz? Size daha spesifik önerilerde bulunayım.`;

        } else if (isTechnicalTask) {
          response += `⚙️ **Teknik Analiz Modu:**

Teknik konularda derinlemesine analiz yapmaya hazırım.

**🔍 Analiz Çerçevem:**
1. **Problem Tanımı**: Sorunu net bir şekilde tanımlarım
2. **Veri Toplama**: İlgili teknolojilerin güncel durumunu araştırırım
3. **Karşılaştırmalı Analiz**: Alternatifleri objektif kriterlerle değerlendiririm
4. **Risk Değerlendirmesi**: Potansiyel sorunları ve çözümlerini belirlerim

**📊 Metodolojim:**
• Peer-reviewed kaynaklardan faydalanma
• Best practices'leri takip etme  
• Performance metrics'leri göz önünde bulundurma
• Security ve scalability faktörlerini değerlendirme

Hangi spesifik teknik konuda analiz yapmanızı istiyorsunuz?`;

        } else if (isBusinessTask) {
          response += `📈 **Stratejik İş Analizi:**

İş stratejisi geliştirmede size rehberlik etmeye hazırım.

**🎯 Stratejik Yaklaşımım:**
1. **SWOT Analizi**: Güçlü/zayıf yönler, fırsat/tehditleri belirlerim
2. **Pazar Analizi**: Rekabet durumu ve pazar dinamiklerini incelerim
3. **Kaynak Optimizasyonu**: Mevcut kaynakların en verimli kullanımını planlarım
4. **KPI Tanımı**: Başarı ölçütlerini net şekilde belirlerim

**💼 Odak Alanlarım:**
• Revenue growth strategies
• Cost optimization
• Digital transformation
• Customer acquisition & retention
• Team productivity enhancement

Hangi iş alanında strateji geliştirmek istiyorsunuz?`;

        } else {
          // General response
          response += `Merhaba! Size yardımcı olmaya hazırım.

**🤖 Benim Avantajlarım:**
• Hızlı ve ücretsiz yanıt
• Multimodal yetenekler (metin, görsel, kod)
• Güncel bilgi tabanı (2024'e kadar)
• Türkçe dil desteği

**📝 Nasıl Yardımcı Olabilirim:**
1. Detaylı analiz ve araştırma
2. Yaratıcı içerik üretimi
3. Problem çözme ve strateji geliştirme
4. Kod yazma ve teknik destek
5. Eğitim ve öğretim materyalleri

İsteğinizi: "${userPrompt.substring(0, 150)}${userPrompt.length > 150 ? '...' : ''}"

Bu konuda size nasıl yardımcı olabilirim? Daha spesifik sorularınız varsa çekinmeyin!`;
        }

        return response;
      };

      const fallbackResponse = generateGeminiResponse(prompt);
      
      // Simulate realistic delay for Gemini
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      telemetry.record({
        model: model + ' (demo)',
        tokens_in: prompt.length / 4,
        tokens_out: fallbackResponse.length / 4,
        latency_ms: Date.now() - start
      });

      return res.json({ 
        response: fallbackResponse,
        model: model + ' (demo mode)',
        timestamp: new Date().toISOString(),
        cost: 0.0,
        note: 'API anahtarınızı doğrulayın veya geçerli bir anahtar girin'
      });
    }
    
  } catch (error: any) {
    return res.status(500).json({ 
      error: 'Gemini API call failed', 
      detail: error.message 
    });
  }
});


