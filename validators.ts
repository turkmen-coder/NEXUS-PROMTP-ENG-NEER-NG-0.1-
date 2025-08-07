import { z } from 'zod';

export const PromptInput = z.object({
  task: z.string().min(1),
  context: z.string().optional(),
  creativity: z.number().min(0).max(1).default(0.2),
  topP: z.number().min(0).max(1).default(0.8)
});

export type PromptInput = z.infer<typeof PromptInput>;

export const JsonOutput = z.object({
  result: z.string(),
  confidence: z.number().min(0).max(1)
});
