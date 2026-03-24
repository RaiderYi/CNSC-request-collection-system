import { z } from "zod"

/**
 * 需求申请单Zod校验规则
 * 严格按照模板字段定义校验逻辑
 */

// 手机号校验
const phoneRegex = /^1[3-9]\d{9}$/

// 邮箱校验
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 步骤1：基本信息校验
export const basicInfoSchema = z.object({
  submitterUnit: z.string().min(1, "请选择提出单位类型"),
  submitterUnitType: z.string().min(1, "请填写具体单位名称"),
  parentUnit: z.string().min(1, "请选择所属单位"),
  requesterName: z.string().min(2, "姓名至少需要2个字符").max(20, "姓名不能超过20个字符"),
  requesterPhone: z.string().regex(phoneRegex, "请输入有效的手机号"),
  requesterEmail: z.string().regex(emailRegex, "请输入有效的邮箱地址"),
  contactName: z.string().min(2, "姓名至少需要2个字符").max(20, "姓名不能超过20个字符"),
  contactPhone: z.string().regex(phoneRegex, "请输入有效的手机号"),
  contactEmail: z.string().regex(emailRegex, "请输入有效的邮箱地址"),
  submitDate: z.string().min(1, "请选择提出时间"),
  expectedDate: z.string().min(1, "请选择期望完成时间"),
  requestName: z.string().min(5, "需求名称至少需要5个字符").max(100, "需求名称不能超过100个字符"),
})

// 步骤2：业务信息校验
export const businessInfoSchema = z.object({
  businessDomains: z.array(z.string()).min(1, "请至少选择一个业务域"),
  platformModules: z.array(z.string()).min(1, "请至少选择一个平台模块"),
  hasProcessChange: z.enum(["yes", "no"]),
  businessDescription: z.string().optional(),
})

// 步骤3：需求详情校验
export const detailsSchema = z.object({
  userRole: z.string().min(3, "请详细描述用户角色").max(200, "描述不能超过200个字符"),
  businessScenario: z.string().min(10, "请详细描述业务场景").max(1000, "描述不能超过1000个字符"),
  painPoints: z.string().min(10, "请详细描述业务痛点").max(1000, "描述不能超过1000个字符"),
  expectedSolution: z.string().min(10, "请详细描述期望解决方案").max(1000, "描述不能超过1000个字符"),
})

// 步骤4：优先级与价值分析校验
export const valueAnalysisSchema = z.object({
  priority: z.enum(["high", "medium", "low"]),
  priorityReason: z.string().optional(),
  managementValue: z.string().min(10, "请详细描述管理价值").max(2000, "描述不能超过2000个字符"),
  economicValue: z.string().min(10, "请详细描述经济价值").max(2000, "描述不能超过2000个字符"),
})

// 完整表单校验
export const requestFormSchema = z.object({
  ...basicInfoSchema.shape,
  ...businessInfoSchema.shape,
  ...detailsSchema.shape,
  ...valueAnalysisSchema.shape,
}).refine(
  (data) => {
    // 如果涉及业务流程变更，必须填写描述
    if (data.hasProcessChange === "yes") {
      return data.businessDescription && data.businessDescription.length >= 10
    }
    return true
  },
  {
    message: "涉及业务流程变更时，请详细描述变更内容",
    path: ["businessDescription"],
  }
).refine(
  (data) => {
    // 如果优先级为高或中，必须填写原因
    if (data.priority === "high" || data.priority === "medium") {
      return data.priorityReason && data.priorityReason.length >= 10
    }
    return true
  },
  {
    message: "高/中优先级需求需要说明选择原因",
    path: ["priorityReason"],
  }
)

// 类型推断
export type BasicInfoData = z.infer<typeof basicInfoSchema>
export type BusinessInfoData = z.infer<typeof businessInfoSchema>
export type DetailsData = z.infer<typeof detailsSchema>
export type ValueAnalysisData = z.infer<typeof valueAnalysisSchema>
export type RequestFormData = z.infer<typeof requestFormSchema>
