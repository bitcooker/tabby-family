import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const pronouns = await prisma.pronoun.findMany({})

    return NextResponse.json({ pronouns })
  } catch (error) {
    return NextResponse.json({ msg: 'error' }, { status: 404 })
  }
}
