import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "import/order": "off",
      "import/no-duplicates": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
    },
  },
  // The Stryker sandbox is a full copy of the project, out/ included: linting it
  // makes eslint exceed V8's maximum string length.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    ".stryker-tmp/**",
    "reports/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
