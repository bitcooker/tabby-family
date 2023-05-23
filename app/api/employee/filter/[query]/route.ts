import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  try {
    console.log(1)
    const employees = await prisma.employee.findMany({
      where: {
        name: {
          contains: params.query,
          // mode: 'insensitive'
        },
      },
      include: {
        role: true,
      },
    })

    return NextResponse.json({ employees })
  } catch (error) {
    return NextResponse.json({ msg: 'error' }, { status: 405 })
  }
}
