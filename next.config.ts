import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  transpilePackages: ['lucide-react'],
};

export default nextConfig;
