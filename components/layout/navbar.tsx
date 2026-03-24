"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FilePlus, LayoutDashboard, Settings, LogOut, Building2 } from "lucide-react"

/**
 * 导航栏组件
 * 提供主导航和用户信息
 */

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  description?: string
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "仪表盘",
    icon: <LayoutDashboard className="w-4 h-4" />,
    description: "查看需求征集活动",
  },
  {
    href: "/request/new",
    label: "填报需求",
    icon: <FilePlus className="w-4 h-4" />,
    description: "提交新的需求申请",
  },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="mr-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: '#3b4db5' }}>
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden font-bold sm:inline-block">
            需求征集门户
          </span>
        </div>

        {/* 导航链接 */}
        <nav className="flex flex-1 items-center gap-2">
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant={pathname === item.href ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "gap-2"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>

        {/* 右侧操作 */}
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/admin/dashboard">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">管理后台</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>进入管理后台</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">退出登录</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
