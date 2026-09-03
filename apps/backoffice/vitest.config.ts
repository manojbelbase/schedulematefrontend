import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "../../apps/backoffice/src"),
      "@ui": resolve(__dirname, "../../packages/ui/src"),
    },
  },
  test: {
    globals: true,
    include: ["src/**/*.test.ts"],
    css: false,
  },
});
