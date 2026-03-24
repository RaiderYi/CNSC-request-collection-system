import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 获取单个需求
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const requestData = await prisma.request.findUnique({
      where: { id: params.id },
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
    })

    if (!requestData) {
      return NextResponse.json(
        { success: false, error: '需求不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: requestData })
  } catch (error) {
    console.error('获取需求失败:', error)
    return NextResponse.json(
      { success: false, error: '获取需求失败' },
      { status: 500 }
    )
  }
}

// 更新需求
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const updatedRequest = await prisma.request.update({
      where: { id: params.id },
      data: body,
    })

    return NextResponse.json({ success: true, data: updatedRequest })
  } catch (error) {
    console.error('更新需求失败:', error)
    return NextResponse.json(
      { success: false, error: '更新需求失败' },
      { status: 500 }
    )
  }
}

// 删除需求
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.request.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('删除需求失败:', error)
    return NextResponse.json(
      { success: false, error: '删除需求失败' },
      { status: 500 }
    )
  }
}
