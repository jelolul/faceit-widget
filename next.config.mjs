/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    },
    redirects: async () => [
        {
            source: '/:path*',
            has: [{ type: 'host', value: 'www.faceit-widget.vercel.app' }],
            destination: 'https://faceit-widget.vercel.app/:path*',
            permanent: true
        }
    ]
};
export default nextConfig