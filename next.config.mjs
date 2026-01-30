/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  experimental: {
    optimizePackageImports: ['@demox-labs/aleo-wallet-adapter-reactui'],
  },
};

export default nextConfig;
