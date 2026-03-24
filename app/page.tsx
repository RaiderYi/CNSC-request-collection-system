"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  FilePlus,
  LayoutDashboard,
  Settings,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react"

/**
 * 首页/入口页面
 * 引导用户到不同的功能模块
 */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">企业级需求征集门户</h1>
              <p className="text-xs text-muted-foreground">中核集团采购与供应链一体化智能服务平台</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">v1.0</Badge>
          </div>
        </div>
      </header>

      <main className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            企业级需求征集与管理平台
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            替代传统Excel文件流转，实现各成员单位需求的结构化采集、集中管理，
            为后续的AI Agent和数据分析平台提供标准化的数据接口
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                <LayoutDashboard className="w-5 h-5" />
                进入仪表盘
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/request/new">
              <Button size="lg" variant="outline" className="gap-2">
                <FilePlus className="w-5 h-5" />
                立即填报需求
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {/* Feature 1 */}
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FilePlus className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <CardTitle>需求填报中心</CardTitle>
              <CardDescription>
                将需求征集模板转化为动态的现代化多步骤表单，支持智能辅助和本地草稿保存
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  四步骤分步填写
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  实时数据校验
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  本地草稿自动保存
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  AI智能扩展预留
                </li>
              </ul>
              <Link href="/request/new" className="mt-4 block">
                <Button variant="outline" className="w-full gap-2">
                  开始填报
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <CardTitle>用户仪表盘</CardTitle>
              <CardDescription>
                展示当前进行中的需求征集活动公告，查看已提交的需求列表和状态
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  需求征集活动公告
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  我的需求列表
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  实时状态跟踪
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  截止时间提醒
                </li>
              </ul>
              <Link href="/dashboard" className="mt-4 block">
                <Button variant="outline" className="w-full gap-2">
                  查看仪表盘
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <CardTitle>集团管理端</CardTitle>
              <CardDescription>
                数据汇总大屏、需求列表筛选排序、详情抽屉查看，一站式管理所有需求
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  数据统计看板
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  多维度筛选排序
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  详情抽屉查看
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  导出数据接口
                </li>
              </ul>
              <Link href="/admin/dashboard" className="mt-4 block">
                <Button variant="outline" className="w-full gap-2">
                  进入管理端
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Stats Section */}
        <div className="grid gap-8 md:grid-cols-3 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <p className="text-muted-foreground">结构化数据采集</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">4步</div>
            <p className="text-muted-foreground">分步表单填写</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">实时</div>
            <p className="text-muted-foreground">数据校验与保存</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p> 2026 中核集团采购与供应链一体化智能服务平台. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}
