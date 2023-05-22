import React from 'react'

interface BadgeProps {
  content: string
  color: 'cyan' | 'teal' | 'purple' | 'orange'
}

const colors = {
  cyan: 'bg-cyan-500',
  teal: 'bg-teal-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
}

const Badge: React.FC<BadgeProps> = ({ content, color }) => {
  return (
    <div
      className={`inline-flex w-fit items-center text-white text-sm px-2 rounded-xl ${colors[color]}`}
    >
      {content}
    </div>
  )
}

export default Badge
