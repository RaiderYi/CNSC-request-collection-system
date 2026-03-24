"use client"

import { UseFormReturn, useWatch } from "react-hook-form"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PRIORITY_LEVELS } from "@/types/request"
import { Flag, TrendingUp, DollarSign, AlertCircle } from "lucide-react"

/**
 * 步骤4：优先级与价值分析
 * 选择优先级并填写管理价值和经济价值分析
 */

interface ValueStepProps {
  form: UseFormReturn<any>
}

export function ValueStep({ form }: ValueStepProps) {
  // 监听优先级选择，用于条件显示
  const priority = useWatch({
    control: form.control,
    name: "priority",
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 需求优先级 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Flag className="w-5 h-5 text-primary" />
            需求优先级 *
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid gap-4 md:grid-cols-3"
                  >
                    {PRIORITY_LEVELS.map((level) => (
                      <FormItem key={level.id} className="relative">
                        <FormControl>
                          <RadioGroupItem
                            value={level.id}
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all">
                          <Badge
                            variant={
                              level.id === "high"
                                ? "destructive"
                                : level.id === "medium"
                                ? "warning"
                                : "secondary"
                            }
                            className="mb-2"
                          >
                            {level.label}优先级
                          </Badge>
                          <span className="text-sm font-medium">
                            {level.description}
                          </span>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 优先级说明（高/中优先级时需要） */}
          {(priority === "high" || priority === "medium") && (
            <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-4 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                    优先级选择标准
                  </p>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 list-disc list-inside">
                    <li>
                      <strong>高优先级（战略合规型）</strong>：影响2个以上单位用户使用，涉及国家级/部委级监管合规要求，直接影响集团战略目标或核心业务连续性
                    </li>
                    <li>
                      <strong>中优先级（业务支撑型）</strong>：影响1个单位50%以上用户使用
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {(priority === "high" || priority === "medium") && (
            <FormField
              control={form.control}
              name="priorityReason"
              render={({ field }) => (
                <FormItem className="animate-slide-in">
                  <FormLabel>优先级选择原因 *</FormLabel>
                  <FormDescription>
                    请详细说明选择该优先级的原因，参考上述标准进行描述
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="请说明优先级选择原因..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </Card>

      {/* 管理价值分析 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-5 h-5 text-primary" />
            管理价值分析 *
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="managementValue"
            render={({ field }) => (
              <FormItem>
                <FormDescription className="space-y-2">
                  <p>
                    指通过该需求实施所能带来的非直接经济收益，通常体现在效率、合规、风险控制、协同能力等方面。
                  </p>
                  <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    <p className="font-medium mb-1">可从以下角度描述：</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>
                        <strong>效率提升</strong>：是否减少人工操作步骤、缩短业务处理时间
                      </li>
                      <li>
                        <strong>标准化与规范化</strong>：是否推动业务流程统一、数据格式标准化
                      </li>
                      <li>
                        <strong>风险控制与合规性</strong>：是否有助于满足监管要求、防范操作风险
                      </li>
                      <li>
                        <strong>协同与透明度</strong>：是否促进跨部门、跨单位信息共享
                      </li>
                    </ul>
                  </div>
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="请详细描述管理价值..."
                    className="min-h-[200px] mt-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* 经济价值分析 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <DollarSign className="w-5 h-5 text-primary" />
            经济价值分析 *
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="economicValue"
            render={({ field }) => (
              <FormItem>
                <FormDescription className="space-y-2">
                  <p>
                    指该需求实施后可能带来的直接或间接经济效益，应尽量进行量化估算。
                  </p>
                  <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    <p className="font-medium mb-1">可从以下角度说明：</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>
                        <strong>成本节约</strong>：是否降低人力、物料、时间或管理成本
                      </li>
                      <li>
                        <strong>收益提升</strong>：是否促进收入增长、资金周转加快、采购成本降低
                      </li>
                      <li>
                        <strong>资源优化</strong>：是否提高资产利用率、减少浪费、优化资源配置
                      </li>
                    </ul>
                  </div>
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="请详细描述经济价值..."
                    className="min-h-[200px] mt-4"
                    {...field}
                  />
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
