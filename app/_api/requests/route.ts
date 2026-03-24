import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 获取需求列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const userId = searchParams.get('userId')

    const where: any = {}
    if (status) where.status = status
    if (userId) where.userId = userId

    const requests = await prisma.request.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            unit: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: requests })
  } catch (error) {
    console.error('获取需求列表失败:', error)
    return NextResponse.json(
      { success: false, error: '获取需求列表失败' },
      { status: 500 }
    )
  }
}

// 创建新需求
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 生成需求编号
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const count = await prisma.request.count({
      where: {
        createdAt: {
          gte: new Date(date.getFullYear(), date.getMonth(), 1),
        },
      },
    })
    const requestId = `REQ-${year}${month}-${String(count + 1).padStart(4, '0')}`

    const newRequest = await prisma.request.create({
      data: {
        requestId,
        ...body,
        status: 'submitted',
        submittedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, data: newRequest })
  } catch (error) {
    console.error('创建需求失败:', error)
    return NextResponse.json(
      { success: false, error: '创建需求失败' },
      { status: 500 }
    )
  }
}
