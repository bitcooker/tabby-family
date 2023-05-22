import React from 'react'

// components
import { Calendar, AnnouncementCard } from '@/components'

export default function Employees() {
  return (
    <div className="flex flex-col mt-5">
      <div className="grid grid-cols-3">
        <AnnouncementCard />
        <div className="flex justify-center">
          <Calendar />
        </div>
        <div></div>
      </div>
    </div>
  )
}
