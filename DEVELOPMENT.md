# 采购与供应链需求填报系统 - 开发文档

> 项目代号：CNSC-Request-Collection  
> 版本：v1.0  
> 最后更新：2026-03-24

---

## 📖 目录

1. [项目概述](#项目概述)
2. [技术架构](#技术架构)
3. [开发环境](#开发环境)
4. [项目结构](#项目结构)
5. [数据库设计](#数据库设计)
6. [API 接口文档](#api-接口文档)
7. [前端开发指南](#前端开发指南)
8. [部署指南](#部署指南)
9. [测试指南](#测试指南)
10. [常见问题](#常见问题)
11. [维护与升级](#维护与升级)

---

## 项目概述

### 项目背景
中核集团采购与供应链一体化智能服务平台需求征集系统，用于替代传统 Excel 文件流转，实现各成员单位需求的结构化采集、集中管理。

### 核心功能
- **需求填报**：4步向导式表单，支持本地草稿自动保存
- **管理审核**：管理员审核、状态流转、数据统计
- **数据导出**：支持导出 Excel、PDF 等格式
- **权限控制**：基于角色的访问控制（RBAC）

### 目标用户
- **需求填报员**：各成员单位业务人员
- **管理员**：集团/二级单位管理人员
- **系统管理员**：IT 运维人员

---

## 技术架构

### 技术栈

| 层级 | 技术选型 | 版本 |
|------|---------|------|
| **前端框架** | Next.js (App Router) | 14.2.5 |
| **UI 框架** | React | 18.3.1 |
| **样式方案** | Tailwind CSS + shadcn/ui | 3.4.4 |
| **表单管理** | React Hook Form + Zod | 7.54.2 / 3.24.2 |
| **后端框架** | Next.js API Routes | 14.2.5 |
| **数据库** | PostgreSQL | 15+ |
| **ORM** | Prisma | 5.15.0 |
| **认证** | JWT (jsonwebtoken) | 9.0.3 |
| **部署** | Docker + Docker Compose | - |

### 架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        客户端 (Client)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   需求填报    │  │   用户仪表盘  │  │   管理后台    │      │
│  │  (requestor) │  │  (dashboard) │  │   (admin)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 服务端 (Server)                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              App Router (App Router)                 │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │   页面路由   │  │   API路由   │  │   中间件    │ │   │
│  │  │  (pages)   │  │  (/api)    │  │(middleware)│ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Prisma ORM + PostgreSQL                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 开发环境

### 系统要求
- **Node.js**: 18.x 或 20.x
- **npm**: 9.x 或更高
- **PostgreSQL**: 15.x 或更高
- **Git**: 2.x 或更高

### 环境搭建

#### 1. 克隆项目
```bash
git clone https://github.com/RaiderYi/CNSC-request-collection-system.git
cd CNSC-request-collection-system/my-app
```

#### 2. 安装依赖
```bash
npm install
```

#### 3. 配置环境变量
```bash
cp .env.example .env
```

编辑 `.env` 文件：
```env
# 数据库连接（开发环境）
DATABASE_URL="postgresql://postgres:password@localhost:5432/request_collection?schema=public"

# JWT 密钥（生产环境必须修改）
JWT_SECRET="your-development-secret-key-min-32-characters"

# 应用 URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# 管理员初始密码
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
ADMIN_EMAIL="admin@cnnc.com.cn"
```

#### 4. 初始化数据库
```bash
# 生成 Prisma 客户端
npx prisma generate

# 执行数据库迁移
npx prisma migrate dev

# 初始化数据（创建管理员账号）
npm run db:seed
```

#### 5. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

---

## 项目结构

```
my-app/
├── app/                          # Next.js App Router
│   ├── (requestor)/              # 需求填报员路由组
│   │   ├── dashboard/            # 用户仪表盘
│   │   │   └── page.tsx
│   │   └── request/
│   │       └── new/              # 需求填报表单
│   │           └── page.tsx
│   ├── (admin)/                  # 管理员路由组
│   │   └── dashboard/            # 管理后台
│   │       └── page.tsx
│   ├── api/                      # API 路由
│   │   ├── auth/                 # 认证相关 API
│   │   │   └── [...nextauth]/
│   │   └── requests/             # 需求相关 API
│   │       ├── route.ts          # GET / POST 列表
│   │       ├── [id]/
│   │       │   └── route.ts      # GET / PUT / DELETE 单个
│   │       └── stats/
│   │           └── route.ts      # 统计数据
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 首页
├── components/                   # React 组件
│   ├── ui/                       # shadcn/ui 组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── ...
│   ├── form-steps/               # 表单步骤组件
│   │   ├── basic-info-step.tsx   # 步骤1: 基本信息
│   │   ├── business-info-step.tsx # 步骤2: 业务信息
│   │   ├── details-step.tsx      # 步骤3: 需求详情
│   │   ├── value-step.tsx        # 步骤4: 价值分析
│   │   └── step-indicator.tsx    # 步骤指示器
│   └── layout/                   # 布局组件
│       └── navbar.tsx            # 导航栏
├── hooks/                        # 自定义 Hooks
│   └── use-local-storage.ts      # localStorage Hook
├── lib/                          # 工具库
│   ├── prisma.ts                 # Prisma 客户端
│   ├── utils.ts                  # 通用工具函数
│   └── validations/              # 表单验证
│       └── request.ts            # 需求表单验证
├── prisma/                       # Prisma 配置
│   ├── schema.prisma             # 数据库模型
│   └── seed.ts                   # 初始化数据脚本
├── types/                        # TypeScript 类型
│   └── request.ts                # 需求相关类型
├── public/                       # 静态资源
├── .env.example                  # 环境变量模板
├── .env                          # 环境变量（不提交到 Git）
├── next.config.js                # Next.js 配置
├── tailwind.config.js            # Tailwind CSS 配置
├── tsconfig.json                 # TypeScript 配置
├── package.json                  # 项目依赖
├── Dockerfile                    # Docker 构建
├── docker-compose.yml            # Docker Compose 配置
└── nginx.conf                    # Nginx 配置
```

---

## 数据库设计

### 实体关系图 (ERD)

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │   Request   │       │ SystemConfig│
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │◄──────│ id (PK)     │       │ id (PK)     │
│ username    │  1:N  │ userId (FK) │       │ key         │
│ name        │       │ requestId   │       │ value       │
│ email       │       │ status      │       └─────────────┘
│ password    │       │ submitDate  │
│ role        │       │ ...         │
│ unit        │       │ createdAt   │
│ createdAt   │       │ updatedAt   │
└─────────────┘       └─────────────┘
```

### 表结构说明

#### User 表（用户表）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String (UUID) | 主键 |
| username | String | 用户名（唯一） |
| name | String | 真实姓名 |
| email | String | 邮箱（唯一） |
| password | String | 密码（bcrypt 加密） |
| role | String | 角色：admin/requestor |
| unit | String? | 所属单位 |
| phone | String? | 联系电话 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

#### Request 表（需求表）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String (UUID) | 主键 |
| requestId | String | 需求编号（唯一）如 REQ-202603-0001 |
| submitterUnit | String | 提出单位类型 |
| submitterUnitType | String | 具体单位名称 |
| parentUnit | String | 所属单位 |
| requesterName | String | 需求提出人姓名 |
| requesterPhone | String | 需求提出人电话 |
| requesterEmail | String | 需求提出人邮箱 |
| contactName | String | 接口人姓名 |
| contactPhone | String | 接口人电话 |
| contactEmail | String | 接口人邮箱 |
| submitDate | DateTime | 提出时间 |
| expectedDate | DateTime | 期望完成时间 |
| requestName | String | 需求名称 |
| businessDomains | String[] | 涉及业务域（数组） |
| platformModules | String[] | 涉及平台模块（数组） |
| hasProcessChange | Boolean | 是否涉及流程变更 |
| businessDescription | String? | 业务流程描述 |
| userRole | String | 用户角色 |
| businessScenario | String | 业务场景 |
| painPoints | String | 业务痛点 |
| expectedSolution | String | 期望解决方案 |
| priority | String | 优先级：high/medium/low |
| priorityReason | String | 优先级选择原因 |
| managementValue | String | 管理价值分析 |
| economicValue | String | 经济价值分析 |
| status | String | 状态：draft/submitted/reviewing/approved/rejected/completed |
| userId | String (FK) | 关联用户ID |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |
| submittedAt | DateTime? | 提交时间 |
| reviewNotes | String? | 审核备注 |
| reviewedBy | String? | 审核人 |
| reviewedAt | DateTime? | 审核时间 |

---

## API 接口文档

### 基础信息
- **基础 URL**: `http://localhost:3000/api`
- **认证方式**: Bearer Token (JWT)
- **Content-Type**: `application/json`

### 认证相关

#### POST /api/auth/login
用户登录

**请求体：**
```json
{
  "username": "zhangsan",
  "password": "user123"
}
```

**响应：**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "xxx",
      "username": "zhangsan",
      "name": "张三",
      "role": "requestor"
    }
  }
}
```

### 需求相关

#### GET /api/requests
获取需求列表

**查询参数：**
| 参数 | 类型 | 说明 |
|------|------|------|
| status | String | 按状态筛选 |
| userId | String | 按用户筛选 |

**响应：**
```json
{
  "success": true,
  "data": [
    {
      "id": "xxx",
      "requestId": "REQ-202603-0001",
      "requestName": "优化采购审批流程",
      "status": "submitted",
      "priority": "medium",
      "createdAt": "2026-03-24T10:00:00Z",
      "user": {
        "name": "张三",
        "unit": "某某核电有限公司"
      }
    }
  ]
}
```

#### POST /api/requests
创建新需求

**请求体：**
```json
{
  "submitterUnit": "成员单位",
  "submitterUnitType": "某某核电有限公司",
  "parentUnit": "二级单位",
  "requesterName": "张三",
  "requesterPhone": "13800138000",
  "requesterEmail": "zhangsan@cnnc.com.cn",
  "contactName": "李四",
  "contactPhone": "13900139000",
  "contactEmail": "lisi@cnnc.com.cn",
  "submitDate": "2026-03-24",
  "expectedDate": "2026-06-30",
  "requestName": "优化采购申请审批流程",
  "businessDomains": ["procurement_plan", "procurement_implementation"],
  "platformModules": ["plan_module", "sourcing_module"],
  "hasProcessChange": false,
  "userRole": "采购专员、部门经理",
  "businessScenario": "当前审批流程...",
  "painPoints": "1. 审批周期长...",
  "expectedSolution": "1. 实现电子化审批...",
  "priority": "medium",
  "priorityReason": "影响80%以上人员使用",
  "managementValue": "效率提升...",
  "economicValue": "每年节约50万元..."
}
```

#### GET /api/requests/:id
获取单个需求详情

#### PUT /api/requests/:id
更新需求

#### DELETE /api/requests/:id
删除需求

#### GET /api/requests/stats
获取统计数据

**响应：**
```json
{
  "success": true,
  "data": {
    "overview": {
      "total": 100,
      "submitted": 20,
      "reviewing": 30,
      "approved": 40,
      "completed": 10
    },
    "businessDomains": [...],
    "priorities": [...]
  }
}
```

---

## 前端开发指南

### 组件规范

#### 表单组件使用示例
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  requestName: z.string().min(2, "需求名称至少2个字符"),
})

export function RequestForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestName: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // 提交逻辑
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="requestName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>需求名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入需求名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
```

### 样式规范

#### 使用 Tailwind CSS
```tsx
// 推荐写法
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold text-gray-900">标题</h2>
  <p className="text-sm text-gray-500">描述文字</p>
</div>

// 使用 cn 工具函数合并类名
import { cn } from "@/lib/utils"

<div className={cn(
  "flex flex-col gap-4",
  isActive && "bg-blue-50",
  className
)}>
```

#### 颜色变量
```css
/* 中核蓝主题 */
--primary: 228 51% 47%;        /* #3b4db5 */
--cnnc-blue: #3b4db5;
--cnnc-blue-dark: #2f3f99;
--cnnc-blue-light: #5a6fd6;
```

### 状态管理

#### 本地存储 Hook
```tsx
import { useLocalStorage } from "@/hooks/use-local-storage"

function MyComponent() {
  const [draft, setDraft] = useLocalStorage("request-draft", {})
  
  // 自动保存到 localStorage
  const saveDraft = (data: any) => {
    setDraft(data)
  }
}
```

---

## 部署指南

### 方式一：Docker Compose（推荐）

#### 1. 服务器准备
- Ubuntu 22.04 LTS
- 2核2G内存以上
- 开放端口：80, 443, 3000

#### 2. 安装 Docker
```bash
curl -fsSL https://get.docker.com | bash
sudo systemctl enable docker
sudo systemctl start docker
```

#### 3. 部署应用
```bash
# 克隆代码
git clone https://github.com/RaiderYi/CNSC-request-collection-system.git
cd CNSC-request-collection-system/my-app

# 配置环境变量
cp .env.example .env
nano .env  # 修改配置

# 启动服务
docker-compose up -d

# 执行数据库迁移
docker-compose exec app npx prisma migrate deploy

# 初始化数据
docker-compose exec app npm run db:seed
```

#### 4. 访问应用
http://服务器IP:3000

### 方式二：手动部署

详见 [部署指南.md](./部署指南.md)

---

## 测试指南

### 单元测试
```bash
# 运行所有测试
npm test

# 运行特定测试
npm test -- RequestForm.test.tsx
```

### 集成测试
```bash
# 启动测试数据库
docker run -d -p 5433:5432 -e POSTGRES_PASSWORD=test postgres:15

# 运行集成测试
npm run test:integration
```

### E2E 测试
```bash
# 启动应用
npm run dev

# 运行 Cypress 测试
npm run cypress:run
```

---

## 常见问题

### Q1: 数据库连接失败？
**A:** 检查以下几点：
1. PostgreSQL 是否已启动
2. 数据库连接字符串是否正确
3. 数据库用户是否有权限

```bash
# 测试数据库连接
psql "postgresql://username:password@localhost:5432/request_collection"
```

### Q2: Prisma 迁移失败？
**A:** 
```bash
# 重置数据库（开发环境）
npx prisma migrate reset

# 重新生成客户端
npx prisma generate
```

### Q3: 构建失败？
**A:**
```bash
# 清除缓存
rm -rf node_modules .next
npm install
npm run build
```

### Q4: 静态资源 404？
**A:** 检查 next.config.js 中的 basePath 和 assetPrefix 配置

---

## 维护与升级

### 日常维护

#### 数据库备份
```bash
# 手动备份
docker-compose exec db pg_dump -U postgres request_collection > backup.sql

# 自动备份（已配置定时任务）
# 查看备份脚本：cat /opt/backup/backup-db.sh
```

#### 日志查看
```bash
# 查看应用日志
docker-compose logs -f app

# 查看数据库日志
docker-compose logs -f db
```

### 版本升级

#### 升级 Next.js
```bash
# 查看最新版本
npm info next

# 升级
npm install next@latest

# 测试
npm run build
npm run dev
```

#### 升级数据库
```bash
# 修改 schema.prisma 后
npx prisma migrate dev --name 迁移名称
```

### 监控与报警

建议配置：
- **应用监控**: PM2 + Keymetrics
- **数据库监控**: PostgreSQL 慢查询日志
- **服务器监控**: 腾讯云/阿里云监控
- **日志收集**: ELK Stack 或 Grafana Loki

---

## 附录

### 业务字典

#### 单位类型
- `group_hq`: 集团本部
- `second_level_unit`: 二级单位本部
- `member_unit`: 成员单位

#### 所属单位
- `group_hq`: 集团本部
- `first_procurement`: 一级集采实施机构
- `second_level`: 二级单位

#### 业务域
- `procurement_plan`: 采购计划
- `procurement_implementation`: 采购实施
- `contract_execution`: 采购合同执行
- `inventory_management`: 库存管理
- `supplier_management`: 供应商管理
- `supply_chain_finance`: 供应链金融管理
- `risk_management`: 风险管理
- `master_data`: 供应链主数据
- `data_service`: 数据服务

#### 平台模块
- `plan_module`: 计划模块
- `sourcing_module`: 寻源模块
- `contract_module`: 合同模块
- `order_module`: 订单模块
- `e_mall`: 电子商城（含核福汇）
- `settlement_module`: 结算模块
- `supplier_collaboration`: 供应商协同模块
- `supplier_mgmt`: 供应商管理模块
- `risk_mgmt`: 风险管理模块
- `sso`: 统一身份认证SSO
- `finance_module`: 供应链金融模块
- `mobile_app`: 移动APP
- `master_data_mgmt`: 主数据管理模块
- `scdc`: 数据资源管控平台SCDC
- `other`: 其他

#### 优先级
- `high`: 高（战略合规型）
- `medium`: 中（业务支撑型）
- `low`: 低（体验优化型）

#### 需求状态
- `draft`: 草稿
- `submitted`: 已提交
- `reviewing`: 审核中
- `approved`: 已通过
- `rejected`: 已驳回
- `completed`: 已完成

### 联系方式

- **项目维护**: RaiderYi
- **邮箱**: your.email@cnnc.com.cn
- **GitHub**: https://github.com/RaiderYi/CNSC-request-collection-system

---

## 更新日志

### v1.0.0 (2026-03-24)
- ✨ 初始版本发布
- ✨ 4步需求填报表单
- ✨ 管理后台数据看板
- ✨ 本地草稿自动保存
- ✨ JWT 用户认证

---

**文档结束**

如有问题，请在 GitHub Issues 中提交。
