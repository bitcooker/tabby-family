'use client'

import React from 'react'
import { useParams } from 'next/navigation'

export default function Employee() {
  const params = useParams()

  return <>Employee #{params.id}</>
}
