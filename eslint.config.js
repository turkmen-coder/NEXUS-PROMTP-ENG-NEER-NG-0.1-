import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{ts,tsx,js}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsparser
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    },
    ignores: ['dist', 'node_modules']
  }
];