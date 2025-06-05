import js from '@eslint/js';

module.exports = [
	js.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 'latest',
		},
		rules: {
      'no-var': 'error',
      'prefer-const': 'warn',
      semi: ['error', 'always'],
		},
	},
];
