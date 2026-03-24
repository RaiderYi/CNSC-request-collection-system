"use client"

import { useEffect, useState } from "react"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { RequestFormData, REQUEST_STATUS, PRIORITY_LEVELS, BUSINESS_DOMAINS, PLATFORM_MODULES } from "@/types/request"
import { formatDate, cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Users,
  TrendingUp,
  Search,
  Filter,
  Eye,
  ArrowLeft,
  Building2,
  Calendar,
  Flag,
  Layers,
  CheckCircle,
} from "lucide-react"

/**
 * 管理后台仪表盘
 * 数据汇总大屏、需求列表和详情查看
 */

interface StoredRequest extends RequestFormData {
  id: string
  status: string
  createdAt: string
  updatedAt: string
}

function StatCard({ title, value, description, icon }: { title: string; value: string | number; description: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboardPage() {
  const [requests, setRequests] = useState<StoredRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<StoredRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<StoredRequest | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  useEffect(() => {
    const loadRequests = () => {
      try {
        const data = localStorage.getItem("requests_data")
        if (data) {
          const parsed = JSON.parse(data)
          setRequests(parsed)
          setFilteredRequests(parsed)
        }
      } catch (error) {
        console.error("加载数据失败:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadRequests()
  }, [])

  useEffect(() => {
    let result = requests
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((r) =>
        r.requestName.toLowerCase().includes(query) ||
        r.submitterUnitType.toLowerCase().includes(query)
      )
    }
    if (statusFilter !== "all") result = result.filter((r) => r.status === statusFilter)
    if (priorityFilter !== "all") result = result.filter((r) => r.priority === priorityFilter)
    setFilteredRequests(result)
  }, [requests, searchQuery, statusFilter, priorityFilter])

  const stats = {
    total: requests.length,
    submitted: requests.filter((r) => r.status === "submitted").length,
    uniqueUnits: new Set(requests.map((r) => r.submitterUnitType)).size,
    highPriority: requests.filter((r) => r.priority === "high").length,
  }

  const getStatusBadge = (status: string) => {
    const config = REQUEST_STATUS.find((s) => s.id === status)
    if (!config) return <Badge variant="secondary">未知</Badge>
    const variants: Record<string, any> = { draft: "secondary", submitted: "default", under_review: "warning", approved: "success", rejected: "destructive" }
    return <Badge variant={variants[status] || "secondary"}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const config = PRIORITY_LEVELS.find((p) => p.id === priority)
    if (!config) return <Badge variant="secondary">未知</Badge>
    const variants: Record<string, any> = { high: "destructive", medium: "warning", low: "secondary" }
    return <Badge variant={variants[priority] || "secondary"}>{config.label}</Badge>
  }

  const getLabelById = (id: string, list: { id: string; label: string }[]) => list.find((item) => item.id === id)?.label || id

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <Link href="/dashboard" className="mr-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回前台
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <span className="font-bold">管理后台</span>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">数据汇总大屏</h1>
          <p className="text-muted-foreground mt-2">查看所有需求征集数据和管理统计信息</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard title="总需求数" value={stats.total} description="所有提交的需求" icon={<FileText className="w-4 h-4 text-primary" />} />
          <StatCard title="已提交单位" value={stats.uniqueUnits} description="参与需求征集的单位数" icon={<Building2 className="w-4 h-4 text-primary" />} />
          <StatCard title="待审核" value={stats.submitted} description="待处理的需求申请" icon={<CheckCircle className="w-4 h-4 text-primary" />} />
          <StatCard title="高优先级" value={stats.highPriority} description="战略合规型需求" icon={<Flag className="w-4 h-4 text-primary" />} />
        </div>

        {/* 筛选和搜索 */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="搜索需求名称、单位..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  {REQUEST_STATUS.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="优先级筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部优先级</SelectItem>
                  {PRIORITY_LEVELS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.label}优先级</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 数据表格 */}
        <Card>
          <CardHeader>
            <CardTitle>需求列表</CardTitle>
            <CardDescription>共 {filteredRequests.length} 条记录</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">加载中...</p>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">暂无数据</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>需求名称</TableHead>
                      <TableHead>提出单位</TableHead>
                      <TableHead>优先级</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>提交时间</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">{request.requestName}</TableCell>
                        <TableCell>{request.submitterUnitType}</TableCell>
                        <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>{formatDate(request.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(request)}>
                            <Eye className="w-4 h-4 mr-1" />
                            查看
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* 详情弹窗 */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>需求详情</DialogTitle>
            <DialogDescription>查看需求的完整信息</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-6 pr-4">
                {/* 基本信息 */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> 基本信息
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm bg-muted p-4 rounded-lg">
                    <div><span className="text-muted-foreground">需求名称：</span>{selectedRequest.requestName}</div>
                    <div><span className="text-muted-foreground">提出单位：</span>{selectedRequest.submitterUnitType}</div>
                    <div><span className="text-muted-foreground">需求提出人：</span>{selectedRequest.requesterName}</div>
                    <div><span className="text-muted-foreground">需求接口人：</span>{selectedRequest.contactName}</div>
                    <div><span className="text-muted-foreground">期望完成时间：</span>{formatDate(selectedRequest.expectedDate)}</div>
                    <div><span className="text-muted-foreground">提交时间：</span>{formatDate(selectedRequest.createdAt)}</div>
                  </div>
                </div>

                <Separator />

                {/* 业务信息 */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4" /> 业务信息
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-muted-foreground">涉及业务域：</span>{selectedRequest.businessDomains.map((d) => getLabelById(d, BUSINESS_DOMAINS)).join(", ")}</div>
                    <div><span className="text-muted-foreground">涉及平台模块：</span>{selectedRequest.platformModules.map((m) => getLabelById(m, PLATFORM_MODULES)).join(", ")}</div>
                    <div><span className="text-muted-foreground">业务流程变更：</span>{selectedRequest.hasProcessChange === "yes" ? "是" : "否"}</div>
                    {selectedRequest.businessDescription && (
                      <div className="bg-muted p-3 rounded"><span className="text-muted-foreground">变更描述：</span>{selectedRequest.businessDescription}</div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* 需求详情 */}
                <div>
                  <h3 className="font-semibold mb-2">需求详情</h3>
                  <div className="space-y-4 text-sm">
                    <div className="bg-muted p-3 rounded">
                      <p className="font-medium mb-1">用户角色</p>
                      <p className="text-muted-foreground">{selectedRequest.userRole}</p>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <p className="font-medium mb-1">业务场景</p>
                      <p className="text-muted-foreground whitespace-pre-wrap">{selectedRequest.businessScenario}</p>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <p className="font-medium mb-1">业务痛点</p>
                      <p className="text-muted-foreground whitespace-pre-wrap">{selectedRequest.painPoints}</p>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <p className="font-medium mb-1">期望解决方案</p>
                      <p className="text-muted-foreground whitespace-pre-wrap">{selectedRequest.expectedSolution}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 价值分析 */}
                <div>
                  <h3 className="font-semibold mb-2">价值分析</h3>
                  <div className="space-y-4 text-sm">
                    <div className="bg-muted p-3 rounded">
                      <p className="font-medium mb-1">优先级：{getPriorityBadge(selectedRequest.priority)}</p>
                      {selectedRequest.priorityReason && <p className="text-muted-foreground mt-1">{selectedRequest.priorityReason}</p>}
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <p className="font-medium mb-1">管理价值</p>
                      <p className="text-muted-foreground whitespace-pre-wrap">{selectedRequest.managementValue}</p>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <p className="font-medium mb-1">经济价值</p>
                      <p className="text-muted-foreground whitespace-pre-wrap">{selectedRequest.economicValue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
