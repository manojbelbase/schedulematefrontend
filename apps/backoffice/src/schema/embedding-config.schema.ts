import { z } from "zod";

export const EmbeddingConfigFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  activeProvider: z.string().min(1, "Select a provider"),
  apiKey: z
    .string()
    .min(1, "API key is required")
    .max(500, "API key is too long"),
  model: z.string().min(1, "Select a model"),
});

export type TEmbeddingConfigFormSchema = z.infer<
  typeof EmbeddingConfigFormSchema
>;
