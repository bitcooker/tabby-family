import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const roles = await prisma.role.findMany({})

    return NextResponse.json({ roles })
  } catch (error) {
    return NextResponse.json({ msg: 'error' }, { status: 404 })
  }
}
