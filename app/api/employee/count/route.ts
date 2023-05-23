import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const count = await prisma.employee.count()

    return NextResponse.json({ count })
  } catch (error) {
    return NextResponse.json({ msg: 'error' }, { status: 404 })
  }
}
