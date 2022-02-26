import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { ISearchProps } from '../../Models/Interfaces/ISearchProps'

export default function SearchBar(props: ISearchProps) {
  const [search, setSearch] = React.useState('')
  return (
    <div className='w-full px-4 bg-gray-100 rounded-md'>
      <div className='flex flex-row items-center'>
        <SearchIcon className='w-6 h-6 text-gray-500 opacity-60' />
        <input className='w-full bg-transparent px-4 py-2 outline-none' placeholder='Search...' value={search} onChange={(e) => {
          setSearch(e.target.value)
          props.search(e.target.value)
        }} />
      </div>
    </div>
  )
}
