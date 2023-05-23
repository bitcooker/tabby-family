import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const employee = await prisma.employee.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ employee }, { status: 202 })
  } catch (error) {
    return NextResponse.json({ msg: 'error' }, { status: 404 })
  }
}
