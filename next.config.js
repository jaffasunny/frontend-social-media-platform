/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	env: {
		NEXT_PUBLIC_apiKey: process.env.NEXT_PUBLIC_apiKey,
		NEXT_PUBLIC_authDomain: process.env.NEXT_PUBLIC_authDomain,
		NEXT_PUBLIC_projectId: process.env.NEXT_PUBLIC_projectId,
		NEXT_PUBLIC_storageBucket: process.env.NEXT_PUBLIC_storageBucket,
		NEXT_PUBLIC_messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
		NEXT_PUBLIC_appId: process.env.NEXT_PUBLIC_appId,
		NEXT_PUBLIC_measurementId: process.env.NEXT_PUBLIC_measurementId,
	},
};

module.exports = nextConfig;
