"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { FORM_STEPS } from "@/types/request"

/**
 * 表单步骤指示器组件
 * 显示当前步骤和完成状态
 */

interface StepIndicatorProps {
  currentStep: number
  completedSteps: number[]
  onStepClick?: (step: number) => void
}

export function StepIndicator({
  currentStep,
  completedSteps,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* 桌面端步骤指示器 */}
      <div className="hidden md:flex items-center justify-between">
        {FORM_STEPS.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = completedSteps.includes(index)
          const isClickable = onStepClick && (isCompleted || index <= currentStep)

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* 步骤圆点 */}
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                  isActive && "border-primary bg-primary text-primary-foreground",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  !isActive && !isCompleted && "border-muted-foreground/30 bg-background text-muted-foreground",
                  isClickable && "cursor-pointer hover:scale-105",
                  !isClickable && "cursor-not-allowed opacity-60"
                )}
              >
                {isCompleted && !isActive ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </button>

              {/* 步骤信息 */}
              <div className="ml-3 mr-4">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive ? "text-primary" : "text-foreground"
                  )}
                >
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>

              {/* 连接线 */}
              {index < FORM_STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-colors duration-300",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* 移动端步骤指示器 */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">
            步骤 {currentStep + 1} / {FORM_STEPS.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {FORM_STEPS[currentStep]?.label}
          </span>
        </div>
        <div className="flex gap-1">
          {FORM_STEPS.map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 h-2 rounded-full transition-colors duration-300",
                index <= currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
