import { useState, useEffect } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard.jsx'
import ForecastCard from './components/ForecastCard.jsx'
import toast, { Toaster } from 'react-hot-toast'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])

  // Clear weather & forecast if input is empty
  useEffect(() => {
    if (city.trim() === "") {
      setWeather(null)
      setForecast([])
    }
  }, [city])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!city) return  // don't fetch if input is empty
    fetchWeather()
    fetchForecast()
  }

  const fetchWeather = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await res.json()
      if (data.cod !== 200) {
        toast.error("City not found")
        setWeather(null)
      } else {
        setWeather({
          city: data.name,
          conditions: data.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          wind: data.wind.speed
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchForecast = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await res.json()
      if (data.cod !== "200") {
        setForecast([])
      } else {
        const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3)
        setForecast(daily.map(item => ({
          date: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          temp: Math.round(item.main.temp),
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          conditions: item.weather[0].main
        })))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getBackground = (condition) => {
    switch (condition) {
      case "Clear": return "from-yellow-400 to-orange-500"
      case "Rain": return "from-gray-500 to-blue-700"
      case "Clouds": return "from-gray-300 to-gray-600"
      default: return "from-blue-500 to-indigo-700"
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <div
        className={`w-full max-h-screen bg-gradient-to-b 
        ${weather ? getBackground(weather.conditions) : "from-blue-500 to-indigo-700"} 
        flex flex-col justify-start items-center p-4 overflow-auto`}
      >
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4 text-center">
          🌦 Weather Pro
        </h1>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 w-full rounded-md text-gray-800 focus:outline-none shadow"
          />
          <button
            type="submit"
            className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold shadow active:scale-95 transition"
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            ) : (
              "Search"
            )}
          </button>
        </form>

        {/* Weather Card */}
        {weather && <WeatherCard weather={weather} />}

        {/* Forecast Cards */}
        {forecast.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-4xl justify-center">
            {forecast.map((f, i) => (
              <ForecastCard key={i} forecast={f} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App
