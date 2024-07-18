import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	eslintPluginUnicorn.configs['flat/all'],
	includeIgnoreFile(gitignorePath),
	{
		plugins: { 'simple-import-sort': simpleImportSort },
		rules: {
			'simple-import-sort/exports': 'error',
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// node imports
						['^node:'],
						// packages
						[String.raw`^@?\w`],
						// relative paths
						[String.raw`^\.`],
						// absolute imports
						['^@/'],
						// package type imports
						[String.raw`^(?!@/).+\u0000$`],
						// absolute type imports
						[String.raw`^@/.+\u0000$`],
					],
				},
			],
		},
	},
	{
		rules: {
			'@typescript-eslint/consistent-type-imports': 'error',
			'unicorn/no-array-for-each': 'off',
			'unicorn/no-null': 'off',
			'unicorn/prevent-abbreviations': 'off',
		},
	},
	prettierRecommended,
);
