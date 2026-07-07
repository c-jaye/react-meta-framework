import globals from "globals"
import { importX } from "eslint-plugin-import-x"
import reactHooks from "eslint-plugin-react-hooks"
import storybook from "eslint-plugin-storybook"
import stylistic from "@stylistic/eslint-plugin"
import tseslint from "typescript-eslint"

export default tseslint.config({
    ignores: [
        "node_modules",
        "static",
        ".vscode",
        "dist",
        "storybook-static",
    ],
}, {
    linterOptions: {
        noInlineConfig: false,
        reportUnusedInlineConfigs: "error",
        reportUnusedDisableDirectives: true,
    },
}, {
    files: ["**/*.{ts,cts,mts,tsx}"],
    extends: [
        tseslint.configs.recommendedTypeChecked,
        tseslint.configs.stylisticTypeChecked,
        importX.flatConfigs.recommended,
        importX.flatConfigs.typescript,
    ],
    languageOptions: {
        parserOptions: {
            project: ["./tsconfig.json"],
            tsconfigRootDir: __dirname,
        },
    },
    rules: {
        "@typescript-eslint/consistent-type-imports": ["error"],
        "@typescript-eslint/no-empty-object-type": ["error", {
            allowObjectTypes: "always",
        }],
        "@typescript-eslint/prefer-nullish-coalescing": ["error", {
            ignoreBooleanCoercion: true,
        }],
        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        }],
        "import-x/default": ["off"],
        "import-x/no-dynamic-require": ["error"],
        "import-x/no-nodejs-modules": ["warn"],
        "import-x/no-named-as-default-member": ["off"],
    },
}, {
    files: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"],
    extends: [
        stylistic.configs.recommended,
        stylistic.configs["disable-legacy"],
        reactHooks.configs.flat["recommended-latest"],
    ],
    languageOptions: {
        ecmaVersion: 2022,
        globals: globals.browser,
    },
    rules: {
        "@stylistic/linebreak-style": ["error", "unix"],
        "@stylistic/semi": ["error", "never"],
        "@stylistic/quotes": ["error", "double"],
        "@stylistic/indent": ["error", 4],
        "@stylistic/jsx-indent-props": ["error", 4],
        "@stylistic/comma-dangle": ["error", "always-multiline"],
        "@stylistic/no-confusing-void-expression": ["off"],
        "react-hooks/set-state-in-effect": ["warn"],
        "sort-imports": ["error", {
            ignoreCase: false,
            ignoreDeclarationSort: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ["none", "multiple", "all", "single"],
            allowSeparatedGroups: true,
        }],
    },
}, {
    files: ["**/*.{js,cjs,mjs,jsx}"],
    rules: {
        "@stylistic/semi": ["error", "always"],
    },
}, {
    files: ["**/*.stories.{ts,cts,mts,tsx}"],
    extends: [
        storybook.configs["flat/recommended"],
    ],
})
