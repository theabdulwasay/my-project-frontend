/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  
  // Allow static exports if needed
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: [
      'localhost',
      'your-api-domain.com',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Headers for security and CORS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Rewrites for API calls
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
