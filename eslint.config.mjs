import js from "@eslint/js";
import eslintConfigPrettierFlat from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { js },
        extends: ["js/recommended"]
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        languageOptions: { globals: globals.browser }
    },
    tseslint.configs.recommended,
    eslintConfigPrettierFlat,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": 1
        }
    }
]);
