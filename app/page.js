'use client'
import { useState } from 'react'
import Image from 'next/image'
import { BsSearch } from 'react-icons/bs'
import Weather from '@/components/Weather'
import Spinner from '../components/Spinner'

export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  const fetchWeather = (e) => {
    e.preventDefault()
    setLoading(true)
    return fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        setWeather(response)
        setLoading(false)
        const { weather = [] } = response
        const mappedWeather = weather?.map((data) => {
          const { main, description } = data
          console.log(main, description)
          return { main, description }
        })
        return mappedWeather
      })
  }

  if (loading) return <Spinner />

  return (
    <>
      {/* overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]' />
      {/* background image */}
      <Image
        src='https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1375&q=80'
        alt='Weather background'
        fill
        className='object-cover'
      />

      {/* Search */}
      <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10'>
        <form
          onSubmit={fetchWeather}
          className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'
        >
          <div>
            <input
              className='bg-transparent border-none text-white focus:outline-none text-2xl'
              type='text'
              placeholder='Search city'
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button onClick={fetchWeather}>
            <BsSearch size={20} />
          </button>
        </form>
      </div>

      {/* Weather info */}

      <div>{weather.main && <Weather data={weather} />}</div>
    </>
  )
}
