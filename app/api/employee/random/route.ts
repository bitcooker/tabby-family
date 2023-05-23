import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const employeesCount = await prisma.employee.count()
  const skip = Math.floor(Math.random() * employeesCount)

  const employee = await prisma.employee.findMany({
    take: 1,
    skip: skip,
    include: {
      role: true,
    },
  })

  return NextResponse.json({ employee: employee[0] })
}
