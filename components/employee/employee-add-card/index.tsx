import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import { useDetectClickOutside } from 'react-detect-click-outside'
import ReactModal from 'react-modal'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { RiCloseLine } from 'react-icons/ri'
import { BiImageAdd } from 'react-icons/bi'

import { Button } from '@/components/common'

import type { Manager, Role, Office, Pronoun } from '@prisma/client'

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

interface employeeDataType {
  name?: string
  email?: string
  dob?: string
  slack?: string
  twitter?: string
  avatar?: string
  bio?: string
  roleId?: string
  managerId?: string
  officeId?: string
  pronounId?: string
}

const getAllRoles = async () => {
  let response = await (
    await fetch('http://localhost:3000/api/employee/role')
  ).json()

  const roles: Role[] = response.roles
  return roles
}
const getAllManagers = async () => {
  let response = await (
    await fetch('http://localhost:3000/api/employee/manager')
  ).json()

  const managers: Manager[] = response.managers
  return managers
}
const getAllOffices = async () => {
  let response = await (
    await fetch('http://localhost:3000/api/employee/office')
  ).json()

  const offices: Office[] = response.offices
  return offices
}
const getAllPronouns = async () => {
  let response = await (
    await fetch('http://localhost:3000/api/employee/pronoun')
  ).json()

  const pronouns: Pronoun[] = response.pronouns
  return pronouns
}

const EmployeeAddCard: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<employeeDataType>({})
  const [modalIsOpen, setIsOpen] = useState(false)
  const [roles, setRoles] = useState<Role[]>([])
  const [managers, setManagers] = useState<Manager[]>([])
  const [pronouns, setPronouns] = useState<Pronoun[]>([])
  const [offices, setOffices] = useState<Office[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const load = async () => {
      const roles = await getAllRoles()
      const managers = await getAllManagers()
      const offices = await getAllOffices()
      const pronouns = await getAllPronouns()
      setRoles(roles)
      setManagers(managers)
      setPronouns(pronouns)
      setOffices(offices)
      setEmployeeData({
        roleId: roles[0].id,
        managerId: managers[0].id,
        officeId: offices[0].id,
        pronounId: pronouns[0].id,
      })

      setLoading(false)
    }

    load()
  }, [])

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(true)
  }
  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
    setEmployeeData({})
    setEmployeeData({
      roleId: roles[0].id,
      managerId: managers[0].id,
      officeId: offices[0].id,
      pronounId: pronouns[0].id,
    })
  }

  const ref = useDetectClickOutside({
    onTriggered: () => setIsOpen(false),
  })

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:3000/api/employee/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    })

    if (res.ok) {
      console.log('Task created successfully!')
      setEmployeeData({})
    } else {
      console.error('Something went wrong.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen italic">
        Loading...
      </div>
    )
  }

  return (
    <div
      onClick={openModal}
      className="flex items-center justify-center p-5 bg-white rounded-md cursor-pointer hover:animate-app-bounce shadow-md"
    >
      <AiOutlineUserAdd size={'100px'} />
      {modalIsOpen && (
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          // appElement={() => document.getElementById('root')}
          ariaHideApp={true}
          ref={ref}
        >
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
              <div className="flex items-center justify-center bg-grey-lighter col-span-2">
                <label className="w-100 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-slate-400">
                  {(employeeData?.avatar && (
                    <Image
                      src="/next.svg"
                      width={100}
                      height={100}
                      alt="avatar"
                    />
                  )) || (
                    <>
                      <BiImageAdd size="50%" />
                      <span className="mt-2 text-base leading-normal">
                        select an avatar
                      </span>
                    </>
                  )}
                  <input
                    required
                    type="file"
                    className="hidden"
                    value={employeeData?.avatar}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        avatar: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
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
                    className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-xl placeholder:capitalize"
                    id="name"
                    type="text"
                    placeholder="name"
                    value={employeeData?.name}
                    onChange={(e) =>
                      setEmployeeData({ ...employeeData, name: e.target.value })
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
                    className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-xl placeholder:capitalize"
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
                    htmlFor="dob"
                  >
                    Date of Birth
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-xl placeholder:capitalize"
                    id="dob"
                    type="date"
                    placeholder="dob"
                    value={employeeData?.dob}
                    onChange={(e) =>
                      setEmployeeData({ ...employeeData, dob: e.target.value })
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
                    className="select capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-xl placeholder:capitalize"
                  >
                    {roles &&
                      roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.role_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block capitalize text-gray-700 font-bold mb-2 text-sm cap"
                    htmlFor="manager"
                  >
                    manager
                  </label>
                  <select
                    required
                    id="manager"
                    name="manager"
                    value={employeeData?.managerId}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        managerId: e.target.value,
                      })
                    }
                    className="select capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-xl placeholder:capitalize"
                  >
                    {managers &&
                      managers.map((manager) => (
                        <option key={manager.id} value={manager.id}>
                          {manager.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block capitalize text-gray-700 font-bold mb-2 text-sm cap"
                    htmlFor="office"
                  >
                    office
                  </label>
                  <select
                    required
                    id="office"
                    name="office"
                    value={employeeData?.officeId}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        officeId: e.target.value,
                      })
                    }
                    className="select capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-xl placeholder:capitalize"
                  >
                    {offices &&
                      offices.map((office) => (
                        <option key={office.id} value={office.id}>
                          {office.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block capitalize text-gray-700 font-bold mb-2 text-sm cap"
                    htmlFor="pronoun"
                  >
                    pronoun
                  </label>
                  <select
                    required
                    id="pronoun"
                    name="pronoun"
                    value={employeeData?.pronounId}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        pronounId: e.target.value,
                      })
                    }
                    className="select capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-xl placeholder:capitalize"
                  >
                    {pronouns &&
                      pronouns.map((pronoun) => (
                        <option key={pronoun.id} value={pronoun.id}>
                          {pronoun.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block capitalize text-gray-700 font-bold mb-2 text-sm cap"
                    htmlFor="slack"
                  >
                    slack account
                  </label>
                  <input
                    required
                    className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-xl placeholder:capitalize"
                    id="slack"
                    type="text"
                    placeholder="slack"
                    value={employeeData?.slack}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        slack: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block capitalize text-gray-700 font-bold mb-2 text-sm cap"
                    htmlFor="twitter"
                  >
                    twitter account
                  </label>
                  <input
                    required
                    className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-xl placeholder:capitalize"
                    id="twitter"
                    type="text"
                    placeholder="twitter"
                    value={employeeData?.twitter}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        twitter: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4 col-span-2">
                  <label
                    className="block capitalize text-gray-700 font-bold mb-2 text-sm cap"
                    htmlFor="bio"
                  >
                    biology
                  </label>
                  <textarea
                    className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline text-xl placeholder:capitalize"
                    id="bio"
                    rows={4}
                    placeholder="bio"
                    value={employeeData?.bio}
                    onChange={(e) =>
                      setEmployeeData({ ...employeeData, bio: e.target.value })
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
        </ReactModal>
      )}
    </div>
  )
}

export default EmployeeAddCard
