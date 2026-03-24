import type { NextConfig } from "next";

/**
 * CloudBase 静态导出配置
 */

const nextConfig: NextConfig = {
  // 静态导出模式
  output: 'export',
  
  // 输出目录
  distDir: 'dist',
  
  // 图片配置（静态导出需要禁用优化）
  images: {
    unoptimized: true,
  },
  
  // 跳过类型检查（加速构建）
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 跳过 ESLint（加速构建）
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
