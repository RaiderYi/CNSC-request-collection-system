/**
 * 需求申请单数据结构定义
 * 基于中核集团采购与供应链一体化智能服务平台需求申请单模板
 */

// 业务域选项
export const BUSINESS_DOMAINS = [
  { id: "procurement_plan", label: "采购计划" },
  { id: "procurement_implementation", label: "采购实施" },
  { id: "contract_execution", label: "采购合同执行" },
  { id: "inventory_management", label: "库存管理" },
  { id: "supplier_management", label: "供应商管理" },
  { id: "supply_chain_finance", label: "供应链金融管理" },
  { id: "risk_management", label: "风险管理" },
  { id: "master_data", label: "供应链主数据" },
  { id: "data_service", label: "数据服务" },
] as const

// 平台模块选项
export const PLATFORM_MODULES = [
  { id: "plan_module", label: "计划模块" },
  { id: "sourcing_module", label: "寻源模块" },
  { id: "contract_module", label: "合同模块" },
  { id: "order_module", label: "订单模块" },
  { id: "e_mall", label: "电子商城（含核福汇）" },
  { id: "settlement_module", label: "结算模块" },
  { id: "supplier_collaboration", label: "供应商协同模块" },
  { id: "supplier_mgmt", label: "供应商管理模块" },
  { id: "risk_mgmt", label: "风险管理模块" },
  { id: "sso", label: "统一身份认证SSO" },
  { id: "finance_module", label: "供应链金融模块" },
  { id: "mobile_app", label: "移动APP" },
  { id: "master_data_mgmt", label: "主数据管理模块" },
  { id: "scdc", label: "数据资源管控平台SCDC" },
  { id: "other", label: "其他" },
] as const

// 单位类型选项
export const UNIT_TYPES = [
  { id: "group_hq", label: "集团本部" },
  { id: "second_level_unit", label: "二级单位本部" },
  { id: "member_unit", label: "成员单位" },
] as const

// 所属单位选项
export const PARENT_UNITS = [
  { id: "group_hq", label: "集团本部" },
  { id: "first_procurement", label: "一级集采实施机构" },
  { id: "second_level", label: "二级单位" },
] as const

// 优先级选项
export const PRIORITY_LEVELS = [
  { id: "high", label: "高", description: "战略合规型需求" },
  { id: "medium", label: "中", description: "业务支撑型需求" },
  { id: "low", label: "低", description: "体验优化型需求" },
] as const

// 需求状态
export const REQUEST_STATUS = [
  { id: "draft", label: "草稿", color: "gray" },
  { id: "submitted", label: "已提交", color: "blue" },
  { id: "under_review", label: "审核中", color: "yellow" },
  { id: "approved", label: "已通过", color: "green" },
  { id: "rejected", label: "已驳回", color: "red" },
] as const

// 需求申请单数据接口
export interface RequestFormData {
  // 基本信息
  submitterUnit: string
  submitterUnitType: string
  parentUnit: string
  requesterName: string
  requesterPhone: string
  requesterEmail: string
  contactName: string
  contactPhone: string
  contactEmail: string
  submitDate: string
  expectedDate: string
  
  // 需求信息
  requestName: string
  businessDomains: string[]
  platformModules: string[]
  hasProcessChange: "yes" | "no"
  businessDescription?: string
  
  // 需求概述
  userRole: string
  businessScenario: string
  painPoints: string
  expectedSolution: string
  
  // 优先级
  priority: "high" | "medium" | "low"
  priorityReason?: string
  
  // 价值分析
  managementValue: string
  economicValue: string
  
  // 元数据
  id?: string
  status?: string
  createdAt?: string
  updatedAt?: string
}

// 表单步骤定义
export const FORM_STEPS = [
  { id: "basic", label: "基本信息", description: "填写单位与联系人信息" },
  { id: "business", label: "业务信息", description: "选择业务域与平台模块" },
  { id: "details", label: "需求详情", description: "描述业务场景与痛点" },
  { id: "value", label: "价值分析", description: "分析管理与经济价值" },
] as const

export type FormStepId = typeof FORM_STEPS[number]["id"]
