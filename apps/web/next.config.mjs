const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@repo/auth', '@repo/db', '@repo/ui'],
	logging: {
		fetches: {
			fullUrl: !isProduction,
		},
	},
};

export default nextConfig;
