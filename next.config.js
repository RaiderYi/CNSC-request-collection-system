/** @type {import('next').NextConfig} */
const nextConfig = {
  // 服务器端渲染模式（支持 API）
  output: 'standalone',
  
  // 图片配置
  images: {
    unoptimized: true,
  },
  
  // 实验性功能
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};

module.exports = nextConfig;
