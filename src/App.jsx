import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherCard from './components/WeatherCard'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {

  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState("")


  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather()
  }

  const fetchWeather = async () => {
    if (!city) return setWeather(null);
    setLoading(true);

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)

      const data = await res.json()

      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(
          {
            city: data.name,
            conditions: data.weather[0].main,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            temp: Math.round(data.main.temp),
            humidity: data.main.humidity,
            wind: data.wind.speed
          }
        );
      }

    } catch (error) {
      console.error("Error in fetch api" + error)

    }finally{
      setLoading(false);
    }
  }


  return (
    <>
      <div className={`max-h-screen w-11/12 mx-auto bg-gradient-to-b from-blue-500 to-indigo-700 flex flex-col items-center justify-center p-6`}>
        <h1 className='text-3xl font-bold text-white mt-10 mb-6'>
          🌦 Weather Pro
        </h1>
        <form onSubmit={handleSearch} className='flex gap-3'>
          <input
            type="text"
            placeholder='Enter city...'
            value={city}
            onChange={e => setCity(e.target.value)}
            className='px-4 border border-gray-500 rounded-md text-gray-700' />
          <button type='submit'>
            {loading ? "loading" : "Search"}
          </button>
        </form>
        {weather && <WeatherCard weather={weather}/>}
      </div>
    </>
  )
}

export default App
