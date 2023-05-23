import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await prisma.employee.findFirstOrThrow({
      where: {
        id: params.id,
      },
      include: {
        role: true,
        manager: true,
        office: true,
        pronoun: true,
      },
    })

    return NextResponse.json({ employee })
  } catch (error) {
    return NextResponse.json({ msg: 'error' }, { status: 404 })
  }
}
