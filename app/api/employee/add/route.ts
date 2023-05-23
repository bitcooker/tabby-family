import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { faker } from '@faker-js/faker'

interface employeeDataType {
  name: string
  email: string
  dob: string
  slack: string
  twitter: string
  avatar: string
  bio: string
  roleId: string
  managerId: string
  officeId: string
  pronounId: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      dob,
      slack,
      twitter,
      avatar,
      bio,
      roleId,
      managerId,
      officeId,
      pronounId,
    }: employeeDataType = body

    const employee = await prisma.employee.create({
      data: {
        id: faker.string.uuid(),
        name,
        email,
        dob: new Date(),
        slack,
        twitter,
        avatar: faker.internet.avatar(),
        bio,
        roleId,
        managerId,
        officeId,
        pronounId,
        joined_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    })

    console.log(employee)
    return NextResponse.json({ msg: 'success' }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ e }, { status: 404 })
  }
}
