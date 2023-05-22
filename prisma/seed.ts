import { PrismaClient } from '@prisma/client'
import {
  announcements,
  roles,
  managers,
  locations,
  offices,
  pronouns,
  employees,
} from './data'

const prisma = new PrismaClient()

const load = async () => {
  await prisma.announcement.createMany({
    data: announcements,
  })

  await prisma.role.createMany({
    data: roles,
  })

  await prisma.manager.createMany({
    data: managers,
  })

  await prisma.location.createMany({
    data: locations,
  })

  await prisma.office.createMany({
    data: offices,
  })

  await prisma.pronoun.createMany({
    data: pronouns,
  })

  await prisma.employee.createMany({
    data: employees,
  })

  console.log('A dummy data created!')
}

load()
