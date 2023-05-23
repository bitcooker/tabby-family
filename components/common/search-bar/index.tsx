import React from 'react'

interface SearchBarProps {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  placeholder = 'Search',
  onChange,
  onKeyDown,
  value,
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`p-2 w-full relative text-gray-600`}>
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-full"
          type="search"
          name="search"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  )
}

export default SearchBar
