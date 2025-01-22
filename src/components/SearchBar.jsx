import React, { useState } from 'react'
import { Search } from 'lucide-react'

const SearchBar = ({ fetchWeather }) => {
  const [searchInput, setSearchInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim() === '') return
    fetchWeather(searchInput)
    setSearchInput('')
  }

  return (
    <form onSubmit={handleSubmit} className='relative flex-1 max-w-md'>
      <div className='relative'>
        <input
          type='text'
          placeholder='Search for a city...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='w-full py-2.5 pl-4 pr-12 bg-white/10 border border-white/20 rounded-lg
        text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/25 
          focus:border-transparent backdrop-blur-sm transition-all duration-300'
        />
        <button
          type='submit'
          className='absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-white/70
          hover:text-white rounded-md transition-colors duration-300 focus:outline-none'
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  )
}

export default SearchBar
