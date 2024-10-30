/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL+'/api/:path*',
      },
    ];
  },
  compiler: {
    styledComponents: true
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_HOSTNAME],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_HOSTNAME,
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  }
};


module.exports = nextConfig;