import React from 'react'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Calendar, Button, AnnouncementCard, EmployeeCard } from '@/components'

const getAnnouncements = async () => {
  return await prisma.announcement.findMany({
    take: 5,
    orderBy: {
      created_at: 'asc',
    },
  })
}

const getEmployeesCount = async () => {
  return await prisma.employee.count()
}

const getRandomEmployee = async () => {
  const employeesCount = await prisma.employee.count()
  const skip = Math.floor(Math.random() * employeesCount)

  const employee = await prisma.employee.findMany({
    take: 1,
    skip: skip,
    include: {
      role: true,
    },
  })

  return employee[0]
}

const getAllEmployees = async () => {
  return await prisma.employee.findMany({
    include: {
      role: true,
    },
  })
}

export default async function Employees() {
  const announcements = await getAnnouncements()
  const randomEmployee = await getRandomEmployee()
  const employeesCount = await getEmployeesCount()
  const employees = await getAllEmployees()

  return (
    <div className="flex flex-col mt-5">
      {/* Top Section */}
      <div className="grid grid-cols-3">
        <AnnouncementCard announcements={announcements} />
        <div className="flex justify-center">
          <Calendar />
        </div>
        <div className="flex flex-col space-y-3">
          <EmployeeCard
            name={randomEmployee?.name}
            role={randomEmployee?.role.role_name}
            email={randomEmployee?.email}
            avatar={randomEmployee?.avatar}
            joined_at={randomEmployee?.joined_at}
          />
        </div>
      </div>

      {/* Employees */}
      <div className="flex flex-col mt-10 space-y-10">
        <h3 className="text-center text-gray-500">
          Yay! {employeesCount} Tabbys recently joined{' '}
          <Button schema="teal">Get to know us!</Button>
        </h3>

        <div className="grid grid-cols-3 gap-5">
          {employees?.map((employee) => (
            <Link key={employee.id} href={`employee/${employee.id}`}>
              <EmployeeCard
                name={employee.name}
                role={employee.role.role_name}
                email={employee.email}
                avatar={employee.avatar}
                joined_at={employee.joined_at}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
