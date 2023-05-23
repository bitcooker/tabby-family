import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const count = await prisma.employee.count()

  return NextResponse.json({ count })
}
