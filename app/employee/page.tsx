'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Button,
  AnnouncementCard,
  EmployeeCard,
  EmployeeAddCard,
  SearchBar,
} from '@/components'
import type { Announcement, Employee, Role } from '@prisma/client'

import { AiOutlineSearch } from 'react-icons/ai'

type EmployeeAndRole = Employee & { role: Role }

const getAnnouncements = async () => {
  let response = await (
    await fetch('http://localhost:3000/api/announcement')
  ).json()

  const announcements: Announcement[] = response.announcements
  return announcements
}

const getEmployeesCount = async () => {
  let response = await (
    await fetch('http://localhost:3000/api/employee/count')
  ).json()

  const count: number = response.count
  return count
}

const getRandomEmployee = async () => {
  let response = await (
    await fetch('http://localhost:3000/api/employee/random')
  ).json()

  const employee: EmployeeAndRole = response.employee
  return employee
}

const getAllEmployees = async () => {
  let response = await (
    await fetch('http://localhost:3000/api/employee')
  ).json()

  const employees: EmployeeAndRole[] = response.employees
  return employees
}

const getFilterEmployees = async (filterText: string) => {
  let response = await (
    await fetch(`http://localhost:3000/api/employee/filter/${filterText}`)
  ).json()

  const employees: EmployeeAndRole[] = response.employees
  return employees
}

export default function Employees() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [randomEmployee, setRandomEmployee] = useState<EmployeeAndRole>()
  const [employeesCount, setEmployeesCount] = useState<number>(0)
  const [employees, setEmployees] = useState<EmployeeAndRole[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [filterText, setFilterText] = useState<string>('')
  const [isFiltering, setIsFiltering] = useState<boolean>(false)

  useEffect(() => {
    const load = async () => {
      const announcements = await getAnnouncements()
      const randomEmployee = await getRandomEmployee()
      const employeesCount = await getEmployeesCount()
      const employees = await getAllEmployees()

      setAnnouncements(announcements)
      setRandomEmployee(randomEmployee)
      setEmployeesCount(employeesCount)
      setEmployees(employees)

      setLoading(false)
    }

    load()
  }, [])

  const handleSearch = async () => {
    if (filterText) {
      setIsFiltering(true)
      const employees = await getFilterEmployees(filterText)
      setEmployees(employees)
    } else {
      const employees = await getAllEmployees()
      setEmployees(employees)
      setIsFiltering(false)
    }
  }

  const handleEnterKeyPressed = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.keyCode == 13) {
      handleSearch()
    }
  }

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
      <div className="grid grid-cols-3">
        <AnnouncementCard announcements={announcements} />
        <div className="flex justify-center">
          <Calendar />
        </div>
        <div className="flex flex-col space-y-3">
          <EmployeeCard
            name={randomEmployee?.name ?? ''}
            role={randomEmployee?.role.role_name ?? ''}
            email={randomEmployee?.email ?? ''}
            avatar={randomEmployee?.avatar ?? ''}
            joined_at={randomEmployee?.joined_at ?? new Date()}
          />
        </div>
      </div>

      {/* Employees */}
      <div className="flex flex-col mt-10 space-y-10">
        <h3 className="text-center text-gray-500">
          Yay! {employeesCount} Tabbys recently joined{' '}
          <Button schema="teal">Get to know us!</Button>
        </h3>
        {/* search bar */}
        <div className="flex items-center justify-center">
          <SearchBar
            className="w-1/2"
            placeholder="Search by Name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            onKeyDown={handleEnterKeyPressed}
          />
          <Button schema="teal" onClick={handleSearch}>
            <AiOutlineSearch size={'30px'} />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {employees?.map(
            (employee, index) =>
              (index == 0 && !isFiltering && (
                <EmployeeAddCard key={-100} />
              )) || (
                <Link key={employee.id} href={`employee/${employee.id}`}>
                  <EmployeeCard
                    name={employee.name}
                    role={employee.role.role_name}
                    email={employee.email}
                    avatar={employee.avatar}
                    joined_at={employee.joined_at}
                  />
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  )
}
