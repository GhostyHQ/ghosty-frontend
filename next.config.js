/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		APP_ENV: process.env.APP_ENV,
		BASE_URL: process.env.BASE_URL,
		API_URL: process.env.API_URL,
		CONTRACT_NAME: process.env.CONTRACT_NAME,
	},
}

module.exports = nextConfig
