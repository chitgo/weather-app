import React from 'react'
import { CloudSun, ChevronDown, Cloud } from 'lucide-react'
import SearchBar from './SearchBar'

const Header = ({
  isDropdownOpen,
  setIsDropdownOpen,
  favoriteCities,
  fetchWeather,
}) => {
  return (
    <div className='relative mb-6 shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl'>
      <div className='p-6 '>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-3'>
            <CloudSun size={32} className='text-white' />
            <h1
              onClick={() => (window.location.href = '/')}
              className='text-3xl font-bold tracking-tight text-white'
            >
              Weather App
            </h1>
          </div>
          <div className='relative'>
            <div
              className='flex items-center gap-4 px-4 py-2 rounded-lg cursor-pointer bg-white/10'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <p className='font-medium text-white'>Saved Locations</p>
              <ChevronDown
                className={`text-white transition-transform duration-200 ${
                  isDropdownOpen ? 'transform rotate-180' : ''
                }`}
              />
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <SearchBar fetchWeather={fetchWeather} />
        </div>
      </div>

      {isDropdownOpen && (
        <div className='absolute right-6 top-[4.5rem] w-64 bg-white rounded-lg shadow-xl z-[100] py-2 border border-gray-100 max-h-[400px] overflow-y-auto'>
          {favoriteCities.length === 0 ? (
            <div className='px-4 py-3 text-center'>
              <p className='text-sm text-gray-500'>No saved locations yet</p>
            </div>
          ) : (
            favoriteCities.map((city) => (
              <div
                key={city}
                className='px-4 py-2.5 hover:bg-blue-50 cursor-pointer group'
                onClick={() => {
                  fetchWeather(city)
                  setIsDropdownOpen(false)
                }}
              >
                <span className='font-medium text-gray-700 group-hover:text-blue-600'>
                  {city}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Header
