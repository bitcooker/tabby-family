import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge, Button } from '@/components/common'
import { IEdit } from '@/components/svg'

interface EmployeeCardXProps {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  role: string
}

const EmployeeCardX: React.FC<EmployeeCardXProps> = ({
  id,
  name,
  avatar,
  bio,
  role,
}) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow">
      <div className="relative aspect-square">
        <Image src={avatar} alt={name} fill />
      </div>
      <div className="flex flex-col p-5 space-y-3">
        <h2 className="text-2xl text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{bio}</p>
        <div className="flex items-center justify-between">
          <Badge color="teal" content={role} />
          <Button schema="teal">
            <Link href={`/employee/${id}/edit`} className="flex items-center">
              <IEdit /> <span className="mt-px">Edit</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCardX
