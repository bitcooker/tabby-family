import React from 'react'

interface EmployeesLayoutProps {
  children: React.ReactNode
}

export default function EmployeesLayout({ children }: EmployeesLayoutProps) {
  return <>{children}</>
}
