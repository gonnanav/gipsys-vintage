import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginCypress from 'eslint-plugin-cypress/flat';
import storybook from 'eslint-plugin-storybook';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...storybook.configs['flat/recommended'],
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  pluginCypress.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['*', '!src', '!e2e', '!.storybook'],
  },
];

export default eslintConfig;
