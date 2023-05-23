import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const employees = await prisma.employee.findMany({
    include: {
      role: true,
    },
  })

  return NextResponse.json({ employees })
}
