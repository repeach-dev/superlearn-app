import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import stylistic from "@stylistic/eslint-plugin";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["node_modules/", ".expo/", "babel.config.js", "electron/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tailwindcss.configs["flat/recommended"],
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@stylistic": stylistic,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // TypeScript
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-require-imports": "off",

      // Formatting (replaces Prettier)
      "@stylistic/semi": ["warn", "always"],
      "@stylistic/quotes": ["warn", "double"],
      "@stylistic/indent": ["warn", 2],
      "@stylistic/comma-dangle": ["warn", "always-multiline"],
      "@stylistic/arrow-parens": ["warn", "as-needed"],
      "@stylistic/brace-style": ["warn", "1tbs"],
      "@stylistic/object-curly-spacing": ["warn", "always"],
      "@stylistic/jsx-quotes": ["warn", "prefer-double"],
      "@stylistic/max-len": ["warn", {
        code: 100,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      }],

      // Tailwind
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-contradicting-classname": "error",
      "tailwindcss/no-unnecessary-arbitrary-value": "warn",
      "tailwindcss/enforces-shorthand": "warn",
    },
  }
);
