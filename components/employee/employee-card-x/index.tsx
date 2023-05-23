'use client'

import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge, Button } from '@/components/common'
import { IEdit } from '@/components/svg'
import { useDetectClickOutside } from 'react-detect-click-outside'
import ReactModal from 'react-modal'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { RiCloseLine } from 'react-icons/ri'
import { BiImageAdd } from 'react-icons/bi'

import type { Manager, Role, Office, Pronoun } from '@prisma/client'

interface EmployeeDataType {
  name?: string
  email?: string
  bio?: string
  roleId?: string
}

interface EmployeeCardXProps {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  role: string
  roleId?: string
  className?: string
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    borderRadius: '20px',
    boxShadow:
      'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
  },
}

const getAllRoles = async () => {
  let response = await (
    await fetch('http://localhost:3000/api/employee/role')
  ).json()

  const roles: Role[] = response.roles
  return roles
}

const EmployeeCardX: React.FC<EmployeeCardXProps> = ({
  id,
  name,
  avatar,
  bio,
  role,
  roleId,
  className,
  email,
}) => {
  const [employeeData, setEmployeeData] = useState<EmployeeDataType>({})
  const [modalIsOpen, setIsOpen] = useState(false)
  const [roles, setRoles] = useState<Role[]>([])

  useEffect(() => {
    const load = async () => {
      const roles = await getAllRoles()
      setRoles(roles)
      setEmployeeData({
        name,
        email,
        bio,
        roleId,
      })
    }

    load()
    console.log(employeeData)
  }, [])

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(true)
  }
  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
    setEmployeeData({
      name,
      email,
      bio,
      roleId,
    })
  }

  const ref = useDetectClickOutside({
    onTriggered: () => setIsOpen(false),
  })

  const handleDelete = async () => {
    const res = await (
      await fetch(`http://localhost:3000/api/employee/delete/${id}`)
    ).json()

    if (res.ok) {
      console.log('Task created successfully!')
    } else {
      console.error('Something went wrong.')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const res = await fetch(`http://localhost:3000/api/employee/${id}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    })

    if (res.ok) {
      console.log('Task created successfully!')
    } else {
      console.error('Something went wrong.')
    }
  }

  return (
    <div
      className={`${className} flex flex-col overflow-hidden rounded-lg shadow`}
    >
      <div className="relative aspect-square">
        <Image src={avatar} alt={name} fill />
      </div>
      <div className="flex flex-col p-5 space-y-3">
        <h2 className="text-2xl text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{bio}</p>
        <div className="flex items-center justify-between">
          <Badge color="teal" content={role} />
          <div className="flex items-center gap-5">
            <Button schema="orange" onClick={handleDelete}>
              <RiDeleteBin5Line /> <span className="mt-px">Delete</span>
            </Button>
            <Button schema="teal" onClick={openModal}>
              <IEdit /> <span className="mt-px">Edit</span>
            </Button>
          </div>
        </div>
      </div>
      {modalIsOpen && (
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={true}
        >
          <div ref={ref}>
            <div className="flex items-center justify-end p-2">
              <RiCloseLine
                className="hover:border rounded-md hover:bg-slate-500 hover:text-white active:bg-slate-800 active:text-white"
                size={'40px'}
                onClick={closeModal}
              />
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="gap-5 p-5 overflow-y-scroll h-[70vh]">
                <div className="grid grid-cols-2 gap-5 p-5 ">
                  <div className="mb-4 col-span-2">
                    <label
                      className="block capitalize text-gray-700 font-bold mb-2 text-sm cap"
                      htmlFor="name"
                    >
                      name
                    </label>
                    <input
                      required
                      className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-base placeholder:capitalize"
                      id="name"
                      type="text"
                      placeholder="name"
                      value={employeeData?.name}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block capitalize text-gray-700 font-bold mb-2 text-sm cap"
                      htmlFor="email"
                    >
                      email
                    </label>
                    <input
                      required
                      className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-base placeholder:capitalize"
                      id="email"
                      type="email"
                      placeholder="email"
                      value={employeeData?.email}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block capitalize text-gray-700 font-bold mb-2 text-sm cap"
                      htmlFor="role"
                    >
                      role
                    </label>
                    <select
                      required
                      id="role"
                      name="role"
                      value={employeeData?.roleId}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          roleId: e.target.value,
                        })
                      }
                      className="select capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-base placeholder:capitalize"
                    >
                      {roles &&
                        roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.role_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-4 col-span-2">
                    <label
                      className="block capitalize text-gray-700 font-bold mb-2 text-sm cap"
                      htmlFor="bio"
                    >
                      biology
                    </label>
                    <textarea
                      className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-base placeholder:capitalize"
                      id="bio"
                      rows={10}
                      placeholder="bio"
                      value={employeeData?.bio}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          bio: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-2 px-5">
                <Button className="w-full text-center text-xl" schema="teal">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </ReactModal>
      )}
    </div>
  )
}

export default EmployeeCardX
