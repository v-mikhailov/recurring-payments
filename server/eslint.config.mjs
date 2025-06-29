import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Примеры базовых правил:
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
    ],
  },
];