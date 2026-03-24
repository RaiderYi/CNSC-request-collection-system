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
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BUSINESS_DOMAINS, PLATFORM_MODULES } from "@/types/request"
import { Layers, Puzzle, GitBranch } from "lucide-react"

/**
 * 步骤2：业务信息
 * 选择业务域、平台模块和流程变更情况
 */

interface BusinessInfoStepProps {
  form: UseFormReturn<any>
}

export function BusinessInfoStep({ form }: BusinessInfoStepProps) {
  // 监听流程变更选项，用于条件显示
  const hasProcessChange = useWatch({
    control: form.control,
    name: "hasProcessChange",
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 业务域选择 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="w-5 h-5 text-primary" />
            涉及业务域 *
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="businessDomains"
            render={() => (
              <FormItem>
                <div className="grid gap-4 md:grid-cols-3">
                  {BUSINESS_DOMAINS.map((domain) => (
                    <FormField
                      key={domain.id}
                      control={form.control}
                      name="businessDomains"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={domain.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(domain.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, domain.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== domain.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {domain.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* 平台模块选择 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Puzzle className="w-5 h-5 text-primary" />
            涉及平台模块 *
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="platformModules"
            render={() => (
              <FormItem>
                <div className="grid gap-4 md:grid-cols-3">
                  {PLATFORM_MODULES.map((module) => (
                    <FormField
                      key={module.id}
                      control={form.control}
                      name="platformModules"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={module.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(module.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, module.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== module.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {module.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* 业务流程变更 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitBranch className="w-5 h-5 text-primary" />
            业务流程变更
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="hasProcessChange"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>是否涉及业务流程新增或变更？ *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-6"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        是
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        否
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {hasProcessChange === "yes" && (
            <FormField
              control={form.control}
              name="businessDescription"
              render={({ field }) => (
                <FormItem className="animate-slide-in">
                  <FormLabel>业务流程描述 *</FormLabel>
                  <FormDescription>
                    如涉及业务流程新增或变更，请对业务流程与场景进行详细描述
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="请详细描述业务流程..."
                      className="min-h-[150px]"
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
    </div>
  )
}
