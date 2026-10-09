import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";

/**
 * Minimal flat config.
 *
 * The two rules that matter most here:
 *   no-undef        — catches identifiers used before they're in scope. This is
 *                     the exact rule that would have caught the `loop`
 *                     ReferenceError that blanked the deployed site.
 *   react/jsx-no-undef — catches undeclared JSX components.
 */
export default [
  {
    ignores: ["dist/**", ".smoke-out/**", "node_modules/**", "public/**"],
  },
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}", "scripts/**/*.{js,jsx,mjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react },
    settings: { react: { version: "detect" } },
    rules: {
      "no-undef": "error",
      "react/jsx-no-undef": "error",
      // Marks variables that are only referenced from JSX as "used".
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-console": "off",
      eqeqeq: ["warn", "smart"],
    },
  },
  {
    files: ["vite.config.js", "eslint.config.js", "scripts/**/*.mjs"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];