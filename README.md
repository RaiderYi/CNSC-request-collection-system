# 采购与供应链需求填报系统

基于 Next.js 16 + Tailwind CSS 4 + Shadcn UI 构建的企业级需求征集平台。

## 功能特性

- 📋 **多步骤表单向导** - 支持 4 步需求填报流程
- 💾 **数据持久化** - PostgreSQL 数据库存储
- 🔐 **用户认证** - JWT 身份验证
- 📊 **管理后台** - 需求审核和统计分析
- 📱 **响应式设计** - 支持桌面和移动端
- 🎨 **企业级 UI** - 中核蓝主题配色

## 技术栈

- **框架**: Next.js 16.2.1 (App Router)
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4 + Shadcn UI
- **表单**: React Hook Form + Zod
- **数据库**: PostgreSQL + Prisma
- **认证**: JWT
- **部署**: Docker + Docker Compose

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/request-collection.git
cd request-collection
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，配置数据库连接
```

### 4. 初始化数据库

```bash
npx prisma migrate dev
npm run db:seed
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 部署

### Docker 部署（推荐）

```bash
# 启动所有服务
docker-compose up -d

# 执行数据库迁移
docker-compose exec app npx prisma migrate deploy

# 初始化数据
docker-compose exec app npm run db:seed
```

详细部署指南请参考 [部署指南](./部署指南.md)

## 项目结构

```
my-app/
├── app/                    # Next.js App Router
│   ├── (requestor)/       # 需求填报员路由组
│   │   ├── dashboard/     # 仪表盘
│   │   └── request/       # 需求填报
│   ├── (admin)/           # 管理员路由组
│   │   └── dashboard/     # 管理后台
│   └── api/               # API 路由
│       └── requests/      # 需求相关 API
├── components/            # 组件
│   ├── ui/               # Shadcn UI 组件
│   ├── form-steps/       # 表单步骤组件
│   └── layout/           # 布局组件
├── lib/                   # 工具库
│   ├── prisma.ts         # Prisma 客户端
│   └── validations/      # 表单验证
├── prisma/               # Prisma 配置
│   └── schema.prisma     # 数据库模型
├── public/               # 静态资源
└── docker-compose.yml    # Docker 配置
```

## 默认账号

部署后会自动创建以下账号：

| 角色 | 用户名 | 密码 | 邮箱 |
|------|--------|------|------|
| 管理员 | admin | admin123 | admin@cnnc.com.cn |
| 示例用户 | zhangsan | user123 | zhangsan@cnnc.com.cn |

**注意**：生产环境请务必修改默认密码！

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `DATABASE_URL` | PostgreSQL 连接字符串 | - |
| `JWT_SECRET` | JWT 签名密钥 | - |
| `NEXT_PUBLIC_APP_URL` | 应用访问地址 | http://localhost:3000 |
| `ADMIN_USERNAME` | 管理员用户名 | admin |
| `ADMIN_PASSWORD` | 管理员密码 | admin123 |

## 截图

![需求填报界面](./screenshots/request-form.png)
![管理后台](./screenshots/admin-dashboard.png)

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

[MIT](./LICENSE)

## 联系方式

- 项目维护者: Your Name
- 邮箱: your.email@cnnc.com.cn
