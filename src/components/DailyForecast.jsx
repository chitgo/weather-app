import React from 'react'
import { Clock, Wind, Droplet } from 'lucide-react'

const DailyForecast = ({ dailyForecast }) => {
  return (
    <div className='mt-8 space-y-6'>
      {Object.entries(dailyForecast).map(([day, forecast], index) => (
        <div
          key={index}
          className='overflow-hidden bg-white shadow-md rounded-xl'
        >
          <div className='px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100'>
            <h3 className='text-xl font-semibold text-blue-900'>{day}</h3>
          </div>
          <div className='divide-y divide-gray-100'>
            {forecast.map((item, index) => (
              <div
                key={index}
                className='p-4 transition-colors duration-200 hover:bg-gray-50'
              >
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                  <div className='flex items-center justify-between gap-4 sm:justify-start'>
                    <div className='flex items-center gap-2'>
                      <Clock size={20} className='text-blue-500' />
                      <span className='font-medium'>
                        {new Date(item.time).toLocaleTimeString('el-GR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hourCycle: 'h23',
                        })}
                      </span>
                    </div>
                    <span className='text-sm text-gray-600 capitalize'>
                      {item.description}
                    </span>
                  </div>

                  <div className='flex items-center gap-4'>
                    <img
                      src={`https://openweathermap.org/img/w/${item.icon}.png`}
                      alt=''
                      className='w-10 h-10'
                    />
                    <div className='flex flex-col'>
                      <span className='font-semibold'>
                        {Math.round(item.temp)}°C
                      </span>
                      <span className='text-sm text-gray-500'>
                        Feels like: {Math.round(item.feels_like)}°C
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex items-center gap-2 text-gray-600'>
                      <Wind size={18} className='text-blue-400' />
                      <span className='text-sm'>{item.windSpeed} km/h</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-600'>
                      <Droplet size={18} className='text-blue-400' />
                      <span className='text-sm'>{item.humidity}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DailyForecast
