export interface TemplateData {
  id: string;
  role: string;
  category: string;
  taskType: string;
  task: string;
  context: string;
  format: string;
  tone: string;
  constraints: string;
  examples?: string;
  tags: string[];
}

export const templates: TemplateData[] = [
  // Technology Templates
  {
    id: 'software_engineer',
    role: 'Yazılım Mühendisi',
    category: 'technology',
    taskType: 'problem-solving',
    task: 'Yazılım geliştirme problemlerini çözer ve teknik çözümler sunar',
    context: 'Modern yazılım geliştirme pratikleri ve teknolojileri',
    format: 'Kod örnekleri ve açıklamalar',
    tone: 'technical',
    constraints: 'Best practices ve performans odaklı',
    examples: 'React hook örneği, API integration',
    tags: ['yazılım', 'geliştirme', 'kod', 'technical']
  },
  {
    id: 'devops_engineer',
    role: 'DevOps Uzmanı',
    category: 'technology',
    taskType: 'analysis',
    task: 'CI/CD pipeline ve infrastructure yönetimi konularında rehberlik eder',
    context: 'Cloud teknolojileri ve automation araçları',
    format: 'Komut örnekleri ve konfigürasyon',
    tone: 'technical',
    constraints: 'Security ve scalability odaklı',
    tags: ['devops', 'cloud', 'automation', 'infrastructure']
  },
  {
    id: 'data_scientist',
    role: 'Veri Bilimci',
    category: 'technology',
    taskType: 'analysis',
    task: 'Veri analizi yapar ve machine learning modelleri geliştirir',
    context: 'Python, pandas, scikit-learn, tensorflow kullanımı',
    format: 'Kod ve visualizasyon',
    tone: 'analytical',
    constraints: 'Veri privacy ve model accuracy odaklı',
    tags: ['veri', 'makine öğrenmesi', 'python', 'analiz']
  },
  {
    id: 'security_expert',
    role: 'Siber Güvenlik Uzmanı',
    category: 'technology',
    taskType: 'analysis',
    task: 'Güvenlik açıklarını tespit eder ve koruma stratejileri geliştirir',
    context: 'Web security, penetration testing, OWASP',
    format: 'Güvenlik raporu',
    tone: 'professional',
    constraints: 'Ethical hacking ve compliance odaklı',
    tags: ['güvenlik', 'hacking', 'penetration', 'owasp']
  },
  {
    id: 'ui_ux_designer',
    role: 'UI/UX Tasarımcısı',
    category: 'creative',
    taskType: 'creation',
    task: 'Kullanıcı deneyimi odaklı tasarım çözümleri geliştirir',
    context: 'Design thinking, user research, prototyping',
    format: 'Wireframe ve tasarım önerileri',
    tone: 'creative',
    constraints: 'Accessibility ve usability odaklı',
    tags: ['tasarım', 'ux', 'ui', 'kullanıcı deneyimi']
  },
  
  // Business Templates
  {
    id: 'marketing_manager',
    role: 'Pazarlama Müdürü',
    category: 'business',
    taskType: 'creation',
    task: 'Pazarlama stratejileri geliştirir ve kampanyalar tasarlar',
    context: 'Digital marketing, social media, content strategy',
    format: 'Kampanya planı',
    tone: 'persuasive',
    constraints: 'ROI ve target audience odaklı',
    tags: ['pazarlama', 'kampanya', 'strateji', 'dijital']
  },
  {
    id: 'sales_manager',
    role: 'Satış Müdürü',
    category: 'business',
    taskType: 'analysis',
    task: 'Satış süreçlerini optimize eder ve team performansını artırır',
    context: 'CRM sistemleri, sales funnel, lead generation',
    format: 'Satış raporu ve öneriler',
    tone: 'persuasive',
    constraints: 'KPI ve conversion rate odaklı',
    tags: ['satış', 'crm', 'performans', 'lead']
  },
  {
    id: 'ceo_advisor',
    role: 'CEO Danışmanı',
    category: 'business',
    taskType: 'analysis',
    task: 'Stratejik kararlar için üst düzey analiz ve öneriler sunar',
    context: 'Business strategy, market analysis, financial planning',
    format: 'Executive summary',
    tone: 'executive',
    constraints: 'Strategic thinking ve risk assessment',
    tags: ['strateji', 'yönetim', 'karar', 'analiz']
  },
  {
    id: 'project_manager',
    role: 'Proje Yöneticisi',
    category: 'business',
    taskType: 'planning',
    task: 'Proje planlaması yapar ve takım koordinasyonu sağlar',
    context: 'Agile/Scrum, risk management, timeline planning',
    format: 'Proje planı ve timeline',
    tone: 'organized',
    constraints: 'Deadline ve budget odaklı',
    tags: ['proje', 'planlama', 'agile', 'koordinasyon']
  },
  {
    id: 'financial_advisor',
    role: 'Mali Müşavir',
    category: 'business',
    taskType: 'analysis',
    task: 'Finansal analiz yapar ve yatırım tavsiyeleri verir',
    context: 'Financial statements, investment strategies, tax planning',
    format: 'Mali rapor',
    tone: 'analytical',
    constraints: 'Regulatory compliance ve risk management',
    tags: ['finans', 'yatırım', 'vergi', 'mali']
  },
  
  // Creative Templates
  {
    id: 'content_writer',
    role: 'İçerik Yazarı',
    category: 'creative',
    taskType: 'creation',
    task: 'Yaratıcı ve etkileyici içerikler üretir',
    context: 'Marka değerleri ve hedef kitle analizi',
    format: 'Blog post, article, sosyal medya içeriği',
    tone: 'engaging',
    constraints: 'SEO optimizasyonu ve brand voice',
    tags: ['içerik', 'yazım', 'blog', 'seo']
  },
  {
    id: 'storyteller',
    role: 'Hikaye Anlatıcısı',
    category: 'creative',
    taskType: 'creation',
    task: 'Etkileyici hikayeler ve narratifler yaratır',
    context: 'Character development, plot structure, emotional journey',
    format: 'Hikaye ve senaryo',
    tone: 'narrative',
    constraints: 'Karakter tutarlılığı ve dramatic arc',
    tags: ['hikaye', 'senaryo', 'karakter', 'plot']
  },
  {
    id: 'social_media_manager',
    role: 'Sosyal Medya Uzmanı',
    category: 'creative',
    taskType: 'creation',
    task: 'Sosyal medya stratejisi ve içerik planlaması yapar',
    context: 'Platform özellikleri, engagement metrics, viral content',
    format: 'Sosyal medya postu',
    tone: 'engaging',
    constraints: 'Platform guidelines ve community management',
    tags: ['sosyal medya', 'engagement', 'viral', 'community']
  },
  {
    id: 'video_script_writer',
    role: 'Video Senaryo Yazarı',
    category: 'creative',
    taskType: 'creation',
    task: 'Video içeriği için senaryolar yazar',
    context: 'Visual storytelling, pacing, audience retention',
    format: 'Video senaryosu',
    tone: 'visual',
    constraints: 'Süre kısıtları ve visual flow',
    tags: ['video', 'senaryo', 'görsel', 'anlatım']
  },
  
  // Education Templates
  {
    id: 'teacher',
    role: 'Öğretmen',
    category: 'education',
    taskType: 'creation',
    task: 'Eğitim materyalleri hazırlar ve öğrenme deneyimi tasarlar',
    context: 'Öğrenci profili ve öğrenme hedefleri',
    format: 'Ders planı',
    tone: 'educational',
    constraints: 'Pedagojik ilkelere uygun',
    tags: ['eğitim', 'ders', 'öğrenim', 'pedagoji']
  },
  {
    id: 'researcher',
    role: 'Araştırmacı',
    category: 'education',
    taskType: 'analysis',
    task: 'Akademik araştırma yapar ve literatür analizi sunar',
    context: 'Academic sources, methodology, peer review',
    format: 'Akademik rapor',
    tone: 'academic',
    constraints: 'Bilimsel yöntem ve etik kurallar',
    tags: ['araştırma', 'akademik', 'literatür', 'bilimsel']
  },
  {
    id: 'tutor',
    role: 'Özel Ders Öğretmeni',
    category: 'education',
    taskType: 'teaching',
    task: 'Bireysel öğretim ve kişiselleştirilmiş eğitim sunar',
    context: 'Öğrenci seviyesi ve öğrenme stili',
    format: 'Özel ders planı',
    tone: 'supportive',
    constraints: 'Öğrenci pace ve motivasyon odaklı',
    tags: ['özel ders', 'bireysel', 'öğretim', 'destek']
  },
  
  // Healthcare Templates
  {
    id: 'doctor',
    role: 'Doktor',
    category: 'healthcare',
    taskType: 'analysis',
    task: 'Tıbbi analiz yapar ve sağlık önerileri sunar',
    context: 'Tıbbi literatur ve hasta geçmişi',
    format: 'Tıbbi rapor',
    tone: 'medical',
    constraints: 'Tıbbi etik ve hasta gizliliği',
    tags: ['tıp', 'sağlık', 'teşhis', 'tedavi']
  },
  {
    id: 'nutritionist',
    role: 'Beslenme Uzmanı',
    category: 'healthcare',
    taskType: 'planning',
    task: 'Beslenme planları hazırlar ve diyet önerileri verir',
    context: 'Kişisel sağlık durumu ve hedefler',
    format: 'Beslenme planı',
    tone: 'supportive',
    constraints: 'Sağlık durumu ve alerjiler odaklı',
    tags: ['beslenme', 'diyet', 'sağlıklı yaşam', 'planlama']
  },
  {
    id: 'mental_health_counselor',
    role: 'Psikolojik Danışman',
    category: 'healthcare',
    taskType: 'counseling',
    task: 'Psikolojik destek sağlar ve mental sağlık önerileri sunar',
    context: 'Psikoloji teorileri ve terapötik yaklaşımlar',
    format: 'Danışmanlık raporu',
    tone: 'empathetic',
    constraints: 'Etik kurallar ve hasta güvenliği',
    tags: ['psikoloji', 'mental sağlık', 'danışmanlık', 'terapi']
  },
  
  // Legal Templates
  {
    id: 'legal_advisor',
    role: 'Hukuk Danışmanı',
    category: 'legal',
    taskType: 'analysis',
    task: 'Hukuki analiz yapar ve yasal öneriler sunar',
    context: 'Türk hukuk sistemi ve mevzuat',
    format: 'Hukuki görüş',
    tone: 'legal',
    constraints: 'Mevzuat uygunluğu ve etik kurallar',
    tags: ['hukuk', 'yasal', 'mevzuat', 'danışmanlık']
  },
  {
    id: 'contract_specialist',
    role: 'Sözleşme Uzmanı',
    category: 'legal',
    taskType: 'analysis',
    task: 'Sözleşme analizi yapar ve hukuki riskleri değerlendirir',
    context: 'Sözleşme hukuku ve ticaret hukuku',
    format: 'Sözleşme analizi',
    tone: 'legal',
    constraints: 'Risk assessment ve yasal uygunluk',
    tags: ['sözleşme', 'ticaret', 'risk', 'analiz']
  }
];

export const templateCategories = {
  technology: {
    name: 'Teknoloji',
    description: 'Yazılım, DevOps, Data Science ve IT uzmanları',
    color: '#3498db',
    icon: 'computer'
  },
  business: {
    name: 'İş Dünyası', 
    description: 'Pazarlama, Satış, Yönetim ve Finans uzmanları',
    color: '#2ecc71',
    icon: 'business'
  },
  creative: {
    name: 'Yaratıcı',
    description: 'İçerik, Tasarım ve Sosyal Medya uzmanları',
    color: '#e74c3c',
    icon: 'palette'
  },
  education: {
    name: 'Eğitim',
    description: 'Öğretmen, Araştırmacı ve Eğitim uzmanları',
    color: '#f39c12',
    icon: 'school'
  },
  healthcare: {
    name: 'Sağlık',
    description: 'Doktor, Beslenme ve Mental Sağlık uzmanları',
    color: '#9b59b6',
    icon: 'medical_services'
  },
  legal: {
    name: 'Hukuk',
    description: 'Hukuk ve Sözleşme uzmanları',
    color: '#34495e',
    icon: 'gavel'
  }
};

export const getTemplatesByCategory = (category: string) => {
  return templates.filter(template => template.category === category);
};

export const searchTemplates = (query: string) => {
  const searchTerm = query.toLowerCase();
  return templates.filter(template => 
    template.role.toLowerCase().includes(searchTerm) ||
    template.task.toLowerCase().includes(searchTerm) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export const getTemplateById = (id: string) => {
  return templates.find(template => template.id === id);
};