import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const announcements = await prisma.announcement.findMany({
      take: 5,
      orderBy: {
        created_at: 'asc',
      },
    })

    return NextResponse.json({ announcements })
  } catch (error) {
    return NextResponse.json({ msg: 'error' }, { status: 404 })
  }
}
