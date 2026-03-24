import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('开始初始化数据库...')

  // 创建默认管理员账号
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { username: process.env.ADMIN_USERNAME || 'admin' },
    update: {},
    create: {
      username: process.env.ADMIN_USERNAME || 'admin',
      name: '系统管理员',
      email: process.env.ADMIN_EMAIL || 'admin@cnnc.com.cn',
      password: adminPassword,
      role: 'admin',
      unit: '集团本部',
    },
  })

  console.log('管理员账号创建成功:', admin.username)

  // 创建示例需求提出人
  const userPassword = await bcrypt.hash('user123', 10)
  
  const user = await prisma.user.upsert({
    where: { username: 'zhangsan' },
    update: {},
    create: {
      username: 'zhangsan',
      name: '张三',
      email: 'zhangsan@cnnc.com.cn',
      password: userPassword,
      role: 'requestor',
      unit: '某某核电有限公司',
      phone: '13800138000',
    },
  })

  console.log('示例用户创建成功:', user.username)

  // 创建示例需求
  const sampleRequest = await prisma.request.upsert({
    where: { requestId: 'REQ-202603-0001' },
    update: {},
    create: {
      requestId: 'REQ-202603-0001',
      submitterUnit: '成员单位',
      submitterUnitType: '某某核电有限公司',
      parentUnit: '二级单位',
      requesterName: '张三',
      requesterPhone: '13800138000',
      requesterEmail: 'zhangsan@cnnc.com.cn',
      contactName: '李四',
      contactPhone: '13900139000',
      contactEmail: 'lisi@cnnc.com.cn',
      submitDate: new Date('2026-03-24'),
      expectedDate: new Date('2026-06-30'),
      requestName: '优化采购申请审批流程，提升审批效率',
      businessDomains: ['procurement_plan', 'procurement_implementation', 'contract_execution'],
      platformModules: ['plan_module', 'sourcing_module', 'contract_module'],
      hasProcessChange: false,
      userRole: '采购专员、部门经理、财务人员',
      businessScenario: '当前采购申请审批流程涉及多个部门，需要线下打印纸质单据逐级签字，平均审批周期为5-7个工作日。',
      painPoints: '1. 审批周期长\n2. 信息不透明\n3. 容易遗漏\n4. 数据统计困难',
      expectedSolution: '1. 实现电子化审批流程\n2. 审批周期缩短至2天内\n3. 提供审批进度实时查询',
      priority: 'medium',
      priorityReason: '影响本单位80%以上采购业务人员使用',
      managementValue: '效率提升、标准化与规范化、风险控制',
      economicValue: '每年节约采购预算约50-80万元',
      status: 'submitted',
      userId: user.id,
      submittedAt: new Date(),
    },
  })

  console.log('示例需求创建成功:', sampleRequest.requestId)
  console.log('数据库初始化完成！')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
