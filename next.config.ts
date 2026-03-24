import type { NextConfig } from "next";

/**
 * Next.js 配置文件
 */

const nextConfig: NextConfig = {
  // Docker 部署需要 standalone 输出
  output: 'standalone',
  
  // 图片配置
  images: {
    unoptimized: true,
  },
  
  // 实验性功能
  experimental: {
    // 启用服务器组件
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};

export default nextConfig;
