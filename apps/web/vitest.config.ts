import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../../apps/web/src"),
      "@ui": path.resolve(__dirname, "../../packages/ui/src"),
      // The published package declares `main: lib/index.cjs.js`, which is not
      // in the tarball, so bare-specifier resolution fails during transform.
      "ai-response-parser": path.resolve(
        __dirname,
        "../../apps/web/src/__mocks__/ai-response-parser.tsx",
      ),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/__tests__/setupTests.tsx"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
  },
});
