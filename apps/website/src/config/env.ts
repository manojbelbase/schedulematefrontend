import { z } from "zod";

const optionalString = () =>
  z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().optional(),
  );

const optionalUrl = (message: string) =>
  z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z.url({ message }).optional(),
  );

const EnvSchema = z.object({
  NEXT_PUBLIC_WEBSITE_API_BASE_URL: optionalUrl(
    "API URL is not in 'url' pattern.",
  ),
  DOCS_AUTH_TOKEN: optionalString(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

export type TEnvSchema = z.infer<typeof EnvSchema>;

export function validateEnv(): TEnvSchema {
  const parsedEnv = EnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_WEBSITE_API_BASE_URL:
      process.env.NEXT_PUBLIC_WEBSITE_API_BASE_URL,
    DOCS_AUTH_TOKEN: process.env.DOCS_AUTH_TOKEN,
  });
  if (!parsedEnv.success) {
    console.error("Invalid environment variables:");
    console.error(JSON.stringify(parsedEnv.error.flatten(), null, 2));
    process.exit(1);
  }

  return parsedEnv.data;
}
const parsedEnv = validateEnv();
export const env: TEnvSchema = parsedEnv;
