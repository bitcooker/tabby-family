import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { faker } from '@faker-js/faker'

interface EmployeeDataType {
  id: string
  name: string
  email: string
  bio: string
  role: string
  roleId?: string
  className?: string
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, email, bio, roleId }: EmployeeDataType = body

    const employee = await prisma.employee.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        email,
        bio,
        roleId,
        updated_at: new Date(),
      },
    })

    console.log(employee)
    return NextResponse.json({ msg: 'success' }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ e }, { status: 404 })
  }
}
