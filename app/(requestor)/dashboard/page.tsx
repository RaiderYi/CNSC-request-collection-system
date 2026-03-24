"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { RequestFormData } from "@/types/request"
import {
  FilePlus,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Building2,
  ArrowRight,
} from "lucide-react"
import { formatDate, cn } from "@/lib/utils"

/**
 * 用户仪表盘页面
 * 展示需求征集活动公告和当前进行中的需求
 */

// 模拟公告数据
const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "2026年第一季度需求征集活动",
    description: "本次征集面向采购与供应链一体化智能服务平台的优化需求，截止日期为2026年4月30日。",
    deadline: "2026-04-30",
    status: "active",
  },
]

// 扩展请求数据类型
interface StoredRequest extends RequestFormData {
  id: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function DashboardPage() {
  const [requests, setRequests] = useState<StoredRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 从本地存储加载数据
    const loadRequests = () => {
      try {
        const data = localStorage.getItem("requests_data")
        if (data) {
          setRequests(JSON.parse(data))
        }
      } catch (error) {
        console.error("加载数据失败:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRequests()
  }, [])

  // 获取状态对应的徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">草稿</Badge>
      case "submitted":
        return <Badge variant="default">已提交</Badge>
      case "under_review":
        return <Badge variant="warning">审核中</Badge>
      case "approved":
        return <Badge variant="success">已通过</Badge>
      case "rejected":
        return <Badge variant="destructive">已驳回</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-8">
        {/* 欢迎区域 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">欢迎回来</h1>
          <p className="text-muted-foreground mt-2">
            查看当前进行中的需求征集活动和您的需求列表
          </p>
        </div>

        {/* 公告区域 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {ANNOUNCEMENTS.map((announcement) => (
            <Card
              key={announcement.id}
              className={cn(
                "relative overflow-hidden",
                announcement.status === "active" && "border-primary"
              )}
            >
              {announcement.status === "active" && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl-lg">
                  进行中
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {announcement.title}
                </CardTitle>
                <CardDescription>{announcement.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    截止日期：{formatDate(announcement.deadline)}
                  </div>
                  <Link href="/request/new">
                    <Button size="sm" className="gap-2">
                      <FilePlus className="w-4 h-4" />
                      立即填报
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* 快速操作卡片 */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilePlus className="w-5 h-5 text-primary" />
                快速操作
              </CardTitle>
              <CardDescription>开始提交新的需求申请</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/request/new">
                <Button className="w-full gap-2">
                  <FilePlus className="w-4 h-4" />
                  新建需求申请
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* 我的需求列表 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">我的需求</h2>
            <Link href="/request/new">
              <Button variant="outline" size="sm" className="gap-2">
                <FilePlus className="w-4 h-4" />
                新建需求
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">加载中...</p>
            </div>
          ) : requests.length === 0 ? (
            <Card className="bg-muted/50">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <FilePlus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">暂无需求</h3>
                <p className="text-muted-foreground mb-4">
                  您还没有提交任何需求申请，点击按钮开始填报
                </p>
                <Link href="/request/new">
                  <Button className="gap-2">
                    <FilePlus className="w-4 h-4" />
                    新建需求申请
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {requests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold truncate">
                            {request.requestName}
                          </h3>
                          {getStatusBadge(request.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {request.submitterUnitType}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            提交于 {formatDate(request.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            期望完成：{formatDate(request.expectedDate)}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1 shrink-0">
                        详情
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* 帮助提示 */}
        <Alert className="mt-8" variant="info">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>需要帮助？</AlertTitle>
          <AlertDescription>
            如有任何问题，请联系系统管理员或拨打技术支持热线：400-XXX-XXXX
          </AlertDescription>
        </Alert>
      </main>
    </div>
  )
}
