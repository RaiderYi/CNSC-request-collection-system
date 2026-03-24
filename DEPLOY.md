# 腾讯云 CloudBase 部署步骤

## ⚠️ 重要提示

CloudBase 免费版提供 MySQL 数据库，但**个人用户可能需要企业认证**才能使用数据库服务。

**如果您是个人用户，推荐两种方案：**

### 方案 A：纯静态部署（无需数据库）
将 Next.js 导出为静态网站，数据存储在浏览器 localStorage。
- ✅ 完全免费
- ✅ 部署最简单
- ⚠️ 数据仅保存在用户本地

### 方案 B：CloudBase + MySQL（推荐）
使用 CloudBase 云数据库。
- ✅ 数据持久化
- ✅ 国内访问快
- ⚠️ 可能需要完成企业认证

---

## 快速部署（方案 A - 纯静态）

### 步骤 1：修改 Next.js 为静态导出

编辑 `next.config.ts`：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 启用静态导出
  distDir: 'dist',   // 输出目录
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### 步骤 2：提交代码

```bash
git add .
git commit -m "适配 CloudBase 静态部署"
git push
```

### 步骤 3：CloudBase 控制台部署

1. 登录 https://console.cloud.tencent.com/tcb
2. 创建环境（选择免费版）
3. 进入「静态网站托管」
4. 点击「部署应用」
5. 选择「从 Git 仓库导入」
6. 授权 GitHub，选择您的仓库
7. 构建命令：`npm install && npm run build`
8. 输出目录：`dist`
9. 点击「部署」

### 步骤 4：访问网站

部署完成后，会获得一个默认域名：
`https://request-collection-xxx.cloudbase.net`

---

## 完整部署（方案 B - 带数据库）

### 前置要求

- 完成腾讯云企业认证（或使用已有认证的账号）
- 开通 CloudBase 环境和 MySQL 数据库

### 步骤 1：适配 MySQL

将 `prisma/schema.prisma` 中的 `postgresql` 改为 `mysql`：

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

安装 MySQL 驱动：
```bash
npm install mysql2
```

### 步骤 2：配置环境变量

在 CloudBase 控制台 →「环境」→「环境变量」中添加：

```
DATABASE_URL=mysql://用户名:密码@mysql.inner.cloudbase.net:3306/request_collection
JWT_SECRET=your-super-secret-key-min-32-characters
NEXT_PUBLIC_APP_URL=https://您的域名.cloudbase.net
```

### 步骤 3：部署

```bash
# 安装 CloudBase CLI
npm install -g @cloudbase/cli

# 登录
tcb login

# 部署
tcb framework deploy
```

### 步骤 4：初始化数据库

在 CloudBase 控制台 →「云函数」→「远程调试」中执行：

```bash
cd /var/user
npx prisma migrate deploy
npm run db:seed
```

---

## 💡 其他推荐方案

如果 CloudBase 不适合您，还可以考虑：

### 1. 阿里云 SAE（Serverless 应用引擎）
- 新用户免费试用 3 个月
- 支持容器部署
- 自带域名和 HTTPS
- 地址：https://www.aliyun.com/product/sae

### 2. 购买轻量服务器（最推荐长期使用）
- 腾讯云轻量：2核2G4M，约 100元/年
- 我可以帮您一键部署
- 完全可控，可跑 PostgreSQL

### 3. Railway + 腾讯云 CDN（技术向）
- Railway 部署应用（免费）
- 腾讯云 CDN 加速国内访问
- 需要配置域名解析

---

## ❓ 常见问题

**Q: 部署后页面空白？**
A: 检查 `next.config.ts` 的 `output: 'export'` 是否配置正确。

**Q: 如何绑定自己的域名？**
A: CloudBase 控制台 →「静态网站托管」→「域名管理」→「添加域名」

**Q: 免费额度多少？**
A: 
- 存储：1GB
- 流量：5GB/月
- 云函数：5万次/月

**Q: 超出免费额度怎么办？**
A: 按量付费约 50-100元/月，或升级到包年包月套餐。

---

## 📞 需要帮助？

如果在部署过程中遇到问题，请告诉我：
1. 您选择哪种方案？
2. 在哪一步遇到了问题？
3. 错误信息是什么？

我可以远程协助您完成部署！
