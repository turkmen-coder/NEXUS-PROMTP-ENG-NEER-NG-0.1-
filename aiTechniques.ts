export interface AITechnique {
  id: string;
  name: string;
  category: string;
  description: string;
  example?: string;
  prompt_addition: string;
  enabled: boolean;
}

export const aiTechniques: AITechnique[] = [
  // Reasoning Techniques
  {
    id: 'chain_of_thought',
    name: 'Chain-of-Thought (CoT)',
    category: 'reasoning',
    description: 'Adım adım düşünce süreci ile daha doğru sonuçlar elde eder',
    example: 'Problem: 2+3*4. Adım 1: Önce çarpma (3*4=12). Adım 2: Sonra toplama (2+12=14)',
    prompt_addition: 'Lütfen adım adım düşünerek ve her adımı açıklayarak yanıtla.',
    enabled: false
  },
  {
    id: 'tree_of_thoughts',
    name: 'Tree of Thoughts (ToT)',
    category: 'reasoning',
    description: 'Birden fazla düşünce yolunu keşfeder ve en iyisini seçer',
    example: 'Farklı çözüm yollarını değerlendirip optimal olanı seçme',
    prompt_addition: 'Birden fazla yaklaşım düşün, her birini değerlendir ve en uygununu seç.',
    enabled: false
  },
  {
    id: 'self_consistency',
    name: 'Self-Consistency',
    category: 'reasoning',
    description: 'Aynı problemi farklı yollarla çözerek tutarlılığı kontrol eder',
    prompt_addition: 'Bu problemi farklı yöntemlerle çöz ve sonuçların tutarlılığını kontrol et.',
    enabled: false
  },
  {
    id: 'least_to_most',
    name: 'Least-to-Most Prompting',
    category: 'reasoning',
    description: 'Karmaşık problemleri küçük parçalara bölerek çözer',
    prompt_addition: 'Bu karmaşık problemi daha küçük, yönetilebilir parçalara böl ve sırayla çöz.',
    enabled: false
  },

  // Learning Techniques
  {
    id: 'few_shot',
    name: 'Few-Shot Learning',
    category: 'learning',
    description: 'Birkaç örnek vererek AI\'ya pattern öğretir',
    example: 'Örnek 1: Input -> Output, Örnek 2: Input -> Output, Şimdi: Input -> ?',
    prompt_addition: 'Verilen örneklere benzer format ve style kullanarak yanıtla.',
    enabled: false
  },
  {
    id: 'zero_shot_cot',
    name: 'Zero-Shot CoT',
    category: 'learning',
    description: 'Örnek vermeden sadece "adım adım düşün" komutuyla rehberlik eder',
    prompt_addition: 'Adım adım düşünelim ve her adımı detaylandıralım.',
    enabled: false
  },
  {
    id: 'self_ask',
    name: 'Self-Ask Methodology',
    category: 'learning',
    description: 'AI\'nın kendine sorular sorması ve yanıtlamasını sağlar',
    prompt_addition: 'Kendine ilgili sorular sor ve bunları yanıtlayarak ilerle.',
    enabled: false
  },

  // Meta-Cognitive Techniques
  {
    id: 'self_reflection',
    name: 'Self-Reflection',
    category: 'meta-cognitive',
    description: 'AI\'nın kendi yanıtlarını değerlendirmesini sağlar',
    prompt_addition: 'Yanıtını verdikten sonra, bu yanıtın doğruluğunu ve kalitesini değerlendir.',
    enabled: false
  },
  {
    id: 'meta_prompting',
    name: 'Meta-Prompting',
    category: 'meta-cognitive',
    description: 'Prompt\'un kendisini optimize etmek için meta-seviyede düşünme',
    prompt_addition: 'Bu görevi en iyi nasıl yaklaşacağını düşün ve stratejini açıkla.',
    enabled: false
  },
  {
    id: 'perspective_taking',
    name: 'Perspective Taking',
    category: 'meta-cognitive',
    description: 'Farklı perspektiflerden konuya bakmayı sağlar',
    prompt_addition: 'Bu konuya farklı perspektiflerden (kullanıcı, uzman, eleştirmen) bak.',
    enabled: false
  },

  // Verification & Safety
  {
    id: 'constitutional_ai',
    name: 'Constitutional AI',
    category: 'verification',
    description: 'Etik kurallar ve ilkeler çerçevesinde yanıt üretir',
    prompt_addition: 'Etik, güvenli ve zararsız bir yaklaşım benimse. Potansiyel zararları göz önünde bulundur.',
    enabled: false
  },
  {
    id: 'verification_protocol',
    name: 'Verification Protocol',
    category: 'verification',
    description: 'Yanıtların doğruluğunu sistematik olarak kontrol eder',
    prompt_addition: 'Yanıtını verirken kaynaklarını belirt ve iddialarının doğruluğunu kontrol et.',
    enabled: false
  },
  {
    id: 'error_correction',
    name: 'Error Correction',
    category: 'verification',
    description: 'Potansiyel hataları tespit eder ve düzeltir',
    prompt_addition: 'Yanıtında olası hataları kontrol et ve düzeltmeler öner.',
    enabled: false
  },

  // Advanced Controls
  {
    id: 'system_message',
    name: 'System Message Integration',
    category: 'control',
    description: 'Sistem mesajı ile AI\'nın davranışını detaylı şekillendirir',
    prompt_addition: 'Bu talimatları sistem seviyesinde uygula ve role tam uyum sağla.',
    enabled: false
  },
  {
    id: 'iterative_refinement',
    name: 'Iterative Refinement',
    category: 'control',
    description: 'Yanıtı kademeli olarak iyileştirme süreci',
    prompt_addition: 'İlk yanıtını ver, sonra onu gözden geçir ve iyileştir.',
    enabled: false
  },

  // Experimental Techniques
  {
    id: 'react',
    name: 'ReAct (Reasoning + Acting)',
    category: 'experimental',
    description: 'Mantıklı düşünme ve eylem almanı kombine eder',
    prompt_addition: 'Düşünce: [analiz yap] Eylem: [somut adım at] Gözlem: [sonucu değerlendir]',
    enabled: false
  },
  {
    id: 'program_aided',
    name: 'Program-Aided Prompting',
    category: 'experimental',
    description: 'Kod yazarak problemleri çözmeyi tercih eder',
    prompt_addition: 'Gerekirse kod yazarak veya programatik yaklaşım kullanarak çöz.',
    enabled: false
  },
  {
    id: 'multimodal',
    name: 'Multimodal Prompting',
    category: 'experimental',
    description: 'Metin, resim ve diğer modaliteleri birleştirir',
    prompt_addition: 'Metinsel açıklamaların yanı sıra görsel veya diğer format önerilerini de dahil et.',
    enabled: false
  }
];

export const techniqueCategories = {
  reasoning: {
    name: 'Mantıklı Düşünme',
    description: 'Adım adım analiz ve problem çözme teknikleri',
    color: '#3498db',
    icon: 'psychology'
  },
  learning: {
    name: 'Öğrenme',
    description: 'Örnek tabanlı ve adaptif öğrenme yöntemleri',
    color: '#2ecc71',
    icon: 'school'
  },
  'meta-cognitive': {
    name: 'Meta-Bilişsel',
    description: 'Kendi düşünme süreçlerini değerlendirme',
    color: '#9b59b6',
    icon: 'self_improvement'
  },
  verification: {
    name: 'Doğrulama ve Güvenlik',
    description: 'Yanıt kalitesi ve güvenlik kontrolleri',
    color: '#e74c3c',
    icon: 'verified'
  },
  control: {
    name: 'Gelişmiş Kontrol',
    description: 'AI davranışını hassas şekillendirme',
    color: '#f39c12',
    icon: 'tune'
  },
  experimental: {
    name: 'Deneysel',
    description: 'Yeni nesil AI prompting teknikleri',
    color: '#34495e',
    icon: 'science'
  }
};

export const getTechniquesByCategory = (category: string) => {
  return aiTechniques.filter(technique => technique.category === category);
};

export const getEnabledTechniques = () => {
  return aiTechniques.filter(technique => technique.enabled);
};

export const buildTechniquePrompt = (basPrompt: string, enabledTechniques: AITechnique[]) => {
  if (enabledTechniques.length === 0) return basPrompt;
  
  const techniqueAdditions = enabledTechniques.map(t => t.prompt_addition).join(' ');
  return `${basPrompt}\n\nÖzel Talimatlar: ${techniqueAdditions}`;
};