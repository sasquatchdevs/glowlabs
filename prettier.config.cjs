/** @type {import("prettier").Config} */
module.exports = {
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
	printWidth: 100,
	semi: false,
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	tabWidth: 4,
}
