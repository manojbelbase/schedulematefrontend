import eslint from "@eslint/js";
import eslintPluginNext from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import onlyWarn from "eslint-plugin-only-warn";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import turboPlugin from "eslint-plugin-turbo";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default [
  {
    ignores: ["packages/services/**", "apps/*/.next/**", ".ignore/**"],
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      react: eslintPluginReact,
      "jsx-a11y": eslintPluginJsxA11y,
      onlyWarn,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: [
            "apps/*/tsconfig.json",
            "packages/*/tsconfig.json",
            "tsconfig.json",
          ],
        },
      },
    },
  },
  {
    plugins: {
      "@next/next": eslintPluginNext,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    ...eslintPluginReact.configs.flat.recommended,
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ...eslintPluginReact.configs.flat.recommended.languageOptions,
      parser: tsEslint.parser,
      parserOptions: {
        project: [
          "apps/*/tsconfig.json",
          "packages/*/tsconfig.json",
          "tsconfig.json",
        ],
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      // General JavaScript rules
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-duplicate-imports": "error",
      "no-unused-expressions": "error",
      "no-unreachable": "error",

      // TypeScript specific rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-floating-promises": "warn",
      // This rule is useful for ensuring that promises are handled correctly
      // Once solved over the codebase convert to "error"
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],

      // React specific rules
      "react/prop-types": "off",
      "react/jsx-key": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Next.js specific rules
      "@next/next/no-img-element": "error",

      // Accessibility rules
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
    },
  },

  // Web Specifics
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["~/*", "#/*", "^/*"],
              message: "Only @/* imports are allowed in the web app.",
            },
          ],
        },
      ],
    },
  },
  // Website Specifics
  {
    files: ["apps/website/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/*", "#/*", "^/*"],
              message: "Only ~/* imports are allowed in the website app.",
            },
          ],
        },
      ],
    },
  },
  // Backoffice Specifics
  {
    files: ["apps/backoffice/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["~/*", "#/*"],
              message: "Only @/* imports are allowed in the backoffice app.",
            },
          ],
        },
      ],
    },
  },

  // This should be the last config to ensure it overrides any previous rules
  eslintConfigPrettier,
];
