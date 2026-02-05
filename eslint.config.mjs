import { defineConfig } from "eslint/config";
import nextConfig from "eslint-config-next";

export default defineConfig([
  ...nextConfig,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "dist/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Disable warnings/stylistic rules
      "@next/next/no-img-element": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "off",
      "react-hooks/preserve-manual-memoization": "off",
      
      // Convert strict errors to warnings for common patterns
      "react-hooks/set-state-in-effect": "warn", // Allow setState in effects for initialization
      "react-hooks/immutability": "warn", // Allow window assignments in event handlers
      "react-hooks/refs": "warn", // Allow ref access in hooks (common pattern)
      
      // TypeScript: Convert implicit any parameter errors to warnings
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      
      // Keep critical errors
      "react-hooks/rules-of-hooks": "error", // Keep this as error
    },
  },
]);
