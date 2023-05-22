import React from 'react'
import Image from 'next/image'

// components
import { Badge } from '@/components/common'

interface EmployeeCardProps {
  name: string
  role: string
  email: string
  avatar: string
  joined_at: Date
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name,
  role,
  email,
  avatar,
  joined_at,
}) => {
  return (
    <div className="flex justify-between p-5 bg-white rounded-md cursor-pointer hover:animate-app-bounce">
      <div className="flex flex-col justify-around">
        <h2 className="text-lg">{name}</h2>
        <div className="flex flex-col space-y-2">
          <Badge content={role} color="teal" />
          <span className="text-sm text-gray-500">{email}</span>
          <span className="text-xs italic">
            Joined on {joined_at.toDateString()}
          </span>
        </div>
      </div>
      <div className="relative w-1/3 overflow-hidden rounded-lg aspect-square">
        <Image src={avatar} alt={name} fill />
      </div>
    </div>
  )
}

export default EmployeeCard
