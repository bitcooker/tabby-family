import React from 'react'

interface EmployeeLayoutProps {
  children: React.ReactNode
}

export default function EmployeeLayout({ children }: EmployeeLayoutProps) {
  return (
    <>
      Employee Layout
      {children}
    </>
  )
}
