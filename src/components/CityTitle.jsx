import React from 'react'
import { Heart } from 'lucide-react'

const CityTitle = ({ city, favoriteCities, handleFavoriteCity }) => {
  return (
    <div className='relative flex items-center justify-between pl-4 mb-6'>
      <div className='flex items-center'>
        <div className='absolute top-0 bottom-0 left-0 w-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600'></div>
        <h2 className='text-3xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text'>
          {city.name}
          <span className='ml-2 text-lg font-medium text-gray-500'>
            {city.country}
          </span>
        </h2>
      </div>
      <Heart
        onClick={handleFavoriteCity}
        className={`cursor-pointer transition-colors duration-300 w-6 h-6 ${
          favoriteCities.includes(city.name)
            ? 'text-red-500 fill-red-500'
            : 'text-gray-400 hover:text-red-500'
        }`}
      />
    </div>
  )
}

export default CityTitle
