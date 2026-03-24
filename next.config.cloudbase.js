/** @type {import('next').NextConfig} */
const nextConfig = {
  // 纯静态导出
  output: 'export',
  distDir: 'dist',
  
  // 部署在子路径下，需要配置 basePath
  basePath: '/CNSC-request-collection-system',
  assetPrefix: '/CNSC-request-collection-system',
  
  // 图片配置
  images: {
    unoptimized: true,
  },
  
  // 跳过类型检查
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 跳过 ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 禁用 API 路由（纯静态不需要）
  trailingSlash: true,
};

module.exports = nextConfig;
