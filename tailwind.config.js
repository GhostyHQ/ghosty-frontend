/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'primary-black': '#262626',
				'primary-dark-grey': '#3F4246',
				'primary-light-grey': '#A7A7A7',
				'primary-blue': '#5F8AFA',
				'primary-red': '#DB5555',
				'primary-yellow': '#FFC860',
				'primary-green': '#AAD055',
			},
		},
	},
	plugins: [],
}
