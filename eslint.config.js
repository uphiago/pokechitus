import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const base = {
  files: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: { ecmaVersion: 2022, sourceType: 'module', ecmaFeatures: { jsx: true } }
  },
  plugins: { '@typescript-eslint': tseslint },
  ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**']
};

export default [
  base,
  {
    files: ['src/api/**/*.{ts,tsx}', 'src/domain/**/*.{ts,tsx}', 'src/state/**/*.{ts,tsx}', 'src/adapters/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: ['../ui/*', './ui/*'] }]
    }
  },
  {
    files: ['src/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: ['../api/*', './api/*'] }]
    }
  }
];
