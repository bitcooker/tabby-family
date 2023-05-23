import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const offices = await prisma.office.findMany({})

    return NextResponse.json({ offices })
  } catch (error) {
    return NextResponse.json({ msg: 'error' }, { status: 404 })
  }
}
