/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier',
	],
	plugins: ['import', 'unused-imports'],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'no-console': 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'prefer-const': 'error',
		'no-var': 'error',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',

		// Disable some opinionated rules from @vue/prettier/@typescript-eslint ruleset
		'@typescript-eslint/ban-types': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-var-requires': 'off',

		// unused-imports plugin config:
		// https://www.npmjs.com/package/eslint-plugin-unused-imports
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'error',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],

		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				'newlines-between': 'never',
				alphabetize: { order: 'asc', caseInsensitive: true },
				pathGroups: [
					{
						pattern: '@ubi/**',
						group: 'external',
						position: 'after',
					},
					{
						pattern: '@/**',
						group: 'internal',
					},
				],
				pathGroupsExcludedImportTypes: ['builtin'],
			},
		],

		'vue/valid-v-slot': [
			'error',
			{
				allowModifiers: true,
			},
		],
		'vue/multi-word-component-names': 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
				tabWidth: 2,
				useTabs: true,
			},
		],
	},
}
