/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  env: delete {
    ...process.env,
  }["NODE_VERSION"],
};
module.exports = nextConfig;
