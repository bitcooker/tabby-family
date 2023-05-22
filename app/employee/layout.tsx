import React from 'react'

interface EmployeesLayoutProps {
  children: React.ReactNode
}

export default function EmployeesLayout({ children }: EmployeesLayoutProps) {
  return <div className="max-w-screen-xl mx-auto">{children}</div>
}
