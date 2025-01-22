import React from 'react'
import { Thermometer, Wind, Droplets } from 'lucide-react'

const CurrentWeather = ({ current }) => {
  return (
    <div className='relative p-6 overflow-hidden text-white shadow-lg rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600'>
      <div className='absolute top-0 right-0 p-4'>
        <img
          src={`https://openweathermap.org/img/w/${current.weather[0].icon}.png`}
          alt=''
          className='w-20 h-20 filter drop-shadow-lg'
        />
      </div>

      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-medium opacity-75'>Current Weather</h3>
          <p className='text-sm opacity-60'>
            {new Date(current.dt_txt).toLocaleTimeString('gb-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hourCycle: 'h23',
            })}
          </p>
        </div>

        <div className='flex items-start'>
          <p className='text-6xl font-bold tracking-tighter'>
            {Math.round(current.main.temp)}°
          </p>
          <span className='mt-1 text-2xl'>C</span>
        </div>

        <p className='text-lg tracking-wide capitalize'>
          {current.weather[0].description}
        </p>

        <div className='grid grid-cols-2 gap-4 pt-4 border-t border-white/10'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 opacity-75'>
              <Thermometer size={18} />
              <span className='text-sm'>Min/Max</span>
            </div>
            <p className='pl-6 text-lg font-semibold'>
              {Math.round(current.main.temp_min)}° /{' '}
              {Math.round(current.main.temp_max)}°
            </p>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2 opacity-75'>
              <Wind size={18} />
              <span className='text-sm'>Wind</span>
            </div>
            <p className='pl-6 text-lg font-semibold'>
              {(current.wind.speed * 3.6).toFixed(1)} km/h
            </p>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2 opacity-75'>
              <Droplets size={18} />
              <span className='text-sm'>Humidity</span>
            </div>
            <p className='pl-6 text-lg font-semibold'>
              {current.main.humidity}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
