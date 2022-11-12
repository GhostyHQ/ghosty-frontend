const { extendTheme } = require('@chakra-ui/react')

const fonts = {
	heading: `'Manrope', sans-serif`,
	body: `'Manrope', sans-serif`,
}

const colors = {
	primary: {
		black: '#262626',
		dark_grey: '#3F4246',
		light_grey: '#A7A7A7',
		light_grey_2: '#EDEDED',
		blue: '#5F8AFA',
		red: '#DB5555',
		yellow: '#FFC860',
		green: '#AAD055',
	},
}

const theme = extendTheme({ colors, fonts })

export default theme
