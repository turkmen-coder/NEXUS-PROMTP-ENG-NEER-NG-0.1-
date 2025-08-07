export interface QualityMetrics {
  completeness: number;
  clarity: number;
  specificity: number;
  structure: number;
  overall: number;
  suggestions: string[];
}

export const assessPromptQuality = (prompt: {
  role?: string;
  task?: string;
  context?: string;
  format?: string;
  tone?: string;
  constraints?: string;
  examples?: string;
  customRole?: string;
  useCustomRole?: boolean;
  enabledTechniques?: any[];
}): QualityMetrics => {
  
  let completeness = 0;
  let clarity = 0;
  let specificity = 0;
  let structure = 0;
  const suggestions: string[] = [];

  // Completeness Assessment (40% of total score)
  const role = prompt.useCustomRole ? prompt.customRole : prompt.role;
  if (role && role.trim().length > 0) {
    completeness += 15;
  } else {
    suggestions.push('Rol tanımı eksik - AI\'nın hangi uzman perspektifinden yanıt vereceğini belirtin');
  }

  if (prompt.task && prompt.task.trim().length > 20) {
    completeness += 10;
  } else {
    suggestions.push('Görev açıklaması daha detaylı olmalı (minimum 20 karakter)');
  }

  if (prompt.context && prompt.context.trim().length > 10) {
    completeness += 8;
  } else {
    suggestions.push('Bağlam bilgisi ekleyin - AI\'nın neleri göz önünde bulundurması gerektiğini açıklayın');
  }

  if (prompt.format && prompt.format.trim().length > 0) {
    completeness += 4;
  } else {
    suggestions.push('Çıktı formatını belirtin (rapor, liste, paragraf vb.)');
  }

  if (prompt.tone && prompt.tone.trim().length > 0) {
    completeness += 3;
  } else {
    suggestions.push('Ton belirleyin (profesyonel, samimi, teknik vb.)');
  }

  // Clarity Assessment (25% of total score)
  const totalText = [role, prompt.task, prompt.context].filter(Boolean).join(' ');
  const words = totalText.split(/\s+/).filter(word => word.length > 0);
  
  if (words.length > 20) {
    clarity += 15;
  } else if (words.length > 10) {
    clarity += 10;
    suggestions.push('Prompt daha detaylı olabilir - en az 20 kelime kullanın');
  } else {
    clarity += 5;
    suggestions.push('Prompt çok kısa - daha fazla detay ekleyin');
  }

  // Check for clear, actionable language
  const actionWords = ['analiz et', 'yaz', 'oluştur', 'değerlendir', 'öner', 'açıkla', 'listele', 'karşılaştır', 'hesapla'];
  const hasActionWords = actionWords.some(word => totalText.toLowerCase().includes(word));
  if (hasActionWords) {
    clarity += 10;
  } else {
    suggestions.push('Eylem odaklı kelimeler kullanın (analiz et, yaz, oluştur vb.)');
  }

  // Specificity Assessment (20% of total score)
  if (prompt.constraints && prompt.constraints.trim().length > 10) {
    specificity += 10;
  } else {
    suggestions.push('Kısıtlamalar belirtin - neyin yapılmaması veya hangi sınırlar içinde kalınması gerektiğini açıklayın');
  }

  if (prompt.examples && prompt.examples.trim().length > 10) {
    specificity += 5;
  } else {
    suggestions.push('Örnek verin - beklediğiniz çıktı türüne dair örnekler ekleyin');
  }

  // Check for specific requirements
  const specificWords = ['sayısı', 'uzunluğu', 'türü', 'formatı', 'stili', 'süresi', 'hedef'];
  const hasSpecificWords = specificWords.some(word => totalText.toLowerCase().includes(word));
  if (hasSpecificWords) {
    specificity += 5;
  } else {
    suggestions.push('Spesifik gereksinimler ekleyin (uzunluk, sayı, format detayları)');
  }

  // Structure Assessment (15% of total score)
  let structurePoints = 0;
  if (role) structurePoints += 3;
  if (prompt.task) structurePoints += 3;
  if (prompt.context) structurePoints += 2;
  if (prompt.format) structurePoints += 2;
  if (prompt.tone) structurePoints += 2;
  if (prompt.constraints) structurePoints += 2;
  if (prompt.examples) structurePoints += 1;
  
  structure = Math.min(structurePoints, 15);

  // AI Techniques Bonus
  const techniqueBonus = (prompt.enabledTechniques?.length || 0) * 2;
  const bonusPoints = Math.min(techniqueBonus, 10);

  // Calculate final scores
  const totalScore = completeness + clarity + specificity + structure + bonusPoints;
  const overall = Math.min(totalScore, 100);

  // Normalize individual scores to 100-point scale
  const normalizedCompleteness = Math.min((completeness / 40) * 100, 100);
  const normalizedClarity = Math.min((clarity / 25) * 100, 100);
  const normalizedSpecificity = Math.min((specificity / 20) * 100, 100);
  const normalizedStructure = Math.min((structure / 15) * 100, 100);

  // Add overall quality suggestions
  if (overall >= 90) {
    suggestions.unshift('🎉 Mükemmel prompt! Bu kalitede yanıtlar alacaksınız.');
  } else if (overall >= 75) {
    suggestions.unshift('✅ İyi bir prompt. Küçük iyileştirmelerle daha da iyi olabilir.');
  } else if (overall >= 60) {
    suggestions.unshift('⚠️ Orta kalite. Aşağıdaki önerileri uygulayarak geliştirebilirsiniz.');
  } else if (overall >= 40) {
    suggestions.unshift('🔧 Prompt geliştirilmeli. Daha detaylı bilgi ekleyin.');
  } else {
    suggestions.unshift('❌ Prompt yetersiz. Lütfen eksik kısımları tamamlayın.');
  }

  return {
    completeness: Math.round(normalizedCompleteness),
    clarity: Math.round(normalizedClarity),
    specificity: Math.round(normalizedSpecificity),
    structure: Math.round(normalizedStructure),
    overall: Math.round(overall),
    suggestions: suggestions.slice(0, 5) // En önemli 5 öneri
  };
};

export const getQualityColor = (score: number): string => {
  if (score >= 80) return '#28a745'; // Green
  if (score >= 60) return '#ffc107'; // Yellow
  if (score >= 40) return '#fd7e14'; // Orange
  return '#dc3545'; // Red
};

export const getQualityIcon = (score: number): string => {
  if (score >= 90) return '🎯';
  if (score >= 80) return '✅';
  if (score >= 60) return '⚠️';
  if (score >= 40) return '🔧';
  return '❌';
};

export const calculateTokenCount = (text: string, language: 'tr' | 'en' = 'tr'): number => {
  if (!text) return 0;
  
  // Rough token estimation
  // Turkish: ~0.75 tokens per word on average
  // English: ~0.75 tokens per word on average
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const multiplier = language === 'tr' ? 0.8 : 0.75;
  
  return Math.ceil(words.length * multiplier);
};

export const estimateCost = (
  inputTokens: number,
  outputTokens: number,
  model: string
): { input: number; output: number; total: number } => {
  
  // Cost per 1K tokens (in USD)
  const modelCosts: { [key: string]: { input: number; output: number } } = {
    'claude-3-5-sonnet': { input: 0.003, output: 0.015 },
    'gpt-4': { input: 0.03, output: 0.06 },
    'claude-3-haiku': { input: 0.00025, output: 0.00125 },
    'gpt-3.5-turbo': { input: 0.001, output: 0.002 },
  };

  const costs = modelCosts[model] || { input: 0.001, output: 0.002 };
  
  const inputCost = (inputTokens / 1000) * costs.input;
  const outputCost = (outputTokens / 1000) * costs.output;
  const total = inputCost + outputCost;

  return {
    input: Number(inputCost.toFixed(6)),
    output: Number(outputCost.toFixed(6)),
    total: Number(total.toFixed(6))
  };
};