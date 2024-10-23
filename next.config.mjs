/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com"
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com"
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true, // Disables ESLint during production builds
    }
};

export default nextConfig;
