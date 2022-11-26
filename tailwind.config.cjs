/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					headings: '#405861',
					textPrimary: '#85a3b3',
					textSecondary: '#879296',
				},
			},
		},
	},
	plugins: [],
}
