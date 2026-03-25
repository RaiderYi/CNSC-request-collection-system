import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // 总需求数
    const total = await prisma.request.count()
    
    // 各状态统计
    const submitted = await prisma.request.count({ where: { status: 'submitted' } })
    const reviewing = await prisma.request.count({ where: { status: 'reviewing' } })
    const approved = await prisma.request.count({ where: { status: 'approved' } })
    const completed = await prisma.request.count({ where: { status: 'completed' } })
    
    // 本月新增
    const now = new Date()
    const currentMonth = await prisma.request.count({
      where: {
        createdAt: {
          gte: new Date(now.getFullYear(), now.getMonth(), 1),
        },
      },
    })

    // 按业务域统计
    const businessDomainStats = await prisma.request.groupBy({
      by: ['businessDomains'],
      _count: { id: true },
    })

    // 按优先级统计
    const priorityStats = await prisma.request.groupBy({
      by: ['priority'],
      _count: { id: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          total,
          submitted,
          reviewing,
          approved,
          completed,
          currentMonth,
        },
        businessDomains: businessDomainStats,
        priorities: priorityStats,
      },
    })
  } catch (error) {
    console.error('获取统计数据失败:', error)
    return NextResponse.json(
      { success: false, error: '获取统计数据失败' },
      { status: 500 }
    )
  }
}
