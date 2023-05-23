import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const managers = await prisma.manager.findMany({})

    return NextResponse.json({ managers })
  } catch (error) {
    return NextResponse.json({ msg: 'error' }, { status: 404 })
  }
}
