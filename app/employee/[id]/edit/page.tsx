'use client'

import React from 'react'
import { useParams } from 'next/navigation'

export default function EmployeeEdit() {
  const params = useParams()

  return <>Edit Employee #{params.id}</>
}
