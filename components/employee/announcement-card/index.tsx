'use client'

import React, { useEffect, useState } from 'react'
import type { Announcement } from '@prisma/client'
import Link from 'next/link'

interface AnnouncementCardProps {
  announcements: Announcement[]
}
interface AnnouncementItemProps {
  id: string
  title: string
  content: string | null
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({
  id,
  title,
  content,
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="cursor-pointer">{title}</h3>
      <p className="text-xs truncate opacity-80">{content}</p>
    </div>
  )
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcements,
}) => {
  return (
    <div className="flex flex-col p-5 -mb-5 space-y-5 overflow-y-auto text-white rounded bg-sky-500 max-h-96 shadow-md">
      <h1 className="text-xl font-bold text-center">Announcements</h1>

      <div className="flex flex-col space-y-2">
        {announcements.map((item) => (
          <AnnouncementItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default AnnouncementCard
