import { defineConfig } from "@openapi-codegen/cli";
import {
  generateReactQueryComponents,
  generateSchemaTypes,
} from "@openapi-codegen/typescript";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  web: {
    from: {
      source: "url",
      url: `${process.env.NEXT_PUBLIC_WEB_API_BASE_URL}/docs-json`,
      method: "get",
      headers: {
        Authorization: `Basic ${process.env.DOCS_AUTH_TOKEN}`,
      },
    },
    outputDir: "packages/services/src/web",
    to: async (context) => {
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenameCase: "kebab",
        filenamePrefix: "types.",
      });

      await generateReactQueryComponents(context, {
        filenameCase: "kebab",
        filenamePrefix: "queries.",
        useEnums: true,
        schemasFiles,
      });
    },
  },
  backoffice: {
    from: {
      source: "url",
      url: `${process.env.NEXT_PUBLIC_BACKOFFICE_API_BASE_URL}/docs-json`,
      method: "get",
      headers: {
        Authorization: `Basic ${process.env.DOCS_AUTH_TOKEN}`,
      },
    },
    outputDir: "packages/services/src/backoffice",
    to: async (context) => {
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenameCase: "kebab",
        filenamePrefix: "types.",
      });

      await generateReactQueryComponents(context, {
        filenameCase: "kebab",
        filenamePrefix: "queries.",
        useEnums: true,
        schemasFiles,
      });
    },
  },
  website: {
    from: {
      source: "url",
      url: `${process.env.NEXT_PUBLIC_WEBSITE_API_BASE_URL}/docs-json`,
      method: "get",
      headers: {
        Authorization: `Basic ${process.env.DOCS_AUTH_TOKEN}`,
      },
    },
    outputDir: "packages/services/src/website",
    to: async (context) => {
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenameCase: "kebab",
        filenamePrefix: "types.",
      });

      await generateReactQueryComponents(context, {
        filenameCase: "kebab",
        filenamePrefix: "queries.",
        useEnums: true,
        schemasFiles,
      });
    },
  },
});