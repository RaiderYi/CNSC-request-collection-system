"use client"

import { useState, useEffect, useCallback } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { StepIndicator } from "@/components/form-steps/step-indicator"
import { BasicInfoStep } from "@/components/form-steps/basic-info-step"
import { BusinessInfoStep } from "@/components/form-steps/business-info-step"
import { DetailsStep } from "@/components/form-steps/details-step"
import { ValueStep } from "@/components/form-steps/value-step"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useLocalStorage } from "@/hooks/use-local-storage"
import {
  basicInfoSchema,
  businessInfoSchema,
  detailsSchema,
  valueAnalysisSchema,
  requestFormSchema,
} from "@/lib/validations/request"
import { FORM_STEPS, RequestFormData } from "@/types/request"
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Send,
  RotateCcw,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { z } from "zod"

/**
 * 需求填报页面
 * 多步骤表单，支持本地草稿保存
 */

// 各步骤对应的校验模式
const stepSchemas = [
  basicInfoSchema,
  businessInfoSchema,
  detailsSchema,
  valueAnalysisSchema,
]

// 表单默认值
const defaultValues: Partial<RequestFormData> = {
  submitDate: new Date().toISOString().split("T")[0],
  businessDomains: [],
  platformModules: [],
  hasProcessChange: "no",
  priority: "medium",
}

export default function NewRequestPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDraftAlert, setShowDraftAlert] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // 本地草稿存储
  const { value: draftData, setValue: setDraftData, removeValue: removeDraft } = useLocalStorage<Partial<RequestFormData>>({
    key: "request_draft",
    defaultValue: defaultValues,
  })

  // 表单方法
  const methods = useForm<RequestFormData>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: draftData || defaultValues,
    mode: "onChange",
  })

  const {
    handleSubmit,
    trigger,
    formState: { errors, isDirty },
    watch,
    reset,
  } = methods

  // 监听表单变化，自动保存草稿
  const formValues = watch()
  
  useEffect(() => {
    if (isDirty) {
      const timeoutId = setTimeout(() => {
        setDraftData(formValues)
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [formValues, isDirty, setDraftData])

  // 检查是否有草稿
  useEffect(() => {
    const hasDraft = draftData && Object.keys(draftData).length > 0
    if (hasDraft && !submitSuccess) {
      setShowDraftAlert(true)
    }
  }, [draftData, submitSuccess])

  // 验证当前步骤
  const validateStep = async (step: number): Promise<boolean> => {
    const schema = stepSchemas[step]
    const fields = Object.keys(schema.shape) as Array<keyof RequestFormData>
    const result = await trigger(fields)
    return result
  }

  // 下一步
  const handleNext = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid) {
      setCompletedSteps((prev) => [...new Set([...prev, currentStep])])
      if (currentStep < FORM_STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1)
      }
    }
  }

  // 上一步
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  // 跳转到指定步骤
  const handleStepClick = async (step: number) => {
    if (step < currentStep || completedSteps.includes(step)) {
      setCurrentStep(step)
    }
  }

  // 重置表单
  const handleReset = () => {
    if (confirm("确定要清空表单吗？已保存的草稿也会被删除。")) {
      reset(defaultValues)
      removeDraft()
      setCurrentStep(0)
      setCompletedSteps([])
    }
  }

  // 提交表单
  const onSubmit = async (data: RequestFormData) => {
    setIsSubmitting(true)
    
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // 保存到本地存储（模拟后端存储）
      const existingRequests = JSON.parse(localStorage.getItem("requests_data") || "[]")
      const newRequest = {
        ...data,
        id: `REQ${Date.now()}`,
        status: "submitted",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      localStorage.setItem("requests_data", JSON.stringify([newRequest, ...existingRequests]))
      
      // 清除草稿
      removeDraft()
      setSubmitSuccess(true)
      
      // 3秒后跳转到仪表盘
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    } catch (error) {
      console.error("提交失败:", error)
      alert("提交失败，请重试")
    } finally {
      setIsSubmitting(false)
    }
  }

  // 渲染当前步骤内容
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep form={methods} />
      case 1:
        return <BusinessInfoStep form={methods} />
      case 2:
        return <DetailsStep form={methods} />
      case 3:
        return <ValueStep form={methods} />
      default:
        return null
    }
  }

  // 提交成功界面
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">需求提交成功！</h1>
            <p className="text-muted-foreground mb-8">
              您的需求已成功提交，我们将在审核后与您联系。感谢您的参与！
            </p>
            <Button onClick={() => router.push("/dashboard")}>
              返回仪表盘
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">需求填报</h1>
          <p className="text-muted-foreground mt-2">
            请根据模板要求填写需求信息，系统将自动保存草稿
          </p>
        </div>

        {/* 草稿提示 */}
        {showDraftAlert && (
          <Alert className="mb-6" variant="info">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>检测到未提交的草稿</AlertTitle>
            <AlertDescription>
              系统已自动恢复您上次编辑的内容，继续填写或
              <Button
                variant="link"
                className="h-auto p-0 ml-1"
                onClick={() => {
                  reset(defaultValues)
                  removeDraft()
                  setShowDraftAlert(false)
                }}
              >
                重新开始
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* 步骤指示器 */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <StepIndicator
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
            />
          </CardContent>
        </Card>

        {/* 表单内容 */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                  {renderStepContent()}
                </div>
              </CardContent>
            </Card>

            {/* 底部操作栏 */}
            <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t pt-4 pb-6 -mx-4 px-4">
              <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* 左侧操作 */}
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    重置
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setDraftData(formValues)}
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    保存草稿
                  </Button>
                </div>

                {/* 步骤导航 */}
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    上一步
                  </Button>

                  {currentStep < FORM_STEPS.length - 1 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="gap-2"
                    >
                      下一步
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          提交中...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          提交需求
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  )
}
