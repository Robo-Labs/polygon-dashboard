/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		// fontFamily: {
		// 	'header': ['Roboto', 'sans-serif'],
		// }
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: ['luxury']
	}
}

