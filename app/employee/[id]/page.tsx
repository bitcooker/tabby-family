'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Calendar, EmployeeCardX } from '@/components'
import type { Employee, Manager, Office, Pronoun, Role } from '@prisma/client'

type NestedEmployee = Employee & { role: Role } & { manager: Manager } & {
  office: Office
} & {
  pronoun: Pronoun
}

const getEmployee = async (id: string) => {
  let response = await (
    await fetch(`http://localhost:3000/api/employee/${id}`)
  ).json()

  const employee: NestedEmployee = response.employee
  return employee
}

export default function Employee() {
  const params = useParams()
  const [employee, setEmployee] = useState<NestedEmployee>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const load = async () => {
      const employee = await getEmployee(params.id)

      setEmployee(employee)
      setLoading(false)
    }

    load()
  }, [params.id])

  console.log(loading)

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen italic text-xl">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-col mt-5">
      {/* Top Section */}
      <div className="grid grid-cols-3 gap-5">
        <EmployeeCardX
          id={employee?.id ?? ''}
          name={employee?.name ?? ''}
          email={employee?.email ?? ''}
          avatar={employee?.avatar ?? ''}
          bio={employee?.bio ?? ''}
          role={employee?.role.role_name ?? ''}
          className="shadow-md col-span-1"
        />
        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-1">
          <div className="flex">
            <Calendar />
          </div>
          <div className="flex flex-col p-10 space-y-4 text-md bg-white rounded-lg shadow-md h-fit">
            <div className="flex items-center">
              <span className="w-1/3 text-gray-500">Manager </span>
              <span className="">{employee?.manager.name}</span>
            </div>
            <div className="flex items-center">
              <span className="w-1/3 text-gray-500">Email </span>
              <span className="">{employee?.email}</span>
            </div>
            <div className="flex items-center">
              <span className="w-1/3 text-gray-500">Slack </span>
              <span className="">{employee?.slack}</span>
            </div>
            <div className="flex items-center">
              <span className="w-1/3 text-gray-500">Twiiter </span>
              <span className="">{employee?.twitter}</span>
            </div>
            <div className="flex items-center">
              <span className="w-1/3 text-gray-500">Office </span>
              <span className="">{employee?.office.name}</span>
            </div>
            <div className="flex items-center">
              <span className="w-1/3 text-gray-500">Birthday </span>
              <span className="">
                {new Date(employee?.dob ?? '').toDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-1/3 text-gray-500">Pronouns </span>
              <span className="">{employee?.pronoun.name}</span>
            </div>
            <div className="flex items-center">
              <span className="w-1/3 text-gray-500">Joined </span>
              <span className="">
                {new Date(employee?.joined_at ?? '').toDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
