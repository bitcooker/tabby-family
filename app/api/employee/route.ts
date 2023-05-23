import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        role: true,
      },
    })

    return NextResponse.json({ employees })
  } catch (error) {
    return NextResponse.json({ msg: 'error' }, { status: 404 })
  }
}
