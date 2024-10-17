/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/socket',
        destination: '/api/socket/route.ts',
      },
    ];
  },
};

export default nextConfig;
