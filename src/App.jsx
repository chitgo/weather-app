import React, { useState, useEffect } from 'react'
import MyMap from './components/MyMap'
import SearchBar from './components/SearchBar'
import Header from './components/Header'
import CityTitle from './components/CityTitle'
import CurrentWeather from './components/CurrentWeather'
import DailyForecast from './components/DailyForecast'

const App = () => {
  const [position, setPosition] = useState([37.97621, 23.71396])
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [favoriteCities, setFavoriteCities] = useState(() => {
    const saved = localStorage.getItem('favoriteCities')
    return saved ? JSON.parse(saved) : []
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const fetchWeather = async (cityOrCoords) => {
    try {
      const API_KEY = '713c0f9b55de3b634ada7998f59d6f90'
      let url = ''

      if (typeof cityOrCoords === 'string') {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityOrCoords}&appid=${API_KEY}&units=metric`
      } else if (Array.isArray(cityOrCoords)) {
        const [lat, lon] = cityOrCoords
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      } else {
        throw new Error('Invalid input for weather fetching')
      }

      const response = await fetch(url)
      if (!response.ok) throw new Error('Weather data not found')
      const data = await response.json()

      if (data.city && data.city.coord) {
        const { lat, lon } = data.city.coord
        setPosition([lat, lon])
      }

      const current = data.list[0]
      const dailyForecast = {}

      data.list.forEach((item) => {
        const date = new Date(item.dt_txt).toLocaleDateString('gb-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })
        if (!dailyForecast[date]) dailyForecast[date] = []
        dailyForecast[date].push({
          time: item.dt_txt,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          temp: item.main.temp,
          windSpeed: (item.wind.speed * 3.6).toFixed(1),
          description: item.weather[0].description,
          feels_like: item.main.feels_like,
        })
      })

      const forecast = {
        city: { name: data.city.name, country: data.city.country },
        current,
        dailyForecast,
      }
      setWeatherForecast(forecast)
    } catch (error) {
      alert('Could not fetch weather data. Try again.')
    }
  }

  useEffect(() => {
    fetchWeather(position)
  }, [])

  const handleFavoriteCity = () => {
    if (weatherForecast && weatherForecast.city) {
      const city = weatherForecast.city.name
      const newFavorites = favoriteCities.includes(city)
        ? favoriteCities.filter((c) => c !== city)
        : [...favoriteCities, city]

      setFavoriteCities(newFavorites)
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites))
    }
  }

  const removeFavoriteCity = (city) => {
    const newFavorites = favoriteCities.filter((c) => c !== city)
    setFavoriteCities(newFavorites)
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites))
  }

  return (
    <div className='px-4 py-6 mx-auto max-w-7xl'>
      <Header
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        favoriteCities={favoriteCities}
        fetchWeather={fetchWeather}
        removeFavoriteCity={removeFavoriteCity}
      />

      <SearchBar fetchWeather={fetchWeather} />

      <div className='mt-6'>
        {weatherForecast && (
          <>
            <CityTitle
              city={weatherForecast.city}
              favoriteCities={favoriteCities}
              handleFavoriteCity={handleFavoriteCity}
            />

            <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-3'>
              <CurrentWeather current={weatherForecast.current} />

              <div className='overflow-hidden border rounded-lg shadow-lg md:col-span-2'>
                <MyMap
                  position={position}
                  setPosition={setPosition}
                  fetchWeather={fetchWeather}
                />
              </div>
            </div>

            <DailyForecast dailyForecast={weatherForecast.dailyForecast} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
