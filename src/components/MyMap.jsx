import React, { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
})

const GEOCODING_API =
  'https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}&addressdetails=1'

const MapUpdater = ({ position }) => {
  const map = useMap()

  useEffect(() => {
    map.setView(position, 8)
  }, [position, map])

  return null
}

const MapLeaflet = ({ position, setPosition, fetchWeather }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      setPosition([lat, lng])
      fetchCityFromCoords(lat, lng)
    },
  })

  const fetchCityFromCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        GEOCODING_API.replace('{lat}', lat).replace('{lon}', lon)
      )
      if (response.ok) {
        const data = await response.json()
        const city =
          data.address.city || data.address.town || data.address.village
        if (city) {
          fetchWeather(city)
        } else {
          fetchWeather([lat, lon])
        }
      }
    } catch (err) {
      alert('Error fetching city')
    }
  }

  return (
    <Marker position={position} icon={defaultIcon}>
      <Popup>Current Location</Popup>
    </Marker>
  )
}

const MyMap = ({ position, setPosition, fetchWeather }) => (
  <MapContainer
    center={position}
    zoom={8}
    style={{ height: '100vh', width: '100%' }}
  >
    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
    <MapLeaflet
      position={position}
      setPosition={setPosition}
      fetchWeather={fetchWeather}
    />
    <MapUpdater position={position} />
  </MapContainer>
)

export default MyMap
