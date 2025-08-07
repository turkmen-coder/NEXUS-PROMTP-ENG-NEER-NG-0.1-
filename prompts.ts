export const systemPrompt = (
  'You are a concise assistant. Output must be valid JSON per schema.'
);

export const buildUserPrompt = (task: string, context?: string) => {
  const ctx = context ? `\nContext: ${context}` : '';
  return `Task: ${task}${ctx}\nReturn JSON: {"result": string, "confidence": number}`;
};
