"use client"

import { UseFormReturn } from "react-hook-form"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, AlertTriangle, Lightbulb, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * 步骤3：需求详情
 * 收集用户角色、业务场景、痛点和期望解决方案
 */

interface DetailsStepProps {
  form: UseFormReturn<any>
}

export function DetailsStep({ form }: DetailsStepProps) {
  // AI智能扩展占位函数
  const handleAIExpand = (field: string) => {
    // 预留：未来接入大模型API进行智能扩展/润色
    alert(`AI智能扩展功能预留：将对"${field}"进行智能润色和扩展`)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 用户角色 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="w-5 h-5 text-primary" />
            用户角色 *
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="userRole"
            render={({ field }) => (
              <FormItem>
                <FormDescription>
                  明确描述使用该功能或受该需求影响的具体角色名称及其主要职责
                </FormDescription>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="例如：寻源管理员、采购专员、供应商管理人员..."
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                      onClick={() => handleAIExpand("用户角色")}
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI润色
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* 业务场景 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="w-5 h-5 text-primary" />
            业务场景 *
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="businessScenario"
            render={({ field }) => (
              <FormItem>
                <FormDescription>
                  具体描述在什么时间、什么情况下、为了完成什么任务而触发该需求。应包含场景发生的条件、参与角色、主要操作环节等。
                </FormDescription>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="请详细描述业务场景..."
                      className="min-h-[120px]"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 text-muted-foreground hover:text-primary"
                      onClick={() => handleAIExpand("业务场景")}
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI扩展
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* 业务痛点 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="w-5 h-5 text-primary" />
            业务痛点 *
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="painPoints"
            render={({ field }) => (
              <FormItem>
                <FormDescription>
                  清晰说明当前在该业务场景下面临的具体问题或困难。建议描述现状中的效率瓶颈、操作繁琐、易出错、不符合规范、信息不透明等方面，并尽量量化其影响。
                </FormDescription>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="请详细描述当前面临的业务痛点..."
                      className="min-h-[150px]"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 text-muted-foreground hover:text-primary"
                      onClick={() => handleAIExpand("业务痛点")}
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI扩展
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* 期望解决方案 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="w-5 h-5 text-primary" />
            期望解决方案/目标 *
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="expectedSolution"
            render={({ field }) => (
              <FormItem>
                <FormDescription>
                  针对业务痛点，明确说明希望通过系统实现的具体功能、流程优化或性能提升。描述应具体、可衡量、可实现。
                </FormDescription>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="请详细描述期望的解决方案..."
                      className="min-h-[150px]"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 text-muted-foreground hover:text-primary"
                      onClick={() => handleAIExpand("期望解决方案")}
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI扩展
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}
