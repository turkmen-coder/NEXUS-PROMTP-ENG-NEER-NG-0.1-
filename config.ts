export const config = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp',
  },
  limits: {
    maxOutputTokens: Number(process.env.MAX_OUTPUT_TOKENS || 800),
    timeoutMs: Number(process.env.TIMEOUT_MS || 12000),
  },
  routing: {
    abBucket: process.env.AB_BUCKET || 'control',
    smallModelThreshold: Number(process.env.SMALL_MODEL_THRESHOLD || 0.6),
  }
};
