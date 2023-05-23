import React from 'react'

interface ButtonProps {
  schema: 'cyan' | 'teal' | 'purple' | 'orange'
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

const colors = {
  cyan: 'bg-cyan-500 hover:bg-cyan-500/90',
  teal: 'bg-teal-500 hover:bg-teal-500/90',
  purple: 'bg-purple-500 hover:bg-purple-500/90',
  orange: 'bg-orange-500 hover:bg-orange-500/90',
}

const Button: React.FC<ButtonProps> = ({
  schema,
  children,
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex w-fit items-center justify-center px-2 text-sm h-10 text-white rounded-md transition cursor-pointer whitespace-nowrap active:opacity-50 ${colors[schema]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
